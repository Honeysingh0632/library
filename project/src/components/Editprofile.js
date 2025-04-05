import React, { useState, useEffect } from 'react';
import Rugh from './Rugh';
import Navbar from './Navbar';
import Footer from './Footer';
import { useAuth } from '../store/auth';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify'; 
import { baseurl } from '../Config/config';



function Editprofile() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const { data, isLoadind } = useAuth();
    // console.log(data._id,baseurl);
    

    useEffect(() => {
        if (data) {
            setFirstName(data.firstName || '');
            setLastName(data.lastName || '');
            setEmail(data.email || '');
        }
    }, [data]);

    if (isLoadind) {
        return <h1>Loading...</h1>;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedData = {
            firstName,
            lastName,
            email,
        };

        try {
            const response = await axios.put(`${baseurl}/updateuserlogin/${data._id}`, updatedData);
            setMessage(response.data.message);
            toast.success('User data updated successfully');
        } catch (error) {
            console.error("Error updating the data", error);
            setMessage("Error updating data");
            toast.error('Failed to update user data');
        }
    };

    return (
        <>
            <Rugh />
            <Navbar />
            <h1 className="contact-text text-center fs-1 mt-5">Edit Profile</h1>
            <p className="text-center mb-5">
                Update your profile so that your contacts can properly identify you by following the steps below:
            </p>
            <div className="container">
                <div className="row">
                    <div className="col-lg-6">
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="firstName" className="set-text">First Name</label><br />
                            <input
                                type="text"
                                id="firstName"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                className="input1"
                            /><br /><br />

                            <label htmlFor="lastName" className="set-text">Last Name</label><br />
                            <input
                                type="text"
                                id="lastName"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                className="input1"
                            /><br /><br />

                            <label htmlFor="email" className="set-text">Email</label><br />
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="input1"
                            /><br /><br />

                            <button type="submit" className="btn btn-success">Save</button>
                        </form>

                        {message && <p className="mt-3 text-success">{message}</p>}

                        {data ? (
                            <div className="mt-4">
                                <h3>{data.firstName} {data.lastName}</h3>
                                <p><strong>Email:</strong> {data.email}</p>
                            </div>
                        ) : (
                            <p className="mt-4 text-danger">
                                <Link to="/signup" className="text fs-3">Register or Log in</Link>
                            </p>
                        )}
                    </div>

                    <div className="col-lg-6">
                        <div className="container mt-5">
                            <div className="row">
                                <div className="col-lg-3">
                                    <img src={require('./images/books.jpeg')} alt="Book 1" className="book1" />
                                </div>
                                <div className="col-lg-3">
                                    <img src={require('./images/book2.jpeg')} alt="Book 2" className="book1" />
                                </div>
                                <div className="col-lg-3">
                                    <img src={require('./images/books3.jpeg')} alt="Book 3" className="book1" />
                                </div>
                                <div className="col-lg-3">
                                    <img src={require('./images/books4.jpeg')} alt="Book 4" className="book1" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Editprofile;
