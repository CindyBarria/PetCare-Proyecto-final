/**
 * =========================================================
 * ESTRUCTURA GENERAL DEL ARCHIVO
 * - Configuración de conexión a MongoDB
 * - Centraliza la lógica de conexión a base de datos
 * =========================================================
 */

const mongoose = require('mongoose');

/**
 * Conecta la aplicación con MongoDB usando la variable de entorno MONGO_URI.
 *
 * @returns {Promise<void>}
 */
async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected');
    } catch (error) {
        console.error('Database connection error:', error.message);
        process.exit(1);
    }
}

module.exports = connectDB;