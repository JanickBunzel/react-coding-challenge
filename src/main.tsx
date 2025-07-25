import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from '@/apollo/clients.ts';
import { FavoritesProvider } from '@/contexts/FavoritesProvider.tsx';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ApolloProvider client={apolloClient}>
            <FavoritesProvider>
                <App />
            </FavoritesProvider>
        </ApolloProvider>
    </StrictMode>
);
