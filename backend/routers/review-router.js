const express = require('express');
const {
    createReview,
    getReviewsByCaretaker
} = require('../controllers/review-controller');
const authMiddleware = require('../middlewares/auth-middleware');

const router = express.Router();

router.post('/', authMiddleware, createReview);
router.get('/:id', getReviewsByCaretaker);

module.exports = router;