import { ApolloClient, InMemoryCache } from '@apollo/client';

export const apolloClient = new ApolloClient({
    uri: 'https://swapi-graphql.eskerda.vercel.app/',
    cache: new InMemoryCache(),
    defaultOptions: {
        watchQuery: {
            notifyOnNetworkStatusChange: true,
            fetchPolicy: 'cache-first',
        },
        query: {
            fetchPolicy: 'cache-first',
        },
    },
});
