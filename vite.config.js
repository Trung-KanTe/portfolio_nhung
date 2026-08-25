import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3001,
    open: true,
  },
  build: {
    target: 'es2020',
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-three': ['three', '@react-three/fiber'],
          'vendor-animation': ['gsap', 'framer-motion', 'lenis'],
          'vendor-react': ['react', 'react-dom'],
        },
      },
    },
  },
})
