/**
 * @module theme-feature
 * @description
 * Este archivo (conocido como "barrel file") es el punto de entrada público para la "feature" de Tema.
 *
 * **Propósito:**
 * Re-exporta el hook y la lógica de estado relacionados con el tema para que puedan ser
 * consumidos fácilmente por el resto de la aplicación desde una única ubicación.
 *
 * **Ejemplo de uso:**
 * `import { useTheme, themeReducer } from '@/features/theme';`
 */

export { useTheme } from "./hooks/useTheme";
export {
    default as themeReducer,
    toggleTheme,
    setTheme,
} from "./state/themeSlice";
