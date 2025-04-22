import { useCallback, useEffect, useRef, useState } from 'react';
import { Person, useGetAllPeopleQuery } from '@/graphql/generated';
import { Character, transformToCharacter } from '@/models/Character';
import { useFavorites } from '@/hooks/useFavorites';

const PAGE_SIZE = 10;

export const useCharacters = () => {
    const [characters, setCharacters] = useState<Character[]>([]);
    const { isFavorite } = useFavorites();

    const { loading, error, data, fetchMore } = useGetAllPeopleQuery({
        variables: { first: PAGE_SIZE, after: null },
    });

    const [pageInfo, setPageInfo] = useState<{
        hasNextPage: boolean;
        endCursor: string | null;
    }>({ hasNextPage: false, endCursor: null });

    const [loadingNext, setLoadingNext] = useState(false);
    const initialLoadCompleted = useRef(false);
    const loadingInitial = loading && !initialLoadCompleted.current;

    const appendPage = useCallback(
        (page: typeof data) => {
            if (!page?.allPeople?.people) return;

            setCharacters((prev) => {
                const pervIds = new Set(prev.map((c) => c.id));

                const incomingCharacters = (page.allPeople?.people ?? [])
                    .filter((p): p is Person => p !== null && !pervIds.has(p.id))
                    .map((p) => transformToCharacter(p, isFavorite(p.id)));

                return [...prev, ...incomingCharacters];
            });

            setPageInfo({
                hasNextPage: page.allPeople.pageInfo.hasNextPage,
                endCursor: page.allPeople.pageInfo.endCursor ?? null,
            });
        },
        [isFavorite]
    );

    const loadMore = useCallback(() => {
        if (!pageInfo.hasNextPage || !pageInfo.endCursor) return;

        setLoadingNext(true);

        fetchMore({
            variables: {
                first: PAGE_SIZE,
                after: pageInfo.endCursor,
            },
        })
            .then((nextPage) => appendPage(nextPage.data))
            .catch((e) => console.error('Error fetching next page', e))
            .finally(() => setLoadingNext(false));
    }, [pageInfo, fetchMore, appendPage]);

    useEffect(() => {
        if (data?.allPeople?.people && !initialLoadCompleted.current) initialLoadCompleted.current = true;

        appendPage(data);
    }, [data, appendPage]);

    return {
        characters,
        loadingInitial,
        loadingNext,
        error,
        pageInfo,
        loadMore,
    };
};
