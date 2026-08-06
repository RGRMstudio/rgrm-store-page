# ⬛ RGRM // IDENTITY REGISTRY [MODULE_002]
**Architecture:** Next.js 14 (App Router) | Sanity.io | Stripe | Printful | Loops.so

## 01 // SYSTEM OVERVIEW
RGRM Studio is a high-performance digital ecosystem designed for the acquisition of "Structural Studies." This repository manages the end-to-end flow from content modeling in Sanity to automated fulfillment via Printful and identity registration via Loops.



## 02 // CORE INFRASTRUCTURE
The engine is powered by a tri-sector handshake:
1. **Financial Gateway**: Stripe (Custom Checkout + Webhooks)
2. **Manufacturing**: Printful API (Store ID: 17181557)
3. **Identity CRM**: Loops.so (Event-driven registration)

## 03 // FILE MANIFEST
### Command & Control
- `/src/app/api/create-checkout-session/route.ts` — Stripe session initialization.
- `/src/app/api/webhooks/route.ts` — Autonomous fulfillment & registration trigger.
- `/src/app/api/cron/sync/printful/route.ts` — Printful → Sanity inventory sync (Bearer `SYNC_SECRET`).
- `/src/app/api/revalidate/route.ts` — Sanity webhook (POST) + daily Vercel cron (GET, Bearer `CRON_SECRET`).
- `/scripts/health-check.ts` — API diagnostic utility.
- `/scripts/backup-env.sh` — Encrypted environment security.

### Design & Interface
- `/src/app/selection/` — Product grid & dossier views.
- `/src/app/registry/success/` — Post-acquisition confirmation.
- `/src/app/not-found.tsx` — Null_Reference error protocol.
- `tailwind.config.ts` — Brutalist aesthetic constraints.
- `postcss.config.mjs` — ESM-optimized style processing.



## 04 // ENVIRONMENT PARAMETERS
System requires a `.env.local` file (excluded from Git). Refer to `.env.example` for the template.

```env
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
PRINTFUL_API_KEY=...
LOOPS_API_KEY=...
NEXT_PUBLIC_SANITY_PROJECT_ID=...
NEXT_PUBLIC_BASE_URL=[https://www.raguiromo.store](https://www.raguiromo.store)
```

## 05 // SANITY MANIFEST TROUBLESHOOTING
If you run `npx sanity manifest extract` from the repository root, Sanity CLI can fail with:

- `Error: Failed to extract manifest`
- `No project root found`

This project stores the Sanity Studio in `/studio`, so run manifest extraction from that directory context:

```bash
npm run sanity:manifest
```

Also note: `package.json` declares `engines.node >= 20`. Running Node 24+ can trigger `npm warn EBADENGINE`.
