import { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import {
  usePokemon,
  PokedexHeader,
  PokemonContent,
  selectProcessedPokemons,
} from "@/features/pokemon";
import { usePagination } from "@/shared/hooks/usePagination";
import { SearchBar } from "@/features/search";
import { FavoritesBar } from "@/features/favorites";
import Pagination from "@/components/common/Pagination";


/**
 * @component PokedexPage
 * @description
 * Componente de página que actúa como el **Orquestador** principal de la Pokédex.
 * Su responsabilidad es conectar y coordinar las diferentes _features_ (hooks, estado de Redux,
 * componentes de UI) para construir la vista completa.
 *
 * **Flujo de Orquestación:**
 * 1.  **Consume Hooks:** Llama a `usePokemon` y `usePagination` para obtener el estado de la API y
 *     la lógica de paginación.
 * 2.  **Selecciona Estado Procesado:** Usa `useSelector` con el selector memoizado `selectProcessedPokemons`
 *     para obtener la lista de Pokémon ya filtrada y con el estado de favorito aplicado,
 *     sin necesidad de realizar esa lógica aquí.
 * 3.  **Dispara Efectos:** Un `useEffect` observa los cambios en `currentPage` y llama a `fetchPokemons`
 *     para cargar los datos de la página correspondiente.
 * 4.  **Delega el Renderizado:** Pasa los datos y el estado (`isLoading`, `error`, `pokemons`, etc.)
 *     a componentes de presentación "tontos" que se encargan de renderizar la UI
 *     (`PokemonContent`, `FavoritesBar`, `Pagination`).
 *
 * @returns {JSX.Element} El layout completo y funcional de la página Pokédex.
 */
function PokedexPage() {
  // 1. Consumo de Hooks y Selectores
  const { totalCount, isLoading, error, fetchPokemons } = usePokemon();
  const { currentPage, totalPages, goToPage } = usePagination({ totalCount });
  
  // El selector se encarga de la lógica de negocio compleja (favoritos, búsqueda)
  const processedPokemons = useSelector(selectProcessedPokemons);

  // 2. Efecto para cargar datos
  useEffect(() => {
    fetchPokemons({ page: currentPage });
  }, [fetchPokemons, currentPage]);

  // 3. Composición de Datos Adicional (Lógica de Presentación Menor)
  const favoritePokemons = useMemo(
    () => processedPokemons.filter((p) => p.favorite),
    [processedPokemons],
  );

  // 4. Renderizado del Componente
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <div className="flex flex-col items-center space-y-12">
        <PokedexHeader />

        <div className="w-full max-w-xl">
          <SearchBar />
        </div>

        <FavoritesBar favoritePokemons={favoritePokemons} />

        <div className="w-full">
          <PokemonContent
            isLoading={isLoading}
            error={error}
            pokemons={processedPokemons}
            onRetry={() => fetchPokemons({ page: currentPage })}
          />
        </div>

        {!isLoading && !error && (
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={goToPage}
            />
        )}
      </div>
    </div>
  );
}

export default PokedexPage;

