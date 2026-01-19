import { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { usePokemon, PokedexHeader, PokemonContent } from "@/features/pokemon";
import { usePagination } from "@/shared/hooks/usePagination";
import { SearchBar } from "@/features/search";
import { FavoritesBar } from "@/features/favorites";
import Pagination from "@/components/common/Pagination";
import { selectProcessedPokemons } from "@/features/pokemon/state/pokemonSelectors";

/**
 * Componente PokedexPage (Orquestador).
 *
 * **Funcionalidad:**
 * * Actúa como el controlador principal de la vista de Pokédex.
 * * Orquesta la obtención de datos y delega la lógica de negocio y de presentación.
 *
 * **Flujo de interacción / ejecución:**
 * 1. Inicializa hooks para la paginación (`usePagination`) y para obtener acciones de pokemon (`usePokemon`).
 * 2. Utiliza `useSelector` con un selector memoizado (`selectProcessedPokemons`) para obtener la lista de Pokémon ya procesada (con favoritos y filtro de búsqueda aplicados).
 * 3. `useEffect` dispara `fetchPokemons` cada vez que cambia la página actual.
 * 4. `useMemo` (`favoritePokemons`) deriva una sub-lista solo con los favoritos para la barra superior.
 * 5. Pasa los datos procesados a los componentes presentacionales hijos.
 *
 * @returns {JSX.Element} Layout completo de la página principal.
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

