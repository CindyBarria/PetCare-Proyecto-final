/**
 * =========================================================
 * ESTRUCTURA GENERAL DEL ARCHIVO
 * - Modelo de solicitudes de cuidado
 * - Relaciona mascota, dueño y cuidador
 * =========================================================
 */

const mongoose = require('mongoose');

/**
 * Esquema de solicitud de cuidado.
 */
const requestSchema = new mongoose.Schema(
    {
        pet: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Pet',
            required: true
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        caretaker: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        status: {
            type: String,
            enum: ['pending', 'accepted', 'rejected'],
            default: 'pending'
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Request', requestSchema);