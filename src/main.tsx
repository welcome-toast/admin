import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./app/App";
import { initAmplitude } from "./shared/configs/amplitude";
import { AmplitudeProvider } from "./widgets/AmplitudeTracker";
import "./index.css";

initAmplitude();

const rootElement = document.getElementById("root");

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <BrowserRouter>
        <AmplitudeProvider>
          <App />
        </AmplitudeProvider>
      </BrowserRouter>
    </React.StrictMode>,
  );
} else {
  console.error("Failed to find the root element");
}
