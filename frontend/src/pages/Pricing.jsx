import React from 'react'
import { useState, useEffect } from "react";


function Pricing() {
    const [pricing, setPricing ] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState()
    const [showAll, setShowAll] = useState(false)

    function Prices  ({prices}) {
        return(
            <>
                <div className="col col-md-4 col-12 my-3 border p-2 shadow position-relative" style={{backgroundColor: `${prices.plan.color}`, borderRadius: '10px'}}>
                    <h4 className='d-flex justify-content-center  ' > الخطة: {prices.plan.title} </h4>
                    
                    <ul>
                        {prices.description.slice(0, showAll?prices.description.length:10).map(feature => (
                            <li key={feature.id}>
                                {feature.icon && <span>{feature.icon} </span>}
                                {feature.description}
                            </li>
                            
                            ))}
                    </ul>
                    { !showAll && prices.description.length > 10 && 
                        <button onClick={()=>setShowAll(true)}>شاهد المزيد</button> }
                    <strong className='d-flex justify-content-center ' style={{}}> السعر المبدئي* : {prices.price} درهم ({prices.price / 10 } $)</strong>
               </div>
            </>
        )

    }

    
    useEffect(() =>{
        const getPrices =  async () => {
            try{
            let response = await fetch('/Pricing/')
            let data = await response.json()
            console.log('data is',data)
            setPricing(data)

            }
            catch(e){
                setError(e.message)
            }
            finally{
            setLoading(false)
            }
        }
        getPrices()
        }, [])
  return (
    <div  className='container'>
    {error ? <p className='text-danger d-flex justify-content-center align-items-center'> حدث خطأ أثناء تحميل المشاريع: {error}</p>:
     loading ? ( <div className="d-flex justify-content-center align-items-center" style={{ height: '300px' }}>
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">جارٍ التحميل...</span>
                    </div>
                </div>) :
        <div className='row justify-content-around'>
            <h3>التسعير</h3>
            <h6> نقدم في موقعنا العديد من خطط التسعير المختلفة والتي نطمح من خلالها إلى مساعدتكم على إنشاء موقعكم الإلكتروني بالسعر المناسب </h6>

           { pricing.map( p => (
                <Prices key={p.id} prices = {p} />
            ))}
               <small>* ملحوظة : الأسعار أعلاه مبدئية ويمكن أن تتغير حسب حجم المشروع ومتطلباته. </small>
        
    
        </div> 
  }
  </div>
    
    
    
    )
}

export default Pricing