import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Global } from "@emotion/react";
import { globalStyle } from "./globalStyle";

ReactDOM.render(
  <React.StrictMode>
    <Global styles={globalStyle} />
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
