import { useState, useEffect } from 'react';

const FAVORITES_STORAGE_KEY = 'star-wars-favorites';

export const useFavorites = () => {
    const [favorites, setFavorites] = useState<string[]>(() => {
        try {
            const stored = localStorage.getItem(FAVORITES_STORAGE_KEY);
            return stored ? JSON.parse(stored) : [];
        } catch (e) {
            console.error('Error loading favorites from localStorage:', e);
            return [];
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem(
                FAVORITES_STORAGE_KEY,
                JSON.stringify(favorites)
            );
        } catch (e) {
            console.error('Error saving favorites to localStorage:', e);
        }
    }, [favorites]);

    const toggleFavorite = (id: string) => {
        setFavorites((prevFavs) => {
            if (prevFavs.includes(id)) {
                return prevFavs.filter((favId) => favId !== id);
            } else {
                return [...prevFavs, id];
            }
        });
    };

    return {
        favorites,
        toggleFavorite,
        isFavorite: (id: string) => favorites.includes(id),
    };
};
