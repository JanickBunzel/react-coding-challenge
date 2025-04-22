import { PropsWithChildren, useCallback, useEffect, useMemo, useState } from 'react';
import { FavoritesContext } from '@/contexts/FavoritesContext';

const FAVORITES_STORAGE_KEY = 'star-wars-favorites';
const SHOW_ONLY_FAVORITES_KEY = 'show-only-favorites';

export const FavoritesProvider = ({ children }: PropsWithChildren) => {
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
            console.error('Error loading showOnlyFavorites from localStorage:', e);
            return false;
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
        } catch (e) {
            console.error('Error saving favorites to localStorage:', e);
        }
    }, [favorites]);

    useEffect(() => {
        try {
            localStorage.setItem(SHOW_ONLY_FAVORITES_KEY, JSON.stringify(showOnlyFavorites));
        } catch (e) {
            console.error('Error saving showOnlyFavorites to localStorage:', e);
        }
    }, [showOnlyFavorites]);

    const toggleFavorite = useCallback((id: string) => {
        setFavorites((prevFavs) =>
            prevFavs.includes(id) ? prevFavs.filter((favId) => favId !== id) : [...prevFavs, id]
        );
    }, []);

    const contextValue = useMemo(
        () => ({
            favorites,
            showOnlyFavorites,
            toggleFavorite,
            isFavorite: (id: string) => favorites.includes(id),
            setShowOnlyFavorites,
        }),
        [favorites, showOnlyFavorites, toggleFavorite]
    );

    return <FavoritesContext.Provider value={contextValue} children={children} />;
};
