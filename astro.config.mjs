import { defineConfig } from "astro/config";

import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";

import cloudflare from "@astrojs/cloudflare";

import sitemap from "@astrojs/sitemap";

import path from "node:path";

// https://astro.build/config
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
    define: {
      "import.meta.env.SITE": JSON.stringify("https://tools.sattaspace.com"),
    },
  },
  trailingSlash: "always",
  publicDir: "./public",
});