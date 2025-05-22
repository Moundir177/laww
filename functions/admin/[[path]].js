// Catch-all handler for admin routes
export async function onRequest(context) {
  const { request, env, params } = context;
  const url = new URL(request.url);
  
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

  // Mock news data for demonstration
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
  
  // Check if this is a request for a specific news item
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
  
  // Handle news list requests
  if (url.pathname.match(/\/admin\/news\/?$/)) {
    return new Response(JSON.stringify(newsItems), { headers });
  }
  
  // Handle news update requests
  if (request.method === 'PUT' && url.pathname.match(/\/admin\/news\/\d+/)) {
    try {
      const body = await request.json();
      return new Response(JSON.stringify({ success: true, data: body }), { headers });
    } catch (error) {
      return new Response(JSON.stringify({ error: 'Invalid request body' }), {
        status: 400,
        headers
      });
    }
  }
  
  // Default admin API response
  return new Response(JSON.stringify({ 
    success: true, 
    message: "Admin API is working",
    path: url.pathname,
    params: params?.path || []
  }), { headers });
} 