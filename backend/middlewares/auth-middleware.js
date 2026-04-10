/**
 * =========================================================
 * ESTRUCTURA GENERAL DEL ARCHIVO
 * - Middleware de autenticación
 * - Valida el token JWT enviado por headers
 * =========================================================
 */

const jwt = require('jsonwebtoken');

/**
 * Middleware para proteger rutas privadas.
 *
 * Soporta dos formatos:
 * - Authorization: token
 * - Authorization: Bearer token
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @returns {void}
 */
function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: 'No token provided' });
    }

    /* Si viene en formato Bearer, se extrae solo el token */
    const token = authHeader.startsWith('Bearer ')
        ? authHeader.split(' ')[1]
        : authHeader;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
}

module.exports = authMiddleware;