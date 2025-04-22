import { useCallback, useState } from 'react';
import { Character } from '@/models/Character';
import { Filters } from '@/models/Filters';

export const useFilters = () => {
    const [filters, setFilters] = useState<Filters>({
        gender: [],
        eyeColor: [],
        species: [],
        films: [],
    });

    const updateFilter = useCallback(
        (field: keyof Filters, selected: string[]) =>
            setFilters((prev) => ({
                ...prev,
                [field]: selected,
            })),
        []
    );

    const resetFilters = useCallback(
        () =>
            setFilters({
                gender: [],
                eyeColor: [],
                species: [],
                films: [],
            }),
        []
    );

    const hasActiveFilters = Object.values(filters).some((vs) => vs.length > 0);

    const filterCharacters = (characters: Character[]): Character[] =>
        characters.filter((c) => {
            if (filters.gender.length > 0 && !filters.gender.includes(c.gender || 'n/a')) {
                return false;
            }

            if (filters.eyeColor.length > 0 && !filters.eyeColor.some((ec) => ec === c.eyeColor)) {
                return false;
            }

            if (filters.species.length > 0 && !filters.species.includes(c.species || '')) {
                return false;
            }

            if (filters.films.length > 0 && !filters.films.some((f) => c.films.includes(f))) {
                return false;
            }

            return true;
        });

    return {
        filters,
        updateFilter,
        resetFilters,
        hasActiveFilters,
        filterCharacters,
    };
};
