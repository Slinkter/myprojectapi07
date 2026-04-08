import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
    usePokemon,
    PokedexHeader,
    PokemonContent,
    selectProcessedPokemons,
} from "@/features/pokemon";
import { usePagination } from "@/shared/hooks/usePagination";
import { SearchBar } from "@/features/search";
import { FavoritesBar, useFavorites } from "@/features/favorites";
import Pagination from "@/components/common/Pagination";

/**
 * @component PokedexPage
 * @description
 * Página principal que orquesta la visualización de la Pokédex.
 * Ahora gestiona los favoritos de forma global e independiente de la paginación.
 */
function PokedexPage() {
    // 1. Consumo de Hooks y Selectores
    const { totalCount, isLoading, error, fetchPokemons } = usePokemon();
    const { currentPage, totalPages, goToPage } = usePagination({ totalCount });
    const { getFavoritePokemons } = useFavorites();
    
    const processedPokemons = useSelector(selectProcessedPokemons);
    const [globalFavorites, setGlobalFavorites] = useState([]);

    // 2. Efecto para cargar la lista paginada de Pokémon
    useEffect(() => {
        fetchPokemons({ page: currentPage });
    }, [fetchPokemons, currentPage]);

    // 3. Efecto Crítico: Carga de Favoritos Globales
    // Este efecto se ejecuta cada vez que la lista de IDs de favoritos cambia.
    // Resuelve los detalles de los Pokémon favoritos independientemente de la página actual.
    useEffect(() => {
        let isMounted = true;
        
        const loadFavorites = async () => {
            const favs = await getFavoritePokemons();
            if (isMounted) {
                setGlobalFavorites(favs);
            }
        };

        loadFavorites();
        return () => { isMounted = false; };
    }, [getFavoritePokemons]);

    // 4. Renderizado del Componente
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
            <div className="flex flex-col items-center space-y-12">
                <PokedexHeader />

                <div className="w-full max-w-xl">
                    <SearchBar />
                </div>

                {/* Ahora pasamos globalFavorites en lugar de filtrar la página actual */}
                <FavoritesBar favoritePokemons={globalFavorites} />

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
