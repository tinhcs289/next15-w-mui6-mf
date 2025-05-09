import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["./src/*.ts"],
  format: ["esm", "cjs"],
  dts: true,
  sourcemap: true,
  clean: true,
  external: ["react", "react-dom"],
  splitting: true,
})