import { useEffect } from 'react';
import { Checkbox, Layout } from 'antd';
import { Content, Header } from 'antd/es/layout/layout';
import CharactersTable from './components/CharactersTable';
import CharacterFilters from './components/CharacterFilters';
import { useCharacters } from './hooks/useCharacters';
import { useFavorites } from './hooks/useFavorites';
import { useFilters } from './hooks/useFilters';

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

    const {
        filters,
        updateFilter,
        resetFilters,
        hasActiveFilters,
        filteredCharacters,
    } = useFilters(characters);

    useEffect(() => {
        console.log('Characters data:', characters);
        console.log('Filtered data:', filteredCharacters);
    }, [characters, filteredCharacters]);

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

                <CharacterFilters
                    characters={characters}
                    filters={filters}
                    updateFilter={updateFilter}
                    resetFilters={resetFilters}
                    hasActiveFilters={hasActiveFilters}
                />

                <CharactersTable
                    characters={characters}
                    filteredCharacters={filteredCharacters}
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
