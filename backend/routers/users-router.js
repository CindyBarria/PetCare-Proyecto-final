
const express = require('express');
const { createUser, login, getUsers, deleteUser, updateUser } = require('../controllers/users-controller');

const router = express.Router();

// Registro
router.post('/', createUser);

// Login
router.post('/login', login);

// Obtener usuarios
router.get('/', getUsers);

// Eliminar
router.delete('/:id', deleteUser);

// Actualizar
router.put('/:id', updateUser);

module.exports = router;