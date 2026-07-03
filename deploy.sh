#!/bin/bash
# ─────────────────────────────────────────────────────────────────────────────
# RG Care Foundation — Local → VPS Deployment Script (run from your laptop)
# Deploys BOTH frontend (public/) and backend to the VPS over SSH.
#
# Prerequisites (local machine):
#   • Git Bash / WSL / any bash shell with ssh + rsync available
#   • SSH key already added to the VPS  (or set VPS_PASS below for sshpass)
#
# Usage:
#   bash deploy.sh              # deploy everything
#   bash deploy.sh frontend     # deploy frontend only
#   bash deploy.sh backend      # deploy backend only
# ─────────────────────────────────────────────────────────────────────────────

set -e

# ── Configure these ──────────────────────────────────────────────────────────
VPS_USER="root"
VPS_HOST="srv771623"          # replace with IP or hostname e.g. 123.45.67.89
VPS_BASE="/root/rgcare"
SSH_KEY=""                    # path to private key e.g. ~/.ssh/id_rsa (leave empty to use default)
# ─────────────────────────────────────────────────────────────────────────────

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
FRONTEND_SRC="$SCRIPT_DIR/ngo-new-main/public/"
BACKEND_SRC="$SCRIPT_DIR/backend-ngo-local-main/"

SSH_OPTS="-o StrictHostKeyChecking=no"
[ -n "$SSH_KEY" ] && SSH_OPTS="$SSH_OPTS -i $SSH_KEY"

DEPLOY_MODE="${1:-all}"   # all | frontend | backend

echo ""
echo "╔══════════════════════════════════════════════════╗"
echo "║     RG Care Foundation — Deploy to VPS           ║"
echo "╠══════════════════════════════════════════════════╣"
echo "║  Target : $VPS_USER@$VPS_HOST:$VPS_BASE"
echo "║  Mode   : $DEPLOY_MODE"
echo "╚══════════════════════════════════════════════════╝"
echo ""

# ── Helper ───────────────────────────────────────────────────────────────────
ssh_run() {
  ssh $SSH_OPTS "$VPS_USER@$VPS_HOST" "$@"
}

# ── 1. Deploy Frontend ───────────────────────────────────────────────────────
deploy_frontend() {
  echo "==> [Frontend] Syncing public/ to $VPS_BASE/ngo-new-main/public/ ..."
  rsync -az --delete \
    -e "ssh $SSH_OPTS" \
    --exclude=".DS_Store" \
    --exclude="*.map" \
    "$FRONTEND_SRC" \
    "$VPS_USER@$VPS_HOST:$VPS_BASE/ngo-new-main/public/"

  echo "==> [Frontend] Reloading nginx..."
  ssh_run "nginx -t && systemctl reload nginx"
  echo "==> [Frontend] Done ✓"
}

# ── 2. Deploy Backend ────────────────────────────────────────────────────────
deploy_backend() {
  echo "==> [Backend] Syncing backend files to $VPS_BASE/backend-ngo-local-main/ ..."
  rsync -az \
    -e "ssh $SSH_OPTS" \
    --exclude="node_modules/" \
    --exclude=".env" \
    --exclude="logs/" \
    --exclude="uploads/" \
    --exclude=".DS_Store" \
    "$BACKEND_SRC" \
    "$VPS_USER@$VPS_HOST:$VPS_BASE/backend-ngo-local-main/"

  echo "==> [Backend] Running start.sh on VPS..."
  ssh_run "cd $VPS_BASE/backend-ngo-local-main && bash start.sh"
  echo "==> [Backend] Done ✓"
}

# ── 3. Run selected mode ─────────────────────────────────────────────────────
case "$DEPLOY_MODE" in
  frontend)
    deploy_frontend
    ;;
  backend)
    deploy_backend
    ;;
  all)
    deploy_backend
    deploy_frontend
    ;;
  *)
    echo "ERROR: Unknown mode '$DEPLOY_MODE'. Use: all | frontend | backend"
    exit 1
    ;;
esac

# ── 4. Final smoke test ──────────────────────────────────────────────────────
echo ""
echo "==> Smoke testing live site..."
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" https://rgcare.in/ 2>/dev/null || echo "000")
API_CODE=$(curl -s -o /dev/null -w "%{http_code}" https://rgcare.in/api/health 2>/dev/null || echo "000")

echo "   Site  https://rgcare.in/         → HTTP $HTTP_CODE"
echo "   API   https://rgcare.in/api/health → HTTP $API_CODE"

if [ "$HTTP_CODE" = "200" ] && [ "$API_CODE" = "200" ]; then
  echo ""
  echo "✓ Deployment successful — site and API are live."
else
  echo ""
  echo "⚠ One or more checks returned unexpected status. Verify manually."
fi
echo ""
