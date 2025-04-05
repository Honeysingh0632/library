import React from 'react';
import { useAuth } from '../store/auth';
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// Icons
import { CgProfile } from 'react-icons/cg';
import { IoSettingsOutline } from 'react-icons/io5';
import { TbPasswordUser, TbLogout2 } from 'react-icons/tb';
import { FaShoppingCart } from 'react-icons/fa';

// Components
import Navbar from '../components/Navbar';
import Rugh from '../components/Rugh';
import Footer from '../components/Footer';

function Profile() {
    const { data, isLoading } = useAuth();
    const navigate = useNavigate();

    if (isLoading) {
        return (
            <div className="text-center mt-5">
                <h1>Loading...</h1>
            </div>
        );
    }

    const handleLogout = () => {
        localStorage.removeItem("token"); // Remove token from local storage
        toast.info('Logged out successfully'); // Show logout message

        setTimeout(() => {
            window.location.href = "/"; // Force reload and redirect to home page
        }, 1000); // Delay for smoother transition
    };

    return (
        <>
            <Navbar />
            <Rugh />

            <div className="container text-dark py-4">
                <div className="row">
                    <div className="col-lg-6">
                        <div className="p-3">
                            {data ? (
                                <>
                                    <h3 className="text-dark">{data.firstName} {data.lastName}</h3>
                                    <p className="text-dark"><strong>Email:</strong> {data.email}</p>
                                </>
                            ) : (
                                <p className="text-dark fs-4">
                                    <Link to="/signup" className="text-primary">Register or Log in</Link>
                                </p>
                            )}

                            <div className="mt-3">
                                <p className="fs-5">
                                    <CgProfile className="me-2" />
                                    <Link to='/user' className="text-dark text-decoration-none">My Profile</Link>
                                </p>
                                <p className="fs-5">
                                    <IoSettingsOutline className="me-2" />
                                    <Link to="/Editprofile" className="text-dark text-decoration-none">Edit Profile</Link>
                                </p>
                                <p className="fs-5">
                                    <TbPasswordUser className="me-2" />
                                    <Link to="/Changepassword" className="text-dark text-decoration-none">Change Password</Link>
                                </p>
                                <p className="fs-5">
                                    <FaShoppingCart className="me-2" />
                                    <Link to="/OrderList" className="text-dark text-decoration-none">Orders</Link>
                                </p>

                                <button onClick={handleLogout} className="btn btn-danger mt-3">
                                    <TbLogout2 className="me-2" /> Log Out
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Uncomment this section if you want to display book images */}
                    {/* <div className="col-lg-6">
                        <div className="container mt-5">
                            <div className="row">
                                {['books', 'book2', 'books3', 'books4'].map((book, index) => (
                                    <div className="col-lg-3" key={index}>
                                        <img src={require(`../components/images/${book}.jpeg`)} alt={`Book ${index + 1}`} className="img-fluid rounded" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div> */}
                </div>
            </div>

            <Footer />
        </>
    );
}

export default Profile;
