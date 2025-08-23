import React from 'react'
import { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import * as icons from "react-icons/fa";




function Favourites({fetchFavouritesCount, favouritesList, }) {
    const [favourites, setFavourites] = useState ([])
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true)
    const [refresh, setRefresh] = useState(false)
    

    const toggleItem = async (url, item, isAdded, refreshCallback) => {
            try {
              if (isAdded) {
                await fetch(`/${url}/${item.id}/`, { method: 'DELETE', credentials: 'include' });
              }
              else {
                await fetch(`/${url}/`, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  credentials: 'include',
                  body: JSON.stringify({ project: item.id })
                });
              }
              refreshCallback();
            } catch (error) {
              console.error('An error occurred:', error);
            }
    };
          
   
    

function ProjectCard({ project }) {
  return (
    <div className='col-6 col-md-4 col-lg-3 my-2'>
  <div className='card favourites-card h-100 border-0 shadow-sm position-relative'>
    
    <Link to={`/project/${project.id}/`}><img className="card-img-top favourite-img"    src={project.images?.[0]?.image}   alt={project.title}   loading='lazy'  /> </Link>

    <div className='icon-container position-absolute top-2 end-2'>
      <icons.FaHeart 
        className='icon favourite-heart-icon '  
        onClick={() => { 
          const favourite = favouritesList.find(fav => fav.project === project.id); 
          if (favourite && favourite.id) { 
            toggleItem('Favourites', favourite, true, fetchFavouritesCount); 
            setRefresh(prev => !prev);
          }
        }} 
        title={`إزالة المشروع من المفضلات`} 
      />
    </div>

    <div className='card-body text-center'> 
    <Link className='text-decoration-none  text-center' to={`/project/${project.id}/`}>
      <h6 className="  favourites-project-title text-truncate">{project.title}</h6>
    </Link>
    <a 
      href="https://wa.me/+2120628114655" 
      className='btn btn-outline-success d-flex align-items-center justify-content-center gap-2 mt-2' 
    >
      <icons.FaWhatsapp size={20} /> احصل على موقعك الآن!
    </a>
    </div>

  </div>
</div>

  );
  }

    useEffect(()=>{
        const getProject = async ()=>{
            try{
            let response = await fetch('/Favourites/')
            let data = await response.json()
            console.log(data)
            setFavourites(data.favourites_list.projects)}
            catch (err) {
                setError(err.message);
              }
            finally{
              setLoading(false)

            }
        }
        getProject()
       },
    [refresh]
    )
  return (
    <div  className='container'>
        {error ? <p className='text-danger d-flex justify-content-center align-items-center'> حدث خطأ أثناء تحميل المشاريع: {error}</p>:
         loading ? ( <div className="d-flex justify-content-center align-items-center" style={{ height: '300px' }}>
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">جارٍ التحميل...</span>
                        </div>
                    </div>) :
       
          <>
            <h3>قائمة المفضلات </h3>
            <div className='row justify-content-start'>
            {favourites.length === 0 ? ( <div className="d-flex justify-content-center align-items-center" style={{ height: '300px' }}>
                                          < icons.FaHeartBroken style={{marginLeft : '10px', fontSize: '1.5rem', color :'#e63946'}} /> 
                                          <span className='text-muted mt-2' style={{fontSize: '1.4rem'}}>لا توجد أي مفضلات بعد</span>
                                        </div>) :(          
                favourites.map( (p) =>(
                    <ProjectCard key={p.id}  project={ p}/> 
                    )
                    )
                    )
              }
            </div>
            
          </>
        
      }
    </div>

  )
    }

export default Favourites