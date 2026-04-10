import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "@/features/favorites";
import { selectPokemonById } from "@/features/pokemon/state/pokemonSelectors";

/**
 * @hook usePokemonCard
 * @description
 * Patrón Fachada (Facade): Aísla la lógica de estado y acciones de la UI de la tarjeta.
 * El componente PokemonCard no sabe que existe Redux, solo consume este hook.
 * 
 * @param {number} pokemonId - El ID del Pokémon para el cual obtener el estado.
 * @returns {{
 *   pokemon: object|null,
 *   isFavorite: boolean,
 *   onToggleFavorite: (e: Event) => void
 * }}
 */
export const usePokemonCard = (pokemonId) => {
    const dispatch = useDispatch();
    
    // Optimización: usa selector parametrizado para evitar find() O(n) en cada render
    const pokemon = useSelector(selectPokemonById(pokemonId));
    const isFavorite = pokemon?.favorite || false;

    const onToggleFavorite = useCallback((e) => {
        if (e && e.stopPropagation) e.stopPropagation();
        if (e && e.preventDefault) e.preventDefault();
        
        dispatch(toggleFavorite(pokemonId));
    }, [pokemonId, dispatch]);

    return {
        pokemon,
        isFavorite,
        onToggleFavorite,
    };
};