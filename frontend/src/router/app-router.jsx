import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';

const Login = lazy(() => import('../pages/login'));
const Register = lazy(() => import('../pages/register'));

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Suspense fallback={<p>Cargando...</p>}>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            </Suspense>
        </BrowserRouter>
    );
}