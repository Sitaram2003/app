const mongoose = require('mongoose');

const UpvoteSchema = new mongoose.Schema({
    solutionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Solution', required: true },
    count: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Upvote', UpvoteSchema);
