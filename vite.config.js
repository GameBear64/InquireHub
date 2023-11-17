import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite'

import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@components': fileURLToPath(new URL('./src/components', import.meta.url)),
      '@form': fileURLToPath(new URL('./src/components/Form', import.meta.url)),
      '@utils': fileURLToPath(new URL('./src/utils', import.meta.url)),
    },
  },
  build: {
    outDir: 'build',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.indexOf('node_modules') !== -1) return id.toString().split('node_modules/')[1].split('/')[0].toString();
        },
      },
    },
  },
})
