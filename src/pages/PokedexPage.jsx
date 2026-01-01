import { useEffect, useMemo } from "react";
import { usePokemon } from "@/features/pokemon/hooks/usePokemon";
import { useSearch } from "@/features/search/hooks/useSearch";
import { useFavorites } from "@/features/favorites/hooks/useFavorites";
import { useTheme } from "@/features/theme/hooks/useTheme";
import { PokemonSkeleton } from "@/features/pokemon/components/PokemonSkeleton";
import PokemonList from "@/features/pokemon/components/PokemonList";
import { SearchBar } from "@/features/search/components/SearchBar";
import {
    AppBar,
    Container,
    Toolbar,
    Typography,
    Pagination,
    Box,
    IconButton,
    Alert,
    Button,
    Stack,
    Paper, // Added
    Chip, // Added
    Avatar, // Added
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import logopokemon from "@/assets/logo.svg";

const StyledAppBar = styled(AppBar)(({ theme }) => ({
    backgroundColor:
        theme.palette.mode === "dark"
            ? "rgba(0, 0, 0, 0.3)"
            : "rgba(255, 255, 255, 0.3)",
    backdropFilter: "blur(10px)",
    boxShadow: "none",
    borderBottom: `1px solid ${theme.palette.divider}`,
}));

/**
 * The main page component for the Pokédex application.
 * It integrates all the features like Pokémon listing, search, favorites, and theme switching.
 * @returns {JSX.Element} The rendered Pokedex page.
 */
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

    useEffect(() => {
        fetchPokemons();
    }, [fetchPokemons, currentPage]);

    const processedPokemons = useMemo(() => {
        return pokemons.map((pokemon) => ({
            ...pokemon,
            favorite: favoriteIds.includes(pokemon.id),
        }));
    }, [pokemons, favoriteIds]);

    const filteredPokemons = useMemo(() => {
        if (!searchFilter) return processedPokemons;
        return processedPokemons.filter((p) =>
            p.name.toLowerCase().includes(searchFilter.toLowerCase())
        );
    }, [processedPokemons, searchFilter]);

    const favoritePokemons = useMemo(
        () => processedPokemons.filter((p) => p.favorite),
        [processedPokemons]
    );

    /**
     * Handles the retry action when fetching Pokémon fails.
     */
    const handleRetry = () => {
        fetchPokemons();
    };

    /**
     * Handles the page change event from the pagination component.
     * @param {React.ChangeEvent<unknown>} event - The event source of the callback.
     * @param {number} value - The new page number.
     */
    const handlePageChange = (event, value) => {
        goToPage(value);
    };

    return (
        <Box
            sx={{
                bgcolor: "background.default",
                color: "text.primary",
                minHeight: "100vh",
            }}
        >
            <StyledAppBar position="sticky">
                <Toolbar>
                    <Box
                        component="img"
                        src={logopokemon}
                        alt="Logo Pokémon"
                        sx={{ width: 120, height: "auto" }}
                    />
                    <Box sx={{ flexGrow: 1 }} />
                    <IconButton
                        sx={{ ml: 1, color: 'red' }}
                        onClick={toggleAppTheme}
                        color="inherit"
                    >
                        {currentTheme === "dark" ? (
                            <Brightness7Icon />
                        ) : (
                            <Brightness4Icon />
                        )}
                    </IconButton>
                </Toolbar>
            </StyledAppBar>

            <Container maxWidth="xl" sx={{ py: { xs: 3, md: 5 } }}>
                <Stack spacing={3} alignItems="center">
                    <Box textAlign="center">
                        <Typography
                            variant="h2"
                            component="h1"
                            sx={{
                                fontWeight: "bold",
                                fontSize: {
                                    xs: "2.5rem",
                                    sm: "3.5rem",
                                    md: "4rem",
                                },
                            }}
                        >
                            Pokédex
                        </Typography>
                        <Typography variant="h6" color="text.secondary">
                            Gotta Catch &apos;Em All!
                        </Typography>
                    </Box>

                    <Box sx={{ width: "100%", maxWidth: "sm" }}>
                        <SearchBar />
                    </Box>

                    {/* Favorites Section */}
                    <Paper
                        variant="outlined"
                        sx={{
                            p: 2,
                            width: "100%",
                            maxWidth: "md",
                            bgcolor: "background.paper",
                        }}
                    >
                        <Typography variant="h6" component="h3" sx={{ mb: 2 }}>
                            Favoritos
                        </Typography>
                        <Box
                            sx={{
                                display: "flex",
                                flexWrap: "wrap",
                                gap: 1,
                                minHeight: 40, // Ensure it has height even when empty
                                alignItems: "center",
                            }}
                        >
                            {favoritePokemons.length > 0 ? (
                                favoritePokemons.map((fav) => (
                                    <Chip
                                        key={fav.id}
                                        avatar={
                                            <Avatar
                                                src={fav.sprites.front_default}
                                                alt={fav.name}
                                            />
                                        }
                                        label={fav.name}
                                        sx={{ textTransform: "capitalize" }}
                                    />
                                ))
                            ) : (
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    No has seleccionado ningún Pokémon favorito.
                                </Typography>
                            )}
                        </Box>
                    </Paper>

                    <Box sx={{ width: "100%" }}>
                        {error ? (
                            <Alert
                                severity="error"
                                action={
                                    <Button
                                        color="inherit"
                                        size="small"
                                        onClick={handleRetry}
                                    >
                                        Reintentar
                                    </Button>
                                }
                            >
                                Error al cargar los Pokémon: {error}
                            </Alert>
                        ) : isLoading ? (
                            <Box
                                sx={{
                                    display: "grid",
                                    gap: { xs: 2, md: 3 },
                                    gridTemplateColumns: {
                                        xs: "repeat(1, 1fr)",
                                        sm: "repeat(2, 1fr)",
                                        md: "repeat(3, 1fr)",
                                        lg: "repeat(4, 1fr)",
                                    },
                                }}
                            >
                                {[...Array(12)].map((_, index) => (
                                    <PokemonSkeleton key={index} />
                                ))}
                            </Box>
                        ) : (
                            <PokemonList pokemons={filteredPokemons} />
                        )}
                    </Box>

                    {!isLoading && !error && totalPages > 1 && (
                        <Pagination
                            count={totalPages}
                            page={currentPage}
                            onChange={handlePageChange}
                            color="primary"
                            size="large"
                            showFirstButton
                            showLastButton
                            sx={{
                                "& .MuiPagination-ul": {
                                    justifyContent: "center",
                                },
                            }}
                        />
                    )}
                </Stack>
            </Container>
        </Box>
    );
}

export default PokedexPage;
