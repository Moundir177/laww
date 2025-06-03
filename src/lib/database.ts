// This is a simple client-side data handling utility
// In a production environment, you'd use a real database with server-side API endpoints

// Type definitions for multilingual content
export interface Multilingual {
  fr: string;
  ar: string;
}

// Types for page content
export interface PageSection {
  id: string;
  title: Multilingual;
  content: Multilingual;
  image?: string;
  metadata?: {
    updateLabel?: Multilingual;
    [key: string]: any;
  };
}

export interface PageContent {
  id: string;
  title: Multilingual;
  sections: PageSection[];
}

// Types for global content
export interface GlobalContent {
  id: string;
  category: string;
  key: string;
  text: Multilingual;
  image?: string;
}

// Types for news items
export interface NewsItem {
  id: string;
  title: Multilingual;
  summary: Multilingual;
  content: Multilingual;
  slug: Multilingual;
  date: string;
  category: string;
  author?: string;
  image?: string;
  tags?: string[];
}

// Types for resource items
export interface ResourceItem {
  id: string;
  title: Multilingual;
  summary: Multilingual;
  content: Multilingual;
  slug: Multilingual;
  date: string;
  category: string;
  fileUrl?: string;
  image?: string;
  tags?: string[];
}

// API URL
const API_BASE_URL = typeof window !== 'undefined' 
  ? `${window.location.protocol}//${window.location.host}/api`
  : 'https://droitfpra-new.pages.dev/api';

// Static fallback content for development
const staticFallbackContent: Record<string, PageContent> = {
  home: {
    id: 'home',
    title: { 
      fr: 'Page d\'accueil', 
      ar: 'الصفحة الرئيسية' 
    },
    sections: [
      {
        id: 'hero',
        title: { 
          fr: 'Bannière principale', 
          ar: 'البانر الرئيسي' 
        },
        content: { 
          fr: 'Fondation pour la Promotion des Droits', 
          ar: 'المؤسسة من اجل ترقية الحقوق' 
        }
      },
      {
        id: 'mission',
        title: { 
          fr: 'Notre mission', 
          ar: 'مهمتنا' 
        },
        content: { 
          fr: 'Notre mission est de promouvoir et défendre les droits par la sensibilisation, la formation, la documentation des violations et le soutien aux acteurs de la société civile.', 
          ar: 'مهمتنا هي تعزيز والدفاع عن الحقوق من خلال التوعية والتدريب وتوثيق الانتهاكات ودعم الفاعلين في المجتمع المدني.' 
        }
      }
    ]
  },
  about: {
    id: 'about',
    title: { 
      fr: 'À propos', 
      ar: 'من نحن' 
    },
    sections: [
      {
        id: 'about_main',
        title: { 
          fr: 'À propos de nous', 
          ar: 'من نحن' 
        },
        content: { 
          fr: 'Notre fondation œuvre pour la protection et la promotion des droits fondamentaux.', 
          ar: 'تعمل مؤسستنا على حماية وتعزيز الحقوق الأساسية.' 
        }
      }
    ]
  },
  news: {
    id: 'news',
    title: {
      fr: 'Actualités',
      ar: 'أخبار'
    },
    sections: [
      {
        id: 'news_intro',
        title: {
          fr: 'Dernières actualités',
          ar: 'آخر الأخبار'
    },
    content: {
          fr: 'Découvrez nos dernières actualités et événements',
          ar: 'اكتشف آخر أخبارنا وأحداثنا'
        }
      }
    ]
  },
  contact: {
    id: 'contact',
    title: {
      fr: 'Contact',
      ar: 'اتصل بنا'
    },
    sections: [
      {
        id: 'contact_info',
        title: {
          fr: 'Nos coordonnées',
          ar: 'معلومات الاتصال'
        },
        content: {
          fr: 'N\'hésitez pas à nous contacter pour toute question ou demande d\'information.',
          ar: 'لا تتردد في الاتصال بنا لأي استفسار أو طلب معلومات.'
        }
      }
    ]
  },
  programs: {
    id: 'programs',
    title: {
      fr: 'Programmes',
      ar: 'برامج'
    },
    sections: [
      {
        id: 'programs_intro',
        title: {
          fr: 'Nos programmes',
          ar: 'برامجنا'
    },
    content: {
          fr: 'Découvrez nos programmes et initiatives.',
          ar: 'اكتشف برامجنا ومبادراتنا.'
        }
      }
    ]
  }
};

// Function to get page content
export const getPageContent = async (pageId: string): Promise<PageContent | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/page/${pageId}`);
    
    if (!response.ok) {
      if (response.status === 404) {
        console.error(`Page not found: ${pageId}`);
        // Return fallback content if available
        if (staticFallbackContent[pageId]) {
          console.log(`Using fallback content for page: ${pageId}`);
          return staticFallbackContent[pageId];
        }
        return null;
      }
      throw new Error(`Failed to fetch page: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching page content:', error);
    // Return fallback content if available
    if (staticFallbackContent[pageId]) {
      console.log(`Using fallback content for page: ${pageId}`);
      return staticFallbackContent[pageId];
    }
    return null;
  }
};

// Function to get all pages
export const getPages = async (): Promise<PageContent[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/pages`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch pages: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching pages:', error);
    return [];
  }
};

// Function to create or update a page
export const savePageContent = async (page: PageContent): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE_URL}/page`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(page),
    });
    
    if (!response.ok) {
      throw new Error(`Failed to save page: ${response.statusText}`);
    }
    
    const result = await response.json();
    return result.success;
  } catch (error) {
    console.error('Error saving page content:', error);
    return false;
  }
};

// Function to create or update a section
export const saveSection = async (section: PageSection, pageId: string): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE_URL}/section`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...section,
        pageId,
      }),
    });
    
    if (!response.ok) {
      throw new Error(`Failed to save section: ${response.statusText}`);
    }
    
    const result = await response.json();
    return result.success;
  } catch (error) {
    console.error('Error saving section:', error);
    return false;
  }
};

// Function to delete a section
export const deleteSection = async (pageId: string, sectionId: string): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE_URL}/section/${pageId}/${sectionId}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error(`Failed to delete section: ${response.statusText}`);
    }
    
    const result = await response.json();
    return result.success;
  } catch (error) {
    console.error('Error deleting section:', error);
    return false;
  }
};

// Function to get all news
export const getNews = async (): Promise<NewsItem[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/news`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch news: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching news:', error);
    return [];
  }
};

// Function to get a specific news item by ID
export const getNewsById = async (newsId: string): Promise<NewsItem | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/news/${newsId}`);
    
    if (!response.ok) {
      if (response.status === 404) {
        console.error(`News item not found: ${newsId}`);
        return null;
      }
      throw new Error(`Failed to fetch news item: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching news item:', error);
    return null;
  }
};

// Function to get a specific news item by slug
export const getNewsItem = async (slug: string, lang: 'fr' | 'ar'): Promise<NewsItem | null> => {
  try {
    const allNews = await getNews();
    return allNews.find(item => item.slug[lang] === slug) || null;
  } catch (error) {
    console.error('Error fetching news item by slug:', error);
    return null;
  }
};

// Function to create or update a news item
export const saveNewsItem = async (news: NewsItem): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE_URL}/news`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(news),
    });
    
    if (!response.ok) {
      throw new Error(`Failed to save news item: ${response.statusText}`);
    }
    
    const result = await response.json();
    return result.success;
  } catch (error) {
    console.error('Error saving news item:', error);
    return false;
  }
};

// Function to get all resources
export const getResources = (): ResourceItem[] => {
  // This function is no longer used in the new implementation
  return [];
};

// Function to get a specific resource by slug
export const getResourceItem = (slug: string, lang: 'fr' | 'ar'): ResourceItem | null => {
  // This function is no longer used in the new implementation
  return null;
};

// For future expansion, these functions could be replaced with API calls to a real backend 