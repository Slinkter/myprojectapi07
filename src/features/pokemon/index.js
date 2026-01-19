/**
 * @module pokemon-feature
 * @description
 * Este archivo (conocido como "barrel file") es el punto de entrada público para la "feature" de Pokémon.
 *
 * **Propósito:**
 * Re-exporta de manera selectiva los componentes, hooks y lógica de estado más importantes
 * de este módulo, ocultando la estructura interna de carpetas al resto de la aplicación.
 *
 * **Ventajas:**
 * - **Encapsulación:** Permite cambiar la estructura de archivos interna de la feature sin
 *   romper las importaciones en otras partes del código.
 * - **Importaciones Simplificadas:** Permite a los consumidores importar todo lo relacionado
 *   con Pokémon desde una única ubicación. Por ejemplo:
 *   `import { usePokemon, PokemonCard, selectProcessedPokemons } from '@/features/pokemon';`
 */

// Export hooks
export { usePokemon } from "./hooks/usePokemon";

// Export components (PascalCase as per convention)
export { default as PokemonContent } from "./components/PokemonContent";
export { default as PokemonCard } from "./components/PokemonCard";
export { default as PokemonList } from "./components/PokemonList";
export { default as PokemonSkeleton } from "./components/PokemonSkeleton";
export { default as PokedexHeader } from "./components/PokedexHeader";

// Export state logic and selectors
export { default as pokemonReducer, fetchPokemons } from "./state/pokemonSlice";
export { selectProcessedPokemons } from "./state/pokemonSelectors";
