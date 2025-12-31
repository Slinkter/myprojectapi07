import PokemonCard from '@/components/pokemon/PokemonCard';
import PropTypes from 'prop-types';

const PokemonList = ({ pokemons }) => {
  return (
    <div className="grid grid-cols-2 gap-4 p-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {pokemons.map((pokemon) => (
        <PokemonCard
          key={pokemon.id}
          id={pokemon.id}
          name={pokemon.name}
          image={pokemon.sprites.other['official-artwork'].front_default}
          favorite={pokemon.favorite || false} // Se pasa el estado de favorito
        />
      ))}
    </div>
  );
};

PokemonList.propTypes = {
  pokemons: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      sprites: PropTypes.shape({
        other: PropTypes.shape({
          'official-artwork': PropTypes.shape({
            front_default: PropTypes.string.isRequired,
          }).isRequired,
        }).isRequired,
      }).isRequired,
      favorite: PropTypes.bool,
    })
  ).isRequired,
};

export default PokemonList;
