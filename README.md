# ⚡ PokéEngine — High-Performance Pokédex (LRU Cache & Motion)

[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=flat&logo=react)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?style=flat&logo=vite)](https://vitejs.dev)
[![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-2.2-764ABC?style=flat&logo=redux)](https://redux-toolkit.js.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-06B6D4?style=flat&logo=tailwindcss)](https://tailwindcss.com)
[![Motion](https://img.shields.io/badge/Motion-v12-0055FF?style=flat&logo=framer)](https://motion.dev)
[![Storybook](https://img.shields.io/badge/Storybook-10.3-FF4785?style=flat&logo=storybook)](https://storybook.js.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

Pokédex de alto rendimiento y arquitectura Feature-Sliced Design (FSD). Diseñada para ofrecer una experiencia interactiva sin latencia mediante **caché LRU**, animaciones fluidas y documentación interactiva en **Storybook**.

---

## 🎯 Características Principales

- **Caché LRU en Memoria**: Algoritmo de expulsión Least Recently Used que almacena detalles de Pokémon para navegación instantánea sin peticiones repetidas.
- **Filtro y Búsqueda Reactiva**: Búsqueda por nombre y número de Pokédex con filtrado por tipos elementales.
- **Ficha Técnica & Gráfico de Estadísticas**: Vista detallada de HP, Ataque, Defensa, Velocidad, habilidades y sprites animados.
- **Persistencia de Favoritos**: Almacenamiento local seguro de Pokémon favoritos con sincronización en tiempo real.
- **Storybook Integrado**: Catálogo de componentes visuales documentados y probados de forma aislada.
- **Lazy Loading de Imágenes**: Carga diferida con `react-lazy-load-image-component` para optimizar ancho de banda.

---

## 🛠️ Stack Tecnológico

| Herramienta | Rol en el Proyecto |
| :--- | :--- |
| **React 18.3** | Componentes funcionales y hooks avanzados |
| **Vite 5.4** | Bundler veloz con recarga rápida de módulos |
| **Redux Toolkit** | Almacén global de estados de Pokémon y favoritos |
| **Motion v12** | Animaciones de física y transiciones de tarjetas |
| **Axios** | Cliente HTTP con interceptores y control de timeout |
| **Storybook 10** | Entorno de desarrollo y documentación de componentes UI |

---

## 🏗️ Arquitectura (FSD)

```text
src/
├── app/            # Configuración de store Redux, rutas y estilos globales
├── pages/          # Páginas de listado y detalle de Pokémon
├── widgets/        # Componentes compuestos (Grid de Pokémon, Panel de filtros)
├── features/       # Casos de uso (favoritos, búsqueda, selector de tipos)
├── entities/       # Entidad Pokémon: slices, adaptadores y componentes base
└── shared/         # Hooks de ciclo de vida, utilidades, LRU cache y UI kit
```

---

## 🚀 Inicio Rápido

### Requisitos Previos
- **Node.js**: v18.0 o superior
- **pnpm**: v9.0 o superior

### Instalación y Ejecución

1. **Instalar dependencias:**
   ```bash
   pnpm install
   ```

2. **Configurar variables de entorno:**
   ```bash
   cp .env.example .env
   ```

3. **Iniciar el servidor de desarrollo:**
   ```bash
   pnpm run dev
   ```

4. **Ejecutar Storybook:**
   ```bash
   pnpm run storybook
   ```

5. **Compilar para producción:**
   ```bash
   pnpm run build
   ```

---

## 📄 Licencia

Este proyecto está bajo la Licencia **MIT**. Consulta el archivo `LICENSE` para más información.
