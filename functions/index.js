// Simple health check function
export async function onRequest(context) {
  const headers = new Headers({
    'Content-Type': 'application/json'
  });
  
  return new Response(JSON.stringify({
    status: 'ok',
    message: 'Cloudflare Pages Functions are working',
    timestamp: new Date().toISOString()
  }), { headers });
} 