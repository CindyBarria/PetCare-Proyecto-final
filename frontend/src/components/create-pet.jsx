/**
 * =========================================================
 * ESTRUCTURA GENERAL DEL ARCHIVO
 * - Formulario completo para crear y editar mascotas
 * - Incluye datos generales, salud y observaciones
 * - Se usa dentro de un modal
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
    sex: 'male',
    age: '',
    weight: '',
    shortDescription: '',
    description: '',
    imageUrl: '',
    hasMicrochip: false,
    isSterilized: false,
    hasMedicalTreatment: false,
    vaccinesUpToDate: false,
    specialCare: '',
    medicalHistory: '',
};

/**
 * Formulario completo de mascota.
 *
 * @param {Object} props
 * @param {Object|null} props.editingPet - Mascota a editar
 * @param {Function} props.onCancelEdit - Cierra el modal
 * @param {Function} props.onPetSaved - Callback al guardar
 * @returns {JSX.Element}
 */
export default function CreatePet({
    editingPet,
    onCancelEdit,
    onPetSaved
}) {
    const { createPet, updatePet } = usePets();

    /* Estado principal del formulario */
    const [form, setForm] = useState(initialFormState);

    /* Error del formulario */
    const [errorMessage, setErrorMessage] = useState('');

    /* Estado de carga */
    const [isLoading, setIsLoading] = useState(false);

    /**
     * Si existe una mascota en edición, rellena el formulario.
     * Si no, vuelve al estado inicial.
     */
    useEffect(() => {
        if (editingPet) {
            setForm({
                name: editingPet.name || '',
                species: editingPet.species || '',
                sex: editingPet.sex || 'male',
                age: editingPet.age || '',
                weight: editingPet.weight || '',
                shortDescription: editingPet.shortDescription || '',
                description: editingPet.description || '',
                imageUrl: editingPet.imageUrl || '',
                hasMicrochip: editingPet.hasMicrochip || false,
                isSterilized: editingPet.isSterilized || false,
                hasMedicalTreatment: editingPet.hasMedicalTreatment || false,
                vaccinesUpToDate: editingPet.vaccinesUpToDate || false,
                specialCare: editingPet.specialCare || '',
                medicalHistory: editingPet.medicalHistory || '',
            });
            return;
        }

        setForm(initialFormState);
    }, [editingPet]);

    /* Validación mínima para activar guardar */
    const isFormValid =
        form.name.trim() !== '' &&
        form.species.trim() !== '' &&
        String(form.age).trim() !== '';

    /**
     * Actualiza campos de texto y select.
     *
     * @param {Object} event
     * @returns {void}
     */
    const handleChange = ({ target: { name, value } }) => {
        setForm((prevForm) => ({
            ...prevForm,
            [name]: value
        }));
    };

    /**
     * Actualiza campos booleanos.
     *
     * @param {Object} event
     * @returns {void}
     */
    const handleCheckboxChange = ({ target: { name, checked } }) => {
        setForm((prevForm) => ({
            ...prevForm,
            [name]: checked
        }));
    };
    /**
     * Reduce y convierte imagen local a base64.
     *
     * @param {Object} event
     * @returns {Promise<void>}
     */
    const handleImageChange = async (event) => {
        const selectedFile = event.target.files[0];

        if (!selectedFile) return;

        const maxSizeInBytes = 8 * 1024 * 1024;

        if (selectedFile.size > maxSizeInBytes) {
            setErrorMessage(
                'La imagen original es demasiado grande. Usa una foto menor a 8MB.'
            );
            return;
        }

        try {
            setErrorMessage('');
            const compressedImage = await resizeImage(selectedFile);

            setForm((prevForm) => ({
                ...prevForm,
                imageUrl: compressedImage
            }));
        // eslint-disable-next-line no-unused-vars
        } catch (error) {
            setErrorMessage('No se pudo procesar la imagen.');
        }
    };
    /**
 * Reduce una imagen usando canvas para disminuir su peso.
 *
 * @param {File} file
 * @returns {Promise<string>}
 */
    function resizeImage(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = (event) => {
                const image = new Image();

                image.onload = () => {
                    const canvas = document.createElement('canvas');
                    const maxWidth = 900;
                    const scale = maxWidth / image.width;

                    canvas.width = image.width > maxWidth ? maxWidth : image.width;
                    canvas.height =
                        image.width > maxWidth
                            ? image.height * scale
                            : image.height;

                    const context = canvas.getContext('2d');
                    context.drawImage(image, 0, 0, canvas.width, canvas.height);

                    const compressedBase64 = canvas.toDataURL('image/jpeg', 0.7);
                    resolve(compressedBase64);
                };

                image.onerror = () => reject(new Error('Error processing image'));
                image.src = event.target.result;
            };

            reader.onerror = () => reject(new Error('Error reading image'));
            reader.readAsDataURL(file);
        });
    }
    /**
     * Envía el formulario al backend.
     *
     * @param {Object} event
     * @returns {Promise<void>}
     */
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!isFormValid) return;

        try {
            setIsLoading(true);
            setErrorMessage('');

            const payload = {
                ...form,
                age: Number(form.age),
                weight: Number(form.weight) || 0
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
        <form onSubmit={handleSubmit} className="w-full max-w-3xl max-h-[80vh] overflow-y-auto pr-1">
            {/* Encabezado */}
            <h2 className="text-2xl font-semibold text-[var(--color-primary)] mb-2">
                {editingPet ? 'Editar mascota' : 'Agrega los datos de tu mascota'}
            </h2>

            <p className="text-sm text-[var(--color-text-light)] mb-6">
                Completa la información general, salud y cuidados especiales.
            </p>

            {/* Imagen */}
            <section className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Foto de la mascota</h3>

                <div className="mb-3">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="w-full border border-[#7A7A7A] rounded-lg bg-white p-3"
                    />
                </div>

                {form.imageUrl ? (
                    <img
                        src={form.imageUrl}
                        alt="Vista previa de la mascota"
                        className="w-full h-56 object-cover rounded-2xl border border-[var(--color-border)]"
                    />
                ) : null}
            </section>

            {/* Información general */}
            <section className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Información general</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <Input
                        name="name"
                        placeholder="Nombre"
                        value={form.name}
                        onChange={handleChange}
                    />

                    <select
                        name="species"
                        value={form.species}
                        onChange={handleChange}
                        className="w-full h-12 px-4 border border-[#7A7A7A] rounded-lg bg-white text-[#1A1A1A] focus:outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] mb-3"
                    >
                        <option value="">Selecciona especie</option>
                        <option value="Perro">Perro</option>
                        <option value="Gato">Gato</option>
                        <option value="Conejo">Conejo</option>
                        <option value="Ave">Ave</option>
                        <option value="Otro">Otro</option>
                    </select>

                    <select
                        name="sex"
                        value={form.sex}
                        onChange={handleChange}
                        className="w-full h-12 px-4 border border-[#7A7A7A] rounded-lg bg-white text-[#1A1A1A] focus:outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] mb-3"
                    >
                        <option value="male">Macho</option>
                        <option value="female">Hembra</option>
                    </select>

                    <Input
                        name="age"
                        type="number"
                        placeholder="Edad"
                        value={form.age}
                        onChange={handleChange}
                    />

                    <Input
                        name="weight"
                        type="number"
                        placeholder="Peso aproximado"
                        value={form.weight}
                        onChange={handleChange}
                    />

                    <Input
                        name="shortDescription"
                        placeholder="Descripción breve"
                        value={form.shortDescription}
                        onChange={handleChange}
                    />
                </div>

                <textarea
                    name="description"
                    placeholder="Descripción completa"
                    value={form.description}
                    onChange={handleChange}
                    className="w-full min-h-[120px] border border-[#7A7A7A] rounded-lg bg-white p-4 text-[#1A1A1A] placeholder:text-[#7A7A7A] focus:outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)]"
                />
            </section>

            {/* Salud y bienestar */}
            <section className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Salud y bienestar</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <label className="flex items-center gap-3 border border-[var(--color-border)] rounded-xl p-3 bg-white">
                        <input
                            type="checkbox"
                            name="hasMicrochip"
                            checked={form.hasMicrochip}
                            onChange={handleCheckboxChange}
                        />
                        <span>Tiene microchip</span>
                    </label>

                    <label className="flex items-center gap-3 border border-[var(--color-border)] rounded-xl p-3 bg-white">
                        <input
                            type="checkbox"
                            name="isSterilized"
                            checked={form.isSterilized}
                            onChange={handleCheckboxChange}
                        />
                        <span>Esterilizado / castrado</span>
                    </label>

                    <label className="flex items-center gap-3 border border-[var(--color-border)] rounded-xl p-3 bg-white">
                        <input
                            type="checkbox"
                            name="hasMedicalTreatment"
                            checked={form.hasMedicalTreatment}
                            onChange={handleCheckboxChange}
                        />
                        <span>Con tratamiento médico</span>
                    </label>

                    <label className="flex items-center gap-3 border border-[var(--color-border)] rounded-xl p-3 bg-white">
                        <input
                            type="checkbox"
                            name="vaccinesUpToDate"
                            checked={form.vaccinesUpToDate}
                            onChange={handleCheckboxChange}
                        />
                        <span>Vacunas al día</span>
                    </label>
                </div>

                <textarea
                    name="specialCare"
                    placeholder="Alergias o cuidados especiales"
                    value={form.specialCare}
                    onChange={handleChange}
                    className="w-full min-h-[100px] border border-[#7A7A7A] rounded-lg bg-white p-4 mt-3 text-[#1A1A1A] placeholder:text-[#7A7A7A] focus:outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)]"
                />
            </section>

            {/* Información adicional */}
            <section className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Información adicional</h3>

                <textarea
                    name="medicalHistory"
                    placeholder="Historial médico"
                    value={form.medicalHistory}
                    onChange={handleChange}
                    className="w-full min-h-[100px] border border-[#7A7A7A] rounded-lg bg-white p-4 mb-3 text-[#1A1A1A] placeholder:text-[#7A7A7A] focus:outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)]"
                />
            </section>

            {/* Error */}
            {errorMessage ? (
                <p className="text-sm text-red-600 mb-3">{errorMessage}</p>
            ) : null}

            {/* Botones */}
            <div className="flex flex-col md:flex-row gap-3 pt-2">
                <Button type="submit" disabled={!isFormValid || isLoading}>
                    {isLoading ? 'Guardando...' : editingPet ? 'Actualizar' : 'Guardar mascota'}
                </Button>

                <Button type="button" onClick={onCancelEdit}>
                    Cancelar
                </Button>
            </div>
        </form>
    );
}