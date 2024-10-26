import { createAsyncThunk } from "@reduxjs/toolkit";
import { setPokemons } from "../reducer/slice/dataSlice";
import { setLoading } from "../reducer/slice/uiSlice";
import { getAllPokemon, getPokemonInfo } from ".";

// exec apis
const fetchPokemon = createAsyncThunk("data/fetch", async (_, { dispatch }) => {
    try {
        dispatch(setLoading(true));
        // api 1
        const pokemonRes = await getAllPokemon(dispatch);
        console.log(pokemonRes);
        // api 2
        const pokemonDetailsRes = await Promise.all(
            pokemonRes.map((pokemon) => getPokemonInfo(pokemon, dispatch))
        );
        console.log(pokemonDetailsRes);
        dispatch(setPokemons(pokemonDetailsRes));
    } catch (error) {
        console.log(error);
    } finally {
        dispatch(setLoading(false));
    }
});

export default fetchPokemon;
