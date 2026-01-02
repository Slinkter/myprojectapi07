# 🗺️ Gestión de Importaciones y Alias `@`

Para mejorar la legibilidad del código y facilitar las refactorizaciones, se ha implementado el uso de **Rutas Absolutas** mediante el alias `@`.

## 1. Configuración del Alias

El alias `@` apunta directamente a la carpeta `src/`. Esto evita el "Relative Import Hell" (ej. `../../../components`).

### Archivos de Configuración:

- **`vite.config.js`:** Configura el bundler para resolver los paths.
- **`jsconfig.json`:** Proporciona soporte de IntelliSense para VS Code.

## 2. Convención de Uso

Todas las importaciones internas deben usar el prefijo `@`.

**✅ Correcto:**

```javascript
import { SearchBar } from "@/features/search";
import { usePokemon } from "@/features/pokemon";
```

**❌ Incorrecto:**

```javascript
import { SearchBar } from "../../search/components/SearchBar";
```

## 3. Barriles (Index.js)

Cada feature y carpeta principal debe tener un archivo `index.js`. Esto permite importar de forma limpia:

```javascript
// Exportación en features/pokemon/index.js
export { default as PokemonCard } from "./components/PokemonCard";

// Uso en otro lugar
import { PokemonCard } from "@/features/pokemon";
```

---

[Regresar al README](../../README.md)
