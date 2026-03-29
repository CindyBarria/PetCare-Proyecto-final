const Review = require('../models/review');

async function createReview(req, res) {
    try {
        const review = new Review(req.body);
        await review.save();
        res.status(201).json(review);
    } catch (error) {
        res.status(500).json({ message: 'Error creating review', error });
    }
}

async function getReviews(req, res) {
    try {
        const reviews = await Review.find()
            .populate('reviewer')
            .populate('reviewedUser');

        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching reviews', error });
    }
}

module.exports = { createReview, getReviews };