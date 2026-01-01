# Calidad, Seguridad y Despliegue: Estrategia de Testing

Este documento describe la estrategia de testing adoptada para el proyecto `myprojectapi07`, incluyendo los tipos de pruebas, las herramientas utilizadas y las directrices para su implementación. El objetivo es garantizar la calidad, fiabilidad y robustez de la aplicación.

---

## 1. Principios de Testing

*   **Piráride de Testing:** Se seguirá el concepto de la Pirámide de Testing, con una base sólida de pruebas unitarias, un número moderado de pruebas de integración y una cantidad menor de pruebas E2E (End-to-End).
*   **Automatización:** Priorización de pruebas automatizadas para garantizar una ejecución rápida y consistente.
*   **Cobertura:** Búsqueda de una alta cobertura de pruebas en la lógica de negocio crítica, no necesariamente en el código total.
*   **Desarrollo Guiado por Pruebas (TDD):** Se fomenta la práctica de TDD para la implementación de nuevas funcionalidades, escribiendo las pruebas antes de la lógica de negocio.

## 2. Tipos de Pruebas

### 2.1 Pruebas Unitarias

*   **Propósito:** Verificar el comportamiento de las unidades más pequeñas y aisladas de la aplicación (funciones puras, componentes React muy simples, reducers de Redux, custom hooks sin interacción con DOM).
*   **Alcance:** Un solo componente o función, mockeando todas sus dependencias externas.
*   **Herramientas:**
    *   **Vitest:** Framework de testing (compatible con Vite).
    *   **React Testing Library:** Para probar componentes React de forma que se asemeje a la interacción del usuario.
    *   **`@reduxjs/toolkit` (testing utilities):** Para testing de slices y thunks de Redux.
*   **Ubicación:** Dentro del directorio de cada feature, en `src/features/[feature-name]/tests/`.

### 2.2 Pruebas de Integración

*   **Propósito:** Verificar que diferentes módulos o unidades trabajan correctamente cuando se combinan. Evaluar la interacción entre componentes, la conexión con el store de Redux, o la integración con servicios de API (mockeados).
*   **Alcance:** Grupos de componentes que trabajan juntos, interacción de un componente con su custom hook o slice de Redux.
*   **Herramientas:**
    *   **Vitest:** Framework de testing.
    *   **React Testing Library:** Para simular interacciones de usuario en componentes interconectados.
    *   **`msw` (Mock Service Worker):** Para mockear las llamadas a la API de forma declarativa, permitiendo probar la lógica de integración sin depender de un backend real.
*   **Ubicación:** Dentro del directorio de cada feature, en `src/features/[feature-name]/tests/`.

### 2.3 Pruebas End-to-End (E2E)

*   **Propósito:** Simular escenarios de usuario completos interactuando con la aplicación como un todo en un navegador real o simulado.
*   **Alcance:** Flujos de usuario críticos (ej. carga de la lista, búsqueda, marcar favorito y verificar persistencia).
*   **Herramientas:** (A definir, se sugiere)
    *   **Playwright / Cypress:** Frameworks de testing E2E.
*   **Ubicación:** En un directorio `tests/e2e/` en la raíz del proyecto.
*   **Nota:** Estas pruebas son más lentas y costosas de mantener, por lo que se usarán con moderación para los flujos más críticos.

## 3. Cobertura de Pruebas

*   **Lógica de Negocio (Reducers, Thunks, Custom Hooks de Feature):** Objetivo del 80% al 100%.
*   **Componentes UI (Presentacionales):** Enfoque en la interacción, no necesariamente en cada línea de código CSS o JSX.
*   **Integración:** Cubrir los caminos críticos de interacción entre módulos.

## 4. Ejecución de Pruebas

*   **Scripts:** Se definirán scripts en `package.json` para ejecutar los diferentes tipos de pruebas.
    *   `pnpm test:unit`: Ejecuta solo pruebas unitarias.
    *   `pnpm test:integration`: Ejecuta pruebas de integración.
    *   `pnpm test:e2e`: Ejecuta pruebas E2E.
    *   `pnpm test`: Ejecuta todas las pruebas.
    *   `pnpm test:coverage`: Ejecuta pruebas y genera un informe de cobertura.

## 5. Integración Continua

Las pruebas automatizadas se ejecutarán automáticamente en el pipeline de Integración Continua (CI) en cada `push` o `pull request` para asegurar que no se introduzcan regresiones.

---
*Este documento es generado y mantenido automáticamente como parte de la documentación del proyecto.*
