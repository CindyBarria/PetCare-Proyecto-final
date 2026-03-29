const Pets = require('../models/pet');

async function createPets(req, res) {
        const { name, species, age, owner, description, status } = req.body;
        const newPets = new Pets({ name, species, age, owner, description, status });
        await newPets.save();
        res.status(201).json(newPets);
}

async function getPets(req, res) {
    try {
        const pets = await Pets.find();
        res.status(200).json(pets);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching pets', error });
    }
}

async function getPetById(req, res) {
    try {
        const { id } = req.params;
        const pet = await Pets.findById(id);
        if (!pet) {
            return res.status(404).json({ message: 'Pet not found' });
        }
        res.json(pet);
    } catch (error) {
        res.status(500).json({ error });
    }
}

async function deletePets(req, res) {
    try {
        const { id } = req.params;
        const pet = await Pets.findByIdAndDelete(id);
        if (!pet) {
            return res.status(404).json({ message: 'Pet not found' });
        }
        res.status(200).json({ message: 'Pet deleted successfully', pet });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting Pet', error });
    }
}
async function updatePets(req, res) {
    try {
        const { id } = req.params;
        const pet = await Pets.findByIdAndUpdate(id, req.body, { new: true });
        if (!pet) {
            return res.status(404).json({ message: 'Pet not found' });
        }
        res.status(200).json({ message: 'Pet updated successfully', pet });
    } catch (error) {
        res.status(500).json({ message: 'Error updating Pet', error });
    }
}

module.exports = { createPets, getPets, deletePets, updatePets, getPetById };