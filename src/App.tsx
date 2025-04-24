import { useMemo } from 'react';
import { Button, Checkbox, Layout, Tooltip } from 'antd';
import { Content, Header } from 'antd/es/layout/layout';
import CharactersTable from '@/components/CharactersTable';
import CharacterFilters from '@/components/characterFilters/CharacterFilters';
import { useCharacters } from '@/hooks/useCharacters';
import { useFavorites } from '@/hooks/useFavorites';
import { useFilters } from '@/hooks/useFilters';

function App() {
    const { isFavorite, showOnlyFavorites, setShowOnlyFavorites } = useFavorites();

    const { filters, updateFilter, resetFilters, hasActiveFilters, filterCharacters } = useFilters();

    const { characters, loadingInitial, loadingNext, pageInfo, loadMore } = useCharacters();

    const displayedCharacters = useMemo(() => {
        return filterCharacters(characters).filter((character) => !showOnlyFavorites || isFavorite(character.id));
    }, [filterCharacters, characters, showOnlyFavorites, isFavorite]);

    return (
        <Layout>
            <Header>
                <h1>Star Wars Character reference book</h1>
            </Header>

            <Content>
                <Checkbox checked={showOnlyFavorites} onChange={(e) => setShowOnlyFavorites(e.target.checked)}>
                    Only favorites
                </Checkbox>

                <CharacterFilters
                    filters={filters}
                    updateFilter={updateFilter}
                    resetFilters={resetFilters}
                    hasActiveFilters={hasActiveFilters}
                />

                <CharactersTable displayedCharacters={displayedCharacters} loadingInitial={loadingInitial} />

                <Tooltip title={!pageInfo.hasNextPage ? 'All Characters loaded' : ''}>
                    <Button
                        type="primary"
                        onClick={loadMore}
                        loading={loadingNext}
                        disabled={loadingNext || !pageInfo.hasNextPage}
                    >
                        Load More
                    </Button>
                </Tooltip>

                <span>
                    Showing {displayedCharacters.length}
                    {displayedCharacters.length < characters.length ? ` out of ${characters.length} ` : ' '}
                    Characters
                </span>
            </Content>
        </Layout>
    );
}

export default App;
