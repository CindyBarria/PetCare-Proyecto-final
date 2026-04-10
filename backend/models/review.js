/**
 * =========================================================
 * ESTRUCTURA GENERAL DEL ARCHIVO
 * - Modelo de reseñas de cuidadores
 * =========================================================
 */

const mongoose = require('mongoose');

/**
 * Esquema de reseña.
 */
const reviewSchema = new mongoose.Schema(
    {
        caretaker: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        rating: {
            type: Number,
            min: 1,
            max: 5,
            required: true
        },
        comment: {
            type: String,
            default: ''
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Review', reviewSchema);