import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { baseurl } from "../Config/config";

const ContactUser = () => {
    const [data, setData] = useState(null); // Initialize as null
    const [error, setError] = useState(null); // Track errors
    const navigate = useNavigate();

    // Fetch data on component mount
    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await fetch(`${baseurl}/singleuser`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token,
                    },
                });

                if (!response.ok) throw new Error('Network response was not ok');

                const result = await response.json();
                console.log("API Result:", result);

                // Check if `message` exists in result
                if (result?.message) {
                    setData(result.message); // Set data to `message` object
                } else {
                    setError("No user data found");
                }
            } catch (err) {
                console.error('Fetch error:', err);
                setError(err.message); // Update error state
            }
        };

        fetchData();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate('/');
        toast.info('Logged out successfully');
    };

    return (
        <div className="container mt-4">
            <h1 className="text-center fs-3">Logged-in User Details</h1>
            {error ? (
                <p className="text-danger text-center">{error}</p>
            ) : data ? (
                <div className="row justify-content-center">
                    <div className="card p-3 mt-4 col-lg-4 text-center ms-5">
                        <h3>{data.firstName} {data.lastName}</h3>
                        <p><strong>Email:</strong> {data.email}</p>
                        <p><strong>Admin Status:</strong> {data.isAdmin ? "Yes" : "No"}</p>
                        <button className="btn btn-primary mt-3" onClick={handleLogout}>
                            Log Out
                        </button>
                    </div>
                </div>
            ) : (
                <p className="text-center mt-4">Loading user data...</p>
            )}
        </div>
    );
};

export default ContactUser;
