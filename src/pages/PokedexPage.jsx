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
 * **Responsabilidades:**
 * 1.  **Orquestación:** Coordina y conecta los hooks de features (`usePokemon`, `useSearch`, `usePagination`) con la UI.
 * 2.  **Gestión de Datos:** Recupera y procesa la lista de Pokémon usando selectores memoizados.
 * 3.  **Composición:** Ensambla la estructura visual de la página principal.
 *
 * **Efectos Secundarios:**
 * - Despacha la acción de carga de Pokémon (`fetchPokemons`) cada vez que cambia la página actual.
 *
 * @returns {JSX.Element} El layout completo y funcional de la página Pokédex.
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
