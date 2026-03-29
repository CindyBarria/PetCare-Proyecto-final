import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/use-auth';

import Input from '../components/ui/input';
import Button from '../components/ui/button';
import Card from '../components/ui/card';

export default function Login() {
    const [form, setForm] = useState({
        email: '',
        password: ''
    });

    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();
    const { loginUser } = useAuth();

    const isFormValid =
        form.email.trim() !== '' &&
        form.password.trim() !== '';

    const handleChange = ({ target: { name, value } }) => {
        setForm((prevForm) => ({
            ...prevForm,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isFormValid) return;

        try {
            setIsLoading(true);
            setErrorMessage('');

            await loginUser(form);
            navigate('/');
        } catch (error) {
            setErrorMessage(error.message);
            console.error('LOGIN ERROR:', error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#F8F8F8] px-4">
            <Card>
                <form onSubmit={handleSubmit} className="w-[295px]">
                    <h1 className="text-2xl font-semibold text-[#2B7A78] mb-6">
                        Iniciar sesión
                    </h1>

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

                    {errorMessage ? (
                        <p className="text-sm text-red-600 mb-3">
                            {errorMessage}
                        </p>
                    ) : null}

                    <Button
                        type="submit"
                        disabled={!isFormValid || isLoading}
                    >
                        {isLoading ? 'Ingresando...' : 'Login'}
                    </Button>

                    <p className="text-sm text-center text-[#4D4D4D] mt-4">
                        ¿No tienes cuenta?{' '}
                        <Link to="/register" className="text-[#2B7A78] font-medium">
                            Regístrate
                        </Link>
                    </p>
                </form>
            </Card>
        </div>
    );
}