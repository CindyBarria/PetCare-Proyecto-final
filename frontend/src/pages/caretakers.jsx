import { useEffect, useState } from 'react';
import Navbar from '../components/ui/navbar';
import Card from '../components/ui/card';

const API_URL = import.meta.env.VITE_API_URL;

export default function Caretakers() {
    const [caretakers, setCaretakers] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        let isMounted = true;

        async function fetchCaretakers() {
            try {
                const res = await fetch(`${API_URL}/users`);
                const data = await res.json();

                if (!res.ok) {
                    throw new Error(data.message || 'Error fetching users');
                }

                const filteredCaretakers = data.filter((user) => user.role === 'caretaker');

                if (isMounted) {
                    setCaretakers(filteredCaretakers);
                }
            } catch (error) {
                if (isMounted) {
                    setErrorMessage(error.message);
                }
            }
        }

        fetchCaretakers();

        return () => {
            isMounted = false;
        };
    }, []);

    return (
        <div className="min-h-screen bg-[#F8F8F8]">
            <Navbar />

            <main className="p-6">
                <h1 className="text-2xl font-semibold text-[#2B7A78] mb-6">
                    Cuidadores
                </h1>

                {errorMessage ? (
                    <p className="text-red-600 mb-4">{errorMessage}</p>
                ) : null}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {caretakers.map((caretaker) => (
                        <Card key={caretaker._id}>
                            <div className="w-20 h-20 rounded-full bg-[#E5E5E5] flex items-center justify-center text-2xl font-semibold text-[#2B7A78] mb-4">
                                {caretaker.name.charAt(0)}
                            </div>

                            <h2 className="text-lg font-semibold">{caretaker.name}</h2>
                            <p className="text-gray-600">{caretaker.email}</p>
                            <p className="text-sm text-gray-500 mt-2">
                                Cuidador disponible en la plataforma
                            </p>
                        </Card>
                    ))}
                </div>
            </main>
        </div>
    );
}