# 📦 Inventario Tecnológico (Scope)

**Proyecto:** `myprojectapi07`
**Fecha:** 19 de Enero, 2026

Este documento detalla estrictamente las tecnologías detectadas en el código fuente y `package.json`. Cualquier tecnología marcada como "❌ NO DETECTADA" no debe asumirse como parte del sistema.

## 1. Tecnologías Core (Detectadas ✅)

| Tecnología        | Versión (aprox) | Uso / Propósito                       |
| :---------------- | :-------------- | :------------------------------------ |
| **React**         | 18.x            | Biblioteca principal de UI.           |
| **Vite**          | 5.x             | Bundler y servidor de desarrollo.     |
| **JavaScript**    | ESModules       | Lenguaje base (con JSX).              |
| **Redux Toolkit** | 2.x             | Estado Global y Slices.               |
| **Tailwind CSS**  | 3.x             | Framework de estilos (Utility-first). |
| **Axios**         | 1.x             | Cliente HTTP para consumo de API.     |
| **PostCSS**       | 8.x             | Procesador de CSS (Autoprefixer).     |
| **React Icons**   | 5.x             | Biblioteca de iconos.                 |

## 2. Tecnologías Ausentes / No Aplicables (❌)

> **Advertencia:** No intentar documentar ni implementar procesos relacionados con estas tecnologías.

- ❌ **React Router DOM**: No instalado. El enrutamiento es simulado o manual.
- ❌ **Firebase / Supabase**: No hay Backend-as-a-Service conectado.
- ❌ **Autenticación (Auth0/Cognito)**: No existe capa de usuarios ni login.
- ❌ **Testing (Jest/Vitest/RTL)**: No hay frameworks de prueba instalados.
- ❌ **TypeScript**: El proyecto es 100% JavaScript (.js/.jsx).
- ❌ **Librerías UI (MUI/Chakra)**: Estrictamente prohibido su uso, solo Tailwind.
- ❌ **i18n**: No hay soporte multi-idioma.

## 3. APIs Externas Conectadas

- **PokéAPI**: `https://pokeapi.co/api/v2/` (Consumo REST público).

---

**Firma:**
Ingeniero de Software (Simulado)
