// This is a simple client-side data handling utility
// In a production environment, you'd use a real database with server-side API endpoints
import { getPersistedPage, getPersistedPages, savePersistentPage } from './api';
import { 
  getPersistedNewsItems,
  getPersistedNewsItem,
  getPersistedNewsBySlug,
  savePersistentNewsItem
} from './newsApi';
import {
  getPersistedTeamMembers,
  getPersistedTeamMember,
  savePersistentTeamMember,
  deletePersistedTeamMember
} from './teamApi';
import {
  getPersistedTestimonials,
  getPersistedTestimonial,
  savePersistentTestimonial,
  deletePersistedTestimonial
} from './testimonialsApi';
import {
  getPersistedMedia,
  getPersistedMediaItem,
  savePersistentMediaItem,
  deletePersistedMediaItem
} from './mediaApi';

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
  videoUrl?: string;
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

// Types for media content
export interface MediaItem {
  id: string;
  title: Multilingual;
  description: Multilingual;
  type: string; // image, video, document
  url: string;
  thumbnailUrl?: string;
  date: string;
  category?: string;
  tags?: string[];
}

// Types for testimonials
export interface Testimonial {
  id: string;
  name: Multilingual;
  role: Multilingual;
  content: Multilingual;
  imageUrl?: string;
  rating?: number;
  date?: string;
}

// Types for team members
export interface TeamMember {
  id: string;
  name: Multilingual;
  role: Multilingual;
  bio: Multilingual;
  imageUrl?: string;
  socialLinks?: Record<string, string>;
  order?: number;
}

// API URL for remote API (fallback)
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

// Function to get page content - using local storage first, then fallback to API
export const getPageContent = async (pageId: string): Promise<PageContent | null> => {
  // Try to get from local storage first
  const localPage = getPersistedPage(pageId);
  if (localPage) {
    return localPage;
  }
  
  // If not found in local storage, try API
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

// Function to get all pages - using local storage first, then fallback to API
export const getPages = async (): Promise<PageContent[]> => {
  // Get from local storage
  const localPages = getPersistedPages();
  if (Object.keys(localPages).length > 0) {
    return Object.values(localPages);
  }
  
  // Fallback to API
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

// Function to create or update a page - using local storage first, then API
export const savePageContent = async (page: PageContent): Promise<boolean> => {
  // Save to local storage
  const success = savePersistentPage(page);
  if (success) {
    return true;
  }
  
  // Fallback to API
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
  // Get the page
  const page = await getPageContent(pageId);
  if (!page) return false;
  
  // Update the section
  const sectionIndex = page.sections.findIndex(s => s.id === section.id);
  if (sectionIndex !== -1) {
    page.sections[sectionIndex] = section;
  } else {
    page.sections.push(section);
  }
  
  // Save the updated page
  return savePageContent(page);
};

// Function to delete a section
export const deleteSection = async (pageId: string, sectionId: string): Promise<boolean> => {
  // Get the page
  const page = await getPageContent(pageId);
  if (!page) return false;
  
  // Remove the section
  page.sections = page.sections.filter(s => s.id !== sectionId);
  
  // Save the updated page
  return savePageContent(page);
};

// Function to get all news
export const getNews = async (): Promise<NewsItem[]> => {
  // Get from local storage
  const newsItems = getPersistedNewsItems();
  if (newsItems.length > 0) {
    return newsItems;
  }
  
  // Fallback to API
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
  // Try to get from local storage first
  const localNewsItem = getPersistedNewsItem(newsId);
  if (localNewsItem) {
    return localNewsItem;
  }
  
  // Fallback to API
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
  // Try to get from local storage first
  const localNewsItem = getPersistedNewsBySlug(slug, lang);
  if (localNewsItem) {
    return localNewsItem;
  }
  
  // Fallback to API lookup by iterating through all news
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
  // Save to local storage
  const success = savePersistentNewsItem(news);
  if (success) {
    return true;
  }
  
  // Fallback to API
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

// New functions for enhanced content management

// Media management
export const getAllMedia = async (): Promise<MediaItem[]> => {
  // Get from local storage
  const mediaItems = getPersistedMedia();
  if (mediaItems.length > 0) {
    return mediaItems;
  }
  
  // Fallback to API
  try {
    const response = await fetch(`${API_BASE_URL}/media`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch media: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching media:', error);
    return [];
  }
};

export const saveMedia = async (media: MediaItem): Promise<boolean> => {
  // Save to local storage
  const success = savePersistentMediaItem(media);
  if (success) {
    return true;
  }
  
  // Fallback to API
  try {
    const response = await fetch(`${API_BASE_URL}/media`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(media),
    });
    
    if (!response.ok) {
      throw new Error(`Failed to save media: ${response.statusText}`);
    }
    
    const result = await response.json();
    return result.success;
  } catch (error) {
    console.error('Error saving media:', error);
    return false;
  }
};

export const deleteMedia = async (mediaId: string): Promise<boolean> => {
  // Delete from local storage
  const success = deletePersistedMediaItem(mediaId);
  if (success) {
    return true;
  }
  
  // Fallback to API
  try {
    const response = await fetch(`${API_BASE_URL}/media/${mediaId}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error(`Failed to delete media: ${response.statusText}`);
    }
    
    const result = await response.json();
    return result.success;
  } catch (error) {
    console.error('Error deleting media:', error);
    return false;
  }
};

// Testimonial management
export const getTestimonials = async (): Promise<Testimonial[]> => {
  // Get from local storage
  const testimonials = getPersistedTestimonials();
  if (testimonials.length > 0) {
    return testimonials;
  }
  
  // Fallback to API
  try {
    const response = await fetch(`${API_BASE_URL}/testimonials`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch testimonials: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return [];
  }
};

export const saveTestimonial = async (testimonial: Testimonial): Promise<boolean> => {
  // Save to local storage
  const success = savePersistentTestimonial(testimonial);
  if (success) {
    return true;
  }
  
  // Fallback to API
  try {
    const response = await fetch(`${API_BASE_URL}/testimonial`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testimonial),
    });
    
    if (!response.ok) {
      throw new Error(`Failed to save testimonial: ${response.statusText}`);
    }
    
    const result = await response.json();
    return result.success;
  } catch (error) {
    console.error('Error saving testimonial:', error);
    return false;
  }
};

export const deleteTestimonial = async (id: string): Promise<boolean> => {
  // Delete from local storage
  const success = deletePersistedTestimonial(id);
  if (success) {
    return true;
  }
  
  // Fallback to API
  try {
    const response = await fetch(`${API_BASE_URL}/testimonial/${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error(`Failed to delete testimonial: ${response.statusText}`);
    }
    
    const result = await response.json();
    return result.success;
  } catch (error) {
    console.error('Error deleting testimonial:', error);
    return false;
  }
};

// Team member management
export const getTeamMembers = async (): Promise<TeamMember[]> => {
  // Get from local storage
  const teamMembers = getPersistedTeamMembers();
  if (teamMembers.length > 0) {
    return teamMembers;
  }
  
  // Fallback to API
  try {
    const response = await fetch(`${API_BASE_URL}/team`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch team members: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching team members:', error);
    return [];
  }
};

export const saveTeamMember = async (member: TeamMember): Promise<boolean> => {
  // Save to local storage
  const success = savePersistentTeamMember(member);
  if (success) {
    return true;
  }
  
  // Fallback to API
  try {
    const response = await fetch(`${API_BASE_URL}/team`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(member),
    });
    
    if (!response.ok) {
      throw new Error(`Failed to save team member: ${response.statusText}`);
    }
    
    const result = await response.json();
    return result.success;
  } catch (error) {
    console.error('Error saving team member:', error);
    return false;
  }
};

export const deleteTeamMember = async (id: string): Promise<boolean> => {
  // Delete from local storage
  const success = deletePersistedTeamMember(id);
  if (success) {
    return true;
  }
  
  // Fallback to API
  try {
    const response = await fetch(`${API_BASE_URL}/team/${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error(`Failed to delete team member: ${response.statusText}`);
    }
    
    const result = await response.json();
    return result.success;
  } catch (error) {
    console.error('Error deleting team member:', error);
    return false;
  }
};

// File upload helper
export const uploadFile = async (file: File, type: 'image' | 'video' | 'document'): Promise<string | null> => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type);
    
    const response = await fetch(`${API_BASE_URL}/upload`, {
      method: 'POST',
      body: formData,
    });
    
    if (!response.ok) {
      throw new Error(`Failed to upload file: ${response.statusText}`);
    }
    
    const result = await response.json();
    return result.url;
  } catch (error) {
    console.error('Error uploading file:', error);
    return null;
  }
};

// For future expansion, these functions could be replaced with API calls to a real backend 