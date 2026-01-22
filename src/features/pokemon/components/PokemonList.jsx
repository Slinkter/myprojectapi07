import PropTypes from "prop-types";
import PokemonCard from "@/features/pokemon/components/PokemonCard";

/**
 * @component PokemonList
 * @description Un componente de presentación que renderiza una lista de Pokémon en una cuadrícula.
 *
 * **Responsabilidades:**
 * 1. **Iteración de Datos:** Recorre la lista de Pokémon y genera un componente `PokemonCard` por cada elemento.
 * 2. **Layout:** Define la estructura de cuadrícula (grid) responsiva.
 *
 * **Efectos Secundarios:**
 * - No tiene efectos secundarios a otros archivos o funciones (es un componente puro de presentación).
 *
 * @param {object} props - Las props del componente.
 * @param {Array<object>} props.pokemons - La lista de objetos Pokémon a mostrar. Cada objeto debe
 * contener los datos necesarios para el componente `PokemonCard` (id, name, sprites, types, favorite).
 * @returns {JSX.Element} Un elemento `div` que contiene la cuadrícula de tarjetas de Pokémon.
 */
const PokemonList = ({ pokemons }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
            {pokemons.map((pokemon, index) => (
                <PokemonCard
                    index={index}
                    key={pokemon.id}
                    id={pokemon.id}
                    name={pokemon.name}
                    types={pokemon.types}
                    favorite={pokemon.favorite || false}
                    image={
                        pokemon.sprites.other["official-artwork"].front_default
                    }
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
                    "official-artwork": PropTypes.shape({
                        front_default: PropTypes.string,
                    }).isRequired,
                }).isRequired,
            }).isRequired,
            types: PropTypes.arrayOf(
                PropTypes.shape({
                    type: PropTypes.shape({
                        name: PropTypes.string.isRequired,
                    }).isRequired,
                }),
            ).isRequired,
            favorite: PropTypes.bool,
        }),
    ).isRequired,
};

export default PokemonList;
