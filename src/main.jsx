/**
 * The main entry point for the React application.
 * It sets up the Redux store, theme provider, and renders the root App component.
 */
import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "@/store";
import ThemeWrapper from "@/app/ThemeWrapper.jsx";
import { PokemonSkeleton } from "@/features/pokemon";
import App from "@/app/App.jsx";
import "@/index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeWrapper>
        <BrowserRouter>
          <Suspense
            fallback={
              <div className="flex justify-center items-center h-screen bg-slate-50 dark:bg-slate-900">
                <div className="w-full max-w-sm p-4">
                  <PokemonSkeleton />
                </div>
              </div>
            }
          >
            <App />
          </Suspense>
        </BrowserRouter>
      </ThemeWrapper>
    </Provider>
  </React.StrictMode>,
);
