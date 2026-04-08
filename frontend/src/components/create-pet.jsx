/**
 * =========================================================
 * ESTRUCTURA GENERAL DEL ARCHIVO
 * - Formulario para crear y editar mascotas
 * - Permite subir imagen local
 * - Notifica al Home cuando se guarda correctamente
 * =========================================================
 */

import { useEffect, useState } from 'react';
import { usePets } from '../hooks/use-pets';
import Input from './ui/input';
import Button from './ui/button';

/* Estado inicial del formulario */
const initialFormState = {
    name: '',
    species: '',
    age: '',
    shortDescription: '',
    description: '',
    imageUrl: ''
};

/**
 * Formulario de mascota.
 *
 * @param {Object} props
 * @param {Object|null} props.editingPet
 * @param {Function} props.onCancelEdit
 * @param {Function} props.onPetSaved
 * @returns {JSX.Element}
 */
export default function CreatePet({
    editingPet,
    onCancelEdit,
    onPetSaved
}) {
    const { createPet, updatePet } = usePets();

    /* Estado del formulario */
    const [form, setForm] = useState(initialFormState);

    /* Estado de error */
    const [errorMessage, setErrorMessage] = useState('');

    /* Estado de carga */
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (editingPet) {
            setForm({
                name: editingPet.name || '',
                species: editingPet.species || '',
                age: editingPet.age || '',
                shortDescription: editingPet.shortDescription || '',
                description: editingPet.description || '',
                imageUrl: editingPet.imageUrl || ''
            });
            return;
        }

        setForm(initialFormState);
    }, [editingPet]);

    const isFormValid =
        form.name.trim() !== '' &&
        form.species.trim() !== '' &&
        String(form.age).trim() !== '' &&
        form.shortDescription.trim() !== '' &&
        form.description.trim() !== '';

    /**
     * Actualiza un campo del formulario.
     *
     * @param {Object} event
     */
    const handleChange = ({ target: { name, value } }) => {
        setForm((prevForm) => ({
            ...prevForm,
            [name]: value
        }));
    };

    /**
     * Convierte imagen local a base64.
     *
     * @param {Object} event
     */
    const handleImageChange = (event) => {
        const selectedFile = event.target.files[0];

        if (!selectedFile) return;

        const maxSizeInBytes = 2 * 1024 * 1024;

        if (selectedFile.size > maxSizeInBytes) {
            setErrorMessage('La imagen es demasiado grande. Usa una imagen menor a 2MB.');
            return;
        }

        setErrorMessage('');

        const reader = new FileReader();

        reader.onloadend = () => {
            setForm((prevForm) => ({
                ...prevForm,
                imageUrl: reader.result
            }));
        };

        reader.readAsDataURL(selectedFile);
    };

    /**
     * Envía el formulario al backend.
     *
     * @param {Object} event
     */
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!isFormValid) return;

        try {
            setIsLoading(true);
            setErrorMessage('');

            const payload = {
                ...form,
                age: Number(form.age)
            };

            let savedPet = null;

            if (editingPet) {
                const response = await updatePet(editingPet._id, payload);
                savedPet = response?.pet || response;
            } else {
                savedPet = await createPet(payload);
            }

            setForm(initialFormState);

            if (onPetSaved) {
                onPetSaved(savedPet);
            }
        } catch (error) {
            setErrorMessage(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        /* Inicio: formulario de mascota */
        <form onSubmit={handleSubmit} className="w-full">
            <h2 className="text-xl font-semibold text-[var(--color-primary)] mb-4">
                {editingPet ? 'Editar mascota' : 'Agregar mascota'}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Input
                    name="name"
                    placeholder="Nombre"
                    value={form.name}
                    onChange={handleChange}
                />

                <Input
                    name="species"
                    placeholder="Especie"
                    value={form.species}
                    onChange={handleChange}
                />

                <Input
                    name="age"
                    type="number"
                    placeholder="Edad"
                    value={form.age}
                    onChange={handleChange}
                />

                <Input
                    name="shortDescription"
                    placeholder="Descripción breve"
                    value={form.shortDescription}
                    onChange={handleChange}
                />
            </div>

            <Input
                name="description"
                placeholder="Descripción completa"
                value={form.description}
                onChange={handleChange}
            />

            {/* Selector de imagen */}
            <div className="mb-3">
                <label className="block text-sm text-[var(--color-text-light)] mb-2">
                    Imagen de la mascota
                </label>

                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full border border-[#7A7A7A] rounded-lg bg-white p-3"
                />
            </div>

            {/* Vista previa */}
            {form.imageUrl ? (
                <div className="mb-4">
                    <img
                        src={form.imageUrl}
                        alt="Vista previa"
                        className="w-full h-40 object-cover rounded-xl"
                    />
                </div>
            ) : null}

            {errorMessage ? (
                <p className="text-sm text-red-600 mb-3">{errorMessage}</p>
            ) : null}

            <div className="flex flex-col md:flex-row gap-3">
                <Button type="submit" disabled={!isFormValid || isLoading}>
                    {isLoading ? 'Guardando...' : editingPet ? 'Actualizar' : 'Publicar'}
                </Button>

                <Button type="button" onClick={onCancelEdit}>
                    Cancelar
                </Button>
            </div>
        </form>
        /* Fin: formulario de mascota */
    );
}