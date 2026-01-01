
import PropTypes from 'prop-types';
import PokemonCard from '@/components/pokemon/PokemonCard';
import { Box } from '@mui/material';

const PokemonList = ({ pokemons }) => {
  return (
    <Box
      sx={{
        display: 'grid',
        gap: { xs: 2, md: 3 }, // 16px or 24px gap
        // Adhering to the new mandatory grid rules
        gridTemplateColumns: {
          xs: 'repeat(1, 1fr)', // mobile: 1 column
          sm: 'repeat(2, 1fr)', // tablet: 2 columns
          md: 'repeat(3, 1fr)', // desktop: 3 columns
          lg: 'repeat(4, 1fr)', // large desktop: 4 columns
        },
      }}
    >
      {pokemons.map((pokemon, index) => (
        <PokemonCard
          key={pokemon.id}
          id={pokemon.id}
          name={pokemon.name}
          image={pokemon.sprites.other['official-artwork'].front_default}
          types={pokemon.types} // Pass the new types prop
          favorite={pokemon.favorite || false}
          index={index}
        />
      ))}
    </Box>
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
