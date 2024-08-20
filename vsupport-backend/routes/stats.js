// routes/statistics.js

const express = require('express');
const router = express.Router();
const Solution = require('../models/solution');
const Contribution = require('../models/contributions');
const User = require('../models/User');

// GET /api/stats - Fetch statistics for admin dashboard
router.get('/stats', async (req, res) => {
    try {
        // Count documents in each collection
        const solutionsCount = await Solution.countDocuments();
        const contributionsCount = await Contribution.countDocuments();
        const usersCount = await User.countDocuments();

        // Send the counts as JSON response
        res.json({
            solutions: solutionsCount,
            contributions: contributionsCount,
            users: usersCount
        });
    } catch (err) {
        console.error('Error fetching statistics:', err);
        res.status(500).json({ 
            message: 'An error occurred while fetching the stats.', 
            error: err.message 
        });
    }
});

module.exports = router;
