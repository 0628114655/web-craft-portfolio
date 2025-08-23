import React from 'react'
import * as Icons from 'react-icons/fa';
import { useState, useEffect } from 'react';

function Services({title, serviceIcon, color , content }) {
  const IconComponent = Icons[serviceIcon]; 
  return (
    <div className='card service-card'> 
            <IconComponent style={{color:color}} className='service-card-icon mx-auto m-2 '/> 
            <div className="card-body position-relative" >
              <h4 className='card-title service-card-title '>{title }</h4>
              <p className='card-text service-card-content'>{content}</p>
              <a href="https://wa.me/+2120628114655" className='btn  btn-outline-success service-card-btn  d-flex align-items-center  justify-content-center gap-2 mt-2'  style={{}}> <Icons.FaWhatsapp size={20} />     <span>اطلب الخدمة</span> </a>
            </div>


    </div>
  )
}
function ServiceList(){
    const [services, setServices] =  useState ([])
    const [loading, setLoading] = useState(true)


    useEffect ( () => {
            const getService =  async () =>{
              try{
                let response = await fetch('/services/')
                let data = await response.json() 
                setServices(data)
              }
              catch (error) {
                console.log(`Failed to fetch services${error}`)
              }
              finally{
              setLoading(false)
            }
        }
         getService()}, [] )
    if (loading){
        return   <p className='text-center' > جار تحميل الخدمات... </p>
      }
    return(
      <div className='container' >
        <h3>خدماتنا</h3>
        <h6>نقدم مجموعة من الخدمات في مجال تطوير الويب تشمل تطوير وتصميم المواقع، تحسين الأداء، وتوفير حلول متكاملة تلبي احتياجات عملائنا:</h6>
        <div className='row ' >
              {services.map( (s, index )=>(
                            <div className="col col-xl-3 col-lg-4 col-md-6 col-12 p-1" key={index}> 
                              <Services color={s.color} serviceIcon = {s.icon} title = {s.title}  content = {s.content}/>
                              </div>
          
                        ) )}
        </div>
      </div>



  )}


export default ServiceList