import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPokemons as fetchPokemonsThunk } from "@/features/pokemon/state/pokemonSlice";

/**
 * @typedef {import('@/features/pokemon/state/pokemonSlice').Pokemon} Pokemon
 */

/**
 * @typedef {object} PokemonState
 * @property {Pokemon[]} pokemons - La lista de Pokémon obtenida del estado de Redux.
 * @property {boolean} isLoading - Indica si la petición de Pokémon está en curso.
 * @property {boolean} isError - Indica si ha ocurrido un error durante la petición.
 * @property {string|null} error - El mensaje de error, si existe.
 * @property {number} totalCount - El número total de Pokémon disponibles en la API.
 * @property {function(): void} fetchPokemons - Función para disparar la carga de Pokémon para la página actual.
 */

/**
 * Hook personalizado `usePokemon`.
 *
 * **Funcionalidad:**
 * * Encapsula la interacción con el slice de Redux `pokemonSlice`.
 * * Expone selectores de estado (lista, loading, errores) y acciones de carga.
 * * Sirve como fachada para evitar que los componentes accedan directamente a `useDispatch` o `useSelector` para esta feature.
 *
 * **Flujo de interacción / ejecución:**
 * 1. Lee el estado actual (`pokemons`, `isLoading`, etc.) mediante `useSelector`.
 * 2. Prepara la función `fetchPokemons` memoizada para ser consumida por componentes.
 * 3. Al invocar `fetchPokemons`, despacha la acción asíncrona (thunk) usando los parámetros de paginación actuales.
 *
 * **Estado y efectos secundarios:**
 * * Lee del estado global.
 * * Despacha acciones que causan efectos secundarios de red (API calls).
 *
 * @returns {PokemonState} Objeto con estado y acciones de la feature Pokémon.
 */
export const usePokemon = () => {
    const dispatch = useDispatch();

    // Selecciona los datos crudos del slice de Pokémon
    const {
        pokemons,
        isLoading,
        isError,
        error,
        totalCount,
    } = useSelector((state) => state.pokemon);

    /**
     * Dispara el thunk `fetchPokemonsThunk` con los parámetros de paginación
     * proporcionados.
     * @param {object} params - Parámetros de paginación.
     * @param {number} params.page - La página a solicitar.
     * @param {number} params.limit - El número de items por página.
     */
    const fetchPokemons = useCallback(({ page, limit = 20 }) => {
        dispatch(
            fetchPokemonsThunk({ page, limit }),
        );
    }, [dispatch]);

    return {
        pokemons,
        isLoading,
        isError,
        error,
        totalCount,
        fetchPokemons,
    };
};
