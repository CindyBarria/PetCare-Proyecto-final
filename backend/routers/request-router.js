const express = require('express');
const {
    createRequest,
    getRequests,
    updateRequestStatus,
    deleteRequest
} = require('../controllers/request-controller');

const router = express.Router();

router.post('/', createRequest);
router.get('/', getRequests);
router.put('/:id', updateRequestStatus);
router.delete('/:id', deleteRequest);

module.exports = router;