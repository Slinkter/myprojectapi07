# 🎨 Análisis de UX/UI y Diseño Visual

**Documento:** Auditoría de Diseño
**Autor:** UX/UI Designer (Simulado)

## 1. Sistema de Diseño (Design System)

El proyecto no utiliza una biblioteca de componentes externa, sino un sistema propio basado en tokens de **Tailwind CSS**.

### Paleta de Colores (Extraída de `tailwind.config.cjs`)

Se detecta una identidad visual definida con colores semánticos:

- 🔴 **Primary:** `#EF4444` (Red-500) - Acción principal, identidad Pokémon.
- 🔵 **Secondary:** `#3B82F6` (Blue-500) - Información, enlaces.
- 🟢 **Tertiary:** `#10B981` (Emerald-500) - Éxito, tipos planta.
- 🌑 **Dark Mode:** Soporte nativo mediante clase `dark` con paleta `slate-900`.

### Tipografía

- **Fuente Principal:** `Inter` (Sans-serif). Optimizada para legibilidad en pantallas.

---

## 2. Componentes Visuales Clave

### Cards (Tarjetas de Pokémon)

- **Estructura:** Header (Imagen) + Body (Nombre/ID) + Footer (Tipos).
- **Interacción:** Efecto `hover:scale` y transición suave.
- **Feedback:** Skeleton loading (`PokemonSkeleton`) mientras carga la imagen.

### Layout (Grid System)

La aplicación utiliza un diseño responsivo fluido:

- **Mobile:** 1 columna (`grid-cols-1`).
- **Tablet:** 2 columnas (`grid-cols-2`).
- **Desktop:** 3 o 4 columnas (`grid-cols-3` / `lg:grid-cols-4`).
- **Container:** Centrado con `max-w-7xl` y `mx-auto`.

---

## 3. Heurísticas de Usabilidad (Nielsen)

| Heurística                 | Estado | Observación                                                                |
| :------------------------- | :----- | :------------------------------------------------------------------------- |
| **Visibilidad del Estado** | ✅     | Se usan Skeletons y Spinners para indicar carga.                           |
| **Consistencia**           | ✅     | Los botones y inputs mantienen el mismo estilo rounded/shadow.             |
| **Control del Usuario**    | ⚠️     | Falta botón de "Volver arriba" en listas largas.                           |
| **Prevención de Errores**  | ⚠️     | El buscador debería mostrar "No se encontraron resultados" explícitamente. |

---

## 4. Recomendaciones de Mejora Visual (Roadmap UX)

1.  **Lazy Loading de Imágenes:** Implementar `loading="lazy"` en las imágenes de las tarjetas para mejorar el LCP (Largest Contentful Paint).
2.  **Accesibilidad (a11y):** Asegurar que todos los elementos interactivos tengan `aria-label` y foco visible.
3.  **Transiciones de Página:** Aprovechar `framer-motion` (si se permitiera) o CSS puro para suavizar el cambio entre lista y detalle.
