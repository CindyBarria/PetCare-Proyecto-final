import { useEffect, useState } from 'react';
import Input from './ui/input';
import Button from './ui/button';
import Card from './ui/card';
import { usePets } from '../hooks/use-pets';

const initialFormState = {
    name: '',
    species: '',
    age: '',
    shortDescription: '',
    description: '',
    imageUrl: ''
};

export default function CreatePet({ editingPet, onCancelEdit }) {
    const { createPet, updatePet } = usePets();
    const [form, setForm] = useState(initialFormState);
    const [errorMessage, setErrorMessage] = useState('');
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

    const handleChange = ({ target: { name, value } }) => {
        setForm((prevForm) => ({
            ...prevForm,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isFormValid) return;

        try {
            setIsLoading(true);
            setErrorMessage('');

            const payload = {
                ...form,
                age: Number(form.age)
            };

            if (editingPet) {
                await updatePet(editingPet._id, payload);
            } else {
                await createPet(payload);
            }

            setForm(initialFormState);

            if (editingPet && onCancelEdit) {
                onCancelEdit();
            }
        } catch (error) {
            setErrorMessage(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card>
            <form onSubmit={handleSubmit} className="w-full">
                <h2 className="text-xl font-semibold text-[#2B7A78] mb-4">
                    {editingPet ? 'Editar publicación' : 'Crear publicación'}
                </h2>

                <Input
                    name="name"
                    placeholder="Nombre de la mascota"
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

                <Input
                    name="description"
                    placeholder="Descripción completa"
                    value={form.description}
                    onChange={handleChange}
                />

                <Input
                    name="imageUrl"
                    placeholder="URL de la imagen"
                    value={form.imageUrl}
                    onChange={handleChange}
                />

                {errorMessage ? (
                    <p className="text-sm text-red-600 mb-3">{errorMessage}</p>
                ) : null}

                <div className="flex gap-3">
                    <Button type="submit" disabled={!isFormValid || isLoading}>
                        {isLoading ? 'Guardando...' : editingPet ? 'Actualizar' : 'Publicar'}
                    </Button>

                    {editingPet ? (
                        <Button type="button" onClick={onCancelEdit}>
                            Cancelar
                        </Button>
                    ) : null}
                </div>
            </form>
        </Card>
    );
}