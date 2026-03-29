import { useContext } from 'react';
import { AuthContext } from '../context/auth-context';

const API_URL = import.meta.env.VITE_API_URL;

export function useAuth() {
    const context = useContext(AuthContext);

    const loginUser = async (credentials) => {
        const res = await fetch(`${API_URL}/users/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials)
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || 'Login error');
        }

        context.login(data);
        return data;
    };

    const registerUser = async (formData) => {
        const payload = {
            ...formData,
            isAdmin: false
        };

        const res = await fetch(`${API_URL}/users`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || 'Register error');
        }

        return data;
    };

    return {
        ...context,
        loginUser,
        registerUser
    };
}