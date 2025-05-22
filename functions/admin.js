// Admin API handler for Cloudflare Pages Functions
export async function onRequest(context) {
  const { request } = context;
  const url = new URL(request.url);
  const path = url.pathname;
  
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
  
  // Handle admin routes
  if (path.startsWith('/admin/news')) {
    return handleNews(request, headers);
  }
  
  // Default response for unhandled routes
  return new Response(JSON.stringify({ error: 'Not found' }), {
    status: 404,
    headers
  });
}

async function handleNews(request, headers) {
  const url = new URL(request.url);
  const method = request.method;
  
  // Get news items
  if (method === 'GET') {
    // In a real app, this would fetch from a database
    // For now, return mock data
    const newsItems = [
      {
        id: 1,
        title: { fr: 'Actualité 1', ar: 'الخبر 1' },
        excerpt: { fr: 'Extrait 1', ar: 'مقتطف 1' },
        content: { fr: 'Contenu 1', ar: 'محتوى 1' },
        image: 'https://via.placeholder.com/800x400',
        category: { fr: 'Catégorie 1', ar: 'الفئة 1' },
        date: new Date().toISOString()
      },
      {
        id: 2,
        title: { fr: 'Actualité 2', ar: 'الخبر 2' },
        excerpt: { fr: 'Extrait 2', ar: 'مقتطف 2' },
        content: { fr: 'Contenu 2', ar: 'محتوى 2' },
        image: 'https://via.placeholder.com/800x400',
        category: { fr: 'Catégorie 2', ar: 'الفئة 2' },
        date: new Date().toISOString()
      },
      {
        id: 3,
        title: { fr: 'Actualité 3', ar: 'الخبر 3' },
        excerpt: { fr: 'Extrait 3', ar: 'مقتطف 3' },
        content: { fr: 'Contenu 3', ar: 'محتوى 3' },
        image: 'https://via.placeholder.com/800x400',
        category: { fr: 'Catégorie 3', ar: 'الفئة 3' },
        date: new Date().toISOString()
      }
    ];
    
    // Get a specific news item by ID
    const idMatch = url.pathname.match(/\/admin\/news\/edit\/(\d+)/);
    if (idMatch) {
      const id = parseInt(idMatch[1]);
      const newsItem = newsItems.find(item => item.id === id);
      
      if (newsItem) {
        return new Response(JSON.stringify(newsItem), { headers });
      } else {
        return new Response(JSON.stringify({ error: 'News item not found' }), {
          status: 404,
          headers
        });
      }
    }
    
    // Return all news items
    return new Response(JSON.stringify(newsItems), { headers });
  }
  
  // Create or update news
  if (method === 'POST' || method === 'PUT') {
    try {
      const body = await request.json();
      // In a real app, this would save to a database
      
      return new Response(JSON.stringify({ success: true, data: body }), { headers });
    } catch (error) {
      return new Response(JSON.stringify({ error: 'Invalid request body' }), {
        status: 400,
        headers
      });
    }
  }
  
  // Delete news
  if (method === 'DELETE') {
    const idMatch = url.pathname.match(/\/admin\/news\/(\d+)/);
    if (idMatch) {
      const id = parseInt(idMatch[1]);
      // In a real app, this would delete from a database
      
      return new Response(JSON.stringify({ success: true, id }), { headers });
    }
    
    return new Response(JSON.stringify({ error: 'Invalid request' }), {
      status: 400,
      headers
    });
  }
  
  return new Response(JSON.stringify({ error: 'Method not allowed' }), {
    status: 405,
    headers
  });
} 