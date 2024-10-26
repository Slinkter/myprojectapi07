import React from "react";
import { useDispatch } from "react-redux";
import { setSearchFilter } from "../reducer/slice/dataSlice";
import { Input } from "@material-tailwind/react";

const SearchPokemon = () => {
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

export default SearchPokemon;
