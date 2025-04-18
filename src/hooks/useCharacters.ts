import { useMemo } from 'react';
import { transformToCharacter } from '@/models/Character';
import { Person, useGetAllPeopleQuery } from '@/graphql/generated';
import { useFavorites } from './useFavorites';

type Props = {
    first?: number;
    after?: string | null;
};

export const useCharacters = ({ first = 10, after = null }: Props) => {
    const { loading, error, data, fetchMore } = useGetAllPeopleQuery({
        variables: { first, after },
        notifyOnNetworkStatusChange: true,
        fetchPolicy: 'cache-first',
    });
    console.log('Api data:', data);

    const { favorites } = useFavorites();

    const characters = useMemo(() => {
        const people = data?.allPeople?.people || [];
        return people
            .filter((person): person is Person => person !== null)
            .map((person) => transformToCharacter(person, favorites));
    }, [data, favorites]);

    const pageInfo = data?.allPeople?.pageInfo || {
        hasNextPage: false,
        endCursor: null,
    };

    const loadMore = () => {
        if (pageInfo.hasNextPage && pageInfo.endCursor) {
            fetchMore({
                variables: {
                    after: pageInfo.endCursor,
                },
            });
        }
    };

    return {
        characters,
        loading,
        error,
        pageInfo,
        loadMore,
    };
};
