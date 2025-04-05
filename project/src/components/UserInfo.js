import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuth } from '../store/auth';
import { baseurl } from '../Config/config';
import Rugh from './Rugh';
import Navbar from './Navbar';
import Footer from './Footer';
import { Link } from 'react-router-dom';
import { BiSolidHide } from "react-icons/bi";
import { BiSolidShow } from "react-icons/bi";

const ForgotPassword = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [passwordVisibility, setPasswordVisibility] = useState({
        oldPassword: false,
        newPassword: false,
        confirmPassword: false,
    });

    const { data, isLoading } = useAuth();

    if (isLoading) {
        return <h1>Loading...</h1>;
    }

    const togglePasswordVisibility = (field) => {
        setPasswordVisibility((prev) => ({
            ...prev,
            [field]: !prev[field],
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            toast.error("New password and confirm password do not match");
            setMessage("New password and confirm password do not match");
            return;
        }

        try {
            const response = await axios.put(`${baseurl}/forgotpassword/${data._id}`, {
                oldPassword,
                password: newPassword,
            });
            toast.success(response.data.message);
            setMessage(response.data.message);
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to update password");
            setMessage(error.response?.data?.message || "Failed to update password");
        }
    };

  

    return (
        <>
            <Rugh />
            <Navbar />
            <h1 className="contact-text text-center fs-1 mt-5">Change Password</h1>
            <p className="text-center mb-5">
                Change your password. In order to change your password, you need to be signed in. Continue to sign in.
            </p>
            <div className="container">
                <div className="row">
                    <div className="col-lg-6">
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="oldPassword" className="set-text">Old Password</label><br />
                            <div className="input-group mb-3">
                                <input
                                    type={passwordVisibility.oldPassword ? "text" : "password"}
                                    value={oldPassword}
                                    onChange={(e) => setOldPassword(e.target.value)}
                                    required
                                    className="input1 form-control"
                                />
                                <button
                                    type="button"
                                    className="btn btn-outline-secondary"
                                    onClick={() => togglePasswordVisibility("oldPassword")}
                                >
                                    {passwordVisibility.oldPassword ? <BiSolidHide/> : <BiSolidShow/>}
                                </button>
                            </div>

                            <label htmlFor="newPassword" className="set-text">New Password</label><br />
                            <div className="input-group mb-3">
                                <input
                                    type={passwordVisibility.newPassword ? "text" : "password"}
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    required
                                    className="input1 form-control"
                                />
                                <button
                                    type="button"
                                    className="btn btn-outline-secondary"
                                    onClick={() => togglePasswordVisibility("newPassword")}
                                >
                                    {passwordVisibility.newPassword ? <BiSolidHide/> : <BiSolidShow/>}
                                </button>
                            </div>

                            <label htmlFor="confirmPassword" className="set-text">Confirm Password</label><br />
                            <div className="input-group mb-3">
                                <input
                                    type={passwordVisibility.confirmPassword ? "text" : "password"}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                    className="input1 form-control"
                                />
                                <button
                                    type="button"
                                    className="btn btn-outline-secondary"
                                    onClick={() => togglePasswordVisibility("confirmPassword")}
                                >
                                    {passwordVisibility.confirmPassword ? <BiSolidHide/> : <BiSolidShow/>}
                                </button>
                            </div>

                            <button type="submit" className="btn btn-success">Change Password</button>
                            <button
                                type="button"
                                className="btn btn-primary ms-2 "
                               
                            >
                              <Link to={`/reset-password/${data._id}/`} className='text-light'> Reset password</Link>
                            </button>
                        </form>

                        {message && <p className="mt-3 text-success">{message}</p>}
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
};

export default ForgotPassword;
