/**
 * =========================================================
 * ESTRUCTURA GENERAL DEL ARCHIVO
 * - Punto de entrada de React
 * - Renderiza App dentro del AuthProvider
 * - Importa los estilos globales
 * =========================================================
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from './context/auth-provider';
import './index.css';

/**
 * Render principal de la aplicación.
 * El AuthProvider envuelve toda la app para compartir
 * el contexto de autenticación entre páginas y componentes.
 */
ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <AuthProvider>
            <App />
        </AuthProvider>
    </React.StrictMode>
);