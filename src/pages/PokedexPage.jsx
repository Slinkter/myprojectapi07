
import { useEffect } from "react";
import { usePokemon, PokedexHeader, PokemonContent } from "@/features/pokemon";
import { SearchBar } from "@/features/search";
import { FavoritesBar } from "@/features/favorites";
import Navbar from "@/components/layout/Navbar";
import { HiChevronLeft, HiChevronRight, HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";

/**
 * The main page component for the Pokédex application.
 * It integrates all the features like Pokémon listing, search, favorites, and theme switching.
 */
function PokedexPage() {
    const {
        pokemons,
        favoritePokemons,
        isLoading,
        error,
        fetchPokemons,
        currentPage,
        totalPages,
        goToPage,
    } = usePokemon();

    useEffect(() => {
        fetchPokemons();
    }, [fetchPokemons, currentPage]);

    /**
     * Handles the page change event from the pagination component.
     * @param {number} value - The new page number.
     */
    const handlePageChange = (value) => {
        if (value >= 1 && value <= totalPages) {
            goToPage(value);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

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
                            pokemons={pokemons}
                            onRetry={fetchPokemons}
                        />
                    </div>

                    {!isLoading && !error && totalPages > 1 && (
                        <div className="flex flex-wrap justify-center items-center gap-2 py-8">
                            {/* Mobile Pagination simple buttons would be better, but let's do a full one */}
                            <button
                                onClick={() => handlePageChange(1)}
                                disabled={currentPage === 1}
                                className="p-2 rounded-lg bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-600 dark:text-slate-400 disabled:opacity-30 hover:bg-gray-50 dark:hover:bg-slate-700 transition-all active:scale-90"
                            >
                                <HiChevronDoubleLeft className="w-5 h-5" />
                            </button>
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="p-2 rounded-lg bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-600 dark:text-slate-400 disabled:opacity-30 hover:bg-gray-50 dark:hover:bg-slate-700 transition-all active:scale-90"
                            >
                                <HiChevronLeft className="w-5 h-5" />
                            </button>
                            
                            <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg shadow-sm">
                                <span className="text-sm font-bold text-primary">{currentPage}</span>
                                <span className="text-sm text-gray-400">/</span>
                                <span className="text-sm font-medium text-gray-600 dark:text-slate-400">{totalPages}</span>
                            </div>

                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="p-2 rounded-lg bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-600 dark:text-slate-400 disabled:opacity-30 hover:bg-gray-50 dark:hover:bg-slate-700 transition-all active:scale-90"
                            >
                                <HiChevronRight className="w-5 h-5" />
                            </button>
                            <button
                                onClick={() => handlePageChange(totalPages)}
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
