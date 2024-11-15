import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig(({ mode }) => {
  const isDev = mode === 'development'
  const suffix = isDev ? '' : '.prod'
  return {
    plugins: [dts()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    define: {
      __IS_DEV__: isDev,
    },
    build: {
      lib: {
        entry: './src/main.ts',
        name: 'sfc2sem',
        formats: ['es', 'umd'],
        fileName: f => `main.${f + suffix}.js`,
      },
      target: 'es2015',
      minify: !isDev,
      outDir: `dist/${mode}`,
    },
    esbuild: {
      charset: 'ascii',
      drop: isDev ? [] : ['debugger', 'console'],
    },
  }
})
