# Desarrollo e Implementación: Gestión del Estado con Redux Toolkit

Este documento describe cómo se gestiona el estado global de la aplicación `myprojectapi07` utilizando **Redux Toolkit (RTK)**, siguiendo los principios de **Clean Architecture** para una gestión de estado modular y eficiente.

---

## 1. Principios de Gestión de Estado

-   **Fuente Única de Verdad (Global):** El estado que es compartido por múltiples features reside en un único objeto JavaScript gestionado por el Store de Redux.
-   **Estado Local/UI:** El estado que es específico de un componente o de una pieza de UI reutilizable (como la paginación) se gestiona localmente dentro del componente o en un custom hook (`useState`, `useReducer`), para evitar la sobrecarga del store global.
-   **Estado Inmutable:** Las actualizaciones de estado se realizan creando nuevas copias, nunca mutando el estado directamente. Redux Toolkit facilita esto con Immer.
-   **Separación de Lógica:** La lógica de negocio compleja (ej. combinar datos de diferentes slices) se extrae de los componentes y se maneja en **selectores memoizados**.

## 2. Configuración del Store

El Store de Redux se configura en `src/store/index.js`, combinando los reducers de cada feature.

```javascript
// src/store/index.js
import { configureStore } from "@reduxjs/toolkit";
import { pokemonReducer } from "@/features/pokemon";
import { searchReducer } from "@/features/search";
import { favoritesReducer } from "@/features/favorites";
import { themeReducer } from "@/features/theme";

const store = configureStore({
    reducer: {
        pokemon: pokemonReducer,
        search: searchReducer,
        favorites: favoritesReducer,
        theme: themeReducer,
    },
});

export default store;
```

-   **`configureStore`**: Simplifica la configuración, incluyendo automáticamente `redux-thunk` y las herramientas de desarrollo.
-   **`reducer`**: El objeto `reducer` combina los reducers de los slices directamente.

## 3. Slices de Redux Toolkit

Un "slice" agrupa el reducer, las acciones y el estado inicial de una feature.

-   **Ubicación:** Cada slice reside dentro de su respectivo directorio de feature (ej. `src/features/pokemon/state/pokemonSlice.js`).

### Ejemplo de `pokemonSlice.js` (Refactorizado)

Nótese que el slice ya **no gestiona el estado de la paginación**. Solo se encarga del estado de los datos de Pokémon, su carga y los errores.

```javascript
// src/features/pokemon/state/pokemonSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { pokemonApi } from "@/features/pokemon/api/pokemonApi";

// Thunk para lógica asíncrona
export const fetchPokemons = createAsyncThunk(
    "pokemon/fetchPokemons",
    async ({ page, limit }, { rejectWithValue }) => {
        try {
            const offset = (page - 1) * limit;
            const data = await pokemonApi.getPokemons(offset, limit);
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    },
);

const pokemonSlice = createSlice({
    name: "pokemon",
    initialState: {
        pokemons: [],
        isLoading: false,
        isError: false,
        error: null,
        totalCount: 0,
    },
    reducers: {}, // No hay acciones síncronas en este slice
    extraReducers: (builder) => {
        builder
            .addCase(fetchPokemons.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(fetchPokemons.fulfilled, (state, action) => {
                state.isLoading = false;
                state.pokemons = action.payload.results;
                state.totalCount = action.payload.count;
            })
            .addCase(fetchPokemons.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.payload;
            });
    },
});

export default pokemonSlice.reducer;
```

## 4. Selectores Memoizados para Estado Derivado

Para evitar que los componentes realicen lógica de negocio compleja (como filtrar y combinar datos), usamos **selectores memoizados** con `createSelector`. Estos solo se recalculan si sus datos de entrada cambian, optimizando el rendimiento.

-   **Ubicación:** `src/features/pokemon/state/pokemonSelectors.js`

```javascript
// src/features/pokemon/state/pokemonSelectors.js
import { createSelector } from "@reduxjs/toolkit";

// Selectores de entrada: obtienen piezas de estado "crudo"
const selectPokemons = (state) => state.pokemon.pokemons;
const selectFavoriteIds = (state) => state.favorites.favoriteIds;
const selectSearchFilter = (state) => state.search.searchFilter;

// Selector de salida: combina los datos crudos y calcula el estado derivado
export const selectProcessedPokemons = createSelector(
  [selectPokemons, selectFavoriteIds, selectSearchFilter],
  (pokemons, favoriteIds, searchFilter) => {
    const favoritedPokemons = pokemons.map((pokemon) => ({
      ...pokemon,
      favorite: favoriteIds.includes(pokemon.id),
    }));

    if (!searchFilter) {
      return favoritedPokemons;
    }
    return favoritedPokemons.filter((p) =>
      p.name.toLowerCase().includes(searchFilter.toLowerCase())
    );
  }
);
```

## 5. Interacción en Componentes (Patrón Actual)

### `useSelector` con Selectores Memoizados
El componente se suscribe directamente al dato procesado, manteniéndose limpio de lógica.

```jsx
// src/pages/PokedexPage.jsx
import { useSelector } from "react-redux";
import { selectProcessedPokemons } from "@/features/pokemon/state/pokemonSelectors";

const PokedexPage = () => {
    // El componente no sabe CÓMO se calculan los pokemons, solo los consume.
    const processedPokemons = useSelector(selectProcessedPokemons);
    // ...
};
```

### `useDispatch` y Hooks Personalizados
Se usa `useDispatch` dentro de hooks personalizados para abstraer la lógica de despacho. La paginación es gestionada por un hook autocontenido.

```jsx
// src/pages/PokedexPage.jsx
import { useEffect } from "react";
import { usePokemon } from "@/features/pokemon";
import { usePagination } from "@/shared/hooks/usePagination";

const PokedexPage = () => {
    const { totalCount, isLoading, error, fetchPokemons } = usePokemon();
    const { currentPage } = usePagination({ totalCount });

    useEffect(() => {
        // Pasa el estado del hook de paginación al thunk de fetch
        fetchPokemons({ page: currentPage });
    }, [fetchPokemons, currentPage]);

    // ...
};
```
Este enfoque asegura que los componentes permanezcan limpios y la lógica de estado esté bien organizada y sea eficiente.
