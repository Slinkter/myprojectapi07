# Arquitectura: Registro de Decisiones Técnicas

Este documento detalla las decisiones técnicas significativas tomadas durante la auditoría, refactorización y desarrollo inicial del proyecto `myprojectapi07`. Cada entrada describe el problema, las alternativas consideradas y la justificación de la elección.

---

## 1. Adopción de Material UI (MUI) como Única Librería de Componentes UI

*   **Fecha:** 31 de Diciembre de 2025
*   **Problema:** El proyecto inicial presentaba una mezcla de `@mui/material` y `@material-tailwind/react` con clases de Tailwind CSS directamente en los `className`. Esto generaba inconsistencias visuales, un bundle size innecesario y complejidad en la gestión de estilos.
*   **Alternativas Consideradas:**
    *   Mantener la mezcla, intentando estandarizar las convenciones.
    *   Eliminar MUI y adoptar Material Tailwind como única librería de componentes UI + Tailwind CSS.
    *   Eliminar Material Tailwind y Tailwind CSS, estandarizando solo con MUI.
*   **Decisión:** Se optó por **eliminar `@material-tailwind/react` y Tailwind CSS** del stack y utilizar **únicamente Material UI (MUI)** para toda la construcción de componentes UI y su estilizado.
*   **Justificación:**
    *   **Simplificación del Stack:** Reduce la complejidad del proyecto al tener una única fuente de componentes y sistema de estilos.
    *   **Consistencia Visual:** Asegura una adhesión completa a las directrices de Material Design a través de los componentes y el sistema de theming de MUI.
    *   **Reducción del Bundle Size:** Elimina dependencias redundantes.
    *   **Mejor DX:** Permite a los desarrolladores enfocarse en un solo ecosistema de UI, utilizando `sx` prop y `styled()` API para la personalización.
*   **Impacto:** Requiere una refactorización completa de los componentes existentes que utilizan Material Tailwind o clases directas de Tailwind.

## 2. Implementación de Arquitectura Basada en Features

*   **Fecha:** 31 de Diciembre de 2025
*   **Problema:** La estructura inicial del proyecto presentaba directorios globales para `components`, `pages` y `services`, lo que generaba un acoplamiento laxo y dificultaba la localización de código relacionado con una funcionalidad de negocio específica.
*   **Alternativas Consideradas:**
    *   Mantener la estructura por tipo técnico.
    *   Adoptar una estructura modular más estricta (ej. DDD).
*   **Decisión:** Se implementó una **Arquitectura Basada en Features**, donde el código se organiza por funcionalidades de negocio.
*   **Justificación:**
    *   **Cohesión y Modularidad:** Cada feature se convierte en un módulo autocontenido, facilitando su desarrollo, mantenimiento y eliminación.
    *   **Escalabilidad:** Permite un crecimiento orgánico del proyecto, donde añadir una nueva feature implica la creación de un nuevo directorio sin afectar la estructura global.
    *   **Claridad:** Mejora la comprensión del propósito de cada parte del código.
*   **Impacto:** Requerirá la reorganización de muchos archivos existentes, moviéndolos a sus respectivos directorios de feature o a directorios globales de componentes/hooks/servicios agnósticos.

## 3. Uso de Rutas Absolutas con Alias `@`

*   **Fecha:** 31 de Diciembre de 2025
*   **Problema:** Aunque la configuración ya existía, la convención no estaba formalizada ni auditada, pudiendo llevar a inconsistencias con rutas relativas (`../../..`).
*   **Alternativas Consideradas:**
    *   Usar solo rutas relativas (descartado por las desventajas conocidas).
*   **Decisión:** Se formalizó el uso **obligatorio** de rutas absolutas con el alias `@` para todas las importaciones que referencien archivos fuera del directorio actual o subdirectorios inmediatos.
*   **Justificación:**
    *   **Mantenibilidad:** Reduce drásticamente la necesidad de actualizar rutas al mover archivos.
    *   **Legibilidad:** Elimina las cadenas largas de `../`, haciendo el código más fácil de leer.
    *   **Robustez:** Proporciona un sistema de importación más robusto ante refactorizaciones de la estructura de directorios.
*   **Impacto:** Ya implementado y auditado, se documentó para asegurar su cumplimiento futuro.

## 4. Patrón Container/Presentation para UI React

*   **Fecha:** 31 de Diciembre de 2025
*   **Problema:** Componentes como `PokedexPage.jsx` acumulaban demasiadas responsabilidades, mezclando lógica de negocio, manejo de estado y renderizado de UI complejo.
*   **Alternativas Consideradas:**
    *   Mantener componentes monolíticos.
    *   Aplicar solo Custom Hooks sin una separación UI/lógica tan estricta.
*   **Decisión:** Se adoptó formalmente el patrón **Container/Presentation** para la UI de React.
*   **Justificación:**
    *   **Separación de Responsabilidades:** Contenedores para la lógica de datos y negocio; Presentación para la UI pura.
    *   **Reusabilidad y Testabilidad:** Facilita la reutilización de componentes de presentación y la testabilidad de ambos tipos.
    *   **Claridad:** Hace el propósito de cada componente evidente.
*   **Impacto:** Requerirá la refactorización de componentes complejos, dividiéndolos en sus partes lógicas y de presentación.

## 5. Adopción de CSS Grid para Layouts de Listas

*   **Fecha:** 31 de Diciembre de 2025
*   **Problema:** Los layouts de listas, como la de Pokémon, necesitan ser robustos, responsivos y consistentes. El uso de Flexbox, aunque potente, puede ser menos explícito para la creación de grillas con un número de columnas estricto por breakpoint.
*   **Alternativas Consideradas:**
    *   Utilizar el componente `<Grid>` de MUI (basado en Flexbox).
    *   Utilizar CSS Grid nativo.
*   **Decisión:** Se estableció como **obligatorio el uso de CSS Grid nativo** para los layouts de listas principales. Esto se implementa a través de la prop `sx` en los componentes `<Box>` de MUI.
*   **Justificación:**
    *   **Control Explícito:** CSS Grid permite un control declarativo y explícito sobre el número de columnas y el espaciado (`gridTemplateColumns`, `gap`), cumpliendo con las estrictas reglas de diseño del proyecto.
    *   **Robustez:** Evita problemas de "filas desbalanceadas" que a veces ocurren con Flexbox.
    *   **Rendimiento:** Es el estándar moderno y más performante para layouts de grillas complejas.
*   **Impacto:** Se refactorizó `PokemonList.jsx` y el contenedor del esqueleto de carga en `PokedexPage.jsx` para usar `display: 'grid'`.

## 6. Rediseño de Tarjetas para Alto Impacto Visual

*   **Fecha:** 31 de Diciembre de 2025
*   **Problema:** El diseño inicial de las tarjetas (`PokemonCard`) era funcional pero visualmente "simplón", y la altura inconsistente de las tarjetas creaba un layout desbalanceado.
*   **Alternativas Consideradas:**
    *   Mantener el diseño simple.
    *   Realizar pequeños ajustes cosméticos.
*   **Decisión:** Se realizó una **reconstrucción completa del componente `PokemonCard`** para elevar su diseño a un nivel profesional.
*   **Justificación:**
    *   **Consistencia de Altura:** Se implementó una altura fija con Flexbox interno para asegurar que todas las tarjetas en una fila sean idénticas en tamaño.
    *   **Jerarquía y Estructura:** Se definió una estructura clara de "Header/Body/Footer" dentro de la tarjeta.
    *   **Riqueza Visual:** Se añadió información útil (tipos del Pokémon) y se implementaron animaciones de carga escalonada y efectos de hover y active más sofisticados.
    *   **Alineación con Estándares:** El nuevo diseño cumple con los estándares modernos de UI y está listo para producción.
*   **Impacto:** `PokemonCard.jsx` y `PokemonSkeleton.jsx` fueron completamente refactorizados, y la lista de Pokémon ahora presenta una apariencia mucho más pulida y profesional.

---
*Este documento es generado y mantenido automáticamente como parte de la documentación del proyecto.*