/**
 * =========================================================
 * ESTRUCTURA GENERAL DEL ARCHIVO
 * - Modelo de mascota
 * - Define la información principal, de salud y cuidados
 * - Se guarda en MongoDB usando Mongoose
 * =========================================================
 */

const mongoose = require('mongoose');

/**
 * Esquema de mascota.
 * Cada mascota pertenece a un dueño y contiene:
 * - datos generales
 * - imagen
 * - salud y bienestar
 * - recordatorios y observaciones
 */
const petSchema = new mongoose.Schema(
    {
        /* Nombre de la mascota */
        name: {
            type: String,
            required: true
        },

        /* Tipo de mascota, por ejemplo: perro o gato */
        species: {
            type: String,
            required: true
        },

        /* Sexo de la mascota */
        sex: {
            type: String,
            enum: ['male', 'female'],
            default: 'male'
        },

        /* Edad en años */
        age: {
            type: Number,
            required: true
        },

        /* Peso aproximado */
        weight: {
            type: Number,
            default: 0
        },

        /* Descripción breve para cards o listados */
        shortDescription: {
            type: String,
        },

        /* Descripción completa */
        description: {
            type: String,
        },

        /* Imagen en base64 o data URL */
        imageUrl: {
            type: String,
            default: ''
        },

        /* ¿Tiene microchip? */
        hasMicrochip: {
            type: Boolean,
            default: false
        },

        /* ¿Está esterilizado/castrado? */
        isSterilized: {
            type: Boolean,
            default: false
        },

        /* ¿Está siguiendo tratamiento médico? */
        hasMedicalTreatment: {
            type: Boolean,
            default: false
        },

        /* ¿Tiene vacunas al día? */
        vaccinesUpToDate: {
            type: Boolean,
            default: false
        },

        /* Alergias o cuidados especiales */
        specialCare: {
            type: String,
            default: ''
        },

        /* Historial médico resumido */
        medicalHistory: {
            type: String,
            default: ''
        },

        /* Usuario dueño de la mascota */
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },

        /* Estado general de disponibilidad */
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