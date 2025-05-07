#!/bin/bash
set -e

# Install Git and Node.js if not installed
pkg update -y
pkg install -y git nodejs
# Set variables
REPO_URL="https://github.com/demorgia-dev-1/host-server.git"
PROJECT_DIR="host-server"

echo "=== Fetching project ==="

# If the project directory already exists, pull latest changes
if [ -d "$PROJECT_DIR" ]; then
  cd "$PROJECT_DIR" || exit
  echo "Project found, pulling latest changes..."
  git pull origin main
else
  # Clone the project
  echo "Cloning project..."
  git clone "$REPO_URL"
  cd "$PROJECT_DIR" || exit
fi

echo "=== Installing dependencies ==="
npm install
npx prisma generate

# Optional: if there's a build step (e.g., for TypeScript or bundling)
if [ -f "tsconfig.json" ] || grep -q "\"build\"" package.json; then
  echo "=== Building project ==="
  npm run build
fi

echo "=== Starting project ==="
npm run start
