import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseurl } from "../Config/config"; // Adjust the path as needed
// import "./OrderList.css"; // Add styles for the layout
import Footer from "../components/Footer";
import Rugh from "../components/Rugh";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

function Testorder() {
    const [orders, setOrders] = useState([]);
    // const [loading, setLoading] = useState(true);

    // Fetch data from API
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const token = localStorage.getItem("token");
                const headers = { Authorization: token };
    
                const { data } = await axios.get(`${baseurl}/payment/details`, { headers });
    
                setOrders(data); // Store only logged-in user's orders
            } catch (error) {
                console.error("Error fetching orders:", error);
                // toast.error("Failed to fetch orders");
            }
        };
    
        fetchOrders();
    }, []);
    

    // if (loading) {
    //     return <p>Loading...</p>;
    // }

    return (
        <>
            <Navbar />
            <Rugh />
            <div className="order-list-container">
                {orders.map((order) => (
                    <div key={order._id} className="order-card">
                        <div className="order-header">
                            <h4>Order ID: {order.razorpay_order_id}</h4>
                            {/* Check if bookDetails and orderStatus exist */}
                            {order.bookDetails?.orderStatus ? (
                                <span
                                    className={`order-status ${order.bookDetails.orderStatus
                                        .toLowerCase()
                                        .replace(/\s+/g, "-")}`}
                                >
                                    {order.bookDetails.orderStatus}
                                </span>
                            ) : (
                                <span className="order-status undefined">Status Unavailable</span>
                            )}
                        </div>
                        <div className="order-item">
                            <img
                                src={`${baseurl}${order.bookDetails?.image}`}
                                alt={order.bookDetails?.name || "Book Image"}
                            />
                            <div className="order-item-details">
                                <h5>{order.bookDetails?.name || "Book Name Unavailable"}</h5>
                                <p>Author: {order.bookDetails?.author || "Author Unavailable"}</p>
                                <p>Price: ₹{order.bookDetails?.price || "N/A"}</p>
                                <p>Quantity: {order.quantity || 0}</p>
                                <p>Total: ₹{order.totalPrice || "N/A"}</p>
                            </div>
                        </div>
                        <button className="order-detail-button "><Link to={`/Ordersingle/${order._id}/`} className="text-light">Detail</Link></button>
                    </div>
                ))}
            </div>
            <Footer />
        </>
    );
}

export default Testorder;
