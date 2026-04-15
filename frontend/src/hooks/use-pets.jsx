/**
 * =========================================================
 * ESTRUCTURA GENERAL DEL ARCHIVO
 * - Custom hook para gestionar mascotas
 * - Obtiene listado
 * - Crea, actualiza y elimina publicaciones
 * - Permite obtener mascotas filtradas por query params
 * =========================================================
 */

import { useEffect, useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL.replace(/\/$/, '');

/**
 * Custom hook para gestionar las mascotas.
 *
 * Hooks usados:
 * - useState: guarda mascotas, error y loading
 * - useEffect: carga el listado inicial al montar
 *
 * Retorna:
 * - pets
 * - errorMessage
 * - isLoading
 * - getPets
 * - createPet
 * - updatePet
 * - deletePet
 *
 * @returns {Object}
 */
export function usePets() {
    /* Estado con el listado completo de mascotas */
    const [pets, setPets] = useState([]);

    /* Estado para mostrar errores de API */
    const [errorMessage, setErrorMessage] = useState('');

    /* Estado para controlar carga de datos */
    const [isLoading, setIsLoading] = useState(false);

    /**
     * Obtiene mascotas desde la API con filtros opcionales.
     *
     * Filtros soportados:
     * - species
     * - status
     * - sex
     * - search
     *
     * @param {Object} filters
     * @returns {Promise<void>}
     */
    const getPets = async (filters = {}) => {
        try {
            setIsLoading(true);
            setErrorMessage('');

            /* Construcción dinámica de query params */
            const queryParams = new URLSearchParams();

            if (filters.species) {
                queryParams.append('species', filters.species);
            }

            if (filters.status) {
                queryParams.append('status', filters.status);
            }

            if (filters.sex) {
                queryParams.append('sex', filters.sex);
            }

            if (filters.search) {
                queryParams.append('search', filters.search);
            }

            const queryString = queryParams.toString();
            const requestUrl = queryString
                ? `${API_URL}/pets?${queryString}`
                : `${API_URL}/pets`;

            const response = await fetch(requestUrl);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Error fetching pets');
            }

            setPets(data);
        } catch (error) {
            setErrorMessage(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    /**
     * Crea una nueva mascota en la API.
     *
     * @param {Object} petData
     * @returns {Promise<Object>}
     */
    const createPet = async (petData) => {
        try {
            setErrorMessage('');

            const token = localStorage.getItem('token');

            const response = await fetch(`${API_URL}/pets`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(petData)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Error creating pet');
            }

            await getPets();
            return data;
        } catch (error) {
            setErrorMessage(error.message);
            throw error;
        }
    };

    /**
     * Actualiza una mascota existente.
     *
     * @param {string} petId
     * @param {Object} petData
     * @returns {Promise<Object>}
     */
    const updatePet = async (petId, petData) => {
        try {
            setErrorMessage('');

            const token = localStorage.getItem('token');

            const response = await fetch(`${API_URL}/pets/${petId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(petData)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Error updating pet');
            }

            await getPets();
            return data;
        } catch (error) {
            setErrorMessage(error.message);
            throw error;
        }
    };

    /**
     * Elimina una mascota por id.
     *
     * @param {string} petId
     * @returns {Promise<void>}
     */
    const deletePet = async (petId) => {
        try {
            setErrorMessage('');

            const token = localStorage.getItem('token');

            const response = await fetch(`${API_URL}/pets/${petId}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Error deleting pet');
            }

            await getPets();
        } catch (error) {
            setErrorMessage(error.message);
            throw error;
        }
    };

    /**
     * Carga inicial del listado de mascotas al montar el componente.
     */
    useEffect(() => {
        let isMounted = true;

        async function fetchInitialPets() {
            try {
                const response = await fetch(`${API_URL}/pets`);
                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message || 'Error fetching pets');
                }

                if (isMounted) {
                    setPets(data);
                }
            } catch (error) {
                if (isMounted) {
                    setErrorMessage(error.message);
                }
            }
        }

        fetchInitialPets();

        return () => {
            isMounted = false;
        };
    }, []);

    return {
        pets,
        errorMessage,
        isLoading,
        getPets,
        createPet,
        updatePet,
        deletePet
    };
}