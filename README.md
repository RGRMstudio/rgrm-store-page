# ⬛ RGRM // IDENTITY REGISTRY MODULE 002
## PROJECT: STRUCTURAL STUDIES INTERFACE (v1.0.4)

![Build Status](https://github.com/RGRMstudio/rgrm-store-page/actions/workflows/health-check.yml/badge.svg)
![Security](https://img.shields.io/badge/Security-Dependabot_Active-blue)
![Registry](https://img.shields.io/badge/Registry-Loops.so_Integrated-black)

**RGRMstore** is a high-performance, autonomous e-commerce engine designed for the distribution of physical identity modules and digital registry authentication. Every garment is an acquisition of structural integrity.

---

## 🏗️ Architecture Stack



- **Frontend:** Next.js 15+ (App Router / React 19)
- **CMS:** Sanity.io (Content Lake & Study Blueprints)
- **Payments:** Stripe (Production Node)
- **Fulfillment:** Printful (Store 002: 17181557)
- **CRM:** Loops.so (Identity Registered Event)
- **State:** React Context API (Manifest Persistence)
- **Motion:** Framer Motion (Mechanical Kinetics)

---

## 📡 Protocol Endpoints & Integration

The system operates through a series of secure handshakes:
- **Stripe:** `/api/webhook` — Triggers Printful manufacturing & Loops event injection.
- **Loops:** `/api/webhooks/loops` — Handles lifecycle feedback & clearance updates.
- **Sanity:** Establishing connection via `src/lib/sanity.ts` for real-time inventory updates.

---

## 🛠️ Operational Commands

For use within the iPad Codespace or Terminal environment:

### **Initialization & Maintenance**
- `npm install` — Initialize local dependencies.
- `npm run dev` — Boot system in local observation mode.
- `npx ts-node scripts/health-check.ts` — Verifies all API connections (Sanity, Stripe, Printful).
- `scripts/backup-env.sh` — Encrypts and backs up production environment variables.

### **Production Deployment**
- `git push origin main` — Standard production sync via Vercel.
- `git push -o "secret-scanning=bypass" origin main` — Elevated sync (bypass scanning).

---

## 🔐 Security & Structural Integrity

This repository is protected by **CODEOWNERS**. 
- **Critical Sectors:** Changes to `/src/app/api/webhook` or `.github` require explicit approval from **@RGRMstudio**.
- **Data Integrity:** Strict TypeScript enforcement (see `tsconfig.json`) ensures no loose variables compromise the codebase.
- **Styling:** Brutalist UI constraints maintained through `tailwind.config.ts`.

---

## 🧭 Directory Map

```text
src/
├── app/              # Routing: Manifesto, Selection, Registry, 404
├── components/       # UI: Skeletons, ProductCards, MotionGrid, Cart
├── context/          # Global State: Cart Management
├── lib/              # Protocols: Sanity Client, Stripe Init, Constants
└── schemas/          # Blueprints: Sanity Document Definitions
