import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { MdDeleteForever } from "react-icons/md";
import { baseurl } from "../Config/config";

const UserData = () => {

    const [data,Setdata] =useState([]);
    const [users, setUsers] = useState([]);

    const [currentPage, setCurrentPage] = useState(1); // Current page state
    const itemsPerPage = 5;


    const indexOfLastPage = currentPage * itemsPerPage; // Get the index of the last transaction
    const indexOfFirstPage = indexOfLastPage - itemsPerPage; // Get the index of the first transaction
    const CurrentPage = data.slice(indexOfFirstPage, indexOfLastPage); // Get the transactions for the current page
  
    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
  
    // Calculate total pages
    const totalPages = Math.ceil(data.length / itemsPerPage);
    
  

    useEffect(() => {
      const fetchData = async () => {
        const token = localStorage.getItem('token'); // Retrieve the token
  
        try {
          const response = await fetch(`${baseurl}/get`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `${token}`
            }
          });
  
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
  
          const data = await response.json();
          console.log(data); 
          Setdata(data);// Handle data as needed
        } catch (error) {
          console.error('Fetch error:', error);
        }
      };
  
      fetchData();
    }, []);

   
    const deleteUser = async (id) => {
        try {
            await axios.delete(`${baseurl}/userdata/${id}`);
            setUsers(users.filter(user => user._id !== id)); // Update state after deletion
           
            toast.success('User deleted successfully  ')
            window.location.reload()
            // navigate('/AdminPanel/BookSugguestData')

            
        } catch (error) {
            console.error( error);
        }
    };

    return(
        <>

<div className="side-right">
            <h1 class="text-center fs-1 ms-4 ">User Details</h1>
              <div className="side-right-1">
                  <div className="container-fluid ms-3">
                    <div className="row">
                     
                              <table class="table  table-hover table-bordered">
                                    <thead >
                                        <tr >
                                        <th scope="col" className="text-info">#</th>
                                        <th scope="col" className="text-info">id</th>
                                        <th scope="col" className="text-info">First Name</th>
                                        <th scope="col" className="text-info">Last Name</th>
                                        <th scope="col" className="text-info"> Email</th>
                                        <th scope="col" className="text-info"> Update</th>
                                        <th scope="col" className="text-info"> Delete</th>
                                       
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {CurrentPage.length > 0 ? (
                                    CurrentPage.map((value,index) => (
                                        <tr>
                                        <th scope="row">{ index +1}</th>
                                        <td >{value._id}</td>
                                        <td >{value.firstName}</td>
                                        <td >{value.lastName}</td>
                                        <td >{value.email}</td>
                                        {/* <td >{value.isAdmin}</td> */}
                                        {/* <td >{value.password}</td> */}
                                        <td > <button className="btn btn-success btn-sm"> 

                                        <Link className="link" to={`/AdminPanel/userupdate/${value._id}/edit`}

                                        ><i className="fs-5 me-1 link"><FaEdit/></i>Edit</Link> </button></td>

                                        <td > <button className="btn btn-outline-danger btn-sm"
                                        onClick={() => deleteUser(value._id)}><i className="fs-5 me-1"><MdDeleteForever/></i>Delete</button></td> 
                                        </tr>
                                            ))
                                        ) : (
                                            <tr>
                                            <td colSpan="9">you are not access this data</td>
                                            </tr>
                                        )}
                                      
                                    </tbody>
                                    </table>
                </div>
                <div className='text-center'>
        <button className='btn btn-primary mt-2 ' onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => paginate(index + 1)}
            className=' btn btn-light ms-2'
          >
            {index + 1}
          </button>
        ))}
        <button  className='btn btn-primary ms-2 mt-2' onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
            </div>
        </div>
        </div>
                                             
   

        </>
    )
}

export default UserData;