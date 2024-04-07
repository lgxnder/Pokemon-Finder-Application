import { useEffect, useState } from 'react';
import axios from 'axios';

import Pokemon from './Pokemon';
import Search from './Search';
import '../styles/Home.scss';

const Home = () => {
    const [pokemon, setPokemon] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchResults, setSearchResults] = useState([]);
    const [isRandomPokemon, setIsRandomPokemon] = useState(false);

    const fetchDataFromAPI = async () => {
        try {
            const apiURL = 'https://pokeapi.co/api/v2/pokemon';
            const response = await axios.get(apiURL);
            setPokemon(response.data.results);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDataFromAPI();
    }, []);

    const handleSearchResults = (results) => {
        setSearchResults(results);
        setIsRandomPokemon(false);
    };

    const handleRandomPokemon = async () => {
        setIsRandomPokemon(true);
        const randomId = Math.floor(Math.random() * 1205) + 1;
        try {
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
            setSearchResults([response.data]);
        } catch (error) {
            console.error('Error fetching random Pokémon:', error);
            setSearchResults([]);
        }
    };

    return (
        <div className="container-main">
            <h2> Home </h2>

            <div className="container-subsection">
                <Search onSearch={handleSearchResults} isRandomPokemon={isRandomPokemon} />

                <h5>OR</h5>
                <h4>Get a random Pokémon!</h4>
                <button type="button" onClick={handleRandomPokemon} className="btn btn-primary">
                    Click me
                </button>
                
                <div className="search-results">
                    <h3>{searchResults ? '' : 'Search Results:'}</h3>
                    <div className='pokemon-display-list'>
                        {searchResults.map((result) => (
                            <Pokemon key={result.id} id={result.id} />
                        ))}
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Home;
