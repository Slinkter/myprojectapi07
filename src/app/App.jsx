import React, { useEffect } from "react";
import { usePokemon } from "../hooks/usePokemon"; // 1. Importar el hook
import { PokemonSkeleton } from "../components/ui/PokemonSkeleton";
import PokemonList from "../components/pokemon/PokemonList";
import { SearchPokemon } from "../components/SearchPokemon";
import { AppBar, Container, Grid, Toolbar, Typography, List, ListItem, Paper, useTheme, useMediaQuery } from "@mui/material";
import logopokemon from "../assets/logo.svg";

function App() {
    // 2. El hook se convierte en la única fuente de verdad para los datos y acciones de Pokémon.
    //    Esto centraliza la lógica y aprovecha los selectores memoizados para un mejor rendimiento.
    const {
        isLoading,
        fetchPokemons,
        filteredPokemons,
        favoritePokemons,
    } = usePokemon();

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    // 3. La carga inicial de datos se dispara una vez cuando el componente se monta.
    //    La función `fetchPokemons` viene del hook.
    useEffect(() => {
        fetchPokemons();
    }, [fetchPokemons]);

    return (
        <div className="bg-gray-100 dark:bg-gray-900 min-h-screen font-sans">
            <AppBar position="sticky" top={0} color="transparent" elevation={0} className="border-b border-gray-200 dark:border-gray-800 backdrop-blur-sm bg-white/30 dark:bg-gray-900/30">
                <Toolbar className="flex justify-center">
                    <img src={logopokemon} alt="Logo Pokémon" className="w-32 h-auto" />
                </Toolbar>
            </AppBar>
            <Container maxWidth="lg" className="py-4 sm:py-8">
                <Grid container spacing={isMobile ? 2 : 4} justifyContent="center">
                    <Grid item xs={12} className="text-center mb-4 sm:mb-8">
                        <Typography variant={isMobile ? "h4" : "h2"} component="h1" className="font-bold text-gray-800 dark:text-white animate-fade-in">
                            Pokédex
                        </Typography>
                        <Typography variant={isMobile ? "body1" : "h6"} className="text-gray-600 dark:text-gray-400 animate-fade-in animation-delay-200">
                            Gotta Catch 'Em All!
                        </Typography>
                    </Grid>

                    <Grid item xs={12} md={10} lg={8}>
                        <Paper elevation={3} className="p-4 sm:p-6 rounded-lg animate-slide-in">
                            <Grid container spacing={isMobile ? 2 : 4} alignItems="center">
                                <Grid item xs={12} md={6}>
                                    <SearchPokemon />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Typography variant="h6" className="font-bold text-gray-800 dark:text-white mb-2">Favorites</Typography>
                                    <List dense>
                                        {/* 4. Se usan los 'favoritePokemons' memoizados que vienen del hook. */}
                                        {favoritePokemons.length > 0 ? (
                                            favoritePokemons.map((fav) => (
                                                <ListItem key={fav.id} className="px-0">
                                                    <Typography className="capitalize">{fav.name}</Typography>
                                                </ListItem>
                                            ))
                                        ) : (
                                            <Typography className="text-gray-500 dark:text-gray-400">No favorites yet!</Typography>
                                        )}
                                    </List>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>

                    <Grid item xs={12}>
                        {/* 5. El estado `isLoading` ahora viene del `pokemonSlice` a través del hook, que es lo correcto. */}
                        {isLoading ? (
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
                            // 6. La lista ahora recibe los pokémons ya filtrados y memoizados.
                            <PokemonList pokemons={filteredPokemons} />
                        )}
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}

export default App;
