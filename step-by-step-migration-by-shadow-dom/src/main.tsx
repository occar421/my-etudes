import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { css, Global } from "@emotion/react";
import PortalHead from "./new-gen/cheats/PortalHead";

ReactDOM.render(
  <React.StrictMode>
    <Global
      styles={css`
        body {
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
            "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
            "Helvetica Neue", sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        code {
          font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
            monospace;
        }
      `}
    />
    <App />
    <PortalHead />
  </React.StrictMode>,
  document.getElementById("root")
);
