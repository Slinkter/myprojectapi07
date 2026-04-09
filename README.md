# Pokédex App

<p align="center">
  <img src="https://img.shields.io/badge/React-18.3-61DAFB?style=flat&logo=react" alt="React">
  <img src="https://img.shields.io/badge/Vite-5.4-646CFF?style=flat&logo=vite" alt="Vite">
  <img src="https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D2?style=flat&logo=tailwind-css" alt="Tailwind">
  <img src="https://img.shields.io/badge/pnpm-10.3-F692FF?style=flat&logo=pnpm" alt="pnpm">
  <img src="https://img.shields.io/badge/Storybook-10.3-FF4785?style=flat&logo=storybook" alt="Storybook">
  <img src="https://img.shields.io/badge/Redux_Toolkit-2.11-764ABC?style=flat&logo=redux" alt="Redux Toolkit">
</p>

Una aplicación React moderna para explorar Pokémon, construida con los más altos estándares de calidad y mejores prácticas de desarrollo frontend.

## 🚀 Arquitectura de Carpetas

El proyecto utiliza **Feature-Sliced Design (FSD)** para una arquitectura escalable y mantenible:

```
src/
├── app/                    # Configuración global de la app
│   └── router/            # Configuración de rutas
├── components/            # Componentes reutilizables
│   └── common/           # Componentes genéricos (Pagination, etc.)
├── entities/              # Entidades de dominio
│   └── pokemon/          # Entidad Pokemon
│       ├── api/          # Definiciones de API
│       ├── data/          # Datos estáticos (seed)
│       ├── model/        # Selectores y utilitarios
│       └── types/        # Definiciones de tipos TypeScript
├── features/              # Features del dominio
│   ├── favorites/        # Sistema de favoritos
│   ├── pokemon/         # Feature Pokemon
│   ├── search/          # Búsqueda y filtrado
│   └── theme/           # Tema (claro/oscuro)
├── lib/                   # Utilidades y helpers
├── pages/                # Páginas de la aplicación
├── shared/               # Componentes compartidos
├── store/                # Configuración de Redux
└── stories/              # Historias de Storybook
```

### Principios de Organización

| Capa | Responsabilidad |
|------|-----------------|
| `app/` | Configuración global (router, providers) |
| `pages/` | Composición de features para vistas |
| `features/` | Lógica de negocio encapsulada |
| `entities/` | Modelos de dominio puros |
| `shared/` | Componentes UI genéricos |

## 🛠️ Tecnologías y Plugins

### Stack Principal

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| React | 18.3 | Framework UI |
| Vite | 5.4 | Build tool moderno y rápido |
| Tailwind CSS | 3.4 | Framework de estilos |
| Redux Toolkit | 2.11 | Gestión de estado |
| React Router | 7.14 | Enrutamiento |
| Motion | 12.38 | Animaciones |

### Herramientas de Desarrollo

| Herramienta | Propósito |
|-------------|-----------|
| pnpm | Gestor de paquetes (más rápido que npm/yarn) |
| ESLint | Linting y análisis estático |
| Prettier | Formateo de código |
| Storybook | Desarrollo de componentes aislados |
| TypeScript (PropTypes) | Tipado para validación |

### ¿Por qué Vite en lugar de CRA?

| Aspecto | Vite | Create React App |
|---------|------|------------------|
| Velocidad de inicio | <1s (HMR) | 30-60s |
| Build producción | Esbuild | Webpack |
| Experiencia dev | Instantánea | Lenta |
| Configuración | Minimal | Oculta |

## 🎨 Component Driven Development (CDD)

El proyecto utiliza **Storybook** para desarrollar componentes de forma aislada:

```bash
# Iniciar Storybook
pnpm storybook

# Build de documentación
pnpm build-storybook
```

### Flujo de Desarrollo CDD

1. **Diseñar** componente en Storybook
2. **Documentar** props y estados
3. **Testear** interacciones visualmente
4. **Integrar** en la aplicación

### Componentes Documentados

- `PokemonCard` - Tarjeta de Pokémon
- `PokemonSkeleton` - Loading skeleton
- `PokedexHeader` - Encabezado de la página
- `Pagination` - Controles de paginación
- `SearchBar` - Barra de búsqueda

## 💻 Guía de Estilo y Herramientas

### Configuración de VS Code Recomendada

```json
{
  "editor.fontFamily": "JetBrains Mono, monospace",
  "editor.fontLigatures": true,
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

### Plugins de VS Code Recomendados

- **ESLint** - Linting automático
- **Prettier** - Formateo de código
- **Tailwind CSS IntelliSense** - Autocompletado de clases
- **Auto Rename Tag** - Renombrar etiquetas HTML/JSX
- **Error Lens** - Errores inline

### Convenciones de Código

- **Nombramiento**: `camelCase` (funciones/variables), `PascalCase` (componentes)
- **Imports**: Alias `@/` para imports absolutos desde `src/`
- **Componentes**: Funcionales con `React.memo` para optimización
- **Hooks**: Custom hooks en carpeta `hooks/` de cada feature

## 🚀 Comandos de Inicio

### Prerrequisitos

- Node.js 18+
- pnpm 8+

### Instalación

```bash
# Clonar repositorio
git clone https://github.com/Slinkter/myprojectapi07.git
cd myprojectapi07

# Instalar dependencias
pnpm install

# Ejecutar en desarrollo
pnpm dev
```

### Scripts Disponibles

```bash
pnpm dev              # Iniciar servidor de desarrollo
pnpm build            # Build para producción
pnpm preview          # Previsualizar build
pnpm lint             # Ejecutar ESLint
pnpm storybook       # Iniciar Storybook
pnpm build-storybook # Build de Storybook
pnpm deploy           # Desplegar a GitHub Pages
```

## 🗺️ Roadmap

- [x] Configuración de proyecto con Vite + React
- [x] Implementación de Tailwind CSS
- [x] Configuración de Redux Toolkit
- [x] Integración con PokéAPI
- [x] Sistema de búsqueda y filtrado
- [x] Sistema de favoritos con persistencia
- [x] Tema claro/oscuro
- [x] Animaciones con Motion
- [x] Integración de Storybook
- [x] Optimización mobile-first
- [ ] Migración a Next.js + TypeScript
- [ ] Implementación de tests E2E
- [ ] Optimización de performance

## 📄 Licencia

MIT © 2024

---

<p align="center">
  Construido con ❤️ usando React, Tailwind y Motion
</p>