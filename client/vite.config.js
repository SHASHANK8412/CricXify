import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    port: 5178, // Changed from 5177 to 5178
    strictPort: false, // Changed to false to allow fallback to another port if 5178 is in use
    proxy: {
      '/api': {
        target: 'http://localhost:5176',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  publicDir: 'public', // Explicitly define public directory
  build: {
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
      },
    },
  },
});
