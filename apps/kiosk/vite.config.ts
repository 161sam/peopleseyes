import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'PeoplesEyes InfoTerminal',
        short_name: 'PE Terminal',
        description: 'PeoplesEyes Kiosk-Modus für öffentliche InfoTerminals',
        theme_color: '#0f172a',
        background_color: '#0f172a',
        // fullscreen = kein Browser-Chrome, kein Back-Button
        display: 'fullscreen',
        orientation: 'portrait-primary',
        start_url: '/',
        icons: [
          { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,woff2,json}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/tiles\.openfreemap\.org\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'map-tiles-kiosk',
              expiration: { maxEntries: 500, maxAgeSeconds: 14 * 24 * 60 * 60 },
            },
          },
          // Profil-JSONs cachen (offline-fähig)
          {
            urlPattern: /\/profiles\/.*\.json$/,
            handler: 'StaleWhileRevalidate',
            options: { cacheName: 'kiosk-profiles' },
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '@peopleseyes/core-model':  '../../packages/core-model/src/index.ts',
      '@peopleseyes/core-logic':  '../../packages/core-logic/src/index.ts',
      '@peopleseyes/core-i18n':   '../../packages/core-i18n/src/index.ts',
      '@peopleseyes/core-crypto':  '../../packages/core-crypto/src/index.ts',
    },
  },
  define: { global: 'globalThis' },
  optimizeDeps: { include: ['maplibre-gl', 'h3-js', 'gun'] },
  build: {
    target: 'es2022',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          maplibre: ['maplibre-gl'],
          h3: ['h3-js'],
        },
      },
    },
  },
});
