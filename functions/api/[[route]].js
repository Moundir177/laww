export async function onRequest(context) {
  const { request, env } = context;
  const { pathname } = new URL(request.url);
  const route = pathname.replace('/api/', '');
  
  // Add CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Content-Type': 'application/json'
  };
  
  // Handle OPTIONS request (CORS preflight)
  if (request.method === 'OPTIONS') {
    return new Response(null, { headers });
  }
  
  try {
    // Route handling
    if (route === 'pages' && request.method === 'GET') {
      return getPages(env, headers);
    } else if (route.startsWith('page/') && request.method === 'GET') {
      const pageId = route.replace('page/', '');
      return getPage(env, pageId, headers);
    } else if (route === 'page' && request.method === 'POST') {
      return createOrUpdatePage(env, request, headers);
    } else if (route === 'section' && request.method === 'POST') {
      return createOrUpdateSection(env, request, headers);
    } else if (route.startsWith('section/') && request.method === 'DELETE') {
      const [pageId, sectionId] = route.replace('section/', '').split('/');
      return deleteSection(env, pageId, sectionId, headers);
    } else if (route === 'news' && request.method === 'GET') {
      return getNews(env, headers);
    } else if (route.startsWith('news/') && request.method === 'GET') {
      const newsId = route.replace('news/', '');
      return getNewsItem(env, newsId, headers);
    } else if (route === 'news' && request.method === 'POST') {
      return createOrUpdateNews(env, request, headers);
    } else {
      return new Response(JSON.stringify({ error: 'Route not found' }), {
        status: 404,
        headers
      });
    }
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers
    });
  }
}

// Get all pages
async function getPages(env, headers) {
  const result = await env.DB.prepare('SELECT * FROM pages ORDER BY id').all();
  return new Response(JSON.stringify(result.results), { headers });
}

// Get a specific page with its sections
async function getPage(env, pageId, headers) {
  // Get page details
  const page = await env.DB.prepare('SELECT * FROM pages WHERE id = ?').bind(pageId).first();
  
  if (!page) {
    return new Response(JSON.stringify({ error: 'Page not found' }), {
      status: 404,
      headers
    });
  }
  
  // Get sections for the page
  const sections = await env.DB.prepare(
    'SELECT * FROM sections WHERE page_id = ? ORDER BY order_index'
  ).bind(pageId).all();
  
  // Format the response to match the expected structure
  const response = {
    id: page.id,
    title: {
      fr: page.title_fr,
      ar: page.title_ar
    },
    sections: sections.results.map(section => ({
      id: section.id,
      title: {
        fr: section.title_fr,
        ar: section.title_ar
      },
      content: {
        fr: section.content_fr,
        ar: section.content_ar
      },
      image: section.image,
      metadata: section.metadata ? JSON.parse(section.metadata) : null
    }))
  };
  
  return new Response(JSON.stringify(response), { headers });
}

// Create or update a page
async function createOrUpdatePage(env, request, headers) {
  const data = await request.json();
  const { id, title } = data;
  
  if (!id || !title || !title.fr || !title.ar) {
    return new Response(JSON.stringify({ error: 'Missing required fields' }), {
      status: 400,
      headers
    });
  }
  
  // Check if page exists
  const existingPage = await env.DB.prepare('SELECT id FROM pages WHERE id = ?').bind(id).first();
  
  if (existingPage) {
    // Update existing page
    await env.DB.prepare(
      'UPDATE pages SET title_fr = ?, title_ar = ?, updated_at = strftime(\'%s\', \'now\') WHERE id = ?'
    ).bind(title.fr, title.ar, id).run();
  } else {
    // Create new page
    await env.DB.prepare(
      'INSERT INTO pages (id, title_fr, title_ar) VALUES (?, ?, ?)'
    ).bind(id, title.fr, title.ar).run();
  }
  
  return new Response(JSON.stringify({ success: true, id }), { headers });
}

// Create or update a section
async function createOrUpdateSection(env, request, headers) {
  const data = await request.json();
  const { id, pageId, title, content, orderIndex, image, metadata } = data;
  
  if (!id || !pageId || !title || !title.fr || !title.ar) {
    return new Response(JSON.stringify({ error: 'Missing required fields' }), {
      status: 400,
      headers
    });
  }
  
  // Check if the page exists
  const page = await env.DB.prepare('SELECT id FROM pages WHERE id = ?').bind(pageId).first();
  
  if (!page) {
    return new Response(JSON.stringify({ error: 'Page not found' }), {
      status: 404,
      headers
    });
  }
  
  // Check if section exists
  const existingSection = await env.DB.prepare(
    'SELECT id FROM sections WHERE id = ? AND page_id = ?'
  ).bind(id, pageId).first();
  
  const metadataStr = metadata ? JSON.stringify(metadata) : null;
  
  if (existingSection) {
    // Update existing section
    await env.DB.prepare(
      `UPDATE sections SET 
        title_fr = ?, 
        title_ar = ?, 
        content_fr = ?, 
        content_ar = ?, 
        order_index = ?, 
        image = ?,
        metadata = ?,
        updated_at = strftime('%s', 'now') 
      WHERE id = ? AND page_id = ?`
    ).bind(
      title.fr, 
      title.ar, 
      content?.fr || null, 
      content?.ar || null, 
      orderIndex || 0, 
      image || null,
      metadataStr,
      id, 
      pageId
    ).run();
  } else {
    // Create new section
    await env.DB.prepare(
      `INSERT INTO sections (
        id, page_id, title_fr, title_ar, content_fr, content_ar, order_index, image, metadata
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
    ).bind(
      id, 
      pageId, 
      title.fr, 
      title.ar, 
      content?.fr || null, 
      content?.ar || null, 
      orderIndex || 0, 
      image || null,
      metadataStr
    ).run();
  }
  
  return new Response(JSON.stringify({ success: true, id, pageId }), { headers });
}

// Delete a section
async function deleteSection(env, pageId, sectionId, headers) {
  if (!pageId || !sectionId) {
    return new Response(JSON.stringify({ error: 'Missing required fields' }), {
      status: 400,
      headers
    });
  }
  
  // Delete the section
  const result = await env.DB.prepare(
    'DELETE FROM sections WHERE id = ? AND page_id = ?'
  ).bind(sectionId, pageId).run();
  
  if (result.meta.changes === 0) {
    return new Response(JSON.stringify({ error: 'Section not found' }), {
      status: 404,
      headers
    });
  }
  
  return new Response(JSON.stringify({ success: true }), { headers });
}

// Get all news
async function getNews(env, headers) {
  const result = await env.DB.prepare('SELECT * FROM news ORDER BY date DESC').all();
  
  // Format the response
  const news = result.results.map(item => ({
    id: item.id,
    title: {
      fr: item.title_fr,
      ar: item.title_ar
    },
    summary: {
      fr: item.summary_fr,
      ar: item.summary_ar
    },
    content: {
      fr: item.content_fr,
      ar: item.content_ar
    },
    slug: {
      fr: item.slug_fr,
      ar: item.slug_ar
    },
    date: item.date,
    category: item.category,
    author: item.author,
    image: item.image,
    tags: item.tags ? item.tags.split(',') : []
  }));
  
  return new Response(JSON.stringify(news), { headers });
}

// Get a specific news item
async function getNewsItem(env, newsId, headers) {
  const item = await env.DB.prepare('SELECT * FROM news WHERE id = ?').bind(newsId).first();
  
  if (!item) {
    return new Response(JSON.stringify({ error: 'News item not found' }), {
      status: 404,
      headers
    });
  }
  
  // Format the response
  const news = {
    id: item.id,
    title: {
      fr: item.title_fr,
      ar: item.title_ar
    },
    summary: {
      fr: item.summary_fr,
      ar: item.summary_ar
    },
    content: {
      fr: item.content_fr,
      ar: item.content_ar
    },
    slug: {
      fr: item.slug_fr,
      ar: item.slug_ar
    },
    date: item.date,
    category: item.category,
    author: item.author,
    image: item.image,
    tags: item.tags ? item.tags.split(',') : []
  };
  
  return new Response(JSON.stringify(news), { headers });
}

// Create or update a news item
async function createOrUpdateNews(env, request, headers) {
  const data = await request.json();
  const { id, title, summary, content, slug, date, category, author, image, tags } = data;
  
  if (!id || !title || !title.fr || !title.ar || !date) {
    return new Response(JSON.stringify({ error: 'Missing required fields' }), {
      status: 400,
      headers
    });
  }
  
  // Check if news item exists
  const existingNews = await env.DB.prepare('SELECT id FROM news WHERE id = ?').bind(id).first();
  
  const tagsStr = tags && Array.isArray(tags) ? tags.join(',') : null;
  
  if (existingNews) {
    // Update existing news
    await env.DB.prepare(
      `UPDATE news SET 
        title_fr = ?, 
        title_ar = ?, 
        summary_fr = ?, 
        summary_ar = ?, 
        content_fr = ?, 
        content_ar = ?, 
        slug_fr = ?, 
        slug_ar = ?, 
        date = ?, 
        category = ?, 
        author = ?, 
        image = ?, 
        tags = ?,
        updated_at = strftime('%s', 'now') 
      WHERE id = ?`
    ).bind(
      title.fr, 
      title.ar, 
      summary?.fr || null, 
      summary?.ar || null, 
      content?.fr || null, 
      content?.ar || null, 
      slug?.fr || null, 
      slug?.ar || null, 
      date, 
      category || null, 
      author || null, 
      image || null, 
      tagsStr,
      id
    ).run();
  } else {
    // Create new news
    await env.DB.prepare(
      `INSERT INTO news (
        id, title_fr, title_ar, summary_fr, summary_ar, content_fr, content_ar, 
        slug_fr, slug_ar, date, category, author, image, tags
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    ).bind(
      id, 
      title.fr, 
      title.ar, 
      summary?.fr || null, 
      summary?.ar || null, 
      content?.fr || null, 
      content?.ar || null, 
      slug?.fr || null, 
      slug?.ar || null, 
      date, 
      category || null, 
      author || null, 
      image || null,
      tagsStr
    ).run();
  }
  
  return new Response(JSON.stringify({ success: true, id }), { headers });
} 