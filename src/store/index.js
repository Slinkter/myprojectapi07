import { combineReducers } from "@reduxjs/toolkit";
import pokemonReducer from "../features/pokemon/pokemonSlice";
import uiReducer from "./slices/uiSlice";

const rootReducer = combineReducers({
    pokemon: pokemonReducer,
    ui: uiReducer,
});

export default rootReducer;
