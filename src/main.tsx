import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "../src/styles/tailwind.css";
import { Provider } from "mobx-react";
import { authStore } from "../src/stores/authStore";
import { userStore } from "../src/stores/userStore";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider authStore={authStore} userStore={userStore}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);
