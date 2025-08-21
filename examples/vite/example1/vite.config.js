import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      entry: 'main.js',
      name: 'ClassHeavy',
      fileName: 'class-heavy'
    },
    outDir: '../../../dist/class-heavy',
    rollupOptions: {
      output: {
        format: 'es'
      }
    }
  }
})