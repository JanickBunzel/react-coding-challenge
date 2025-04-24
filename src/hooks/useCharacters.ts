import { useCallback, useEffect, useRef, useState } from 'react';
import { Person, useGetAllPeopleQuery } from '@/graphql/generated';

const PAGE_SIZE = 10;

export const useCharacters = () => {
    const [characters, setCharacters] = useState<Person[]>([]);

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

    const appendPage = useCallback((page: typeof data) => {
        if (!page?.allPeople?.people) return;

        setCharacters((prevCharacters) => {
            const prevIds = new Set(prevCharacters.map((c) => c.id));

            const incomingCharacters = (page.allPeople?.people ?? []).filter(
                (person): person is Person => person !== null && !prevIds.has(person.id)
            );

            return [...prevCharacters, ...incomingCharacters];
        });

        setPageInfo({
            hasNextPage: page.allPeople.pageInfo.hasNextPage,
            endCursor: page.allPeople.pageInfo.endCursor ?? null,
        });
    }, []);

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
            .catch((error) => console.error('Error fetching next page', error))
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
