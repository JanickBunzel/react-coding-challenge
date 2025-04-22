import { createContext } from 'react';

type FavoritesContext = {
    favorites: string[];
    showOnlyFavorites: boolean;
    toggleFavorite: (id: string) => void;
    isFavorite: (id: string) => boolean;
    setShowOnlyFavorites: (value: boolean) => void;
};

export const FavoritesContext = createContext<FavoritesContext | undefined>(undefined);
