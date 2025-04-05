const router = require("express").Router();

const  authMiddleware = require('../middelware/authmiddelware');
const adminMiddelware = require("../middelware/adminmiddelware");
const Payment = require("../models/payment");
const Order = require('../models/payment');
const Razorpay = require("razorpay");


const crypto = require("crypto");







router.get('/details', authMiddleware, async (req, res) => {
    try {
        // Ensure `req.user` exists and has `id`
        if (!req.user || !req.user.id) {
            return res.status(401).json({ message: "Unauthorized: User ID not found" });
        }

        const userId = req.user.id; // Extract user ID
        console.log("Fetching payment details for User ID:", userId);

        // Fetch payments where user.userId matches the authenticated user
        const payments = await Payment.find({ "user.userId": userId })  // ✅ Adjusted query
            .select("user bookDetails totalPrice payStatus createdAt quantity razorpay_order_id razorpay_payment_id razorpay_signature");

        // Log fetched payments for debugging
        console.log("Payment details fetched successfully:", payments);

        // Return response
        res.status(200).json(payments);
    } catch (error) {
        console.error("Error fetching payment details:", error);
        res.status(500).json({ message: "Internal Server Error!" });
    }
});



router.get('/alldetails', authMiddleware, async (req, res) => {
    try {
        // Fetch all orders without filtering by userId
        const response = await Payment.find({});

        console.log("All Orders:", response);  // Log the fetched orders to verify

        // Return the orders in the response
        res.status(200).json(response);
    } catch (error) {
        console.error('Error fetching order details:', error);
        res.status(500).json({ message: 'Internal Server Error!' });
    }
});


router.post("/orders", async (req, res) => {
    try {
        const { amount, bookDetails } = req.body;

        if (!amount || !bookDetails ) {
            return res.status(400).json({ message: "Amount and book details are required" });
        }

        const instance = new Razorpay({
            key_id: process.env.KEY_ID,
            key_secret: process.env.KEY_SECRET,
        });

        const options = {
            amount: amount * 100, // Convert to paise
            currency: "INR",
            receipt: crypto.randomBytes(10).toString("hex"),
        };

        instance.orders.create(options, (error, order) => {
            if (error) {
                console.error("Error creating Razorpay order:", error);
                return res.status(500).json({ message: "Something went wrong!" });
            }
            res.status(200).json({ data: order, bookDetails });
        });
    } catch (error) {
        console.error("Error creating Razorpay order:", error);
        res.status(500).json({ message: "Internal Server Error!" });
    }
});


router.post("/verify", async (req, res) => {
    console.log("Received payment payload:", req.body);  // Add this line to log the incoming data

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature,user, bookDetails, quantity, totalPrice } = req.body;

    if (!razorpay_payment_id || !razorpay_signature || !user || !totalPrice) {
        return res.status(400).json({ error: "Missing required payment details" });
    }

    try {
        const payment = new Payment({
            user,
            bookDetails,
            quantity,
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            totalPrice,  // Ensure totalPrice is passed and saved correctly
        });

        await payment.save();
        res.status(200).json({ message: "Payment verified successfully" });
    } catch (error) {
        console.error("Payment verification error:", error);
        res.status(500).json({ error: "Payment verification failed" });
    }
});







  

 module.exports = router;