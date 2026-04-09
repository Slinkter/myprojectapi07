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

function PokedexPage() {
    const { totalCount, isLoading, error, fetchPokemons } = usePokemon();
    const { currentPage, totalPages, goToPage } = usePagination({ totalCount });
    const { getFavoritePokemons } = useFavorites();
    
    const processedPokemons = useSelector(selectProcessedPokemons);
    const [globalFavorites, setGlobalFavorites] = useState([]);

    useEffect(() => {
        fetchPokemons({ page: currentPage });
    }, [fetchPokemons, currentPage]);

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

    return (
        <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-12">
            <div className="flex flex-col items-center space-y-6 sm:space-y-8 md:space-y-12">
                <PokedexHeader />

                <div className="w-full max-w-xl px-2 sm:px-0">
                    <SearchBar />
                </div>

                <div className="w-full px-2 sm:px-0">
                    <FavoritesBar favoritePokemons={globalFavorites} />
                </div>

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
