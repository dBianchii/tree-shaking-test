import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      entry: 'main.js',
      name: 'NamedExports',
      fileName: 'named-exports'
    },
    outDir: '../../dist/named-exports',
    rollupOptions: {
      output: {
        format: 'es'
      }
    },
    minify: false
  }
})