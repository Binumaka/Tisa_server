const jwt = require('jsonwebtoken');
const User = require('../model/userModel');

const authenticateToken = async (req, res, next) => {
  const authHeader = req.header('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Access denied: No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findById(decoded._id); // Make sure `_id` is included in the JWT payload

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    req.user = user; // ✅ Assign user to request
    next();
  } catch (error) {
    console.error('Token verification failed:', error);
    res.status(401).json({ error: 'Invalid or expired token' });
  }
};

module.exports = {
  authenticateToken,
};
