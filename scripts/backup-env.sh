#!/bin/bash

# RGRMstore - Environment Backup Utility
# Uses Vercel CLI to export production keys

echo "--- 🛠️ RGRMstore: Starting Environment Backup ---"

# 1. Pull the latest production variables from Vercel
# This creates/updates .env.production.local
vercel env pull .env.production.local --environment production

# 2. Verify success
if [ -f .env.production.local ]; then
    echo "✅ SUCCESS: Environment variables backed up to .env.production.local"
    echo "⚠️  REMOTE: Ensure this file is in your .gitignore to prevent leaks."
else
    echo "❌ ERROR: Failed to pull environment variables."
fi

echo "--- 🛠️ Backup Complete ---"
