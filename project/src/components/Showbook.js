import React,{useEffect,useState} from "react";
import axios from "axios";
import Navbar from "./Navbar";
import Rugh from "./Rugh";
import Footer from "./Footer";
import Yes from "./Yes";
import ProfileDropdown from "./Yes";
import { Link } from "react-router-dom";
import { baseurl } from "../Config/config";
import { useAuth } from "../store/auth";
import SearchBook from "../Search/Searchbook";




const Showbook = () => {

    // const [data,Setdata] =useState([]);

    const {filteredBooks} = useAuth(); 

    

    // useEffect(() => {
    //     const fetchData = async () => {
    //       const token = localStorage.getItem('token');

    //       try {
    //         const res = await axios.get(`${baseurl}/addbook/getapi`,
    //           {
    //             method:'GET',
    //             headers:{
    //               'Content-Type': 'application/json',
    //               'Authorization': `${token}`
    //             }
    //           }
    //         );
    //         Setdata(res.data);
    //       } catch (err) {
    //         console.error(err);
    //       }
    //     };
    
    //     fetchData();
    //   }, []);
    return(
        <>
            <div className="mt-5 hey-last">
            
            <h1 className="new-text text-center mt-5 "> Our Books <span className="price-text1"> collections</span></h1>
               <p className="text-center mt-2">we have a wide range of books in our libaray and many more exclusive books </p>

               <div className="mt-4">
              
               <SearchBook/>
               </div>

   

        <div className="container mt-3">
        <div className="row">
            
        
                {filteredBooks.map((value) =>
                
                
                    <div className="  card-book p-3 mt-5 col-lg-3 text-center">
                        

                        {value.image && (
            <img src={`${baseurl}${value.image}`} alt={value.AddBookname} width="200"  className="add-book-card"/>
          )}

                         <h3>{value.AddBookname}</h3>
                        
                         <h6>{value.AddAuthorname}</h6>
                         <p>{value.bookdesc}</p>
                         <p className="text-success">price:{value.bookprice}$</p>
                       
                         <p className="text-decoration-line-through text-danger"> Old price :{value.bookoldprice} $</p>
                         <p> Book Rating :{value.bookrating}/5</p>
                       <br/>
                       <button className="btn btn-dark" >
                         <Link to={`/Singlebook/${value._id}/edit`} className="link" >Read Now</Link></button>
                        {/* <button className="btn btn-primary"> <Link to={`/payment/${value._id}/`} className="link" >Read Now</Link></button> */}

                    </div>
               
                )}
            </div>
        </div>

        <div className="text-center">
            <button className=" mt-5 buttonx1"><Link to="/NewAdd" className="link">Explore More</Link> </button>
        
        </div>

            </div>
        
               
        
           
        </>
       
    )
}
export default Showbook;