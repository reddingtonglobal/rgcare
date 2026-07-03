#!/bin/bash
# ─────────────────────────────────────────────────────────────────────────────
# RG Care Foundation — VPS Deployment Script
# Run this ON the VPS: bash ~/deploy_rgcare.sh
#
# What it does:
#   1. git pull latest code from GitHub
#   2. Install/update backend npm dependencies
#   3. Start/restart backend via ecosystem.config.js (PM2, port 5000)
#   4. Apply nginx config (first run only) and reload nginx
#   5. Smoke test — verifies site + API are responding
# ─────────────────────────────────────────────────────────────────────────────

set -e

RGCARE_DIR="/root/rgcare"
BACKEND_DIR="$RGCARE_DIR/backend-ngo-local-main"

# ── Self-update: keep ~/deploy_rgcare.sh in sync with the repo copy ───────────
SELF_IN_REPO="$RGCARE_DIR/deploy_rgcare.sh"
SELF_IN_HOME="$HOME/deploy_rgcare.sh"
if [ -f "$SELF_IN_REPO" ] && ! diff -q "$SELF_IN_REPO" "$SELF_IN_HOME" > /dev/null 2>&1; then
  echo "==> Updating ~/deploy_rgcare.sh from repo..."
  cp "$SELF_IN_REPO" "$SELF_IN_HOME"
  chmod +x "$SELF_IN_HOME"
  echo "    Done. Re-running updated script..."
  exec "$SELF_IN_HOME" "$@"
fi
FRONTEND_SRC="$RGCARE_DIR/ngo-new-main/public"
FRONTEND_DEST="/var/www/rgcare/public"
NGINX_CONF_SRC="$BACKEND_DIR/nginx-rgcare.conf"
NGINX_CONF_DEST="/etc/nginx/sites-available/rgcare.in"
NGINX_CONF_LINK="/etc/nginx/sites-enabled/rgcare.in"

echo ""
echo "╔══════════════════════════════════════════════════╗"
echo "║     RG Care Foundation — VPS Deploy              ║"
echo "╚══════════════════════════════════════════════════╝"
echo ""

# ── 1. Pull latest code ───────────────────────────────────────────────────────
echo "==> [1/5] Pulling latest code from GitHub..."
cd "$RGCARE_DIR"
git pull origin main
echo ""

# ── 2. Backend: install deps ──────────────────────────────────────────────────
echo "==> [2/5] Installing backend dependencies..."
cd "$BACKEND_DIR"
mkdir -p logs
npm install --omit=dev --no-audit --no-fund
echo ""

# ── 3. Backend: start/restart via ecosystem.config.js ────────────────────────
echo "==> [3/5] Starting/restarting backend (PM2, port 5000)..."

# Clean up the old incorrectly-named process if it exists
if pm2 list | grep -q "rg-backend"; then
  echo "    Removing stale 'rg-backend' process..."
  pm2 delete rg-backend
fi

# Start or restart using ecosystem config (name = rgcare-backend)
if pm2 list | grep -q "rgcare-backend"; then
  echo "    Restarting existing 'rgcare-backend' process..."
  pm2 restart ecosystem.config.js --update-env
else
  echo "    Starting new 'rgcare-backend' process..."
  pm2 start ecosystem.config.js
fi

pm2 save
echo ""

# ── 4. Nginx: sync frontend files + apply config + reload ───────────────────
echo "==> [4/5] Deploying frontend and reloading nginx..."

# Sync public/ files to web root (accessible by www-data)
mkdir -p "$FRONTEND_DEST"
rsync -a --delete \
  --exclude=".DS_Store" \
  --exclude="*.map" \
  "$FRONTEND_SRC/" "$FRONTEND_DEST/"

# Install our nginx config on first deploy (or if it changed)
if [ ! -L "$NGINX_CONF_LINK" ] || ! diff -q "$NGINX_CONF_SRC" "$NGINX_CONF_DEST" > /dev/null 2>&1; then
  echo "    Updating nginx site config..."
  cp "$NGINX_CONF_SRC" "$NGINX_CONF_DEST"
  ln -sf "$NGINX_CONF_DEST" "$NGINX_CONF_LINK"
  # Disable default site to avoid conflicts
  rm -f /etc/nginx/sites-enabled/default
fi

nginx -t && systemctl reload nginx
echo "    Nginx reloaded — serving frontend from: $FRONTEND_DEST"
echo ""

# ── 5. Smoke test ─────────────────────────────────────────────────────────────
echo "==> [5/5] Smoke testing..."
sleep 2

API_CODE=$(curl -s -o /dev/null -w "%{http_code}" http://127.0.0.1:5000/api/health 2>/dev/null || echo "000")
SITE_CODE=$(curl -s -o /dev/null -w "%{http_code}" https://rgcare.in/ 2>/dev/null || echo "000")

echo "    Backend  http://127.0.0.1:5000/api/health  → HTTP $API_CODE"
echo "    Site     https://rgcare.in/                → HTTP $SITE_CODE"

if [ "$API_CODE" = "200" ]; then
  echo "    ✓ Backend is healthy"
else
  echo "    ✗ Backend not responding — run: pm2 logs rgcare-backend"
fi

if [ "$SITE_CODE" = "200" ]; then
  echo "    ✓ Site is live"
else
  echo "    ✗ Site not responding — run: nginx -t"
fi

echo ""
echo "╔══════════════════════════════════════════════════╗"
echo "║  Deployment complete.                            ║"
echo "║  pm2 status            — process list           ║"
echo "║  pm2 logs rgcare-backend — live logs            ║"
echo "╚══════════════════════════════════════════════════╝"
echo ""
