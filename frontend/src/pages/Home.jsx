import React from 'react'
import { useState, useEffect } from "react";
import * as Icons from 'react-icons/fa';


function Home() {
  function Services({ serviceIcon, color, title }) {
    const IconComponent = Icons[serviceIcon]; 
    return (
      <div className=' '>
              <IconComponent style={{color:color}} title= {title} className='icon home-service-icon '/> 
      </div>  
  
  
    )
  }

  let [content, setContent] = useState  ([])
  const [services, setServices] =  useState ([])

  useEffect(() =>{
    const getContent = async () => {
      let response = await fetch(`http://192.168.91.1:8000/`)
      let data = await response.json()
      setContent(data)
    }  
    getContent()
  }, [])

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
}
 getService()}, [] )


  return (
    <> 
      <div className='container w-75 '>
        {
          content.map(cont => <p key={cont.id}>
          <h3>{cont.title}</h3>
          {cont.content}</p>)

        }
      </div>
  <div className='container '>


     <h3 style={{textAlign: 'right'}}>خدماتنا</h3>
        <div className='row ' >
              {services.map( (s, index )=>(
                index < 4 &&
                           ( <div className="col col-3 d-flex justify-content-center align-items-center p-1" key={index}> 
                              <Services color={s.color} serviceIcon = {s.icon} title = {s.title}  content = {s.content}/>
                              </div>)
                
          
                        ) )}
        </div>
        </div>
    </> 
      


    
  )
}

export default Home