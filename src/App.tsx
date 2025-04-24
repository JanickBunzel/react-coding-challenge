import { useMemo } from 'react';
import { Button, Layout, Space, Tooltip } from 'antd';
import { Content, Header } from 'antd/es/layout/layout';
import Title from 'antd/es/typography/Title';
import CharactersTable from '@/components/CharactersTable';
import CharacterFilters from '@/components/characterFilters/CharacterFilters';
import { useCharacters } from '@/hooks/useCharacters';
import { useFilters } from '@/hooks/useFilters';

function App() {
    const { filters, updateFilter, resetFilters, hasActiveFilters, filterCharacters } = useFilters();

    const { characters, loadingInitial, loadingNext, pageInfo, loadMore } = useCharacters();

    const displayedCharacters = useMemo(() => filterCharacters(characters), [characters, filterCharacters]);

    return (
        <Layout>
            <Header>
                <Title level={1} className="text-center">
                    Star Wars Character reference book
                </Title>
            </Header>

            <Content>
                <CharacterFilters
                    filters={filters}
                    updateFilter={updateFilter}
                    resetFilters={resetFilters}
                    hasActiveFilters={hasActiveFilters}
                />

                <CharactersTable displayedCharacters={displayedCharacters} loadingInitial={loadingInitial} />

                <Space className="characters-book-info">
                    <span>
                        Showing {displayedCharacters.length}
                        {displayedCharacters.length < characters.length ? ` out of ${characters.length} ` : ' '}
                        Characters
                    </span>

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
                </Space>
            </Content>
        </Layout>
    );
}

export default App;
