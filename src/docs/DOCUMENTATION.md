# 📄 Documentación Técnica Detallada

## 1. Requerimientos del Sistema

- **Node.js:** v18.0.0 o superior.
- **Pnpm:** v9.0.0 o superior (recomendado para eficiencia de disco).

## 2. Sistema de Diseño

El sistema de diseño se basa en **Tailwind CSS**. No se utilizan librerías de componentes pre-estilizados con lógica de runtime.

### Colores de Marca:

- **Primary:** `#EF4444` (Pokéball Red)
- **Secondary:** `#3B82F6` (Water Blue)
- **Dark Background:** `#0F172A` (Slate 900)

## 3. Lógica de Negocio

Toda la lógica de negocio reside en los **Slices de Redux Toolkit** y en los **Custom Hooks** de cada funcionalidad.

### Dominio de Pokémon:

- Gestiona la paginación global.
- Coordina el filtrado del lado del cliente basado en la carga actual.
- Transforma los datos crudos de la PokéAPI en objetos ligeros para la UI.

## 4. Persistencia

La funcionalidad de **Favoritos** utiliza `localStorage` para persistir la selección del usuario. La sincronización ocurre de forma automática al despachar la acción `toggleFavorite`.

## 5. Rendimiento

- **Code Splitting:** Implementado a nivel de rutas mediante `React.lazy`.
- **Image Optimization:** Uso de `loading="lazy"` para todas las imágenes de los Pokémon.
- **Memoization:** Implementación de `useMemo` en el filtrado de listas para evitar cálculos costosos.

---

[Regresar al README](../../README.md)
