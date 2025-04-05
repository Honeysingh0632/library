import React,{useEffect, useContext} from "react";

import { Link, Navigate, Outlet, Router  } from 'react-router-dom';
import { useAuth } from "../store/auth";
import './adminstyle.css';
import { IoIosContact } from "react-icons/io";
import { FaBook } from "react-icons/fa";
import { FaUserAstronaut } from "react-icons/fa";
import { BiSolidBookAdd } from "react-icons/bi";
import { GiWhiteBook } from "react-icons/gi";
import { FaUserCheck } from "react-icons/fa";
import { IoBookSharp } from "react-icons/io5";
import { FaHome } from "react-icons/fa";
import { SiCashapp } from "react-icons/si";
import { FaShoppingCart } from "react-icons/fa";
import { BsCardImage } from "react-icons/bs";
import { FaRegImages } from "react-icons/fa";










const Admin = () => {

    const {data,isLoadind} = useAuth();
    // console.log(data,"ndsnjdbn cn n znx kjbjj")

    if(isLoadind){
        return <h1>loading..</h1>
    }

    if (!data.isAdmin){
        return <Navigate to='/' />
    }

   
    


    return(
        <>
   
         

       
       
        <div className="admin border  ">
            
            <div className="sidebaar-1 border  w-20 p-3">
            <h1 className="fs-4"> <i className='bold-text'><IoBookSharp /></i> Library</h1>
            <h1 className="bold-text ">Admin Dashbord </h1>
                <h5 className="mt-3"><i className="me-2"><IoIosContact/></i>Contact User Details</h5>
                 <Link to="ContactUser" className="text-dark me-5"> Click here</Link> <br></br>
                 <h5 className="mt-3"> <i className="me-2"><FaBook/></i> Book Sugguest Details</h5>
                 <Link to="BookSugguestData" className="text-dark me-5"> Click here</Link><br></br>
                 <h5 className="mt-3"> <i className="me-2"><FaUserAstronaut/></i>User Details</h5>
                 <Link to="UserData" className="text-dark me-5">Click here</Link>
                 <h5 className="mt-3"><i className="me-2"><BiSolidBookAdd/></i>Add books</h5>
                 <Link to="Addbook" className="text-dark me-5">Click here</Link>
                 <h5 className="mt-3"><i className="me-2"><BsCardImage/></i>Add Banner</h5>
                 <Link to="Banner" className="text-dark me-5">Click here</Link>
                 <h5 className="mt-3"><i className="me-2"><FaRegImages/></i> Banner list</h5>
                 <Link to="Bannerlist" className="text-dark me-5">Click here</Link>
                 <h5 className="mt-3"><i className="me-2"><GiWhiteBook/></i>All books detailes</h5>
                 <Link to="Allbook" className="text-dark me-5">Click here</Link>
                 <h5 className="mt-3"><i className="me-2"><SiCashapp/></i>Payment detailes</h5>
                 <Link to="Payment" className="text-dark me-5">Click here</Link>
                 <h5 className="mt-3"><i className="me-2"><FaShoppingCart/></i>Order detailes</h5>
                 <Link to="Order" className="text-dark me-5">Click here</Link>
                 <h5 className="mt-3"><i className="me-2"><FaUserCheck/></i>Logged in User  detailes</h5>
                 <Link to="Userlogin" className="text-dark me-5">Click here</Link>
                 <h5 className="mt-3"><i className="me-2"><FaHome/></i>Go to home</h5>
                 <Link to="/" className="text-dark me-5">Click here</Link>
                 
            </div>
            <div className="sidebaar-2">
            <Outlet/>
            </div>
       
       
     
       
      </div>  
      <div className="container-fluid bg-primary w-100 h-50 text-center mt-5 ">
      
        <p className="text-light">  @libaray managment</p>

      </div>
        
        
            

         
        
       

        </>
    )
}

export default Admin;
