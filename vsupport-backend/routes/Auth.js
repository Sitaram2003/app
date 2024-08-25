const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const JWT_KEY = 'hello';
const router = express.Router();

// Sign up endpoint
router.post('/sign_up', async (req, res) => {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, email, password: hashedPassword });

    try {
        await newUser.save();
        res.status(201).send('User created successfully');
    } catch (err) {
        res.status(400).send('Error creating user: ' + err.message);
    }
});

// Sign in endpoint
router.post('/sign_in', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).send('Invalid email or password');
    }

    // Generate JWT token
    const token = jwt.sign(
        { userId: user._id, email: user.email },process.env.JWT_KEY,  // Replace with your actual secret key
        { expiresIn: '1h' }
    );

    // Return token to the client
    res.json({ token });
});

module.exports = router;
