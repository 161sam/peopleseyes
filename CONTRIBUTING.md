# Contributing to PeoplesEyes

Technical documentation for developers. For a user-facing overview, see [README.md](./README.md).

## Repository structure

```
peopleseyes/
├── packages/
│   ├── core-model/     # TypeScript types, enums, data model
│   ├── core-logic/     # Algorithms: H3 geo, consensus, scoring, abuse
│   ├── core-i18n/      # Translations (20 locales, RTL support)
│   └── core-crypto/    # Ephemeral keypairs (ECDSA P-256), EXIF stripping
├── apps/
│   ├── web/            # React 18 + Vite + MapLibre + GUN.js PWA
│   ├── mobile/         # React Native / Expo (Android + iOS)
│   └── kiosk/          # React PWA for info terminals (fullscreen mode)
└── turbo.json          # Turborepo build pipeline
```

## Requirements

- Node >= 20
- pnpm >= 9 (`corepack enable`)

## Getting started

```bash
git clone https://github.com/<org>/peopleseyes.git
cd peopleseyes
pnpm install
pnpm build        # compile all packages
pnpm dev          # start all apps in watch mode
```

## Adding a locale

1. Add the locale code to `SupportedLocale` in `packages/core-model/src/settings.ts`
2. Create `packages/core-i18n/src/locales/<code>.ts` implementing the full `Translations` interface
3. Export it from `packages/core-i18n/src/index.ts`
4. Register it in the `LOCALES` map in `packages/core-i18n/src/i18n.ts`
5. If RTL, add to `isRtlLocale()` in `i18n.ts`
6. Add the locale to `LOCALES` in `apps/web/src/pages/screens.tsx` and `LOCALE_LIST` in `apps/mobile/src/pages/screens.tsx`

TypeScript strict mode enforces that every locale file implements all required keys.

## Architecture decisions

- **Privacy-by-design**: GPS coordinates are anonymized to H3 cells (~5 km²) on-device before any sharing
- **No accounts**: ephemeral peer IDs regenerated on each app start
- **No central server**: P2P sync via GUN.js relay network
- **Local-first**: all data stored in IndexedDB (web) or SQLite (mobile); no mandatory cloud sync
- **EXIF stripping**: web via canvas reprojection; mobile via `expo-image-manipulator` re-encode

## Code standards

- TypeScript strict mode — no `any`, no unsafe casts
- No external crypto libraries — Web Crypto API only (`core-crypto`)
- All shared logic lives in `packages/core-*`; apps only contain UI and platform glue
