import { Person } from '@/graphql/generated';
import { z } from 'zod';

export const CharacterSchema = z.object({
    id: z.string(),
    name: z.string().nullable(),
    eyeColor: z.string().nullable(),
    gender: z.string().nullable(),
    height: z.number().nullable(),
    mass: z.number().nullable(),
    homeworld: z
        .object({
            name: z.string().nullable(),
        })
        .nullable(),
    species: z
        .object({
            name: z.string().nullable(),
        })
        .nullable(),
    filmConnection: z
        .object({
            films: z
                .array(
                    z.object({
                        title: z.string().nullable(),
                    })
                )
                .nullable(),
        })
        .nullable(),
});

export type Character = {
    id: string;
    name: string | null;
    height: number | null;
    weight: number | null;
    gender: string | null;
    eyeColor: string | null;
    homeworld: string | null;
    species: string | null;
    films: string[];
    isFavorite: boolean;
};

export const transformToCharacter = (
    person: Person,
    favorites: string[] = []
): Character => {
    const base = CharacterSchema.parse(person);

    return {
        id: base.id,
        name: base.name,
        height: base.height,
        weight: base.mass,
        gender: base.gender,
        eyeColor: base.eyeColor,
        homeworld: base.homeworld?.name ?? null,
        species: base.species?.name ?? null,
        films: (base.filmConnection?.films ?? [])
            .map((f) => f.title)
            .filter((title) => title !== null),
        isFavorite: favorites.includes(base.id),
    };
};
