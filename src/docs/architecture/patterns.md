# 🧩 Patrones de Diseño Aplidados

## 1. Custom Hooks as Containers

Utilizamos Hooks para separar la lógica de efectos y estado de la UI.

- **Ejemplo:** `usePokemon.js` actúa como el orquestador de datos.

## 2. Singleton Service (httpClient)

Garantizamos una única instancia de configuración de API para toda la aplicación.

- **Ejemplo:** `src/lib/httpClient.js`.

## 3. Redux Toolkit Slice Pattern

Agrupamos acciones y reducers en archivos cohesivos para evitar el "prop-drilling" y facilitar el manejo de estados complejos asíncronos.

## 4. Conditional Rendering y Skeletons

Para mejorar la UX perceived, implementamos patrones de carga progresiva.

- **Ejemplo:** `PokemonContent.jsx` gestiona los estados de Loading/Error/Success.

## 5. Composition Pattern

Usamos la composición de componentes para evitar componentes gigantes (God Components).

- **Ejemplo:** `PokedexPage` compone `Navbar`, `Header`, `SearchBar`, `FavoritesBar` y `Content`.

---

[Regresar al README](../../README.md)
