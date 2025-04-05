import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseurl } from "../Config/config"; // Adjust the path as needed
import "./OrderList.css"; // Add styles for the layout
import Footer from "../components/Footer";
import Rugh from "../components/Rugh";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

function OrderList() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch data from API
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const token = localStorage.getItem("token");
                const headers = { Authorization: `${token}` };

                const response = await axios.get(`${baseurl}/payment/details`, { headers });
                console.log("API Response:", response.data); // Debugging log
                setOrders(response.data);
            } catch (error) {
                console.error("Error fetching orders:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <>
            <Navbar />
            <Rugh />
            <div className="order-list-container  ">
                {orders.length === 0 ? (
                    // ✅ Show this message when no orders are found
                    <div className="no-orders  text-center p-5 mt-3">
                        <h2>No orders found</h2>
                        <p>Looks like you haven't placed any orders yet.</p>
                        <Link to="/NewAdd" className="btn btn-primary">
                            Explore Books
                        </Link>
                    </div>
                ) : (
                    orders.map((order) => (
                        <div key={order._id} className="order-card">
                            <div className="order-header">
                                <h4>Order ID: {order.razorpay_order_id}</h4>
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
                            <button className="order-detail-button">
                                <Link to={`/Ordersingle/${order._id}/`} className="text-light">
                                    Detail
                                </Link>
                            </button>
                        </div>
                    ))
                )}
            </div>
            <Footer />
        </>
    );
}

export default OrderList;
