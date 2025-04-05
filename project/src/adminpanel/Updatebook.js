
import React, { useState, useEffect } from 'react';
import axios from 'axios';  // Or you can use fetch()
import { useParams ,useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { baseurl } from '../Config/config';


function Updatebook({ id }) {
    const [AddBookname, setAddBookname] = useState('');
    const [AddAuthorname, setAddAuthorname] = useState('');
   
    const [bookdesc, setbookdesc] = useState('');
    const [bookprice, setbookprice] = useState('');
    const [bookoldprice, setbookoldprice] = useState('');
    const [bookrating, setbookrating] = useState('');
    const [preview, setPreview] = useState(null);
    const [file, setFile] = useState(null);

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
    
              
                const response = await axios.get(
                    `${baseurl}/addbook/single/${parmas.id}`,
                    { headers }
                );
    
                // Update state with the response data
                setAddBookname(response.data.AddBookname);
                setAddAuthorname(response.data.AddAuthorname);
                setbookdesc(response.data.bookdesc);
                setbookprice(response.data.bookprice);
                setbookoldprice(response.data.bookoldprice);
                setbookrating(response.data.bookrating);
    
                // Set the preview image
                setPreview(response.data.image); // Assuming `response.data.image` contains the image URL
            } catch (error) {
                console.error("Error fetching the data", error);
            }
        };
    
        fetchData();
    }, [id]); // Ensure `params.id` is used if it's derived from props
    
    const parmas = useParams();

    // Handle form submission for updating data
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
      formData.append('AddBookname', AddBookname);
      formData.append('AddAuthorname', AddAuthorname);
      formData.append('bookdesc', bookdesc);
      formData.append('bookprice', bookprice);
      formData.append('bookoldprice', bookoldprice);
      formData.append('bookrating', bookrating);
      formData.append('image', file);

        
        try {
            const response = await axios.put(`${baseurl}/update/image/${parmas.id}`, formData);  // Or use fetch()
            setMessage(response.data.message1); 
            navigate('/AdminPanel/Allbook');
            toast.success('User data update  successfully  ')
             
        } catch (error) {
            console.error("Error updating the data", error);
            setMessage("Error updating data");
        }
    };
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        setPreview(URL.createObjectURL(e.target.files[0])); // Optional preview
      };
   

    return (
        <div>
            <h1>Update Data</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label className='set-text'>AddBookname</label><br/>
                    <input 
                        type="text" 
                        value={AddBookname} 
                        onChange={(e) => setAddBookname(e.target.value)} 
                        required 
                        className="form-control"
                    />
                </div>
                <div>
                    <label className='set-text'>AddAuthorname</label><br/>
                    <input 
                        type="text" 
                        value={AddAuthorname} 
                        onChange={(e) => setAddAuthorname(e.target.value)} 
                        required 
                        className="form-control"
                    />
                </div>
               
                <div>
                    <label className='set-text'>image</label><br/>
                    <input 
                        type="file" 
                        // value={image} 
                        onChange={handleFileChange} 
                        required 
                        className="form-control"
                    />
                    {preview && (
              <div>
                <img src={preview} alt="Image Preview" width="150" />
              </div>
            )}
                </div>
                <div>
                    <label className='set-text'>bookdesc</label><br/>
                    <input 
                        type="text" 
                        value={bookdesc} 
                        onChange={(e) => setbookdesc(e.target.value)} 
                        required 
                        className="form-control"
                    />
                </div>
                <div>
                    <label className='set-text'>bookprice</label><br/>
                    <input 
                        type="number" 
                        value={bookprice} 
                        onChange={(e) => setbookprice(e.target.value)} 
                        required 
                        className="form-control"
                    />
                </div>
                <div>
                    <label className='set-text'>bookoldprice</label><br/>
                    <input 
                        type="number" 
                        value={bookoldprice} 
                        onChange={(e) => setbookoldprice(e.target.value)} 
                        required 
                        className="form-control"
                    />
                </div>
                <div>
                    <label className='set-text'>bookrating</label><br/>
                    <input 
                        type="number" 
                        value={bookrating} 
                        onChange={(e) => setbookrating(e.target.value)} 
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

export default Updatebook;