import axios from "axios";
import { API_CONFIG } from "@/services/api/config";

/**
 * Módulo `httpClient`.
 *
 * **Responsabilidad:**
 * * Crea y configura la instancia única de Axios para toda la aplicación.
 * * Define interceptores globales de Request (Tokens, Logs) y Response (Manejo de errores).
 *
 * **Motivo de existencia:**
 * * Evita configurar Axios en cada llamada.
 * * Provee un punto único para manejar errores 401, 403, 500 de forma consistente.
 *
 * **Relación con otros módulos:**
 * * Utiliza: `API_CONFIG` para la `baseURL`.
 * * Es utilizado por: Todos los servicios de API (ej. `pokemonApi`).
 */
const httpClient = axios.create({
    baseURL: API_CONFIG.BASE_URL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});

// Request interceptor for logging or auth tokens
httpClient.interceptors.request.use(
    (config) => {
        // Add logic here if needed (e.g., Auth tokens)
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

// Response interceptor for centralized error handling
httpClient.interceptors.response.use(
    (response) => response,
    (error) => {
        // Centralized error treatment
        const message =
            error.response?.data?.message ||
            error.message ||
            "Error de conexión";
        console.error("[API Error]:", message);
        return Promise.reject(new Error(message));
    },
);

export default httpClient;
