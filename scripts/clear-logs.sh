#!/bin/bash
# RGRM // LOG_PURGE_PROTOCOL

echo "--- INITIALIZING LOG PURGE ---"

# Clear local Next.js build cache
rm -rf .next

# Clear temporary diagnostic logs
find . -name "*.log" -type f -delete

echo "--- SYSTEM_CLEAN: READY FOR NEW DEPLOYMENT ---"
