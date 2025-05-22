// Function to handle a specific news item
export async function onRequest(context) {
  const { request, params } = context;
  const id = params.id;
  
  // Add CORS headers
  const headers = new Headers({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Content-Type': 'application/json'
  });
  
  // Handle OPTIONS request for CORS preflight
  if (request.method === 'OPTIONS') {
    return new Response(null, { headers });
  }
  
  // Create mock data for the requested ID
  const newsItem = {
    id: parseInt(id),
    title: { fr: `Actualité ${id}`, ar: `الخبر ${id}` },
    excerpt: { fr: `Extrait ${id}`, ar: `مقتطف ${id}` },
    content: { fr: `Contenu ${id}`, ar: `محتوى ${id}` },
    image: 'https://via.placeholder.com/800x400',
    category: { fr: 'Catégorie', ar: 'الفئة' },
    date: new Date().toISOString()
  };
  
  return new Response(JSON.stringify(newsItem), { headers });
} 