import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'
import EnvCompatible from 'vite-plugin-env-compatible'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), EnvCompatible()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  }
})
