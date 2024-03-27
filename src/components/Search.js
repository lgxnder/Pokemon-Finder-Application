import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

const Search = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${searchQuery.toLowerCase()}`);
      onSearch([response.data]);
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

        <Button type="submit" className="btn btn-secondary">Search for a Pokémon</Button>
      </form>
    </div>
  );
};

export default Search;
