#!/bin/bash
# RG Care Backend – Deployment Script
# Usage: bash start.sh
# Run from the backend directory on the VPS.

set -e

BACKEND_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$BACKEND_DIR"
echo "==> Backend directory: $BACKEND_DIR"

# ── 1. Check .env exists ────────────────────────────────────────────────────
if [ ! -f .env ]; then
  echo "ERROR: .env file not found. Create it before deploying."
  echo "Required keys: MONGODB_URI, RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET,"
  echo "               SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASS,"
  echo "               EMAIL_TO, PORT, NODE_ENV, APP_URL, JWT_SECRET"
  exit 1
fi
echo "==> .env found"

# ── 2. Create logs directory (required by ecosystem.config.js) ─────────────
mkdir -p logs
mkdir -p uploads
echo "==> logs/ directory ready"

# ── 3. Install production dependencies ──────────────────────────────────────
echo "==> Installing dependencies..."
npm install --omit=dev

# ── 4. Start or restart via ecosystem config ────────────────────────────────
if pm2 list | grep -q "rgcare-backend"; then
  echo "==> Restarting existing PM2 process..."
  pm2 restart ecosystem.config.js --update-env
else
  echo "==> Starting new PM2 process..."
  pm2 start ecosystem.config.js
fi

pm2 save

# ── 5. Smoke test ────────────────────────────────────────────────────────────
echo ""
echo "==> Waiting for backend to come up..."
sleep 3
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:5000/api/health 2>/dev/null || echo "000")
if [ "$HTTP_CODE" = "000" ]; then
  echo "WARNING: Could not reach http://localhost:5000 — check 'pm2 logs rgcare-backend'"
else
  echo "✓ Backend responding (HTTP $HTTP_CODE)"
fi

echo ""
echo "Done. Useful commands:"
echo "  pm2 status                   – process list"
echo "  pm2 logs rgcare-backend      – tail logs"
echo "  pm2 restart rgcare-backend   – restart"
echo "  pm2 stop rgcare-backend      – stop"
