#!/bin/bash

# Script to deploy to Cloudflare Pages

# Build the project
echo "Building the project..."
npm run build

# Deploy to Cloudflare Pages
echo "Deploying to Cloudflare Pages..."
npx wrangler pages deploy out \
  --project-name laww-site \
  --branch main \
  --commit-dirty=true \
  --skip-caching

echo "Deployment complete!" 