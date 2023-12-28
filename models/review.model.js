const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    nickname: String,
    reviewText: String,
    purchaseDate: Date,
});

module.exports = mongoose.model('Review', reviewSchema);
