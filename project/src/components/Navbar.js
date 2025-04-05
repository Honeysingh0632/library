// src/components/Navbar.js
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

import { IoMdMail } from "react-icons/io";
import { IoCall } from "react-icons/io5";
import { FaInstagram } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { IoTime } from "react-icons/io5";



const Navbar = () => {

  function  showSidebar(){
    const sidebar = document.querySelector('.sidebar')
    sidebar.style.display = 'flex'
  }
  function hideSidebar(){
    const sidebar = document.querySelector('.sidebar')
    sidebar.style.display = 'none'
  }
 

  return (
   <>
   

   <div className='headline hideOnMobile'>
    
    <p><i className='me-2'> <IoCall/></i>122-456-7890</p>
    
    <p><i className='me-2'><IoMdMail/></i>info@mysite.com</p>
    
    <p><i className='me-2'><IoTime/></i>  Mon to sat Open: 9am - 6pm</p>

<div className='icon-set4'>
<i className='me-3'><FaInstagram/></i>
    < i className='me-3'> <FaFacebook/></i>
    <i className='me-3'><FaTwitter/></i>
    <i className='me-3'><FaLinkedin/></i>

</div>
   
    </div>
   
    {/* <nav className="navbar">

    
        <div className="nav1">
        <h1><i className='ms-5 me-2 bold-text'><IoBookSharp/></i>Library</h1>
        
           
            </div> 
            <div className="nav2">
                <NavLink to="/" className="a2">Home</NavLink>
                <NavLink to="/about" className="a2">About</NavLink>
                <NavLink to="/services" className="a2">Services</NavLink>
                <NavLink to="/contact" className="a2">Contact</NavLink>
                <NavLink to="/contact" className="a2">New Addition</NavLink>

            </div>
       

      </nav> */}
                  
                 

                   </>
  );
};

export default Navbar;
