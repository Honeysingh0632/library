import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseurl } from "../Config/config";
import "./OrderList.css"; // Add styles for the layout
import Footer from "../components/Footer";
import Rugh from "../components/Rugh";
import Navbar from "../components/Navbar";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const OrderSingle = () => {
    const { id } = useParams(); // Get the order ID from the route params
    const [orderDetails, setOrderDetails] = useState(null); // Store order details
    const [loading, setLoading] = useState(true); // Loading state

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("token");
                const headers = { Authorization: `${token}` };

                const response = await axios.get(`${baseurl}/test/order-single/${id}`, { headers });
                setOrderDetails(response.data);
            } catch (error) {
                console.error("Error fetching the data:", error);
                toast.error("Failed to fetch order details.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!orderDetails) {
        return <p>Order not found.</p>;
    }

    // Define the stages of the order and determine the current stage index
    const orderStages = ["Order confirm", "Shipped", "Out for delivery", "Delivered"];
    const currentStageIndex = orderStages.findIndex(
        (stage) =>
            stage.toLowerCase() ===
            orderDetails.bookDetails?.orderStatus?.toLowerCase()
    );

    const orderStatus = orderDetails.bookDetails?.orderStatus?.toLowerCase() || "";

    return (
        <>
            <Navbar />
            <Rugh />
            <div className="order-list-container">
                <div className="order-card">
                    <div className="order-header">
                        <h4>Order ID: {orderDetails.razorpay_order_id}</h4>
                        {orderDetails.bookDetails?.orderStatus ? (
                            <span
                                className={`order-status ${orderStatus.replace(/\s+/g, "-")}`}
                            >
                                {orderDetails.bookDetails.orderStatus}
                            </span>
                        ) : (
                            <span className="order-status undefined">Status Unavailable</span>
                        )}
                    </div>

                    {/* Progress Tracker */}
                    <div className="progress-tracker">
                        {["Order confirm", "Shipped", "Out for delivery", "Delivered", "Returned", "Not delivered"]
                            .filter((stage) => {
                                // Exclude "Returned" and "Not delivered" if order is delivered
                                if (orderStatus === "delivered" && ["Returned", "Not delivered"].includes(stage)) {
                                    return false;
                                }
                                return true;
                            })
                            .map((stage, index) => (
                                <div
                                    key={index}
                                    className={`tracker-step ${
                                        index <= currentStageIndex ? "completed" : ""
                                    }`}
                                >
                                    <div className="tracker-circle">
                                        {index <= currentStageIndex && <span>&#10003;</span>}
                                    </div>
                                    <p>{stage}</p>
                                </div>
                            ))}
                    </div>

                    {/* Order Item Details */}
                    <div className="order-item">
                        <img
                            src={`${baseurl}${orderDetails.bookDetails?.image}`}
                            alt={orderDetails.bookDetails?.name || "Book Image"}
                        />
                        <div className="order-item-details">
                            <h5>{orderDetails.bookDetails?.name || "Book Name Unavailable"}</h5>
                            <p>Author: {orderDetails.bookDetails?.author || "Author Unavailable"}</p>
                            <p>Price: ₹{orderDetails.bookDetails?.price || "N/A"}</p>
                            <p>Quantity: {orderDetails.quantity || 0}</p>
                            <p>Total: ₹{orderDetails.totalPrice || "N/A"}</p>
                        </div>
                       
                    </div>
                    <button className="order-detail-button"><Link to={`/OrderList`} className="text-light">Order List</Link> </button>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default OrderSingle;
