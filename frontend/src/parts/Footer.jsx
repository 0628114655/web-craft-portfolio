import React from 'react'
import { FaReact, FaPython, FaJs, FaCss3, FaHtml5, FaBootstrap } from 'react-icons/fa';

const currentYear = new Date().getFullYear();


function Footer() {
  return (
    <footer>
        <br />
        <hr />
    <div className='container'>

        <div className='row'>
            <div className="col-md-4">
                <h5>عن WebCraft</h5>
                <p>
                    WebCraft هي منصة متخصصة في تطوير وتصميم مواقع الويب باستخدام أحدث التقنيات، مع التركيز على الأداء، الجمالية، وتجربة المستخدم.
                </p>
            </div>

            <div className="col-md-4">

                <h5>نعتمد على</h5>
                <ul className="list-unstyled">
                    <li> < FaPython style={{ color: '#306998', marginRight: '8px' }}/> Django & DRF</li>
                    <li> < FaHtml5 style={{ color: '#e34c26', marginRight: '8px' }} /> < FaCss3 style={{ color: '#264de4', }}/>  HTML & CSS  </li>
                    <li> < FaJs style={{ color: '#f0db4f', marginRight: '8px' }}/> JavaScript </li>
                    <li> < FaReact style={{ color: '#61dbfb', marginRight: '8px' }}/> React JS</li>
                    <li> < FaBootstrap style={{ color: '#563d7c', marginRight: '8px' }}/> Bootstrap</li>
                </ul>

            </div>

            <div className="col-md-4">

                <h5>تواصل معنا</h5>
                <p>
                البريد الإلكتروني: <a href="mailto:contact@webcraft.com">webcraft.multiservices@gmail.com</a><br />
                واتساب: <a href="https://wa.me/212628114655" target='_blank'> 55 46 11 28 06 212+</a><br />
                فيسبوك: <a href="https://web.facebook.com/profile.php?id=61567540797013" target="_blank">WebCraft.dev</a>
                </p>
            </div>
        </div>

        <div className="text-center pb-3">
            <p>© <span ></span> WebCraft - جميع الحقوق محفوظة</p>
            {currentYear}
        </div>
    </div>
    </footer>
        
  )
}

export default Footer