import { defineConfig } from "tsup";

export default defineConfig([
  // Library build
  {
    entry: { index: "src/index.ts" },
    format: ["esm"],
    dts: true,
    clean: true,
    outDir: "dist",
    target: "node16",
  },
  // CLI build
  {
    entry: { cli: "bin/cli.ts" },
    format: ["esm"],
    dts: true,
    outDir: "dist",
    target: "node16",
    banner: {
      js: "#!/usr/bin/env node",
    },
  },
]);
