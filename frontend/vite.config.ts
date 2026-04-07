import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const REPO_NAME = '/ai-poetry-maxclaw'

export default defineConfig({
  plugins: [react()],
  base: REPO_NAME + '/',
  server: { port: 5173, strictPort: true },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
})
