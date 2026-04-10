/**
 * =========================================================
 * ESTRUCTURA GENERAL DEL ARCHIVO
 * - Rutas de solicitudes de cuidado
 * =========================================================
 */

const express = require('express');
const {
    createRequest,
    getOwnerRequests,
    updateRequestStatus
} = require('../controllers/request-controller');
const authMiddleware = require('../middlewares/auth-middleware');

const router = express.Router();

/* Crear solicitud de cuidado */
router.post('/', authMiddleware, createRequest);

/* Ver solicitudes del dueño autenticado */
router.get('/owner', authMiddleware, getOwnerRequests);

/* Aceptar o rechazar solicitud */
router.put('/:id', authMiddleware, updateRequestStatus);

module.exports = router;