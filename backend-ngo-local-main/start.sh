#!/bin/bash
# RG Care Backend – Server Setup Script
# Run from the backend directory: bash start.sh

set -e

BACKEND_DIR="$(cd "$(dirname "$0")" && pwd)"
echo "Backend directory: $BACKEND_DIR"

# Install dependencies
echo "Installing dependencies..."
npm install --production

# Start/restart with PM2
if pm2 list | grep -q "rgcare-backend"; then
  echo "Restarting existing PM2 process..."
  pm2 restart rgcare-backend
else
  echo "Starting new PM2 process..."
  pm2 start app.js --name rgcare-backend
fi

pm2 save
pm2 update

echo ""
echo "✓ Backend started. Testing on port 5000..."
sleep 2
curl -s http://localhost:5000/ || echo "Warning: backend not responding on port 5000"
echo ""
echo "Run 'pm2 logs rgcare-backend' to see logs"
