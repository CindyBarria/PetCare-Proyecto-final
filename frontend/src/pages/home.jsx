/**
 * =========================================================
 * ESTRUCTURA GENERAL DEL ARCHIVO
 * - Página principal después del login
 * - Contiene navbar, bienvenida, botón para agregar mascota
 * - Usa un modal para crear o editar publicaciones
 * =========================================================
 */

import { useState } from 'react';
import { useAuth } from '../hooks/use-auth';
import { usePets } from '../hooks/use-pets';
import Navbar from '../components/ui/navbar';
import CreatePet from '../components/create-pet';
import PetCard from '../components/pet-card';
import Button from '../components/ui/button';
import Modal from '../components/ui/modal';

/**
 * Página Home.
 *
 * @returns {JSX.Element}
 */
export default function Home() {
    const { user } = useAuth();
    const { pets, errorMessage, deletePet, getPets } = usePets();

    /* Estado para controlar el modal */
    const [isModalOpen, setIsModalOpen] = useState(false);

    /* Estado para saber si estamos editando una mascota */
    const [editingPet, setEditingPet] = useState(null);

    if (!user) {
        return <p className="p-6">No autenticado</p>;
    }

    const isOwner = user.role === 'owner';
    const isCaretaker = user.role === 'caretaker';

    /**
     * Abre el modal para crear mascota.
     */
    const handleOpenCreateModal = () => {
        setEditingPet(null);
        setIsModalOpen(true);
    };

    /**
     * Abre el modal con una mascota en modo edición.
     *
     * @param {Object} pet
     */
    const handleEdit = (pet) => {
        setEditingPet(pet);
        setIsModalOpen(true);
    };

    /**
     * Cierra el modal y limpia edición.
     */
    const handleCloseModal = () => {
        setEditingPet(null);
        setIsModalOpen(false);
    };

    /**
     * Elimina una publicación.
     *
     * @param {string} petId
     */
    const handleDelete = async (petId) => {
        try {
            await deletePet(petId);
        } catch (error) {
            console.error(error.message);
        }
    };

    /**
     * Refresca el listado y cierra el modal
     * cuando una mascota se guarda correctamente.
     */
    const handlePetSaved = async () => {
        await getPets();
        setEditingPet(null);
        setIsModalOpen(false);
    };

    return (
        <div className="min-h-screen bg-[var(--color-background)]">
            {/* Inicio: navbar */}
            <Navbar />
            {/* Fin: navbar */}

            {/* Inicio: contenido principal */}
            <main className="p-6 max-w-7xl mx-auto">
                {/* Encabezado de bienvenida */}
                <section className="mb-8 bg-white border border-[var(--color-border)] rounded-2xl p-6">
                    <h1 className="text-2xl md:text-3xl font-semibold text-[var(--color-primary)] mb-3">
                        Bienvenidos a PetCare
                    </h1>

                    <p className="text-[var(--color-text-light)] mb-4">
                        ¿Quieres publicar a tu mascota y encontrar un cuidador ideal?
                    </p>

                    {(isOwner || user.isAdmin) ? (
                        <div className="max-w-xs">
                            <Button onClick={handleOpenCreateModal}>
                                Agregar mascota
                            </Button>
                        </div>
                    ) : null}
                </section>

                {errorMessage ? (
                    <p className="text-sm text-red-600 mb-4">{errorMessage}</p>
                ) : null}

                {/* Listado de publicaciones */}
                <section>
                    <h2 className="text-xl font-semibold text-[var(--color-primary)] mb-4">
                        Publicaciones de mascotas
                    </h2>

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
                                    onEdit={handleEdit}
                                    onDelete={handleDelete}
                                />
                            );
                        })}
                    </div>
                </section>
            </main>
            {/* Fin: contenido principal */}

            {/* Inicio: modal de creación / edición */}
            <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                <CreatePet
                    editingPet={editingPet}
                    onCancelEdit={handleCloseModal}
                    onPetSaved={handlePetSaved}
                />
            </Modal>
            {/* Fin: modal de creación / edición */}
        </div>
    );
}