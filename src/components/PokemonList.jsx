import React from "react";
import PokemonCard from "./PokemonCard";

import { useSelector } from "react-redux";

const PokemonList = ({ pokemons }) => {
    const searchFilter = useSelector((state) => state.data.searchFilter);

    return (
        <div className="flex  flex-row flex-wrap gap-6 justify-center items-center">
            {pokemons
                .filter((pokemon) => pokemon.name.trim().includes(searchFilter))
                .map((pokemon) => (
                    <PokemonCard key={pokemon.id} pokemon={pokemon} />
                ))}
        </div>
    );
};

export default PokemonList;
