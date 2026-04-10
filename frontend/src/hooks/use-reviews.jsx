/**
 * =========================================================
 * ESTRUCTURA GENERAL DEL ARCHIVO
 * - Hook para manejar reseñas
 * =========================================================
 */

import { useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL;

export function useReviews() {
    const [reviews, setReviews] = useState([]);

    const getReviews = async (caretakerId) => {
        const res = await fetch(`${API_URL}/reviews/${caretakerId}`);
        const data = await res.json();
        setReviews(data);
    };

    const createReview = async (reviewData) => {
        const token = localStorage.getItem('token');

        await fetch(`${API_URL}/reviews`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(reviewData)
        });
    };

    return { reviews, getReviews, createReview };
}