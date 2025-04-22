import { useGetFilterOptionsQuery } from '@/graphql/generated';
import { Filters } from '@/models/Filters';
import { useEffect, useState } from 'react';

export const useFilterOptions = () => {
    const [filterValues, setFilterValues] = useState<Filters>({
        gender: ['Loading...'],
        eyeColor: ['Loading...'],
        species: ['Loading...'],
        films: ['Loading...'],
    });

    const { data } = useGetFilterOptionsQuery();

    useEffect(() => {
        const allGenders = (data?.allPeople?.people || [])
            .filter((p): p is { gender: string; eyeColor?: string } => !!p && !!p.gender)
            .map((p) => p.gender);

        const allEyeColors = (data?.allPeople?.people || [])
            .filter((p): p is { gender?: string; eyeColor: string } => !!p && !!p.eyeColor)
            .map((p) => p.eyeColor);

        const allSpecies = (data?.allSpecies?.species || [])
            .filter((s): s is { name: string } => !!s && !!s.name)
            .map((s) => s.name);

        const allFilms = (data?.allFilms?.films || [])
            .filter((f): f is { title: string } => !!f && !!f.title)
            .map((f) => f.title);

        setFilterValues({
            gender: Array.from(new Set(allGenders)),
            eyeColor: Array.from(new Set(allEyeColors)),
            species: Array.from(new Set(allSpecies)),
            films: Array.from(new Set(allFilms)),
        });
    }, [data]);

    return {
        filterValues,
    };
};
