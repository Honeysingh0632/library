import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { baseurl } from '../Config/config';
import { IoBookSharp } from "react-icons/io5";
import styles from "./styles.module.css";
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false); // Loading state

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true); // Start loading
        try {
            const response = await axios.post(`${baseurl}/api/password-reset`, { email });
            toast.success(response.data.message);
            alert(response.data.message)
            window.location = "/login";
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to send reset email");
        } finally {
            setIsLoading(false); // End loading
        }
    };

    return (
        <>
            <div className="container login-main1 mt-2">
                <div className="row">
                    <div className="col-lg">
                        <div className="container login-main m-auto mt-4 p-5">
                            <div className="left-31">
                                <h1 className="text-center fs-3 left-4-tx">
                                    <i className="log-i"><IoBookSharp /></i> Library
                                </h1>
                                <h1 className="text-center mt-3">
                                    Forgot Password <span className="hi-1">!</span>
                                </h1>
                                <p className="text-center">Enter your credentials to access your account</p>
                            </div>
                            <div className="right-3 w-50">
                                <h1>Change or reset your password</h1>
                                <p>
                                    You can change your password for security reasons or reset it if you forget it. Your
                                    Google Account password is used to access many Google products, like Gmail and YouTube.
                                </p>
                                <form className="mt-5" onSubmit={handleSubmit}>
                                    <label htmlFor="email" className="label">Email</label><br />
                                    <input
                                        name="email"
                                        id="email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        className="input-login1 mt-3"
                                    />
                                    <br /><br />
                                    {error && <div className={styles.error_msg}>{error}</div>}
                                    <button
                                        className={`login mt-2 w-50 ${isLoading ? 'loading-button' : ''}`}
                                        type="submit"
                                        disabled={isLoading} // Disable button when loading
                                    >
                                        {isLoading ? 'Sending...' : 'Send Link'}
                                    </button>
                                    <br />
                                    <h6 className="mt-2">or</h6>
                                    <br />
                                    <div className="other-login">
                                        <p className="border bordre-dark yup p-2 me-4">
                                            <img className="google-icon" src={require('./images/google.jpeg')} alt="Google" />
                                            Continue with Google
                                        </p>
                                        <p className="border bordre-dark p-2">
                                            <img className="google-icon" src={require('./images/apple.jpeg')} alt="Apple" />
                                            Continue with Apple
                                        </p>
                                    </div>
                                    <div className="d-flex mt-4 link-1">
                                        <p>Don't have an account</p>
                                        <Link to="/signup" className="link-0 ms-2">Sign up</Link>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ForgotPassword;
