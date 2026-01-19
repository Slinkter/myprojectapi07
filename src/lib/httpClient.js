import axios from "axios";
import { API_CONFIG } from "@/services/api/config";

/**
 * @module httpClient
 * @description Este módulo centraliza la configuración del cliente HTTP para toda la aplicación.
 * Se encarga de crear una instancia de Axios pre-configurada y de gestionar
 * interceptores para las peticiones y respuestas.
 */

/**
 * @constant {import('axios').AxiosInstance} httpClient
 * @summary Instancia única y pre-configurada de Axios.
 * @description Esta instancia de Axios está configurada con la URL base y cabeceras por defecto
 * para todas las llamadas a la API. Utiliza interceptores para manejar de forma
 * centralizada la autenticación, los logs y los errores.
 * @see {@link https://axios-http.com/docs/instance}
 */
const httpClient = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * @name request-interceptor
 * @summary Interceptor de peticiones salientes.
 * @description Este interceptor se ejecuta antes de que cada petición sea enviada.
 * Es el lugar ideal para añadir lógica de autenticación (como enviar un token JWT)
 * o para registrar información de la petición.
 * @param {import('axios').InternalAxiosRequestConfig} config La configuración de la petición.
 * @returns {import('axios').InternalAxiosRequestConfig | Promise<import('axios').InternalAxiosRequestConfig>} La configuración de la petición modificada o sin cambios.
 */
httpClient.interceptors.request.use(
  (config) => {
    // Ejemplo: Añadir un token de autenticación a todas las peticiones
    // const token = localStorage.getItem('authToken');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    // Este error se dispara si algo sale mal en la configuración de la petición
    console.error("[Request Interceptor Error]:", error);
    return Promise.reject(error);
  }
);

/**
 * @name response-interceptor
 * @summary Interceptor de respuestas entrantes.
 * @description Este interceptor se ejecuta para cada respuesta recibida.
 * Permite manejar de forma global los errores de la API (ej. 401, 403, 500)
 * y transformar la respuesta antes de que llegue al punto donde se hizo la llamada.
 * @param {import('axios').AxiosResponse} response La respuesta de la API.
 * @returns {import('axios').AxiosResponse} La respuesta de la API.
 */
httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message || error.message || "Error de conexión";

    console.error(`[API Error]: ${message}`, {
      url: error.config?.url,
      method: error.config?.method,
      data: error.config?.data,
      status: error.response?.status,
    });

    // Rechaza la promesa con un error estandarizado para que el código que
    // hizo la llamada pueda manejarlo (ej. en un bloque catch).
    return Promise.reject(new Error(message));
  }
);

export default httpClient;