const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
    name: { type: String, required: true },
    country: { type: String, required: true },
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
    price: { type: Number, required: true },
    availableSeats: { type: Number, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    rating: Number,
});

tripSchema.virtual('id').get(function() {
    return this._id.toHexString();
});

tripSchema.set('toJSON', {
    virtuals: true
});

module.exports = mongoose.model('Trip', tripSchema);
