import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

const Search = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState('');
  const [searchGeneration, setSearchGeneration] = useState('');

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleTypeChange = (event) => {
    setSearchType(event.target.value);
  };

  const handleGenerationChange = (event) => {
    setSearchGeneration(event.target.value);
  };

  const handleSearchSubmit = async (event) => {
    event.preventDefault();

    try {
        let searchURL = `https://pokeapi.co/api/v2/pokemon/`;
        if (searchQuery) {
            searchURL += `${searchQuery.toLowerCase()}`;
        } else {
            if (searchType) {
                searchURL += `?type=${searchType}`;
            }
            if (searchGeneration) {
                searchURL += `?generation=${searchGeneration}`;
            }
        }
        const response = await axios.get(searchURL);
        onSearch(response.data.results);
      } catch (error) {
        console.error('Error fetching data:', error);
        onSearch([]);
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
            
            <label>Type:</label>
            <select id='pokemon_type' onChange={handleTypeChange}>
                <option value=''>Any</option>
                <option value='normal'>Normal</option>
                <option value='fire'>Fire</option>
                <option value='water'>Water</option>
                <option value='electric'>Electric</option>
                <option value='grass'>Grass</option>
                <option value='ice'>Ice</option>
                <option value='fighting'>Fighting</option>
                <option value='poison'>Poison</option>
                <option value='ground'>Ground</option>
                <option value='flying'>Flying</option>
                <option value='psychic'>Psychic</option>
                <option value='bug'>Bug</option>
                <option value='rock'>Rock</option>
                <option value='ghost'>Ghost</option>
                <option value='dragon'>Dragon</option>
                <option value='dark'>Dark</option>
                <option value='steel'>Steel</option>
                <option value='fairy'>Fairy</option>
            </select>

            <label>Generation:</label>
                <select id='pokemon_generation' onChange={handleGenerationChange}>
                <option value=''>Any</option>
                <option value='1'>1</option>
                <option value='2'>2</option>
                <option value='3'>3</option>
                <option value='4'>4</option>
                <option value='5'>5</option>
                <option value='6'>6</option>
                <option value='7'>7</option>
                <option value='8'>8</option>
                <option value='9'>9</option>
            </select>

        <Button type="submit" className="btn btn-secondary">Search for a Pokémon</Button>
      </form>
    </div>
  );
};

export default Search;
