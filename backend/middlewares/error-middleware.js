/**
 * =========================================================
 * ESTRUCTURA GENERAL DEL ARCHIVO
 * - Middleware de errores global
 * - Maneja rutas no encontradas (404)
 * - Maneja errores internos del servidor (500)
 * =========================================================
 */

/**
 * Middleware para rutas no encontradas (404).
 *
 * Se ejecuta cuando ninguna ruta coincide.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
function notFound(req, res, next) {
    res.status(404).json({
        message: 'Route not found'
    });
}

/**
 * Middleware para errores internos (500).
 *
 * Captura errores lanzados en la aplicación.
 *
 * @param {Error} err
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
function errorHandler(err, req, res, next) {
    console.error(err.stack);

    res.status(err.status || 500).json({
        message: err.message || 'Internal server error'
    });
}

module.exports = {
    notFound,
    errorHandler
};