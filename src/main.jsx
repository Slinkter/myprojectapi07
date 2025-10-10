import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./app/App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./store";
import { PokemonSkeleton } from "./components/ui/PokemonSkeleton";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";

const theme = createTheme({
    typography: {
        fontFamily: '"Inter", sans-serif',
    },
});

const store = configureStore({ reducer: rootReducer });

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Provider store={store}>
                <Suspense
                    fallback={
                        <div className="flex justify-center items-center h-screen">
                            <PokemonSkeleton />
                        </div>
                    }
                >
                    <App />
                </Suspense>
            </Provider>
        </ThemeProvider>
    </React.StrictMode>
);