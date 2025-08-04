#!/bin/bash
set -e

# Run SSH setup in the current shell (so ssh-agent stays alive)
source bin/setup-ssh.sh

PROXY_ENV_PATH="$REMOTE_PROJECT_DIR/.env.production"

echo "[DEPLOY] Uploading environment files..."

# Upload environment contents directly
ssh "$REMOTE_USER@$REMOTE_HOST" "mkdir -p '$(dirname "$PROXY_ENV_PATH")' && cat > '$PROXY_ENV_PATH'" < "$PROXY_ENV_FILE"

echo "[DEPLOY] .env files uploaded successfully."

echo "[CI] Running remote deployment script..."
ssh "$REMOTE_USER@$REMOTE_HOST" \
  "REMOTE_PROJECT_DIR='$REMOTE_PROJECT_DIR' \
   bash -s" < bin/update.sh


