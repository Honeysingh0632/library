import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { baseurl } from "../Config/config";

const Payment = () => {
    const [paymentData, setPaymentData] = useState([]); // Initialize as an array
    const [error, setError] = useState(null); // Track errors
    const navigate = useNavigate();

    // Fetch payment data on component mount
    useEffect(() => {
        const fetchPaymentData = async () => {
            const token = localStorage.getItem("token");
            try {
                const response = await fetch(`${baseurl}/payment/details`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: token,
                    },
                });

                if (!response.ok) throw new Error("Failed to fetch payment details");

                const result = await response.json();
                console.log("Payment API Result:", result);

                if (Array.isArray(result)) {
                    setPaymentData(result); // Set payment data if it's an array
                } else {
                    setError("Unexpected response format");
                }
            } catch (err) {
                console.error("Fetch error:", err);
                setError(err.message); // Update error state
            }
        };

        fetchPaymentData();
    }, []);

    return (
        <div className="container mt-4">
            <h1 className="text-center fs-3">Payment Details</h1>
            {error ? (
                <p className="text-danger text-center">{error}</p>
            ) : paymentData.length > 0 ? (
                <div className="row justify-content-center">
                    {paymentData.map((payment) => (
                        <div
                            key={payment._id}
                            className="card p-3 mt-4 col-lg-4 text-center ms-5"
                        >
                            <p><strong>Order ID:</strong> {payment.razorpay_order_id}</p>
                            <p><strong> ID:</strong> {payment._id}</p>
                            <p><strong>Payment ID:</strong> {payment.razorpay_payment_id}</p>
                            <p><strong>Signature:</strong> {payment.razorpay_signature}</p>
                            <p><strong>Payment Status:</strong> {payment.payStatus}</p>
                            <p><strong>Quantity:</strong> {payment.quantity}</p>
                            <p><strong>Total Price:</strong> ${payment.totalPrice}</p>
                            <p><strong>Created At:</strong> {new Date(payment.createdAt).toLocaleString()}</p>
                           
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center mt-4">Loading payment data...</p>
            )}
        </div>
    );
};

export default Payment;
