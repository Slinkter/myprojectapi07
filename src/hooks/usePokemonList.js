import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { setPokemons, setSearchFilter } from "../store/slices/dataSlice";
import { getPokemonList } from "../services/pokemonService";

export const usePokemonList = () => {
    const dispatch = useDispatch();

    const fetchPokemons = useCallback(async () => {
        try {
            const pokemonData = await getPokemonList();
            dispatch(setPokemons(pokemonData));
        } catch (error) {
            console.error("Error fetching Pokemon:", error);
        }
    }, [dispatch]);

    const filterPokemons = useCallback(
        (searchTerm) => {
            dispatch(setSearchFilter(searchTerm.toLowerCase()));
        },
        [dispatch]
    );

    return { fetchPokemons, filterPokemons };
};
