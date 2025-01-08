import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // Esto asegura que las rutas relativas funcionen
  build: {
    outDir: 'dist' // Carpeta de salida para el build
  },
  server: {
    // Esto es opcional, pero ayuda en el desarrollo local
    host: true
  }
});
