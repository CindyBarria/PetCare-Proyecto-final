import { useState } from 'react';
import { useAuth } from '../hooks/use-auth';
import { usePets } from '../hooks/use-pets';
import Navbar from '../components/ui/navbar';
import CreatePet from '../components/create-pet';
import PetCard from '../components/pet-card';

export default function Home() {
    const { user } = useAuth();
    const { pets, errorMessage, deletePet } = usePets();
    const [editingPet, setEditingPet] = useState(null);

    if (!user) {
        return <p className="p-6">No autenticado</p>;
    }

    const isOwner = user.role === 'owner';
    const isCaretaker = user.role === 'caretaker';

    const handleDelete = async (petId) => {
        try {
            await deletePet(petId);
        } catch (error) {
            console.error(error.message);
        }
    };

    return (
        <div className="min-h-screen bg-[#F8F8F8]">
            <Navbar />

            <main className="p-6">
                <h1 className="text-2xl font-semibold text-[#2B7A78] mb-6">
                    Tablero de publicaciones
                </h1>

                {isOwner || user.isAdmin ? (
                    <div className="mb-8">
                        <CreatePet
                            editingPet={editingPet}
                            onCancelEdit={() => setEditingPet(null)}
                        />
                    </div>
                ) : null}

                {errorMessage ? (
                    <p className="text-sm text-red-600 mb-4">{errorMessage}</p>
                ) : null}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {pets.map((pet) => {
                        const canManage =
                            user.isAdmin || pet.owner?._id === user._id;

                        return (
                            <PetCard
                                key={pet._id}
                                pet={pet}
                                canManage={canManage}
                                isCaretaker={isCaretaker}
                                onEdit={setEditingPet}
                                onDelete={handleDelete}
                            />
                        );
                    })}
                </div>
            </main>
        </div>
    );
}