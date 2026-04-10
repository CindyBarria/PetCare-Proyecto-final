/**
 * =========================================================
 * ESTRUCTURA GENERAL DEL ARCHIVO
 * - Controladores de reseñas
 * =========================================================
 */

const Review = require('../models/review');

/**
 * Crear una reseña.
 */
async function createReview(req, res) {
    try {
        const { caretakerId, rating, comment } = req.body;

        if (!caretakerId || !rating) {
            return res.status(400).json({
                message: 'Missing fields'
            });
        }

        const newReview = new Review({
            caretaker: caretakerId,
            owner: req.user.id,
            rating,
            comment
        });

        await newReview.save();

        return res.status(201).json(newReview);
    } catch (error) {
        return res.status(500).json({
            message: 'Error creating review',
            error: error.message
        });
    }
}

/**
 * Obtener reseñas de un cuidador.
 */
async function getReviewsByCaretaker(req, res) {
    try {
        const { id } = req.params;

        const reviews = await Review.find({ caretaker: id })
            .populate('owner', 'name')
            .sort({ createdAt: -1 });

        return res.status(200).json(reviews);
    } catch (error) {
        return res.status(500).json({
            message: 'Error fetching reviews',
            error: error.message
        });
    }
}

module.exports = {
    createReview,
    getReviewsByCaretaker
};