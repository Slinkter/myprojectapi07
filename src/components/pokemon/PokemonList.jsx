import React, { Suspense, memo } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import PokemonCard from "./PokemonCard";
import { PokemonSkeleton } from "../ui/PokemonSkeleton";

const PokemonList = memo(({ pokemons }) => {
    const searchFilter = useSelector((state) => state.data.searchFilter);

    const filteredPokemons = pokemons.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchFilter.toLowerCase())
    );

    return (
        <div className="flex flex-row flex-wrap gap-6 justify-center items-center p-4">
            <Suspense
                fallback={
                    <div className="flex flex-wrap gap-6 justify-center">
                        {[...Array(12)].map((_, index) => (
                            <PokemonSkeleton key={index} />
                        ))}
                    </div>
                }
            >
                {filteredPokemons.map((pokemon) => (
                    <PokemonCard key={pokemon.id} pokemon={pokemon} />
                ))}
            </Suspense>
        </div>
    );
});

PokemonList.propTypes = {
    pokemons: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            sprites: PropTypes.shape({
                front_default: PropTypes.string.isRequired,
            }).isRequired,
            types: PropTypes.arrayOf(
                PropTypes.shape({
                    type: PropTypes.shape({
                        name: PropTypes.string.isRequired,
                    }).isRequired,
                })
            ).isRequired,
            favorite: PropTypes.bool.isRequired,
        })
    ).isRequired,
};

PokemonList.displayName = "PokemonList";
export default PokemonList;
