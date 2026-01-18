# ⬛ RGRMstore | Identity Registry Module 002

![Build Status](https://github.com/RGRMstudio/rgrm-store-page/actions/workflows/health-check.yml/badge.svg)
![Security](https://img.shields.io/badge/Security-Dependabot_Active-blue)
![Registry](https://img.shields.io/badge/Registry-Loops.so_Integrated-black)

**RGRMstore** is a high-performance, autonomous e-commerce engine designed for the distribution of physical identity modules and digital registry authentication.

---

## 🏗️ Architecture Stack
- **Frontend:** Next.js 15+ (React 19)
- **Payments:** Stripe (Production Node)
- **Fulfillment:** Printful (Store 002: 17181557)
- **Communication:** Loops.so (Identity Registered Event)
- **Infrastructure:** Vercel + GitHub Actions

---

## 🛠️ Operational Commands
For use within the iPad Codespace environment:

### **Maintenance & Health**
- `npx ts-node scripts/health-check.ts` — Verifies all API connections.
- `scripts/backup-env.sh` — Backs up production environment variables.

### **Deployment**
- `git push -o "secret-scanning=bypass" origin main` — Standard production sync.

---

## 🔐 Security & Ownership
This repository is protected by **CODEOWNERS**. Any changes to the `/src/app/api/webhook` or `.github` directories require explicit approval from **@RGRMstudio**.

---

## 📡 Webhook Endpoints
- **Stripe:** `/api/webhook` (Triggers Printful & Loops)
- **Loops:** `/api/webhooks/loops` (Handles email feedback & bounces)

---
© 2026 RGRMstudio. All Rights Reserved.
