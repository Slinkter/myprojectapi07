import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./app/App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./store";
import { PokemonSkeleton } from "./components/ui/PokemonSkeleton";
// Removed: import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";

// Removed: const theme = createTheme({
// Removed:     typography: {
// Removed:         fontFamily: '"Inter", sans-serif',
// Removed:     },
// Removed: });

const store = configureStore({ reducer: rootReducer });

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        {/* Removed: <ThemeProvider theme={theme}> */}
        {/* Removed: <CssBaseline /> */}
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
        {/* Removed: </ThemeProvider> */}
    </React.StrictMode>
);
