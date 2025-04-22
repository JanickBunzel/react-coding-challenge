import { ApolloClient, InMemoryCache } from '@apollo/client';

export const apolloClient = new ApolloClient({
    uri: 'https://swapi-graphql.eskerda.vercel.app/',
    cache: new InMemoryCache(),
    defaultOptions: {
        query: {
            notifyOnNetworkStatusChange: true,
            fetchPolicy: 'cache-first',
        },
    },
});
