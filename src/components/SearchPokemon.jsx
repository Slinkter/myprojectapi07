import { useDispatch } from "react-redux";
import { setSearchFilter } from "../features/pokemon/pokemonSlice";
import { TextField } from "@mui/material";

export const SearchPokemon = () => {
    const dispatch = useDispatch();
    const handleFilterPokemon = (input) => {
        const text = input.trim();
        dispatch(setSearchFilter(text));
    };

    return (
        <TextField
            label="Search Pokémon"
            variant="outlined"
            fullWidth
            onChange={(e) => handleFilterPokemon(e.target.value)}
        />
    );
};