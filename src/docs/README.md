# myprojectapi07: Pokédex App

## Descripción y Propósito

Este proyecto es una aplicación web interactiva que simula una Pokédex, permitiendo a los usuarios explorar una lista de Pokémon, buscarlos, ver sus detalles y gestionar una lista de favoritos. La aplicación está diseñada para ser un ejemplo de arquitectura limpia, buenas prácticas de desarrollo Frontend y el uso de un stack tecnológico moderno y robusto.

## Stack Tecnológico Oficial

- **Frontend Framework:** React (v18+)
- **Lenguaje:** JavaScript ESNext + JSX (PropTypes para validación)
- **Estado Global:** Redux Toolkit (con `react-redux`)
- **Estilos:** Tailwind CSS 3.4+ (Puro - Sin librerías de componentes)
- **Gestión de API:** Axios
- **Bundler:** Vite (v5+)
- **Iconos:** React Icons, Heroicons
- **Animaciones:** Motion (Framer Motion)
- **Documentación:** Storybook 10
- **Notificaciones:** React Hot Toast
- **Lazy Loading:** React Lazy Load Image
- **Clases CSS:** clsx + tailwind-merge
- **Control de Versiones:** Git

## Características Principales

- Visualización de una lista paginada de Pokémon.
- Funcionalidad de búsqueda y filtrado de Pokémon.
- Gestión de Pokémon favoritos persistente.
- Detalles de cada Pokémon (nombre, tipo, imagen).
- Alternancia de temas (claro/oscuro).
- Diseño responsivo y adaptativo para diferentes dispositivos.

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

- `pnpm run dev`: Inicia el servidor de desarrollo de Vite.
- `pnpm run build`: Compila la aplicación para producción.
- `pnpm run lint`: Ejecuta ESLint para revisar problemas de código.
- `pnpm run preview`: Sirve la build de producción localmente para previsualización.
- `pnpm run predeploy`: Prepara la build para despliegue (paso previo a `deploy`).
- `pnpm run deploy`: Despliega la aplicación a GitHub Pages.

## Estructura de Directorios

La estructura de directorios del proyecto se adhiere a los principios de la arquitectura basada en features. Consulta el documento de [Arquitectura General](src/docs/architecture/overview.md) para más detalles.

## Documentación Adicional

Para una comprensión más profunda del proyecto, consulta la documentación completa ubicada en el directorio `src/docs/`.

### 📋 Documentos Principales

- [**🎯 Resumen Ejecutivo**](00-RESUMEN-EJECUTIVO.md) - Vista rápida del proyecto
- [**📊 Diagnóstico del Proyecto**](01-diagnostico-del-proyecto.md) - Análisis técnico completo
- [**🔄 Metodología SCRUM**](02-metodologia-scrum.md) - Marco de trabajo
- [**🎨 Diseño UX/UI**](03-diseno-ux-ui.md) - Sistema de diseño y heurísticas
- [**📦 Inventario Tecnológico**](04-inventario-tecnologico.md) - Stack oficial
- [**💰 Costos y Justificación**](05-costos-y-justificacion.md) - Análisis de viabilidad
- [**📘 Glosario de Términos**](glossary.md) - Definiciones técnicas A-Z

### 🏛️ Arquitectura

- [Visión General de Arquitectura](architecture/overview.md) - **Documento maestro**
- [Decisiones Técnicas (ADRs)](architecture/decisions.md)
- [Gestión de Importaciones (Alias @)](architecture/imports.md)
- [Patrones de Diseño](architecture/patterns.md)

### 📝 Requerimientos

- [Requerimientos Funcionales](requirements/functional.md)
- [Requerimientos No Funcionales](requirements/non-functional.md)

### 💻 Desarrollo

- [Setup del Entorno](development/setup.md)
- [Convenciones de Código](development/conventions.md)
- [Integración con API](development/api-integration.md)
- [Gestión de Estado (Redux)](development/state-management.md)

### 🔧 Mantenimiento y Operaciones

- [Hoja de Ruta](maintenance/roadmap.md)
- [Guía de Troubleshooting](maintenance/troubleshooting.md)
- [Proceso de Despliegue](deployment/process.md)

### 🛡️ Calidad y Seguridad

- [Estrategia de Testing](quality/testing.md)
- [Guías de Seguridad](security/guidelines.md)

---

_Este README es generado y mantenido automáticamente como parte de la documentación del proyecto._
