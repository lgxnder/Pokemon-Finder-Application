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
    const [onSearch, setOnSearch] = useState('');

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
                <Search onSearch={handleSearchResults} searchResults={searchResults} />
                
                <div className="search-results">
                    <h3>Search Results:</h3>
                    <div className='pokemon-display-list'>
                        <Pokemon id='25' />
                        {searchResults.length > 0 && (
                            searchResults.map((result) => (
                                <Pokemon key={result.id} id={result.id} />
                            ))
                        )}
                    </div>
                </div>
            </div>

            <div className="container-subsection">
                <h3>Get a random Pokémon!</h3>
                <Button type="button" className="btn btn-primary">
                    Click me
                </Button>
            </div>
        </div>
    );
};

export default Home;
