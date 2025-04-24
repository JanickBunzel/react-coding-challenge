import { useEffect, useState } from 'react';
import { useGetFilterOptionsQuery } from '@/graphql/generated';
import { Filters } from '@/models/Filters';

type Option = {
    value: string;
    label: string;
};

const getUniqueOptions = (options: Option[]) => {
    const values = new Set<string>();
    return options.filter((o) => {
        if (values.has(o.value)) return false;
        values.add(o.value);
        return true;
    });
};

// Nebo comment: This part is only about scalability:
// If this app was to grow, you would probably colocate this hook with the component that is using it.
// You would use /hooks folder only for hooks that are reused in multiple components in the apps

export const useFilterOptions = () => {
    const [filterValues, setFilterValues] = useState<{
        [K in keyof Filters]: Option[];
    }>({
        gender: [{ value: '', label: 'Loading...' }],
        eyeColor: [{ value: '', label: 'Loading...' }],
        species: [{ value: '', label: 'Loading...' }],
        films: [{ value: '', label: 'Loading...' }],
    });

    const [skipOptionsQuery, setSkipOptionsQuery] = useState<boolean>(true);
    const loadFilterOptions = () => setSkipOptionsQuery(false);
    const { data } = useGetFilterOptionsQuery({ skip: skipOptionsQuery });

    useEffect(() => {
        const allGenders = (data?.allPeople?.people || [])
            .filter((p): p is { gender: string; eyeColor?: string } => !!p && !!p.gender)
            .map((p) => ({
                value: p.gender,
                label: p.gender,
            }));

        const allEyeColors = (data?.allPeople?.people || [])
            .filter((p): p is { gender?: string; eyeColor: string } => !!p && !!p.eyeColor)
            .flatMap((p) =>
                p.eyeColor.split(',').map((color) => ({
                    value: color.trim(),
                    label: color.trim(),
                }))
            );

        const allSpecies = (data?.allSpecies?.species || [])
            .filter((s): s is { id: string; name: string } => !!s && !!s.id && !!s.name)
            .map((s) => ({
                value: s.id,
                label: s.name,
            }));

        const allFilms = (data?.allFilms?.films || [])
            .filter((f): f is { id: string; title: string } => !!f && !!f.id && !!f.title)
            .map((f) => ({
                value: f.id,
                label: f.title,
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
