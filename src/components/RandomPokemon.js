import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Pokemon from './Pokemon';
import axios from 'axios';

import '../styles/RandomPokemon.scss';

const RandomPokemon = () => {
  const [randomId, setRandomId] = useState(null);

  const fetchRandomPokemonId = () => {
    const newRandomId = Math.floor(Math.random() * 1205) + 1;
    setRandomId(newRandomId);
  };

  const handleButton = () => {
    fetchRandomPokemonId();
  };

  return (
    <div>
      {randomId && <Pokemon key={randomId} id={randomId} className="random-pokemon-button" />}
      <Button variant="primary" onClick={handleButton}>
        Get Random Pokémon
      </Button>
    </div>
  );
};

export default RandomPokemon;
