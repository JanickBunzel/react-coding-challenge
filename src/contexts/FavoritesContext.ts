import { createContext } from 'react';

type FavoritesContext = {
    favorites: string[];
    isFavorite: (id: string) => boolean;
    toggleFavorite: (id: string) => void;
    showOnlyFavorites: boolean;
    setShowOnlyFavorites: (value: boolean) => void;
};

export const FavoritesContext = createContext<FavoritesContext | undefined>(undefined);
