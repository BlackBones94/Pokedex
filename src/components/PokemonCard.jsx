import React from 'react';
import capitalizeFirstLetter from '../utils/Capitalize';
import '../style/PokemonCard.css';
import '../style/PokemonType.css';

const PokemonCard = ({ pokemon }) => {

  const typeClass = pokemon.types.length > 0 ? `pokemon-card ${pokemon.types[0]}-type` : 'pokemon-card';

  const MAX_DESCRIPTION_LENGTH = 70; 

  const attacks = pokemon.moves.slice(0, 3).map((move, index) => {
    const truncatedDescription = move.description.length > MAX_DESCRIPTION_LENGTH
      ? move.description.substring(0, MAX_DESCRIPTION_LENGTH) + '...'
      : move.description;

    return (
      <div key={index} className="pokemon-attack">
        <span className="attack-name">{capitalizeFirstLetter(move.name)}: </span>
        <span className="attack-description">{truncatedDescription}</span>
      </div>
      
    );
  });

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const { left, top, width, height } = card.getBoundingClientRect();
    const x = (e.clientX - (left + width / 2)) / width * 2;
    const y = (e.clientY - (top + height / 2)) / height * 2;

    const rotateX = -y * 15; // Limiter la rotation pour éviter l'exagération
    const rotateY = x * 15;

    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  // Gestionnaire pour réinitialiser la position de la carte
  const handleMouseOut = (e) => {
    e.currentTarget.style.transform = 'rotateX(0) rotateY(0)';
  };

  return (
    <div onMouseMove={handleMouseMove} onMouseOut={handleMouseOut}>
      <div className={typeClass}>
        <div className='top-card'>
          <h2 className="pokemon-name">{capitalizeFirstLetter(pokemon.name)}</h2>
          <p className='hp'>{pokemon.hp} HP</p>
        </div>
        <img src={pokemon.image} alt={pokemon.name} className="pokemon-image"/>
        <div className="pokemon-details">
          <div className='characteristic'>
            <p>Type: {pokemon.types.join(' / ')}</p>
            <p>Poids: {pokemon.weight / 10} kg</p>
            <p>Taille: {pokemon.height / 10} m</p>
          </div>
          <div className="pokemon-attacks">
            {attacks}
          </div>
        </div>
      </div>
    </div>
  );
};


export default PokemonCard;