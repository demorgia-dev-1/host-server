#!/data/data/com.termux/files/usr/bin/bash
set -e

echo "🔧 Updating and installing base packages..."
pkg update -y && pkg upgrade -y
pkg install -y nodejs git clang make python binutils

echo "🐍 Installing Python build tools..."
pip install --upgrade pip setuptools

echo "🌿 Setting environment variables..."
export PYTHON=$(which python)
export CC=clang
export CXX=clang++

mkdir -p ~/.gyp
echo "{'variables':{'android_ndk_path':''}}" > ~/.gyp/include.gypi

echo "📦 Installing node-gyp..."
npm install -g node-gyp

echo "🧱 Cloning and building node-sqlite3..."
cd ~
rm -rf node-sqlite3
git clone https://github.com/TryGhost/node-sqlite3.git
cd node-sqlite3
npm install
node-gyp rebuild

