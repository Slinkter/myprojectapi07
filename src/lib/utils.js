import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * @module utils
 * @description Utilidades para clases de Tailwind CSS.
 * Combina clsx y tailwind-merge para evitar conflictos de clases.
 */

/**
 * Combina múltiples clases de forma segura.
 * Resuelve conflictos entre clases de Tailwind.
 * @param {...string | object | boolean} inputs - Clases o condiciones
 * @returns {string} Clases combinadas sin conflictos
 * @example
 * cn("px-4 py-2", isActive && "bg-red-500", !isActive && "bg-gray-200")
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export default { cn };