import React from 'react'
import { FaHome, FaGlobe, FaBriefcase, FaEnvelope, FaQuestionCircle, FaBlog, FaHeart, FaSave, FaDollarSign } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom'



function Nav({favoritesCount, savesCount}) {
  const location = useLocation()
  const isActive = (path) => location.pathname === path
  const isActiveSubLinks = (path) => location.pathname.startsWith( path)
 

  
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary " dir='RTL'>
      <div className="container-fluid">
        <Link className="navbar-brand" >   <span className="brand-en">Web Craft</span><br /><span className="brand-ar">ويب كرافت</span></Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 mx-auto">
              <li className="nav-item">
                <Link to={'/'} className={ ` nav-link ${isActive('/') ? "active" : ""} `} > <span> <FaHome /> </span> الرئيسية</Link>
              </li>
              <li className="nav-item">
                <Link to={'services/'} className={`nav-link ${isActive('/services/') ? "active" : "" }`}> <span><FaGlobe /></span> الخدمات</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" ><span> <FaDollarSign /> </span> التسعير </Link>
              </li>
              <li className="nav-item">
                <Link to={'projects/'} className={`nav-link ${isActive('/projects/') ? "active" : ""} ${isActiveSubLinks('/project/') ? "active" : ""} `}> <span> < FaBriefcase/></span> أعمالنا</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" > <span>  <FaEnvelope/> </span> تواصل معنا</Link>
              </li>
              <li className="nav-item">
                <Link to={'questions/'} className={`nav-link ${isActive('/questions/') ? "active" : ""}`} > <span> <FaQuestionCircle/></span>  الأسئلة المتكررة</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" > <span> <FaBlog/> </span>  المدونة</Link>
              </li>
              <li className="nav-item">
                <Link to={'favourites/'} className="nav-link HeartIcon" > <span> <FaHeart className='heart-icon'/> <span > {favoritesCount} </span> </span>  </Link>
              </li>
              <li className="nav-item">
                <Link to={'saves/'} className="nav-link SaveIcon" > <span> <FaSave className='save-icon' /> {savesCount} </span>  </Link>
              </li>

              
              
          </ul>
          
        </div>
      </div>
  </nav>
  )
}

export default Nav;