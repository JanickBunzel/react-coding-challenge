import { useEffect } from 'react';
import { useCharacters } from './hooks/useCharacters';

function App() {
    const { characters } = useCharacters({ first: 10 });

    useEffect(() => {
        if (characters) {
            console.log('Characters data:', characters);
        }
    }, [characters]);

    return (
        <ul>
            {characters.map((character) => (
                <li key={character.id}>{character.name}</li>
            ))}
        </ul>
    );
}

export default App;
