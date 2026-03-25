import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // Node 18+ stellt globalThis.crypto (Web Crypto API) bereit – kein Browser-Umgebung nötig
    environment: 'node',
    include: ['src/**/*.test.ts'],
  },
});
