import React from 'react'
import { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import * as icons from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";  // من حزمة react-icons/fa6



function Projects({fetchFavouritesCount, favouritesList, fetchSavesCount,  savesList, projectAllLikes}) {
    const [projects, setProjects] = useState ([])
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true)
    const [showAltShare, setShowAltShare] = useState(false);
    const [currentProjectId, setCurrentProjectId] = useState(null);





    const categoryColors = {
      "متجر إلكتروني": "#28a745",
      "مدونة": "#007bff",
      "منصة تعليمية": "#ffc107",
      "خدمات": "#6f42c1",
    };
    
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
          
   
    const shareProject = (project) => {
      if (navigator.share) {
        navigator.share({
          title: project.title,                
          text: 'شاهد هذا المشروع!',  
          url: window.location.origin + `/projects/${project.id}` 
        })
        .then(() => console.log('تمت المشاركة بنجاح'))  
        .catch((error) => console.log('خطأ في المشاركة:', error)); 
      }
       else {
        setShowAltShare(true);
        setCurrentProjectId(project.id)

     
          }
                  
      }
    ;
    

function ProjectCard({ project }) {
  return (
    <div className='col col-md-6 col-12 my-2'>
      <div className='card projects-card'>
        <div className='project-img position-relative overflow-hidden'>
          {project.type &&<div className='badge category-badge' style={{backgroundColor : categoryColors[project.type] || "#ccc"}} > {project.type} </div>}
          <img className="card-img-top" src={project.images?.[0]?.image} alt={project.title} />
          <div className='project-action'>
            <div className='btn'>  <icons.FaHeart className='icon first-icon'  onClick={() => { const favourite = favouritesList.find(fav => fav.project === project.id);
                        if (favourite && favourite.id) { toggleItem('Favourites', favourite, true, fetchFavouritesCount);} else {toggleItem('Favourites', project, false, fetchFavouritesCount);}}}
                        style={{color : favouritesList.some(fav => fav.project === project.id)?'#e63946': 'black' }}
                        title={favouritesList.some(fav => fav.project === project.id) ? `إزالة المشروع من المفضلات` : `إضافة المشروع إلى المفضلات`} />
             </div>
            <div className='btn' >  <icons.FaSave className='icon second-icon' onClick={()=>{const savedItem = savesList.find(item => item.project === project.id);
                        if (savedItem  && savedItem.id) { toggleItem('Saves',savedItem, true, fetchSavesCount)} else { toggleItem('Saves',project, false, fetchSavesCount)} }}
                        style={{color : savesList.some(item => (item.project === project.id))?'#2a9d8f': 'black'}}
                        title={savesList.some(fav => fav.project === project.id) ? `إزالة الحفظ` : `حفظ المشروع`} />
            </div>
            <Link to={`/project/${project.id}/`} className='btn' title='معاينة المشروع'>  <icons.FaEye className='icon third-icon'/>  </Link>
            <div className='btn' title='مشاركة المشروع'>  <icons.FaShare className='icon fourth-icon' onClick={()=> shareProject(project)}/> </div>
          </div>
          {showAltShare && currentProjectId===project.id &&  (
              <div className="share-card">
                <div className="social-media">
                  <div className="btn">
                    <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`${window.location.origin}/projects/${project.id}`)}`} target="_blank"  rel="noopener noreferrer" title='مشاركة المشروع على الفيسبوك' > <icons.FaFacebook className='ShareIcons' style={{color : '#1877F2'}} /> </a>
                  </div>
                  <div className="btn">
                    <a href={`https://wa.me/?text=${encodeURIComponent(`شاهد هذا المشروع! ${window.location.origin}/projects/${project.id}`)}`} target="_blank" rel="noopener noreferrer" title='مشاركة المشروع على الواتساب'> <icons.FaWhatsapp className='ShareIcons' style={{color : '#25D366'}} />  </a>
                  </div>
                  <div className="btn">
                      <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(`${window.location.origin}/projects/${project.id}`)}&text=${encodeURIComponent('شاهد هذا المشروع!')}`} target="_blank" rel="noopener noreferrer" title='مشاركة المشروع على X' ><FaXTwitter className='ShareIcons' style={{color : '#000000'}} />  </a>
                  </div>
                  <div className="btn">
                    <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`${window.location.origin}/projects/${project.id}`)}`} target="_blank" rel="noopener noreferrer" title='مشاركة المشروع على Linked in' ><icons.FaLinkedin className='ShareIcons' style={{color : '#0077B5'}}/>  </a>
                  </div>
                </div>  
                <span onClick={()=>setShowAltShare(false)} className='share-cancel' title='إلغاء المشاركة' > <icons.FaReply/></span>
              </div>
      )}
          
          
        </div> 
        <div className="card-body">
          <h6 className="card-title">{project.title}</h6>
          <p className="card-text">{project.gimpse}</p>
        </div>
        <div className='project-statistics-container' style={{position : 'absolute', bottom: '10px', left : '10px'}}>
          <span className='project-likes m-1 text-secondary'> < icons.FaHeart className='project-likes-icon' /> {projectAllLikes[project.id]? projectAllLikes[project.id] : 0} </span>
          <span className='project-views m-1 text-secondary'> < icons.FaEye  className='project-views-icon'/> {project.views} </span>
        </div>
      </div>
      
    </div>
   
  );
  }

    useEffect(()=>{
        const getProject = async ()=>{
            try{
            let response = await fetch('/Projects/')
            let data = await response.json()
            setProjects(data)}
            catch (err) {
                setError(err.message);
              }
            finally{
              setLoading(false)

            }
        }
        getProject()
       },
    []
    )
  return (
    <div  className='container'>
        {error ? <p className='text-danger'> حدث خطأ أثناء تحميل المشاريع: {error}</p>         :
         loading ? (<div className="d-flex justify-content-center align-items-center" style={{ height: '300px' }}>
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">جارٍ التحميل...</span>
                        </div>
                    </div>) :
        (
          <>
        <h3>أعمالنا</h3>
        <h6>لقد طورنا في Web Craft،  مواقع ومنصات إلكترونية متنوعة، مصممة خصيصًا لتلبية احتياجات مختلف القطاعات، باستخدام أحدث تقنيات الويب. </h6>
            
        <div className='row justify-content-start'>
            {projects.map( (p) =>(
                <ProjectCard key={p.id}  project={ p}/> 
                )
            )}
        </div>
        </>
        )
      }
    </div>
  )
    }

export default Projects