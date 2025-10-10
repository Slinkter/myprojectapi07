import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPokemons as fetchPokemonsThunk, setPage } from "../features/pokemon/pokemonSlice";

export const usePokemon = () => {
    const dispatch = useDispatch();
    const { pokemons, isLoading, error, currentPage, itemsPerPage, totalCount } = useSelector(
        (state) => state.pokemon
    );

    const fetchPokemons = useCallback(async () => {
        dispatch(fetchPokemonsThunk({ page: currentPage, limit: itemsPerPage }));
    }, [dispatch, currentPage, itemsPerPage]);

    const goToPage = useCallback((pageNumber) => {
        dispatch(setPage(pageNumber));
    }, [dispatch]);

    const totalPages = Math.ceil(totalCount / itemsPerPage);

    return {
        pokemons,
        isLoading,
        error,
        fetchPokemons,
        currentPage,
        itemsPerPage,
        totalCount,
        totalPages,
        goToPage,
    };
};
