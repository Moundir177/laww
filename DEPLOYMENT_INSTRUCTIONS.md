# Deployment Instructions for Cloudflare Pages

This document provides instructions for deploying the website to Cloudflare Pages as a new project.

## Prerequisites

1. A Cloudflare account
2. API Token with Pages permissions

## Getting a Cloudflare API Token

1. Log in to the Cloudflare dashboard
2. Go to "My Profile" > "API Tokens"
3. Click "Create Token"
4. Choose "Create Custom Token"
5. Set a name for your token (e.g., "Pages Deployment")
6. Under "Permissions", add the following:
   - Account > Cloudflare Pages > Edit
   - Account > Account Settings > Read
7. Under "Account Resources", select your account
8. Click "Continue to Summary" and then "Create Token"
9. Copy your API token and keep it secure

## Deployment Options

### Option 1: Using the Deployment Script

1. Set your Cloudflare credentials as environment variables:

```bash
export CLOUDFLARE_ACCOUNT_ID=your_account_id
export CLOUDFLARE_API_TOKEN=your_api_token
```

2. Run the deployment script:

```bash
./deploy-to-cloudflare.sh
```

### Option 2: Using Wrangler CLI Directly

1. Build the project:

```bash
npm run build
```

2. Deploy with Wrangler:

```bash
npx wrangler pages deploy out --project-name laww-site --branch main
```

### Option 3: Using the Node.js Script

1. Set your Cloudflare credentials as environment variables:

```bash
export CLOUDFLARE_ACCOUNT_ID=your_account_id
export CLOUDFLARE_API_TOKEN=your_api_token
```

2. Run the Node.js script:

```bash
node cloudflare-direct-deploy.js
```

## GitHub Actions Deployment

If you want to set up automatic deployments via GitHub Actions:

1. Add your Cloudflare credentials as secrets in your GitHub repository:
   - `CLOUDFLARE_ACCOUNT_ID`
   - `CLOUDFLARE_API_TOKEN`

2. The GitHub Actions workflow is already set up in `.github/workflows/deploy.yml`

## After Deployment

After successful deployment, your site will be available at:
`https://laww-site.pages.dev`

You can set up a custom domain in the Cloudflare Pages dashboard if needed. 