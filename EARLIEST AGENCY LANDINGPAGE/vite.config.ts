import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Static build for Aruba.it Windows hosting (uploaded via FTP)
  base: './',
  server: {
    host: true,
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
});
