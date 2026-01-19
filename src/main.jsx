/**
 * @file main.jsx
 * @description
 * Punto de entrada principal y raíz de la aplicación React.
 *
 * **Responsabilidades:**
 * 1.  **Renderizado Raíz:** Utiliza `ReactDOM.createRoot` para montar la aplicación en el
 *     elemento `<div id="root">` del `index.html`.
 * 2.  **Configuración de Providers:** Envuelve toda la aplicación en un conjunto de "Providers"
 *     esenciales que habilitan funcionalidades globales:
 *
 *     - `<React.StrictMode>`: Activa chequeos y advertencias adicionales en modo de desarrollo
 *       para detectar problemas potenciales.
 *     - `<Provider store={store}>`: Conecta la aplicación con el store de Redux, haciendo que el
 *       estado global esté disponible para todos los componentes.
 *     - `<ThemeWrapper>`: Componente que aplica el tema (claro/oscuro) a toda la aplicación.
 *     - `<BrowserRouter>`: Habilita el enrutamiento del lado del cliente con React Router DOM.
 */
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "@/store";
import ThemeWrapper from "@/components/theme/ThemeWrapper.jsx";
import AppRoutes from "@/routes/AppRoutes.jsx";
import "@/index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeWrapper>
        <BrowserRouter basename="/myprojectapi07">
          <AppRoutes />
        </BrowserRouter>
      </ThemeWrapper>
    </Provider>
  </React.StrictMode>
);