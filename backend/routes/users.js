const router = require("express").Router();
const authMiddleware = require("../middelware/authmiddelware");
const { User, validate } = require("../models/user");
const bcrypt = require('bcryptjs');
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");


const adminMiddelware = require("../middelware/adminmiddelware");

router.post("/", async (req, res) => {
	try {
		const { error } = validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		const user = await User.findOne({ email: req.body.email });
		if (user)
			return res
				.status(409)
				.send({ message: "User with given email already Exist!" });

		const salt = await bcrypt.genSalt(Number(process.env.SALT));
		const hashPassword = await bcrypt.hash(req.body.password, salt);

		await new User({ ...req.body, password: hashPassword }).save();
		res.status(201).send({ message: "User created successfully" });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});


router.get('/',authMiddleware,adminMiddelware,async (req,res) => {
	let data = await User
	let response = await data.find()
	res.send(response)
});



router.delete('/userdata/:id', async (req, res) => {
    try {
      const userId = req.params.id;
      await User.findByIdAndDelete(userId);  // Delete user from MongoDB
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
      res.status(500).json({ message: 'Error deleting user', error: err });
    }
  });

  // get single user data detailes

  router.get('/userlogin/:id',authMiddleware,adminMiddelware, async (req, res) => {
    try {
      const Id = req.params.id;
     const data = await User.findOne({_id:Id});  
     return res.status(200).json(data );
    } catch (err) {
      res.status(500).json({ message1: 'Error deleting user', error: err });
    }
  });

  //user contact update route

  router.put('/updateuserlogin/:id', async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;  // The data to update

    try {
        // Find document by ID and update it
        const updatedRecord = await User.findByIdAndUpdate(id, updatedData, { new: true });

        if (!updatedRecord) {
            return res.status(404).json({ message1: "Record not found" });
        }

        res.json({
            message: "Record updated successfully",
            data: updatedRecord
        });
    } catch (error) {
        res.status(500).json({ message1: "Error updating data", error });
    }
});


// const bcrypt = require('bcrypt');

router.put('/forgotpassword/:id', async (req, res) => {
    const { id } = req.params;
    const { oldPassword, password } = req.body; // Extract old and new passwords from the request body
    const updatedData = { ...req.body };

    try {
        // Find the user by ID
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check if password is being updated
        if (password) {
            if (!oldPassword) {
                return res.status(400).json({ message: "Old password is required" });
            }

            // Verify the old password
            const isMatch = await bcrypt.compare(oldPassword, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: "Old password does not match" });
            }

            // Validate new password strength
            if (password.length < 6) {
                return res.status(400).json({ message: "Password must be at least 6 characters long" });
            }

            // Hash the new password
            const salt = await bcrypt.genSalt(10);
            updatedData.password = await bcrypt.hash(password, salt);
        }

        // Update the user record
        const updatedRecord = await User.findByIdAndUpdate(id, updatedData, { new: true, runValidators: true });

        res.json({
            message: "User updated successfully",
            data: updatedRecord
        });
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({
            message: "An error occurred while updating the user",
            error: error.message // Optional: Include only in development for security
        });
    }
});


router.get("/singleuser",authMiddleware, async (req,res) => {
	try {
		const userdata = req.user;
		return res.status(200).json({message:userdata})
		
	} catch (error) {
		console.log(error);
		
		
	}
})

//forgot password

const crypto = require('crypto');
const nodemailer = require('nodemailer');
// const { baseurl } = require("../config/config");
// const User = require('../models/User'); // Import your user model





// Endpoint to verify email
router.post('/password-reset/verify-email',authMiddleware, async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).send({ message: "Email is required" });
        }

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }

        return res.status(200).send({ message: "Email verified successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: "Internal Server Error" });
    }
});

// Endpoint to reset password
router.post('/password-reset', authMiddleware, async (req, res) => {
    try {
        const { email, newPassword } = req.body;

        // Validate email and newPassword fields
        if (!email || !newPassword) {
            return res.status(400).send({ message: "Email and new password are required." });
        }

        // Define Joi schema for password validation
        const passwordSchema = Joi.object({
            newPassword: passwordComplexity().required().label("Password"),
        });

        // Validate the password complexity
        const { error } = passwordSchema.validate({ newPassword });
        if (error) {
            console.log("Validation Error:", error.details[0].message);
            return res.status(400).send({ message: error.details[0].message });
        }

        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).send({ message: "User not found." });
        }

        // Hash the new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        // Update the user's password in the database
        user.password = hashedPassword;
        await user.save();

        return res.status(200).send({ message: "Password updated successfully." });
    } catch (error) {
        console.error("Error in password reset:", error);
        return res.status(500).send({ message: "Internal Server Error." });
    }
});


router.post("/forgot-password", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(404).send({ message: "User not found" });

        const resetToken = crypto.randomBytes(32).toString("hex");
        const hashedToken = await bcrypt.hash(resetToken, 10);

        user.resetPasswordToken = hashedToken;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
        await user.save();

        const transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: "honeysing00632@gmail.com",
                pass: "kinj tvev zyvd fwet",
            },
        });

        const mailOptions = {
            to: user.email,
            from: "honeysing00632@gmail.com",
            subject: "Password Reset",
            text: `Click here to reset your password: ${req.protocol}://${req.get("host")}/reset-password/${resetToken}`,
        };

        await transporter.sendMail(mailOptions);
        res.status(200).send({ message: "Password reset link sent" });
    } catch (error) {
        console.error("Internal Server Error:", error); // Log full error details
        res.status(500).send({ message: "Internal Server Error", error: error.message });
    }
});






router.post("/resetpassword/:token", async (req, res) => {
	try {
		const { password } = req.body;
		console.log("Received token:", req.params.token);

		const user = await User.findOne({
			resetPasswordExpire: { $gt: Date.now() },
		});
		console.log("User found:", user);

		if (!user) return res.status(400).send({ message: "Invalid or expired token" });

		const isValid = await bcrypt.compare(req.params.token, user.resetPasswordToken);
		console.log("Token validation result:", isValid);

		if (!isValid) return res.status(400).send({ message: "Invalid token" });

		user.password = await bcrypt.hash(password, 10);
		user.resetPasswordToken = undefined;
		user.resetPasswordExpire = undefined;

		await user.save();
		console.log("Password reset successful");
		res.status(200).send({ message: "Password reset successfully" });
	} catch (error) {
		console.error("Error resetting password:", error);
		res.status(500).send({ message: "Internal Server Error" });
	}
});



 



module.exports = router;
