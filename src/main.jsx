/**
 * The main entry point for the React application.
 * It sets up the Redux store, theme provider, and renders the root App component.
 */
import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "@/store";
import ThemeWrapper from "@/app/ThemeWrapper.jsx";
import { PokemonSkeleton } from "@/features/pokemon/components/PokemonSkeleton";
import App from "@/app/App.jsx";
import "@/index.css";
import { Box } from "@mui/material";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <Provider store={store}>
            <ThemeWrapper>
                <Suspense
                    fallback={
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                height: "100vh",
                            }}
                        >
                            <PokemonSkeleton />
                        </Box>
                    }
                >
                    <App />
                </Suspense>
            </ThemeWrapper>
        </Provider>
    </React.StrictMode>
);
