const express = require('express');
const router = express.Router();
const Solution = require('../models/solution'); // Adjust path as needed

// Route to handle posting a solution
router.post('/solutions', async (req, res) => {
    try {
        const { issue, solution } = req.body;

        // Create a new solution document
        const newSolution = new Solution({
            issue,
            solution,
            upvotes: 0 // Default to 0
        });

        // Save to the database
        await newSolution.save();
        res.status(201).json({ message: 'Solution posted successfully!' });
    } catch (error) {
        console.error('Error while saving solution:', error);
        res.status(500).json({ error: 'Failed to post solution' });
    }
});

module.exports = router;
