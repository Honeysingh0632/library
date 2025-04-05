import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { baseurl } from '../Config/config';
import { keyid } from '../Config/config';
import Rugh from '../components/Rugh';
// import Navbar from './Navbar';
// import Footer from './Footer';

function Test() {
    // const { id } = useParams();
    // const [bookData, setBookData] = useState(null);
    // const [quantity, setQuantity] = useState(1); // Initialize quantity state

    const { id } = useParams(); // Get the book ID from the URL
    const [bookData, setBookData] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [userId, setUserId] = useState(null);
    const [email, setEmail] = useState('');
    const [firstName, setfirstName] = useState('');
    const [lastName, setlastName] = useState('');

    // Fetch book details on component mount
    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                const headers = { Authorization: `${token}` };

                const response = await axios.get(`${baseurl}/addbook/single/${id}`, { headers });
                setBookData(response.data);
            } catch (error) {
                console.error("Error fetching book data:", error);
                toast.error("Failed to fetch book data");
            }
        };

        fetchData();
    }, [id]);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    toast.error("User not logged in!");
                    return;
                }
   
                const headers = { Authorization: `${token}` };
                const response = await axios.get(`${baseurl}/singleuser`, { headers });
                
                if (response.data.message) {
                    setUserId(response.data.message._id);
                    setEmail(response.data.message.email);
                    setfirstName(response.data.message.firstName);

                    setlastName(response.data.message.lastName);
                    console.log("Fetched user ID:", response.data.message._id);
                    console.log("Fetched user ID:", response.data.message.firstName);
                    console.log("Fetched user ID:", response.data.message.lastName);
                } else {
                    toast.error("User ID missing. Please log in again.");
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
                toast.error("Failed to fetch user details");
            }
        };
   
        fetchUserData();
    }, []);

    // Initialize Razorpay payment
    const initPayment = (data, book) => {
        console.log(keyid);
        
        const options = {
            key: keyid, // Ensure this is set correctly
            amount: data.amount,
            currency: data.currency,
            name: book.AddBookname,
            description: "Test Transaction",
            image: `${baseurl}${book.image}`,
            order_id: data.id,
            handler: async (response) => {
                try {
                   
                    const payload = {
                        razorpay_order_id: response.razorpay_order_id,
                        razorpay_payment_id: response.razorpay_payment_id,
                        razorpay_signature: response.razorpay_signature,
                        bookId: book._id,
                        bookDetails: {
                            name: bookData.AddBookname,
                            author: bookData.AddAuthorname,
                            image: bookData.image,
                            price: bookData.bookprice,
                            oldPrice: bookData.bookoldprice,
                            description: bookData.bookdesc,
                        },
                        user:{ userId,email,firstName,lastName},  // Make sure this is not undefined
                        quantity,
                        totalPrice: bookData.bookprice * quantity,  
                    };
                    

                    const result = await axios.post(`${baseurl}/payment/verify`, payload);
                    toast.success("Payment verified successfully");
                    console.log("Payment verification response:", result.data);
                } catch (error) {
                    console.error("Error verifying payment:", error);
                    toast.error("Payment verification failed");
                }
            },
            theme: { color: "#3399cc" },
        };
        const rzp1 = new window.Razorpay(options);
        rzp1.open();
    };

    // Handle payment initiation
  const handlePayment = async (book) => {
     if (!userId) {
         toast.error("User not logged in!");
         return;
     }
     
     // Continue with the payment flow only if userId is available
     try {
         const orderUrl = `${baseurl}/payment/orders`;
         const totalAmount = book.bookprice * quantity; // Calculate total price
         const { data } = await axios.post(orderUrl, { 
             amount: totalAmount, 
             bookDetails: {
                 name: book.AddBookname,
                 author: book.AddAuthorname,
                 image: book.image,
                 price: book.bookprice,
             }
         });
         initPayment(data.data, book);
     } catch (error) {
         console.error("Error initiating payment:", error);
         toast.error("Error in initiating payment");
     }
 };

  
   

    

    const incrementQuantity = () => setQuantity((prev) => prev + 1);
    const decrementQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1)); // Prevent negative values

    return (
        <>
            {/* <Navbar /> */}
            <Rugh />

            <div style={{ padding: '20px' }} className="on-mobile">
                {bookData ? (
                    <div
                        style={{
                            textAlign: 'left',
                            margin: '20px auto',
                            maxWidth: '400px',
                            border: '1px solid #ccc',
                            borderRadius: '8px',
                            padding: '16px',
                            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                        }}
                    >
                        <h2>{bookData.AddBookname}</h2>
                        <h4>Author: {bookData.AddAuthorname}</h4>
                        {bookData.image && (
                            <img
                                src={`${baseurl}${bookData.image}`}
                                alt={bookData.AddBookname}
                                style={{ width: '100%', borderRadius: '8px', marginBottom: '16px' }}
                            />
                        )}
                        <p>
                            <strong>Price (per item):</strong> 
                            <span className="text-success">${bookData.bookprice}</span>
                        </p>
                        <p>
                            <strong>Old Price:</strong> 
                            <span className="text-danger text-decoration-line-through">${bookData.bookoldprice}</span>
                        </p>
                        <p>
                            <strong>Description:</strong> {bookData.bookdesc}
                        </p>
                        <div>
                            <strong>Quantity:</strong>
                            <div className="d-flex align-items-center mt-2">
                                <button className="btn btn-outline-primary btn-sm" onClick={decrementQuantity}>-</button>
                                <span className="mx-3">{quantity}</span>
                                <button className="btn btn-outline-primary btn-sm" onClick={incrementQuantity}>+</button>
                            </div>
                        </div>
                        <p className="mt-2">
                            <strong>Total Price:</strong> ${bookData.bookprice * quantity}
                        </p>
                        <button
                            className="btn btn-primary btn-sm mt-2"
                            onClick={() => handlePayment(bookData)}
                        >
                            Buy Now
                        </button>
                    </div>
                ) : (
                    <p>Loading book details...</p>
                )}
            </div>

            <div className="container on-desktop">
                <div className="row">
                    <div className="col-lg-6 mt-5 text-center">
                        {bookData ? (
                            <>
                                <h2 className="" style={{ marginTop: 150 }}>
                                    {bookData.AddBookname}
                                </h2>
                                <h4>Author: {bookData.AddAuthorname}</h4>
                                <p>
                                    <strong>Description:</strong> {bookData.bookdesc}
                                </p>
                                <p>
                                    <strong>Price (per item):</strong> 
                                    <span className="text-success">${bookData.bookprice}</span>
                                </p>
                                <p>
                                    <strong>Old Price:</strong> 
                                    <span className="text-danger text-decoration-line-through">${bookData.bookoldprice}</span>
                                </p>
                                <div>
                                    <strong>Quantity:</strong>
                                    <div className="d-flex align-items-center justify-content-center mt-2">
                                        <button className="buttonx2  fs-3" onClick={decrementQuantity}>-</button>
                                        <span className="mx-3">{quantity}</span>
                                        <button className="buttonx2 fs-3" onClick={incrementQuantity}>+</button>
                                    </div>
                                </div>
                                <p className="text-success mt-2">
                                    <strong>Total Price:</strong> ${bookData.bookprice * quantity}
                                </p>
                                <div className="mt-5">
                                    <button className="buttonx1">
                                        <Link to="/NewAdd" className="link">
                                            Explore More
                                        </Link>
                                    </button>
                                    <button
                                        className="buttonx1 ms-3"
                                        onClick={() => handlePayment(bookData)}
                                    >
                                        Buy Now
                                    </button>
                                </div>
                            </>
                        ) : (
                            <p>Loading book details...</p>
                        )}
                    </div>
                    <div className="col-lg-6 mt-5">
                        {bookData?.image && (
                            <img
                                src={`${baseurl}${bookData.image}`}
                                alt={bookData.AddBookname}
                                style={{
                                    width: 500,
                                    borderRadius: '8px',
                                    marginBottom: '16px',
                                    height: 'auto',
                                }}
                            />
                        )}
                    </div>
                </div>
            </div>

            {/* <Footer /> */}
        </>
    );
}

export default Test;
