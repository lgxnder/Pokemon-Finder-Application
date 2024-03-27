/*
** TODO:
** - Implement Bootstrap
** - Refine scss, ui & style
** - Utilize ListGroup for making About pages similar to Launch pages from the class example
** - Implement Routing with ListGroup^
** - Implement Bootstrap Containers
*/

import {useEffect, useState} from 'react'
import axios from 'axios'
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Pokemon from './Pokemon';
import RandomPokemon from './RandomPokemon';

import '../styles/Home.scss'

/* API documentation
** https://pokeapi.co/docs/v2
*/

const Home = () => {

    const [pokemon, setPokemon] = useState([])
    const [loading, setLoading] = useState(true)

    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const fetchDataFromAPI = async () => {
        try {
            const apiURL = "https://pokeapi.co/api/v2/pokemon";
            const response = await axios.get(apiURL);
            setPokemon(response.data.results);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
        }
    };

    useEffect( () => {
        console.log(`fetch data from web service`);
        fetchDataFromAPI();
    }, [])

    const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value);
    };
      
    const handleSearchSubmit = async (event) => {
        event.preventDefault();
      
        try {
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${searchQuery}`);
            setSearchResults([response.data]);
        } catch (error) {
            console.error('Error fetching data:', error);
            setSearchResults([]);
        }
    };
      

    return(
        <div className='container-main'>
            <h2> Home </h2>
            
            <div className='container-subsection'>
                <div className='pokemon-display-list'>
                    {/* Pokemon results here */}
                    <Pokemon id="151" />
                    <Pokemon id='150' />
                    {/* 
                        <RandomPokemon />
                        Work in progress
                    */}
                </div>
            </div>

            <div className='container-subsection'>
                <h3>Get a random Pokémon!</h3>
                <Button type="button" class="btn btn-primary">Click me</Button>
            </div>

            <div className='container-subsection'>
                <h3>Search for a Pokémon!</h3>
                    <form className='container-form'>
                        <label>Name:</label>
                        <input type='text' id='pokemon_name'/>

                        <label></label>
                        <label></label>

                        <label>Type:</label>
                        <select id='pokemon_type'>
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
                        <select id='pokemon_generation'>
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
                <Button type="button" class="btn btn-secondary">Search for a Pokémon</Button>
            </div>
        </div>
    )
}

export default Home;