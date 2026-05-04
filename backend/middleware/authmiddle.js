const jwt = require("jsonwebtoken");
const User = require("../model/usermodel");
const authMiddleware = async (req, res, next) => {
    const token = req.cookies.token;    
    if (!token) {
        return res.status(401).json({ error: "Unauthorized" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);   
        if (!user) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        req.user = user;
        next();
    } catch (err) {
        return res.status(401).json({ error: "Unauthorized" });
    }
};

module.exports = authMiddleware;