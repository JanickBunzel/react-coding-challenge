import { useEffect, useState } from 'react';
import { Checkbox, Layout } from 'antd';
import { Content, Header } from 'antd/es/layout/layout';
import CharactersTable from './components/CharactersTable';
import { useCharacters } from './hooks/useCharacters';
import { useFavorites } from './hooks/useFavorites';

function App() {
    const { characters, loading } = useCharacters({ first: 10 });
    const { favorites, toggleFavorite } = useFavorites();
    const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);

    useEffect(() => {
        if (characters.length > 0) {
            console.log('Characters data:', characters);
        }
    }, [characters]);

    return (
        <Layout className="app-container">
            <Header>
                <h1>Start Wars Character reference book</h1>
            </Header>

            <Content>
                <div className="controls">
                    <Checkbox
                        checked={showOnlyFavorites}
                        onChange={(e) => setShowOnlyFavorites(e.target.checked)}
                    >
                        Only favorites
                    </Checkbox>
                    <CharactersTable
                        characters={characters}
                        loading={loading}
                        favorites={favorites}
                        toggleFavorite={toggleFavorite}
                        showOnlyFavorites={showOnlyFavorites}
                    />
                </div>
            </Content>
        </Layout>
    );
}

export default App;
