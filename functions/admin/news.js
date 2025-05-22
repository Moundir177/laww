// Function to handle news items list
export async function onRequest(context) {
  const { request } = context;
  
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
  
  // Create mock data for news items
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
  
  return new Response(JSON.stringify(newsItems), { headers });
} 