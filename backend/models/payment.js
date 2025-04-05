const { required } = require('joi');
const mongoose = require('mongoose');

// const paymentSchema = new mongoose.Schema({
//   razorpay_order_id: { type: String, required: true },
//   razorpay_payment_id: { type: String, required: true },
//   razorpay_signature: { type: String, required: true },
//   createdAt: { type: Date, default: Date.now },
 
  
// });

const paymentSchema = new mongoose.Schema({
  razorpay_order_id: {
      type: String,
      required: true,
  },
  razorpay_payment_id: {
      type: String,
      required: true,
  },
  razorpay_signature: {
      type: String,
      required: true,
  },
  payStatus: {
      type: String,
      enum: ['paid', 'pending', 'failed'],
      default: 'pending',
  },
  bookDetails: {
      name: { type: String, required: true },
      author: { type: String, required: true },
      image: { type: String, required: true },
      price: { type: Number, required: true },
      oldPrice: { type: Number },
      description: { type: String },
     
      orderStatus: {
        type: String,
        enum: ['Order confirm', 'shipped', 'out for delivery', 'delivered', 'returned' ,'not delivered'],
        default: 'Order confirm', // Default status when payment is successful
    }
  },
  user:{
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,  // Ensure it's required only if necessary
         ref: 'User'

        },email:{ 
            type: String, required: true
        },
         firstName:{ 
            type: String, required: true},

        lastName:{
            type:String,required:true
        }
        
            
  },
  

  quantity: {
      type: Number,
      required: true,
  },
  totalPrice: {
      type: Number,
      required: true,
  },
  createdAt: {
      type: Date,
      default: Date.now,
  },
});



const Payment = mongoose.model("Payment",paymentSchema);



const orderSchema = new mongoose.Schema({
  bookId: { type: mongoose.Schema.Types.ObjectId, ref: "Book-test", required: true },
  quantity: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
  status: { type: String, enum: ["completed", "pending"], default: "completed" },
  createdAt: { type: Date, default: Date.now },
});




const Order = module.exports = mongoose.model("Order", orderSchema);

const bookSchema = new mongoose.Schema({
  AddBookname: {
      type: String,
      required: true,
  },
  AddAuthorname: {
      type: String,
      required: true,
  },
  image: {
      type: String, // Store file path or URL
      required: true,
  },
  bookprice: {
      type: Number,
      required: true,
  },
  bookoldprice: {
      type: Number, // Optional for discounts
  },
  bookdesc: {
      type: String,
      required: true,
  },
  stock: {
      type: Number,
      default: 0,
  },
  createdAt: {
      type: Date,
      default: Date.now,
  },
  updatedAt: {
      type: Date,
      default: Date.now,
  },
});

const Booktest = module.exports = mongoose.model("Book-test", bookSchema);

module.exports = Payment,Order,Booktest;
