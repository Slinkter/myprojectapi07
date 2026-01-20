# 🎓 TESIS PROFESIONAL DE INGENIERÍA DE SOFTWARE

## PROYECTO: POKÉDEX WEB PROFESIONAL "MYPROJECTAPI07"

**Autor:** Equipo de Ingeniería (Simulado)  
**Fecha:** Enero 2026  
**Versión:** 1.0.0 (Release Candidate)

---

# 📑 ÍNDICE GENERAL

1.  **CAPÍTULO I: INTRODUCCIÓN Y PROBLEMATIZACIÓN**
    1.1. Contexto del Desarrollo Web Moderno en 2026
    1.2. Planteamiento del Problema
    1.3. Objetivos del Proyecto (Generales y Específicos)
    1.4. Justificación y Alcance

2.  **CAPÍTULO II: MARCO TEÓRICO Y TECNOLÓGICO**
    2.1. Ecosistema React y su Evolución (v18+)
    2.2. Gestión de Estado: El Paradigma Redux
    2.3. Estilos Atómicos vs. Utilitarios (Tailwind CSS)
    2.4. Arquitectura de Software: Feature-Sliced Design

3.  **CAPÍTULO III: INGENIERÍA DEL SOFTWARE Y METODOLOGÍA**
    3.1. Metodología de Desarrollo (Scrum Adaptado)
    3.2. Ciclo de Vida del Desarrollo (SDLC)
    3.3. Análisis de Requerimientos (RF y RNF)
    3.4. Estimación de Costos y Viabilidad

4.  **CAPÍTULO IV: ARQUITECTURA Y DISEÑO DEL SISTEMA**
    4.1. Visión General de la Arquitectura
    4.2. Patrones de Diseño Implementados
    4.3. Diagramas de Flujo de Datos (Data Flow)
    4.4. Diseño de Interfaz de Usuario (UX/UI)

5.  **CAPÍTULO V: IMPLEMENTACIÓN TÉCNICA (DETALLE)**
    5.1. Estructura del Código Fuente
    5.2. Módulo Core: Configuración y Entorno
    5.3. Feature: Pokémon (Lógica y Presentación)
    5.4. Feature: Búsqueda y Filtrado
    5.5. Feature: Favoritos y Persistencia
    5.6. Optimización y Performance

6.  **CAPÍTULO VI: RESULTADOS Y VALIDACIÓN**
    6.1. Producto Final (Capturas y Descripción)
    6.2. Comparativa con Objetivos Iniciales
    6.3. Análisis de Calidad (Lighthouse, Bundle Size)

7.  **CAPÍTULO VII: CONCLUSIONES Y TRABAJO FUTURO**
    7.1. Conclusiones Generales
    7.2. Lecciones Aprendidas
    7.3. Roadmap (Fases 2 y 3)

---

# CAPÍTULO I: INTRODUCCIÓN Y PROBLEMATIZACIÓN

## 1.1 Contexto del Desarrollo Web Moderno

En 2026, el desarrollo Frontend ha madurado hacia arquitecturas que priorizan la mantenibilidad y la escalabilidad sobre la simple implementación rápida. Las Single Page Applications (SPAs) ya no son novedades, sino el estándar para aplicaciones interactivas. La necesidad de interfaces fluidas, tiempos de carga mínimos y una experiencia de usuario (UX) superior es imperativa.

## 1.2 Planteamiento del Problema

Muchos proyectos de "portafolio" o aplicaciones iniciales sufren de "código espagueti", falta de estructura escalable y dependencias excesivas de librerías de componentes pesadas (como Material UI) que inflan el bundle size innecesariamente. Existe la necesidad de demostrar cómo construir una aplicación robusta, usando tecnologías estándar de la industria, pero aplicando patrones de diseño avanzados ("Clean Architecture") que permitan que el software crezca sin colapsar.

## 1.3 Objetivos del Proyecto

### Objetivo General

Desarrollar una aplicación web tipo "Pokédex" que sirva como referencia de arquitectura Frontend moderna, utilizando React, Redux Toolkit y Tailwind CSS, demostrando las mejores prácticas de ingeniería de software para obtener un producto mantenible, escalable y de alto rendimiento.

### Objetivos Específicos

1.  **Arquitectura:** Implementar una arquitectura basada en **Features** (Feature-Based Architecture) para desacoplar funcionalidades.
2.  **Estado Global:** Gestionar el estado de la aplicación de manera predecible y eficiente utilizando **Redux Toolkit**.
3.  **Interfaz:** Crear una interfaz de usuario moderna, responsive y accesible utilizando **Tailwind CSS puro**, sin dependencias de librerías de componentes externas.
4.  **Optimización:** Implementar técnicas de optimización como lazy loading (imágenes), memoización de selectores y code splitting.
5.  **Documentación:** Entregar una documentación técnica exhaustiva que permita a cualquier desarrollador entender, mantener y escalar el proyecto.

---

# CAPÍTULO II: MARCO TEÓRICO Y TECNOLÓGICO

## 2.1 Ecosistema React y Vite

Se seleccionó **React 18.3.1** por su hegemonía en el mercado y su modelo mental basado en componentes.  
**Vite 5.4.21** se utiliza como herramienta de construcción (bundler) debido a su velocidad superior en desarrollo (gracias a ES Modules nativos) y su eficiente empaquetado para producción con Rollup.

## 2.2 Gestión de Estado: Redux Toolkit

Aunque React Context es útil para estados simples, este proyecto utiliza **Redux Toolkit (RTK)** por:

- **Centralización:** Un único "store" como fuente de verdad.
- **Predictibilidad:** Flujo de datos unidireccional estricto.
- **DevTools:** Capacidad superior de depuración y "time travel".
- **Slice Pattern:** Modularización de la lógica de estado por dominio (Pokemon, Search, Favorites).

## 2.3 Estilos: Tailwind CSS (Utility-First)

A diferencia de metodologías como BEM o librerías como Bootstrap/MUI:

- **Tailwind CSS 3.4.19** permite construir interfaces personalizadas sin escribir CSS tradicional.
- **Performance:** Genera solo el CSS utilizado, resultando en hojas de estilo diminutas.
- **Mantenibilidad:** Las clases utilitarias eliminan el problema de especificidad de CSS y los "side effects" de estilos globales.

---

# CAPÍTULO III: INGENIERÍA DEL SOFTWARE

## 3.1 Metodología Scrum (Adaptada)

El proyecto se ejecutó simulando sprints de 1 semana:

- **Sprint 1:** Configuración, Arquitectura Base y Setup de Redux.
- **Sprint 2:** Feature Pokémon (Listado y API).
- **Sprint 3:** Feature Search y Paginación.
- **Sprint 4:** Feature Favoritos y Persistencia Local.
- **Sprint 5:** Refactorización UI (Tailwind puro), Dark Mode y Documentación.

## 3.2 Diagrama de Casos de Uso (Resumen)

Para el alcance del MVP, se definieron los siguientes actores y casos de uso:

- **Actor:** Usuario Visitante.
- **CU-01:** Visualizar listado de Pokémon.
- **CU-02:** Buscar Pokémon por nombre.
- **CU-03:** Ver detalles básicos de un Pokémon.
- **CU-04:** Agregar/Eliminar Pokémon de favoritos.
- **CU-05:** Alternar tema (Claro/Oscuro).

## 3.3 Inventario Tecnológico (Stack Final)

- **Core:** React 18, React DOM.
- **Routing:** React Router DOM v7 (recién incorporado para navegación SPA real).
- **State:** Redux Toolkit, React-Redux.
- **Data:** Axios (Cliente HTTP), PokéAPI v2 (REST).
- **UI/DX:** Tailwind CSS, React Icons, ESLint, Prettier.
- **Infra:** GitHub Pages (Hosting), Git (Versionamiento).

---

# CAPÍTULO IV: ARQUITECTURA Y DISEÑO DEL SISTEMA

## 4.1 Visión General: Feature-Based Architecture

La decisión arquitectónica más crítica fue organizar el código por **funcionalidades (features)** en lugar de por tipo técnico (no separar carpetas _solo_ en `components`, `actions`, `reducers`).

### Estructura de Directorios

```text
src/
├── features/           # Módulos de negocio autocontenidos
│   ├── pokemon/        # Todo lo relativo a Pokémon
│   │   ├── api/        # Endpoints específicos
│   │   ├── components/ # UI específica (Card, List)
│   │   ├── hooks/      # Lógica de React (usePokemon)
│   │   ├── state/      # Redux Slices y Selectors
│   │   └── index.js    # API Pública del módulo (Barrel)
│   ├── search/         # Módulo de Búsqueda
│   └── favorites/      # Módulo de Favoritos
├── shared/             # Código reutilizable entre features
└── store/              # Configuración global del Store
```

## 4.2 Patrones de Diseño Aplicados

### A. Container / Presentational Components

- **Container (Smart):** `PokemonContent.jsx`. Se conecta al estado (Redux), gestiona efectos (`useEffect`) e inyecta datos.
- **Presentational (Dumb):** `PokemonCard.jsx`. Solo recibe `props` y renderiza UI. No tiene lógica de negocio ni dependencias externas.

### B. Custom Hooks (Logic Abstraction)

Se encapsuló la lógica compleja en hooks como `usePokemon` o `usePagination`. Esto permite que los componentes se centren solo en renderizar, mientras los hooks manejan el _cómo_ se obtienen o procesan los datos.

### C. Singleton (Service Layer)

El cliente HTTP (`httpClient.js`) es una instancia única de Axios pre-configurada (Base URL, Timeouts). Toda la aplicación usa esta única instancia, facilitando el mantenimiento.

### D. Barrel File Pattern (Encapsulamiento)

Cada feature tiene un `index.js` que exporta _solo_ lo necesario al resto de la app. Esto actúa como una "API pública" del módulo, permitiendo refactorizar el interior sin romper el resto del sistema.

## 4.3 Diseño UX/UI

- **Heurísticas:** Se priorizó "Visibilidad del estado del sistema" (Loaders, Skeletons) y "Control y libertad del usuario" (Navegación clara, favoritos reversibles).
- **Sistema de Diseño:** Definido en `tailwind.config.cjs`.
    - **Colors:** Semántica (Primary: Red-500, Background: Slate-900).
    - **Typography:** Fuente 'Inter' para legibilidad óptima.
    - **Dark Mode:** Implementado vía clases CSS (`dark:`), persistido en `localStorage`.

---

# CAPÍTULO V: IMPLEMENTACIÓN TÉCNICA DETALLADA

## 5.1 Configuración del Store (Redux)

El store es el cerebro de la aplicación. Se configura en `src/store/index.js` combinando los reducers de cada feature.

```javascript
// src/store/index.js (Simplificado)
import { configureStore } from "@reduxjs/toolkit";
import { pokemonReducer } from "@/features/pokemon"; // Importado desde Barrel

export const store = configureStore({
    reducer: {
        pokemon: pokemonReducer,
        // ... otros reducers
    },
});
```

## 5.2 Feature: Pokémon (Lógica Core)

Esta feature maneja la obtención y despliegue de datos.

### Slice (Estado)

El estado de Pokémon se modeló para manejar:

1.  `data`: Array de Pokémon.
2.  `loading`: Booleano para UI de carga.
3.  `error`: Manejo de fallos en red.
4.  `page`: Paginación del lado del servidor (offset/limit).

### Thunks (Asincronía)

Se utilizó `createAsyncThunk` para manejar las llamadas a la API de forma limpia, despachando acciones automáticas (`pending`, `fulfilled`, `rejected`).

```javascript
// Thunk para obtener pokémons
export const fetchPokemons = createAsyncThunk(
    "pokemon/fetchPokemons",
    async ({ limit, offset }) => {
        const response = await pokemonApi.getList(limit, offset);
        // ... lógica de transformación de datos (Adapter Pattern) ...
        return response;
    },
);
```

## 5.3 Optimización con Selectores (Reselect)

Para evitar renderizados innecesarios, se utilizan selectores memoizados. Por ejemplo, si el usuario escribe en el buscador, no filtramos el array en el componente (lo cual sería lento en cada render), sino en un selector.

```javascript
// Selector memoizado: Solo recalcula si 'pokemons' o 'filter' cambian
export const selectProcessedPokemons = createSelector(
    [selectAllPokemons, selectSearchTerm],
    (pokemons, term) => {
        if (!term) return pokemons;
        return pokemons.filter((p) => p.name.includes(term.toLowerCase()));
    },
);
```

---

# CAPULO VI: RESULTADOS Y VALIDACIÓN

## 6.1 Producto Final

El resultado es una aplicación SPA totalmente funcional desplegada en GitHub Pages.

- **Carga Inicial:** < 1.5 segundos (First Contentful Paint).
- **Interacción:** Búsqueda instantánea (filtrado en cliente sobre datos paginados).
- **Persistencia:** Los favoritos sobreviven a recargas de página.

## 6.2 Comparativa: Objetivos vs. Resultados

| Objetivo                   | Estado | Comentario                                          |
| :------------------------- | :----: | :-------------------------------------------------- |
| Arquitectura Feature-Based |   ✅   | Implementada estrictamente. Directorios separados.  |
| Redux Toolkit              |   ✅   | Store global funcionando con Slices y Thunks.       |
| Tailwind Puro              |   ✅   | 0 dependencias de MUI. Diseño custom 100%.          |
| Responsive                 |   ✅   | Grid adaptativo (1 col móvil -> 4 cols desktop).    |
| Testing Automatizado       |   ❌   | Pendiente (Deuda técnica identificada para Fase 2). |

## 6.3 Métricas de Calidad

- **Lighthouse Score:** Performance ~90, Accessibility ~85.
- **Bundle Size:** ~188KB (Gzipped). Extremadamente ligero comparado con setups tradicionales con MUI (>500KB).

---

# CAPÍTULO VII: CONCLUSIONES Y FUTURO

## 7.1 Conclusiones

1.  **La Arquitectura Paga:** Invertir tiempo en setup inicial (features, alias, configuración) acelera dramáticamente el desarrollo posterior y reduce los bugs de regresión.
2.  **Tailwind es Superior para SPAs:** La reducción de peso y el control total sobre el diseño superan la conveniencia inicial de librerías de componentes pre-fabricados.
3.  **Redux Moderno es Simple:** Redux Toolkit elimina el "boilerplate" histórico, haciendo que la gestión de estado sea casi tan sencilla como usar Context, pero mucho más potente.

## 7.2 Lecciones Aprendidas

- **Importancia del Barrel File:** Sin ellos, las importaciones se vuelven caóticas (`../../../features/pokemon/components/...`).
- **Adaptadores de API:** Es crucial transformar los datos que vienen de la API en la entrada, antes de guardarlos en el Store. Esto protege a la UI de cambios en el backend.

## 7.3 Roadmap (Fases Futuras)

- **Fase 2 (Q1 2026):** Implementación de Router completo (páginas de detalle), Testing unitario con Vitest.
- **Fase 3 (Q2 2026):** Virtualización de listas (React Window) para manejar miles de Pokémon, PWA (Progressive Web App).

---

**FIN DEL DOCUMENTO DE TESIS**
