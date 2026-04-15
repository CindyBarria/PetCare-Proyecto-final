/**
 * =========================================================
 * ESTRUCTURA GENERAL DEL ARCHIVO
 * - Rutas de usuarios
 * - Permiten registrar, iniciar sesión y gestionar usuarios
 * =========================================================
 */

const express = require('express');

const {
    createUser,
    login,
    getUsers,
    deleteUser,
    updateUser
} = require('../controllers/users-controller');

const router = express.Router();

/**
 * POST /users
 * Registra un nuevo usuario
 */
router.post('/', createUser);

/**
 * POST /users/login
 * Inicia sesión de un usuario
 */
router.post('/login', login);

/**
 * GET /users
 * Obtiene todos los usuarios
 */
router.get('/', getUsers);

/**
 * DELETE /users/:id
 * Elimina un usuario por id
 */
router.delete('/:id', deleteUser);

/**
 * PUT /users/:id
 * Actualiza un usuario por id
 */
router.put('/:id', updateUser);

module.exports = router;