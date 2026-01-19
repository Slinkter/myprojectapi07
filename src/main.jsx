/**
 * The main entry point for the React application.
 * It sets up the Redux store, theme provider, router, and renders the routes.
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
  </React.StrictMode>,
);
