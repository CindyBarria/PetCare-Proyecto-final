/**
 * =========================================================
 * ESTRUCTURA GENERAL DEL ARCHIVO
 * - Custom hook para autenticación
 * - Usa useContext para acceder al AuthContext
 * - Realiza login y registro contra la API
 * =========================================================
 */

import { useContext } from 'react';
import { AuthContext } from '../context/auth-context';

/* Constante de entorno con la URL base de la API */
const API_URL = import.meta.env.VITE_API_URL;

/**
 * Custom hook de autenticación.
 *
 * Hooks usados:
 * - useContext: obtiene user, login y logout desde AuthContext
 *
 * Retorna:
 * - user: usuario autenticado
 * - login: función del contexto
 * - logout: función del contexto
 * - loginUser: petición POST para iniciar sesión
 * - registerUser: petición POST para registrar usuario
 *
 * @returns {Object}
 */
export function useAuth() {
    const context = useContext(AuthContext);

    /**
     * Envía las credenciales al backend para iniciar sesión.
     *
     * @param {Object} credentials
     * @param {string} credentials.email
     * @param {string} credentials.password
     * @returns {Promise<Object>}
     */
    const loginUser = async (credentials) => {
        const response = await fetch(`${API_URL}/users/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials)
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Error login');
        }

        /* Se guarda la sesión usando la función del contexto */
        context.login(data);
        return data;
    };

    /**
     * Registra un usuario nuevo en la base de datos.
     *
     * @param {Object} formData
     * @returns {Promise<Object>}
     */
    const registerUser = async (formData) => {
        const payload = {
            ...formData,
            isAdmin: false
        };

        const response = await fetch(`${API_URL}/users`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Error register');
        }

        return data;
    };

    return {
        ...context,
        loginUser,
        registerUser
    };
}