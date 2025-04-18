import { useEffect, useRef, useState } from 'react';
import { Person, useGetAllPeopleQuery } from '@/graphql/generated';
import { Character, transformToCharacter } from '@/models/Character';
import { useFavorites } from './useFavorites';

type Props = {
    first: number;
};

export const useCharacters = ({ first }: Props) => {
    const [characters, setCharacters] = useState<Character[]>([]);
    const { favorites } = useFavorites();

    const { loading, error, data, fetchMore } = useGetAllPeopleQuery({
        variables: { first, after: null },
        notifyOnNetworkStatusChange: true,
        fetchPolicy: 'cache-first',
    });
    const [pageInfo, setPageInfo] = useState<{
        hasNextPage: boolean;
        endCursor: string | null;
    }>({ hasNextPage: false, endCursor: null });
    const [loadingNext, setLoadingNext] = useState(false);
    const initialLoadCompleted = useRef(false);
    const loadingInitial = loading && !initialLoadCompleted.current;

    const appendPage = (page: typeof data) => {
        if (!page?.allPeople?.people) return;

        setCharacters((prev) => {
            const pervIds = new Set(prev.map((c) => c.id));

            const incomingCharacters = (page.allPeople?.people ?? [])
                .filter((p): p is Person => p !== null && !pervIds.has(p.id))
                .map((p) => transformToCharacter(p, favorites));

            return [...prev, ...incomingCharacters];
        });

        setPageInfo({
            hasNextPage: page.allPeople.pageInfo.hasNextPage,
            endCursor: page.allPeople.pageInfo.endCursor ?? null,
        });
    };

    const loadMore = () => {
        if (!pageInfo.hasNextPage || !pageInfo.endCursor) return;

        setLoadingNext(true);

        fetchMore({
            variables: {
                first: first,
                after: pageInfo.endCursor,
            },
        })
            .then((nextPage) => appendPage(nextPage.data))
            .catch((e) => console.error('Error fetching next page', e))
            .finally(() => setLoadingNext(false));
    };

    useEffect(() => {
        if (data?.allPeople?.people && !initialLoadCompleted.current)
            initialLoadCompleted.current = true;

        appendPage(data);
    }, [data]);

    return {
        characters,
        loadingInitial,
        loadingNext,
        error,
        pageInfo,
        loadMore,
    };
};
