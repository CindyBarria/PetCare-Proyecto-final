const express = require('express');
const { createPets, getPets, deletePets, updatePets, getPetById } = require('../controllers/pets-controller');


const router = express.Router();

router.post('/',createPets );
router.get('/', getPets);
router.delete('/:id', deletePets);
router.put('/:id', updatePets);
router.get('/:id', getPetById);
module.exports = router;