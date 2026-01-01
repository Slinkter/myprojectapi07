# Desarrollo e Implementación: Convenciones de Código

Este documento establece las convenciones de código obligatorias para el proyecto `myprojectapi07`. Adherirse a estas convenciones es fundamental para garantizar la coherencia, legibilidad y mantenibilidad de la base de código.

---

## 1. Convenciones de Nombres

Una nomenclatura consistente es clave para la predictibilidad y la rapidez en la comprensión del código.

*   **Componentes React:** `PascalCase.jsx`
*   **Hooks:** `useCamelCase` (función) y `use-camel-case.js` (archivo)
*   **Otros Archivos:** `kebab-case.js` (slices, servicios, utils, etc.)

## 2. Separación de Componentes

Se prohíben los componentes monolíticos (God Components). Un componente debe hacer una sola cosa. Se debe dividir si:
*   Supera las 150-200 líneas.
*   Maneja múltiples responsabilidades (lógica, estado y UI compleja).
*   Una parte de su UI es compleja o reutilizable.

## 3. Validación con `PropTypes`

Dado que el proyecto utiliza JavaScript, el uso de `PropTypes` es **obligatorio** para asegurar la integridad de los componentes. Todo componente que reciba `props` debe tener un bloque `propTypes` que las valide.

```jsx
import PropTypes from 'prop-types';

function MyComponent({ value, onClick = () => {} }) { /* ... */ }

MyComponent.propTypes = {
  value: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};
```

## 4. Ordenación de `import`

Una ordenación estándar mejora la legibilidad. Se recomienda configurar un linter para automatizarlo.

1.  **Hooks de React:** `import { useState, useEffect } from 'react';` (si es necesario)
2.  **Librerías Externas:** `import axios from 'axios';`
3.  **Rutas y Proveedores:** `import { AppRoutes } from '@/routes';`
4.  **Store de Redux:** `import { useAppDispatch } from '@/store';`
5.  **Servicios y Libs:** `import { apiClient } from '@/lib/axios';`
6.  **Features:** `import { PokemonCard } from '@/features/pokemon/components';`
7.  **Componentes Compartidos:** `import { Button } from '@/components/ui';`
8.  **Hooks Compartidos:** `import { useDebounce } from '@/hooks';`
9.  **Utils y Assets:** `import { API_URL } from '@/utils/constants';`
10. **Imports Relativos:** `import { someHelper } from './helpers';`

## 5. Sistema de Estilos: Material UI (MUI) Exclusivo

*   **Librería Única:** **Material UI (`@mui/material`)** es la única librería de componentes y sistema de estilos autorizado.
*   **Métodos de Estilizado:** `sx` Prop y `styled()` API.
*   **Prohibiciones:** Está **prohibido** el uso de `className` con clases de Tailwind CSS y la librería `@material-tailwind/react`.

## 6. Layouts de Grid (CSS Grid Obligatorio)

*   **Tecnología:** Para layouts de listas principales (como `PokemonList`), se debe usar **CSS Grid nativo**. No se debe usar Flexbox ni el componente `<Grid>` de MUI para este propósito.
*   **Implementación:** Se debe aplicar usando la prop `sx` en un componente `<Box>` de MUI.
    ```jsx
    <Box sx={{ display: 'grid', ... }}>
    ```
*   **Columnas por Breakpoint (Regla Estricta):**
    *   **Móvil (`xs`):** 1 columna (`gridTemplateColumns: 'repeat(1, 1fr)'`)
    *   **Tablet (`sm`):** 2 columnas (`gridTemplateColumns: 'repeat(2, 1fr)'`)
    *   **Desktop (`md`):** 3 columnas (`gridTemplateColumns: 'repeat(3, 1fr)'`)
    *   **Desktop Ancho (`lg`):** 4 columnas (`gridTemplateColumns: 'repeat(4, 1fr)'`)
*   **Consistencia:** Esta estructura garantiza un layout balanceado y predecible, evitando filas con un número desigual de elementos.

## 7. Uso Correcto de Patrones de Diseño

*   **Container/Presentation:** Aplicar estrictamente el patrón: Contenedores para la lógica y datos, Presentación para la UI.
*   **Custom Hooks:** Utilizar para encapsular y reutilizar lógica con estado o de negocio.
*   **Feature Isolation:** Evitar que una feature importe directamente de otra.

---
*Este documento es generado y mantenido automáticamente como parte de la documentación del proyecto.*