# Arquitectura: Rutas Absolutas

Este documento detalla la configuración y el uso de rutas absolutas con el alias `@` en el proyecto, una convención **obligatoria** para todas las importaciones de módulos.

## ¿Qué son las Rutas Absolutas?

Una ruta absoluta nos permite importar un módulo desde la raíz del directorio `src/` sin importar en qué parte del proyecto nos encontremos. Utilizamos el alias `@` como un atajo para `src/`.

**Ejemplo:**

En lugar de escribir una ruta relativa como esta:

```jsx
// MAL: Difícil de leer y frágil ante cambios
import { Button } from '../../../components/ui/Button';
```

Escribimos una ruta absoluta, clara y directa:

```jsx
// BIEN: Limpio, legible y robusto
import { Button } from '@/components/ui/Button';
```

## Beneficios

1.  **Mantenibilidad:** Si movemos un archivo de una carpeta a otra, no necesitamos actualizar sus importaciones. Las rutas con `@` siguen siendo válidas.
2.  **Legibilidad:** Se elimina el "infierno de los `../`", haciendo el código mucho más fácil de leer y entender de un vistazo.
3.  **Refactorización Sencilla:** Reorganizar la estructura de archivos se vuelve una tarea trivial, ya que las rutas de importación no se rompen.

## Configuración del Proyecto

Las rutas absolutas están habilitadas a través de dos archivos de configuración principales:

### 1. `vite.config.js` (Bundler)

Este archivo le dice a Vite cómo resolver el alias `@` durante el proceso de build.

```javascript
// vite.config.js
import path from "path";

export default {
  // ...
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
};
```

### 2. `jsconfig.json` (Editor e IntelliSense)

Este archivo le permite a editores como VSCode entender el alias `@`, habilitando el autocompletado y la navegación "Go to Definition".

```json
// jsconfig.json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src"]
}
```

## Regla de Uso (Obligatoria)

> Toda importación de un módulo que no se encuentre en el mismo directorio o en un subdirectorio inmediato **debe** utilizar la ruta absoluta con el alias `@`.

Las rutas relativas (`./` o `../`) solo se permiten para importar módulos "hermanos" o "hijos" inmediatos (ej. estilos, componentes auxiliares en la misma carpeta).
