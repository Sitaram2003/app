const mongoose = require('mongoose');

const ContributionSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    solution: { type: String, trim: true },
    contributor: { type: String, trim: true }
}, { timestamps: true });

module.exports = mongoose.model('Contribution', ContributionSchema);
