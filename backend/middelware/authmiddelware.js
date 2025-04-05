const jwt = require("jsonwebtoken");
const { User } = require("../models/user");

const authMiddleware =async (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) return res.status(401).send({ message: "Access Denied. No token provided." });

    try {
        const decoded = jwt.verify(token, process.env.JWTPRIVATEKEY); // Use your JWT secret key here
        req.user = decoded; 
        console.log(decoded)
        const userdata = await User.findOne({ email: decoded.email }).select({ password: 0 });
        req.token = token;
        req.user =userdata;
        req.userID = userdata._id;
        next();
    } catch (error) {
        res.status(400).send({ message: "Invalid token." });
    }
};

module.exports = authMiddleware;
