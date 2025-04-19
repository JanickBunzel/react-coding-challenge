import { useState, useEffect, useCallback } from 'react';

const FAVORITES_STORAGE_KEY = 'star-wars-favorites';
const SHOW_ONLY_FAVORITES_KEY = 'show-only-favorites';

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

    const [showOnlyFavorites, setShowOnlyFavorites] = useState<boolean>(() => {
        try {
            const stored = localStorage.getItem(SHOW_ONLY_FAVORITES_KEY);
            return stored ? JSON.parse(stored) : false;
        } catch (e) {
            console.error(
                'Error loading showOnlyFavorites from localStorage:',
                e
            );
            return false;
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

    useEffect(() => {
        try {
            localStorage.setItem(
                SHOW_ONLY_FAVORITES_KEY,
                JSON.stringify(showOnlyFavorites)
            );
        } catch (e) {
            console.error('Error saving showOnlyFavorites to localStorage:', e);
        }
    }, [showOnlyFavorites]);

    const toggleFavorite = useCallback(
        (id: string) => {
            setFavorites((prevFavs) => {
                if (prevFavs.includes(id)) {
                    return prevFavs.filter((favId) => favId !== id);
                } else {
                    return [...prevFavs, id];
                }
            });
        },
        [favorites]
    );

    return {
        favorites,
        toggleFavorite,
        isFavorite: (id: string) => favorites.includes(id),
        showOnlyFavorites,
        setShowOnlyFavorites,
    };
};
