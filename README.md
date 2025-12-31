# Proyecto: Pokédex con React

## 1. Demo en Vivo

Puedes ver la aplicación funcionando en el siguiente enlace:

[https://slinkter.github.io/myprojectapi07/](https://slinkter.github.io/myprojectapi07/)

![Captura de la aplicación](api07.png "Pokédex con React")

---

## 2. Descripción General

Esta es una aplicación web de página única (SPA) desarrollada con React que consume la PokéAPI para obtener y mostrar una lista de Pokémon. La aplicación permite filtrar los Pokémon en tiempo real, marcarlos como favoritos, navegar por páginas y presenta una interfaz de usuario moderna y reactiva con soporte para tema claro/oscuro.

El proyecto está diseñado siguiendo las mejores prácticas, con un enfoque en un código limpio, escalable y mantenible a través de una arquitectura robusta que combina Redux Toolkit para el estado y hooks personalizados para la lógica de negocio, adhiriéndose estrictamente a los principios SOLID.

---

## 3. Características Principales

-   **Visualización de Pokémon:** Carga y muestra una lista de Pokémon desde la PokéAPI.
-   **Búsqueda en Tiempo Real:** Filtra la lista de Pokémon de forma instantánea a medida que el usuario escribe.
-   **Sistema de Favoritos:** Permite al usuario marcar y desmarcar Pokémon como favoritos. La selección se guarda en `localStorage` para persistir entre sesiones.
-   **Tema Claro/Oscuro:** Permite al usuario cambiar entre un tema claro y uno oscuro. La aplicación detecta la preferencia del sistema operativo en la primera visita y guarda la selección en `localStorage`.
-   **Paginación:** Navegación por páginas para explorar la lista completa de Pokémon de manera eficiente.
-   **Carga Asíncrona Optimizada:** Muestra una animación de "esqueleto" (skeleton) mientras se cargan los datos iniciales.
-   **Manejo de Errores:** Presenta un mensaje de error claro y un botón para reintentar la carga en caso de fallo de la API.
-   **Diseño Responsivo:** La interfaz se adapta correctamente a diferentes tamaños de pantalla, desde móviles hasta escritorio.
-   **Animaciones Sutiles:** Utiliza efectos de transición para una experiencia de usuario más fluida.

---

## 4. Arquitectura Aplicada

La arquitectura de este proyecto sigue los principios de **Clean Architecture** y **Feature-Sliced Design**, resultando en un sistema altamente modular, desacoplado y mantenible.

### a. Arquitectura Feature-Sliced

El código fuente está organizado por "features" (características). Cada feature encapsula toda la lógica, componentes, estado y hooks relacionados con una funcionalidad específica del negocio.

-   **Estructura:** El directorio `src/features` contiene subdirectorios para cada feature (`pokemon`, `search`, `favorites`, `theme`).
-   **Co-localización:** Los componentes, hooks y lógica de estado (slices de Redux) residen juntos dentro de su respectiva carpeta de feature. Por ejemplo, `features/search/` contiene el componente `SearchPokemon.jsx`, el hook `useSearch.js` y el slice `searchSlice.js`.
-   **Beneficios:** Esta organización hace que el código sea más fácil de encontrar, entender y modificar. Reduce el acoplamiento entre features y mejora la escalabilidad del proyecto.

### b. Capas de la Aplicación

La arquitectura se divide en capas claras, inspiradas en Clean Architecture:

1.  **Capa de UI (Presentación):**
    -   **`pages`**: Componentes de alto nivel que representan las páginas de la aplicación (ej. `PokedexPage.jsx`). Componen la UI a partir de componentes de features y layout.
    -   **`components`**: Contiene componentes de UI verdaderamente reutilizables y agnósticos a la lógica de negocio, como `PokemonCard.jsx` o `PokemonSkeleton.jsx`.
    -   **`app`**: El punto de entrada de la aplicación (`App.jsx`) que configura el layout principal y el enrutamiento (si lo hubiera).

2.  **Capa de Lógica de Negocio (Dominio):**
    -   **`features`**: Aquí reside el corazón de la lógica de la aplicación. Los custom hooks (ej. `usePokemon.js`) extraen y encapsulan la lógica de negocio y la interacción con el estado, proveyendo una API sencilla a la capa de UI.
    -   **`store`**: Configuración del store de Redux, que actúa como el gestor de estado centralizado.

3.  **Capa de Datos (Infraestructura):**
    -   **`services/api`**: Responsable de la comunicación con fuentes de datos externas (en este caso, la PokéAPI). Abstrae los detalles de las llamadas HTTP (con `axios`) y transforma los datos de la API en un formato útil para la aplicación.

### c. Flujo de Datos Unidireccional

La aplicación sigue un flujo de datos unidireccional estricto, gestionado por Redux:
`UI (Despacha Acción) -> Redux Slice -> Store (Actualiza Estado) -> UI (Se Re-renderiza con el Nuevo Estado)`

Los custom hooks actúan como intermediarios, simplificando la interacción de los componentes con el store de Redux.

### d. Principios SOLID Aplicados

-   **Single Responsibility Principle (SRP):** Cada slice, hook y componente tiene una única responsabilidad.
-   **Open/Closed Principle (OCP):** La arquitectura de features permite añadir nuevas funcionalidades sin modificar el código existente.
-   **Dependency Inversion Principle (DIP):** Los componentes de UI dependen de abstracciones (hooks) en lugar de implementaciones concretas, lo que desacopla la UI de la lógica de estado.

---

## 5. Tecnologías Utilizadas

-   **React 18:** Para la construcción de la interfaz de usuario.
-   **Vite:** Como herramienta de empaquetado y servidor de desarrollo de alta velocidad.
-   **Redux Toolkit:** Para la gestión del estado global de la aplicación.
-   **React Redux:** Para conectar los componentes de React con el store de Redux.
-   **Axios:** Para realizar las peticiones HTTP a la PokéAPI.
-   **Tailwind CSS:** Para un desarrollo de estilos rápido y personalizable.
-   **Material-UI (MUI) & Material-Tailwind:** Para componentes de layout y UI.
-   **Heroicons:** Para iconos utilizados en la interfaz.
-   **ESLint:** Para mantener un código limpio y consistente.
-   **JSDoc:** Para documentación de código.

---

## 6. Estructura de Archivos

```
/src
├── app/
│   └── App.jsx              # Componente raíz que define el layout principal.
├── assets/
│   └── logo.svg             # Assets estáticos.
├── components/
│   ├── pokemon/
│   │   ├── PokemonCard.jsx  # Componente de UI para mostrar un Pokémon.
│   │   └── PokemonList.jsx  # Componente de UI para la lista de Pokémon.
│   └── ui/
│       └── PokemonSkeleton.jsx # Componente de UI para el estado de carga.
├── features/
│   ├── favorites/
│   │   ├── favoritesSlice.js # Slice para el estado de favoritos.
│   │   └── useFavorites.js   # Hook para la lógica de favoritos.
│   ├── pokemon/
│   │   ├── pokemonSlice.js   # Slice para el estado de la lista de Pokémon.
│   │   └── usePokemon.js     # Hook para la lógica de fetching y paginación.
│   ├── search/
│   │   ├── SearchPokemon.jsx # Componente de UI y lógica para la búsqueda.
│   │   ├── searchSlice.js    # Slice para el estado de la búsqueda.
│   │   └── useSearch.js      # Hook para la lógica de búsqueda.
│   └── theme/
│       ├── themeSlice.js     # Slice para el estado del tema.
│       └── useTheme.js       # Hook para la lógica del tema.
├── pages/
│   └── PokedexPage.jsx      # Página principal que compone las features.
├── services/
│   └── api/
│       ├── config.js        # Configuración de la API.
│       └── pokemon.js       # Lógica de fetching de datos de la API.
├── store/
│   └── index.js             # Configuración del store principal de Redux.
├── main.jsx                 # Punto de entrada de la aplicación.
└── index.css                # Estilos globales.
```

---

## 7. Cómo Ejecutar el Proyecto Localmente

1.  Clona el repositorio:

    ```bash
    git clone https://github.com/Slinkter/myprojectapi07.git
    cd myprojectapi07
    ```

2.  Instala las dependencias (se recomienda `pnpm`):

    ```bash
    pnpm install
    ```

3.  Inicia el servidor de desarrollo:

    ```bash
    pnpm run dev
    ```

4.  Abre http://localhost:5173 (o el puerto que indique Vite) en tu navegador.

### Scripts Disponibles

-   `pnpm run dev`: Inicia el servidor de desarrollo.
-   `pnpm run build`: Compila la aplicación para producción.
-   `pnpm run preview`: Previsualiza la build de producción localmente.
-   `pnpm run deploy`: Despliega la aplicación en GitHub Pages.
