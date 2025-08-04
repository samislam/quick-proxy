#!/bin/bash
set -e

echo "[DEPLOY] Starting deployment..."

if [ -z "$REMOTE_PROJECT_DIR" ]; then
  echo "REMOTE_PROJECT_DIR is not set"
  exit 1
fi

if [ ! -d "$REMOTE_PROJECT_DIR" ]; then
  echo "Directory '$REMOTE_PROJECT_DIR' does not exist"
  exit 1
fi

cd "$REMOTE_PROJECT_DIR"


echo "[DEPLOY] Resetting local Git state..."
git reset --hard
git clean -fdn

echo "[DEPLOY] Pulling latest code..."
git pull origin main

echo "[DEPLOY] Installing dependencies..."
pnpm install

echo "[DEPLOY] Building apps..."
pnpm run build

echo "[DEPLOY] Reloading PM2 app..."
pm2 reload ecosystem.config.js --update-env

echo "[DEPLOY] Done ✅"
