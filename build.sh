#!/bin/bash
docker run -it --rm -v $PWD:/app -w /app node:18 /usr/local/bin/npm install
docker run -it --rm -v $PWD:/app -w /app node:18 /usr/local/bin/npm run build
