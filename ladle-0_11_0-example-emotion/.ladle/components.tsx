import { Global } from "@emotion/react";
import type { GlobalProvider } from "@ladle/react";
import { globalStyle } from "../src/globalStyle";

export const Provider: GlobalProvider = ({ children }) => (
  <>
    <Global styles={globalStyle} />
    {children}
  </>
);
