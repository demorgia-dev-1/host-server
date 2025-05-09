#!/data/data/com.termux/files/usr/bin/bash

set -e

# -----------------------------
# STEP 1: Update & install tools
# -----------------------------
echo "Updating and installing base packages..."
pkg update -y && pkg upgrade -y
pkg install -y nodejs git clang make python binutils

# -----------------------------
# STEP 2: Python build tools
# -----------------------------
echo "Installing setuptools for Python..."
pip install --upgrade pip setuptools

# -----------------------------
# STEP 3: Set environment vars
# -----------------------------
echo "Setting up environment variables..."
export PYTHON=$(which python)
export CC=clang
export CXX=clang++

mkdir -p ~/.gyp
echo "{'variables':{'android_ndk_path':''}}" > ~/.gyp/include.gypi

# -----------------------------
# STEP 4: Install node-gyp
# -----------------------------
echo "Installing node-gyp..."
npm install -g node-gyp

# -----------------------------
# STEP 5: Build node-sqlite3
# -----------------------------
echo "Cloning and building node-sqlite3..."
cd ~
rm -rf node-sqlite3
git clone https://github.com/TryGhost/node-sqlite3.git
cd node-sqlite3
npm install
node-gyp rebuild

# -----------------------------
# STEP 6: Clone and start app
# -----------------------------
echo "Cloning your project..."
cd ~
rm -rf host-server
git clone https://github.com/demorgia-dev-1/host-server.git
cd host-server

echo "Installing app dependencies..."
npm install

echo "Starting the app..."
npm start
