import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import cloudflare from "@astrojs/cloudflare";
import sitemap from "@astrojs/sitemap";
import path from "node:path";

export default defineConfig({
  site: "https://tools.sattaspace.com",
  output: "server",
  adapter: cloudflare({
    imageService: "cloudflare",
  }),
  integrations: [react(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        "@": path.resolve("./src"),
      },
    },
    // Force Vite back to standard esbuild runner mode
    optimizeDeps: {
      noDiscovery: false,
    },
    server: {
      // Prevents Vite 6 runner worker type mismatch
      watch: {
        usePolling: true,
      },
    },
    define: {
      "import.meta.env.SITE": JSON.stringify("https://tools.sattaspace.com"),
    },
  },
  trailingSlash: "always",
  publicDir: "./public",
});