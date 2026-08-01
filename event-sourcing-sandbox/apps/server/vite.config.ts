import { defineConfig } from "vite-plus";
import devServer from "@hono/vite-dev-server";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  fmt: {},
  lint: {
    jsPlugins: [{ name: "vite-plus", specifier: "vite-plus/oxlint-plugin" }],
    rules: { "vite-plus/prefer-vite-plus-imports": "error" },
    options: { typeAware: true, typeCheck: true },
  },
  run: {
    cache: true,
  },
  plugins: [
    tsconfigPaths(),
    devServer({
      entry: "./src/index.ts",
    }),
  ],
});
