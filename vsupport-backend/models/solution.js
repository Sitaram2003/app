const mongoose = require('mongoose');

const SolutionSchema = new mongoose.Schema({
    issue: {
        type: String,
        required: true,
    },
    solution: {
        type: String,
        required: true,
    },
    upvotes: {
        type: Number,
        default: 0,
    }
});

module.exports = mongoose.model('Solution', SolutionSchema);
