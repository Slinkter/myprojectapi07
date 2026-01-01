# Desarrollo e Implementación: Gestión del Estado con Redux Toolkit

Este documento describe cómo se gestiona el estado global de la aplicación `myprojectapi07` utilizando **Redux Toolkit (RTK)**. RTK es el enfoque recomendado para escribir lógica Redux, simplificando la configuración y reduciendo la cantidad de código boilerplate.

---

## 1. Principios de Gestión de Estado

*   **Fuente Única de Verdad:** El estado global de la aplicación reside en un único objeto JavaScript gestionado por el Store de Redux.
*   **Estado Inmutable:** Las actualizaciones de estado se realizan creando nuevas copias del estado, nunca mutándolo directamente. Redux Toolkit facilita esto con Immer.
*   **Cambios Predecibles:** Los cambios de estado son realizados por funciones `reducer` puras que responden a `acciones` enviadas (`dispatched`).

## 2. Configuración del Store

El Store de Redux se configura en `src/store/index.js`.

```javascript
// src/store/index.js
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";

// Importa los slices de cada feature
import pokemonReducer from "@/features/pokemon/pokemonSlice";
import searchReducer from "@/features/search/searchSlice";
import favoritesReducer from "@/features/favorites/favoritesSlice";
import themeReducer from "@/features/theme/themeSlice";

// Combina todos los reducers de los slices
const rootReducer = combineReducers({
    pokemon: pokemonReducer,
    search: searchReducer,
    favorites: favoritesReducer,
    theme: themeReducer,
});

const store = configureStore({
    reducer: rootReducer,
    // Aquí se pueden añadir middleware, enhancers, etc.
    // getDefaultMiddleware().concat(myCustomMiddleware)
});

export default store;
```

*   **`configureStore`**: Simplifica la configuración del store, incluyendo automáticamente `Redux Thunk` como middleware y herramientas de desarrollo.
*   **`combineReducers`**: Se utiliza para combinar los reducers individuales de cada slice en un único reducer raíz.

## 3. Slices de Redux Toolkit

Un "slice" en Redux Toolkit es la forma recomendada de organizar la lógica de Redux. Agrupa el reducer, las acciones y el estado inicial de una parte específica del estado de la aplicación.

*   **Ubicación:** Cada slice reside dentro de su respectivo directorio de feature (ej. `src/features/pokemon/pokemonSlice.js`).
*   **`createSlice`**: Esta función genera automáticamente el `reducer` y las `actions` basadas en el nombre del slice y un objeto de `reducers`.

### Ejemplo de `pokemonSlice.js`

```javascript
// src/features/pokemon/pokemonSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getPokemonList } from "@/services/api/pokemon"; // Asumiendo este servicio existe

// Thunk para lógica asíncrona (ej. llamadas a la API)
export const fetchPokemons = createAsyncThunk(
    "pokemon/fetchPokemons",
    async ({ page, limit }, { rejectWithValue }) => {
        try {
            const offset = (page - 1) * limit;
            const data = await getPokemonList(offset, limit);
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const pokemonSlice = createSlice({
    name: "pokemon",
    initialState: {
        pokemons: [],
        isLoading: false,
        error: null,
        currentPage: 1,
        itemsPerPage: 20,
        totalCount: 0,
    },
    reducers: {
        // Acciones síncronas simples
        setPage: (state, action) => {
            state.currentPage = action.payload;
        },
    },
    extraReducers: (builder) => {
        // Manejo de los estados (pending, fulfilled, rejected) del thunk asíncrono
        builder
            .addCase(fetchPokemons.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchPokemons.fulfilled, (state, action) => {
                state.isLoading = false;
                state.pokemons = action.payload.results.map(pokemon => ({
                    ...pokemon,
                    favorite: false, // Inicialmente no favorito, se combinará con datos de favoritesSlice
                }));
                state.totalCount = action.payload.count;
            })
            .addCase(fetchPokemons.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { setPage } = pokemonSlice.actions; // Exporta acciones síncronas
export default pokemonSlice.reducer;
```

## 4. Interacción con Redux en Componentes

### `useSelector`
Se utiliza para extraer datos del estado de Redux.

```jsx
import { useSelector } from "react-redux";

const MyComponent = () => {
    const pokemons = useSelector((state) => state.pokemon.pokemons);
    const isLoading = useSelector((state) => state.pokemon.isLoading);
    // ...
};
```

### `useDispatch`
Se utiliza para obtener la función `dispatch` y enviar acciones al Store.

```jsx
import { useDispatch } from "react-redux";
import { setPage, fetchPokemons } from "@/features/pokemon/pokemonSlice";

const MyComponent = () => {
    const dispatch = useDispatch();

    const handlePageChange = (page) => {
        dispatch(setPage(page));
        dispatch(fetchPokemons({ page, limit: 20 }));
    };
    // ...
};
```

### `createAsyncThunk`
Simplifica la gestión de la lógica asíncrona, como las llamadas a la API, dentro de Redux. Maneja automáticamente los estados `pending`, `fulfilled` y `rejected`.

## 5. Middleware

Redux Toolkit configura automáticamente varios middlewares por defecto, incluyendo `Redux Thunk`, que permite escribir lógica asíncrona que interactúa con el Store. Se pueden añadir middlewares personalizados si es necesario en la configuración del store.

---
*Este documento es generado y mantenido automáticamente como parte de la documentación del proyecto.*
