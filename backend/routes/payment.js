const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const Razorpay = require("razorpay");
 const authMiddleware = require("../middelware/authmiddelware");
 const adminMiddelware = require("../middelware/adminmiddelware");

const Payment = require("../models/payment"); // Ensure this is the correct model for payments
const Book = require("../models/payment"); // Adjust the model name as needed

// Get all payment details (Admin only)
router.get("/details", authMiddleware, async (_req, res) => {
    try {
        const payments = await Payment.find(); // Fetch all payment records
        res.status(200).json(payments);
    } catch (error) {
        console.error("Error fetching payment details:", error);
        res.status(500).json({ message: "Internal Server Error!" });
    }
});

// Create a Razorpay order
router.post("/orders", async (req, res) => {
    try {
        const { amount, bookDetails } = req.body;

        if (!amount || !bookDetails) {
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

// Verify a payment
router.post("/verify", async (req, res) => {
    try {
        console.log("Request body:", req.body);

        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            bookDetails,
            quantity,
            totalPrice,
        } = req.body;

        if (
            !razorpay_order_id ||
            !razorpay_payment_id ||
            !razorpay_signature ||
            !bookDetails ||
            !quantity ||
            !totalPrice
        ) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const sign = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSign = crypto
            .createHmac("sha256", process.env.KEY_SECRET)
            .update(sign)
            .digest("hex");

        if (razorpay_signature === expectedSign) {
            // Save payment details
            const payment = await Payment.create({
                razorpay_order_id,
                razorpay_payment_id,
                razorpay_signature,
                payStatus: "paid",
                bookDetails,
                quantity,
                totalPrice,
            });

            return res.status(200).json({
                message: "Payment verified successfully",
                payment,
            });
        } else {
            return res.status(400).json({ message: "Invalid signature sent!" });
        }
    } catch (error) {
        console.error("Error verifying payment:", error);
        res.status(500).json({ message: "Internal Server Error!", error });
    }
});

// Get book details by ID
router.get("/book/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const book = await Book.findById(id);

        if (!book) {
            return res.status(404).json({ message: "Book not found!" });
        }

        res.status(200).json(book);
    } catch (error) {
        console.error("Error fetching book details:", error);
        res.status(500).json({ message: "Internal Server Error!" });
    }
});
//delete route
router.delete('/delete/:id', async (req, res) => {
    try {
      const userId = req.params.id;
      await Payment.findByIdAndDelete(userId);  // Delete user from MongoDB
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
      res.status(500).json({ message: 'Error deleting user', error: err });
    }
  });
  //single data route 
  router.get('/order-single/:id',authMiddleware , async (req, res) => {
    try {
      const Id = req.params.id;
     const data = await Payment.findOne({_id:Id});  
     return res.status(200).json(data );
    } catch (err) {
      res.status(500).json({ message: 'Error find user', error: err });
    }
  });
  //update route

  router.put('/updateorder/:id', async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;  // The data to update

    try {
        // Find document by ID and update it
        const updatedRecord = await Payment.findByIdAndUpdate(id, updatedData, { new: true });

        if (!updatedRecord) {
            return res.status(404).json({ message: "Record not found" });
        }

        res.json({
            message: "Record updated successfully",
            data: updatedRecord
        });
    } catch (error) {
        res.status(500).json({ message: "Error updating data", error });
    }
});

module.exports = router;
