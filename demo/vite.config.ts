import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Der Clickdummy laeuft als Unterseite unter /demo der Portfolio-Site.
// - base: "/demo/"  => Assets werden von /demo/assets/... geladen
// - outDir ins public/ des Portfolios => wird beim Portfolio-Build nach dist/demo/ kopiert
// base nur im Build auf "/demo/" — im Dev bleibt es "/" (Preview weiter auf localhost:4321/).
export default defineConfig(({ command }) => ({
  base: command === "build" ? "/demo/" : "/",
  plugins: [react()],
  build: {
    outDir: "../public/demo",
    emptyOutDir: true,
  },
  server: {
    host: true,
    port: 4321,
    strictPort: true,
  },
}));
