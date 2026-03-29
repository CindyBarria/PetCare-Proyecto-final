// Middleware 404
function notFound(req, res, next) {
    res.status(404).json({ message: 'Route not found' });
}

// Middleware 500
function errorHandler(err, req, res, next) {
    res.status(500).json({
        message: 'Server error',
        error: err.message
    });
}

module.exports = { notFound, errorHandler };