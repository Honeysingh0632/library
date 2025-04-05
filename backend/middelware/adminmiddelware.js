const adminMiddleware = async (req, res, next) => {
    try {
        if (!req.user) {
            return res.status(401).send({ message: "Unauthorized: User not authenticated." });
        }

        const isAdmin = req.user.isAdmin;
        if (!isAdmin) {
            return res.status(403).send({ message: "Access denied: user is not an admin." });
        }
        
        next(); // Only called if `isAdmin` is true
    } catch (error) {
        next(error);
    }
};

module.exports = adminMiddleware;
