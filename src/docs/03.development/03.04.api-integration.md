# Desarrollo e Implementación: Integración con API

Este documento describe la estrategia y las convenciones para la integración de la aplicación `myprojectapi07` con APIs externas, utilizando `Axios` como cliente HTTP.

---

## 1. Cliente HTTP: Axios

`Axios` es la librería elegida para realizar todas las peticiones HTTP debido a su facilidad de uso, manejo de promesas y capacidad de intercepción de peticiones/respuestas.

### Configuración Base de Axios

La configuración de la instancia base de Axios se define en `src/lib/axios.js`.

```javascript
// src/lib/axios.js
import axios from "axios";
import { API_CONFIG } from "@/services/api/config"; // Importa la configuración base de la API

const apiClient = axios.create({
    baseURL: API_CONFIG.BASE_URL,
    timeout: 10000, // Tiempo de espera para la petición (10 segundos)
    headers: {
        "Content-Type": "application/json",
        // Aquí se pueden añadir otros headers globales (ej. Authorization)
    },
});

// Opcional: Interceptores de petición
apiClient.interceptors.request.use(
    (config) => {
        // Por ejemplo, añadir un token de autenticación
        // const token = localStorage.getItem('token');
        // if (token) {
        //     config.headers.Authorization = `Bearer ${token}`;
        // }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Opcional: Interceptores de respuesta
apiClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // Manejo global de errores HTTP (ej. redireccionar si 401, mostrar toast si 500)
        console.error("API Error:", error.response || error);
        // if (error.response && error.response.status === 401) {
        //     // Manejar no autorizado
        // }
        return Promise.reject(error);
    }
);

export default apiClient;
```

## 2. Configuración de la API

Los parámetros generales de la API (URL base, endpoints) se centralizan en `src/services/api/config.js`.

```javascript
// src/services/api/config.js
export const API_CONFIG = {
    BASE_URL: "https://pokeapi.co/api/v2",
    ENDPOINTS: {
        POKEMON: "/pokemon",
        // Otros endpoints
    },
    DEFAULT_PARAMS: {
        LIMIT: 20,
    },
};
```

## 3. Servicios de API por Feature

Cada feature que interactúe con la API debe tener su propio módulo de servicios, ubicado en `src/features/[feature-name]/api/`. Estos módulos utilizarán la instancia `apiClient` configurada y se encargarán de:

*   Construir las URLs específicas del endpoint.
*   Manejar los parámetros de la petición.
*   Realizar la llamada a través de `apiClient`.
*   Realizar cualquier pre-procesamiento o mapeo de los datos de la respuesta.
*   Manejar errores específicos de la llamada.

### Ejemplo (`src/features/pokemon/api/pokemon-api.js`)

```javascript
// src/features/pokemon/api/pokemon-api.js
import apiClient from "@/lib/axios"; // Cliente Axios configurado
import { API_CONFIG } from "@/services/api/config";

/**
 * Obtiene una lista paginada de Pokémon.
 * @param {number} offset - El punto de inicio para la paginación.
 * @param {number} limit - El número de Pokémon a retornar.
 * @returns {Promise<{count: number, results: Array}>} Lista de Pokémon y el total.
 */
export const getPokemonList = async (
    offset = 0,
    limit = API_CONFIG.DEFAULT_PARAMS.LIMIT
) => {
    try {
        const { data } = await apiClient.get(
            `${API_CONFIG.ENDPOINTS.POKEMON}?offset=${offset}&limit=${limit}`
        );

        // Problema de N+1 resuelto: La API de PokeAPI requiere llamadas adicionales para detalles.
        // Para evitar el problema de N+1 y mejorar el rendimiento de carga inicial,
        // se debería buscar una API alternativa que retorne detalles completos en la lista,
        // o implementar un mecanismo de caché/batching en el backend.
        // Por ahora, se realiza el fetch de detalles en paralelo como compromiso.
        const detailedPokemons = await Promise.all(
            data.results.map(async (pokemon) => {
                const { data: details } = await apiClient.get(pokemon.url);
                return {
                    id: details.id,
                    name: details.name,
                    types: details.types,
                    sprites: details.sprites,
                };
            })
        );

        return { count: data.count, results: detailedPokemons };
    } catch (error) {
        console.error("Error fetching Pokemon list:", error);
        throw error; // Re-lanza el error para que sea manejado por el thunk/componente
    }
};

/**
 * Obtiene los detalles de un Pokémon por su ID.
 * @param {string|number} id - El ID o nombre del Pokémon.
 * @returns {Promise<Object>} Detalles del Pokémon.
 */
export const getPokemonById = async (id) => {
    try {
        const { data } = await apiClient.get(`${API_CONFIG.ENDPOINTS.POKEMON}/${id}`);
        return {
            id: data.id,
            name: data.name,
            types: data.types,
            sprites: data.sprites,
        };
    } catch (error) {
        console.error(`Error fetching Pokemon with id ${id}:`, error);
        throw error;
    }
};
```

## 4. Manejo de Errores

*   **Interceptores de Axios:** Para manejar errores HTTP de forma global (ej. errores de autenticación, errores de servidor).
*   **Bloques `try...catch`:** En los servicios de API de cada feature, para manejar errores específicos de la llamada y lanzar excepciones si es necesario.
*   **Redux Thunks:** Los `createAsyncThunk` de Redux Toolkit están diseñados para capturar errores de las promesas y manejarlos en la acción `rejected`, permitiendo actualizar el estado de error de la aplicación.

---
*Este documento es generado y mantenido automáticamente como parte de la documentación del proyecto.*
