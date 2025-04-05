const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const bodyparser = require('body-parser')

require("dotenv").config();

const connection = require("./db");
// const { User1,  } = require('./models/user')


//conection

connection();


//schema

const UserSchema1= new mongoose.Schema({
    
    name:String,
    email:String,
    phone:Number,
    message:String,


})

const BookSchema = new mongoose.Schema({

    name:String,
    email:String,
    bookname:String,
    authorname:String,

 })



const User = mongoose.model("user-details1",UserSchema1)

const Books =mongoose.model("book-sugguest",BookSchema)

app.use(cors())
app.use(bodyparser.json())

//api

app.get('/get/user',async (req,res) => {

    let data = await User
    let response = await data.find();
    res.send(response)

 })

 app.get('/getbook',async (req,res) => {

    let data = await Books
    let response = await data.find();
    res.send(response)

 })

 app.put('/update/:id', async (req, res) => {
    try {
        const User2 = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!User2) {
            return res.status(404).send();
        }
        res.status(200).send(User2);
    } catch (error) {
        res.status(400).send(error);
    }
});



app.post("/submit", async(req,res) => {
    const newUser = new User ({
        name:req.body.name,
        email:req.body.email,
        phone:req.body.phone,
        message:req.body.message,
    })
    try{
        const user = await newUser.save()
        console.log(user)
        console.log('success')
        res.json(user)
    }catch{
        console.log("not success")
    }
})

app.post("/books", async(req,res) => {
    const NewBooks = new Books ({
        name:req.body.name,
        email:req.body.email,
        bookname:req.body.bookname,
        authorname:req.body.authorname,
    })
    try{
        const book = await NewBooks.save()
        console.log(book)
        console.log('success')
        res.json(book)
    }catch{
        console.log("not success")
    }
})

app.delete('/', async (req,res) => {
    try {
        const id = req.params.id;
        const User3 = await User.deleteOne({_id:id});

        if(!User3){
            return res.status(404).send();
        }else{
        return res.status(200).json({message:"User delete succesfully"});

        }
        
    } catch (error) {
        
    }
})

app.listen(8000, () => {
    console.log("server runing on 8000 ")
})