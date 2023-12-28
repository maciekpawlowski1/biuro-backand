const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const Trip = require('./models/trip.model');
const Review = require('./models/review.model');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


const dbUri = 'mongodb+srv://maciekpawlowski1:qYfpCntHc5ynP1E6@cluster0.ovvyu5t.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(dbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));


app.get('/trips', async (req, res) => {
    try {
        const trips = await Trip.find();
        res.json(trips);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.post('/trips', async (req, res) => {
    try {
        const newTrip = new Trip(req.body);
        const savedTrip = await newTrip.save();
        res.status(201).json(savedTrip);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

app.delete('/trips/:id', async (req, res) => {
    try {
        const result = await Trip.findByIdAndDelete(req.params.id);
        res.status(204).json(result);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.get('/trips/:tripId/reviews', async (req, res) => {
    try {
        const { tripId } = req.params;
        const reviews = await Review.find({ tripId: tripId });
        console.log(reviews)
        res.json(reviews);
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: err.message });
    }
});

app.post('/reviews', async (req, res) => {
    try {
        console.log(req.body)
        const newReview = new Review(req.body);
        const savedReview = await newReview.save();
        res.status(201).json(savedReview);
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: err.message });
    }
});
