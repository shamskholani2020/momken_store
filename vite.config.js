import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  server: {
    port: 3003,
  },
  plugins: [
    react(),
    visualizer({
      filename: "./dist/stats.html",
      open: true,
      title: "ROLLUP VIS Momken",
    }),
  ],
  build: {
    minify: "esbuild",
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            // Create smaller vendor chunks based on the module type
            if (id.includes("react")) return "react-vendor";
            if (id.includes("lodash")) return "lodash-vendor";
            return "vendor";
          }
        },
      },
    },
    chunkSizeWarningLimit: 500,
  },
  optimizeDeps: {
    include: ["react", "react-dom"],
  },
});
