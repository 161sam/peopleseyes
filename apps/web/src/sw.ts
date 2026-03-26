/// <reference lib="webworker" />
/// <reference types="vite-plugin-pwa/client" />

import { clientsClaim } from 'workbox-core';
import { precacheAndRoute, cleanupOutdatedCaches } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { CacheFirst, StaleWhileRevalidate } from 'workbox-strategies';

declare const self: ServiceWorkerGlobalScope;

clientsClaim();
cleanupOutdatedCaches();
precacheAndRoute(self.__WB_MANIFEST);

registerRoute(
  ({ url }) => url.hostname === 'tiles.openfreemap.org',
  new CacheFirst({
    cacheName: 'map-tiles',
  }),
);

registerRoute(
  ({ url }) => /\/profiles\/.*\.json$/.test(url.pathname),
  new StaleWhileRevalidate({ cacheName: 'kiosk-profiles' }),
);

const BACKGROUND_SYNC_TAG = 'flush-offline-queue';

type SyncLikeEvent = ExtendableEvent & { tag?: string };

self.addEventListener('sync', event => {
  const syncEvent = event as SyncLikeEvent;
  if (syncEvent.tag !== BACKGROUND_SYNC_TAG) return;

  syncEvent.waitUntil(
    (async () => {
      const windowClients = await self.clients.matchAll({ type: 'window' });
      for (const client of windowClients) {
        client.postMessage({ type: 'FLUSH_OFFLINE_QUEUE' });
      }
    })(),
  );
});

self.addEventListener('push', event => {
  console.debug('[SW] Push-Event empfangen (nicht verarbeitet):', event);
});

// CERF-Feed Route — liefert den von der App gecachten Feed aus
type FetchLikeEvent = ExtendableEvent & { request: Request; respondWith(r: Promise<Response> | Response): void };

self.addEventListener('fetch', event => {
  const fetchEvent = event as FetchLikeEvent;
  const url = new URL(fetchEvent.request.url);
  if (url.pathname !== '/cerf-feed.json') return;

  fetchEvent.respondWith(
    caches.open('pe:cerf-feed-cache').then(cache =>
      cache.match('/cerf-feed.json').then(cached => {
        if (cached) return cached;
        return new Response(JSON.stringify({ error: 'Feed not yet generated' }), {
          headers: { 'Content-Type': 'application/json' },
        });
      }),
    ),
  );
});
