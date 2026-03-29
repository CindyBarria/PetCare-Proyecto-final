import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/auth-context';

const API_URL = import.meta.env.VITE_API_URL;

export default function Home() {
    const { user } = useContext(AuthContext);
    const [pets, setPets] = useState([]);

    useEffect(() => {
        fetch(`${API_URL}/pets`)
            .then((res) => res.json())
            .then((data) => setPets(data))
            .catch((error) => console.error('GET PETS ERROR:', error));
    }, []);

    if (!user) {
        return <p className="p-4">No autenticado</p>;
    }

    return (
        <div className="p-4">
            <h1 className="text-2xl mb-4">Hola {user.name}</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {pets.map((pet) => (
                    <div key={pet._id} className="border rounded-lg p-4 bg-white">
                        <h2 className="text-lg font-semibold">{pet.name}</h2>
                        <p>{pet.species}</p>
                        <p>{pet.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}