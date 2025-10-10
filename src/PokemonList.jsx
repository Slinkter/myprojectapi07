import PokemonCard from "./PokemonCard"; // Corrected path
import PropTypes from "prop-types";

/**
 * @typedef {Object} PokemonListProps
 * @property {Array<Object>} pokemons - An array of pokemon objects to display.
 */

/**
 * PokemonList component displays a grid of Pokemon cards.
 * It acts as a widget that composes multiple PokemonCard entities.
 * @param {PokemonListProps} props - The component props.
 * @returns {JSX.Element} The PokemonList component.
 */
const PokemonList = ({ pokemons }) => {
    return (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center">
            {pokemons.map((pokemon) => (
                <PokemonCard key={pokemon.id} pokemon={pokemon} />
            ))}
        </section>
    );
};

PokemonList.propTypes = {
    pokemons: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default PokemonList;
