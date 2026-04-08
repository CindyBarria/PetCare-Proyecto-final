/**
 * =========================================================
 * ESTRUCTURA GENERAL DEL ARCHIVO
 * - Provider del contexto de autenticación
 * - Gestiona usuario en estado global y localStorage
 * =========================================================
 */

import { useState } from 'react';
import { AuthContext } from './auth-context';

/**
 * Provider que comparte el usuario autenticado y funciones
 * de login / logout con toda la aplicación.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Componentes hijos
 * @returns {JSX.Element}
 */
export function AuthProvider({ children }) {
    /**
     * Estado global del usuario autenticado.
     * Se inicializa leyendo localStorage para mantener la sesión.
     */
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    /**
     * Guarda token y usuario en localStorage y actualiza el estado.
     *
     * @param {Object} data - Respuesta del backend
     * @param {string} data.token - Token JWT del usuario
     * @param {Object} data.user - Usuario autenticado
     */
    const login = (data) => {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        setUser(data.user);
    };

    /**
     * Cierra la sesión del usuario.
     * Elimina datos de localStorage y limpia el estado.
     */
    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}