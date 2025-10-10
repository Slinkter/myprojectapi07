# Proyecto: Pokédex con React

## 1. Demo en Vivo

Puedes ver la aplicación funcionando en el siguiente enlace:

[https://slinkter.github.io/myprojectapi07/](https://slinkter.github.io/myprojectapi07/)

![Captura de la aplicación](api07.png "Pokédex con React")

---

## 2. Descripción General

Esta es una aplicación web de página única (SPA) desarrollada con React que consume la PokéAPI para obtener y mostrar una lista de Pokémon. La aplicación permite filtrar los Pokémon en tiempo real, marcarlos como favoritos y presenta una interfaz de usuario moderna y reactiva.

El proyecto está diseñado siguiendo las mejores prácticas, con un enfoque en un código limpio, escalable y mantenible a través de una arquitectura robusta que combina Redux Toolkit para el estado y hooks personalizados para la lógica de negocio.

---

## 3. Características Principales

-   **Visualización de Pokémon:** Carga y muestra una lista de Pokémon desde la PokéAPI.
-   **Búsqueda en Tiempo Real:** Filtra la lista de Pokémon de forma instantánea a medida que el usuario escribe.
-   **Sistema de Favoritos:** Permite al usuario marcar y desmarcar Pokémon como favoritos. La selección se guarda en `localStorage` para persistir entre sesiones.
-   **Carga Asíncrona Optimizada:** Muestra una animación de "esqueleto" (skeleton) mientras se cargan los datos iniciales.
-   **Diseño Responsivo:** La interfaz se adapta correctamente a diferentes tamaños de pantalla, desde móviles hasta escritorio.
-   **Animaciones Sutiles:** Utiliza efectos de transición para una experiencia de usuario más fluida.

---

## 4. Arquitectura y Estructura del Proyecto

La arquitectura de este proyecto se ha diseñado para ser modular, escalable y fácil de mantener, utilizando patrones modernos del ecosistema de React.

### a. Arquitectura Basada en Componentes

La aplicación sigue una **arquitectura basada en componentes**, el pilar de React. Componentes como `PokemonCard`, `PokemonList` y `SearchPokemon` encapsulan partes específicas de la UI, haciéndolos reutilizables y fáciles de probar de forma aislada.

### b. Patrón Contenedor/Presentacional (Modernizado con Hooks)

Se aplica una versión moderna del patrón **Contenedor/Presentacional**. 
-   **Componente Contenedor:** `App.jsx` actúa como el orquestador principal. No contiene lógica de estado compleja directamente, sino que utiliza el hook `usePokemon` para obtener los datos y las funciones necesarias.
-   **Componentes Presentacionales:** La mayoría de los componentes (`PokemonList`, `PokemonCard`) son "visuales". Reciben datos y funciones a través de props y se encargan únicamente de renderizar la UI. No interactúan directamente con el estado global.

### c. Gestión de Estado Centralizada con Redux Toolkit

Para el manejo del estado global, se eligió **Redux Toolkit**, la herramienta estándar de la industria para aplicaciones React robustas.
-   **Justificación de la Elección:** Redux Toolkit proporciona un `store` predecible y centralizado, ideal para manejar estados complejos como la lista de Pokémon, el estado de carga y los filtros. Las **Redux DevTools** facilitan enormemente la depuración. Su integración con `createAsyncThunk` ofrece una forma estandarizada y robusta de manejar llamadas a APIs.
-   **`pokemonSlice`**: Toda la lógica relacionada con los Pokémon (fetching, filtrado, favoritos) está encapsulada en un único "slice", lo que mantiene el código organizado por funcionalidad.

### d. Hooks Personalizados para Abstraer la Lógica

Se han creado hooks personalizados en `src/hooks` para encapsular y reutilizar la lógica de negocio, manteniendo los componentes limpios y centrados en la UI.
-   `usePokemon.js`: Es el hook más importante. Abstrae toda la interacción con el `store` de Redux. Proporciona a los componentes los datos ya procesados (como `filteredPokemons` y `favoritePokemons`) y las acciones que pueden despachar (`fetchPokemons`, `filterPokemons`).
-   `useFavorites.js`: Encapsula la lógica específica para marcar un Pokémon como favorito, haciendo que el componente `PokemonCard` sea más sencillo.

---

## 5. Tecnologías Utilizadas

-   **React 18:** Para la construcción de la interfaz de usuario.
-   **Vite:** Como herramienta de empaquetado y servidor de desarrollo de alta velocidad.
-   **Redux Toolkit:** Para la gestión del estado global de la aplicación.
-   **React Redux:** Para conectar los componentes de React con el store de Redux.
-   **Axios:** Para realizar las peticiones HTTP a la PokéAPI.
-   **Tailwind CSS:** Para un desarrollo de estilos rápido y personalizable mediante clases de utilidad.
-   **Material-UI (MUI):** Utilizado para componentes de layout y UI como `AppBar`, `Container` y `Grid`, combinando la robustez de MUI con la flexibilidad de Tailwind.
-   **ESLint:** Para mantener un código limpio, consistente y libre de errores.

---

## 6. Optimizaciones de Rendimiento y UX

1.  **Memoización con `useMemo` y `useCallback`**: En el hook `usePokemon`, se utiliza `useMemo` para calcular las listas `filteredPokemons` y `favoritePokemons`. Esto asegura que los cálculos costosos solo se re-ejecuten si las dependencias (`pokemons`, `searchFilter`) cambian, evitando re-renderizados innecesarios.
2.  **Carga Diferida de Imágenes (`loading="lazy"`)**: Las imágenes de los Pokémon en `PokemonCard` utilizan el atributo `loading="lazy"` del navegador para que solo se descarguen cuando están a punto de entrar en el viewport, mejorando el tiempo de carga inicial.
3.  **Estado de Carga Visual (`Skeleton`)**: Se muestra un componente `PokemonSkeleton` mientras se espera la respuesta de la API, mejorando la experiencia de usuario al proporcionar feedback visual inmediato.
4.  **Persistencia de Favoritos**: El uso de `localStorage` para guardar los favoritos asegura que las preferencias del usuario no se pierdan al recargar la página.

---

## 7. Estructura de Archivos y Roles

```
/src
├── app/
│   └── App.jsx              # Componente principal que orquesta la aplicación.
├── assets/
│   └── logo.svg             # Assets estáticos como el logo.
├── components/
│   ├── pokemon/
│   │   ├── PokemonCard.jsx  # Tarjeta para mostrar un Pokémon.
│   │   └── PokemonList.jsx  # Muestra la lista de tarjetas de Pokémon.
│   ├── ui/
│   │   └── PokemonSkeleton.jsx # Componente de carga (esqueleto).
│   └── SearchPokemon.jsx      # Input de búsqueda.
├── features/
│   └── pokemon/
│       └── pokemonSlice.js  # Slice de Redux para la lógica de Pokémon (API, filtros, favoritos).
├── hooks/
│   ├── useFavorites.js      # Hook para la lógica de favoritos.
│   └── usePokemon.js        # Hook principal para interactuar con el estado de Pokémon.
├── services/
│   └── api/
│       ├── config.js        # Configuración de la API (URLs, etc.).
│       └── pokemon.js       # Funciones para hacer llamadas a la PokéAPI.
├── store/
│   └── index.js             # Configura y combina los reducers para el store de Redux.
├── main.jsx                 # Punto de entrada de la aplicación. Renderiza App y provee el store.
└── index.css                # Estilos globales y de Tailwind.
```

---

## 8. Cómo Ejecutar el Proyecto Localmente

1.  Clona el repositorio:

    ```bash
    git clone https://github.com/Slinkter/myprojectapi07.git
    cd myprojectapi07
    ```

2.  Instala las dependencias (se recomienda `pnpm` o `npm`):

    ```bash
    npm install
    ```

3.  Inicia el servidor de desarrollo:

    ```bash
    npm run dev
    ```

4.  Abre http://localhost:5173 (o el puerto que indique Vite) en tu navegador.

### Scripts Disponibles

-   `npm run dev`: Inicia el servidor de desarrollo.
-   `npm run build`: Compila la aplicación para producción.
-   `npm run preview`: Previsualiza la build de producción localmente.
-   `npm run deploy`: Despliega la aplicación en GitHub Pages.