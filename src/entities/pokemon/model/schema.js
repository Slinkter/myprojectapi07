import { z } from "zod";

/**
 * @module pokemonSchema
 * @description Definiciones de esquemas de validación utilizando Zod.
 * Estos esquemas actúan como el "escudo" de la aplicación, garantizando que la data
 * de la API sea coherente y esté correctamente tipada antes de entrar al estado global.
 */

/**
 * Esquema para la estructura de tipos de un Pokémon.
 */
export const PokemonTypeSchema = z.object({
    type: z.object({
        name: z.string(),
    }),
});

/**
 * Esquema para la estructura de sprites.
 */
export const PokemonSpritesSchema = z.object({
    front_default: z.string().url().nullable(),
    back_default: z.string().url().nullable(),
    other: z.record(z.any()),
});

/**
 * Esquema Principal de Pokémon.
 * Nota: Utilizamos z.coerce.number() para garantizar que el ID sea siempre un número,
 * resolviendo el bug de persistencia de favoritos en la paginación.
 */
export const PokemonSchema = z.object({
    id: z.coerce.number(),
    name: z.string(),
    types: z.array(PokemonTypeSchema),
    sprites: PokemonSpritesSchema,
});

/**
 * Esquema para la respuesta de la lista de la API.
 */
export const PokemonApiResponseSchema = z.object({
    count: z.number(),
    results: z.array(z.object({
        name: z.string(),
        url: z.string().url(),
    })),
});

export default {
    PokemonSchema,
    PokemonApiResponseSchema,
};
