import React from 'react'
import { useState, useEffect } from "react";

function Home() {

  let [content, setContent] = useState  ([])

  useEffect(() =>{
    const getContent = async () => {
      let response = await fetch(`http://192.168.91.1:8000/`)
      let data = await response.json()
      setContent(data)
    }  
    getContent()
  }, [])

  return (
  
      
    <div className='container w-75'>
    {
      content.map(cont => <p key={cont.id}>{cont.content}</p>)
    }
  </div>
      


    
  )
}

export default Home