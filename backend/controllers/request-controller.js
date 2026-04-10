/**
 * =========================================================
 * ESTRUCTURA GENERAL DEL ARCHIVO
 * - Controladores de solicitudes
 * - Crear, listar y actualizar solicitudes
 * =========================================================
 */

const Request = require('../models/request');
const Pet = require('../models/pet');

/**
 * Crea una solicitud de cuidado.
 * Solo el cuidador debería usar esta acción.
 *
 * @param {Object} req
 * @param {Object} res
 * @returns {Promise<void>}
 */
async function createRequest(req, res) {
    try {
        const { petId } = req.body;

        if (!petId) {
            return res.status(400).json({
                message: 'Pet id is required'
            });
        }

        const pet = await Pet.findById(petId);

        if (!pet) {
            return res.status(404).json({
                message: 'Pet not found'
            });
        }

        const existingRequest = await Request.findOne({
            pet: petId,
            caretaker: req.user.id,
            status: 'pending'
        });

        if (existingRequest) {
            return res.status(400).json({
                message: 'You already have a pending request for this pet'
            });
        }

        const newRequest = new Request({
            pet: pet._id,
            owner: pet.owner,
            caretaker: req.user.id,
            status: 'pending'
        });

        await newRequest.save();

        return res.status(201).json(newRequest);
    } catch (error) {
        return res.status(500).json({
            message: 'Error creating request',
            error: error.message
        });
    }
}

/**
 * Obtiene las solicitudes del dueño autenticado.
 *
 * @param {Object} req
 * @param {Object} res
 * @returns {Promise<void>}
 */
async function getOwnerRequests(req, res) {
    try {
        const requests = await Request.find({ owner: req.user.id })
            .populate('pet')
            .populate('caretaker', 'name email')
            .sort({ createdAt: -1 });

        return res.status(200).json(requests);
    } catch (error) {
        return res.status(500).json({
            message: 'Error fetching requests',
            error: error.message
        });
    }
}

/**
 * Actualiza el estado de una solicitud.
 * El dueño acepta o rechaza.
 *
 * @param {Object} req
 * @param {Object} res
 * @returns {Promise<void>}
 */
async function updateRequestStatus(req, res) {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!status) {
            return res.status(400).json({
                message: 'Status is required'
            });
        }

        const request = await Request.findById(id);

        if (!request) {
            return res.status(404).json({
                message: 'Request not found'
            });
        }

        if (request.owner.toString() !== req.user.id && !req.user.isAdmin) {
            return res.status(403).json({
                message: 'Not authorized'
            });
        }

        request.status = status;
        await request.save();

        return res.status(200).json(request);
    } catch (error) {
        return res.status(500).json({
            message: 'Error updating request',
            error: error.message
        });
    }
}

module.exports = {
    createRequest,
    getOwnerRequests,
    updateRequestStatus
};