import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { baseurl } from "../Config/config";
import Skelton from "../skeltonloading/Skelton";
import { Link } from "react-router-dom";

const Order = () => {
    const [paymentData, setPaymentData] = useState([]);
    const [visibleIndex, setVisibleIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showData, setShowData] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null); 

    useEffect(() => {
        const fetchPaymentData = async () => {
            const token = localStorage.getItem("token");
            try {
                const response = await axios.get(`${baseurl}/payment/alldetails`, {
                    headers: {
                        Authorization: token,
                    },
                });
                setPaymentData(response.data || []);
                setLoading(false);
            } catch (err) {
                setError(err.message || "Failed to fetch payment details");
                setLoading(false);
            }
        };

        fetchPaymentData();
        const timer = setTimeout(() => setShowData(true), 3000);
        return () => clearTimeout(timer);
    }, []);

    const deleteUser = async (id) => {
        try {
            await axios.delete(`${baseurl}/test/delete/${id}`);
            setPaymentData(paymentData.filter((item) => item._id !== id));
            toast.success("Order deleted successfully");
        } catch (error) {
            console.error(error);
            toast.error("Failed to delete the order");
        }
    };

    const handleScroll = useCallback(() => {
        if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight) {
            if (visibleIndex < paymentData.length - 1) {
                setVisibleIndex((prev) => prev + 1);
            }
        }
    }, [visibleIndex, paymentData]);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [handleScroll]);

    // Get unique users from payment data
   // Get unique users from payment data
const uniqueUsers = [...new Map(paymentData.map((item) => item.user?.email ? [item.user.email, item.user] : [])).values()];

return (
    <div className="container mt-4">
        <h1 className="text-center fs-3">Order Details</h1>
        {error ? (
            <p className="text-danger text-center">{error}</p>
        ) : loading ? (
            <Skelton />
        ) : showData ? (
            selectedUser ? (
                <>
                    <button className="btn btn-secondary mb-3" onClick={() => setSelectedUser(null)}>
                        Back to User List
                    </button>
                    <h2 className="text-center">{selectedUser.firstName} {selectedUser.lastName}'s Orders</h2>
                    <div className="row justify-content-center text-center">
                        {paymentData
                            .filter((payment) => payment.user?.email === selectedUser.email)
                            .map((payment) => (
                                <div key={payment._id} className="card p-3 mt-4 col-lg-4 text-center ms-5 h-100">
                                    <h5 className="mt-3">Book Details</h5>
                                    <p><strong>Order ID:</strong> {payment.razorpay_order_id}</p>
                                    <img
                                        src={`${baseurl}${payment.bookDetails.image}`}
                                        alt={payment.bookDetails.name}
                                        style={{ width: 200, height: 200, borderRadius: "8px", marginTop: "16px" }}
                                        className="m-auto"
                                    />
                                    <p><strong>Name:</strong> {payment.bookDetails.name}</p>
                                    <p><strong>Author:</strong> {payment.bookDetails.author}</p>
                                    <p><strong>Price:</strong> ${payment.bookDetails.price}</p>
                                    <p><strong>Description:</strong> {payment.bookDetails.description}</p>
                                    <p><strong>Quantity:</strong> {payment.quantity}</p>
                                    <p><strong>Total Price:</strong> ${payment.totalPrice}</p>
                                    <p><strong>Created At:</strong> {new Date(payment.createdAt).toLocaleString()}</p>
                                    <p><strong>Order Status:</strong> {payment.bookDetails.orderStatus || "Pending"}</p>

                                    <button className="btn btn-success btn-sm mb-2">
                                        <Link className="link text-light" to={`/AdminPanel/updateorder/${payment._id}/edit`}>
                                            Update Order
                                        </Link>
                                    </button>

                                    <button className="btn btn-outline-danger btn-sm" onClick={() => deleteUser(payment._id)}>
                                        Delete Now
                                    </button>
                                </div>
                            ))}
                    </div>
                </>
            ) : (
                <div className="row justify-content-center text-center">
                    <h2 className="text-center">Users</h2>
                    {uniqueUsers.map((user) => (
                        user ? (
                            <div key={user.email} className="card p-3 mt-4 col-lg-4 text-center ms-5 h-100">
                                <h5>{user.firstName} {user.lastName}</h5>
                                <p><strong>Email:</strong> {user.email}</p>
                                <button className="btn btn-primary btn-sm" onClick={() => setSelectedUser(user)}>
                                    View Orders
                                </button>
                            </div>
                        ) : null // Ensure that only valid user objects are processed
                    ))}
                </div>
            )
        ) : (
            <Skelton />
        )}
    </div>
);
}

export default Order;
