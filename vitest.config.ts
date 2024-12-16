// vitest.config.ts
import { defineConfig } from 'vitest/config'

export default defineConfig({
  css: {
    postcss: {
      plugins: [
        require('postcss-import'),
        require('tailwindcss'),
        require('autoprefixer'),
      ],
    },
  },
  test: {
    environment: 'node',
    setupFiles: ['./tests/setup.ts'],
    alias: {
      '#app': './.nuxt',
    },
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/**',
        '.nuxt/**',
        'tests/setup.ts',
      ],
    },
  }
})
