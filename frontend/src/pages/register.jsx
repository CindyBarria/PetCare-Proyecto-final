import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/use-auth';

import Input from '../components/ui/input';
import Button from '../components/ui/button';
import Card from '../components/ui/card';
import Select from '../components/ui/select';

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

            await registerUser(form);

            navigate('/login');
        } catch (error) {
            setErrorMessage(error.message);
            console.error('REGISTER ERROR:', error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#F8F8F8] px-4">
            <Card>
                <form onSubmit={handleSubmit} className="w-[295px]">
                    <h1 className="text-2xl font-semibold text-[#2B7A78] mb-6">
                        Registro
                    </h1>

                    <Input
                        placeholder="Nombre"
                        value={form.name}
                        onChange={handleChange}
                        name="name"
                    />

                    <Input
                        type="email"
                        placeholder="Correo electrónico"
                        value={form.email}
                        onChange={handleChange}
                        name="email"
                    />

                    <Input
                        type="password"
                        placeholder="Contraseña"
                        value={form.password}
                        onChange={handleChange}
                        name="password"
                    />

                    <Select
                        value={form.role}
                        onChange={handleChange}
                        name="role"
                        options={[
                            { value: 'owner', label: 'Dueño' },
                            { value: 'caretaker', label: 'Cuidador' }
                        ]}
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
                        {isLoading ? 'Registrando...' : 'Registrarse'}
                    </Button>

                    <p className="text-sm text-center text-[#4D4D4D] mt-4">
                        ¿Ya tienes cuenta?{' '}
                        <Link to="/login" className="text-[#2B7A78] font-medium">
                            Inicia sesión
                        </Link>
                    </p>
                </form>
            </Card>
        </div>
    );
}