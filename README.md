# ⚡ Pokédex Master - Arquitectura Limpia con React y Tailwind

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![Stack](https://img.shields.io/badge/stack-React%20%7C%20Redux%20%7C%20Tailwind-success)

## 📖 Introducción

Este proyecto es una aplicación web de alto rendimiento que implementa una Pokédex moderna. Ha sido diseñado bajo los estándares de un **Arquitecto de Software Senior**, priorizando la mantenibilidad, escalabilidad y una experiencia de desarrollador (DX) de primer nivel.

## 🛠️ Stack Tecnológico Oficial

- **Core:** ⚛️ React 18 (Vite)
- **Estado:** 🧠 Redux Toolkit
- **Estilos:** 🎨 **Tailwind CSS Puro** (Zero Runtime CSS-in-JS)
- **Iconos:** 📦 React Icons (Hi/Hi2)
- **API:** 🌍 Axios (Centralizado en `src/lib/httpClient.js`)
- **Calidad:** 🛠️ ESLint + PropTypes

## 🏛️ Arquitectura: Feature-Based Modern

La aplicación utiliza una estructura basada en funcionalidades (Features), lo que permite que el proyecto crezca sin acoplamiento.

```text
src/
 ├─ app/           # Envoltorios globales (Provider, Theme, App)
 ├─ components/    # Componentes UI globales (Layout, UI atómica)
 ├─ features/      # Funcionalidades aisladas (Pokemon, Favorites, Search)
 ├─ lib/           # Instancias de librerías (Axios, etc.)
 ├─ routes/        # Gestión de navegación y code-splitting
 └─ store/         # Configuración central de Redux
```

## 🚀 Inicio Rápido

1. **Instalación:** `pnpm install`
2. **Desarrollo:** `pnpm run dev`
3. **Build:** `pnpm run build`
4. **Lint:** `pnpm run lint`

## 📚 Documentación Técnica

Toda la documentación detallada se encuentra en el directorio `/src/docs`:

1.  **[Guía de Arquitectura](./src/docs/architecture/overview.md)**: Patrones y decisiones.
2.  **[Convenciones de Código](./src/docs/development/conventions.md)**: Naming y estándares.
3.  **[Rutas Absolutas (@)](./src/docs/architecture/imports.md)**: Configuración de alias.
4.  **[Tutorial Completo](./src/docs/tutorial_completo.md)**: Guía paso a paso para nuevos desarrolladores.

---

_Diseñado por la oficina de Arquitectura de Software._
