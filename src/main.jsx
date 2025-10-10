import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./app/App.jsx";
import "./index.css";
import { ThemeProvider } from "@material-tailwind/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./app/store.js"; // Updated path
import PokemonSkeleton from "./components/ui/PokemonSkeleton";

// configureStore handles middleware (like thunk) and DevTools extension automatically.
const store = configureStore({ reducer: rootReducer });

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <ThemeProvider>
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
