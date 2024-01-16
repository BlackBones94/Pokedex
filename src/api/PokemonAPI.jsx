import axios from 'axios';

export const getPokemonDetails = async () => {
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=151`);
    const pokemonDetails = await Promise.all(response.data.results.map(async (pokemon) => {
      const pokemonDetailResponse = await axios.get(pokemon.url);
      const details = pokemonDetailResponse.data;

      // Extraction des HP
      const hp = details.stats.find(stat => stat.stat.name === 'hp').base_stat;

      // Extraction des types
      const types = details.types.map(typeInfo => typeInfo.type.name);

      // URL de l'image du sprite de face
      const image = details.sprites.front_default;

      // Extraction des trois premières attaques et de leurs détails
      const moves = await Promise.all(details.moves.slice(0, 3).map(async (moveEntry) => {
        const moveResponse = await axios.get(moveEntry.move.url);
        return moveResponse.data;
      }));

      // Création d'un tableau d'objets contenant le nom de l'attaque et sa description
      const movesWithDetails = moves.map((move) => {
        const moveDescription = move.effect_entries.find(entry => entry.language.name === 'en')?.effect;
        return {
          name: move.name,
          description: moveDescription
        };
      });

      const weight = details.weight;
      const height = details.height; 

      return {
        ...details,
        hp,
        types,
        image,
        moves: movesWithDetails,
        weight,
        height
      };
    }));

    return pokemonDetails;
  } catch (error) {
    console.error('Erreur lors de la récupération des détails des Pokémon:', error);
    return [];
  }
};