import { useSearch } from "@/features/search/hooks/useSearch";
import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

/**
 * A component that provides a text input for searching Pokémon.
 * @returns {JSX.Element} The rendered search bar component.
 */
export const SearchBar = () => {
    const { searchFilter, filterPokemons } = useSearch();

    /**
     * Handles the change event of the search input.
     * @param {React.ChangeEvent<HTMLInputElement>} e - The change event.
     */
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
