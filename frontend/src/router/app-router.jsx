import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { ROUTES } from '../const/routes';

const Login = lazy(() => import('../pages/login'));
const Register = lazy(() => import('../pages/register'));
const Home = lazy(() => import('../pages/home'));
const PetDetail = lazy(() => import('../pages/pet-detail'));
const Caretakers = lazy(() => import('../pages/caretakers'));

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