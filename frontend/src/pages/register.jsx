/**
 * =========================================================
 * ESTRUCTURA GENERAL DEL ARCHIVO
 * - Página de registro
 * - Permite crear dueño o cuidador
 * - Usa componentes reutilizables
 * =========================================================
 */

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/use-auth';
import { ROUTES } from '../const/routes';
import Input from '../components/ui/input';
import Select from '../components/ui/select';
import Button from '../components/ui/button';
import Card from '../components/ui/card';

/**
 * Página de registro de usuario.
 *
 * @returns {JSX.Element}
 */
export default function Register() {
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        role: 'owner'
    });
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();
    const { registerUser } = useAuth();

    const isFormValid =
        form.name.trim() !== '' &&
        form.email.trim() !== '' &&
        form.password.trim() !== '' &&
        form.role.trim() !== '';

    /**
     * Actualiza el estado del formulario.
     *
     * @param {Object} event
     * @returns {void}
     */
    const handleChange = ({ target: { name, value } }) => {
        setForm((prevForm) => ({
            ...prevForm,
            [name]: value
        }));
    };

    /**
     * Envía el registro del usuario al backend.
     *
     * @param {Object} event
     * @returns {Promise<void>}
     */
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!isFormValid) return;

        try {
            setIsLoading(true);
            setErrorMessage('');

            await registerUser(form);
            navigate(ROUTES.LOGIN);
        } catch (error) {
            setErrorMessage(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[var(--color-background)] px-4">
            <Card>
                <form onSubmit={handleSubmit} className="w-[295px]">
                    <h1 className="text-2xl font-semibold text-[var(--color-primary)] mb-6">
                        Registro
                    </h1>

                    <Input
                        name="name"
                        placeholder="Nombre"
                        value={form.name}
                        onChange={handleChange}
                    />

                    <Input
                        type="email"
                        name="email"
                        placeholder="Correo electrónico"
                        value={form.email}
                        onChange={handleChange}
                    />

                    <Input
                        type="password"
                        name="password"
                        placeholder="Contraseña"
                        value={form.password}
                        onChange={handleChange}
                    />

                    <Select
                        name="role"
                        value={form.role}
                        onChange={handleChange}
                        options={[
                            { value: 'owner', label: 'Dueño' },
                            { value: 'caretaker', label: 'Cuidador' }
                        ]}
                    />

                    {errorMessage ? (
                        <p className="text-sm text-red-600 mb-3">{errorMessage}</p>
                    ) : null}

                    <Button type="submit" disabled={!isFormValid || isLoading}>
                        {isLoading ? 'Registrando...' : 'Registrarse'}
                    </Button>

                    <p className="text-sm text-center text-[#4D4D4D] mt-4">
                        ¿Ya tienes cuenta?{' '}
                        <Link to={ROUTES.LOGIN} className="text-[var(--color-primary)] font-medium">
                            Inicia sesión
                        </Link>
                    </p>
                </form>
            </Card>
        </div>
    );
}