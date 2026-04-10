/**
 * =========================================================
 * ESTRUCTURA GENERAL DEL ARCHIVO
 * - Tarjeta de mascota
 * - Permite ver detalle, editar, eliminar y solicitar cuidado
 * =========================================================
 */

import { Link } from 'react-router-dom';
import Card from './ui/card';
import Button from './ui/button';

const fallbackImage =
    'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=800&q=80';

/**
 * Tarjeta de mascota.
 *
 * @param {Object} props
 * @returns {JSX.Element}
 */
export default function PetCard({
    pet,
    canManage,
    isCaretaker,
    onEdit,
    onDelete,
    onRequestCare
}) {
    return (
        <Card>
            <img
                src={pet.imageUrl || fallbackImage}
                alt={pet.name}
                className="w-full h-48 object-cover rounded-xl mb-4"
            />

            <h3 className="text-lg font-semibold">{pet.name}</h3>
            <p className="text-sm text-gray-600">{pet.species}</p>

            <p className="text-sm text-gray-700 mt-2 mb-4">
                {pet.shortDescription}
            </p>

            <div className="flex flex-col gap-2">
                <Link
                    to={`/pets/${pet._id}`}
                    className="text-[var(--color-primary)] font-medium"
                >
                    Ver detalle
                </Link>

                {isCaretaker ? (
                    <Button onClick={() => onRequestCare(pet._id)}>
                        Cuidar
                    </Button>
                ) : null}

                {canManage ? (
                    <div className="flex flex-col md:flex-row gap-2">
                        <Button onClick={() => onEdit(pet)}>Editar</Button>
                        <Button onClick={() => onDelete(pet._id)}>Eliminar</Button>
                    </div>
                ) : null}
            </div>
        </Card>
    );
}