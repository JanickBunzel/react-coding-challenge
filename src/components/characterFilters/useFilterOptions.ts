import { useEffect, useState } from 'react';
import { useGetFilterOptionsQuery } from '@/graphql/generated';
import { Filters } from '@/models/Filters';

const LOAD_FILTER_OPTIONS: 'lazy' | 'eager' = 'lazy';

type Option = {
    value: string;
    label: string;
};

const getUniqueOptions = (options: Option[]) => {
    const values = new Set<string>();

    const uniqueValues = options.filter((option) => {
        if (values.has(option.value)) return false;
        values.add(option.value);
        return true;
    });

    return uniqueValues.sort((a, b) => a.label.localeCompare(b.label));
};

export const useFilterOptions = () => {
    const [filterValues, setFilterValues] = useState<{
        [K in keyof Filters]: Option[];
    }>({
        gender: [{ value: '', label: 'Loading...' }],
        eyeColor: [{ value: '', label: 'Loading...' }],
        species: [{ value: '', label: 'Loading...' }],
        films: [{ value: '', label: 'Loading...' }],
    });

    // Lazy loading the filterOptions as "we want to stay as efficient as possible" (UX tradeoff)
    const [skipOptionsQuery, setSkipOptionsQuery] = useState<boolean>(true);
    const loadFilterOptions = () => setSkipOptionsQuery(false);
    const { data } = useGetFilterOptionsQuery({ skip: skipOptionsQuery && LOAD_FILTER_OPTIONS === 'lazy' });

    useEffect(() => {
        const allGenders = (data?.allPeople?.people || [])
            .filter((person): person is { gender: string; eyeColor?: string } => !!person && !!person.gender)
            .map((person) => ({
                value: person.gender,
                label: person.gender,
            }));

        const allEyeColors = (data?.allPeople?.people || [])
            .filter((person): person is { gender?: string; eyeColor: string } => !!person && !!person.eyeColor)
            .flatMap((person) =>
                person.eyeColor.split(',').map((color) => ({
                    value: color.trim(),
                    label: color.trim(),
                }))
            );

        const allSpecies = (data?.allSpecies?.species || [])
            .filter((species): species is { id: string; name: string } => !!species && !!species.id && !!species.name)
            .map((species) => ({
                value: species.id,
                label: species.name,
            }));

        const allFilms = (data?.allFilms?.films || [])
            .filter((film): film is { id: string; title: string } => !!film && !!film.id && !!film.title)
            .map((film) => ({
                value: film.id,
                label: film.title,
            }));

        setFilterValues({
            gender: getUniqueOptions(allGenders),
            eyeColor: getUniqueOptions(allEyeColors),
            species: getUniqueOptions(allSpecies),
            films: getUniqueOptions(allFilms),
        });
    }, [data]);

    return {
        filterValues,
        loadFilterOptions,
    };
};
