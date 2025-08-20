import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      entry: 'main.js',
      name: 'ClassOptimized',
      fileName: 'class-optimized'
    },
    outDir: '../../../dist/class-optimized',
    rollupOptions: {
      output: {
        format: 'es'
      }
    },
    minify: false
  }
})