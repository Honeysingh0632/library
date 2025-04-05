
// src/components/UpdateForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';  // Or you can use fetch()
import { useParams ,useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { baseurl } from '../Config/config';


function AdminUpdate({ id }) {
    const [name, setName] = useState('');
    const [email, setemail] = useState('');
    const [bookname, setbookname] = useState('');
    const [authorname, setauthorname] = useState('');
    const [message, setMessage] = useState('');
 
    const navigate =useNavigate();
    // Fetch the existing data to populate the form (optional)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
    
               
                const headers = {
                    Authorization: `${token}`, 
                };
                const response = await axios.get(`${baseurl}/userbook/${parmas.id}`,
                    {headers}
                );
                setName(response.data.name);
                setemail(response.data.email);
                setbookname(response.data.bookname);
                setauthorname(response.data.authorname);
            } catch (error) {
                console.error("Error fetching the data", error);
            }
        };
        fetchData();
    }, [id]);

    const parmas = useParams();

    // Handle form submission for updating data
    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedData = {
            name,
            email,
            bookname,
            authorname
        };

        try {
            const response = await axios.put(`${baseurl}/updatebook/${parmas.id}`, updatedData);  // Or use fetch()
            setMessage(response.data.message); 
            navigate('/AdminPanel/BookSugguestData');
            toast.success('User data update  successfully  ')
             
        } catch (error) {
            console.error("Error updating the data", error);
            setMessage("Error updating data");
        }
    };

    return (
        <div>
            <h1>Update Data</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label className='set-text'>Name</label><br/>
                    <input 
                        type="text" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        required 
                        className="form-control"
                    />
                </div>
                <div>
                    <label className='set-text'>Email</label><br/>
                    <input 
                        type="text" 
                        value={email} 
                        onChange={(e) => setemail(e.target.value)} 
                        required 
                        className="form-control"
                    />
                </div>
                <div>
                    <label className='set-text'>Book Name</label><br/>
                    <input 
                        type="text" 
                        value={bookname} 
                        onChange={(e) => setbookname(e.target.value)} 
                        required 
                        className="form-control"
                    />
                </div>
                <div>
                    <label className='set-text'>Authour Name</label><br/>
                    <input 
                        type="text" 
                        value={authorname} 
                        onChange={(e) => setauthorname(e.target.value)} 
                        required 
                        className="form-control"
                    />
                </div>
                <button type="submit" className='btn btn-success mt-2'>Update</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default AdminUpdate;
