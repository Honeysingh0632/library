import React,{useState} from "react";
import Navbar from './Navbar';
import Rugh from './Rugh';
import Footer from './Footer';
import { Navigate, useNavigate } from "react-router-dom";
import { baseurl } from "../Config/config";


const BookSugguest = () => {

    const [set,newset] =useState({name:"",email:"",bookname:"",authorname:""})
    const navigate =useNavigate();


    const submit = async(e)=> {
        e.preventDefault()
        console.log(set)
    
        try {
            const response = await fetch (`${baseurl}/books`,
                {method:'POST',
                    headers:{'Content-type':'application/json'},
                    body:JSON.stringify(set)}) 
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




    const change =(e) => {
        const {name,value} = e.target
        newset({...set,[name]:value})
        
    
    }



    return (
        <>
        {/* <NewBooks/> */}
        <Navbar/>
        <Rugh/>
        <h1 className="contact-text text-center fs-1 mt-5">Sugguest Book</h1>
        <p className="text-center mb-5">Some Times we Have Not Some Books In Our Library So Please Sugguest Us New Books Or Author Name</p>
        <div className="container">
            <div className=" row ">
                <div className="col-lg-6">
                <form>

                    <label for="Book-name" className="set-text">Your name</label><br/>
                    <input type="text" name="name" id="bookname" value={set.name} onChange={change} className="input1"></input><br/><br/>

                    <label for="Book-name" className="set-text">Your Email</label><br/>
                    <input type="text" name="email" id="bookname" className="input1"  value={set.email} onChange={change}></input><br/><br/>

                    <label for="Book-name" className="set-text">Book name</label><br/>
                    <input type="text" name="bookname" id="bookname" className="input1"  value={set.bookname} onChange={change}></input><br/><br/>

                    <label for="Book-name" className="set-text">Author name</label><br/>
                    <input type="text" name="authorname" id="bookname"className="input1"  value={set.authorname} onChange={change}></input><br/><br/>

                    <button className="btn btn-success" onClick={submit}>Send Sugguest</button>

                    </form>
                  

                </div>
                <div className="col-lg-6">
                <div className="container mt-5">
            <div className="row">
                <div className="col-lg-3"><img src={require('./images/books.jpeg')} className="book1"></img></div>
                <div className="col-lg-3" > <img src={require('./images/book2.jpeg')} className="book1"></img></div>
                <div className="col-lg-3"> <img src={require('./images/books3.jpeg')} className="book1"></img></div>
                <div className="col-lg-3"> <img src={require('./images/books4.jpeg')} className="book1"></img></div>
            </div>
            </div>
                    </div>
            </div>
        </div>
       <Footer/>
        </>
        
    )
}

export default BookSugguest;