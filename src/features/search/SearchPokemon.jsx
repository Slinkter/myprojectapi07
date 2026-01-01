
import { useSearch } from './useSearch';
import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export const SearchPokemon = () => {
  const { searchFilter, filterPokemons } = useSearch();

  const handleSearchChange = (e) => {
    filterPokemons(e.target.value);
  };

  return (
    <TextField
      label="Buscar Pokémon"
      variant="outlined"
      fullWidth
      value={searchFilter}
      onChange={handleSearchChange}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
  );
};