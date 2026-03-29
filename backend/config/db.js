const mongoose = require('mongoose');

// Conexión a MongoDB usando variables de entorno
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