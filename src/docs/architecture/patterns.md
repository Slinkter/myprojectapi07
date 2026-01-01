# Arquitectura: Patrones de Diseño Aplicados

Este documento describe los patrones de diseño fundamentales que rigen la estructura y el comportamiento del código en el proyecto `myprojectapi07`. La adopción de estos patrones fomenta la modularidad, la reutilización, la mantenibilidad y la escalabilidad.

---

## 1. Feature-Based Architecture

### Descripción
La "Feature-Based Architecture" organiza el código base por funcionalidades de negocio (features) en lugar de por tipos técnicos (ej. `components`, `hooks`, `services` globalmente). Cada feature es una unidad autocontenida que agrupa todos los archivos relacionados con una capacidad específica del negocio.

### Implementación en el Proyecto
*   **Directorio `src/features/`**: Contiene subdirectorios para cada feature (ej. `pokemon-list`, `favorites`, `search`).
*   **Encapsulación**: Dentro de cada feature, se encuentran sus propios componentes, hooks, servicios de API específicos, slices de Redux, y pruebas.
*   **Cohesión y Acoplamiento**: Este patrón maximiza la cohesión dentro de cada feature y minimiza el acoplamiento entre features.
*   **Beneficios Clave**:
    *   **Claridad:** Facilita la comprensión de dónde reside la lógica de una funcionalidad.
    *   **Escalabilidad:** Permite añadir nuevas features o eliminar existentes con mínimo impacto en otras partes del sistema.
    *   **Colaboración:** Diferentes equipos o desarrolladores pueden trabajar en distintas features de forma independiente.

### Estructura de una Feature Ejemplo (`src/features/pokemon-list`)

```
src/features/pokemon-list/
 ├─ api/                  # Funciones para interactuar con la API (ej. `getPokemonList.js`)
 ├─ components/           # Componentes UI utilizados solo dentro de este feature (ej. `PokemonCard.jsx`)
 ├─ containers/           # Componentes inteligentes que orquestan la lógica (ej. `PokemonListContainer.jsx`)
 ├─ hooks/                # Custom Hooks específicos de la feature (ej. `usePokemonData.js`)
 ├─ pokemonListSlice.js   # Slice de Redux para el estado de la lista de Pokémon
 ├─ index.js              # Archivo de barril para exportar componentes y hooks públicos
 └─ tests/                # Pruebas unitarias y de integración para la feature
```

## 2. Container/Presentation Pattern

### Descripción
Este patrón divide los componentes de React en dos categorías principales:
*   **Componentes Contenedores (Smart/Logic Components):** Se preocupan por *cómo funcionan las cosas*.
*   **Componentes de Presentación (Dumb/UI Components):** Se preocupan por *cómo se ven las cosas*.

### Implementación en el Proyecto
*   **Componentes Contenedores (`src/features/[feature-name]/containers/` o `src/pages/`)**:
    *   Obtienen datos (de Redux, Custom Hooks, API).
    *   Gestionan el estado de la aplicación.
    *   Contienen la lógica de negocio.
    *   Pasan datos y callbacks (manejadores de eventos) a los componentes de presentación vía `props`.
    *   **Ejemplo:** Un `PokedexPageContainer.jsx` que recupera la lista de Pokémon, el filtro de búsqueda y los favoritos, y luego pasa estos datos a `PokemonListPresentational`.
*   **Componentes de Presentación (`src/components/` o `src/features/[feature-name]/components/`)**:
    *   Reciben datos y callbacks únicamente a través de `props`.
    *   No tienen dependencias directas con el Redux store ni con la lógica de la API.
    *   Se encargan exclusivamente del renderizado y de emitir eventos hacia arriba.
    *   Son reutilizables y fácilmente testeables en aislamiento.
    *   **Ejemplo:** `PokemonCard.jsx` o `PokemonList.jsx` (recibe un array de Pokémon y los renderiza).

### Beneficios
*   **Separación Clara de Responsabilidades:** Facilita la comprensión y el mantenimiento del código.
*   **Reusabilidad:** Los componentes de presentación son altamente reutilizables.
*   **Testabilidad:** La lógica de negocio en los contenedores y la UI pura en los presentacionales son más fáciles de testear individualmente.

## 3. Custom Hooks

### Descripción
Los Custom Hooks en React son funciones de JavaScript que permiten extraer lógica con estado de un componente para que pueda ser reutilizada en otros componentes. Deben comenzar con la palabra `use`.

### Implementación en el Proyecto
*   **`src/hooks/`**: Para hooks genéricos y compartidos que no tienen lógica de negocio específica de un feature (ej. `useLocalStorage`, `useDebounce`, `useMediaQuery`).
*   **`src/features/[feature-name]/hooks/`**: Para hooks que encapsulan lógica de negocio específica de una feature (ej. `usePokemonData` para gestionar la paginación, filtros y llamadas a la API de Pokémon).
*   **Uso como Abstracción**: Los Custom Hooks abstraen la complejidad del manejo de `useState`, `useEffect`, `useContext`, `useCallback`, `useMemo` y la interacción con Redux, exponiendo una API limpia y fácil de consumir por los componentes.

### Beneficios
*   **Reutilización de Lógica:** Evita la duplicación de código de lógica compleja.
*   **Modularidad:** Permite encapsular y aislar lógica compleja.
*   **Simplificación de Componentes:** Los componentes se vuelven más pequeños y más fáciles de entender, ya que la lógica con estado se extrae a los hooks.

---
*Este documento es generado y mantenido automáticamente como parte de la documentación del proyecto.*
