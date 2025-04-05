const Razorpay = require('razorpay');

// Initialize Razorpay instance
const instance = new Razorpay({
    key_id: process.env.razorpay_api_key, // Ensure these environment variables are set
    key_secret: process.env.razorpay_secret_key,
});

exports.instance = instance;

exports.checkout = async (req, res) => {
    try {
        // Extract bookprice from the request body
        const bookPrice = req.body.bookprice;

        // Validate bookprice
        if (!bookPrice || isNaN(Number(bookPrice))) {
            return res.status(400).json({
                success: false,
                message: "Invalid or missing 'bookprice' in the request body",
            });
        }

        // Convert bookprice to paise
        const amountInPaise = Number(bookPrice) * 100;

        // Razorpay order options
        const options = {
            amount: amountInPaise, // Amount in paise
            currency: "INR",
        };

        // Create order using the Razorpay instance
        const order = await exports.instance.orders.create(options);
        console.log("Order created:", order);

        res.status(200).json({
            success: true,
            order,
        });
    } catch (error) {
        console.error("Error creating Razorpay order:", error.message);
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
