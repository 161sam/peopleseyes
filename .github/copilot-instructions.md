# PeoplesEyes Copilot Instructions

## Architecture Overview

PeoplesEyes is a local-first, privacy-by-design crowdsourcing tool for anonymous documentation of government activities in EU/Germany. No central server; P2P sync via GUN.js with ephemeral ECDSA keys.

**Monorepo Structure:**
- `packages/core-model/`: Pure TypeScript types/interfaces (no logic, no deps)
- `packages/core-logic/`: Pure algorithms (H3 geo, consensus, abuse detection) - runs identically in web/mobile/tests
- `packages/core-i18n/`: Fully typed translations (DE/EN/TR/UK/AR/FA) with RTL support
- `packages/core-crypto/`: Web Crypto API only (ephemeral keys, signing, EXIF stripping)
- `apps/web/`: React 18 PWA (MapLibre + GUN.js)
- `apps/mobile/`: Expo React Native (SQLite + native camera)
- `apps/kiosk/`: Configurable PWA terminals (JSON profiles)

**Data Principles:**
- GPS → H3 cell ID locally; only anonymized `CellId` shared
- Ephemeral peer IDs (regenerated per app start)
- No accounts, no identity, no analytics
- EXIF-free: Web canvas reprojection, mobile expo-image-manipulator re-encode

## Key Patterns

**Report Creation:**
- Use `createReport(draft, nowMs?)` from `@peopleseyes/core-logic/report-factory`
- Anonymizes position immediately, rounds timestamp to minute, generates crypto.randomUUID
- Reports immutable after creation

**P2P Sync:**
- Sign `CellAggregate` with ephemeral keypair before publishing
- Validate received aggregates with `validateCellAggregate()` (type guard + signature verify)
- Viewport-filtered subscriptions: only sync visible map cells

**Kiosk Configuration:**
- Profiles in `apps/kiosk/src/profiles/*.json` control behavior
- Load via `window.__PE_KIOSK_PROFILE__`, URL param, or fallback
- Configures allowed tabs, timeout, branding, emergency contacts

**Translation Usage:**
- `getTranslations(locale)` returns typed object
- `isRtlLocale(locale)` for RTL detection (AR/FA)
- All locales active; extend via `SupportedLocale` in `core-model/src/settings.ts`

**Geo Handling:**
- `anonymizePosition(lat, lng, resolution, nowMs)` → `AnonymizedPosition` (H3 cell + hour timestamp)
- Resolution 7 (~5km²) default; never transmit raw GPS

## Development Workflows

**Build & Run:**
- `pnpm install` (corepack enable first)
- `pnpm dev` - starts all apps in watch mode via Turbo
- `pnpm build` - builds all packages/apps
- Individual apps: `cd apps/web && pnpm dev` (port 5173)

**Testing:**
- `pnpm test` - runs tests in all packages (depends on build)
- Core logic tests in `packages/core-logic/` use vitest
- Pure functions only; no browser/native mocks needed

**Linting/Typechecking:**
- `pnpm lint` - ESLint across workspace
- `pnpm typecheck` - TypeScript checks (depends on build)
- Prettier for formatting

**Mobile Development:**
- Android: `cd apps/mobile && pnpm android` (requires Android Studio/emulator)
- iOS: `cd apps/mobile && pnpm ios` (requires Xcode 15+ on macOS)
- EXIF stripping via `expo-image-manipulator` (HEIC→JPEG on iOS)

**Kiosk Deployment:**
- Browser kiosk mode: `chromium-browser --kiosk --incognito "url?profile=id"`
- Profiles control tabs, timeout, branding
- See `DEPLOYMENT.md` for MDM options (Scalefusion, AirDroid)

## Integration Points

**External Dependencies:**
- GUN.js for P2P (gun package)
- H3-js for geo cells (h3-js)
- MapLibre-GL for web maps
- Expo modules for mobile (camera, sqlite, image-manipulator)

**Cross-App Communication:**
- Shared core packages via workspace:*
- P2P protocol identical across web/mobile
- i18n keys shared; translations loaded per app

**Security Considerations:**
- No external crypto libraries; Web Crypto API only
- Ephemeral keys: generate per session, never persist
- Validate all P2P data with type guards and signatures
- No server-side components; fully client-side

## Conventions

- **Immutability:** Reports and aggregates frozen with `Object.freeze()`
- **Error Handling:** Throw descriptive errors; no silent failures
- **File Structure:** `src/` with `index.ts` exports; `services/`, `hooks/`, `components/`, `pages/`
- **Naming:** German comments/docs; English code (variables/functions)
- **Testing:** Pure functions testable without mocks; focus on core-logic coverage

Reference: `README.md` for full architecture; `packages/core-logic/src/` for algorithm examples.</content>
<parameter name="filePath">/home/dev/Documents/peopleseyes/.github/copilot-instructions.md