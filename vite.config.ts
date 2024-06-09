import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "url";

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: [
      {
        find: "@/",
        replacement: fileURLToPath(new URL("./src", import.meta.url)),
      },
      {
        find: "@/public",
        replacement: fileURLToPath(new URL("./public", import.meta.url)),
      },
      {
        find: "@/assets",
        replacement: fileURLToPath(new URL("./src/assets", import.meta.url)),
      },
      {
        find: "@/components",
        replacement: fileURLToPath(
          new URL("./src/components", import.meta.url)
        ),
      },
      {
        find: "@/ui",
        replacement: fileURLToPath(
          new URL("./src/components/ui", import.meta.url)
        ),
      },
      {
        find: "@/icons",
        replacement: fileURLToPath(
          new URL("./src/components/ui/icons", import.meta.url)
        ),
      },
      {
        find: "@/types",
        replacement: fileURLToPath(new URL("./types", import.meta.url)),
      },
      {
        find: "@/stores",
        replacement: fileURLToPath(new URL("./src/stores", import.meta.url)),
      },
      {
        find: "@/helpers",
        replacement: fileURLToPath(new URL("./src/helpers", import.meta.url)),
      },
      {
        find: "@/pages",
        replacement: fileURLToPath(new URL("./src/pages", import.meta.url)),
      },
      {
        find: "@/services",
        replacement: fileURLToPath(new URL("./services", import.meta.url)),
      },
      {
        find: "@/api",
        replacement: fileURLToPath(new URL("./src/api", import.meta.url)),
      },
    ],
  },
});
