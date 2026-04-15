/**
 * =========================================================
 * ESTRUCTURA GENERAL DEL ARCHIVO
 * - Custom hook para gestionar reseñas
 * - Permite obtener reseñas por cuidador y crear nuevas reseñas
 * =========================================================
 */

import { useState } from 'react';

/* URL base de la API */
const API_URL = import.meta.env.VITE_API_URL.replace(/\/$/, '');

/**
 * Hook personalizado para manejar reseñas.
 *
 * Hooks usados:
 * - useState: guarda el listado de reseñas cargadas
 *
 * Retorna:
 * - reviews: lista de reseñas
 * - getReviews: obtiene reseñas por cuidador
 * - createReview: crea una nueva reseña
 *
 * @returns {Object}
 */
export function useReviews() {
    /* Estado con las reseñas obtenidas */
    const [reviews, setReviews] = useState([]);

    /**
     * Obtiene las reseñas de un cuidador.
     *
     * @param {string} caretakerId - ID del cuidador
     * @returns {Promise<void>}
     */
    const getReviews = async (caretakerId) => {
        try {
            const response = await fetch(`${API_URL}/reviews/${caretakerId}`);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Error fetching reviews');
            }

            setReviews(data);
        } catch (error) {
            console.error('GET REVIEWS ERROR:', error);
        }
    };

    /**
     * Crea una nueva reseña.
     *
     * @param {Object} reviewData - Datos de la reseña
     * @param {string} reviewData.caretakerId
     * @param {number} reviewData.rating
     * @param {string} reviewData.comment
     * @returns {Promise<void>}
     */
    const createReview = async (reviewData) => {
        try {
            const token = localStorage.getItem('token');

            const response = await fetch(`${API_URL}/reviews`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(reviewData)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Error creating review');
            }
        } catch (error) {
            console.error('CREATE REVIEW ERROR:', error);
            throw error;
        }
    };

    return {
        reviews,
        getReviews,
        createReview
    };
}