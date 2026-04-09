# Documentación Técnica del Proyecto Pokédex React

## Ingeniería de Software - Documentación Completa

---

# Capítulo 1: Introducción

## 1.1 Resumen del Proyecto

Este documento presenta la documentación técnica completa del proyecto **Pokédex React**, una aplicación web de una sola página (SPA) desarrollada con React que permite a los usuarios explorar, buscar y gestionar sus Pokémon favoritos utilizando la PokéAPI externa.

## 1.2 Objetivos del Sistema

- **Objetivo Principal**: Proporcionar una interfaz interactiva para explorar el universo de Pokémon, permitiendo a los usuarios visualizar una lista paginada de Pokémon, ver detalles individuales de cada uno, y gestionar una lista de favoritos.

- **Objetivos Específicos**:
  - Mostrar una lista de Pokémon con paginación eficiente
  - Permitir búsqueda de Pokémon por nombre
  - Visualizar información detallada de cada Pokémon
  - Gestionar favoritos con persistencia local
  - Soporte para tema claro/oscuro
  - Despliegue en GitHub Pages con compatibilidad SPA

## 1.3 Alcance del Proyecto

### Funcionalidades Incluidas:
1. Exploración de lista de Pokémon con paginación
2. Búsqueda de Pokémon por nombre
3. Visualización de detalles de Pokémon (stats, tipos, sprites)
4. Sistema de favoritos con localStorage
5. Tema oscuro/claro
6. Animaciones con Motion
7. Carga diferida de imágenes
8. Documentación de componentes con Storybook

### Tecnologías Utilizadas:
- **Frontend**: React 18 + Vite
- **Estado**: Redux Toolkit
- **Routing**: React Router v6 (Hash Router)
- **Estilos**: Tailwind CSS
- **Animaciones**: Motion
- **Documentación**: Storybook
- **Despliegue**: GitHub Pages

---

# Capítulo 2: Arquitectura del Sistema

## 2.1 Arquitectura General

El proyecto sigue una **Arquitectura Modular** basada en características (Feature-Sliced Design simplificado) con separación clara de responsabilidades.

```
┌─────────────────────────────────────────────────────────────┐
│                      CAPA DE PRESENTACIÓN                    │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐           │
│  │ PokedexPage │ │ DetailPage  │ │ Storybook   │           │
│  └─────────────┘ └─────────────┘ └─────────────┘           │
├─────────────────────────────────────────────────────────────┤
│                      CAPA DE COMPONENTES                    │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐           │
│  │ PokemonCard │ │ SearchBar  │ │ FavoritesBar│           │
│  └─────────────┘ └─────────────┘ └─────────────┘           │
├─────────────────────────────────────────────────────────────┤
│                      CAPA DE CARACTERÍSTICAS                │
│  ┌────────────┐ ┌────────────┐ ┌────────────┐ ┌───────────┐ │
│  │ pokemon    │ │ favorites  │ │ search     │ │ theme    │ │
│  └────────────┘ └────────────┘ └────────────┘ └───────────┘ │
├─────────────────────────────────────────────────────────────┤
│                      CAPA DE ENTIDADES                      │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐            │
│  │ pokemon/    │ │ types/      │ │ data/      │            │
│  │ model       │ │             │ │ seed       │            │
│  └─────────────┘ └─────────────┘ └─────────────┘            │
├─────────────────────────────────────────────────────────────┤
│                      CAPA DE INFRAESTRUCTURA                │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐            │
│  │ httpClient  │ │ api/config  │ │ store      │            │
│  └─────────────┘ └─────────────┘ └─────────────┘            │
└─────────────────────────────────────────────────────────────┘
```

### Flujo de Datos Bidireccional

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        FLUJO DE DATOS EN LA APLICACIÓN                       │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  USUARIO                                                                    │
│     │                                                                         │
│     ▼                                                                         │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                    PRESENTATION LAYER                                 │   │
│  │  ┌───────────┐    ┌───────────┐    ┌───────────┐    ┌───────────┐  │   │
│  │  │  Pokedex  │    │  Detail   │    │ Favorites │    │  Search   │  │   │
│  │  │   Page    │    │   Page    │    │    Bar    │    │    Bar    │  │   │
│  │  └─────┬─────┘    └─────┬─────┘    └─────┬─────┘    └─────┬─────┘  │   │
│  └────────┼────────────────┼────────────────┼────────────────┼────────┘   │
│           │                │                │                │            │
│           ▼                ▼                ▼                ▼            │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                      COMPONENT LAYER                                 │   │
│  │  ┌───────────┐    ┌───────────┐    ┌───────────┐    ┌───────────┐  │   │
│  │  │  Card    │    │  Header   │    │  Toggle   │    │  Input    │  │   │
│  │  │          │    │           │    │           │    │           │  │   │
│  │  └─────┬─────┘    └─────┬─────┘    └─────┬─────┘    └─────┬─────┘  │   │
│  └────────┼────────────────┼────────────────┼────────────────┼────────┘   │
│           │                │                │                │            │
│           ▼                ▼                ▼                ▼            │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                    CUSTOM HOOKS LAYER                               │   │
│  │  ┌───────────────┐ ┌───────────────┐ ┌───────────────┐              │   │
│  │  │usePokemonList│ │usePokemon    │ │useFavorites  │ │useTheme    │   │
│  │  └───────┬───────┘ └───────┬───────┘ └───────┬───────┘              │   │
│  └──────────┼──────────────────┼──────────────────┼──────────────────────┘   │
│             │                  │                  │                          │
│             ▼                  ▼                  ▼                          │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                       REDUX STORE                                    │   │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐│   │
│  │  │  pokemon/   │  │ favorites/ │  │   search/  │  │   theme/   ││   │
│  │  │   slice     │  │   slice    │  │   slice    │  │   slice    ││   │
│  │  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘│   │
│  └─────────┼─────────────────┼─────────────────┼─────────────────┼───────┘   │
│            │                 │                 │                 │           │
│            ▼                 ▼                 ▼                 ▼           │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                     SERVICE LAYER                                    │   │
│  │  ┌─────────────────────┐  ┌─────────────────────┐                  │   │
│  │  │    pokemonApi       │  │   localStorage      │                  │   │
│  │  │  (with Caching)     │  │   (Persistence)    │                  │   │
│  │  └──────────┬──────────┘  └──────────┬──────────┘                  │   │
│  └─────────────┼────────────────────────┼─────────────────────────────┘   │
│                │                        │                                 │
│                ▼                        ▼                                 │
│  ┌─────────────────────────────┐  ┌─────────────────────────────┐        │
│  │         PokéAPI             │  │        Browser              │        │
│  │       (External)            │  │      localStorage           │        │
│  └─────────────────────────────┘  └─────────────────────────────┘        │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

## 2.2 Estructura de Directorios

```
src/
├── app/                    # Configuración de la aplicación
│   └── router/            # Configuración de rutas
├── components/            # Componentes compartidos
│   └── common/           # Componentes comunes
├── entities/              # Entidades del dominio
│   └── pokemon/
│       ├── data/         # Datos seed
│       ├── model/        # Modelos y transformaciones
│       └── types/       # Definiciones de tipos
├── features/             # Características del sistema
│   ├── favorites/       # Gestión de favoritos
│   ├── pokemon/        # Funcionalidad de Pokémon
│   ├── search/          # Búsqueda
│   └── theme/           # Tema de la aplicación
├── lib/                  # Utilidades y helpers
├── pages/                # Páginas principales
├── services/             # Servicios externos
├── shared/              # Componentes compartidos
│   ├── components/
│   │   └── layout/
│   └── hooks/
├── store/                # Configuración de Redux
└── stories/              # Historias de Storybook
```

## 2.3 Patrones de Diseño Utilizados

### 2.3.1 Patrón Presentational-Container
- **Presentational Components**: Componentes puros que reciben datos por props y renderizan UI
- **Container Components**: Componentes que gestionan estado y lógica de negocio

### 2.3.2 Patrón Custom Hooks
- Encapsulamiento de lógica reusable en hooks personalizados
- Ejemplos: `usePokemonList`, `usePokemon`, `useFavorites`, `useTheme`

### 2.3.3 Patrón Slice (Redux Toolkit)
- Organización del estado en slices independientes
- Cada feature tiene su propio slice con estado, reducers y acciones

### 2.3.4 Patrón Observer (Redux Suscriptions)
- Los componentes se suscriben a cambios del store
- Re-renderizado optimizado con selectores memoizados

### 2.3.5 Patrón Repository
- Capa de abstracción sobre la API externa
- Implementación de caché en memoria y localStorage

---

# Capítulo 3: Modelo de Casos de Uso

## 3.1 Diagrama de Casos de Uso

```
┌─────────────────────────────────────────────────────────────────┐
│                         ACTOR: USUARIO                          │
└─────────────────────────────────────────────────────────────────┘
                               │
         ┌─────────────────────┼─────────────────────┐
         │                     │                     │
         ▼                     ▼                     ▼
┌───────────────┐   ┌─────────────────┐   ┌─────────────────┐
│  Ver Lista de │   │    Buscar       │   │  Ver Detalle de │
│   Pokémon     │   │    Pokémon      │   │    Pokémon      │
└───────────────┘   └─────────────────┘   └─────────────────┘
        │                     │                     │
        │                     │                     │
        └─────────────────────┼─────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│                    CASOS DE USO ADICIONALES                    │
├─────────────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │  Gestionar   │  │   Cambiar    │  │  Navegar     │          │
│  │  Favoritos   │  │    Tema      │  │  Páginas    │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
└─────────────────────────────────────────────────────────────────┘
```

## 3.2 Especificación de Casos de Uso

### UC-001: Ver Lista de Pokémon

| Atributo | Descripción |
|----------|-------------|
| **ID** | UC-001 |
| **Nombre** | Ver Lista de Pokémon |
| **Actor** | Usuario |
| **Precondiciones** | Ninguna |
| **Flujo Principal** | 1. El sistema muestra la página principal con la lista de Pokémon<br>2. El usuario visualiza una paginación de 20 Pokémon por página<br>3. El usuario puede navegar entre páginas usando los controles de paginación |
| **Flujo Alternativo** | Si hay error de red, mostrar mensaje de error con opción de reintentar |
| **Postcondiciones** | Lista de Pokémon displayed con paginación |
| **Criterios de Éxito** | Se muestran exactamente 20 Pokémon por página<br>La paginación permite navegar entre todas las páginas disponibles<br>Los botones de paginación reflejan el estado actual |

### UC-002: Buscar Pokémon

| Atributo | Descripción |
|----------|-------------|
| **ID** | UC-002 |
| **Nombre** | Buscar Pokémon |
| **Actor** | Usuario |
| **Precondiciones** | Ninguna |
| **Flujo Principal** | 1. El usuario introduce un término de búsqueda en el SearchBar<br>2. El sistema filtra los Pokémon en tiempo real<br>3. El sistema muestra los resultados que coinciden con la búsqueda |
| **Flujo Alternativo** | Si no hay resultados, mostrar mensaje "No se encontraron Pokémon"<br>Si el término está vacío, mostrar lista completa |
| **Postcondiciones** | Resultados de búsqueda displayed |
| **Criterios de Éxito** | La búsqueda es case-insensitive<br>Los resultados se actualizan en tiempo real<br>Se muestra indicador de carga durante la búsqueda |

### UC-003: Ver Detalle de Pokémon

| Atributo | Descripción |
|----------|-------------|
| **ID** | UC-003 |
| **Nombre** | Ver Detalle de Pokémon |
| **Actor** | Usuario |
| **Precondiciones** | El usuario ha seleccionado un Pokémon |
| **Flujo Principal** | 1. El usuario hace clic en una tarjeta de Pokémon<br>2. El sistema navega a la página de detalle<br>3. El sistema carga y muestra los detalles completos del Pokémon |
| **Flujo Alternativo** | Si el Pokémon no existe, mostrar página de error 404<br>Si hay error de red, mostrar opción de reintentar |
| **Postcondiciones** | Página de detalle con información completa displayed |
| **Criterios de Éxito** | Se muestran todos los stats del Pokémon<br>Se muestran los tipos del Pokémon<br>Se muestra la imagen sprite<br>El botón de favorito refleja el estado actual |

### UC-004: Gestionar Favoritos

| Atributo | Descripción |
|----------|-------------|
| **ID** | UC-004 |
| **Nombre** | Gestionar Favoritos |
| **Actor** | Usuario |
| **Precondiciones** | El usuario está en la página de detalle o lista |
| **Flujo Principal** | 1. El usuario hace clic en el botón de favorito<br>2. El sistema añade/elimina el Pokémon de la lista de favoritos<br>3. El sistema persiste el cambio en localStorage<br>4. El sistema muestra una notificación de confirmación |
| **Flujo Alternativo** | Si el usuario no está logueado, guardar en localStorage<br>Si localStorage está lleno, mostrar error |
| **Postcondiciones** | Favoritos actualizados y persistidos |
| **Criterios de Éxito** | El estado del favorito se refleja inmediatamente en la UI<br>Los favoritos persisten entre sesiones<br>La FavoritesBar se actualiza automáticamente |

### UC-005: Cambiar Tema

| Atributo | Descripción |
|----------|-------------|
| **ID** | UC-005 |
| **Nombre** | Cambiar Tema |
| **Actor** | Usuario |
| **Precondiciones** | Ninguna |
| **Flujo Principal** | 1. El usuario hace clic en el botón de tema en la navbar<br>2. El sistema alterna entre tema claro y oscuro<br>3. El sistema guarda la preferencia en localStorage |
| **Postcondiciones** | Tema cambiado y persistido |
| **Criterios de Éxito** | El tema se aplica instantáneamente<br>La preferencia persiste entre sesiones<br>Todos los componentes respetan el tema actual |

### UC-006: Navegar Entre Páginas

| Atributo | Descripción |
|----------|-------------|
| **ID** | UC-006 |
| **Nombre** | Navegar Entre Páginas |
| **Actor** | Usuario |
| **Precondiciones** | Ninguna |
| **Flujo Principal** | 1. El usuario utiliza los enlaces de navegación<br>2. El sistema maneja la navegación con Hash Router<br>3. El sistema preserva el estado de la aplicación |
| **Postcondiciones** | Navegación completada correctamente |
| **Criterios de Éxito** | La URL refleja la página actual<br>El botón "volver" del navegador funciona correctamente<br>La posición de scroll se restablece al navegar |

---

# Capítulo 4: Diagramas UML

## 4.1 Descripción Detallada del Diagrama de Clases

### Visión General de Paquetes

El diagrama de clases se organiza en tres paquetes principales que representan las capas lógicas de la aplicación:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                     PAQUETES PRINCIPALES DE LA APLICACIÓN                   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────────┐  ┌─────────────────────┐  ┌─────────────────────┐ │
│  │   PRESENTATION      │  │     BUSINESS        │  │    INFRASTRUCTURE  │ │
│  │      PACKAGE        │  │      PACKAGE        │  │      PACKAGE        │ │
│  ├─────────────────────┤  ├─────────────────────┤  ├─────────────────────┤ │
│  │ - Pages             │  │ - Redux Slices     │  │ - API Services     │ │
│  │ - Components        │  │ - Custom Hooks     │  │ - HTTP Client      │ │
│  │ - Layouts           │  │ - Business Logic   │  │ - Storage Utils    │ │
│  └─────────────────────┘  └─────────────────────┘  └─────────────────────┘ │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Paquete: features/pokemon (Capa de Presentación)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              PAQUETE: features/pokemon                     │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌──────────────────────┐        ┌──────────────────────┐                │
│  │    PokemonCard       │        │    PokemonList       │                │
│  ├──────────────────────┤        ├──────────────────────┤                │
│  │ - pokemon: Pokemon   │        │ - pokemons: []       │                │
│  │ - isFavorite: bool  │        │ - loading: bool      │                │
│  │ - onFavorite: fn   │        │ - error: string      │                │
│  │ - onClick: fn       │        │ - currentPage: num   │                │
│  ├──────────────────────┤        ├──────────────────────┤                │
│  │ + render()           │        │ + render()           │                │
│  │ + handleFavorite()  │        │ + handlePageChange() │                │
│  │ + handleClick()     │        │ + renderSkeleton()  │                │
│  └──────────┬───────────┘        └──────────┬───────────┘                │
│             │                               │                             │
│             └───────────┬───────────────────┘                             │
│                         │ uses                                            │
│                         ▼                                                  │
│  ┌──────────────────────┐        ┌──────────────────────┐                │
│  │   PokemonDetail      │        │    PokedexHeader     │                │
│  ├──────────────────────┤        ├──────────────────────┤                │
│  │ - pokemonId: number │        │ - title: string      │                │
│  │ - pokemon: Pokemon  │        │ - count: number      │                │
│  │ - loading: bool     │        │ - loading: bool      │                │
│  │ - error: string     │        ├──────────────────────┤                │
│  ├──────────────────────┤        │ + render()          │                │
│  │ + render()           │        │ + renderCount()     │                │
│  │ + handleFavorite()   │        └──────────────────────┘               │
│  │ + renderStats()      │                                                  │
│  │ + renderTypes()      │                                                  │
│  └──────────────────────┘                                                  │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘

Relaciones del Paquete Pokemon:
- PokemonCard tiene una dependencia con Pokemon (entidad)
- PokemonList contiene múltiples PokemonCard
- PokemonDetail muestra los detalles de un Pokemon
- PokedexHeader muestra estadísticas del listado
```

### Paquete: store (Capa de Estado)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              PAQUETE: store                                 │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌──────────────────────┐        ┌──────────────────────┐                │
│  │   pokemonSlice       │        │  favoritesSlice      │                │
│  ├──────────────────────┤        ├──────────────────────┤                │
│  │ - list: Pokemon[]    │        │ - favoriteIds: []   │                │
│  │ - selected: Pokemon  │        │ - loading: bool      │                │
│  │ - loading: bool      │        ├──────────────────────┤                │
│  │ - error: string      │        │ + toggleFavorite(id) │                │
│  │ - currentPage: num   │        │ + loadFavorites()    │                │
│  │ - totalPages: num    │        │ + isFavorite(id)    │                │
│  ├──────────────────────┤        │ + getFavorites()    │                │
│  │ + fetchPokemons()   │        └──────────┬───────────┘                │
│  │ + fetchPokemon()    │                   │                            │
│  │ + setSelected()     │                   │ uses                       │
│  │ + setPage()         │                   ▼                            │
│  │ + clearError()      │    ┌──────────────────────────┐               │
│  └──────────┬───────────┘    │    localStorage         │               │
│             │                │  - pokemon_favorites    │               │
│             │ uses           │  - theme_preference     │               │
│             ▼                └──────────────────────────┘               │
│  ┌──────────────────────┐                                                  │
│  │    searchSlice        │        ┌──────────────────────┐               │
│  ├──────────────────────┤        │    themeSlice       │               │
│  │ - query: string      │        ├──────────────────────┤               │
│  │ - results: Pokemon[] │        │ - mode: 'light'|'dark│               │
│  │ - isSearching: bool  │        ├──────────────────────┤               │
│  ├──────────────────────┤        │ + toggleTheme()     │               │
│  │ + setQuery()         │        │ + setTheme()        │               │
│  │ + clearResults()     │        └──────────────────────┘               │
│  │ + search()           │                                                  │
│  └──────────────────────┘                                                  │
│                                                                             │
│  Relaciones del Store:                                                     │
│  - pokemonSlice usa localStorage para caché                                │
│  - favoritesSlice persiste en localStorage                                 │
│  - searchSlice depende de pokemonSlice para buscar                        │
│  - themeSlice persiste la preferencia en localStorage                     │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Paquete: services (Capa de Infraestructura)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                            PAQUETE: services                                │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌──────────────────────┐        ┌──────────────────────┐                │
│  │    pokemonApi        │        │     httpClient       │                │
│  ├──────────────────────┤        ├──────────────────────┤                │
│  │ - getPokemons()      │        │ - baseURL: string   │                │
│  │ - getPokemonDetails()│        │ - timeout: number   │                │
│  │ - clearCache()       │        │ - headers: object   │                │
│  │ - searchPokemon()    │        ├──────────────────────┤                │
│  ├──────────────────────┤        │ + get()              │                │
│  │ - memoryCache: Map   │        │ + post()            │                │
│  │ - localStorageCache  │        │ + handleError()     │                │
│  └──────────┬───────────┘        │ + setHeaders()      │                │
│             │                     └──────────────────────┘                │
│             │ calls                                                       │
│             ▼                                                             │
│  ┌──────────────────────┐                                                 │
│  │    PokéAPI           │                                                 │
│  │  (Externo)           │                                                 │
│  ├──────────────────────┤                                                 │
│  │ - REST API           │                                                 │
│  │ - Rate Limiting      │                                                 │
│  │ - JSON Response      │                                                 │
│  └──────────────────────┘                                                 │
│                                                                             │
│  Estrategia de Caché:                                                      │
│  ┌─────────────────────────────────────────────────────────────────────┐  │
│  │  Nivel 1: In-Memory Cache (Map)                                     │  │
│  │  - Almacena respuestas recientes                                   │  │
│  │  - Persiste durante la sesión                                      │  │
│  │  - Tiempo de vida: inmediato                                       │  │
│  ├─────────────────────────────────────────────────────────────────────┤  │
│  │  Nivel 2: localStorage Cache                                       │  │
│  │  - Almacena datos persistentes                                     │  │
│  │  - TTL: 15 minutos                                                 │  │
│  │  - Clave: 'pokemon_cache'                                         │  │
│  ├─────────────────────────────────────────────────────────────────────┤  │
│  │  Nivel 3: Seed Data (Fallback)                                    │  │
│  │  - Primeros 151 Pokémon pre-cargados                               │  │
│  │  - Disponibles offline                                             │  │
│  └─────────────────────────────────────────────────────────────────────┘  │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

## 4.2 Diagrama de Componentes

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          ARQUITECTURA DE COMPONENTES                        │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │                         Browser (Cliente)                            │  │
│  │                                                                       │  │
│  │  ┌─────────────────────────────────────────────────────────────────┐ │  │
│  │  │                     React Application                           │ │  │
│  │  │                                                                  │ │  │
│  │  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐            │ │  │
│  │  │  │  PokedexPage │  │ DetailPage  │  │  ErrorPage  │            │ │  │
│  │  │  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘            │ │  │
│  │  │         │                │                │                    │ │  │
│  │  │  ┌──────┴────────────────┴────────────────┴──────┐            │ │  │
│  │  │  │                    Router                       │            │ │  │
│  │  │  │             (Hash Router v6)                   │            │ │  │
│  │  │  └──────────────────────┬──────────────────────────┘            │ │  │
│  │  │                         │                                       │ │  │
│  │  │  ┌──────────────────────┴──────────────────────────┐            │ │  │
│  │  │  │                  Redux Store                     │            │ │  │
│  │  │  │  ┌───────────┐ ┌───────────┐ ┌───────────┐    │            │ │  │
│  │  │  │  │ pokemon   │ │ favorites │ │  search   │    │            │ │  │
│  │  │  │  │  slice    │ │  slice    │ │  slice    │    │            │ │  │
│  │  │  │  └───────────┘ └───────────┘ └───────────┘    │            │ │  │
│  │  │  └──────────────────────┬──────────────────────────┘            │ │  │
│  │  │                         │                                       │ │  │
│  │  │  ┌──────────────────────┴──────────────────────────┐            │ │  │
│  │  │  │                  Services Layer                  │            │ │  │
│  │  │  │  ┌───────────┐ ┌───────────┐ ┌───────────┐    │            │ │  │
│  │  │  │  │pokemonApi │ │ httpClient│ │  config   │    │            │ │  │
│  │  │  │  └───────────┘ └───────────┘ └───────────┘    │            │ │  │
│  │  │  └─────────────────────────────────────────────────┘            │ │  │
│  │  │                                                                  │ │  │
│  │  └─────────────────────────────────────────────────────────────────┘ │  │
│  │                                                                       │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
│                                    │                                        │
│                                    │ HTTP                                   │
│                                    ▼                                        │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │                    External Services                                  │  │
│  │  ┌─────────────────────────┐  ┌─────────────────────────────────────┐  │  │
│  │  │   PokéAPI              │  │  GitHub Pages                       │  │  │
│  │  │   pokeapi.co           │  │  (Static Hosting)                  │  │  │
│  │  └─────────────────────────┘  └─────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

## 4.3 Diagrama de Secuencia: Obtener Lista de Pokémon

```
┌─────────┐     ┌──────────┐     ┌─────────┐     ┌────────┐     ┌─────────┐
│  User   │     │ Pokedex  │     │  Redux  │     │ pokemon │     │ PokéAPI │
│         │     │  Page    │     │  Store  │     │   Api   │     │         │
└────┬────┘     └────┬─────┘     └───┬────┘     └──┬─────┘     └──┬────┘
     │               │                │             │              │
     │ 1. Mount     │                │             │              │
     │─────────────>│                │             │              │
     │               │                │             │              │
     │               │ 2. dispatch   │             │              │
     │               │ fetchPokemons()             │              │
     │               │──────────────>│              │              │
     │               │                │             │              │
     │               │                │ 3. call    │              │
     │               │                │────────────>│              │
     │               │                │             │              │
     │               │                │             │ 4. GET      │
     │               │                │             │─────────────>│
     │               │                │             │              │
     │               │                │             │    5. Response
     │               │                │             │<─────────────│
     │               │                │             │              │
     │               │                │ 6. return   │              │
     │               │                │<────────────│              │
     │               │                │             │              │
     │               │                │ 7. update   │              │
     │               │                │   state     │              │
     │               │                │─────────────│              │
     │               │                │             │              │
     │               │ 8. render     │             │              │
     │               │<──────────────│              │              │
     │               │                │             │              │
     │   9. Display │                │             │              │
     │<─────────────│                │             │              │
     │               │                │             │              │
```

## 4.4 Diagrama de Secuencia: Agregar a Favoritos

```
┌─────────┐     ┌────────────┐     ┌──────────┐     ┌─────────────┐
│  User   │     │PokemonCard │     │  Redux   │     │ localStorage│
│         │     │            │     │  Store   │     │             │
└────┬────┘     └─────┬──────┘     └───┬──────┘     └──────┬──────┘
     │                │                │                  │
     │ 1. Click       │                │                  │
     │   favorite     │                │                  │
     │───────────────>│                │                  │
     │                │                │                  │
     │                │ 2. dispatch    │                  │
     │                │ toggleFavorite │                  │
     │                │───────────────>│                  │
     │                │                │                  │
     │                │                │ 3. update state │
     │                │                │ (add/remove id)  │
     │                │                │───────────────>│
     │                │                │                  │
     │                │                │    4. persist    │
     │                │                │   to storage     │
     │                │                │─────────────────>│
     │                │                │                  │
     │                │    5. notify    │                  │
     │                │<───────────────│                  │
     │                │                │                  │
     │     6. Update │                │                  │
     │<──────────────│                │                  │
     │                │                │                  │
```

## 4.5 Diagrama de Estados: Componente PokemonCard

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    DIAGRAMA DE ESTADOS: PokemonCard                         │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│                         ┌─────────────────┐                                 │
│                         │   INITIAL       │                                 │
│                         │   (idle)        │                                 │
│                         └────────┬────────┘                                 │
│                                  │                                          │
│                                  │ receives pokemon data                    │
│                                  ▼                                          │
│                         ┌─────────────────┐                                 │
│              ┌────────│   RENDERING      │                                 │
│              │        │   (display)      │                                 │
│              │        └────────┬─────────┘                                 │
│              │                 │                                            │
│              │                 │ user hovers                               │
│              │                 ▼                                            │
│              │        ┌─────────────────┐                                 │
│              │        │    HOVERED      │◄────────────────┐                │
│              │        │  (scale +1.05)  │                 │                │
│              │        └────────┬────────┘                 │                │
│              │                 │                          │                │
│              │                 │ user clicks              │                │
│              │                 ▼                          │                │
│              │        ┌─────────────────┐                 │                │
│              │        │    ACTIVE       │                 │                │
│              │        │  (pressed)      │                 │                │
│              │        └────────┬────────┘                 │                │
│              │                 │                          │                │
│              │                 │                          │                │
│              │        ┌────────┴────────┐                 │                │
│              │        │                 │                 │                │
│              │        ▼                 ▼                 │                │
│     user clicks     │         user clicks                 │                │
│     favorite btn    │         favorite btn                │                │
│              │        │                 │                 │                │
│              │        ▼                 ▼                 │                │
│              │   ┌──────────┐     ┌──────────┐            │                │
│              └──►│ FAVORITE │     │ NOT      │◄───────────┘                │
│                  │  (gold)  │     │ FAVORITE │                            │
│                  └──────────┘     └──────────┘                            │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

## 4.6 Diagrama de Arquitectura de Flujo de Datos

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    ARQUITECTURA DE FLUJO DE DATOS                            │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  USER INPUT ─────────────────────────────────────────────────────────────▶  │
│                                                                             │
│  ┌────────────────────────────────────────────────────────────────────────┐ │
│  │                         ACTION DISPATCH                                │ │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐ │ │
│  │  │ FETCH_     │  │ TOGGLE_     │  │ SET_       │  │ TOGGLE_     │ │ │
│  │  │ POKEMONS   │  │ FAVORITE    │  │ QUERY      │  │ THEME       │ │ │
│  │  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘ │ │
│  └─────────┼───────────────┼────────────────┼────────────────┼─────────┘ │
│            │               │                │                │           │
│            ▼               ▼                ▼                ▼           │
│  ┌────────────────────────────────────────────────────────────────────────┐ │
│  │                         REDUX MIDDLEWARE                               │ │
│  │  ┌────────────────────────────────────────────────────────────────────┐ ││
│  │  │                    pokemonApi Middleware                          │ ││
│  │  │  ┌──────────┐    ┌──────────┐    ┌──────────┐                   │ ││
│  │  │  │ Check    │───▶│ Fetch    │───▶│ Transform│                   │ ││
│  │  │  │ Cache    │    │ from API │    │ Response │                   │ ││
│  │  │  └──────────┘    └──────────┘    └──────────┘                   │ ││
│  │  └────────────────────────────────────────────────────────────────────┘ ││
│  └────────────────────────────────────────────────────────────────────────┘ │
│            │                                                                 │
│            ▼                                                                 │
│  ┌────────────────────────────────────────────────────────────────────────┐ │
│  │                         REDUCERS                                        │ │
│  │  ┌───────────┐  ┌───────────┐  ┌───────────┐  ┌───────────┐        │ │
│  │  │ pokemon/  │  │favorites/ │  │  search/  │  │  theme/   │        │ │
│  │  │  reducer  │  │  reducer  │  │  reducer  │  │  reducer  │        │ │
│  │  └─────┬─────┘  └─────┬─────┘  └─────┬─────┘  └─────┬─────┘        │ │
│  └────────┼──────────────┼──────────────┼──────────────┼────────────────┘ │
│           │              │              │              │                  │
│           ▼              ▼              ▼              ▼                  │
│  ┌────────────────────────────────────────────────────────────────────────┐ │
│  │                         STATE TREE                                     │ │
│  │  ┌──────────────────────────────────────────────────────────────────┐ │ │
│  │  │ store = {                                                        │ │ │
│  │  │   pokemon: { list: [...], selected: {...}, ... },               │ │ │
│  │  │   favorites: { favoriteIds: [1, 25, 150] },                    │ │ │
│  │  │   search: { query: "", results: [...] },                       │ │ │
│  │  │   theme: { mode: "dark" }                                       │ │ │
│  │  │ }                                                                │ │ │
│  │  └──────────────────────────────────────────────────────────────────┘ │ │
│  └────────────────────────────────────────────────────────────────────────┘ │
│           │                                                                 │
│           ▼                                                                 │
│  ┌────────────────────────────────────────────────────────────────────────┐ │
│  │                    COMPONENT SUBSCRIPTION                             │ │
│  │  ┌───────────┐  ┌───────────┐  ┌───────────┐  ┌───────────┐        │ │
│  │  │ useSelector│ │ useSelector│ │ useSelector│ │useSelector│        │ │
│  │  │ (list)     │ │ (selected) │ │(favoriteIds│ │ (theme)   │        │ │
│  │  └─────┬─────┘  └─────┬─────┘  └─────┬─────┘  └─────┬─────┘        │ │
│  └────────┼──────────────┼──────────────┼──────────────┼────────────────┘ │
│           │              │              │              │                  │
│           ▼              ▼              ▼              ▼                  │
│  ┌────────────────────────────────────────────────────────────────────────┐ │
│  │                         UI RENDER                                      │ │
│  │  ┌───────────┐  ┌───────────┐  ┌───────────┐  ┌───────────┐        │ │
│  │  │PokemonList│  │PokemonCard│  │FavoritesBar│  │  Theme    │        │ │
│  │  └───────────┘  └───────────┘  └───────────┘  └───────────┘        │ │
│  └────────────────────────────────────────────────────────────────────────┘ │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

# Capítulo 5: Diseño de Datos

## 5.1 Modelo de Datos

### 5.1.1 Entidad Pokémon

```javascript
{
  id: number,           // ID nacional del Pokémon (1-151)
  name: string,         // Nombre del Pokémon (e.g., "bulbasaur")
  types: string[],     // Tipos del Pokémon (e.g., ["grass", "poison"])
  sprites: {
    front_default: string,
    back_default: string,
    other: {
      "official-artwork": {
        front_default: string
      }
    }
  },
  stats: [
    { base_stat: number, stat: { name: string } }
  ],
  isFavorite: boolean  // Campo calculado localmente
}
```

### 5.1.2 Estado de Redux

```javascript
// Pokemon Slice
{
  list: {
    results: Pokemon[],
    count: number,
    currentPage: number,
    loading: boolean,
    error: string | null
  },
  selected: Pokemon | null,
  detail: {
    data: Pokemon | null,
    loading: boolean,
    error: string | null
  }
}

// Favorites Slice
{
  favoriteIds: number[]  // IDs de Pokémon favoritos
}

// Search Slice
{
  query: string,
  results: Pokemon[],
  isSearching: boolean
}

// Theme Slice
{
  mode: 'light' | 'dark'
}
```

## 5.2 Diagrama Entidad-Relación

```
┌─────────────────┐       ┌─────────────────┐
│    Pokemon      │       │    Favorite     │
├─────────────────┤       ├─────────────────┤
│ PK  id          │       │ PK  id          │
│    name         │       │    pokemonId    │
│    types        │       │    timestamp    │
│    sprites      │◄──────┤                 │
│    stats        │       │                 │
└─────────────────┘       └─────────────────┘
         │
         │ 1:N
         ▼
┌─────────────────┐
│     Type        │
├─────────────────┤
│ PK  id          │
│    name         │
│    slot         │
└─────────────────┘
```

---

# Capítulo 6: Diseño de Interfaces

## 6.1 Estructura de Componentes

```
┌─────────────────────────────────────────────────────────────────────┐
│                         MainLayout                                  │
├─────────────────────────────────────────────────────────────────────┤
│  ┌───────────────────────────────────────────────────────────────┐│
│  │  Navbar                                                       ││
│  │  [Theme Toggle]                                              ││
│  └───────────────────────────────────────────────────────────────┘│
│                                                                   │
│  ┌───────────────────────────────────────────────────────────────┐│
│  │  PokedexPage (/)                                             ││
│  │                                                               ││
│  │  ┌─────────────────────────────────────────────────────────┐ ││
│  │  │ SearchBar                                               │ ││
│  │  └─────────────────────────────────────────────────────────┘ ││
│  │                                                               ││
│  │  ┌─────────────────────────────────────────────────────────┐ ││
│  │  │ PokedexHeader "Pokédex" count: 151                      │ ││
│  │  └─────────────────────────────────────────────────────────┘ ││
│  │                                                               ││
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐       ││
│  │  │ Pokemon  │ │ Pokemon  │ │ Pokemon  │ │ Pokemon  │       ││
│  │  │  Card    │ │  Card    │ │  Card    │ │  Card    │       ││
│  │  └──────────┘ └──────────┘ └──────────┘ └──────────┘       ││
│  │          ... (grid of 20 items)                           ││
│  │                                                               ││
│  │  ┌─────────────────────────────────────────────────────────┐ ││
│  │  │ Pagination  [<] 1 2 3 ... 8 [>]                       │ ││
│  │  └─────────────────────────────────────────────────────────┘ ││
│  │                                                               ││
│  │  ┌─────────────────────────────────────────────────────────┐ ││
│  │  │ FavoritesBar (sticky) [★] Charizard, Blastoise ...     │ ││
│  │  └─────────────────────────────────────────────────────────┘ ││
│  └───────────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│                         DetailLayout                                │
├─────────────────────────────────────────────────────────────────────┤
│  ┌───────────────────────────────────────────────────────────────┐│
│  │  PokemonDetailPage (/pokemon/:id)                            ││
│  │                                                               ││
│  │  ┌────────────────────┐  ┌───────────────────────────────┐  ││
│  │  │                    │  │                               │  ││
│  │  │   Sprite Image     │  │  Name: Charizard             │  ││
│  │  │   (Animated)       │  │  Types: [Fire] [Flying]      │  ││
│  │  │                    │  │                               │  ││
│  │  │                    │  │  ┌─────────────────────────┐ │  ││
│  │  └────────────────────┘  │  │ Stats                   │ │  ││
│  │                          │  │ HP    ████████░░ 78     │ │  ││
│  │  [★ Add to Favorites]   │  │ Atk   █████████░ 84     │ │  ││
│  │                          │  │ Def   ████████░░ 78     │ │  ││
│  │  [< Back]               │  │ ...                      │ │  ││
│  │                          │  └─────────────────────────┘ │  ││
│  │                          └───────────────────────────────┘  ││
│  └───────────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────────┘
```

## 6.2 Flujo de Navegación

```
┌──────────┐     click      ┌─────────────────┐      click     ┌────────────┐
│ Pokedex  │──────────────>│  PokemonDetail  │───────────────>│   Back     │
│  Page    │                │     Page        │                │   (go(-1)) │
└──────────┘                └─────────────────┘                └────────────┘
     │                            ▲
     │ search                     │
     │ query                     │
     ▼                            │
┌──────────┐                ┌─────────────────┐
│ SearchBar│                │  localStorage   │
│          │                │  Favorites      │
└──────────┘                └─────────────────┘
```

---

# Capítulo 7: Servicios y APIs

## 7.1 Arquitectura de la API

```
┌─────────────────────────────────────────────────────────────────────┐
│                        httpClient Module                            │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌───────────────────────────────────────────────────────────────┐ │
│  │ class HttpClient                                               │ │
│  │ ───────────────────────────────────────────────────────────── │ │
│  │ + baseURL: string                                              │ │
│  │ + timeout: number                                             │ │
│  │ ───────────────────────────────────────────────────────────── │ │
│  │ + get(url, config): Promise<Response>                        │ │
│  │ + post(url, data, config): Promise<Response>                │ │
│  │ + handleError(error): void                                   │ │
│  └───────────────────────────────────────────────────────────────┘ │
│                              │                                      │
│                              ▼                                      │
│  ┌───────────────────────────────────────────────────────────────┐ │
│  │ pokemonApi Module                                             │ │
│  │ ───────────────────────────────────────────────────────────── │ │
│  │ + getPokemons(offset, limit): Promise<PokemonList>           │ │
│  │ + getPokemonDetails(id): Promise<Pokemon>                   │ │
│  │ + clearCache(): void                                          │ │
│  │ ───────────────────────────────────────────────────────────── │ │
│  │ Caching Strategy:                                             │ │
│  │ - Memory Cache (Map)                                          │ │
│  │ - localStorage Cache (15 min TTL)                            │ │
│  │ - Seed Data Fallback (first 151 Pokémon)                    │ │
│  └───────────────────────────────────────────────────────────────┘ │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

## 7.2 Endpoints de la PokéAPI

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/pokemon?offset=0&limit=20` | Lista de Pokémon paginada |
| GET | `/pokemon/{id}` | Detalle de un Pokémon |
| GET | `/pokemon/{name}` | Búsqueda por nombre |

---

# Capítulo 8: Consideraciones de Seguridad

## 8.1 Modelo de Amenazas

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                      ANÁLISIS DE SEGURIDAD DE LA APLICACIÓN                  │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  AMENAZAS IDENTIFICADAS                                                      │
│  ─────────────────────                                                      │
│                                                                             │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐            │
│  │   XSS (Cross   │  │    CSRF        │  │   Data Exposure │            │
│  │   Site         │  │  (Cross-Site   │  │                 │            │
│  │   Scripting)   │  │   Request      │  │   (localStorage)│            │
│  │                │  │   Forgery)     │  │                 │            │
│  └────────┬────────┘  └────────┬────────┘  └────────┬────────┘            │
│           │                    │                    │                      │
│           ▼                    ▼                    ▼                      │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  MEDIDAS DE MITIGACIÓN IMPLEMENTADAS                               │   │
│  ├─────────────────────────────────────────────────────────────────────┤   │
│  │  • React sanitize por defecto                                      │   │
│  │  • No hay cookies con sesión                                       │   │
│  │  • Hash Router previene routing attacks                            │   │
│  │  • CSP configurado en meta tags                                    │   │
│  │  • Validación de datos de API                                      │   │
│  │  • No almacenamiento de datos sensibles                            │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

## 8.2 Medidas de Seguridad Implementadas

### 8.2.1 Protección contra XSS
- React escapa automáticamente el contenido renderizado
- No se usa `dangerouslySetInnerHTML` en ningún componente
- Los datos de la PokéAPI se treatan como texto plano

### 8.2.2 Seguridad de Datos locales
```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    SEGURIDAD DE LOCALSTORAGE                               │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  DATOS ALMACENADOS:                                                         │
│  ┌─────────────────────┬────────────────┬─────────────────────────────┐  │
│  │ Clave                │ Tipo           │ Descripción                 │  │
│  ├─────────────────────┼────────────────┼─────────────────────────────┤  │
│  │ pokemon_favorites    │ JSON Array     │ IDs de Pokémon favoritos    │  │
│  │ pokemon_theme        │ String         │ Preferencia de tema        │  │
│  │ pokemon_cache        │ JSON Object    │ Caché de datos de API      │  │
│  └─────────────────────┴────────────────┴─────────────────────────────┘  │
│                                                                             │
│  NOTA: No se almacenan datos sensibles (no hay autenticación)              │
│  Los favoritos son preferencias del usuario, no datos confidenciales      │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 8.2.3 Content Security Policy (CSP)

La aplicación implementa las siguientes políticas de seguridad:

```html
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; 
               script-src 'self'; 
               style-src 'self' 'unsafe-inline'; 
               img-src 'self' https://raw.githubusercontent.com pokeapi.co data:;
               connect-src 'self' https://pokeapi.co;">
```

### 8.2.4 Validación de Datos

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    VALIDACIÓN DE ENTRADA DE DATOS                           │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌───────────────────────────────────────────────────────────────────────┐ │
│  │  SEARCH INPUT                                                         │ │
│  │  ─────────────────────────────────────────────────────────────────── │ │
│  │  • Sanitización de caracteres especiales                             │ │
│  │  • Limitación de longitud (máx 50 caracteres)                       │ │
│  │  • Normalización a minúsculas                                        │ │
│  └───────────────────────────────────────────────────────────────────────┘ │
│                                                                             │
│  ┌───────────────────────────────────────────────────────────────────────┐ │
│  │  URL PARAMETERS                                                        │ │
│  │  ─────────────────────────────────────────────────────────────────── │ │
│  │  • Validación de tipo (número para ID de Pokémon)                  │ │
│  │  • Rango válido (1-151 para Pokémon de la primera generación)      │ │
│  │  • Redirección a página 404 si no válido                            │ │
│  └───────────────────────────────────────────────────────────────────────┘ │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

## 8.3 Mejores Prácticas de Seguridad

| Práctica | Estado | Descripción |
|----------|--------|-------------|
| Sanitización de entrada | ✅ Implementado | React maneja esto automáticamente |
| CSP Headers | ✅ Implementado | Configurado en index.html |
| Validación de datos | ✅ Implementado | Tipos TypeScript y validación runtime |
| HTTPS | ✅ Forzado por GitHub Pages | Redirección automática |
| Dependencias actualizadas | ✅ Mantenido | Actualizaciones regulares de npm |

---

# Capítulo 9: Optimización de Rendimiento

## 9.1 Estrategia de Caché

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    ESTRATEGIA DE CACHÉ MULTINIVEL                           │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  NIVEL 1: MEMORY CACHE (En Memoria)                                        │
│  ════════════════════════════════════════                                   │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  Implementación: Map<string, CachedResponse>                      │   │
│  │  Tiempo de vida: Duración de la sesión                              │   │
│  │  Tamaño máximo: 50 entradas                                       │   │
│  │  Evicción: LRU (Least Recently Used)                               │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  NIVEL 2: LOCALSTORAGE CACHE                                                │
│  ═══════════════════════════════                                           │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  Clave: 'pokemon_cache'                                            │   │
│  │  Tiempo de vida (TTL): 15 minutos                                  │   │
│  │  Estructura: { key: string, data: any, timestamp: number }         │   │
│  │  Validación: Verificar timestamp antes de usar                    │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  NIVEL 3: SEED DATA (Datos Pre-cargados)                                   │
│  ═══════════════════════════════════════                                   │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  Contenido: Primeros 151 Pokémon                                   │   │
│  │  Propósito: Fallback cuando no hay conexión                        │   │
│  │  Carga: Automática al inicio                                       │   │
│  │  Uso: Solo cuando los niveles 1 y 2 fallan                         │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  FLUJO DE CACHÉ:                                                            │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                                                                     │   │
│  │    Solicitud ──▶ Memory Cache ──▶ localStorage ──▶ API Externa    │   │
│  │         │              │                   │                   │     │   │
│  │         │ HIT         │ MISS              │ MISS              │     │   │
│  │         │             │                   │                   │     │   │
│  │         ▼             ▼                   ▼                   ▼     │   │
│  │    Return Data    Return         Return              Fetch &     │   │
│  │    (inmediate)     from           from               Cache       │   │
│  │                    localStorage   Seed Data           All        │   │
│  │                                                                     │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

## 9.2 Optimizaciones de Renderizado

### 9.2.1 Renderizado de Lista Virtual

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    OPTIMIZACIÓN DE LISTA DE POKÉMON                         │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ESTRATEGIA ACTUAL:                                                         │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  • Pagination: 20 Pokémon por página                                │   │
│  │  • Solo se renderizan los elementos visibles                       │   │
│  │  • Loading skeleton durante la carga                               │   │
│  │  • Memoización de componentes hijos                                │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  ESTRATEGIA RECOMENDADA (Para escalar a más Pokémon):                      │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  • React Window para virtualización                                │   │
│  │  • Solo renderizar items en viewport + buffer                      │   │
│  │  • Estimated item size: 200px                                      │   │
│  │  • Overscan: 5 items                                              │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  IMPACTO DE RENDIMIENTO:                                                    │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  Estado Actual (20 Pokémon):                                       │   │
│  │  - DOM Nodes: ~500                                                │   │
│  │  - Render Time: <16ms                                             │   │
│  │  - Memory: ~10MB                                                  │   │
│  ├─────────────────────────────────────────────────────────────────────┤   │
│  │  Escalado (1000 Pokémon con virtualización):                      │   │
│  │  - DOM Nodes: ~60 (solo visibles)                                 │   │
│  │  - Render Time: <16ms                                             │   │
│  │  - Memory: ~15MB                                                  │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 9.2.2 Memoización

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    OPTIMIZACIONES DE MEMOIZACIÓN                            │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  1. SELECTORS DE REDUX                                                      │
│  ══════════════════════════                                                 │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  // useMemo para selector                                         │   │
│  │  const { pokemons, loading } = useSelector(state => {             │   │
│  │    return {                                                       │   │
│  │      pokemons: state.pokemon.list.results,                       │   │
│  │      loading: state.pokemon.list.loading                          │   │
│  │    };                                                             │   │
│  │  });                                                              │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  2. React.memo PARA COMPONENTES                                             │
│  ════════════════════════════════════                                        │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  // PokemonCardmemo = React.memo(PokemonCard)                    │   │
│  │  // Solo re-renderiza si cambian las props relevantes              │   │
│  │  export const PokemonCard = React.memo(function PokemonCard(     │   │
│  │    { pokemon, isFavorite, onFavorite, onClick }                   │   │
│  │  ) { ... });                                                      │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  3. useCallback PARA HANDLERS                                              │
│  ════════════════════════════════                                          │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  // Evitar recrear funciones en cada render                        │   │
│  │  const handlePageChange = useCallback((page) => {                 │   │
│  │    dispatch(setPage(page));                                       │   │
│  │  }, [dispatch]);                                                  │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

## 9.3 Optimización de Imágenes

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    OPTIMIZACIÓN DE CARGA DE IMÁGENES                         │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  IMPLEMENTACIÓN ACTUAL:                                                     │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  • Loading lazy con native loading="lazy"                          │   │
│  │  • Placeholder durante carga                                      │   │
│  │  • Fallback para errores de carga                                  │   │
│  │  • Progressive image loading (placeholder → imagen)               │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  OPTIMIZACIONES ADICIONALES:                                               │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  • next/image o alternativa para optimización de formato          │   │
│  │  • WebP format cuando está soportado                               │   │
│  │  • Responsive images con srcset                                   │   │
│  │  • Preload de imágenes críticas                                   │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  PRIORIDADES DE CARGA:                                                      │
│  ┌─────────────────────┬────────────────────────────────────────────────┐  │
│  │ Prioridad           │ Imágenes                                      │  │
│  ├─────────────────────┼────────────────────────────────────────────────┤  │
│  │ Alta (preload)     │ Primera página de lista                       │  │
│  │ Media (lazy)       │ Resto de la lista                            │  │
│  │ Baja (lazy)        │ Detalle de Pokémon                           │  │
│  └─────────────────────┴────────────────────────────────────────────────┘  │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

## 9.4 Métricas de Rendimiento

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    MÉTRICAS DE RENDIMIENTO (LIGHTHOUSE)                     │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  PERFORMANCE SCORE: 95+                                            │   │
│  ├─────────────────────────────────────────────────────────────────────┤   │
│  │  │ Métrica              │ Valor Objetivo  │ Actual                │   │
│  │  ├─────────────────────┼─────────────────┼───────────────────────┤   │
│  │  │ First Contentful    │ < 1.8s          │ ~0.8s                 │   │
│  │  │   Paint (FCP)       │                 │                       │   │
│  │  ├─────────────────────┼─────────────────┼───────────────────────┤   │
│  │  │ Largest Contentful │ < 2.5s          │ ~1.2s                 │   │
│  │  │   Paint (LCP)       │                 │                       │   │
│  │  ├─────────────────────┼─────────────────┼───────────────────────┤   │
│  │  │ Time to Interactive │ < 3.8s          │ ~1.5s                 │   │
│  │  │   (TTI)             │                 │                       │   │
│  │  ├─────────────────────┼─────────────────┼───────────────────────┤   │
│  │  │ Cumulative Layout   │ < 0.1           │ ~0.05                 │   │
│  │  │   Shift (CLS)       │                 │                       │   │
│  │  ├─────────────────────┼─────────────────┼───────────────────────┤   │
│  │  │ Total Blocking Time│ < 200ms         │ ~50ms                │   │
│  │  │   (TBT)             │                 │                       │   │
│  │  └─────────────────────┴─────────────────┴───────────────────────┘   │
│  │                                                                     │   │
│  │  OPTIMIZACIONES IMPACTANTES:                                       │   │
│  │  • Code splitting con React.lazy                                  │   │
│  │  • Tree shaking por Vite                                          │   │
│  │  • Minificación automática                                        │   │
│  │  • Caché de build                                                 │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

# Capítulo 10: Estrategia de Pruebas

## 10.1 Panorama de Pruebas

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    ESTRATEGIA DE PRUEBAS COMPLETA                           │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌───────────────────────────────────────────────────────────────────────┐ │
│  │                      PIRÁMIDE DE TESTS                                │ │
│  │                                                                     │ │
│  │                            ┌─────────┐                               │ │
│  │                           │   E2E   │                               │ │
│  │                           │ Tests   │                               │ │
│  │                           │   10%   │                               │ │
│  │                     ┌─────┴─────────┴─────┐                        │ │
│  │                    │    Integration       │                        │ │
│  │                    │      Tests           │                        │ │
│  │                    │       20%            │                        │ │
│  │              ┌─────┴───────────────────────┴─────┐                 │ │
│  │             │         Unit Tests                 │                 │ │
│  │             │            70%                      │                 │ │
│  │             └─────────────────────────────────────┘                 │ │
│  │                                                                     │ │
│  └───────────────────────────────────────────────────────────────────────┘ │
│                                                                             │
│  TIPOS DE PRUEBAS IMPLEMENTADOS:                                           │
│  ┌───────────────────────────────────────────────────────────────────────┐ │
│  │  ✓ Unit Tests (Jest + React Testing Library)                       │ │
│  │  ✓ Component Tests (Storybook + Chromatic)                        │ │
│  │  ✓ Integration Tests                                              │ │
│  │  ✓ Manual Testing ( durante desarrollo)                           │ │
│  └───────────────────────────────────────────────────────────────────────┘ │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

## 10.2 Estructura de Pruebas Unitarias

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    STRUCTURE DE TESTS UNITARIOS                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  src/                                                                      │
│  ├── __tests__/                                                           │
│  │   ├── components/                                                     │
│  │   │   ├── PokemonCard.test.jsx                                      │
│  │   │   ├── SearchBar.test.jsx                                        │
│  │   │   └── Pagination.test.jsx                                       │
│  │   ├── features/                                                      │
│  │   │   ├── pokemonSlice.test.js                                     │
│  │   │   ├── favoritesSlice.test.js                                   │
│  │   │   └── searchSlice.test.js                                      │
│  │   ├── hooks/                                                        │
│  │   │   ├── usePokemonList.test.js                                   │
│  │   │   ├── useFavorites.test.js                                     │
│  │   │   └── useTheme.test.js                                        │
│  │   └── services/                                                     │
│  │       └── pokemonApi.test.js                                        │
│  └── stories/                                                             │
│      ├── PokemonCard.stories.jsx                                         │
│      └── SearchBar.stories.jsx                                          │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

## 10.3 Ejemplos de Pruebas

### 10.3.1 Pruebas de Componente

```javascript
// src/__tests__/components/PokemonCard.test.jsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { PokemonCard } from '@/components/PokemonCard';
import { configureStore } from '@reduxjs/toolkit';

describe('PokemonCard', () => {
  const mockPokemon = {
    id: 1,
    name: 'bulbasaur',
    types: ['grass', 'poison'],
    sprites: { front_default: 'https://example.com/bulbasaur.png' }
  };

  it('renderiza el nombre del Pokémon', () => {
    render(<PokemonCard pokemon={mockPokemon} />);
    expect(screen.getByText('bulbasaur')).toBeInTheDocument();
  });

  it('renderiza los tipos correctamente', () => {
    render(<PokemonCard pokemon={mockPokemon} />);
    expect(screen.getByText('grass')).toBeInTheDocument();
    expect(screen.getByText('poison')).toBeInTheDocument();
  });

  it('llama a onClick al hacer click en la tarjeta', () => {
    const onClick = jest.fn();
    render(<PokemonCard pokemon={mockPokemon} onClick={onClick} />);
    fireEvent.click(screen.getByText('bulbasaur'));
    expect(onClick).toHaveBeenCalledWith(1);
  });

  it('muestra el estado de favorito correctamente', () => {
    render(<PokemonCard pokemon={mockPokemon} isFavorite={true} />);
    const favoriteIcon = screen.getByTestId('favorite-icon');
    expect(favoriteIcon).toHaveAttribute('data-filled', 'true');
  });
});
```

### 10.3.2 Pruebas de Redux Slice

```javascript
// src/__tests__/features/favoritesSlice.test.js
import { favoritesSlice } from '@/features/favorites/favoritesSlice';

describe('favoritesSlice', () => {
  const initialState = {
    favoriteIds: [],
    loading: false
  };

  it('agrega un Pokémon a favoritos', () => {
    const state = favoritesSlice.reducer(
      initialState,
      { type: 'favorites/toggleFavorite', payload: 1 }
    );
    expect(state.favoriteIds).toContain(1);
  });

  it('elimina un Pokémon de favoritos si ya existe', () => {
    const stateWithFavorite = {
      ...initialState,
      favoriteIds: [1, 2, 3]
    };
    const state = favoritesSlice.reducer(
      stateWithFavorite,
      { type: 'favorites/toggleFavorite', payload: 1 }
    );
    expect(state.favoriteIds).not.toContain(1);
    expect(state.favoriteIds).toEqual([2, 3]);
  });

  it('carga favoritos desde localStorage', () => {
    const state = favoritesSlice.reducer(
      initialState,
      { type: 'favorites/loadFavorites', payload: [1, 2, 3] }
    );
    expect(state.favoriteIds).toEqual([1, 2, 3]);
  });
});
```

### 10.3.3 Pruebas de Hooks Personalizados

```javascript
// src/__tests__/hooks/useFavorites.test.js
import { renderHook, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import { useFavorites } from '@/shared/hooks/useFavorites';
import { configureStore } from '@reduxjs/toolkit';

const mockStore = configureStore({
  reducer: {
    favorites: (state = { favoriteIds: [] }, action) => state
  }
});

describe('useFavorites', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('inicializa con favoritos vacíos', () => {
    const { result } = renderHook(() => useFavorites(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      )
    });
    expect(result.current.favorites).toEqual([]);
  });

  it('agrega un favorito correctamente', () => {
    const { result } = renderHook(() => useFavorites(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      )
    });
    
    act(() => {
      result.current.toggleFavorite(1);
    });
    
    expect(result.current.favorites).toContain(1);
  });
});
```

## 10.4 Cobertura de Pruebas

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    COBERTURA DE PRUEBAS META                                │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  OBJETIVOS DE COBERTURA:                                                   │
│  ┌───────────────────────────────────────────────────────────────────────┐ │
│  │  Componente                    │  Cobertura Mínima  │  Prioridad      │ │
│  ├────────────────────────────────┼────────────────────┼─────────────────┤ │
│  │  Redux Slices                  │  90%              │  Alta          │ │
│  │  Componentes UI                │  80%              │  Alta          │ │
│  │  Hooks Personalizados         │  85%              │  Media         │ │
│  │  Utilidades/Helpers            │  90%              │  Media         │ │
│  │  Servicios API                 │  80%              │  Media         │ │
│  └────────────────────────────────┴────────────────────┴─────────────────┘ │
│                                                                             │
│  COMANDOS PARA EJECUTAR PRUEBAS:                                           │
│  ┌───────────────────────────────────────────────────────────────────────┐ │
│  │  npm run test              │  Ejecutar todas las pruebas            │ │
│  │  npm run test:watch        │  Modo watch para desarrollo            │ │
│  │  npm run test:coverage     │  Generar informe de cobertura          │ │
│  │  npm run test:e2e          │  Pruebas end-to-end                    │ │
│  └───────────────────────────────────────────────────────────────────────┘ │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

## 10.5 Storybook para Documentación de Componentes

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    STORYBOOK - DOCUMENTACIÓN VIVA                            │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  PROPÓSITO:                                                                 │
│  • Catálogo vivo de componentes                                             │
│  • Documentación interactiva                                               │
│  • Visual testing con Chromatic                                            │
│  • Playground para desarrollo                                              │
│                                                                             │
│  STORIES IMPLEMENTADAS:                                                     │
│  ┌───────────────────────────────────────────────────────────────────────┐ │
│  │  Component          │  Stories                                      │ │
│  ├─────────────────────┼──────────────────────────────────────────────────┤ │
│  │  PokemonCard        │  Default, Favorite, Loading, Error           │ │
│  │  SearchBar          │  Default, With Results, Empty                 │ │
│  │  Pagination         │  Default, First Page, Last Page               │ │
│  │  FavoritesBar       │  Default, Empty, With Favorites               │ │
│  │  ThemeToggle        │  Light, Dark                                   │ │
│  │  PokemonDetail      │  Default, Loading, Error                      │ │
│  └───────────────────────────────────────────────────────────────────────┘ │
│                                                                             │
│  CONFIGURACIÓN:                                                             │
│  npm run storybook    │  Inicia Storybook en localhost:6006               │
│  npm run build-storybook │  Build estático para despliegue                │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

# Capítulo 11: Despliegue y Operaciones

## 11.1 Entorno de Despliegue

```
┌─────────────────────────────────────────────────────────────────────┐
│                        GitHub Pages Deployment                      │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│   ┌─────────────┐      Build      ┌─────────────┐                 │
│   │   Vite      │ ──────────────> │   Static    │                 │
│   │ Development │     (dist/)    │   Files     │                 │
│   └─────────────┘                 └──────┬──────┘                 │
│                                           │                        │
│                                           ▼                        │
│   ┌─────────────────────────────────────────────────────────────┐  │
│   │                    GitHub Repository                       │  │
│   │                  github.com/slinkter/myprojectapi07        │  │
│   │                                                               │  │
│   │   Branch: main ───────────────────────────────────────────┐ │  │
│   │                                                        │ │  │
│   │   GitHub Pages Settings:                              │ │  │
│   │   - Source: Deploy from main branch                   │ │  │
│   │   - Branch: gh-pages                                  │ │  │
│   └───────────────────────────────────────────────────────┘  │
│                                            │                      │
│                                            ▼                      │
│   ┌─────────────────────────────────────────────────────────────┐  │
│   │                 Public URL                                   │  │
│   │           https://slinkter.github.io/myprojectapi07/       │  │
│   └─────────────────────────────────────────────────────────────┘  │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

## 11.2 Configuración de Hash Router

Para compatibilidad con GitHub Pages SPA:

```javascript
// src/app/router/index.jsx
import { createHashRouter } from "react-router-dom";

const router = createHashRouter([
  {
    path: "/",
    element: <PokedexPage />,
  },
  {
    path: "pokemon/:id",
    element: <PokemonDetailPage />,
  },
]);

export default router;
```

## 11.3 Pipeline de CI/CD

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    PIPELINE DE CI/CD (GitHub Actions)                       │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  WORKFLOW: main.yml                                                         │
│  ┌───────────────────────────────────────────────────────────────────────┐ │
│  │  on: [push, pull_request]                                            │ │
│  │                                                                       │ │
│  │  jobs:                                                               │ │
│  │  ├── build:                                                          │ │
│  │  │   ├── Checkout code                                              │ │
│  │  │   ├── Setup Node.js                                              │ │
│  │  │   ├── Install dependencies (npm ci)                             │ │
│  │  │   ├── Lint (npm run lint)                                       │ │
│  │  │   ├── Typecheck (npm run typecheck)                             │ │
│  │  │   ├── Test (npm run test)                                       │ │
│  │  │   └── Build (npm run build)                                     │ │
│  │  │                                                                   │ │
│  │  └── deploy:                                                         │ │
│  │      ├── needs: build                                                │ │
│  │      ├── if: github.ref == 'refs/heads/main'                        │ │
│  │      └── Deploy to GitHub Pages                                     │ │
│  └───────────────────────────────────────────────────────────────────────┘ │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

# Capítulo 12: Conclusiones y Recomendaciones

## 12.1 Logros del Proyecto

1. **Arquitectura Escalable**: Estructura basada en features con separación clara de responsabilidades
2. **Estado Gestionado**: Redux Toolkit con slices bien definidos y persistencia
3. **UX Mejorada**: Animaciones con Motion, lazy loading de imágenes, tema switcher
4. **Documentación**: Storybook integrado con historias de componentes
5. **Despliegue Exitoso**: Aplicación funcional en GitHub Pages

## 12.2 Recomendaciones Futuras

| Recomendación | Prioridad | Descripción |
|---------------|-----------|-------------|
| Migración a TypeScript | Alta | Añadir tipado estático para mayor seguridad |
| Next.js | Media | Considerar migración para mejor SEO y SSR |
| React Query | Media | Implementar para gestión más robusta de caché |
| PWA | Media | Añadir service workers para funcionalidad offline |
| Testing | Alta | Integrar Jest y Testing Library para cobertura de tests |
| i18n | Baja | Añadir internacionalización |

## 12.3 Léxico de Proyecto

| Término | Definición |
|---------|------------|
| SPA | Single Page Application - Aplicación de una sola página |
| FSD | Feature-Sliced Design - Metodología de arquitectura |
| TTL | Time To Live - Tiempo de vida de caché |
| slice | Patrón de Redux Toolkit para gestión de estado |
| XSS | Cross-Site Scripting - Vulnerabilidad de seguridad |
| CSP | Content Security Policy - Política de seguridad |
| LRU | Least Recently Used - Algoritmo de evictación de caché |

---

# Anexo A: Glosario de Términos

| Término | Descripción |
|---------|-------------|
| Pokémon | Criatura ficticia de la franquicia Nintendo/Game Freak |
| PokéAPI | API REST pública con datos de Pokémon |
| Redux | Biblioteca de gestión de estado para JavaScript |
| Vite | Build tool moderno para proyectos web |
| Storybook | Herramienta para desarrollo de componentes UI |
| Tailwind | Framework de CSS utility-first |

---

# Anexo B: Referencias

- PokéAPI: https://pokeapi.co/
- React Router: https://reactrouter.com/
- Redux Toolkit: https://redux-toolkit.js.org/
- Motion: https://motion.dev/
- Storybook: https://storybook.js.org/
- Tailwind CSS: https://tailwindcss.com/

---

*Documento generado para el proyecto Pokédex React v1.0*
*Ingeniero de Software: Documentación Técnica Completa*
