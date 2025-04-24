import { useGetCharacterFilmsQuery } from '@/graphql/generated';
import { useEffect, useState } from 'react';

export const useCharacterFilms = (characterId: string) => {
    const [films, setFilms] = useState<string[]>([]);

    const { loading, data } = useGetCharacterFilmsQuery({
        variables: { id: characterId },
        skip: !characterId || characterId === '',
    });

    useEffect(() => {
        const filmTitles = (data?.person?.filmConnection?.films || [])
            .filter((film): film is { title: string } => !!film && !!film.title)
            .map((film) => film.title);

        setFilms(filmTitles);
    }, [data]);

    return {
        filmsLoading: loading,
        films,
    };
};
