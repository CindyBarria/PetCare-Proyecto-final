/**
 * =========================================================
 * ESTRUCTURA GENERAL DEL ARCHIVO
 * - Rutas de reseñas
 * - Permiten crear reseñas y obtenerlas por cuidador
 * =========================================================
 */

const express = require('express');

const {
    createReview,
    getReviewsByCaretaker
} = require('../controllers/review-controller');

const authMiddleware = require('../middlewares/auth-middleware');

const router = express.Router();

/**
 * POST /reviews
 * Crea una nueva reseña
 * Ruta protegida con autenticación
 */
router.post('/', authMiddleware, createReview);

/**
 * GET /reviews/:id
 * Obtiene las reseñas asociadas a un cuidador
 */
router.get('/:id', getReviewsByCaretaker);

module.exports = router;