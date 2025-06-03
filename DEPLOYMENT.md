# Deploying to Cloudflare Pages

This document provides simplified instructions for deploying the website to Cloudflare Pages.

## Prerequisites

1. A Cloudflare account
2. API Token with Pages permissions

## Quick Deployment Methods

### Option 1: GitHub Actions (Recommended)

1. Push your code to GitHub repository
2. Add the following secrets to your GitHub repository:
   - `CLOUDFLARE_ACCOUNT_ID`: Your Cloudflare account ID
   - `CLOUDFLARE_API_TOKEN`: Your Cloudflare API token with Pages permissions
3. The GitHub workflow will automatically build and deploy your site

### Option 2: Manual Command Line Deployment

1. Build the project:
```bash
npm run build
```

2. Deploy with Wrangler CLI:
```bash
# Install Wrangler if not already installed
npm install -g wrangler

# Deploy (replace with your tokens)
CLOUDFLARE_ACCOUNT_ID=your_account_id CLOUDFLARE_API_TOKEN=your_api_token npx wrangler pages deploy out --project-name=laww-site
```

## Troubleshooting

If you encounter connectivity issues:

1. Try using the Cloudflare dashboard for direct uploads
2. Check your API token permissions (should have Pages Edit access)
3. Try using GitHub Actions deployment instead of manual deployment

## After Deployment

After successful deployment, your site will be available at:
`https://laww-site.pages.dev` 