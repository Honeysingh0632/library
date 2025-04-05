// src/components/OrderUpdate.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { baseurl } from '../Config/config';

function OrderUpdate() {
    const [orderDetails, setOrderDetails] = useState(null); // Holds the complete order object
    const [orderStatus, setOrderStatus] = useState('');
    const [message, setMessage] = useState('');
    const { id } = useParams(); // Dynamic route parameter for the order ID
    const navigate = useNavigate();

    // Fetch the existing order data to populate the form
    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                const headers = { Authorization: `${token}` };

                const response = await axios.get(`${baseurl}/test/order-single/${id}`, { headers });
                setOrderDetails(response.data);
                setOrderStatus(response.data.bookDetails?.orderStatus || ''); // Set initial order status
            } catch (error) {
                console.error("Error fetching the data", error);
                toast.error('Failed to fetch order details.');
            }
        };

        fetchData();
    }, [id]);

    // Handle form submission for updating data
    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedData = {
            "bookDetails.orderStatus": orderStatus, // Update only the orderStatus field inside bookDetails
        };

        try {
            const token = localStorage.getItem('token');
            const headers = { Authorization: `${token}` };

            const response = await axios.put(`${baseurl}/test/updateorder/${id}`, updatedData, { headers });
            setMessage(response.data.message);
            toast.success('Order status updated successfully!');
            navigate('/AdminPanel/Order'); // Navigate after successful update
        } catch (error) {
            console.error("Error updating the data", error);
            setMessage("Error updating order status");
            toast.error('Failed to update order status.');
        }
    };

    return (
        <div className="container mt-4">
            <h1 className="mb-4">Update Order Details</h1>
            {orderDetails ? (
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Order Status</label>
                        <select
                            className="form-select"
                            value={orderStatus}
                            onChange={(e) => setOrderStatus(e.target.value)}
                            required
                        >
                            <option value="">Select Order Status</option>
                            <option value="Order confirm">Order confirm</option>
                            <option value="shipped">Shipped</option>
                            <option value="out for delivery">Out for delivery</option>
                            <option value="delivered">Delivered</option>
                            <option value="returned">Returned</option>
                            <option value="not delivered">not delivered</option>
                        </select>
                    </div>
                    <button type="submit" className="btn btn-success">Update Order</button>
                </form>
            ) : (
                <p>Loading order details...</p>
            )}
            {message && <p className="mt-3 text-success">{message}</p>}
        </div>
    );
}

export default OrderUpdate;
