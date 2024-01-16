import React, { useState, useEffect } from 'react';
import { getPokemonDetails } from '../api/PokemonAPI';
import PokemonCard from './PokemonCard';

const PokemonList = () => {
    const [pokemons, setPokemons] = useState([]);
  
    useEffect(() => {
      const fetchPokemonDetails = async () => {
        const details = await getPokemonDetails();
        setPokemons(details);
      };
  
      fetchPokemonDetails();
    }, []);
  
    return (
      <div>
        <h1>Liste des Pokémon</h1>
        <div className="pokemon-grid"> 
          {pokemons.map((pokemon, index) => (
            <PokemonCard key={index} pokemon={pokemon} hp={pokemon.hp} type={pokemon.types}/>
          ))}
        </div>
      </div>
    );
};

export default PokemonList;