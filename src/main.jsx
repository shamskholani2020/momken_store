import i18next from "i18next";
import React from "react";
import ReactDOM from "react-dom/client";
import { initReactI18next } from "react-i18next";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App.jsx";
import { StoreProvider } from "./context/store/store.jsx";
import "./index.css";
import arTXN from "./translations/arTXN.json";
import enTXN from "./translations/enTXN.json";
import {
  UiEditorContext,
  UiEditorProvider,
} from "./context/UiEditor/UiEditor.jsx";

i18next.use(initReactI18next).init({
  resources: {
    en: {
      translation: enTXN,
    },
    ar: {
      translation: arTXN,
    },
  },

  fallbackLng: localStorage.getItem("lang") ?? "en",

  interpolation: {
    escapeValue: false,
  },
});

document.body.dir = i18next.dir();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UiEditorProvider>
      <StoreProvider>
        <Router>
          <App />
        </Router>
      </StoreProvider>
    </UiEditorProvider>
  </React.StrictMode>
);
