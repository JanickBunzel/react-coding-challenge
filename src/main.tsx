import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import App from './App.tsx';
import './index.css';

const apolloClient = new ApolloClient({
    uri: 'https://swapi-graphql.eskerda.vercel.app/',
    cache: new InMemoryCache(),
});

createRoot(document.getElementById('root')!).render(
    <ApolloProvider client={apolloClient}>
        <StrictMode>
            <App />
        </StrictMode>
    </ApolloProvider>
);
