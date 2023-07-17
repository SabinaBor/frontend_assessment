import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";
import svgLoader from "vite-svg-loader";
import { resolve } from "path";

export default defineConfig({
  plugins: [vue(), svgLoader()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },

  css: {
    modules: {
      generateScopedName: "[hash:base64:5]",
      hashPrefix: " ",
    },
    preprocessorOptions: {
      scss: {
        additionalData: '@import "@/assets/styles/global/index.scss";',
      },
    },
  },
});
