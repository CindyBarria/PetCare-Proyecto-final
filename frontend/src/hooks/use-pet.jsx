import { useState, useEffect } from 'react';

const API_URL = import.meta.env.VITE_API_URL;

export function usePets() {
    const [pets, setPets] = useState([]);

    const getAllPets = async () => {
        const res = await fetch(`${API_URL}/pets`);
        const data = await res.json();
        setPets(data);
    };

    const createPet = async (pet, token) => {
        await fetch(`${API_URL}/pets`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: token
            },
            body: JSON.stringify(pet)
        });

        getAllPets();
    };

    useEffect(() => {
        getAllPets();
    }, []);

    return { pets, createPet };
}