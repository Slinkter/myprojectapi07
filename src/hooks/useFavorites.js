import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { setFavorite } from "../features/pokemon/pokemonSlice";

export const useFavorites = () => {
    const dispatch = useDispatch();

    const toggleFavorite = useCallback(
        (pokemonId) => {
            dispatch(setFavorite({ pokemonId }));
        },
        [dispatch]
    );

    return { toggleFavorite };
};
