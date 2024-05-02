import "./index.css";
import App from "./App";
import React from "react";
import "../src/styles/tailwind.css";
import { Provider } from "mobx-react";
import ReactDOM from "react-dom/client";
import { jobStore } from "../src/stores/jobStore";
import { authStore } from "../src/stores/authStore";
import { userStore } from "../src/stores/userStore";
import { QueryClientProvider, QueryClient } from "react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider authStore={authStore} userStore={userStore} jobStore={jobStore}>
    <QueryClientProvider client={queryClient}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </QueryClientProvider>
  </Provider>
);
