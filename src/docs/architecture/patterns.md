# Arquitectura: Patrones de Diseño Aplicados

Este documento describe los patrones de diseño fundamentales que rigen la estructura y el comportamiento del código en el proyecto `myprojectapi07`. La adopción de estos patrones fomenta la modularidad, la reutilización, la mantenibilidad y la escalabilidad.

---

## 1. Feature-Based Architecture

### Descripción
La "Feature-Based Architecture" organiza el código base por funcionalidades de negocio (features) en lugar de por tipos técnicos. Cada feature es una unidad autocontenida que agrupa todos los archivos relacionados con una capacidad específica del negocio.

### Implementación en el Proyecto
*   **Directorio `src/features/`**: Contiene subdirectorios para cada feature (ej. `pokemon-list`, `favorites`, `search`).
*   **Encapsulación**: Dentro de cada feature, se encuentran sus propios componentes, hooks, servicios de API específicos, slices de Redux, y pruebas.
*   **Beneficios Clave**: Claridad, escalabilidad y colaboración.

## 2. Container/Presentation Pattern

### Descripción
Este patrón divide los componentes de React en dos categorías:
*   **Componentes Contenedores (Smart):** Se preocupan por *cómo funcionan las cosas* (lógica, datos, estado).
*   **Componentes de Presentación (Dumb):** Se preocupan por *cómo se ven las cosas* (UI, reciben todo por props).

### Implementación en el Proyecto
*   **Contenedores:** Residen en `features/[feature-name]/containers/` o en `pages/`. Se conectan a Redux o hooks y pasan los datos a los componentes de presentación.
*   **Presentación:** Residen en `components/` (globales) o `features/[feature-name]/components/` (específicos). Son reutilizables y no conocen la lógica de negocio.

## 3. Custom Hooks

### Descripción
Los Custom Hooks son la herramienta principal para extraer y reutilizar lógica con estado. Permiten simplificar los componentes y encapsular lógica de negocio compleja.

### Implementación en el Proyecto
*   **Hooks de Feature (`src/features/[feature-name]/hooks/`):** Encapsulan lógica de negocio específica de una feature (ej. `usePokemonData`).
*   **Hooks Compartidos (`src/hooks/`):** Para lógica genérica sin estado de negocio (ej. `useLocalStorage`, `useDebounce`).

## 4. CSS Grid Layout Pattern

### Descripción
Para la maquetación de listas principales o grillas de contenido, se ha estandarizado el uso de **CSS Grid nativo** en lugar de Flexbox. Este patrón asegura layouts robustos, predecibles y consistentes a través de diferentes tamaños de pantalla.

### Implementación en el Proyecto
*   **Tecnología:** Se aplica directamente en la prop `sx` de los componentes `<Box>` de MUI, utilizando la propiedad `display: 'grid'`.
*   **Reglas Clave:**
    *   Se define un `gap` consistente.
    *   Se utiliza `gridTemplateColumns` con valores responsivos para un control explícito del número de columnas.
*   **Ejemplo (`PokemonList.jsx`):**
    ```jsx
    <Box
      sx={{
        display: 'grid',
        gap: { xs: 2, md: 3 },
        gridTemplateColumns: {
          xs: 'repeat(1, 1fr)', // 1 columna en móvil
          sm: 'repeat(2, 1fr)', // 2 en tablet
          md: 'repeat(3, 1fr)', // 3 en desktop
          lg: 'repeat(4, 1fr)', // 4 en desktop ancho
        },
      }}
    >
      {/* ...items de la grilla */}
    </Box>
    ```

### Beneficios
*   **Layouts Balanceados:** Previene filas "rotas" o desbalanceadas.
*   **Control Declarativo:** Define de manera explícita y clara la estructura de la grilla para cada breakpoint.
*   **Estándar Moderno:** Utiliza el estándar web moderno para maquetación de grillas.

---
*Este documento es generado y mantenido automáticamente como parte de la documentación del proyecto.*