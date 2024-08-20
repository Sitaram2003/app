const express = require('express');
const router = express.Router();
const Contribution = require('../models/contributions'); // Ensure the correct path

// POST route to add a new contribution
router.post('/', async (req, res) => {
    try {
        const { title, description, solution } = req.body;
        if (!title || !description || !solution) {
            return res.status(400).json({ error: 'All fields are required' });
        }
        const newContribution = new Contribution({
            title,
            description,
            solution,
            contributor: 'Anonymous' // Modify if needed
        });

        await newContribution.save();
        res.status(201).json(newContribution);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server Error' });
    }
});

module.exports = router;
