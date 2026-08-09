import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
    proxy: {
      // The AI chatbot runs on the local Node/Express server and, in
      // production, as a Vercel Serverless Function at /api/chat — so this
      // specific route must be proxied separately from the rest of /api.
      '/api/chat': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
      // Everything else under /api goes to the Python Career API.
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    }
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));