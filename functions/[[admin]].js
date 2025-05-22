// This is a catch-all function for all admin routes
// It will make sure dynamic admin routes work with Cloudflare Pages
export async function onRequest(context) {
  const { request, env, params } = context;
  const url = new URL(request.url);
  
  // Check if this is an API request or a page request
  if (url.pathname.includes('/api/')) {
    // Handle API requests
    return apiHandler(request, env, params);
  } else {
    // For page requests, continue to the static assets
    return context.next();
  }
}

async function apiHandler(request, env, params) {
  const headers = new Headers({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Content-Type': 'application/json'
  });
  
  // Handle CORS preflight
  if (request.method === 'OPTIONS') {
    return new Response(null, { headers });
  }
  
  // Mock authentication - in a real app, implement proper auth
  const isAuthenticated = true;
  
  if (!isAuthenticated) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers
    });
  }
  
  // Handle API endpoints
  try {
    // In a real app, implement your API logic here
    return new Response(JSON.stringify({ success: true }), { headers });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers
    });
  }
} 