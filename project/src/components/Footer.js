import React from "react";
import { FaLocationDot } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";
import { IoCall } from "react-icons/io5";
import { FaInstagram } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { IoBookSharp } from "react-icons/io5";
import Review from "./Review";


const Footer = () => {

    return(
        <>
        <div className="footer mt-5">
            <div className="container foot-text ">
                <div className="row">
                    <div className="col-lg-3 foot-res">
                        <div className="logo">
                            <div className="logo-1">
                                <i><IoBookSharp /></i>
                            </div>
                          
                            <h1 className="bold-text">Library </h1>
                            <p className="mt-3">Learning is a lifetime journey.<br></br> To make this journey enjoyable</p>

                            {/* <h1 className="fs-2 text-bold" >Connect</h1> */}
                        <div className="icons-2 mt-3 ms-5 m-2">
                        <i ><FaInstagram /> </i>
                        <i><FaFacebook /></i>
                        <i><FaTwitter /></i>
                        <i><FaLinkedin /></i>
                        </div>
                            
                            
                        </div>

                    </div>
                    <div className="col-lg-3">
                        <h1 className="bold-text">Pages</h1>
                        <li className="mt-3">Home</li>
                        <li>About</li>
                        <li>contact</li>
                        <li>new Addition</li>
                        <li>Services</li>

                    </div>
                    <div className="col-lg-3 res-foot1">
                       <h1 className="bold-text">Contact Info</h1>
                      <h5 className="mt-3">  <IoCall className="me-2"/> Phone Number</h5>
                        <p className="ms-5">123-456-7890</p>
                     <h5>  <IoMdMail className="me-2"/> Email Adress</h5>
                        <p className="ms-5">info@mysite.com</p>
                       <h5>  <FaLocationDot className="me-2"/>Office Adress</h5>
                        <p className="ms-5">California, USA</p>
                    </div>
                    <div className="col-lg-3 mb-5 res-foot1">
                        <Review/>
                        </div>
                    </div>
                   
                </div>


                <hr/>
            <div className="last-foot">
                <p>© 2024. All Rights Reserved</p>
                <div className="foot-set res-foot1">

                    <a className="a1" href="#" >Terms of use </a>
                    <a className="a1"  href="#"> Privacy Policy</a> 
                    <a className="a1"  href="#">Cookie Policy</a>
              </div>
            </div>
        
            </div>
          
        </>
    )
}
export default Footer;