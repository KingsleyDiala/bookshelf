import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "react-loading-skeleton/dist/skeleton.css";
import "react-modern-drawer/dist/index.css";
import "./assets/sass/main.scss";
import { FilterContextProvider } from "./component/context/filter_context";
import { ContextProvider } from "./component/context/context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ContextProvider>
      <FilterContextProvider>
        <App />
      </FilterContextProvider>
    </ContextProvider>
  </React.StrictMode>
);
