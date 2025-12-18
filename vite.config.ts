import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite';
import laravel from 'laravel-vite-plugin'
import { wordpressPlugin, wordpressThemeJson } from '@roots/vite-plugin';

export default defineConfig({
  base: '/wp-content/themes/gardener/public/build/',
  server: {
    host: '0.0.0.0',
    port: 5174,
    strictPort: true,
    cors: true,
    hmr: {
      host: 'localhost',
      protocol: 'ws',
    },
  },
  plugins: [
    react(),
    tailwindcss(),
    laravel({
      input: [
        'resources/css/app.css',
        'resources/js/app.tsx',
        'resources/css/editor.css',
        'resources/js/editor.js',
        'resources/js/header.js',
      ],
      refresh: true,
    }),

    wordpressPlugin(),

    wordpressThemeJson({
      disableTailwindColors: false,
      disableTailwindFonts: false,
      disableTailwindFontSizes: false,
      tailwindConfig: './tailwind.config.js',
      baseThemeJsonPath: './theme.json',
      outputPath: 'assets/theme.json',
      cssFile: 'app.css',
    }),
  ],
  resolve: {
    alias: {
      '@scripts': '/resources/js',
      '@styles': '/resources/css',
      '@fonts': '/resources/fonts',
      '@images': '/resources/images',
    },
  },
})
