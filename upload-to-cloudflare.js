// Simple helper script for manual upload to Cloudflare Pages
const fs = require('fs');
const path = require('path');

const zipFilePath = path.join(__dirname, 'laww-site-deployment.zip');
const zipFileExists = fs.existsSync(zipFilePath);

console.log(`
====================================================
CLOUDFLARE PAGES DEPLOYMENT INSTRUCTIONS
====================================================

We've prepared your site for deployment to Cloudflare Pages.
Due to connection issues, you'll need to complete the upload manually.

1. Your ZIP file (${zipFilePath}) is ${zipFileExists ? 'READY' : 'NOT FOUND'}
   ${zipFileExists ? '✅ Size: ' + (fs.statSync(zipFilePath).size / 1024 / 1024).toFixed(2) + ' MB' : '❌ Please run the build process again'}

2. Go to: https://dash.cloudflare.com/
   • Sign in to your Cloudflare account
   • Go to Workers & Pages
   • Click "Create application"
   • Select "Pages" and "Upload assets"
   • Name your project "laww-site"
   • Drag and drop the ZIP file (${path.basename(zipFilePath)})
   • Click "Deploy site"

After deployment, your site will be available at:
https://laww-site.pages.dev

====================================================
`);

// Open browser to Cloudflare dashboard
const openBrowser = process.platform === 'darwin' ? 'open' : process.platform === 'win32' ? 'start' : 'xdg-open';
const { exec } = require('child_process');
exec(`${openBrowser} https://dash.cloudflare.com/`); 