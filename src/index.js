import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "react-loading-skeleton/dist/skeleton.css";
import "react-modern-drawer/dist/index.css";
import "./assets/sass/main.scss";
import { FilterContextProvider } from "./component/context/filter_context";
import { ContextProvider } from "./component/context/context";
import { ApolloProvider } from "@apollo/client";
import client from "./apollo";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <ContextProvider>
        <FilterContextProvider>
          <App />
        </FilterContextProvider>
      </ContextProvider>
    </ApolloProvider>
  </React.StrictMode>
);
