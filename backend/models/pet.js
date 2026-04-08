/**
 * =========================================================
 * ESTRUCTURA GENERAL DEL ARCHIVO
 * - Modelo de mascota
 * - Define los campos que se guardan en MongoDB
 * =========================================================
 */

const mongoose = require('mongoose');

/**
 * Esquema de mascota.
 * Cada mascota pertenece a un dueño y contiene información
 * básica para mostrar la publicación.
 */
const petSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        species: {
            type: String,
            required: true
        },
        age: {
            type: Number,
            required: true
        },
        shortDescription: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },

        /**
         * Imagen de la mascota guardada como string base64 o data URL.
         * Para este proyecto académico simplifica la subida desde el ordenador.
         */
        imageUrl: {
            type: String,
            default: ''
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        status: {
            type: String,
            enum: ['available', 'unavailable'],
            default: 'available'
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Pet', petSchema);