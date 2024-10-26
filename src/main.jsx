import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { ThemeProvider } from "@material-tailwind/react";
import { Provider } from "react-redux";
import { thunk } from "redux-thunk";
import { applyMiddleware, compose, legacy_createStore } from "@reduxjs/toolkit";
import rootReducer from "./reducer/rootReducer.js";

const logger = (store) => (next) => (action) => {
    console.log(" action : ", action);
    next(action);
};

const composeAlt = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const componseEnhacers = composeAlt(applyMiddleware(thunk, logger));

const store = legacy_createStore(rootReducer, componseEnhacers);

ReactDOM.createRoot(document.getElementById("root")).render(
    <ThemeProvider>
        <Provider store={store}>
            <App />
        </Provider>
    </ThemeProvider>
);
