import React,{useEffect, useState } from "react";

import { FaLocationDot } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";
import { IoCall } from "react-icons/io5";
import { IoTime } from "react-icons/io5";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { baseurl } from "../Config/config";

const Contact1 = () => {

    const[name,SetName] = useState('');
    const[email,SetEmail]= useState('')
    const [phone,SetPhone] = useState('')
    const [message,SetMessage] = useState('')
    const [message1,SetMessage1] = useState('')
  

    const [set,newset] =useState({name:"",email:"",phone:"",message:""})
    
    const navigate =useNavigate();

    const submit = async(e)=> {
        e.preventDefault()
        console.log(set)
    
        try {
            const response = await fetch (`${baseurl}/submit`,
                {method:'POST',
                    headers:{'Content-type':'application/json'},
                    body:JSON.stringify(set)}) 
                    toast.success('submit data ')
                    navigate('/');

    
                if(!response.ok){
                 console.log("error")
    
                }else {
                    const data = await response.json()
                    console.log('success',data)
                    // alert('submit data')
                }
        } catch{
            console.log('error')
        }
    }

   const handelchange =(e) => {
    const {name,value} = e.target
    newset({...set,[name]:value})
   
    

}

       

    return(
        <>
        <div className="Contact1  mt-5">
            <h1 className="contact-text text-center"> Contact Us</h1>
           
            <div className="form1 container mt-5 me-1">
                <div className="row">
                    <div className="col-lg-6">

                    <span className="text-danger" role="alert">
                  {message1}
                    </span> 
                    <form >
                <label for="Name" className="set-text">Your Name</label><br/>
                <input name="name" required id="name" type="text" value= {set.name} onChange={handelchange} className="input1" ></input><br/><br/>

                <label for="email"  className="set-text">Your Email</label><br/>
                <input name="email" required id="email" type="text"  value= {set.email} onChange={handelchange}  className="input1"></input><br/><br/>

                <label for="Phone"  className="set-text">Your number</label><br/>
                <input name="phone" required id="phone" type="text"  value= {set.phone} onChange={handelchange}  className="input1"></input><br/><br/>

                <label for="message"  className="set-text">Message</label><br/>
                <textarea name="message" required id="message" type="text"   value= {set.message} onChange={handelchange}  className="input2"></textarea><br/><br/>

               <button type="submit"  className="submit-btn" onClick={submit} >Send response</button>
                 </form>
                

                    </div>
                    <div className="col-lg-6 contact-res">
                        <h1><FaLocationDot className="icon me-2"/> Location</h1>
                        <p className="set-text1">500 Terry Francine Street<br/>
                            San Francisco,CA 94158</p><br/>
                        <h1> <IoMdMail className="icon me-2"/> Genral Enquire</h1>
                        <p className="set-text1">info@mysite.com</p><br/>
                        <h1 > <IoCall  className="icon me-2"/>Call Us</h1>
                        <p className="set-text1">123-456-7890</p><br/>
                        <h1 >< IoTime className="icon me-2"/> Timing</h1>
                        <p className="set-text1">Mon - Fri: 8am - 8pm<br/>
                           ​Saturday: 9am - 7pm<br/>
                            Sunday: 9am - 8pm</p>

                    </div>
                </div>
           
            </div>
        </div>
        </>
    )
};

export default Contact1;