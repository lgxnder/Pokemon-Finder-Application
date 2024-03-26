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
import { Link } from 'react-router-dom';
import Pokemon from './Pokemon';

import '../styles/Home.scss'

/* API documentation
** https://pokeapi.co/docs/v2
**
** API pokemon example
** https://pokeapi.co/api/v2/pokemon/ditto
**      OR, using ditto's id:
** https://pokeapi.co/api/v2/pokemon/132
**
** Pokemon's ids (1-1025) can be used instead of their name.  
** 
*/

const Home = () => {

    const [pokemon, setPokemon] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchDataFromAPI = () => {
        try{
            let apiURL = "https://pokeapi.co/api/v2/pokemon"

            axios.get(apiURL)
            .then(response => {
                console.log(`response from API : ${JSON.stringify(response.data)}`);
                if (response.data !== undefined){
                    setPokemon(response.data)
                    setLoading(false)
                }else{
                    console.log(`No data provided from API`);
                    setLoading(false)
                }
                
            })
            .catch(err => {
                console.error(`Cannot access the data from API : ${err}`);
                setLoading(false)
            })

        }catch(error){
            console.error(`Error while fetching data from API : ${error}`);
            setLoading(false)
        }
    }

    useEffect( () => {
        console.log(`fetch data from web service`);
        fetchDataFromAPI();
    }, [])

    function generateRandomID() {
        // rng for random pokemon button
        // id is 1-1025
    }

    {/*  Route based on pokemon id (int)  */}

    return(
        <div>
            <div class='container'>
                <h2> Home </h2>
            
                {/* Enter information retrieved from API here */}
                <Pokemon id="220" />
                {/* List as many pokemon that fit the
                    search criteria  */}
                {/* For each pokemon, clicking on their
                    name will route the user to an About
                    section.
                    This About section will have more
                    info about the pokemon.  */}
            </div>

            <div class='container'>
                <button>Find a random Pokémon!</button>
                {/*  Utilize Math library for random id (see function generateRandomID)*/}
            </div>

            <div class='container'>
                <h3>Search for a Pokémon!</h3>
                    <form>
                        <label>Name:</label>
                        <input type='text' id='pokemon_name'/>

                        <label>Type:</label>
                        <select id='pokemon_type'>
                            {/*  Maybe turn into a checkbox instead for pokemon with multiple types?
                                 Maybe the multiple choices are not needed?  */}
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

                        {/*  Add more search fields here  */}

                        <br></br>
                        <button>Search for Pokémon</button>
                    </form>
            </div>
        </div>
    )
}

export default Home;