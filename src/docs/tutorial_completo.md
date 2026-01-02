# 🎓 Tutorial Completo: Construyendo una Pokédex Profesional

Bienvenidos al ecosistema de **Pokédex Master**. Este tutorial te guiará para entender cómo extender esta aplicación manteniendo los estándares de arquitectura limpia.

## 1. Agregando una Nueva Funcionalidad (Feature)

Supongamos que quieres agregar un sistema de "Batalla entre Pokémon".

### Paso 1: Estructura

Crea una nueva carpeta en `features/battle`:

```bash
src/features/battle/
 ├── components/ BattleArena.jsx
 ├── hooks/ useBattle.js
 ├── state/ battleSlice.js
 └── index.js
```

### Paso 2: Exportar (Barrel Pattern)

En `features/battle/index.js`, exporta solo lo necesario:

```javascript
export { BattleArena } from "./components/BattleArena";
export { battleReducer } from "./state/battleSlice";
```

## 2. Dominando Tailwind CSS

Para crear UI consistente, usa nuestras capas globales en `index.css`:

- `@layer base`: Estilos para HTML nativo.
- `@layer components`: Clases complejas reutilizables (ej. `.card-pokemon`).
- `@layer utilities`: Clases rápidas atómicas.

## 3. Manejo de Estado con Redux Toolkit

Evita el estado local para datos que deben persistir entre páginas.

```javascript
// Correcto
const { pokemons } = useSelector((state) => state.pokemon);

// Incorrecto (si se usa en múltiples lugares)
const [pokemons, setPokemons] = useState([]);
```

## 4. Integración de API

Usa siempre el `httpClient.js` para asegurar que el manejo de errores sea uniforme.

```javascript
import httpClient from "@/lib/httpClient";

const getMyData = () => httpClient.get("/endpoint");
```

## 5. Mejores Prácticas de Rendimiento

- Usa `React.memo` para evitar re-renderizados en listas grandes.
- Usa el alias `@` para mantener imports limpios.
- Implementa `lazy()` y `Suspense` para todas las rutas.

---

[Regresar al README](../../README.md)
