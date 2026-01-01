# Desarrollo e Implementación: Convenciones de Código

Este documento establece las convenciones de código obligatorias para el proyecto `myprojectapi07`. Adherirse a estas convenciones es fundamental para garantizar la coherencia, legibilidad y mantenibilidad de la base de código.

---

## 1. Convenciones de Nombres

Una nomenclatura consistente es clave para la predictibilidad y la rapidez en la comprensión del código.

*   **Componentes React:** `PascalCase.jsx`
    *   **Descripción:** Todos los archivos que exportan un componente React deben usar PascalCase.
    *   **Ejemplos:** `PokemonCard.jsx`, `MainLayout.jsx`.
*   **Hooks:** `useCamelCase` (función) y `use-camel-case.js` (archivo)
    *   **Descripción:** El nombre de la función hook **debe** comenzar con `use`. El nombre del archivo que lo contiene debe estar en `kebab-case`.
    *   **Ejemplos:** `usePokemon()` en `use-pokemon.js`, `useDebounce()` en `use-debounce.js`.
*   **Otros Archivos:** `kebab-case.js`
    *   **Descripción:** Todos los demás archivos de JavaScript/TypeScript (slices de Redux, servicios, utils, etc.), así como archivos de estilos, deben usar `kebab-case`.
    *   **Ejemplos:** `pokemon-slice.js`, `api-config.js`, `local-storage.js`.

## 2. Separación de Componentes

Se prohíben los componentes monolíticos (God Components).

*   **Regla General:** Un componente debe hacer una única cosa y hacerla bien.
*   **Criterios para Dividir un Componente:**
    *   Si un componente excede las **150-200 líneas**, es un candidato fuerte para ser dividido.
    *   Si maneja múltiples piezas de estado no relacionadas o lógicas de negocio diversas.
    *   Si parte de su UI es compleja y podría ser una unidad autocontenida.
    *   Si una parte del componente es reutilizable en otros lugares.

## 3. Validación con `PropTypes`

Dado que el proyecto utiliza JavaScript, el uso de `PropTypes` es **obligatorio** para asegurar la integridad de los componentes y atrapar errores en desarrollo.

*   **Obligatoriedad:** Todo componente que reciba `props` debe tener un bloque `propTypes` que las valide.
*   **Tipado Estricto:** Utilizar el tipado más específico posible (ej. `string.isRequired`, `bool`, `shape`).
*   **Props Opcionales:** Deben tener un valor por defecto (en `defaultProps` o desestructuración).
*   **Ejemplo:**
    ```jsx
    import PropTypes from 'prop-types';

    function MyComponent({ value, onClick }) { /* ... */ }

    MyComponent.propTypes = {
      value: PropTypes.string.isRequired,
      onClick: PropTypes.func,
    };

    MyComponent.defaultProps = {
      onClick: () => {},
    };
    ```

## 4. Ordenación de `import`

Una ordenación estándar mejora drásticamente la legibilidad. Se recomienda configurar un linter (ESLint) para automatizarlo.

1.  **React:** `import React from 'react';`
2.  **Librerías Externas:** `import axios from 'axios';`
3.  **Proveedores y Rutas:** `import { AppRoutes } from '@/routes';`
4.  **Store de Redux:** `import { useAppDispatch } from '@/store';`
5.  **Servicios y Libs:** `import { apiClient } from '@/lib/axios';`
6.  **Features:** `import { PokemonCard } from '@/features/pokemon/components';`
7.  **Componentes Compartidos:** `import { Button } from '@/components/ui';`
8.  **Hooks Compartidos:** `import { useDebounce } from '@/hooks';`
9.  **Utils y Assets:** `import { API_URL } from '@/utils/constants';`
10. **Imports Relativos:** `import { someHelper } from './helpers';`
11. **Estilos:** `import './MyComponent.css';`

## 5. Sistema de Estilos: Material UI (MUI) Exclusivo

*   **Librería Única:** **Material UI (`@mui/material`)** es la única librería de componentes UI y sistema de estilos autorizado.
*   **Métodos de Estilizado:**
    *   **`sx` Prop:** Para overrides puntuales y estilos ad-hoc en los componentes MUI.
    *   **`styled()` API:** Para crear componentes personalizados y reutilizables con estilos complejos definidos programáticamente.
*   **Prohibiciones:** Está **prohibido** el uso de `className` con clases de Tailwind CSS, así como de la librería `@material-tailwind/react`. Cualquier código existente que haga uso de estas debe ser refactorizado.

## 6. Uso Correcto de Patrones de Diseño

*   **Container/Presentation:** Aplicar estrictamente el patrón: Contenedores para la lógica y datos, Presentación para la UI.
*   **Custom Hooks:** Utilizar para encapsular y reutilizar lógica con estado o de negocio, tanto a nivel de feature como global.
*   **Feature Isolation:** Evitar que una feature importe directamente de otra. La comunicación debe ser a través del Redux store o por composición a nivel de páginas.

---
*Este documento es generado y mantenido automáticamente como parte de la documentación del proyecto.*
