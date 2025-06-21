const jwt = require('jsonwebtoken');
const User = require('../model/userModel');

const authenticateToken = async (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).json({ error: 'Access denied: No token provided' });
    }

    try {
        const verified = jwt.verify(token.split(" ")[1], process.env.SECRET_KEY);
        const user = await User.findById(verified.userId);
        if (!req.user) {
            return res.status(404).json({ error: 'User not found' });
        }

        next();
    } catch (error) {
        console.error('Token verification failed:', error);
        res.status(400).json({ error: 'Invalid token' });
    }
};

module.exports = {
    authenticateToken,
};