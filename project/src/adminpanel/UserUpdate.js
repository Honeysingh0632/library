
// src/components/UpdateForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';  // Or you can use fetch()
import { useParams ,useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { baseurl } from '../Config/config';


function UserUpdate({ id }) {
    const [firstName, setFirst] = useState('');
    const [lastName, setLast] = useState('');
    const [email, setemail] = useState('');
   
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
                const response = await axios.get(`http://localhost:8000/userlogin/${parmas.id}`,
                    {headers}
                );
                setFirst(response.data.firstName);
                setLast(response.data.lastName);
                setemail(response.data.email);
              
               
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
            firstName,
            lastName,
            email,
           
        };

        try {
            const response = await axios.put(`${baseurl}/updateuserlogin/${parmas.id}`, updatedData);  // Or use fetch()
            setMessage(response.data.message1); 
            navigate('/AdminPanel/UserData');
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
                    <label className='set-text'>firstName</label><br/>
                    <input 
                        type="text" 
                        value={firstName} 
                        onChange={(e) => setFirst(e.target.value)} 
                        required 
                        className="form-control"
                    />
                </div>
                <div>
                    <label className='set-text'>lastName</label><br/>
                    <input 
                        type="text" 
                        value={lastName} 
                        onChange={(e) => setLast(e.target.value)} 
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
                <button type="submit" className='btn btn-success mt-2'>Update</button>
            </form>
            {message1 && <p>{message1}</p>}
        </div>
    );
}

export default UserUpdate;
