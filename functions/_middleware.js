// This middleware redirects admin requests to the appropriate handler
export async function onRequest(context) {
  const { request, env, next } = context;
  const url = new URL(request.url);
  
  // If this is an admin request, handle it specially
  if (url.pathname.startsWith('/admin')) {
    // For admin API requests
    if (url.pathname.includes('/api/')) {
      // You can add authentication checks here if needed
      return handleAdminAPI(context);
    }
    
    // For admin UI requests, just serve the index.html
    // This allows client-side routing to handle it
    return next();
  }
  
  // For all other requests, continue to the next handler
  return next();
}

async function handleAdminAPI(context) {
  const { request } = context;
  
  // Add CORS headers
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
  
  // Return a simple success response for now
  return new Response(JSON.stringify({ 
    success: true, 
    message: "Admin API is working" 
  }), { headers });
} 