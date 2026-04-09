/**
 * @file main.jsx
 * @description
 * Punto de entrada principal y raíz de la aplicación React.
 */
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import store from "@/store";
import ThemeWrapper from "@/features/theme/components/ThemeWrapper.jsx";
import router from "@/app/router/index.jsx";
import { RouterProvider } from "react-router-dom";
import "@/index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <Provider store={store}>
            <ThemeWrapper>
                <RouterProvider router={router} />
                <Toaster
                    position="bottom-center"
                    toastOptions={{
                        duration: 3000,
                        style: {
                            background: "#1e293b",
                            color: "#f8fafc",
                            borderRadius: "12px",
                            padding: "12px 16px",
                        },
                        success: {
                            iconTheme: {
                                primary: "#22c55e",
                                secondary: "#1e293b",
                            },
                        },
                        error: {
                            iconTheme: {
                                primary: "#ef4444",
                                secondary: "#1e293b",
                            },
                        },
                    }}
                />
            </ThemeWrapper>
        </Provider>
    </React.StrictMode>,
);