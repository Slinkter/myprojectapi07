# Pokédex API 07

---

**Pokédex API 07** es una aplicación web moderna, construida con **React** y **Vite**, que permite a los usuarios explorar el mundo de los Pokémon. La aplicación consume la [PokéAPI v2](https://pokeapi.co/) y presenta los datos en una interfaz de usuario limpia, rápida y totalmente responsive.

Este proyecto no solo sirve como una herramienta funcional para los fans de Pokémon, sino también como un caso de estudio avanzado en arquitectura de software frontend. Demuestra principios de Arquitectura Limpia a través de patrones como el **Diseño Orientado a Características (Feature-Sliced Design)**, un sistema de **Enrutamiento** claro, **Componentes de Presentación** reutilizables, y una robusta gestión de estado global con **Redux Toolkit** y **selectores memoizados**.

![Project Screenshot](api07.png)

## ✨ Características Principales

- **Catálogo y Paginación de Pokémon:** Explora la lista completa de Pokémon con un sistema de paginación eficiente.
- **Búsqueda en Tiempo Real:** Filtra Pokémon por nombre al instante.
- **Gestión de Favoritos:** Marca tus Pokémon favoritos y visualízalos en una sección dedicada.
- **Modo Oscuro:** Cambia entre temas claro y oscuro para una mayor comodidad visual.
- **Diseño Totalmente Responsive:** Disfruta de una experiencia de usuario óptima en cualquier dispositivo.
- **Animaciones y Transiciones Suaves:** La interfaz está mejorada con animaciones que mejoran la experiencia de usuario sin sacrificar el rendimiento.

## 🚀 Pila Tecnológica

- **Framework:** [React 18](https://reactjs.org/)
- **Herramienta de Construcción:** [Vite](https://vitejs.dev/)
- **Enrutamiento:** [React Router](https://reactrouter.com/)
- **Lenguaje:** JavaScript (ES6+)
- **Estilos:** [Tailwind CSS](https://tailwindcss.com/)
- **Gestión de Estado Global:** [Redux Toolkit](https://redux-toolkit.js.org/)
- **Cliente HTTP:** [Axios](https://axios-http.com/)
- **Iconos:** [React Icons](https://react-icons.github.io/react-icons/)
- **Despliegue:** [GitHub Pages](https://pages.github.com/)

---

## 🏛️ Arquitectura Aplicada

La arquitectura del proyecto está diseñada para ser modular, escalable y mantenible, adhiriéndose a los principios de **Arquitectura Limpia** y **SOLID**.

### Principios Fundamentales

- **Diseño Orientado a Características (Feature-Sliced Design):** El código base está organizado por características (ej., `pokemon`, `search`, `favorites`). Cada característica es un módulo autocontenido que encapsula su propia UI (componentes), lógica (hooks), estado (slice de Redux) y servicios de API. Esto promueve un bajo acoplamiento y una alta cohesión.
- **Separación de Preocupaciones:** Se mantiene una estricta separación entre las diferentes capas de la aplicación:
  - **Componentes (UI):** Se utilizan componentes "tontos" o de presentación para renderizar la UI, mientras que los componentes "inteligentes" o contenedores orquestan la lógica.
  - **Hooks (Lógica con Estado):** Los hooks personalizados encapsulan la lógica con estado reutilizable (ej., `usePagination`).
  - **Redux (Estado Global):** Redux Toolkit gestiona el estado global. La lógica de negocio que involucra múltiples características se maneja mediante **selectores memoizados** (`createSelector`) para calcular datos derivados de manera eficiente.
  - **Servicios (API):** Una capa de API dedicada (`pokemonApi.js`) gestiona todas las solicitudes de red, abstrayendo los detalles de implementación del resto de la aplicación.

### Patrones Arquitectónicos Clave

1.  **Layout y Enrutamiento:**
    - Un sistema de enrutamiento declarativo es gestionado por **`react-router-dom`**.
    - Un componente `MainLayout` proporciona una estructura de interfaz de usuario consistente (barra de navegación, fondo) para todas las páginas principales.
    - El componente `AppRoutes` define la estructura de las páginas de la aplicación, utilizando `<Outlet>` para renderizar el contenido dentro del layout.

2.  **Componentes Reutilizables:**
    - Los elementos de UI comunes y sin estado se encuentran en `src/components/common` (ej., `Pagination.jsx`). Estos componentes están diseñados para ser altamente reutilizables y reciben todos sus datos y callbacks a través de props.

3.  **Gestión de Estado y Flujo de Datos:**
    - **Única Fuente de Verdad:** El estado global es gestionado por Redux. Para el estado local o específico de la UI, se utilizan los hooks nativos de React (`useState`, `useCallback`), como se ve en `usePagination`.
    - **Flujo de Datos Unidireccional:** Los datos fluyen de Redux o hooks hacia los componentes. Los eventos fluyen desde los componentes a través de callbacks.
    - **Selectores Memoizados:** Para evitar re-renders innecesarios y mantener la lógica de negocio fuera de los componentes, se utiliza `createSelector` para calcular el estado derivado (ej., filtrar y mapear listas de Pokémon). Los componentes se suscriben a estos datos procesados, no al estado crudo.

---

## 📦 Instalación y Configuración

Para ejecutar este proyecto en tu entorno local, sigue estos pasos:

1.  **Clonar el repositorio:**

    ```bash
    git clone https://github.com/slinkter/myprojectapi07.git
    cd myprojectapi07
    ```

2.  **Instalar dependencias:**
    Se recomienda usar `pnpm` para una gestión eficiente de los paquetes.

    ```bash
    pnpm install
    ```

3.  **Ejecutar el servidor de desarrollo:**
    ```bash
    pnpm run dev
    ```
    La aplicación estará disponible en `http://localhost:5173` (o el puerto que indique Vite).

## Scripts NPM

- `pnpm dev`: Inicia el servidor de desarrollo de Vite.
- `pnpm build`: Compila la aplicación para producción.
- `pnpm lint`: Analiza el código con ESLint.
- `pnpm preview`: Sirve la compilación de producción localmente para previsualización.

## 📄 Documentación Adicional

La documentación detallada del proyecto, incluyendo decisiones arquitectónicas y diagramas, se encuentra en el directorio [`/src/docs`](./src/docs/).
