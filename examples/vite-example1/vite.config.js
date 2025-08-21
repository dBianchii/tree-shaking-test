import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      entry: 'main.js',
      name: 'ViteExample',
      fileName: 'vite-example'
    },
    rollupOptions: {
      output: {
        format: 'es'
      }
    }
  }
})