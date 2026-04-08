/**
 * =========================================================
 * ESTRUCTURA GENERAL DEL ARCHIVO
 * - Crea el contexto global de autenticación
 * - Este contexto será usado por el provider y hooks
 * =========================================================
 */

import { createContext } from 'react';

/**
 * Contexto de autenticación.
 *
 * Propiedades esperadas en el contexto:
 * - user: usuario autenticado
 * - login: función para guardar sesión
 * - logout: función para cerrar sesión
 */
export const AuthContext = createContext();