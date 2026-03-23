import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'robots.txt'],
      manifest: {
        name: 'PeoplesEyes',
        short_name: 'PeoplesEyes',
        description: 'Zivilgesellschaftliches Crowdsourcing-Tool zur Dokumentation von Behördenaktivitäten',
        theme_color: '#0f172a',
        background_color: '#0f172a',
        display: 'standalone',
        orientation: 'portrait-primary',
        start_url: '/',
        icons: [
          { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,woff2}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/tiles\.openfreemap\.org\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'map-tiles',
              expiration: { maxEntries: 300, maxAgeSeconds: 7 * 24 * 60 * 60 },
            },
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '@peopleseyes/core-model': '../../packages/core-model/src/index.ts',
      '@peopleseyes/core-logic': '../../packages/core-logic/src/index.ts',
      '@peopleseyes/core-i18n': '../../packages/core-i18n/src/index.ts',
      '@peopleseyes/core-crypto': '../../packages/core-crypto/src/index.ts',
    },
  },
  // GUN benötigt Node-Polyfills im Browser
  define: {
    global: 'globalThis',
  },
  optimizeDeps: {
    include: ['gun', 'maplibre-gl', 'h3-js'],
  },
  build: {
    target: 'es2022',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          maplibre: ['maplibre-gl'],
          h3: ['h3-js'],
          // GUN wird lazy importiert – kein eigener Chunk nötig
        },
      },
    },
  },
});
