import { createAsyncThunk } from "@reduxjs/toolkit";
import { setPokemons } from "../reducer/slice/dataSlice";
import { setLoading } from "../reducer/slice/uiSlice";
import { getAllPokemon, getPokemonInfo } from ".";

// exec apis
const fetchPokemon = createAsyncThunk("data/fetch", async (_, { dispatch }) => {
    try {
        dispatch(setLoading(true));
        const pokemonRes = await getAllPokemon(dispatch);
        const pokemonDetailsRes = await Promise.all(
            pokemonRes.map((pokemon) => getPokemonInfo(pokemon, dispatch))
        );
        dispatch(setPokemons(pokemonDetailsRes));
    } catch (error) {
        console.log(error);
    } finally {
        dispatch(setLoading(false));
    }
});

export default fetchPokemon;
