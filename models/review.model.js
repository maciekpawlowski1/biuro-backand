const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    tripId: { type: mongoose.Schema.Types.ObjectId, ref: 'Trip', required: true },
    nickname: { type: String, required: true },
    reviewText: { type: String, required: true },
    purchaseDate: { type: Date, required: false },
});

module.exports = mongoose.model('Review', reviewSchema);
