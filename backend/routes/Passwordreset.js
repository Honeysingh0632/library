const router = require("express").Router();
const { User } = require("../models/user");
const Token = require("../models/token");
const crypto = require("crypto");
const sendEmail = require("../utils/SendEmail");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");
const bcrypt = require('bcryptjs');

// send password link
router.post("/", async (req, res) => {
	try {
		const emailSchema = Joi.object({
			email: Joi.string().email().required().label("Email"),
		});
		const { error } = emailSchema.validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		let user = await User.findOne({ email: req.body.email });
		if (!user)
			return res
				.status(409)
				.send({ message: "User with given email does not exist!" });

		let token = await Token.findOne({ userId: user._id });
		if (!token) {
			token = await new Token({
				userId: user._id,
				token: crypto.randomBytes(32).toString("hex"),
			}).save();
		}

		// const url = `${process.env.BASE_URL}password-reset/${user._id}/${token.token}/`;
        const url = `${process.env.BASE_URL}/password-reset/${user._id}/${token.token}/`

		await sendEmail(user.email, "Password Reset", url);

		res
			.status(200)
			.send({ message: "Password reset link sent to your email account" });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});

// verify password reset link
router.get("/:id/:token", async (req, res) => {
	try {
		const user = await User.findOne({ _id: req.params.id });
		if (!user) return res.status(400).send({ message: "Invalid link" });

		const token = await Token.findOne({
			userId: user._id,
			token: req.params.token,
		});
		if (!token) return res.status(400).send({ message: "Invalid link" });

		res.status(200).send("Valid Url");
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});

//  set new password
router.post("/:id/:token", async (req, res) => {
	try {
		console.log("Request Params:", req.params);
		console.log("Request Body:", req.body);

		// Validate password
		const passwordSchema = Joi.object({
			password: passwordComplexity().required().label("Password"),
		});
		const { error } = passwordSchema.validate(req.body);
		if (error) {
			console.log("Validation Error:", error.details[0].message);
			return res.status(400).send({ message: error.details[0].message });
		}

		// Find user
		const user = await User.findOne({ _id: req.params.id });
		if (!user) {
			console.log("User not found");
			return res.status(400).send({ message: "Invalid link" });
		}

		// Find token
		const token = await Token.findOne({
			userId: user._id,
			token: req.params.token,
		});
		if (!token) {
			console.log("Token not found");
			return res.status(400).send({ message: "Invalid link" });
		}

		// Generate salt and hash password
		const salt = await bcrypt.genSalt(Number(process.env.SALT));
		console.log("Generated Salt:", salt);

		const hashPassword = await bcrypt.hash(req.body.password, salt);
		console.log("Hashed Password:", hashPassword);

		// Update user password and delete token
		user.password = hashPassword;
		await user.save();
		await Token.deleteOne({ _id: token._id });

		// Send success response
		res.status(200).send({ message: "Password reset successfully" });
	} catch (error) {
		console.error("Internal Server Error:", error.message);
		res.status(500).send({ message: "Internal Server Error" });
	}
});

module.exports = router;
