/**
 * =========================================================
 * ESTRUCTURA GENERAL DEL ARCHIVO
 * - Home principal
 * - Muestra mascotas
 * - Permite crear solicitudes de cuidado
 * - Muestra solicitudes al dueño
 * =========================================================
 */

import { useEffect, useState } from 'react';
import { useAuth } from '../hooks/use-auth';
import { usePets } from '../hooks/use-pets';
import Navbar from '../components/ui/navbar';
import CreatePet from '../components/create-pet';
import PetCard from '../components/pet-card';
import Button from '../components/ui/button';
import Modal from '../components/ui/modal';
import SuccessModal from '../components/ui/success-modal';
import checkSuccessIcon from '../assets/check-success.svg';

const API_URL = import.meta.env.VITE_API_URL;

export default function Home() {
    const { user } = useAuth();
    const { pets, errorMessage, deletePet, getPets } = usePets();

    /* Estado para controlar el modal */
    const [isModalOpen, setIsModalOpen] = useState(false);

    /* Estado para saber si estamos editando una mascota */
    const [editingPet, setEditingPet] = useState(null);
    const [requestMessage, setRequestMessage] = useState('');
    const [ownerRequests, setOwnerRequests] = useState([]);
    const isOwner = user.role === 'owner';
    const isCaretaker = user.role === 'caretaker';
    const isAdmin = user.isAdmin;

    const [successModal, setSuccessModal] = useState({
        isOpen: false,
        title: '',
        message: ''
    });

    useEffect(() => {
        if (isOwner || isAdmin) {
            getRequests();
        }
    }, [user]);


    if (!user) {
        return <p className="p-6">No autenticado</p>;
    }

    /**
     * Obtiene las solicitudes del dueño autenticado.
     */
    const getRequests = async () => {
        try {
            const token = localStorage.getItem('token');

            const response = await fetch(`${API_URL}/requests/owner`, {
                headers: {
                    Authorization: token
                }
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Error fetching requests');
            }

            setOwnerRequests(data);
        } catch (error) {
            console.error(error.message);
        }
    };



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

        if (isOwner || isAdmin) {
            await getRequests();
        }

        setEditingPet(null);
        setIsModalOpen(false);

        setSuccessModal({
            isOpen: true,
            title: 'Publicación creada con éxito',
            message: 'Tu mascota ya fue publicada correctamente en PetCare.'
        });
    };


    /**
     * Crea una solicitud de cuidado para una mascota.
     *
     * @param {string} petId
     */
    const handleRequestCare = async (petId) => {
        try {
            setRequestMessage('');

            const token = localStorage.getItem('token');

            const response = await fetch(`${API_URL}/requests`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: token
                },
                body: JSON.stringify({ petId })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Error creating request');
            }

            setSuccessModal({
                isOpen: true,
                title: 'Solicitud enviada con éxito',
                message: 'El dueño se pondrá en contacto contigo mediante correo electrónico para coordinar.'
            });
        } catch (error) {
            setRequestMessage(error.message);
        }
    };

    /**
     * Acepta o rechaza una solicitud.
     *
     * @param {string} requestId
     * @param {string} status
     */
    const handleUpdateRequest = async (requestId, status) => {
        try {
            const token = localStorage.getItem('token');

            const response = await fetch(`${API_URL}/requests/${requestId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: token
                },
                body: JSON.stringify({ status })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Error updating request');
            }

            await getRequests();
        } catch (error) {
            console.error(error.message);
        }
    };

    const handleCloseSuccessModal = () => {
        setSuccessModal({
            isOpen: false,
            title: '',
            message: ''
        });
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


                {requestMessage ? (
                    <p className="text-sm text-[var(--color-primary)] mb-4">
                        {requestMessage}
                    </p>
                ) : null}

                {(isOwner || user.isAdmin) && ownerRequests.length > 0 ? (
                    <section className="mb-8 bg-white border border-[var(--color-border)] rounded-2xl p-6">
                        <h2 className="text-xl font-semibold text-[var(--color-primary)] mb-4">
                            Solicitudes de cuidado
                        </h2>

                        <div className="flex flex-col gap-4">
                            {ownerRequests.map((request) => (
                                <div
                                    key={request._id}
                                    className="border border-[var(--color-border)] rounded-xl p-4"
                                >
                                    <p className="font-medium">
                                        Mascota: {request.pet?.name}
                                    </p>

                                    <p className="text-sm text-gray-600">
                                        Cuidador: {request.caretaker?.name}
                                    </p>

                                    <p className="text-sm text-gray-600 mb-3">
                                        Estado: {request.status}
                                    </p>

                                    {request.status === 'pending' ? (
                                        <div className="flex gap-3">
                                            <Button
                                                onClick={() =>
                                                    handleUpdateRequest(request._id, 'accepted')
                                                }
                                            >
                                                Aceptar
                                            </Button>

                                            <Button
                                                onClick={() =>
                                                    handleUpdateRequest(request._id, 'rejected')
                                                }
                                            >
                                                Rechazar
                                            </Button>
                                        </div>
                                    ) : null}
                                </div>
                            ))}
                        </div>
                    </section>
                ) : null}

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
                                    onRequestCare={handleRequestCare}
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
            {/* Inicio: modal de éxito */}
            <SuccessModal
                isOpen={successModal.isOpen}
                onClose={handleCloseSuccessModal}
                title={successModal.title}
                message={successModal.message}
                buttonText="Volver a inicio"
                iconSrc={checkSuccessIcon}
            />
            {/* Fin: modal de exito*/}
        </div>
    );
}