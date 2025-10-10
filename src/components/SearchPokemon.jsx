import { useDispatch } from "react-redux";
import { setSearchFilter } from "../features/pokemon/pokemonSlice";
import { Input } from "@material-tailwind/react";

export const SearchPokemon = () => {
    const dispatch = useDispatch();
    const handleFilterPokemon = (input) => {
        const text = input.trim().toLowerCase();
        dispatch(setSearchFilter(text));
    };

    return (
        <>
            <Input
                color="purple"
                label="Buscar..."
                onChange={(e) => handleFilterPokemon(e.target.value)}
            />
        </>
    );
};
