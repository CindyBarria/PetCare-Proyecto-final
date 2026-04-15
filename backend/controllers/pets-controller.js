/**
 * =========================================================
 * ESTRUCTURA GENERAL DEL ARCHIVO
 * - Controladores de mascotas
 * - Crear, obtener, filtrar, actualizar y eliminar mascotas
 * =========================================================
 */

const Pet = require('../models/pet');

/**
 * Crea una nueva mascota asociada al usuario autenticado.
 *
 * @param {Object} req - Request de Express
 * @param {Object} res - Response de Express
 * @returns {Promise<void>}
 */
async function createPets(req, res) {
    try {
        const {
            name,
            species,
            sex,
            age,
            weight,
            shortDescription,
            description,
            imageUrl,
            hasMicrochip,
            isSterilized,
            hasMedicalTreatment,
            vaccinesUpToDate,
            specialCare,
            medicalHistory,
            symptoms,
            reminders,
            status
        } = req.body;

        if (!name || !species || !age || !shortDescription || !description) {
            return res.status(400).json({
                message: 'Missing required fields'
            });
        }

        const newPet = new Pet({
            name,
            species,
            sex,
            age,
            weight,
            shortDescription,
            description,
            imageUrl,
            hasMicrochip,
            isSterilized,
            hasMedicalTreatment,
            vaccinesUpToDate,
            specialCare,
            medicalHistory,
            symptoms,
            reminders,
            status,
            owner: req.user.id
        });

        await newPet.save();

        return res.status(201).json(newPet);
    } catch (error) {
        return res.status(500).json({
            message: 'Error creating pet',
            error: error.message
        });
    }
}

/**
 * Obtiene mascotas con filtros opcionales por query params.
 *
 * Filtros disponibles:
 * - species
 * - status
 * - sex
 * - minAge
 * - maxAge
 * - search
 *
 * Ejemplos:
 * /pets?species=Perro
 * /pets?status=available
 * /pets?minAge=1&maxAge=5
 * /pets?search=luna
 *
 * @param {Object} req
 * @param {Object} res
 * @returns {Promise<void>}
 */
async function getPets(req, res) {
    try {
        const {
            species,
            status,
            sex,
            minAge,
            maxAge,
            search
        } = req.query;

        /**
         * Objeto dinámico de filtros para MongoDB.
         * Se va completando según los parámetros recibidos.
         */
        const filters = {};

        /* Filtro exacto por especie */
        if (species) {
            filters.species = species;
        }

        /* Filtro exacto por estado */
        if (status) {
            filters.status = status;
        }

        /* Filtro exacto por sexo */
        if (sex) {
            filters.sex = sex;
        }

        /**
         * Filtro por rango de edad usando operadores MongoDB:
         * - $gte: mayor o igual
         * - $lte: menor o igual
         */
        if (minAge || maxAge) {
            filters.age = {};

            if (minAge) {
                filters.age.$gte = Number(minAge);
            }

            if (maxAge) {
                filters.age.$lte = Number(maxAge);
            }
        }

        /**
         * Búsqueda flexible por nombre o descripción breve usando regex.
         * La opción i permite búsqueda sin distinguir mayúsculas/minúsculas.
         */
        if (search) {
            filters.$or = [
                { name: { $regex: search, $options: 'i' } },
                { shortDescription: { $regex: search, $options: 'i' } }
            ];
        }

        const pets = await Pet.find(filters).populate('owner', 'name email');

        return res.status(200).json(pets);
    } catch (error) {
        return res.status(500).json({
            message: 'Error fetching pets',
            error: error.message
        });
    }
}

/**
 * Obtiene una mascota por id.
 *
 * @param {Object} req
 * @param {Object} res
 * @returns {Promise<void>}
 */
async function getPetById(req, res) {
    try {
        const { id } = req.params;

        const pet = await Pet.findById(id).populate('owner', 'name email');

        if (!pet) {
            return res.status(404).json({
                message: 'Pet not found'
            });
        }

        return res.status(200).json(pet);
    } catch (error) {
        return res.status(500).json({
            message: 'Error fetching pet',
            error: error.message
        });
    }
}

/**
 * Actualiza una mascota existente.
 *
 * @param {Object} req
 * @param {Object} res
 * @returns {Promise<void>}
 */
async function updatePets(req, res) {
    try {
        const { id } = req.params;

        const pet = await Pet.findById(id);

        if (!pet) {
            return res.status(404).json({
                message: 'Pet not found'
            });
        }

        if (pet.owner.toString() !== req.user.id && !req.user.isAdmin) {
            return res.status(403).json({
                message: 'Not authorized'
            });
        }

        const updatedPet = await Pet.findByIdAndUpdate(id, req.body, {
            new: true
        });

        return res.status(200).json({
            message: 'Pet updated successfully',
            pet: updatedPet
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error updating pet',
            error: error.message
        });
    }
}

/**
 * Elimina una mascota.
 *
 * @param {Object} req
 * @param {Object} res
 * @returns {Promise<void>}
 */
async function deletePets(req, res) {
    try {
        const { id } = req.params;

        const pet = await Pet.findById(id);

        if (!pet) {
            return res.status(404).json({
                message: 'Pet not found'
            });
        }

        if (pet.owner.toString() !== req.user.id && !req.user.isAdmin) {
            return res.status(403).json({
                message: 'Not authorized'
            });
        }

        await Pet.findByIdAndDelete(id);

        return res.status(200).json({
            message: 'Pet deleted successfully'
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error deleting pet',
            error: error.message
        });
    }
}

module.exports = {
    createPets,
    getPets,
    getPetById,
    updatePets,
    deletePets
};