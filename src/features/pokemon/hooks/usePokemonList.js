import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPokemons } from "@/features/pokemon";
import { selectProcessedPokemons } from "@/entities/pokemon/model/selectors";

/**
 * @hook usePokemonList
 * @description
 * Patrón Fachada: Aísla la lógica de carga, paginación y filtrado de la lista de Pokémon.
 * Evita que el componente de UI maneje el estado de carga y la orquestación de la API.
 */
export const usePokemonList = () => {
    const dispatch = useDispatch();
    
    // Acceso al estado global mediante el selector de dominio
    const pokemons = useSelector(selectProcessedPokemons);
    const { isLoading, error, totalCount } = useSelector((state) => state.pokemon);

    const loadPokemons = useCallback((params) => {
        dispatch(fetchPokemons(params));
    }, [dispatch]);

    return {
        pokemons,
        isLoading,
        error,
        totalCount,
        loadPokemons,
    };
};
