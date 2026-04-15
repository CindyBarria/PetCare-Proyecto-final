/**
 * =========================================================
 * ESTRUCTURA GENERAL DEL ARCHIVO
 * - Rutas de mascotas
 * - Permiten crear, listar, filtrar, ver detalle, editar y eliminar
 * =========================================================
 */

const express = require('express');
const {
    createPets,
    getPets,
    deletePets,
    updatePets,
    getPetById
} = require('../controllers/pets-controller');
const authMiddleware = require('../middlewares/auth-middleware');

const router = express.Router();

/**
 * GET /pets
 * Obtiene listado de mascotas y permite filtros por query params
 */
router.get('/', getPets);

/**
 * GET /pets/:id
 * Obtiene detalle de una mascota
 */
router.get('/:id', getPetById);

/**
 * POST /pets
 * Crea una nueva mascota
 */
router.post('/', authMiddleware, createPets);

/**
 * PUT /pets/:id
 * Actualiza una mascota
 */
router.put('/:id', authMiddleware, updatePets);

/**
 * DELETE /pets/:id
 * Elimina una mascota
 */
router.delete('/:id', authMiddleware, deletePets);

module.exports = router;