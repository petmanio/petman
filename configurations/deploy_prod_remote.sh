#!/usr/bin/env bash
set -e
cd ../
rm -rf ./dist/
npm run build:universal
cp ./configurations/package.json ./dist

rsync -a --delete --progress dist/ andranik@petman.io:/home/andranik/Project/petman/dist
