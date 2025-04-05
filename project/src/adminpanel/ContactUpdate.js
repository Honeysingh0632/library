
// src/components/UpdateForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';  // Or you can use fetch()
import { useParams ,useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { baseurl } from '../Config/config';


function ContactUpdate({ id }) {
    const [name, setName] = useState('');
    const [email, setemail] = useState('');
    const [phone, setbookname] = useState('');
    const [message, setauthorname] = useState('');
    const [message1, setMessage] = useState('');
 
    const navigate =useNavigate();
    // Fetch the existing data to populate the form (optional)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
    
               
                const headers = {
                    Authorization: `${token}`, 
                };
                const response = await axios.get(`${baseurl}/usercontact/${parmas.id}`,
                    {headers}
                );
                setName(response.data.name);
                setemail(response.data.email);
                setbookname(response.data.phone);
                setauthorname(response.data.message);
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
            phone,
            message
        };

        try {
            const response = await axios.put(`${baseurl}/updatecontact/${parmas.id}`, updatedData);  // Or use fetch()
            setMessage(response.data.message); 
            navigate('/AdminPanel/ContactUser');
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
                    <label className='set-text'>phone</label><br/>
                    <input 
                        type="number" 
                        value={phone} 
                        onChange={(e) => setbookname(e.target.value)} 
                        required 
                        className="form-control"
                    />
                </div>
                <div>
                    <label className='set-text'>Authour Name</label><br/>
                    <input 
                        type="text" 
                        value={message} 
                        onChange={(e) => setauthorname(e.target.value)} 
                        required 
                        className="form-control"
                    />
                </div>
                <button type="submit" className='btn btn-success mt-2'>Update</button>
            </form>
            {message1 && <p>{message1}</p>}
        </div>
    );
}

export default ContactUpdate;
