import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: '0.0.0.0', // Esto le dice a Vite que escuche en todas las direcciones
    open: true,
    strictPort: true
  }
});