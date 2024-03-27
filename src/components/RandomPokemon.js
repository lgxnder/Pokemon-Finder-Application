import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Pokemon from './Pokemon';

const RandomPokemon = () => {
    const [randomID, setRandomID] = useState(null);
    const [loading, setLoading] = useState(false);
    const [pokemon, setPokemon] = useState(null);

    const fetchPokemonInfo = () => {
        try{
            let apiURL = `https://pokeapi.co/api/v2/pokemon/${randomID}`

            axios.get(apiURL)
            .then(response => {
                console.log(`response from API : ${JSON.stringify(response.data)}`);
                if (response.data !== undefined){
                    setPokemon(response.data);
                    setLoading(false);
                }else{
                    console.log(`No data provided from API`);
                }
                
            })
            .catch(err => {
                console.error(`Cannot access the data from API : ${err}`);
            })

        }catch(error){
            console.error(`Error while fetching data from API : ${error}`);
        }
    }

    const generateRandomID = () => {
        return Math.floor(Math.random() * 1025) + 1;
    }

    const handleRandomPokemon = () => {
        const id = generateRandomID();
        console.log("Random ID:", id); 
        setRandomID(id);
    }

    return (
        
        <div>
            <button onClick={handleRandomPokemon}>Find a random Pokémon!</button>
            {loading ? <p>Loading...</p> : <Pokemon data={pokemon} />}
        </div>
    );
}

export default RandomPokemon;