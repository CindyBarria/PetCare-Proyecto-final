/**
 * =========================================================
 * ESTRUCTURA GENERAL DEL ARCHIVO
 * - Sistema de rutas principal
 * - Usa lazy y Suspense para cargar páginas
 * =========================================================
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { ROUTES } from '../const/routes';

/* Carga diferida de páginas para mejorar organización */
const Login = lazy(() => import('../pages/login'));
const Register = lazy(() => import('../pages/register'));
const Home = lazy(() => import('../pages/home'));
const PetDetail = lazy(() => import('../pages/pet-detail'));
const Caretakers = lazy(() => import('../pages/caretakers'));

/**
 * Componente de enrutado principal.
 *
 * @returns {JSX.Element}
 */
export default function AppRouter() {
    return (
        <BrowserRouter>
            <Suspense fallback={<p className="p-4">Cargando...</p>}>
                <Routes>
                    <Route path={ROUTES.LOGIN} element={<Login />} />
                    <Route path={ROUTES.REGISTER} element={<Register />} />
                    <Route path={ROUTES.HOME} element={<Home />} />
                    <Route path={ROUTES.PET_DETAIL} element={<PetDetail />} />
                    <Route path={ROUTES.CARETAKERS} element={<Caretakers />} />
                </Routes>
            </Suspense>
        </BrowserRouter>
    );
}