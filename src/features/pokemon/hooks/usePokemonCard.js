import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "@/features/favorites";
import { selectProcessedPokemons } from "@/entities/pokemon/model/selectors";

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
    const pokemons = useSelector(selectProcessedPokemons);
    
    // Buscamos la entidad procesada en el estado global
    const pokemon = pokemons.find(p => p.id === pokemonId);
    const isFavorite = pokemon?.favorite || false;

    const onToggleFavorite = useCallback((e) => {
        // Manejo de eventos común para evitar propagación
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
