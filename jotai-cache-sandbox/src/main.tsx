import { Provider } from "jotai";
import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { queryClientAtom } from "jotai/query";
import { globalJotaiStore } from "./util";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider
        initialValues={[[queryClientAtom, queryClient]]}
        unstable_createStore={() => globalJotaiStore}
      >
        <App />
      </Provider>
    </QueryClientProvider>
  </React.StrictMode>
);
