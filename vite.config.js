import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    outDir: 'dist',
    // Small site — keep chunks simple; jszip is lazy-loaded on demand.
    chunkSizeWarningLimit: 900,
  },
  ssr: {
    // vite-react-ssg prerenders these; nothing external needs bundling out.
    noExternal: ['lucide-react'],
  },
})
