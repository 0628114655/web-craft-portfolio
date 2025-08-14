import React from 'react'
import { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import * as icons from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";  // من حزمة react-icons/fa6



function Projects({fetchFavoritesCount, favoritesList, fetchSavesCount,  savesList}) {
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
      // أولاً، نتأكد أن المتصفح يدعم Web Share API
      if (navigator.share) {
        // إذا كان مدعوم، نستدعي الدالة share مع بيانات المشاركة
        navigator.share({
          title: project.title,                // عنوان المشاركة (اسم المشروع)
          text: 'شاهد هذا المشروع!',  // نص توضيحي مع الرابط
          url: window.location.origin + `/projects/${project.id}` // رابط المشروع الكامل
        })
        .then(() => console.log('تمت المشاركة بنجاح'))  // إذا تمت المشاركة بنجاح
        .catch((error) => console.log('خطأ في المشاركة:', error)); // إذا حدث خطأ
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
            <div className='btn'> <i > <icons.FaHeart className='first-icon'  onClick={() => { const favorite = favoritesList.find(fav => fav.project === project.id);
                        if (favorite && favorite.id) { toggleItem('Favorites',favorite, true, fetchFavoritesCount);} else {toggleItem('Favorites', project, false, fetchFavoritesCount);}}}
                        style={{color : favoritesList.some(fav => fav.project === project.id)?'#e63946': 'black' }}
                        title={favoritesList.some(fav => fav.project === project.id) ? `إزالة المشروع من المفضلات` : `إضافة المشروع إلى المفضلات`} />
            </i> </div>
            <div className='btn' > <i className='icon'> <icons.FaSave className='second-icon' onClick={()=>{const savedItem = savesList.find(item => item.project === project.id);
                        if (savedItem  && savedItem.id) { toggleItem('Saves',savedItem, true, fetchSavesCount)} else { toggleItem('Saves',project, false, fetchSavesCount)} }}
                        style={{color : savesList.some(item => (item.project === project.id))?'#2a9d8f': 'black'}}
                        title={savesList.some(fav => fav.project === project.id) ? `إزالة الحفظ` : `حفظ المشروع`} />
            </i> </div>
            <Link to={`/project/${project.id}/`} className='btn' title='معاينة المشروع'> <i className='icon'> <icons.FaEye className='third-icon'/> </i> </Link>
            <div className='btn' title='مشاركة المشروع'> <i className='icon'> <icons.FaShare className='fourth-icon' onClick={()=> shareProject(project)}/> </i> </div>
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
        {error && <p className='text-danger'> حدث خطأ أثناء تحميل المشاريع: {error}</p>}
        { loading ? (<p className='text-center'> يتم الآن تحميل المشاريع ... </p>) :
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