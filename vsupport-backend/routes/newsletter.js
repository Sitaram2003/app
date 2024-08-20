const express = require('express');
const router = express.Router();
const Newsletter = require('../models/newsletter');

// @route POST /api/newsletter
// @desc Subscribe to the newsletter
router.post('/', async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ msg: 'Please provide an email address' });
    }

    try {
        // Check if email already exists
        let subscriber = await Newsletter.findOne({ email });
        if (subscriber) {
            return res.status(400).json({ msg: 'Email already subscribed' });
        }

        // Create new subscriber
        subscriber = new Newsletter({ email });
        await subscriber.save();

        res.status(200).json({ msg: 'Thank you for subscribing!' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server Error. Please try again later.' });
    }
});

module.exports = router;
