/**
 * Script para generar el archivo seed.js con datos de PokéAPI
 * Ejecutar: node scripts/generate-seed.js
 */

import axios from "axios";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const OUTPUT_PATH = path.join(__dirname, "../src/entities/pokemon/data/seed.js");
const POKEMON_COUNT = 151; // Primera generación
const BATCH_SIZE = 20; // Llamadas paralelas

const transformPokemon = (data) => ({
    id: data.id,
    name: data.name,
    types: data.types,
    sprites: {
        front_default: data.sprites?.front_default,
        other: data.sprites?.other,
    },
});

const fetchPokemonDetails = async (url) => {
    const { data } = await axios.get(url);
    return transformPokemon(data);
};

const generateSeed = async () => {
    console.log(`🔄 Obteniendo lista de ${POKEMON_COUNT} Pokémon...`);

    // 1. Obtener lista
    const { data } = await axios.get(
        `https://pokeapi.co/api/v2/pokemon?limit=${POKEMON_COUNT}`
    );

    const pokemonList = data.results;

    // 2. Obtener detalles en batches
    const allPokemon = [];
    const batches = [];

    for (let i = 0; i < pokemonList.length; i += BATCH_SIZE) {
        batches.push(pokemonList.slice(i, i + BATCH_SIZE));
    }

    for (let i = 0; i < batches.length; i++) {
        const batch = batches[i];
        console.log(`📦 Batch ${i + 1}/${batches.length} (${batch.length} Pokémon)...`);

        const results = await Promise.all(
            batch.map((p) => fetchPokemonDetails(p.url))
        );

        allPokemon.push(...results);
    }

    // 3. Ordenar por ID
    allPokemon.sort((a, b) => a.id - b.id);

    // 4. Generar archivo
    const content = `/**
 * @module seedData
 * @description
 * Base de datos semilla (Seed) para soporte Offline-First y reducción de consumo de API.
 * Contiene ${allPokemon.length} Pokémon de la primera generación.
 * Generado automáticamente el ${new Date().toISOString().split("T")[0]}
 */

export const POKEMON_SEED = ${JSON.stringify(allPokemon, null, 4)};

export default POKEMON_SEED;
`;

    fs.writeFileSync(OUTPUT_PATH, content);

    console.log(`✅ seed.js generado con ${allPokemon.length} Pokémon`);
    console.log(`📁 Guardado en: ${OUTPUT_PATH}`);
};

generateSeed().catch(console.error);