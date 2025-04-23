import { useEffect, useState } from 'react';
import { useGetFilmCharactersQuery } from '@/graphql/generated';

export const useFilmCharacters = (filmId: string) => {
    const [charactersByFilmIds, setCharactersByFilmIds] = useState<string[]>([]);

    const { data } = useGetFilmCharactersQuery({
        variables: { id: filmId },
        skip: !filmId || filmId === '',
    });

    useEffect(() => {
        const characterIds = (data?.film?.characterConnection?.characters || [])
            .filter((c): c is { id: string } => !!c && !!c.id)
            .map((c) => c.id);

        setCharactersByFilmIds(characterIds);
    }, [data]);

    return {
        charactersByFilmIds,
    };
};
