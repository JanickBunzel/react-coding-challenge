import { useEffect } from 'react';
import CharactersTable from './components/CharactersTable';
import { useCharacters } from './hooks/useCharacters';

function App() {
    const { characters } = useCharacters({ first: 10 });

    useEffect(() => {
        if (characters) {
            console.log('Characters data:', characters);
        }
    }, [characters]);

    return (
        <CharactersTable
            characters={characters}
            loading={characters.length === 0}
        />
    );
}

export default App;
