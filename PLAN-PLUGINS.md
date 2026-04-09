# Plan de Implementación de Plugins Recomendados

## Resumen del Plan

| Fase | Plugin | Descripción |
|------|--------|-------------|
| 1 | clsx + tailwind-merge | Utilidad para clases condicionales |
| 2 | React Hot Toast | Notificaciones elegantes |
| 3 | React Lazy Load Image | Carga diferida de imágenes |
| 4 | Storybook | Documentación de componentes |

---

## Fase 1: Instalación de Dependencias

### Objetivo
Instalar todos los plugins necesarios para el proyecto.

### Comandos a ejecutar
```bash
npm install clsx tailwind-merge react-hot-toast react-lazy-load-image-component
npm install -D storybook @storybook/react @storybook/react-vite @storybook/addon-essentials @storybook/addon-interactions @storybook/addon-links @storybook/addon-onboarding @storybook/blocks @storybook/test
```

### Paquetes a instalar:
- `clsx` - Alternativa légère a classnames
- `tailwinds-merge` - Combina clases de Tailwind sin conflictos
- `react-hot-toast` - notificaciones bonitas
- `react-lazy-load-image-component` - Lazy loading con efectos
- Storybook (devDependencies)

---

## Fase 2: clsx + tailwind-merge

### Objetivo
Crear utilidad `cn()` para combinar clases de Tailwind.

### Implementación
Crear archivo `src/lib/utils.js`:
```javascript
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
```

### Uso
```javascript
import { cn } from "@/lib/utils";

// Antes
className={`bg-red-500 ${isActive ? "text-white" : "text-gray"}`}

// Después
className={cn(
  "bg-red-500",
  isActive && "text-white",
  !isActive && "text-gray"
)}
```

---

## Fase 3: React Hot Toast

### Objetivo
Añadir sistema de notificaciones moderno.

### Implementación
1. Importar en `main.jsx`:
```javascript
import { Toaster } from "react-hot-toast";
```

2. Añadir componente en el root:
```jsx
<Toaster 
  position="bottom-right"
  toastOptions={{
    style: {
      background: '#363636',
      color: '#fff',
    },
  }}
/>
```

3. Uso en cualquier componente:
```javascript
import toast from "react-hot-toast";

toast.success("Pokemon guardado!");
toast.error("Error al cargar");
toast.loading("Cargando...");
```

---

## Fase 4: React Lazy Load Image

### Objetivo
Optimizar carga de imágenes con lazy loading y efectos.

### Implementación
1. En `PokemonCard.jsx`:
```javascript
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

<LazyLoadImage
  src={image}
  alt={name}
  effect="blur"
  className="w-full h-full object-contain"
  placeholderSrc={placeholder}
/>
```

2. Beneficios:
- Carga imágenes solo cuando aparecen en viewport
- Efecto blur suave durante carga
- Reduce consumo de red

---

## Fase 5: Storybook

### Objetivo
Documentar componentes y crear historia de cada uno.

### Implementación
1. Inicializar:
```bash
npx storybook@latest init
```

2. Crear archivo de historia `PokemonCard.stories.jsx`:
```javascript
import PokemonCard from './PokemonCard';

export default {
  component: PokemonCard,
  title: 'PokemonCard',
  tags: ['autodocs'],
};

export const Default = {
  args: {
    id: 1,
    name: 'bulbasaur',
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
    types: ['grass', 'poison'],
    favorite: false,
  },
};

export const Favorite = {
  args: {
    ...Default.args,
    favorite: true,
  },
};
```

3. Ejecutar:
```bash
npm run storybook
```

---

## Orden de Ejecución Recomendado

1. **Semana 1**: Fases 1-2 (Instalar + clsx/tailwind-merge)
2. **Semana 2**: Fase 3 (React Hot Toast)
3. **Semana 3**: Fase 4 (Lazy Load)
4. **Semana 4**: Fase 5 (Storybook)

---

## Recursos

- [clsx](https://github.com/lukeed/clsx)
- [tailwind-merge](https://github.com/dcastil/tailwind-merge)
- [React Hot Toast](https://react-hot-toast.com)
- [React Lazy Load Image](https://github.com/typicode/react-lazy-load-image-component)
- [Storybook](https://storybook.js.org/docs/react/get-started/install)