#!/data/data/com.termux/files/usr/bin/bash

# Step 1: Update system and install dependencies
pkg update -y && pkg upgrade -y
pkg install -y nodejs git clang make python binutils

# Step 2: Install Python build tools
pip install setuptools

# Step 3: Export required environment variables
export PYTHON=$(which python)
export CC=clang
export CXX=clang++

# Step 4: Create gyp config
mkdir -p ~/.gyp
echo "{'variables':{'android_ndk_path':''}}" > ~/.gyp/include.gypi

# Step 5: Install node-gyp globally
npm install -g node-gyp

# -------------------------
# Clone and build sqlite3
# -------------------------

# Step 6: Clone node-sqlite3
cd ~
git clone https://github.com/TryGhost/node-sqlite3.git
cd node-sqlite3

# Step 7: Install and build
npm install
node-gyp rebuild