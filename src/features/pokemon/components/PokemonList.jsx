
import PropTypes from 'prop-types';
import PokemonCard from '@/features/pokemon/components/PokemonCard';

/**
 * A component that displays a grid of Pokémon cards.
 * @param {object} props - The component props.
 * @param {Array<object>} props.pokemons - The list of Pokémon to display.
 * @returns {JSX.Element} The rendered list of Pokémon cards.
 */
const PokemonList = ({ pokemons }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
      {pokemons.map((pokemon, index) => (
        <PokemonCard
          key={pokemon.id}
          id={pokemon.id}
          name={pokemon.name}
          image={pokemon.sprites.other['official-artwork'].front_default}
          types={pokemon.types}
          favorite={pokemon.favorite || false}
          index={index}
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
            front_default: PropTypes.string,
          }).isRequired,
        }).isRequired,
      }).isRequired,
      types: PropTypes.arrayOf(
        PropTypes.shape({
          type: PropTypes.shape({
            name: PropTypes.string.isRequired,
          }).isRequired,
        })
      ).isRequired,
      favorite: PropTypes.bool,
    })
  ).isRequired,
};

export default PokemonList;
