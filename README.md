#  Pokédex API 07  pokédex-react-app

* * *

**Pokédex API 07** es una aplicación web moderna, desarrollada con **React** y **Vite**, que permite a los usuarios explorar el mundo de los Pokémon. La aplicación consume la [PokéAPI v2](https://pokeapi.co/) para obtener datos y los presenta en una interfaz de usuario limpia, rápida y totalmente responsive.

Este proyecto no solo sirve como una herramienta funcional para los fans de Pokémon, sino también como un caso de estudio avanzado sobre arquitectura de software en el frontend, aplicando patrones como **Feature-Based Architecture**, hooks personalizados de React y un manejo de estado global robusto con **Redux Toolkit**.

![image](httpshttps://github.com/slinkter/myprojectapi07/assets/19446920/2756d11f-e91b-4cd3-a83d-0d603a1104a0)

## ✨ Características Principales

-   **Listado y Paginación de Pokémon:** Navega a través de un listado completo de Pokémon con un sistema de paginación eficiente.
-   **Búsqueda en Tiempo Real:** Filtra Pokémon por nombre al instante.
-   **Gestión de Favoritos:** Marca y desmarca tus Pokémon favoritos y visualízalos en una sección dedicada.
-   **Modo Oscuro (Dark Mode):** Cambia entre temas claro y oscuro para una mayor comodidad visual.
-   **Diseño Totalmente Responsive:** Disfruta de una experiencia de usuario óptima en cualquier dispositivo, desde móviles hasta escritorios.
-   **Animaciones y Transiciones Suaves:** La interfaz está enriquecida con animaciones que mejoran la experiencia de usuario sin sacrificar el rendimiento.

## 🚀 Stack Tecnológico

Este proyecto está construido con un conjunto de tecnologías modernas y eficientes, enfocadas en el rendimiento y la escalabilidad.

-   **Framework Principal:** [React 18](https://reactjs.org/)
-   **Build Tool:** [Vite](https://vitejs.dev/)
-   **Lenguaje:** JavaScript (ES6+)
-   **Estilos:** [Tailwind CSS](https://tailwindcss.com/)
-   **Manejo de Estado Global:** [Redux Toolkit](https://redux-toolkit.js.org/)
-   **Cliente HTTP:** [Axios](https://axios-http.com/)
-   **Iconos:** [React Icons](https://react-icons.github.io/react-icons/)
-   **Linting:** [ESLint](https://eslint.org/)
-   **Deployment:** [GitHub Pages](https://pages.github.com/)

> **Nota:** No se utilizan librerías de componentes de UI como Material-UI o Chakra UI. Todos los componentes son "custom" y están estilizados directamente con Tailwind CSS para un control total sobre el diseño.

## 🏛️ Arquitectura del Software

La arquitectura de este proyecto está diseñada para ser modular, escalable y fácil de mantener. El patrón principal es **Feature-Based Architecture**.

-   **`src/features`**: Contiene directorios para cada funcionalidad principal de la aplicación (ej. `pokemon`, `search`, `favorites`). Cada *feature* es un módulo autocontenido que encapsula sus propios componentes, hooks, estado de Redux (slice) y servicios de API.
-   **`src/shared`**: Contiene código reutilizable que no es específico de ninguna *feature*, como hooks genéricos (`usePagination`), componentes de UI básicos (ej. `Button`, `Spinner`) o utilidades.
-   **`src/pages`**: Actúa como el "orquestador". Estos componentes importan *features* y las componen para construir las diferentes páginas de la aplicación. Mantienen una lógica mínima, delegando la complejidad a los hooks.
-   **`src/store`**: Configura el store global de Redux, combinando los *reducers* de las diferentes *features*.
-   **`src/services` / `src/lib`**: Centralizan la configuración y la instanciación de clientes HTTP (Axios), interceptores y constantes de API.

Este enfoque promueve un bajo acoplamiento y una alta cohesión, permitiendo que el desarrollo y mantenimiento de funcionalidades se realice de forma aislada y segura.

## 📦 Instalación y Puesta en Marcha

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
    La aplicación estará disponible en `http://localhost:5173` (o el puerto que Vite indique).

## scripts npm disponibles

-   `pnpm dev`: Inicia el servidor de desarrollo de Vite.
-   `pnpm build`: Compila la aplicación para producción.
-   `pnpm lint`: Analiza el código con ESLint en busca de errores y problemas de estilo.
-   `pnpm preview`: Sirve localmente el build de producción para previsualización.

## 📄 Documentación Adicional

La documentación detallada del proyecto, incluyendo diagramas de arquitectura, glosario de términos y decisiones de diseño, se encuentra en el directorio [`/src/docs`](./src/docs/).