const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const userSchema = new mongoose.Schema({
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	email: { type: String, required: true },
	password: { type: String, required: true },
	isAdmin: { type: Boolean, default: false },
	
	
	
	
});

userSchema.methods.generateAuthToken = function () {

	try {
		return jwt.sign(
			{
				userId:this._id.toString(),
				email:this.email,
				isAdmin:this.isAdmin,

			},process.env.JWTPRIVATEKEY,{
				expiresIn: "7d"

			}
				
			

		)
	} catch (error) {
		console.log(error)
		
	}
};

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

const AddBook = new mongoose.Schema({
	AddBookname:String,
	AddAuthorname:String,
	image:String,
	bookdesc:String,
	bookprice:String,
	bookoldprice:String,
	bookrating:Number,




})
const BannerSchema = new mongoose.Schema({
	banner:{ type: String,  }
})

//schema

const Banner = mongoose.model('banner',BannerSchema);
const User1 = mongoose.model("user-details1",UserSchema1)

const Books =mongoose.model("book-sugguest",BookSchema)

const User = mongoose.model("User-login", userSchema);

const AddBook1 = mongoose.model("add-book",AddBook)


const validate = (data) => {
	const schema = Joi.object({
		firstName: Joi.string().required().label("First Name"),
		lastName: Joi.string().required().label("Last Name"),
		email: Joi.string().email().required().label("Email"),
		password: passwordComplexity().required().label("Password"),
	});
	return schema.validate(data);
};

module.exports = { User,User1,Books,AddBook1,Banner, validate };
