/**
 * @module seedData
 * @description
 * Base de datos semilla (Seed) para soporte Offline-First y reducción de consumo de API.
 * Contiene los datos normalizados de los Pokémon más comunes.
 */

export const POKEMON_SEED = [
    { id: 1, name: "bulbasaur", types: [{type: {name: "grass"}}], sprites: {front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"} },
    { id: 4, name: "charmander", types: [{type: {name: "fire"}}], sprites: {front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png"} },
    { id: 7, name: "squirtle", types: [{type: {name: "water"}}], sprites: {front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png"} },
];

export default POKEMON_SEED;
