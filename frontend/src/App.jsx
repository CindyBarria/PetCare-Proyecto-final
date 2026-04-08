/**
 * =========================================================
 * ESTRUCTURA GENERAL DEL ARCHIVO
 * - Este archivo define el componente principal de la app
 * - La aplicación delega el sistema de rutas al AppRouter
 * =========================================================
 */

import AppRouter from './router/app-router';

/**
 * Componente principal de la aplicación.
 * Contiene el sistema global de rutas.
 *
 * @returns {JSX.Element}
 */
function App() {
    return <AppRouter />;
}

export default App;