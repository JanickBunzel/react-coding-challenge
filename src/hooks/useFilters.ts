import { useCallback, useState } from 'react';
import { Person } from '@/graphql/generated';
import { Filters } from '@/models/Filters';
import { useFilmCharacters } from '@/hooks/useFilmCharacters';

export const useFilters = () => {
    const [filters, setFilters] = useState<Filters>({
        gender: [],
        eyeColor: [],
        species: [],
        films: [],
    });

    const { charactersByFilmIds } = useFilmCharacters(filters.films.at(0) || '');

    const updateFilter = useCallback(
        (field: keyof Filters, selected: string[]) =>
            setFilters((prevFilters) => ({
                ...prevFilters,
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

    const hasActiveFilters = Object.values(filters).some((filterValues) => filterValues.length > 0);

    const filterCharacters = (characters: Person[]): Person[] =>
        characters.filter((character) => {
            // Check character for gender filter
            if (filters.gender.length > 0 && !filters.gender.includes(character.gender || 'n/a')) {
                return false;
            }

            // Check character for eyeColor filter
            if (
                filters.eyeColor.length > 0 &&
                character.eyeColor &&
                !filters.eyeColor.some((ec) =>
                    (character.eyeColor ?? '')
                        .split(',')
                        .map((color) => color.trim())
                        .includes(ec)
                )
            ) {
                return false;
            }

            // Check character for species filter
            if (filters.species.length > 0 && !filters.species.includes(character.species?.id || '')) {
                return false;
            }

            // Check character for films filter
            if (filters.films.length > 0 && !charactersByFilmIds.some((cId) => cId === character.id)) {
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
