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
            .filter((character): character is { id: string } => !!character && !!character.id)
            .map((character) => character.id);

        setCharactersByFilmIds(characterIds);
    }, [data]);

    return {
        charactersByFilmIds,
    };
};
