# Glosario de Términos

Este glosario define los conceptos, librerías, patrones y terminología específica utilizados en el proyecto `myprojectapi07`.

---

### A

*   **Alias (`@`)**: Un atajo configurado para `src/` que permite importaciones de módulos absolutas, mejorando la legibilidad y la mantenibilidad.

*   **Arquitectura Limpia (Clean Architecture)**: Un enfoque de diseño de software que separa las preocupaciones en capas concéntricas, haciendo el código independiente de frameworks, UI y bases de datos.

*   **Axios**: Una librería de cliente HTTP basada en promesas para el navegador y Node.js, utilizada para realizar peticiones a la API.

### C

*   **Componente Contenedor (Container Component)**: Ver **Container/Presentation Pattern**.

*   **Componente de Presentación (Presentation Component)**: Ver **Container/Presentation Pattern**.

*   **Container/Presentation Pattern**: Patrón de diseño para React que divide los componentes en "Contenedores" (manejan la lógica y los datos) y "Presentación" (manejan cómo se ve la UI).

*   **Custom Hook**: Funciones de JavaScript que permiten reutilizar lógica con estado entre componentes de React. Deben comenzar con `use` (ej. `usePokemon`).

### D

*   **Deuda Técnica**: El costo implícito de un trabajo adicional causado por elegir una solución fácil o limitada ahora en lugar de usar un enfoque mejor que llevaría más tiempo.

*   **DX (Developer Experience)**: La calidad de la experiencia que tienen los desarrolladores al interactuar con un proyecto, API o herramienta.

*   **DRY (Don't Repeat Yourself)**: Principio de desarrollo de software que busca reducir la duplicación de código en la programación.

### F

*   **Feature-Based Architecture**: Una estructura de proyecto donde el código se organiza por funcionalidades de negocio (features), encapsulando toda la lógica (UI, estado, servicios) relacionada con esa feature en un único directorio.

### K

*   **KISS (Keep It Simple, Stupid)**: Principio de diseño que establece que la mayoría de los sistemas funcionan mejor si se mantienen simples en lugar de complicados.

### M

*   **Material UI (MUI)**: Una popular librería de componentes de React que implementa las directrices de Material Design de Google. Es la **única** librería de UI autorizada en este proyecto.

*   **Mermaid**: Una herramienta de diagramación y visualización basada en Markdown, utilizada para generar diagramas y gráficos a partir de texto.

### P

*   **PascalCase**: Convención de nombrado donde la primera letra de cada palabra en un identificador compuesto está en mayúscula (ej. `PokemonCard`, `PokedexPage`). Utilizado para componentes React.

*   **Pnpm**: Un gestor de paquetes alternativo a `npm` o `yarn` que utiliza un enlace simbólico de contenidos para ahorrar espacio en disco y acelerar la instalación de paquetes.

*   **`PropTypes`**: Un paquete de React que permite validar los tipos de las propiedades (`props`) pasadas a los componentes. Es crucial en proyectos JavaScript para atrapar errores en tiempo de desarrollo.

### R

*   **React**: Una librería de JavaScript para construir interfaces de usuario, mantenida por Facebook.

*   **Redux Toolkit (RTK)**: El conjunto de herramientas oficial y recomendado para el desarrollo con Redux. Simplifica las tareas de configuración del store, escritura de reducers y gestión de la lógica asíncrona.

### S

*   **Slice (Redux)**: En Redux Toolkit, un "slice" es una colección de lógica de reducer, acciones y su estado inicial para una característica específica de la aplicación, definida en un solo archivo.

*   **SOLID**: Un conjunto de cinco principios de diseño de software (Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion) que promueven un código más comprensible, flexible y mantenible.

### T

*   **Tailwind CSS**: (OBSOLETO en este proyecto) Un framework CSS de utilidad-first para construir rápidamente diseños personalizados. Su uso está prohibido en este proyecto en favor de MUI.

*   **TypeScript**: Un superset de JavaScript que añade tipado estático opcional. (Actualmente no utilizado en este proyecto, se usa JavaScript).

### V

*   **Vite**: Una herramienta de desarrollo frontend moderna que proporciona un entorno de desarrollo extremadamente rápido y un bundler para la construcción de producción.

---
*Este documento es generado y mantenido automáticamente como parte de la documentación del proyecto.*
