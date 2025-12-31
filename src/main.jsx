import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "@/app/App.jsx";
import "@/index.css";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "@/store";
import { PokemonSkeleton } from "@/components/ui/PokemonSkeleton";

const store = configureStore({ reducer: rootReducer });

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
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
    </React.StrictMode>
);
