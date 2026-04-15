/**
 * =========================================================
 * ESTRUCTURA GENERAL DEL ARCHIVO
 * - Modelo de usuario
 * - Define la estructura de dueños, cuidadores y administradores
 * - Se guarda en MongoDB usando Mongoose
 * =========================================================
 */

const mongoose = require('mongoose');

/**
 * Esquema de usuario.
 * Un usuario puede tener rol owner o caretaker
 * y además puede tener permisos de administrador.
 */
const userSchema = new mongoose.Schema(
    {
        /* Nombre del usuario */
        name: {
            type: String,
            required: true
        },

        /* Correo electrónico único */
        email: {
            type: String,
            required: true,
            unique: true
        },

        /* Contraseña encriptada */
        password: {
            type: String,
            required: true
        },

        /* Indica si el usuario tiene permisos de administración */
        isAdmin: {
            type: Boolean,
            default: false
        },

        /* Rol principal del usuario dentro de la app */
        role: {
            type: String,
            enum: ['owner', 'caretaker'],
            required: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('User', userSchema);