import { useState } from 'react';
import axios from 'axios';
import Alert from 'react-bootstrap/Alert';

const Search = ({ onSearch, isRandomPokemon }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [invalidPokemon, setInvalidPokemon] = useState(false);

    const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value);
        setInvalidPokemon(false);
    };

    const handleSearchSubmit = async (event) => {
        event.preventDefault();

        try {
            const searchURL = `https://pokeapi.co/api/v2/pokemon/${searchQuery.toLowerCase()}`;
            const response = await axios.get(searchURL);
            onSearch([response.data]);
            setInvalidPokemon(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            onSearch([]);
            setInvalidPokemon(true);
        }
    };

    return (
        <div>
            <h3>Search for a Pokémon!</h3>
            <form className='container-form' onSubmit={handleSearchSubmit}>
                <label>Name:</label>
                <input
                    type='text'
                    id='pokemon_name'
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                />
                <button type="submit" className="btn btn-secondary">
                    Search for Pokémon
                </button>
            </form>
            {invalidPokemon && (
                <Alert variant="danger" className="mt-3">
                    Invalid Pokémon name. <br></br>Please ensure that your Pokémon name is spelled correctly.
                </Alert>
            )}
        </div>
    );
};

export default Search;
