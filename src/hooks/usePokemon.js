import { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchPokemons as fetchPokemonsThunk,
    setSearchFilter,
    setFavorite,
} from "../features/pokemon/pokemonSlice";

export const usePokemon = () => {
    const dispatch = useDispatch();
    const { pokemons, searchFilter, isLoading, error } = useSelector(
        (state) => state.pokemon
    );

    const fetchPokemons = useCallback(async () => {
        // Use the async thunk from the slice
        dispatch(fetchPokemonsThunk());
    }, [dispatch]);

    const filterPokemons = useCallback(
        (searchTerm) => {
            dispatch(setSearchFilter(searchTerm));
        },
        [dispatch]
    );

    const togglePokemonFavorite = useCallback(
        (pokemonId) => {
            dispatch(setFavorite({ pokemonId }));
        },
        [dispatch]
    );

    const filteredPokemons = useMemo(() => {
        if (!searchFilter) return pokemons;
        return pokemons.filter((p) =>
            p.name.toLowerCase().includes(searchFilter)
        );
    }, [pokemons, searchFilter]);

    const favoritePokemons = useMemo(
        () => pokemons.filter((p) => p.favorite),
        [pokemons]
    );

    return {
        pokemons,
        searchFilter,
        isLoading,
        error,
        fetchPokemons,
        filterPokemons,
        togglePokemonFavorite,
        filteredPokemons,
        favoritePokemons,
    };
};
