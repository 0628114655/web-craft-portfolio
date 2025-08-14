import React from 'react'
import { useState , useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, useParams } from 'react-router-dom'


function Project() {
    const [project, setProjects] = useState()
    const [loading , setLoading] = useState(true)
    const {id} = useParams()


    const ProjectContent = ({project}) =>{
        return(
        <div className="row p-2">
            <div className="col col-12 col-md-6  ">
                <p className='ProjectContent'>
                    {project.content}
                </p>
            </div>
            <div className="col col-12 col-md-6 ">
                <div id='projectCarousel' class="carousel slide">
                <div className="carousel-inner">
                {project.images?.map((i, index) =>
                    <div className={`carousel-item ${index === 0 ?"active" : ''}`}>
                            <img key={i.id} src={i.image} alt={project.title}  className="d-block height-100 w-100" />
                    </div>
                    )}
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target='#projectCarousel' data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target='#projectCarousel' data-bs-slide="next">
                    <span className="carousel-control-next-icon" style={{backgroundColor : 'red'}} aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
                </div>

            </div>
        </div>
        )
    }

    const GetProject = async () =>{
        try {
            let response = await fetch (`/Projects/${id}/`)
            let data = await response.json()
            setProjects(data)
            setLoading(false)
        }
        catch (error){
            console.log('Fetch is failed', error)
        }  
    }

    useEffect( ()=>{
        GetProject()
    },[]

    )

  return (
    <div className='container'>
        { loading ? 'يجري الآن تحميل المشروع':
        <>
        <h3>{project.title}</h3>
        < ProjectContent project={project}  />

        </>
        }
    </div>
  )
}

export default Project