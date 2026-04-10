/**
 * =========================================================
 * ESTRUCTURA GENERAL DEL ARCHIVO
 * - Tarjeta de mascota para el listado principal
 * - Muestra imagen, nombre, especie, descripción breve y acciones
 * - Usa imagen fallback si no existe imagen subida
 * =========================================================
 */

import { Link } from 'react-router-dom';
import Card from './ui/card';
import Button from './ui/button';

/* Importación de imagen desde assets */
import fallbackImage from '../assets/pet-default.svg';

/**
 * Tarjeta de mascota.
 *
 * Props:
 * - pet: objeto con datos de la mascota
 * - canManage: permite mostrar botones editar/eliminar
 * - isCaretaker: indica si es cuidador
 * - onEdit: función para editar
 * - onDelete: función para eliminar
 * - onRequestCare: función para solicitar cuidado
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
    /**
     * Obtiene la imagen correcta.
     * Si no existe imagen en la mascota, usa fallback.
     *
     * @param {string} image
     * @returns {string}
     */
    const getImage = (image) => {
        return image || fallbackImage;
    };

    return (
        /* Inicio: Card de mascota */
        <Card>
            {/* Imagen principal */}
            <div className="mb-4 overflow-hidden rounded-2xl">
                <img
                    src={getImage(pet.imageUrl)}
                    alt={pet.name}
                    className="w-full h-52 object-cover"
                />
            </div>

            {/* Información */}
            <div className="mb-4">
                <div className="flex items-start justify-between mb-2">
                    <div>
                        <h3 className="text-lg font-semibold text-[var(--color-text)]">
                            {pet.name}
                        </h3>

                        <p className="text-sm text-[var(--color-text-light)]">
                            {pet.species}
                        </p>
                    </div>

                    {/* Estado */}
                    {pet.status ? (
                        <span className="text-xs px-3 py-1 rounded-full bg-[#DFF3F2] text-[var(--color-primary)]">
                            {pet.status === 'available'
                                ? 'Disponible'
                                : 'No disponible'}
                        </span>
                    ) : null}
                </div>

                {/* Descripción breve */}
                <p className="text-sm text-[var(--color-text)] line-clamp-3">
                    {pet.shortDescription}
                </p>
            </div>

            {/* BOTÓN PRINCIPAL */}
            <div className="mb-3">
                <Link to={`/pets/${pet._id}`} className="block">
                    <Button>
                        Ver detalle
                    </Button>
                </Link>
            </div>

            {/* BOTÓN CUIDADOR */}
            {isCaretaker ? (
                <div className="mb-3">
                    <button
                        type="button"
                        onClick={() => onRequestCare(pet._id)}
                        className="w-full h-10 rounded-full border border-[var(--color-primary)] text-[var(--color-primary)] text-sm font-medium hover:bg-[#DFF3F2] transition-colors"
                    >
                        Cuidar mascota
                    </button>
                </div>
            ) : null}

            {/* BOTONES SECUNDARIOS */}
            {canManage ? (
                <div className="flex gap-2">
                    <button
                        type="button"
                        onClick={() => onEdit(pet)}
                        className="h-9 px-3 rounded-full border border-[var(--color-border)] text-xs text-[var(--color-text-light)] hover:bg-gray-50 transition-colors"
                    >
                        Editar
                    </button>

                    <button
                        type="button"
                        onClick={() => onDelete(pet._id)}
                        className="h-9 px-3 rounded-full border border-[#E8C5C5] text-xs text-[#A55A5A] hover:bg-[#FFF5F5] transition-colors"
                    >
                        Eliminar
                    </button>
                </div>
            ) : null}
        </Card>
        /* Fin: Card de mascota */
    );
}