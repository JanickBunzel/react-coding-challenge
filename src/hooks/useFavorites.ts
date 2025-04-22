import { useContext } from 'react';
import { FavoritesContext } from '@/contexts/FavoritesContext';

export const useFavorites = () => {
    const context = useContext(FavoritesContext);

    if (!context) {
        throw new Error('useFavorites must be used within the FavoritesProvider!');
    }

    return context;
};
