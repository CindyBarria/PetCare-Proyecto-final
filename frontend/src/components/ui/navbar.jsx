/**
 * =========================================================
 * ESTRUCTURA GENERAL DEL ARCHIVO
 * - Navbar principal responsive
 * - En desktop muestra menú horizontal
 * - En mobile muestra botón hamburguesa
 * =========================================================
 */

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/use-auth';
import { ROUTES } from '../../const/routes';
import Button from './button';

/**
 * Navbar principal de la aplicación.
 *
 * @returns {JSX.Element}
 */
export default function Navbar() {
    /* Estado para abrir/cerrar el menú mobile */
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navigate = useNavigate();
    const { user, logout } = useAuth();

    /**
     * Cierra sesión y redirige al login.
     */
    const handleLogout = () => {
        logout();
        navigate(ROUTES.LOGIN);
    };

    /**
     * Alterna el estado del menú hamburguesa.
     */
    const handleToggleMenu = () => {
        setIsMenuOpen((prevState) => !prevState);
    };

    /**
     * Cierra el menú mobile al navegar.
     */
    const handleCloseMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <nav className="bg-white border-b border-[var(--color-border)]">
            <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
                {/* Inicio: logo / nombre de la app */}
                <h1 className="text-xl font-semibold text-[var(--color-primary)]">
                    PetCare
                </h1>
                {/* Fin: logo / nombre de la app */}

                {/* Inicio: navegación desktop */}
                <div className="hidden md:flex items-center gap-4">
                    <Link
                        to={ROUTES.HOME}
                        className="text-[var(--color-primary)] font-medium"
                    >
                        Mascotas
                    </Link>

                    <Link
                        to={ROUTES.CARETAKERS}
                        className="text-[var(--color-primary)] font-medium"
                    >
                        Cuidadores
                    </Link>

                    <span className="text-sm text-gray-600">
                        {user?.name}
                    </span>

                    <Button onClick={handleLogout} fullWidth={false}>
                        Cerrar sesión
                    </Button>
                </div>
                {/* Fin: navegación desktop */}

                {/* Inicio: botón hamburguesa mobile */}
                <button
                    type="button"
                    onClick={handleToggleMenu}
                    className="md:hidden flex flex-col justify-center gap-1"
                    aria-label="Abrir menú de navegación"
                >
                    <span className="w-6 h-[2px] bg-[var(--color-primary)]"></span>
                    <span className="w-6 h-[2px] bg-[var(--color-primary)]"></span>
                    <span className="w-6 h-[2px] bg-[var(--color-primary)]"></span>
                </button>
                {/* Fin: botón hamburguesa mobile */}
            </div>

            {/* Inicio: menú mobile desplegable */}
            {isMenuOpen ? (
                <div className="md:hidden px-4 pb-4 flex flex-col gap-3 bg-white border-t border-[var(--color-border)]">
                    <Link
                        to={ROUTES.HOME}
                        onClick={handleCloseMenu}
                        className="text-[var(--color-primary)] font-medium"
                    >
                        Mascotas
                    </Link>

                    <Link
                        to={ROUTES.CARETAKERS}
                        onClick={handleCloseMenu}
                        className="text-[var(--color-primary)] font-medium"
                    >
                        Cuidadores
                    </Link>

                    <span className="text-sm text-gray-600">
                        {user?.name}
                    </span>

                    <Button onClick={handleLogout}>
                        Cerrar sesión
                    </Button>
                </div>
            ) : null}
            {/* Fin: menú mobile desplegable */}
        </nav>
    );
}