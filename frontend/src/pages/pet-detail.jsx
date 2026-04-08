/**
 * =========================================================
 * ESTRUCTURA GENERAL DEL ARCHIVO
 * - Página de detalle de una mascota
 * - Muestra imagen, descripción completa y dueño
 * =========================================================
 */

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/ui/navbar';
import Card from '../components/ui/card';

const API_URL = import.meta.env.VITE_API_URL;

const fallbackImage =
    'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=800&q=80';

/**
 * Página de detalle de mascota.
 *
 * Hooks usados:
 * - useParams: obtiene el id desde la URL
 * - useState: guarda mascota y error
 * - useEffect: ejecuta la carga inicial del detalle
 *
 * @returns {JSX.Element}
 */
export default function PetDetail() {
    const { id } = useParams();
    const [pet, setPet] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        let isMounted = true;

        async function fetchPet() {
            try {
                const response = await fetch(`${API_URL}/pets/${id}`);
                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message || 'Error fetching pet');
                }

                if (isMounted) {
                    setPet(data);
                }
            } catch (error) {
                if (isMounted) {
                    setErrorMessage(error.message);
                }
            }
        }

        fetchPet();

        return () => {
            isMounted = false;
        };
    }, [id]);

    return (
        <div className="min-h-screen bg-[var(--color-background)]">
            <Navbar />

            <main className="p-6 max-w-5xl mx-auto">
                {errorMessage ? (
                    <p className="text-red-600">{errorMessage}</p>
                ) : null}

                {pet ? (
                    <Card>
                        <img
                            src={pet.imageUrl || fallbackImage}
                            alt={pet.name}
                            className="w-full max-h-[420px] object-cover rounded-xl mb-6"
                        />

                        <h1 className="text-3xl font-semibold mb-2">
                            {pet.name}
                        </h1>

                        <p className="text-gray-600 mb-2">
                            {pet.species} · {pet.age} años
                        </p>

                        <p className="text-gray-700 mb-6">
                            {pet.description}
                        </p>

                        <p className="text-sm text-gray-500">
                            Publicado por: {pet.owner?.name}
                        </p>
                    </Card>
                ) : (
                    <p>Cargando...</p>
                )}
            </main>
        </div>
    );
}