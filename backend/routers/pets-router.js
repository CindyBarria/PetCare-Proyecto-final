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

router.get('/', getPets);
router.get('/:id', getPetById);
router.post('/', authMiddleware, createPets);
router.put('/:id', authMiddleware, updatePets);
router.delete('/:id', authMiddleware, deletePets);

module.exports = router;