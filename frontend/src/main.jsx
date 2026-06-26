import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import { HelmetProvider } from "react-helmet-async";

import App from "./App";
import { store } from "./app/store";


ReactDOM.createRoot(
    document.getElementById("root")
).render(

    <React.StrictMode>

        <Provider store={store}>

            <HelmetProvider>

                <BrowserRouter>

                    <App />

                </BrowserRouter>

            </HelmetProvider>


            <Toaster
                position="top-right"
            />


        </Provider>

    </React.StrictMode>

);