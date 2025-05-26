#!/data/data/com.termux/files/usr/bin/bash

set -e

echo "Cloning your project..."
cd ~
rm -rf host-server
git clone https://github.com/demorgia-dev-1/host-server.git
cd host-server
rm -rf .git
rm -rf .github
rm -rf .gitignore
rm -rf uploads
rm -rf dev.db
rm  -rf public
echo "Installing app dependencies..."
npm install

echo "Starting the app..."
npm start
