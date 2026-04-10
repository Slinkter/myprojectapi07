# 🖋️ Convenciones de Código y Estándares

Como equipo de desarrollo senior, seguimos reglas estrictas para mantener la consistencia del codebase.

## 1. Nomenclatura

- **Componentes:** `PascalCase`. Ejemplo: `PokemonCard.jsx`.
- **Hooks:** `camelCase` con prefijo `use`. Ejemplo: `usePokemon.js`.
- **Archivos de Utilidad/Servicios:** `camelCase`. Ejemplo: `httpClient.js`.
- **Carpetas:** `kebab-case`. Ejemplo: `pokemon-list/`.

## 2. Estructura de Componentes

Un componente profesional debe seguir este orden interno:

1. Imports (Externos -> Internos -> Tipos).
2. Definición del Componente.
3. Hooks locales (useState, useEffect).
4. Handlers de eventos (prefijo `handle`).
5. Renderizado (JSX).
6. PropTypes (Obligatorios).
7. Export default.

## 3. Estilizacion: Tailwind CSS

- Usar clases de utilidad siempre que sea posible.
- Para clases condicionales, usar el patrón de template literals o librerías como `clsx`.
- **Dark Mode:** Siempre incluir soporte mediante el prefijo `dark:`.

## 4. Validación de Datos

- Todos los componentes que reciben props **DEBEN** usar `PropTypes`.
- Esto actúa como documentación viva y previene errores en tiempo de ejecución.

## 5. Comentarios y JSDoc

- Usar JSDoc para describir funciones complejas, hooks y componentes.
- Mantener los comentarios enfocados en el "por qué" y no en el "cómo".

---

[Regresar al README](../../README.md)
