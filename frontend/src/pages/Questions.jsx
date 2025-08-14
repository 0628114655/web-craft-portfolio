import React from 'react'
import { useState, useEffect } from 'react'
import {FaPlus, FaMinus  } from "react-icons/fa";


function Questions() {

    const [questions, setQuestions] = useState([])
    const [openIndex, setopenIndex] = useState(null)

    const toggleIndex = (index)=>{
        setopenIndex(openIndex === index ? null : index)
    }

    useEffect( () =>{
        const getQuestion = async () => {
            let response =  await fetch ('/Questions/')
            let data = await response.json()
            setQuestions(data)
        }
        getQuestion()}, [] )
  return (
      <div  className='container'>
            <h3>الأسئلة المتكررة</h3>
            {
            questions.map((q,index) =>(
                    <div key={index} className='questions-box'>
                        <h6 className="btn btn-primary d-flex justify-content-between align-items-center questions-button w-100" style={{cursor:'pointer'}} onClick={()=>toggleIndex(index)}> {q.question} <span>{openIndex===index? (<i>< FaMinus className='minusIcon '/></i>):(<i> < FaPlus  className='plusIcon '/></i>) }</span>     </h6>

                        {openIndex === index && (
                            <div className="card card-body anwser-box">
                            {q.answer}
                            </div>
                        )}
                        
                    </div>
            ))
                        }
            {questions.length === 0 && <p>لا توجد أسئلة متوفرة حالياً.</p>}

    </div>
  )
}

export default Questions