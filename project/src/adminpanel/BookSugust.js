import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { MdDeleteForever } from "react-icons/md";
import axios from "axios";
import { FaEdit } from "react-icons/fa";
import { baseurl } from "../Config/config";
import './adminstyle.css';


const BookSugguestData = ({ id }) => {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const indexOfLastPage = currentPage * itemsPerPage;
    const indexOfFirstPage = indexOfLastPage - itemsPerPage;
    const currentPageData = Array.isArray(data) ? data.slice(indexOfFirstPage, indexOfLastPage) : [];

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Calculate total pages
    const totalPages = Math.ceil(data.length / itemsPerPage);

    useEffect(() => {
        const fetchData = async () => {
            
          const token = localStorage.getItem('token'); // Retrieve the token
    
          try {
            const response = await fetch(`${baseurl}/getbook`, {
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
            setData(data);// Handle data as needed
          } catch (error) {
            console.error('Fetch error:', error);
          }
        };
    
        fetchData();
      }, []);

    const deleteUser = async (id) => {
        try {
            await axios.delete(`${baseurl}/user/${id}`);
            setData(data.filter((item) => item._id !== id));
            toast.success('User deleted successfully');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <div className="side-left">
            <h1 className="text-center fs-1 ms-4">Book Suggest Details</h1>
               
                <div className="container-fluid ms-3 set-table">
                    <div className="row ">
                   
                        <table className="table table-hover table-bordered mt-5 ">
                            <thead >
                                <tr>
                                    <th scope="col" className="text-info">#</th>
                                    <th scope="col" className="text-info">ID</th>
                                    <th scope="col" className="text-info">Your Name</th>
                                    <th scope="col" className="text-info">Your Email</th>
                                    <th scope="col" className="text-info">Book Name</th>
                                    <th scope="col" className="text-info">Author Name</th>
                                    <th scope="col" className="text-info">Update</th>
                                    <th scope="col" className="text-info">Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentPageData.length > 0 ? (
                                    currentPageData.map((value, index) => (
                                        <tr key={value._id}>
                                            <th scope="row">{index + 1 + indexOfFirstPage}</th>
                                            <td>{value._id}</td>
                                            <td>{value.name}</td>
                                            <td>{value.email}</td>
                                            <td>{value.bookname}</td>
                                            <td>{value.authorname}</td>
                                            <td>
                                                <button className="btn btn-success btn-sm">
                                                    <Link className="link" to={`/AdminPanel/updatebook/${value._id}/edit`}>
                                                        <FaEdit className="fs-5 me-1" /> Edit
                                                    </Link>
                                                </button>
                                            </td>
                                            <td>
                                                <button className="btn btn-outline-danger btn-sm" onClick={() => deleteUser(value._id)}>
                                                    <MdDeleteForever className="fs-5 me-1" /> Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="8">No data found</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    <div className="text-center">
                        <button className="btn btn-primary mt-2" onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
                            Previous
                        </button>
                        {Array.from({ length: totalPages }, (_, index) => (
                            <button
                                key={index + 1}
                                onClick={() => paginate(index + 1)}
                                className={`btn btn-light ms-2 ${currentPage === index + 1 ? 'active' : ''}`}
                            >
                                {index + 1}
                            </button>
                        ))}
                        <button className="btn btn-primary ms-2 mt-2" onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages}>
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BookSugguestData;
