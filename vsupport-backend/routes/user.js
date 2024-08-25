const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const JWT_KEY = process.env.JWT_KEY || 'hello'; // Use environment variable for the JWT key

// Middleware to verify JWT token
function verifyToken(req, res, next) {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.status(401).send('Access Denied');
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).send('Access Denied');
    }

    try {
        const verified = jwt.verify(token, JWT_KEY);
        req.user = verified;
        next();
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return res.status(401).send('Session expired. Please sign in again.');
        } else {
            return res.status(401).send('Invalid token. Please sign in again.');
        }
    }
}

// Get user details
router.get('/users/:userId', verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId);
        if (!user) {
            return res.status(404).send('User not found');
        }

        res.json({ username: user.username, email: user.email });
    } catch (err) {
        res.status(500).send('Server error');
    }
});

module.exports = router;
