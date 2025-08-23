import React from 'react'
import { useState , useEffect } from "react";
import { BrowserRouter as  useParams } from 'react-router-dom'
import * as icons from 'react-icons/fi';


function Project() {
    const [project, setProjects] = useState()
    const [loading , setLoading] = useState(true)
    const [error , setError] = useState(null)
    const {id} = useParams()


    const categoryColors = {
        "متجر إلكتروني": "#28a745",
        "مدونة": "#007bff",
        "منصة تعليمية": "#ffc107",
        "خدمات": "#6f42c1",
      };

    const ProjectContent = ({project}) =>{
        return(
        <div className="row p-2">
            <div className="col col-12 col-md-6  my-4">
                <p className='ProjectContent'>
                    {project.content}
                </p>
            </div>
            <div className="col col-12 col-md-6 ">
                <div id='projectCarousel' className="carousel slide mt-0 pt-0">
                    <div className="carousel-indicators">
                    {project.images?.map((i, index) =>
                        <button type="button" data-bs-target="#projectCarousel"  data-bs-slide-to={index} className={index === 0 ?'active' : ''} aria-current={index} aria-label={index}></button>
                    )}
                    </div>
                    <div className="carousel-inner">
                    {project.images?.map((i, index) =>
                        <div key={index} className={`carousel-item ${index === 0 ?"active" : ''}`}>
                            <div className="carousel-image-wrapper">
                                <img key={i.id} src={i.image} alt={project.title}  className="shadow " loading='lazy' />
                        
                            </div>
                            </div>
                        )}
                    </div>
                    <button className="carousel-control-next" type="button" data-bs-target='#projectCarousel' data-bs-slide="next">
                        <span>< icons.FiChevronRight  style={{right: '-25px'}} className='carousel-control-icon'/></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                    <button className="carousel-control-prev" type="button" data-bs-target='#projectCarousel' data-bs-slide="prev">
                        <span><icons.FiChevronLeft  style={{left: '-25px'}} className='carousel-control-icon' /></span>
                        <span className="visually-hidden">Previous</span>
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
           setError(error.message)
        }  
    }

    useEffect( ()=>{
        GetProject()
    },[]

    )

  return (
    <div className='container'>
        { error ? <p className='text-danger'> حدث خطأ أثناء تحميل المشاريع: {error}</p> :
         loading ?
         <div className="d-flex justify-content-center align-items-center" style={{ height: '300px' }}>
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">جارٍ التحميل...</span>
                    </div>
                </div>
        :
        <>
        <h3 className='mb-3'>{project.title}</h3>
        <small className='category-badge d-inline-block px-3 py-1 rounded-pill fw-bold' style={{backgroundColor : categoryColors[project.type], position : 'relative'}}>{project.type }</small>
        < ProjectContent project={project}  />

        </>
        
    }
    </div>
  )
}

export default Project