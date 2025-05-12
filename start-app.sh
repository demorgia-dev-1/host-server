#!/data/data/com.termux/files/usr/bin/bash
set -e

echo "🚀 Cloning your project repo..."
cd ~
rm -rf host-server
git clone https://github.com/demorgia-dev-1/host-server.git
cd host-server

echo "📦 Installing app dependencies..."
npm install

echo "▶️ Starting the app..."
npm start
