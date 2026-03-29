const Request = require('../models/request');
const Pets = require('../models/pet');

async function createRequest(req, res) {
    try {
        const { pet, owner, caretaker, message } = req.body;

        const newRequest = new Request({
            pet,
            owner,
            caretaker,
            message
        });

        await newRequest.save();

        res.status(201).json(newRequest);
    } catch (error) {
        res.status(500).json({ message: 'Error creating request', error });
    }
}

async function getRequests(req, res) {
    try {
        const requests = await Request.find()
            .populate('pet')
            .populate('owner')
            .populate('caretaker');

        res.json(requests);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching requests', error });
    }
}

async function updateRequestStatus(req, res) {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const request = await Request.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );

        if (!request) {
            return res.status(404).json({ message: 'Request not found' });
        }

        // 🔥 lógica importante: si se acepta → actualizar mascota
        if (status === 'accepted') {
            await Pets.findByIdAndUpdate(request.pet, {
                status: 'assigned'
            });
        }

        res.json(request);
    } catch (error) {
        res.status(500).json({ message: 'Error updating request', error });
    }
}

async function deleteRequest(req, res) {
    try {
        const { id } = req.params;

        const request = await Request.findByIdAndDelete(id);

        if (!request) {
            return res.status(404).json({ message: 'Request not found' });
        }

        res.json({ message: 'Request deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting request', error });
    }
}

module.exports = {
    createRequest,
    getRequests,
    updateRequestStatus,
    deleteRequest
};