// A script to deploy directly to Cloudflare Pages using their Direct Upload API
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const https = require('https');

// Configuration
const projectName = 'laww-site';
const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
const apiToken = process.env.CLOUDFLARE_API_TOKEN;
const directory = './out';

// First make sure the project is built
console.log('Building the project...');
exec('npm run build', (error, stdout, stderr) => {
  if (error) {
    console.error(`Build error: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`Build stderr: ${stderr}`);
  }
  console.log(`Build stdout: ${stdout}`);
  
  console.log('Build completed, starting deployment...');
  
  // Now try to create the project if it doesn't exist
  createProjectIfNeeded()
    .then(() => {
      console.log('Project exists or was created, uploading files...');
      // Use wrangler for the actual deploy since it handles file uploads well
      const command = `npx wrangler pages deploy ${directory} --project-name ${projectName} --branch main --commit-dirty=true`;
      
      exec(command, (error, stdout, stderr) => {
        if (error) {
          console.error(`Deployment error: ${error.message}`);
          return;
        }
        if (stderr) {
          console.error(`Deployment stderr: ${stderr}`);
        }
        console.log(`Deployment stdout: ${stdout}`);
        console.log('Deployment completed successfully!');
      });
    })
    .catch(err => {
      console.error('Deployment failed:', err);
    });
});

// Function to create the project if it doesn't exist
function createProjectIfNeeded() {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.cloudflare.com',
      path: `/client/v4/accounts/${accountId}/pages/projects`,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${apiToken}`,
        'Content-Type': 'application/json'
      }
    };

    const req = https.request(options, res => {
      let data = '';
      
      res.on('data', chunk => {
        data += chunk;
      });
      
      res.on('end', () => {
        const response = JSON.parse(data);
        
        if (!response.success) {
          reject(`API Error: ${JSON.stringify(response.errors)}`);
          return;
        }
        
        // Check if the project exists
        const projectExists = response.result.some(project => project.name === projectName);
        
        if (projectExists) {
          console.log(`Project "${projectName}" already exists.`);
          resolve();
        } else {
          // Create the project
          createProject()
            .then(resolve)
            .catch(reject);
        }
      });
    });
    
    req.on('error', error => {
      reject(`Request error: ${error.message}`);
    });
    
    req.end();
  });
}

// Function to create a new Pages project
function createProject() {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({
      name: projectName,
      production_branch: 'main'
    });
    
    const options = {
      hostname: 'api.cloudflare.com',
      path: `/client/v4/accounts/${accountId}/pages/projects`,
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiToken}`,
        'Content-Type': 'application/json',
        'Content-Length': data.length
      }
    };
    
    const req = https.request(options, res => {
      let responseData = '';
      
      res.on('data', chunk => {
        responseData += chunk;
      });
      
      res.on('end', () => {
        const response = JSON.parse(responseData);
        
        if (response.success) {
          console.log(`Project "${projectName}" created successfully.`);
          resolve();
        } else {
          reject(`Failed to create project: ${JSON.stringify(response.errors)}`);
        }
      });
    });
    
    req.on('error', error => {
      reject(`Request error: ${error.message}`);
    });
    
    req.write(data);
    req.end();
  });
} 