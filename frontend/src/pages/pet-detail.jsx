/**
 * =========================================================
 * ESTRUCTURA GENERAL DEL ARCHIVO
 * - Página de detalle de mascota
 * - Muestra información general, salud y recordatorios
 * - Presentación más visual y ordenada
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
 * Página detalle de mascota.
 *
 * @returns {JSX.Element}
 */
export default function PetDetail() {
    const { id } = useParams();

    /* Estado de mascota cargada */
    const [pet, setPet] = useState(null);

    /* Estado de error */
    const [errorMessage, setErrorMessage] = useState('');

    /**
     * Obtiene la mascota por id.
     */
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

    /**
     * Devuelve un texto legible para valores booleanos.
     *
     * @param {boolean} value
     * @returns {string}
     */
    const getReadableBoolean = (value) => {
        return value ? 'Sí' : 'No';
    };

    /**
     * Traduce el sexo a texto legible.
     *
     * @param {string} value
     * @returns {string}
     */
    const getReadableSex = (value) => {
        if (value === 'female') return 'Hembra';
        return 'Macho';
    };

    if (errorMessage) {
        return (
            <div className="min-h-screen bg-[var(--color-background)]">
                <Navbar />
                <main className="p-6 max-w-5xl mx-auto">
                    <p className="text-red-600">{errorMessage}</p>
                </main>
            </div>
        );
    }

    if (!pet) {
        return (
            <div className="min-h-screen bg-[var(--color-background)]">
                <Navbar />
                <main className="p-6 max-w-5xl mx-auto">
                    <p>Cargando...</p>
                </main>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[var(--color-background)]">
            <Navbar />

            <main className="max-w-5xl mx-auto p-6">
                {/* Portada */}
                <section className="mb-6">
                    <img
                        src={pet.imageUrl || fallbackImage}
                        alt={pet.name}
                        className="w-full h-[320px] md:h-[420px] object-cover rounded-3xl"
                    />
                </section>

                {/* Resumen principal */}
                <section className="bg-[#DFF3F2] rounded-3xl p-6 mb-6 text-center">
                    <h1 className="text-3xl font-semibold text-[var(--color-primary)] mb-4">
                        {pet.name}
                    </h1>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm md:text-base">
                        <div>
                            <p className="font-semibold">Sexo</p>
                            <p>{getReadableSex(pet.sex)}</p>
                        </div>

                        <div>
                            <p className="font-semibold">Edad</p>
                            <p>{pet.age} años</p>
                        </div>

                        <div>
                            <p className="font-semibold">Peso</p>
                            <p>{pet.weight ? `${pet.weight} kg` : 'No indicado'}</p>
                        </div>

                        <div>
                            <p className="font-semibold">Especie</p>
                            <p>{pet.species}</p>
                        </div>
                    </div>
                </section>

                {/* Descripción */}
                <Card>
                    <h2 className="text-xl font-semibold mb-3">Sobre {pet.name}</h2>
                    <p className="text-[var(--color-text)] mb-3">
                        {pet.description}
                    </p>
                    <p className="text-sm text-[var(--color-text-light)]">
                        Publicado por: {pet.owner?.name}
                    </p>
                </Card>

                {/* Salud y bienestar */}
                <Card>
                    <h2 className="text-xl font-semibold mb-4">Salud y bienestar</h2>

                    <div className="flex flex-wrap gap-3">
                        <span className="px-4 py-2 rounded-full bg-[#DFF3F2] text-[var(--color-primary)]">
                            {pet.hasMicrochip ? 'Con microchip' : 'Sin microchip'}
                        </span>

                        <span className="px-4 py-2 rounded-full bg-[#DFF3F2] text-[var(--color-primary)]">
                            {pet.hasMedicalTreatment ? 'Con tratamiento' : 'Sin tratamiento'}
                        </span>

                        <span className="px-4 py-2 rounded-full bg-[#DFF3F2] text-[var(--color-primary)]">
                            {pet.vaccinesUpToDate ? 'Vacunas al día' : 'Vacunas pendientes'}
                        </span>

                        <span className="px-4 py-2 rounded-full bg-[#DFF3F2] text-[var(--color-primary)]">
                            {pet.isSterilized ? 'Esterilizado' : 'Sin esterilizar'}
                        </span>
                    </div>
                </Card>

                {/* Información adicional */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                        <h2 className="text-xl font-semibold mb-3">Cuidados especiales</h2>
                        <p>
                            {pet.specialCare || 'No se han indicado cuidados especiales.'}
                        </p>
                    </Card>

                    <Card>
                        <h2 className="text-xl font-semibold mb-3">Historial médico</h2>
                        <p>
                            {pet.medicalHistory || 'No se ha agregado historial médico.'}
                        </p>
                    </Card>

                    <Card>
                        <h2 className="text-xl font-semibold mb-3">Resumen clínico</h2>
                        <ul className="space-y-2 text-sm">
                            <li>Microchip: {getReadableBoolean(pet.hasMicrochip)}</li>
                            <li>Esterilizado: {getReadableBoolean(pet.isSterilized)}</li>
                            <li>Tratamiento médico: {getReadableBoolean(pet.hasMedicalTreatment)}</li>
                            <li>Vacunas al día: {getReadableBoolean(pet.vaccinesUpToDate)}</li>
                        </ul>
                    </Card>
                </div>
            </main>
        </div>
    );
}