import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "./App";
import { AppStoreProvider } from "./store/AppStore";
import "./styles/app.css";

// HashRouter, damit der statische Build auch ohne Server-Rewrites in jedem
// Website-Unterordner funktioniert.
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppStoreProvider>
      <HashRouter>
        <App />
      </HashRouter>
    </AppStoreProvider>
  </React.StrictMode>,
);
