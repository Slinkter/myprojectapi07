import { memo, useMemo } from "react";
import PropTypes from "prop-types";
import PokemonCard from "@/features/pokemon/components/PokemonCard";

const getPokemonImage = (pokemon) => 
    pokemon.sprites?.other?.["official-artwork"]?.front_default 
    || pokemon.sprites?.front_default 
    || "";

const PokemonList = memo(({ pokemons }) => {
    const pokemonCards = useMemo(() =>
        pokemons.map((pokemon, index) => (
            <PokemonCard
                index={index}
                key={pokemon.id}
                id={pokemon.id}
                name={pokemon.name}
                types={pokemon.types}
                favorite={pokemon.favorite || false}
                image={getPokemonImage(pokemon)}
            />
        )),
        [pokemons]
    );

    return (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 md:gap-6 px-2 sm:px-4">
            {pokemonCards}
        </div>
    );
}, (prevProps, nextProps) => {
    return prevProps.pokemons.length === nextProps.pokemons.length &&
        prevProps.pokemons.every((p, i) => p.id === nextProps.pokemons[i]?.id);
});

PokemonList.displayName = "PokemonList";

PokemonList.propTypes = {
    pokemons: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
            name: PropTypes.string.isRequired,
            sprites: PropTypes.object,
            types: PropTypes.arrayOf(
                PropTypes.oneOfType([
                    PropTypes.string,
                    PropTypes.shape({
                        type: PropTypes.shape({
                            name: PropTypes.string,
                        }),
                    }),
                    PropTypes.shape({
                        name: PropTypes.string,
                    }),
                ]),
            ),
            favorite: PropTypes.bool,
        }),
    ).isRequired,
};

export default PokemonList;
