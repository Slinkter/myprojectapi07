import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "@/features/favorites/favoritesSlice";

export const useFavorites = () => {
    const dispatch = useDispatch();
    const favoriteIds = useSelector((state) => state.favorites.favoriteIds);

    const togglePokemonFavorite = useCallback(
        (pokemonId) => {
            dispatch(toggleFavorite(pokemonId));
        },
        [dispatch]
    );

    return {
        favoriteIds,
        togglePokemonFavorite,
    };
};
