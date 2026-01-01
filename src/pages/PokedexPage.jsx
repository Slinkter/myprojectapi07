import React, { useEffect, useMemo } from 'react';
import { usePokemon } from '@/features/pokemon/usePokemon';
import { useSearch } from '@/features/search/useSearch';
import { useFavorites } from '@/features/favorites/useFavorites';
import { useTheme } from '@/features/theme/useTheme';
import { PokemonSkeleton } from '@/components/ui/PokemonSkeleton';
import PokemonList from '@/components/pokemon/PokemonList';
import { SearchPokemon } from '@/features/search/SearchPokemon';
import {
  AppBar,
  Container,
  Grid,
  Toolbar,
  Typography,
  Pagination,
  Box,
  IconButton,
  Alert,
  Button,
  Stack,
  Paper, // Added
  Chip,   // Added
  Avatar, // Added
} from '@mui/material';
import { styled } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import logopokemon from '@/assets/logo.svg';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(0, 0, 0, 0.3)'
      : 'rgba(255, 255, 255, 0.3)',
  backdropFilter: 'blur(10px)',
  boxShadow: 'none',
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

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

  const handleRetry = () => {
    fetchPokemons();
  };

  const handlePageChange = (event, value) => {
    goToPage(value);
  };

  return (
    <Box
      sx={{
        bgcolor: 'background.default',
        color: 'text.primary',
        minHeight: '100vh',
      }}
    >
      <StyledAppBar position="sticky">
        <Toolbar>
          <Box
            component="img"
            src={logopokemon}
            alt="Logo Pokémon"
            sx={{ width: 120, height: 'auto' }}
          />
          <Box sx={{ flexGrow: 1 }} />
          <IconButton sx={{ ml: 1 }} onClick={toggleAppTheme} color="inherit">
            {currentTheme === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
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
                fontWeight: 'bold',
                fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4rem' },
              }}
            >
              Pokédex
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Gotta Catch &apos;Em All!
            </Typography>
          </Box>

          <Box sx={{ width: '100%', maxWidth: 'sm' }}>
            <SearchPokemon />
          </Box>

          {/* Favorites Section */}
          <Paper
            variant="outlined"
            sx={{
              p: 2,
              width: '100%',
              maxWidth: 'md',
              bgcolor: 'background.paper',
            }}
          >
            <Typography variant="h6" component="h3" sx={{ mb: 2 }}>
              Favoritos
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 1,
                minHeight: 40, // Ensure it has height even when empty
                alignItems: 'center',
              }}
            >
              {favoritePokemons.length > 0 ? (
                favoritePokemons.map((fav) => (
                  <Chip
                    key={fav.id}
                    avatar={<Avatar src={fav.sprites.front_default} alt={fav.name} />}
                    label={fav.name}
                    sx={{ textTransform: 'capitalize' }}
                  />
                ))
              ) : (
                <Typography variant="body2" color="text.secondary">
                  No has seleccionado ningún Pokémon favorito.
                </Typography>
              )}
            </Box>
          </Paper>

          <Box sx={{ width: '100%' }}>
            {error ? (
              <Alert
                severity="error"
                action={
                  <Button color="inherit" size="small" onClick={handleRetry}>
                    Reintentar
                  </Button>
                }
              >
                Error al cargar los Pokémon: {error}
              </Alert>
            ) : isLoading ? (
              <Grid container spacing={2}>
                {[...Array(12)].map((_, index) => (
                  <Grid item xs={6} sm={4} md={3} lg={2.4} xl={2} key={index}>
                    <PokemonSkeleton />
                  </Grid>
                ))}
              </Grid>
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
                '& .MuiPagination-ul': {
                  justifyContent: 'center',
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