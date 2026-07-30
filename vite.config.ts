import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  // Relative asset URLs, so the same build works at a domain root and under a
  // project sub-path (e.g. GitHub Pages at /3Dsite/).
  base: './',
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    target: 'es2022',
    cssTarget: 'chrome100',
    chunkSizeWarningLimit: 1400,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('three') || id.includes('postprocessing')) return 'three';
            if (id.includes('react')) return 'react';
            if (id.includes('gsap') || id.includes('lenis')) return 'motion';
          }
          return undefined;
        },
      },
    },
  },
});
