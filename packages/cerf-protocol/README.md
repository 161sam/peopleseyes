# CERF — Civic Enforcement Report Format

**Version:** 0.1.0 | **License:** MIT

CERF is an open protocol for sharing anonymized enforcement activity reports between independent civic tools. It provides a minimal, jurisdiction-agnostic schema so that tools built for different regions can exchange data without sharing raw user data or proprietary formats.

## Why CERF exists

Civic monitoring tools for enforcement activity are being built independently across jurisdictions — PeoplesEyes for Europe, Firewatch and Iceout for the United States, and others. Without a shared data format, these communities cannot benefit from each other's observations, even when the same agencies operate across borders.

CERF solves this by defining the smallest schema that every tool can agree on, while leaving jurisdiction-specific details in optional extension fields.

**Core privacy guarantees:**
- No raw GPS coordinates — only [H3 cells](https://h3geo.org/) at resolution 7 (≈ 5 km²)
- Timestamps rounded to the full hour — no exact observation times
- No user identifiers of any kind
- Signatures are ephemeral session keys, not persistent identities

## Minimal JSON example

```json
{
  "cerf": "0.1.0",
  "reportedAtHour": 1711400400000,
  "jurisdiction": "EU",
  "h3Cell": "871f1d464ffffff",
  "agencyGroup": "federal_border",
  "activityType": "checkpoint",
  "confidence": "direct",
  "verifiedBy": null,
  "source": "peopleseyes"
}
```

## Feed format

```json
{
  "cerf": "0.1.0",
  "generatedAt": 1711403612000,
  "source": "peopleseyes",
  "jurisdiction": "EU",
  "reports": [ ... ]
}
```

Feeds are served as static JSON at a well-known path (e.g. `/cerf-feed.json`) and may be cached by the consumer for up to 5 minutes.

## Schema reference

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `cerf` | `"0.1.0"` | ✓ | Protocol version |
| `reportedAtHour` | `number` | ✓ | Unix ms, rounded to full hour |
| `jurisdiction` | `"EU" \| "US" \| "global"` | ✓ | Geographic jurisdiction |
| `h3Cell` | `string` | ✓ | H3 cell ID, resolution 7 recommended |
| `agencyGroup` | see below | ✓ | Abstracted agency category |
| `activityType` | see below | ✓ | Observed activity |
| `confidence` | `"direct" \| "indirect" \| "uncertain"` | ✓ | Reporter confidence |
| `verifiedBy` | `null \| "community" \| "ngo"` | ✓ | Verification status |
| `source` | `string` | ✓ | Originating tool name |
| `signature` | `string` | — | ECDSA-P256-SHA256, Base64 |
| `signerPublicKey` | `string` | — | SPKI Base64, ephemeral |
| `extensions` | `object` | — | Tool-specific extras (no PII) |

### Agency groups

| Value | EU | US |
|-------|----|----|
| `federal_border` | Bundespolizei, Frontex | CBP, Border Patrol |
| `federal_other` | Federal agencies | ICE, FBI |
| `local_police` | Landespolizei | Local PD, Sheriff |
| `immigration` | Ausländerbehörde | ICE Enforcement |
| `joint_operation` | Joint operations | Joint Task Force |
| `unknown` | Unknown | Unknown |

### Activity types

| Value | Description |
|-------|-------------|
| `checkpoint` | Stationary control point |
| `patrol` | Mobile patrol |
| `id_check` | Identity / document check |
| `arrest` | Arrest / apprehension |
| `transport` | Person transport |
| `search` | Building / premises search |
| `vehicle_stop` | Vehicle stop |
| `other` | Other |

## Implementing CERF in your tool

1. **Install this package** (or copy the types — it's tiny):
   ```
   npm install @cerf/protocol
   ```

2. **Validate incoming reports** with `validateCerfReport()` before using them.

3. **Convert your internal model** to CERF using `aggregateToCerf()` as a reference — implement your own converter that maps your agency categories and activity types to CERF values.

4. **Serve a feed** at `GET /cerf-feed.json` with the `CerfFeed` structure. Add `Access-Control-Allow-Origin: *` so other tools can fetch it.

5. **Consume feeds** from other tools: fetch, validate with `validateCerfFeed()`, then map individual reports with `validateCerfReport()`.

```typescript
import { validateCerfFeed, validateCerfReport } from '@cerf/protocol';

const response = await fetch('https://example.org/cerf-feed.json');
const data: unknown = await response.json();

if (validateCerfFeed(data)) {
  const valid = data.reports.filter(r => validateCerfReport(r));
  // use valid reports
}
```

## Reference implementation

[PeoplesEyes](https://github.com/peopleseyes/peopleseyes) is the reference implementation of CERF for the EU context.

## How to contribute

- **Protocol changes** → open an issue describing the use case before proposing schema changes. Backward compatibility is required within a major version.
- **New jurisdiction mappings** → add entries to `AUTHORITY_TO_CERF_GROUP` and `ACTIVITY_TO_CERF_TYPE` in `convert.ts` with a PR.
- **Bug reports** → open an issue with a minimal reproduction.

All contributions must preserve the privacy guarantees: no raw coordinates, no exact timestamps, no user identifiers.

## License

MIT — use freely, keep the privacy guarantees.
