import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // ESM-Modus – konsistent mit "type": "module" in package.json
    environment: 'node',
    include: ['src/**/*.test.ts', 'tests/**/*.test.ts'],
    coverage: {
      provider: 'v8',
      include: ['src/**/*.ts'],
      exclude: ['src/index.ts'],
    },
  },
  resolve: {
    // Workspace-Pakete direkt aus src/ auflösen (kein Build-Schritt nötig)
    alias: {
      '@peopleseyes/core-model': new URL(
        '../core-model/src/index.ts',
        import.meta.url,
      ).pathname,
    },
  },
});
