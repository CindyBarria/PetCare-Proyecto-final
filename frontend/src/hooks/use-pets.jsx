import { useEffect, useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL;

export function usePets() {
    const [pets, setPets] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const getPets = async () => {
        try {
            setIsLoading(true);
            setErrorMessage('');

            const res = await fetch(`${API_URL}/pets`);
            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || 'Error fetching pets');
            }

            setPets(data);
        } catch (error) {
            setErrorMessage(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const createPet = async (petData) => {
        try {
            setErrorMessage('');

            const token = localStorage.getItem('token');

            const res = await fetch(`${API_URL}/pets`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: token
                },
                body: JSON.stringify(petData)
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || 'Error creating pet');
            }

            await getPets();
            return data;
        } catch (error) {
            setErrorMessage(error.message);
            throw error;
        }
    };

    const updatePet = async (petId, petData) => {
        try {
            setErrorMessage('');

            const token = localStorage.getItem('token');

            const res = await fetch(`${API_URL}/pets/${petId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: token
                },
                body: JSON.stringify(petData)
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || 'Error updating pet');
            }

            await getPets();
            return data;
        } catch (error) {
            setErrorMessage(error.message);
            throw error;
        }
    };

    const deletePet = async (petId) => {
        try {
            setErrorMessage('');

            const token = localStorage.getItem('token');

            const res = await fetch(`${API_URL}/pets/${petId}`, {
                method: 'DELETE',
                headers: {
                    Authorization: token
                }
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || 'Error deleting pet');
            }

            await getPets();
        } catch (error) {
            setErrorMessage(error.message);
            throw error;
        }
    };

    useEffect(() => {
        let isMounted = true;

        async function fetchPets() {
            try {
                const res = await fetch(`${API_URL}/pets`);
                const data = await res.json();

                if (!res.ok) {
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

        fetchPets();

        return () => {
            isMounted = false;
        };
    }, []);

    return {
        pets,
        errorMessage,
        isLoading,
        createPet,
        updatePet,
        deletePet,
        getPets
    };
}