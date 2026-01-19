import { useEffect, useMemo } from "react";
import { usePokemon, PokedexHeader, PokemonContent } from "@/features/pokemon";
import { useSearch } from "@/features/search";
import { useFavorites } from "@/features/favorites";
import { usePagination } from "@/shared/hooks/usePagination";
import { SearchBar } from "@/features/search";
import { FavoritesBar } from "@/features/favorites";
import Navbar from "@/components/layout/Navbar";
import {
    HiChevronLeft,
    HiChevronRight,
    HiChevronDoubleLeft,
    HiChevronDoubleRight,
} from "react-icons/hi";

/**
 * Componente PokedexPage (Orquestador).
 *
 * **Funcionalidad:**
 * * Actúa como el controlador principal de la vista de Pokédex.
 * * Centraliza la lógica de integración entre búsqueda, paginación, datos de la API y favoritos.
 * * No define UI de bajo nivel, sino que compone organismos (`PokedexHeader`, `PokemonContent`) y moléculas (`SearchBar`).
 *
 * **Flujo de interacción / ejecución:**
 * 1. Inicializa hooks de todas las features (`usePokemon`, `useSearch`, `useFavorites`, `usePagination`).
 * 2. `useEffect` dispara `fetchPokemons` cada vez que cambia la página actual.
 * 3. `useMemo` (`processedPokemons`) fusiona la lista bruta de la API con los IDs de favoritos y aplica el filtro de búsqueda.
 * 4. `useMemo` (`favoritePokemons`) deriva una sub-lista solo con los favoritos para la barra superior.
 * 5. Pasa los datos procesados a los componentes presentacionales hijos.
 *
 * **Estado y efectos secundarios:**
 * * Orquesta el fetching de datos (side effect en montaje/cambio de página).
 * * Computa datos derivados complejos para optimizar renderizados.
 *
 * @returns {JSX.Element} Layout completo de la página principal.
 */
function PokedexPage() {
    // 1. Consumo de Hooks (Obtención de estado y acciones)
    const {
        pokemons: rawPokemons,
        totalCount,
        isLoading,
        error,
        fetchPokemons,
    } = usePokemon();
    const { favoriteIds } = useFavorites();
    const { searchFilter } = useSearch();
    const { currentPage, totalPages, goToPage } = usePagination({ totalCount });

    // 2. Efecto para cargar datos
    // Dispara la carga de Pokémon cuando la página actual cambia.
    useEffect(() => {
        fetchPokemons();
    }, [fetchPokemons, currentPage]);

    // 3. Orquestación y Composición de Datos (Lógica de Presentación)
    // Utiliza useMemo para calcular la lista de Pokémon a mostrar, aplicando
    // el estado de favoritos y el filtro de búsqueda de forma eficiente.
    const processedPokemons = useMemo(() => {
        // Primero, añade el estado de 'favorite' a cada Pokémon
        const favoritedPokemons = rawPokemons.map((pokemon) => ({
            ...pokemon,
            favorite: favoriteIds.includes(pokemon.id),
        }));

        // Luego, filtra por el término de búsqueda si existe
        if (!searchFilter) {
            return favoritedPokemons;
        }
        return favoritedPokemons.filter((p) =>
            p.name.toLowerCase().includes(searchFilter.toLowerCase()),
        );
    }, [rawPokemons, favoriteIds, searchFilter]);

    const favoritePokemons = useMemo(
        () => processedPokemons.filter((p) => p.favorite),
        [processedPokemons],
    );

    // 4. Renderizado del Componente
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
            <Navbar />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
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
                            onRetry={fetchPokemons}
                        />
                    </div>

                    {/* Controles de paginación controlados por el hook usePagination */}
                    {!isLoading && !error && totalPages > 1 && (
                        <div className="flex flex-wrap justify-center items-center gap-2 py-8">
                            <button
                                onClick={() => goToPage(1)}
                                disabled={currentPage === 1}
                                className="p-2 rounded-lg bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-600 dark:text-slate-400 disabled:opacity-30 hover:bg-gray-50 dark:hover:bg-slate-700 transition-all active:scale-90"
                            >
                                <HiChevronDoubleLeft className="w-5 h-5" />
                            </button>
                            <button
                                onClick={() => goToPage(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="p-2 rounded-lg bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-600 dark:text-slate-400 disabled:opacity-30 hover:bg-gray-50 dark:hover:bg-slate-700 transition-all active:scale-90"
                            >
                                <HiChevronLeft className="w-5 h-5" />
                            </button>

                            <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg shadow-sm">
                                <span className="text-sm font-bold text-primary">
                                    {currentPage}
                                </span>
                                <span className="text-sm text-gray-400">/</span>
                                <span className="text-sm font-medium text-gray-600 dark:text-slate-400">
                                    {totalPages}
                                </span>
                            </div>

                            <button
                                onClick={() => goToPage(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="p-2 rounded-lg bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-600 dark:text-slate-400 disabled:opacity-30 hover:bg-gray-50 dark:hover:bg-slate-700 transition-all active:scale-90"
                            >
                                <HiChevronRight className="w-5 h-5" />
                            </button>
                            <button
                                onClick={() => goToPage(totalPages)}
                                disabled={currentPage === totalPages}
                                className="p-2 rounded-lg bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-600 dark:text-slate-400 disabled:opacity-30 hover:bg-gray-50 dark:hover:bg-slate-700 transition-all active:scale-90"
                            >
                                <HiChevronDoubleRight className="w-5 h-5" />
                            </button>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}

export default PokedexPage;
