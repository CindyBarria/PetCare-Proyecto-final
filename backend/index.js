/**
 * =========================================================
 * ESTRUCTURA GENERAL DEL ARCHIVO
 * - Configuración principal del servidor Express
 * - Conexión a MongoDB
 * - Middlewares globales
 * - Rutas de la API
 * =========================================================
 */

require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

/* Seguridad y logging */
const helmet = require('helmet');
const morgan = require('morgan');

/* Routers */
const userRouter = require('./routers/users-router');
const petRouter = require('./routers/pets-router');
const reviewRouter = require('./routers/review-router');
const requestRouter = require('./routers/request-router');

/* Middlewares de error */
const { notFound, errorHandler } = require('./middlewares/error-middleware');

const app = express();

/**
 * =========================================================
 * MIDDLEWARES GLOBALES
 * =========================================================
 */

/* Permite peticiones entre frontend y backend */
app.use(cors());

/* Seguridad HTTP */
app.use(helmet());

/* Logging de peticiones */
app.use(morgan('dev'));

/* Parseo de JSON con límite ampliado */
app.use(express.json({ limit: '25mb' }));

/* Parseo de formularios URL-encoded con límite ampliado */
app.use(express.urlencoded({ extended: true, limit: '25mb' }));

/**
 * =========================================================
 * CONEXIÓN A BASE DE DATOS
 * =========================================================
 */

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch((error) => console.error('MongoDB error:', error));

/**
 * =========================================================
 * RUTAS PRINCIPALES
 * =========================================================
 */

app.use('/users', userRouter);
app.use('/pets', petRouter);
app.use('/reviews', reviewRouter);
app.use('/requests', requestRouter);

/**
 * =========================================================
 * MIDDLEWARES DE ERROR
 * =========================================================
 */

app.use(notFound);
app.use(errorHandler);

/**
 * =========================================================
 * SERVIDOR
 * =========================================================
 */

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});