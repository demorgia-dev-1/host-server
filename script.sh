#!/data/data/com.termux/files/usr/bin/bash

# Update and install required packages
pkg update -y && pkg upgrade -y
pkg install -y nodejs git clang make python binutils

# Install Python build tools
pip install setuptools

# Export required environment variables
export PYTHON=$(which python)
export CC=clang
export CXX=clang++

# Set up gyp include config
mkdir -p ~/.gyp
echo "{'variables':{'android_ndk_path':''}}" > ~/.gyp/include.gypi

# Install node-gyp globally
npm install -g node-gyp

# Run the rebuild step
node-gyp rebuild