const express = require('express');
const router = express.Router();
const Solution = require('../models/solution'); // Import the Solution model

// Search Solutions Route
router.get('/solutions', async (req, res) => {
    try {
        const query = req.query.q;
        if (!query) {
            return res.status(400).json({ error: 'Search query is required' });
        }

        const solutions = await Solution.find({
            issue: { $regex: query, $options: 'i' }
        });

        res.json(solutions);
    } catch (error) {
        console.error('Error fetching solutions:', error);
        res.status(500).send('Server error');
    }
});

// Get Solution Route
router.get('/solutions/:id', async (req, res) => {
    try {
        const solution = await Solution.findById(req.params.id);
        if (!solution) {
            return res.status(404).json({ msg: 'Solution not found' });
        }
        res.json(solution);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Upvote Solution by ID
router.post('/solutions/:id/upvote', async (req, res) => {
    try {
        const solution = await Solution.findById(req.params.id);
        if (!solution) {
            return res.status(404).json({ msg: 'Solution not found' });
        }

        // Increment upvotes and save the solution
        solution.upvotes += 1;
        await solution.save();

        res.json({ upvotes: solution.upvotes });
    } catch (err) {
        console.error('Error upvoting solution:', err.message);
        res.status(500).send('Server Error');
    }
});

// Get a solution by ID
router.get('/:id', async (req, res) => {
    try {
        const solution = await Solution.findById(req.params.id);
        if (!solution) {
            return res.status(404).json({ msg: 'Solution not found' });
        }
        res.json(solution);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Upvote a solution by ID
router.post('/:id/upvote', async (req, res) => {
    try {
        const solution = await Solution.findById(req.params.id);
        if (!solution) {
            return res.status(404).json({ msg: 'Solution not found' });
        }
        solution.upvotes += 1;
        await solution.save();
        res.json(solution);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});
module.exports = router;
