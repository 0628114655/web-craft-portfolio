import React from 'react'
import { useState, useEffect } from "react";
import * as Icons from 'react-icons/fa';
import { FiChevronUp as ScrollArrow}  from 'react-icons/fi';

import { Link } from 'react-router-dom'




function Home(projectAllLikes) {
  const categoryColors = {
    "متجر إلكتروني": "#28a745",
    "مدونة": "#007bff",
    "منصة تعليمية": "#ffc107",
    "خدمات": "#6f42c1",
  };



  
  function Services({ serviceIcon, content, title }) {
    const IconComponent = Icons[serviceIcon]; 
    return (
      <div className=' '>
          <h4> <IconComponent  title= {title} className='icon home-service-icon mb-2 icon-bronze '/> {title} </h4>
          <small className='d-block text-align-justify'>{content.slice(0,100)}...</small>
      </div>  
  
  
    )
  }
  function LatestProjects({project}){
    return (
      <div className='col col-md-6 col-12 my-2'>
      <div className='card home-projects-card '>
        <div className='home-project-img position-relative overflow-hidden'>
          {project.type &&<div className='badge category-badge' style={{backgroundColor : categoryColors[project.type] || "#ccc"}} > {project.type} </div>}
          <img className="card-img-top img-fluid" src={project.images?.[0]?.image} alt={project.title} />     
        </div> 
        <div className="card-body">
          <Link to={`/project/${project.id}/`} className=" text-decoration-none">
            <h6 className="card-title text-dark" title='معاينة المشروع'>{project.title}</h6>
          </Link>
        </div>
        <div className='project-statistics-container' style={{position : 'absolute', bottom: '10px', left : '10px'}}>
          <span className='project-likes m-1 text-secondary'> < Icons.FaHeart className='project-likes-icon' /> {projectAllLikes[project.id]? projectAllLikes[project.id] : 0} </span>
          <span className='project-views m-1 text-secondary'> < Icons.FaEye  className='project-views-icon'/> {project.views} </span>
        </div>
      </div>
      
    </div>
    )
  }

  let [content, setContent] = useState  ([])
  let [backgroundimage, setBackgroundimage] = useState  ()
  const [services, setServices] =  useState ([])
  const [projects, setProjects] =  useState ([])
  const [bgLoaded, setBgLoaded] = useState(false);
  const [showScroll, setShowScroll] = useState(false);



useEffect(() =>{
    const getContent = async () => {
      const [contentRes, imgRes, projectsRes] = await Promise.all([fetch("http://192.168.91.1:8000/"),fetch("/BackgroundImages/"), fetch('/Projects/')]);
      let data = await contentRes.json()
      let imgData = await imgRes.json()
      let projects = await projectsRes.json()
      const imgUrl = imgData.img.image;

      const img = new Image();
      img.src = imgUrl;
      img.onload = () =>{ setBackgroundimage(imgUrl); setBgLoaded(true)}
      setProjects(projects.slice(-2))
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
 
 useEffect(() => {
  const initObserver = () => {
    const buttons = document.querySelectorAll('.subTitleCont .btn');
    if (buttons.length === 0) return false;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Array.from(buttons).indexOf(entry.target);
            entry.target.style.transitionDelay = `${index * 0.1}s`;
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    buttons.forEach((btn) => observer.observe(btn));
    return true;
  };

  // محاولة التنفيذ فوراً
  if (initObserver()) return;

  // إذا فشل، نستخدم MutationObserver لانتظار العناصر
  const mutationObserver = new MutationObserver((mutations) => {
    mutations.forEach(() => {
      if (initObserver()) {
        mutationObserver.disconnect();
      }
    });
  });

  mutationObserver.observe(document.body, {
    childList: true,
    subtree: true
  });

  return () => mutationObserver.disconnect();
}, []);

useEffect(()=>{
  const handleScroll = ()=>{
    if (window.scrollY >= 480 )
      {setShowScroll(true)}
    else {
      setShowScroll(false);
      }
  }
  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
},
[])

const scrollToTop = ()=> {
    window.scroll({
        left: 0,
        top: 0,
        behavior:"smooth"})
  }




  return (
    <> 
      <div className='container-fluid p-0 position-relative text-white' style={{backgroundImage: `url(${backgroundimage})`,backgroundSize: 'cover',backgroundPosition: 'center',backgroundRepeat: 'no-repeat',opacity: 1}}>
      {bgLoaded ?
              (<div className=' overlay-text p-4 position-relative ' > 
              {
                content.map(cont =>
                  <div className=' p-2 m-1 mx-4' key={cont.id}>
                    <h3>{cont.title}</h3>
                    <p className='intro'>{cont.content}</p>
                  </div>)
              }
                <a href="https://wa.me/+2120628114655" className='btn  btn-outline-success home-card-btn  d-flex align-items-center justify-content-center gap-2 mt-5' target='blank'> <Icons.FaWhatsapp size={20}/><span style={{fontSize: '1.1rem'}}>اطلب موقعك الآن</span> </a>
                {showScroll &&
                  <button className='btn  btn-dark bg-secondary scroll-bar  gap-2 mt-5' onClick={()=> scrollToTop()}> <ScrollArrow size={30}/> </button>
                }
                <a href="https://wa.me/+2120628114655" className='btn  btn-success whatsapp-icon gap-2 mt-5' title='تواصل معنا' target='blank' > <Icons.FaWhatsapp size={30}/> </a>

              </div>
              
              )
              :
              (<div className="d-flex justify-content-center align-items-center" style={{ height: '300px' }}>
                  <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">جارٍ التحميل...</span>
                  </div>
              </div>)
      }
      
      </div>
    {bgLoaded&&(
    <div className='container '>
      
      <div className='my-5 subTitleCont'>
          <h3 className='subTitle bronze-gradient'> <Icons.FaGlobe className=' mb-2' /> خدماتنا</h3>
          <div className='row d-flex align-items-start mt-3  mx-1' >
                {services.map( (s, index )=>{
                return  index < 3 ?(
                                <div className="col home-square btn col-md-4 col-12 col-sm-6 flex flex-col items-center text-center gap-2 p-3 my-2" key={s.id}> 
                                  <Services size={30} color={s.color} content={s.content} serviceIcon = {s.icon} title = {s.title} />
                                </div>
                                )
                              :index === 3 && (
                                  <Link to={'services/'} className="col btn home-square col-12 d-flex flex-col items-center  text-center gap-2 p-1 my-2 see-more" key="see-more">
                                      <h4 className='w-100'> <Icons.FaEllipsisH className='icon home-service-icon mb-2 icon-bronze '  title='شاهد المزيد' />  خدمات أخرى </h4>
                                  </Link>
                                )
                              })}
          </div>
      </div>  
      <div className='my-5 why-us subTitleCont'>
          <h3 className='subTitle bronze-gradient'> <Icons.FaStar  className='mb-2'/> لماذا نحن؟</h3>
          <div className='row d-flex  justify-content-center align-items-center mx-1' >
                                <div className="col home-square btn col-md-3 col-6 col-sm-6 flex flex-col  items-center text-center gap-2 p-3  my-2" >                                  
                                  <h4> <Icons.FaBolt size={30} className="mb-2 icon-bronze" /> سرعة التنفيذ</h4>
                                  <p  className="text-gray-600 text-sm text-align-justify">ننجز المشاريع بكفاءة عالية وفي وقت قياسي دون التأثير على الجودة.</p>
                                </div>
                                <div className="col home-square btn col-md-3 col-6 col-sm-6 flex flex-col items-center text-center gap-2 p-3 my-2" > 
                                  <h4> <Icons.FaHeadset size={30} className="mb-2 icon-bronze"  /> دعم 24/7</h4>
                                  <p  className="text-gray-600 text-sm text-align-justify">فريقنا متاح على مدار الساعة لحل مشاكلك والرد على استفساراتك.</p>
                                </div>
                                <div className="col home-square btn col-md-3 col-6 col-sm-6 flex flex-col items-center text-center gap-2 p-2 my-2" > 
                                  <h4> <Icons.FaSmile size={30} className="mb-2 icon-bronze"  /> تجربة مستخدم مميزة</h4>
                                  <p  className="text-gray-600 text-sm text-align-justify">نصمم حلولًا سهلة الاستخدام تمنح عملاءك تفاعلًا سلسًا وفعالًا.</p>
                                </div>
                                <div className="col home-square btn col-md-3 col-6 col-sm-6 flex flex-col items-center text-center gap-2 p-3 my-2" >
                                  <h4> <Icons.FaMobileAlt size={30} className="mb-2 icon-bronze" /> تصميم متجاوب</h4>
                                  <p  className="text-gray-600 text-sm text-align-justify">مواقع وتطبيقات تعمل بانسيابية على جميع الأجهزة والشاشات.</p>
                                </div>
                                <div className="col home-square btn col-md-3 col-6 col-sm-6 flex flex-col items-center text-center gap-2 p-3 my-2" > 
                                  <h4> <Icons.FaTags size={30} className="mb-2 icon-bronze"  /> أسعار تنافسية</h4>
                                  <p  className="text-gray-600 text-sm text-align-justify">خدمات احترافية بجودة عالية وتكلفة مناسبة لميزانيتك.</p>
                                </div>
                             
          </div>
      </div>
      <div className='my-5 subTitleCont'>
        <h3 className='subTitle bronze-gradient'> < Icons.FaBriefcase className='mb-2' /> أحدث أعمالنا </h3>
        <div className='row d-flex p-1 justify-content-center align-items-center mx-1' >
          {projects.map(project =>(
                              
              <LatestProjects  key={project.id} project={project}/>
              ))}
        </div>
      </div>
      <div className='my-5 subTitleCont'>
          <h3 className='subTitle bronze-gradient '> <Icons.FaStar  className='mb-2 icon-bronze'/> مبادؤنا </h3>
          <div className='row d-flex  justify-content-center align-items-start mx-1' >
                                <div className="col home-square btn col-md-3 col-6 col-sm-4 flex flex-col items-center text-center gap-2 p-2 my-2" >                                  
                                  <h4>  <Icons.FaAward size={30} className="mb-2 icon-bronze "  title='الجودة' /> الجودة</h4>
                                  <p  className="text-gray-600 text-sm ">نُسلّم حلولًا متقنة بمعايير اختبار واضحة.</p>
                                </div>
                                <div className="col home-square btn col-md-3 col-6 col-sm-4 flex flex-col items-center text-center gap-2 p-2 my-2" >                                  
                                    <h4><Icons.FaHandshake size={30} className="mb-2 icon-bronze"  title='الالتزام'/> الالتزام </h4>
                                    <p  className="text-gray-600 text-sm">مواعيد دقيقة وتحديثات مستمرة حتى التسليم.</p>
                                </div>
                                <div className="col home-square btn col-md-3 col-6 col-sm-4 flex flex-col items-center text-center gap-2 p-2 my-2" >                                  
                                    <h4><Icons.FaEye size={30} className="mb-2 icon-bronze"  title='الشفافية'/> الشفافية </h4>
                                    <p  className="text-gray-600 text-sm">تسعير واضح وتقارير تقدم بدون مفاجآت.</p>
                                </div>

                                <div className="col home-square btn col-md-3 col-6 col-sm-4 flex flex-col items-center text-center gap-2 p-2 my-2" >                                  
                                    <h4 className=''> <Icons.FaRocket size={30} className="mb-2 icon-bronze"  title='الابتكار'/> الابتكار </h4>
                                    <p className="text-gray-600 text-sm">أفكار عملية وتقنيات حديثة تخدم الهدف</p>
                                </div>                          
                             
          </div>
      </div>
    </div>
      )}
    </> 
      


    
  )
}

export default Home