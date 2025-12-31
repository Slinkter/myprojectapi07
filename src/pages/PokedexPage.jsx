import { useEffect, useMemo } from "react";
import { usePokemon } from "@/features/pokemon/usePokemon";
import { useSearch } from "@/features/search/useSearch";
import { useFavorites } from "@/features/favorites/useFavorites";
import { useTheme } from "@/features/theme/useTheme";
import { PokemonSkeleton } from "@/components/ui/PokemonSkeleton";
import PokemonList from "@/components/pokemon/PokemonList";
import { SearchPokemon } from "@/features/search/SearchPokemon";
import {
  AppBar,
  Container,
  Grid,
  Toolbar,
  Typography,
  List,
  ListItem,
  Paper,
  useMediaQuery,
  Button,
} from "@mui/material";
import { IconButton } from "@material-tailwind/react";
import {
  SunIcon,
  MoonIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/solid";
import logopokemon from "@/assets/logo.svg";

function PokedexPage() {
  const {
    pokemons,
    isLoading,
    error,
    fetchPokemons,
    currentPage,
    totalPages,
    goToPage,
  } = usePokemon();
  const { searchFilter } = useSearch();
  const { favoriteIds } = useFavorites();
  const { currentTheme, toggleAppTheme } = useTheme();

  const isMobile = useMediaQuery("(max-width:600px)");

  useEffect(() => {
    fetchPokemons();
  }, [fetchPokemons, currentPage]); // Refetch when page changes

  // Combine pokemons with favorite status and apply search filter
  const processedPokemons = useMemo(() => {
    return pokemons.map((pokemon) => ({
      ...pokemon,
      favorite: favoriteIds.includes(pokemon.id),
    }));
  }, [pokemons, favoriteIds]);

  const filteredPokemons = useMemo(() => {
    if (!searchFilter) return processedPokemons;
    return processedPokemons.filter((p) =>
      p.name.toLowerCase().includes(searchFilter)
    );
  }, [processedPokemons, searchFilter]);

  const favoritePokemons = useMemo(
    () => processedPokemons.filter((p) => p.favorite),
    [processedPokemons]
  );

  const handleRetry = () => {
    fetchPokemons();
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen font-sans">
      <AppBar
        position="sticky"
        top={0}
        color="transparent"
        elevation={0}
        className="border-b border-gray-200 dark:border-gray-800 backdrop-blur-sm bg-white/30 dark:bg-gray-900/30"
      >
        <Toolbar className="flex justify-between items-center">
          <img src={logopokemon} alt="Logo Pokémon" className="w-32 h-auto" />
          <IconButton
            variant="text"
            onClick={toggleAppTheme}
            className="ml-auto"
          >
            {currentTheme === "dark" ? (
              <SunIcon className="h-6 w-6 text-yellow-500" />
            ) : (
              <MoonIcon className="h-6 w-6 text-blue-gray-500" />
            )}
          </IconButton>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" className="py-4 sm:py-8">
        <Grid container spacing={isMobile ? 2 : 4} justifyContent="center">
          <Grid item xs={12} className="text-center mb-4 sm:mb-8">
            <Typography
              variant={isMobile ? "h4" : "h2"}
              component="h1"
              className="font-bold text-gray-800 dark:text-white animate-fade-in"
            >
              Pokédex
            </Typography>
            <Typography
              variant={isMobile ? "body1" : "h6"}
              className="text-gray-600 dark:text-gray-400 animate-fade-in animation-delay-200"
            >
              Gotta Catch &apos;Em All!
            </Typography>
          </Grid>

          <Grid item xs={12} md={10} lg={8}>
            <Paper
              elevation={3}
              className="p-4 sm:p-6 rounded-lg animate-slide-in"
            >
              <Grid container spacing={isMobile ? 2 : 4} alignItems="center">
                <Grid item xs={12} md={6}>
                  <SearchPokemon />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography
                    variant="h6"
                    className="font-bold text-gray-800 dark:text-white mb-2"
                  >
                    Favorites
                  </Typography>
                  <List dense>
                    {favoritePokemons.length > 0 ? (
                      favoritePokemons.map((fav) => (
                        <ListItem key={fav.id} className="px-0">
                          <Typography className="capitalize">
                            {fav.name}
                          </Typography>
                        </ListItem>
                      ))
                    ) : (
                      <Typography className="text-gray-500 dark:text-gray-400">
                        No favorites yet!
                      </Typography>
                    )}
                  </List>
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          <Grid item xs={12}>
            {error ? (
              <div className="text-center p-4 text-red-600 dark:text-red-400">
                <Typography variant="h6">
                  Error loading Pokémons: {error}
                </Typography>
                <Button onClick={handleRetry} className="mt-4 btn-primary">
                  Retry
                </Button>
              </div>
            ) : isLoading ? (
              <div className="flex justify-center mt-4 sm:mt-8">
                <Grid container spacing={isMobile ? 2 : 4}>
                  {[...Array(12)].map((_, index) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                      <PokemonSkeleton />
                    </Grid>
                  ))}
                </Grid>
              </div>
            ) : (
              <>
                <PokemonList pokemons={filteredPokemons} />
                <div className="flex justify-center items-center gap-4 mt-8">
                  <Button
                    variant="outlined"
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1 || isLoading}
                    className="btn-primary"
                  >
                    <ArrowLeftIcon className="h-4 w-4 mr-2" /> Previous
                  </Button>
                  <Typography className="text-gray-700 dark:text-gray-300">
                    Page {currentPage} of {totalPages}
                  </Typography>
                  <Button
                    variant="outlined"
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === totalPages || isLoading}
                    className="btn-primary"
                  >
                    Next <ArrowRightIcon className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </>
            )}
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default PokedexPage;
