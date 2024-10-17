import axios from "axios";

const API_URL = "https://pokeapi.co/api/v2/pokemon?limit=151";

export const getAllPokemon = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data.results;
    } catch (error) {
        console.log(error);
    } finally {
        console.log("end");
    }
};

export const getPokemonInfo = async (obj) => {
    try {
        const response = await axios.get(obj.url);
        return response.data;
    } catch (error) {
        console.log(error);
    } finally {
        console.log("end");
    }
};
