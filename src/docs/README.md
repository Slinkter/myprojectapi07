# myprojectapi07: Pokédex App

## Descripción y Propósito

Este proyecto es una aplicación web interactiva que simula una Pokédex, permitiendo a los usuarios explorar una lista de Pokémon, buscarlos, ver sus detalles y gestionar una lista de favoritos. La aplicación está diseñada para ser un ejemplo de arquitectura limpia, buenas prácticas de desarrollo Frontend y el uso de un stack tecnológico moderno y robusto.

## Stack Tecnológico Oficial

*   **Frontend Framework:** React (v18+)
*   **Lenguaje:** JavaScript ESNext
*   **Estado Global:** Redux Toolkit (con `react-redux`)
*   **Componentes UI:** Material UI (MUI - `@mui/material`)
*   **Gestión de API:** Axios
*   **Bundler:** Vite (v5+)
*   **Estilizado:** JSS (integrado en MUI)
*   **Control de Versiones:** Git

## Características Principales

*   Visualización de una lista paginada de Pokémon.
*   Funcionalidad de búsqueda y filtrado de Pokémon.
*   Gestión de Pokémon favoritos persistente.
*   Detalles de cada Pokémon (nombre, tipo, imagen).
*   Alternancia de temas (claro/oscuro).
*   Diseño responsivo y adaptativo para diferentes dispositivos.

## Arquitectura Aplicada

El proyecto sigue una arquitectura basada en **Features (funcionalidades)** y el patrón **Container/Presentation**, promoviendo la separación de responsabilidades, la modularidad y la escalabilidad. Esto se detalla en el documento de [Arquitectura General](src/docs/architecture/overview.md).

## Instalación y Setup del Entorno de Desarrollo

Para poner en marcha el proyecto en tu máquina local, sigue los siguientes pasos:

1.  **Clonar el repositorio:**
    ```bash
    git clone [URL_DEL_REPOSITORIO]
    cd myprojectapi07
    ```

2.  **Instalar dependencias:**
    Utiliza pnpm para la instalación de dependencias:
    ```bash
    pnpm install
    ```

3.  **Iniciar la aplicación en modo desarrollo:**
    ```bash
    pnpm run dev
    ```
    La aplicación se abrirá en tu navegador en `http://localhost:5173` (o un puerto similar).

## Scripts Disponibles

*   `pnpm run dev`: Inicia el servidor de desarrollo de Vite.
*   `pnpm run build`: Compila la aplicación para producción.
*   `pnpm run lint`: Ejecuta ESLint para revisar problemas de código.
*   `pnpm run preview`: Sirve la build de producción localmente para previsualización.
*   `pnpm run predeploy`: Prepara la build para despliegue (paso previo a `deploy`).
*   `pnpm run deploy`: Despliega la aplicación a GitHub Pages.

## Estructura de Directorios

La estructura de directorios del proyecto se adhiere a los principios de la arquitectura basada en features. Consulta el documento de [Arquitectura General](src/docs/architecture/overview.md) para más detalles.

## Documentación Adicional

Para una comprensión más profunda del proyecto, consulta la documentación completa ubicada en el directorio `src/docs/`.
*   [**Documentación Técnica General**](src/docs/DOCUMENTATION.md)
*   [Glosario de Términos](src/docs/glossary.md)
*   [Arquitectura General](src/docs/architecture/overview.md)
*   [Convenciones de Código](src/docs/development/conventions.md)
*   [Rutas Absolutas](src/docs/architecture/imports.md)

---
*Este README es generado y mantenido automáticamente como parte de la documentación del proyecto.*
