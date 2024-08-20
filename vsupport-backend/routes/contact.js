const express = require('express');
const router = express.Router();
const Contact = require('../models/contact');

const mail = 'vsupport@gmail.com'

// @route   POST api/contact
// @desc    Add a new contact message
// @access  Public
router.post('/', async (req, res) => {
    const { name, email, message } = req.body;

    try {
        // Check if email already exists
        const existingContact = await Contact.findOne({ email });
        if (existingContact) {
            return res.status(400).json({ msg: 'Email already exists. Please use a different email.' });
        }

        // Save the new contact message
        const newContact = new Contact({
            name,
            email,
            message
        });

        await newContact.save();

        // Prepare email content for redirect
        const subject = encodeURIComponent('Contact Us - VSUPPORT');
        const body = encodeURIComponent(`Hello VSUPPORT,\n\n${message}\n\nRegards,\n${name}\n${email}`);

        // Redirect to the user's email client with pre-filled details
        res.json({
            msg: 'Contact information saved successfully. Redirecting to email...',
            redirectUrl: `mailto:${mail}?subject=${subject}&body=${body}`
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
