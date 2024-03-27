import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';

import Pokemon from './Pokemon';
import Search from './Search';
//import RandomPokemon from './RandomPokemon';

import '../styles/Home.scss';

/* API documentation
** https://pokeapi.co/docs/v2
*/

const Home = () => {
    const [pokemon, setPokemon] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchResults, setSearchResults] = useState([]);

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
        console.log('fetch data from web service');
        fetchDataFromAPI();
    }, []);

    const handleSearchResults = (results) => {
        setSearchResults(results);
    };

    return (
        <div className="container-main">
            <h2> Home </h2>

            <div className="container-subsection">
                <div className="pokemon-display-list">
                    {/* Pokemon results here */}
                    <Pokemon id="151" />
                    <Pokemon id="150" />
                    {/* 
                        <RandomPokemon />
                        Work in progress
                    */}
                </div>
            </div>

            <div className="container-subsection">
                <h3>Get a random Pokémon!</h3>
                <Button type="button" className="btn btn-primary">
                    Click me
                </Button>
            </div>

            <div className="container-subsection">
                {/*  fix ui here | wip  */}
                <div className="container-subsection">
                    <Search onSearch={handleSearchResults} searchResults={searchResults} />

                    {searchResults.length > 0 && (
                        <div className="search-results">
                            <h3>Search Results:</h3>
                            {searchResults.map((result) => (
                                <Pokemon key={result.id} id={result.id} />
                            ))}
                        </div>
                    )}
                </div>
                <form className="container-form">

                    <label>Type:</label>
                    <select id="pokemon_type">
                        <option>Normal</option>
                        <option>Fire</option>
                        <option>Water</option>
                        <option>Electric</option>
                        <option>Grass</option>
                        <option>Ice</option>
                        <option>Fighting</option>
                        <option>Poison</option>
                        <option>Ground</option>
                        <option>Flying</option>
                        <option>Psychic</option>
                        <option>Bug</option>
                        <option>Rock</option>
                        <option>Ghost</option>
                        <option>Dragon</option>
                        <option>Dark</option>
                        <option>Steel</option>
                        <option>Fairy</option>
                    </select>

                    <label>Generation:</label>
                    <select id="pokemon_generation">
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                        <option>6</option>
                        <option>7</option>
                        <option>8</option>
                        <option>9</option>
                    </select>
                </form>
            </div>
        </div>
    );
};

export default Home;
