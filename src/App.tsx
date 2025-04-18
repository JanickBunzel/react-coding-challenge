import { useEffect } from 'react';
import { Checkbox, Layout } from 'antd';
import { Content, Header } from 'antd/es/layout/layout';
import CharactersTable from './components/CharactersTable';
import { useCharacters } from './hooks/useCharacters';
import { useFavorites } from './hooks/useFavorites';

const PAGE_SIZE = 10;

function App() {
    const { characters, loadingInitial, loadingNext, pageInfo, loadMore } =
        useCharacters({
            first: PAGE_SIZE,
        });
    const {
        favorites,
        toggleFavorite,
        showOnlyFavorites,
        setShowOnlyFavorites,
    } = useFavorites();

    useEffect(() => console.log('Characters data:', characters), [characters]);

    return (
        <Layout>
            <Header>
                <h1>Start Wars Character reference book</h1>
            </Header>

            <Content>
                <Checkbox
                    checked={showOnlyFavorites}
                    onChange={(e) => setShowOnlyFavorites(e.target.checked)}
                >
                    Only favorites
                </Checkbox>
                <CharactersTable
                    characters={characters}
                    loadingInitial={loadingInitial}
                    loadingNext={loadingNext}
                    hasNextPage={pageInfo.hasNextPage}
                    loadMore={loadMore}
                    favorites={favorites}
                    toggleFavorite={toggleFavorite}
                    showOnlyFavorites={showOnlyFavorites}
                />
            </Content>
        </Layout>
    );
}

export default App;
