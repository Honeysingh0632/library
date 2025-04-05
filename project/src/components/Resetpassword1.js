import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { baseurl } from '../Config/config';
import Navbar from "./Navbar";
import Rugh from "./Rugh";
import Footer from "./Footer";
import styles from "../user/styles.module.css";
import { BiSolidHide } from "react-icons/bi";
import { BiSolidShow } from "react-icons/bi";


const Reasetpassword1 = () => {
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isVerified, setIsVerified] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
     const [passwordVisibility, setPasswordVisibility] = useState({
           
            newPassword: false,
            confirmPassword: false,
        });

    // Handle email verification
    const handleEmailSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const token = localStorage.getItem('token');

            const headers = {
                Authorization: `${token}`,
            };
            const response = await axios.post(`${baseurl}/password-reset/verify-email`, { email },
                {headers}

            );
            toast.success(response.data.message);
            setIsVerified(true); // Email verified
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to verify email");
        } finally {
            setIsLoading(false);
        }
    };

    // Handle password reset
    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        setIsLoading(true);
        try {
            const token = localStorage.getItem('token');

            const headers = {
                Authorization: `${token}`,
            }

            const response = await axios.post(`${baseurl}/password-reset`, { email, newPassword },
                {headers}
            );
            toast.success(response.data.message);
            window.location.reload()
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to reset password");
        } finally {
            setIsLoading(false);
        }
    };

    const togglePasswordVisibility = (field) => {
        setPasswordVisibility((prev) => ({
            ...prev,
            [field]: !prev[field],
        }));
    };

    return (
        <>
            <Navbar />
            <Rugh />
            <h1 className="contact-text text-center fs-1 mt-5">Change Password</h1>
            <p className="text-center mb-5">
                Change your password. In order to change your password, you need to verify your email first.
            </p>
            <div className="container">
                <div className="row">
                    <div className="col-lg-6">
                        {!isVerified ? (
                            <form className="mt-5" onSubmit={handleEmailSubmit}>
                                <label htmlFor="email" className="label">Email</label><br />
                                <input
                                    name="email"
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="input-login1 mt-3 w-75"
                                />
                                <br /><br />
                                <button
                                    className={`btn btn-primary mt-2 w-25 ${isLoading ? 'loading-button' : ''}`}
                                    type="submit"
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'Verifying...' : 'Verify Email'}
                                </button>
                            </form>
                        ) : (
                            <form className="mt-5" onSubmit={handlePasswordSubmit}>
                                <label htmlFor="newPassword" className="label">New Password</label><br />
                                <input
                                    name="newPassword"
                                    id="newPassword"
                                    type={passwordVisibility.newPassword ? "text" : "password"}
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    required
                                    className="input-login1 mt-3 w-75"
                                /> <button
                                  type="button"
                                  className="btn btn-outline-primary"
                                    onClick={() => togglePasswordVisibility("newPassword")}
                                  >
                                   {passwordVisibility.newPassword ? <BiSolidHide/> : <BiSolidShow/>}
                                                                </button>
                                <br /><br />
                                <label htmlFor="confirmPassword" className="label">Confirm Password</label><br />
                                <input
                                    name="confirmPassword"
                                    id="confirmPassword"
                                    type={passwordVisibility.confirmPassword ? "text" : "password"}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                    className="input-login1 mt-3 w-75"
                                /> <button
                                  type="button"
                                  className="btn btn-outline-primary"
                                 onClick={() => togglePasswordVisibility("confirmPassword")}
                                 >
                                 {passwordVisibility.confirmPassword ? <BiSolidHide/> : <BiSolidShow/>}
                                  </button>
                                <br /><br />
                                <button
                                    className={`btn btn-primary mt-2  ${isLoading ? 'loading-button' : ''}`}
                                    type="submit"
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'Resetting...' : 'Change Password'}
                                </button>
                            </form>
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
};

export default Reasetpassword1;
