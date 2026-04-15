/**
 * =========================================================
 * ESTRUCTURA GENERAL DEL ARCHIVO
 * - Página con listado de cuidadores
 * - Obtiene usuarios y filtra por role caretaker
 * - Permite ver reseñas y crear nuevas reseñas
 * - El formulario de reseña solo se muestra al hacer click
 *   en "Agregar reseña"
 * =========================================================
 */

import { useEffect, useState } from 'react';

import Card from '../components/ui/card';
import Navbar from '../components/ui/navbar';

/* URL base de la API */
const API_URL = import.meta.env.VITE_API_URL.replace(/\/$/, '');

/**
 * Página de cuidadores.
 *
 * @returns {JSX.Element}
 */
export default function Caretakers() {
    /**
     * =========================================================
     * ESTADOS
     * =========================================================
     */

    /* Lista de cuidadores */
    const [caretakers, setCaretakers] = useState([]);

    /* Mensaje de error global */
    const [errorMessage, setErrorMessage] = useState('');

    /* Reseñas agrupadas por cuidador */
    const [caretakerReviews, setCaretakerReviews] = useState({});

    /* Control de card abierta para ver reseñas */
    const [openReviews, setOpenReviews] = useState(null);

    /* Control de formulario visible por cuidador */
    const [openReviewForm, setOpenReviewForm] = useState(null);

    /* Datos del formulario de reseña */
    const [newReview, setNewReview] = useState({
        rating: 5,
        comment: ''
    });

    /**
     * =========================================================
     * EFECTO INICIAL - OBTENER CUIDADORES Y SUS RESEÑAS
     * =========================================================
     */

    useEffect(() => {
        let isMounted = true;

        async function fetchCaretakers() {
            try {
                const response = await fetch(`${API_URL}/users`);
                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message || 'Error fetching users');
                }

                /* Filtrar solo usuarios con rol caretaker */
                const filteredCaretakers = data.filter(
                    (user) => user.role === 'caretaker'
                );

                /* Cargar reseñas iniciales para mostrar promedio desde el inicio */
                const reviewsEntries = await Promise.all(
                    filteredCaretakers.map(async (caretaker) => {
                        const reviewsResponse = await fetch(
                            `${API_URL}/reviews/${caretaker._id}`
                        );
                        const reviewsData = await reviewsResponse.json();

                        return [caretaker._id, reviewsData];
                    })
                );

                const reviewsObject = Object.fromEntries(reviewsEntries);

                if (isMounted) {
                    setCaretakers(filteredCaretakers);
                    setCaretakerReviews(reviewsObject);
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

    /**
     * =========================================================
     * FUNCIONES
     * =========================================================
     */

    /**
     * Carga las reseñas de un cuidador.
     *
     * @param {string} caretakerId
     * @returns {Promise<void>}
     */
    const handleLoadReviews = async (caretakerId) => {
        try {
            const response = await fetch(`${API_URL}/reviews/${caretakerId}`);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Error loading reviews');
            }

            setCaretakerReviews((prevReviews) => ({
                ...prevReviews,
                [caretakerId]: data
            }));

            setOpenReviews(caretakerId);
            setOpenReviewForm(null);
        } catch (error) {
            setErrorMessage(error.message);
        }
    };

    /**
     * Abre o cierra la sección de reseñas de un cuidador.
     *
     * @param {string} caretakerId
     * @returns {Promise<void>}
     */
    const handleToggleReviews = async (caretakerId) => {
        if (openReviews === caretakerId) {
            setOpenReviews(null);
            setOpenReviewForm(null);
            return;
        }

        await handleLoadReviews(caretakerId);
    };

    /**
     * Muestra el formulario de reseña de un cuidador.
     *
     * @param {string} caretakerId
     * @returns {void}
     */
    const handleOpenReviewForm = (caretakerId) => {
        setOpenReviewForm(caretakerId);
        setNewReview({
            rating: 5,
            comment: ''
        });
    };

    /**
     * Crea una nueva reseña y recarga automáticamente las reseñas del cuidador.
     *
     * @param {string} caretakerId
     * @returns {Promise<void>}
     */
    const handleCreateReview = async (caretakerId) => {
        try {
            const token = localStorage.getItem('token');

            if (!token) {
                throw new Error('Debes iniciar sesión para dejar una reseña');
            }

            const response = await fetch(`${API_URL}/reviews`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    caretakerId,
                    rating: newReview.rating,
                    comment: newReview.comment
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Error creating review');
            }

            /* Recarga las reseñas del cuidador */
            await handleLoadReviews(caretakerId);

            /* Oculta el formulario después de guardar */
            setOpenReviewForm(null);

            /* Resetea el formulario */
            setNewReview({
                rating: 5,
                comment: ''
            });
        } catch (error) {
            setErrorMessage(error.message);
            console.error('CREATE REVIEW ERROR:', error.message);
        }
    };

    /**
     * =========================================================
     * RENDER
     * =========================================================
     */

    return (
        <div className="min-h-screen bg-[var(--color-background)]">
            {/* Navbar principal */}
            <Navbar />

            <main className="p-6 max-w-7xl mx-auto">
                {/* Título principal */}
                <h1 className="text-2xl font-semibold text-[var(--color-primary)] mb-6">
                    Cuidadores
                </h1>

                {/* Mensaje de error */}
                {errorMessage ? (
                    <p className="text-red-600 mb-4">{errorMessage}</p>
                ) : null}

                {/* Listado de cuidadores */}
                <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {caretakers.map((caretaker) => {
                        const reviews = caretakerReviews[caretaker._id] || [];

                        /* Cálculo del promedio de puntuación */
                        const averageRating =
                            reviews.length > 0
                                ? (
                                      reviews.reduce(
                                          (accumulator, review) =>
                                              accumulator + review.rating,
                                          0
                                      ) / reviews.length
                                  ).toFixed(1)
                                : null;

                        return (
                            <Card key={caretaker._id}>
                                {/* Avatar */}
                                <div className="w-20 h-20 rounded-full bg-[#E5E5E5] flex items-center justify-center text-2xl font-semibold text-[var(--color-primary)] mb-4">
                                    {caretaker.name.charAt(0)}
                                </div>

                                {/* Datos básicos */}
                                <h2 className="text-lg font-semibold">
                                    {caretaker.name}
                                </h2>

                                <p className="text-gray-600">
                                    {caretaker.email}
                                </p>

                                {/* Puntuación visible siempre */}
                                {averageRating ? (
                                    <p className="text-sm mt-2">
                                        ⭐ {averageRating}
                                    </p>
                                ) : (
                                    <p className="text-sm mt-2 text-gray-400">
                                        Sin reseñas
                                    </p>
                                )}

                                {/* Botón ver/ocultar reseñas */}
                                <button
                                    onClick={() =>
                                        handleToggleReviews(caretaker._id)
                                    }
                                    className="mt-3 text-sm text-[var(--color-primary)]"
                                >
                                    {openReviews === caretaker._id
                                        ? 'Ocultar reseñas'
                                        : 'Ver reseñas'}
                                </button>

                                {/* Bloque de reseñas */}
                                {openReviews === caretaker._id ? (
                                    <div className="mt-4">
                                        {/* Lista de reseñas */}
                                        {reviews.length > 0 ? (
                                            reviews.map((review) => (
                                                <div
                                                    key={review._id}
                                                    className="border p-3 rounded mb-2"
                                                >
                                                    <p className="text-sm font-semibold">
                                                        {review.owner?.name}
                                                    </p>
                                                    <p className="text-sm">
                                                        ⭐ {review.rating}
                                                    </p>
                                                    <p className="text-sm">
                                                        {review.comment}
                                                    </p>
                                                </div>
                                            ))
                                        ) : (
                                            <p className="text-sm text-gray-400 mb-3">
                                                Este cuidador aún no tiene reseñas.
                                            </p>
                                        )}

                                        {/* Botón para mostrar formulario */}
                                        {openReviewForm !== caretaker._id ? (
                                            <button
                                                onClick={() =>
                                                    handleOpenReviewForm(
                                                        caretaker._id
                                                    )
                                                }
                                                className="mt-2 text-sm text-[var(--color-primary)] font-medium"
                                            >
                                                Agregar reseña
                                            </button>
                                        ) : null}

                                        {/* Formulario de reseña */}
                                        {openReviewForm === caretaker._id ? (
                                            <div className="mt-3">
                                                <select
                                                    value={newReview.rating}
                                                    onChange={(event) =>
                                                        setNewReview({
                                                            ...newReview,
                                                            rating: Number(
                                                                event.target.value
                                                            )
                                                        })
                                                    }
                                                    className="border p-2 rounded w-full mb-2"
                                                >
                                                    <option value={5}>5 ⭐</option>
                                                    <option value={4}>4 ⭐</option>
                                                    <option value={3}>3 ⭐</option>
                                                    <option value={2}>2 ⭐</option>
                                                    <option value={1}>1 ⭐</option>
                                                </select>

                                                <textarea
                                                    placeholder="Comentario"
                                                    value={newReview.comment}
                                                    onChange={(event) =>
                                                        setNewReview({
                                                            ...newReview,
                                                            comment: event.target.value
                                                        })
                                                    }
                                                    className="border p-2 rounded w-full mb-2"
                                                />

                                                <button
                                                    onClick={() =>
                                                        handleCreateReview(
                                                            caretaker._id
                                                        )
                                                    }
                                                    className="bg-[#2B7A78] text-white p-2 rounded-full w-full"
                                                >
                                                    Enviar reseña
                                                </button>
                                            </div>
                                        ) : null}
                                    </div>
                                ) : null}
                            </Card>
                        );
                    })}
                </section>
            </main>
        </div>
    );
}