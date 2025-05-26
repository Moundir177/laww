// This is a simple client-side data handling utility
// In a production environment, you'd use a real database with server-side API endpoints

// Type for translated text
export interface TranslatedText {
  fr: string;
  ar: string;
}

// Types for different content models
export interface NewsItem {
  id: number;
  title: TranslatedText;
  date: TranslatedText;
  author: TranslatedText;
  category: TranslatedText;
  excerpt: TranslatedText;
  image: string;
  slug: string;
  content: string;
}

export interface Resource {
  id: number;
  title: TranslatedText;
  description: TranslatedText;
  type: string;
  format: string;
  thumbnail?: string;
  downloadUrl: string;
  date: TranslatedText;
  fileSize?: string;
  featured?: boolean;
}

export interface Publication {
  id: number;
  title: TranslatedText;
  date: TranslatedText;
  excerpt: TranslatedText;
  category: PublicationType;
  type: PublicationType;
  pages: number;
  image?: string;
  slug: string;
  pdfUrl: string;
  views?: number;
  listens?: number;
  downloads?: number;
  featured?: boolean;
  duration?: string;
}

export interface PublicationType {
  id: string;
  fr: string;
  ar: string;
}

export interface PageContent {
  id: string;
  title: TranslatedText;
  sections: PageSection[];
}

export interface PageSection {
  id: string;
  title?: TranslatedText;
  content: TranslatedText;
  image?: string;
  metadata?: {
    country?: TranslatedText;
    type?: string;
    [key: string]: any;
  };
}

// Add a new interface for website structure
export interface WebsiteStructure {
  pages: string[];
  mainMenu: MenuItem[];
  footer: FooterSection[];
}

export interface MenuItem {
  id: string;
  title: TranslatedText;
  href: string;
  children?: MenuItem[];
}

export interface FooterSection {
  id: string;
  title: TranslatedText;
  links?: {
    text: TranslatedText;
    href: string;
  }[];
  content?: TranslatedText;
}

// Interface for global content like buttons, labels, and global elements
export interface GlobalContent {
  id: string;
  category: string; // e.g., 'buttons', 'labels', 'errors', 'headers'
  key: string;
  text: TranslatedText;
  image?: string;
}

// Interface for media library items
export interface MediaItem {
  id: string;
  name: string;
  path: string;
  url: string;
  type: string; // image, video, document, etc.
  alt: TranslatedText;
  tags: string[];
  uploadDate: string;
}

// Generic get, set, and delete functions for localStorage
export const getItem = <T>(key: string): T | null => {
  if (typeof window === 'undefined') return null;
  
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (e) {
    console.error(`Error getting item '${key}' from localStorage:`, e);
    return null;
  }
};

export const setItem = <T>(key: string, value: T): boolean => {
  if (typeof window === 'undefined') return false;
  
  try {
    const valueString = JSON.stringify(value);
    localStorage.setItem(key, valueString);
    
    // Manually dispatch a storage event to ensure all components are updated
    // This helps with components in the same window that won't naturally receive storage events
    window.dispatchEvent(new StorageEvent('storage', {
      key: key,
      newValue: valueString
    }));
    
    return true;
  } catch (e) {
    console.error(`Error setting item '${key}' in localStorage:`, e);
    return false;
  }
};

export const removeItem = (key: string): boolean => {
  if (typeof window === 'undefined') return false;
  
  try {
    localStorage.removeItem(key);
    return true;
  } catch (e) {
    console.error('Error removing item from localStorage:', e);
    return false;
  }
};

// Data specific functions
export const getNews = (): NewsItem[] => {
  return getItem<NewsItem[]>('news') || [];
};

export const setNews = (news: NewsItem[]): boolean => {
  return setItem('news', news);
};

export const getNewsItem = (id: number): NewsItem | null => {
  const news = getNews();
  return news.find(item => item.id === id) || null;
};

export const updateNewsItem = (item: NewsItem): boolean => {
  const news = getNews();
  const index = news.findIndex(i => i.id === item.id);
  
  if (index !== -1) {
    news[index] = item;
    return setNews(news);
  }
  return false;
};

export const deleteNewsItem = (id: number): boolean => {
  const news = getNews();
  const filtered = news.filter(item => item.id !== id);
  return setNews(filtered);
};

export const getResources = (): Resource[] => {
  return getItem<Resource[]>('resources') || [];
};

export const setResources = (resources: Resource[]): boolean => {
  return setItem('resources', resources);
};

export const getResource = (id: number): Resource | null => {
  const resources = getResources();
  return resources.find(item => item.id === id) || null;
};

export const updateResource = (item: Resource): boolean => {
  const resources = getResources();
  const index = resources.findIndex(i => i.id === item.id);
  
  if (index !== -1) {
    resources[index] = item;
    return setResources(resources);
  }
  return false;
};

export const deleteResource = (id: number): boolean => {
  const resources = getResources();
  const filtered = resources.filter(item => item.id !== id);
  return setResources(filtered);
};

export const getPageContent = (pageId: string): PageContent | null => {
  return getItem<PageContent>(`page_${pageId}`) || null;
};

// Custom event name for content updates
const CONTENT_UPDATED_EVENT = 'content_updated';

export const setPageContent = (content: PageContent): boolean => {
  if (!content || !content.id) {
    console.error('Invalid page content: Missing content object or content.id');
    return false;
  }
  
  try {
    console.log(`Database: Saving content for ${content.id} with ${content?.sections?.length || 0} sections`);
    
    // Make sure title exists and has both fr and ar
    if (!content.title) {
      content.title = { 
        fr: content.id.charAt(0).toUpperCase() + content.id.slice(1), 
        ar: content.id 
      };
    } else {
      // Ensure fr and ar properties exist in title
      if (!content.title.fr) {
        content.title.fr = content.id.charAt(0).toUpperCase() + content.id.slice(1);
      }
      if (!content.title.ar) {
        content.title.ar = content.id;
      }
    }
    
    // Ensure sections is always an array
    if (!content.sections) {
      content.sections = [];
    }
    
    // Make sure all sections have their title property defined
    content.sections = content.sections.map(section => {
      // If section is missing title property, add a default one
      if (!section.title) {
        section.title = { 
          fr: section.id.charAt(0).toUpperCase() + section.id.slice(1).replace(/_/g, ' '), 
          ar: section.id 
        };
      } else {
        // Ensure fr and ar properties exist in section title
        if (!section.title.fr) {
          section.title.fr = section.id.charAt(0).toUpperCase() + section.id.slice(1).replace(/_/g, ' ');
        }
        if (!section.title.ar) {
          section.title.ar = section.id;
        }
      }
      
      // Ensure content is defined in each section
      if (!section.content) {
        section.content = { fr: '', ar: '' };
      }
      
      return section;
    });
    
    // Save to both editor and live versions to ensure persistence
    const editorKey = `editor_${content.id}`;
    const pageKey = `page_${content.id}`;
    const contentString = JSON.stringify(content);
    
    // Remove previous items first to avoid any potential conflicts
    localStorage.removeItem(editorKey);
    localStorage.removeItem(pageKey);
    
    // Small delay to ensure removal completed
    setTimeout(() => {
      // Set new content
    localStorage.setItem(editorKey, contentString);
    localStorage.setItem(pageKey, contentString);
    
    console.log(`Database: Updated content for page ${content.id} with ${content.sections.length} sections`);
    
      // Dispatch events to notify all components that content has been updated
    if (typeof window !== 'undefined') {
      // First try to dispatch our custom event
      try {
          const customEvent = new Event(CONTENT_UPDATED_EVENT);
          window.dispatchEvent(customEvent);
        console.log(`Database: Dispatched ${CONTENT_UPDATED_EVENT} event`);
      } catch (error) {
        console.error(`Error dispatching ${CONTENT_UPDATED_EVENT} event:`, error);
      }
      
      // Then dispatch storage events for both keys to ensure all components update
      try {
          // Dispatch event for page content
          const pageEvent = new StorageEvent('storage', {
          key: pageKey,
            newValue: contentString,
            oldValue: null,
            storageArea: localStorage
          });
          window.dispatchEvent(pageEvent);
          
          // Dispatch event for editor content
          const editorEvent = new StorageEvent('storage', {
          key: editorKey,
            newValue: contentString,
            oldValue: null,
            storageArea: localStorage
          });
          window.dispatchEvent(editorEvent);
        
        console.log(`Database: Dispatched storage events for ${pageKey} and ${editorKey}`);
      } catch (error) {
        console.error('Error dispatching storage events:', error);
      }
    }
    }, 50);
    
    return true;
  } catch (error) {
    console.error('Error saving page content:', error);
    return false;
  }
};

export const getAllPageIds = (): string[] => {
  if (typeof window === 'undefined') return [];
  
  try {
    const pageKeys: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('page_')) {
        pageKeys.push(key.replace('page_', ''));
      }
    }
    return pageKeys;
  } catch (e) {
    console.error('Error getting page IDs:', e);
    return [];
  }
};

// Helper function to get all pages
export const getAllPages = (): PageContent[] => {
  const pageIds = getAllPageIds();
  return pageIds.map(id => getPageContent(id)).filter(page => page !== null) as PageContent[];
};

// Function to get all global content
export const getGlobalContent = (): GlobalContent[] => {
  return getItem<GlobalContent[]>('global_content') || [];
};

// Function to set all global content
export const setGlobalContent = (content: GlobalContent[]): boolean => {
  return setItem('global_content', content);
};

// Function to get a specific global content item by category and key
export const getGlobalContentItem = (category: string, key: string): GlobalContent | null => {
  const globalContent = getGlobalContent();
  return globalContent.find(item => item.category === category && item.key === key) || null;
};

// Function to update a specific global content item
export const updateGlobalContentItem = (item: GlobalContent): boolean => {
  const globalContent = getGlobalContent();
  const index = globalContent.findIndex(i => i.id === item.id);
  
  if (index !== -1) {
    globalContent[index] = item;
    return setGlobalContent(globalContent);
  }
  
  // Item doesn't exist, add it
  globalContent.push(item);
  return setGlobalContent(globalContent);
};

// Function to get all text strings for a specific category
export const getCategoryContent = (category: string): GlobalContent[] => {
  const globalContent = getGlobalContent();
  return globalContent.filter(item => item.category === category);
};

// Function to get all media items
export const getMediaLibrary = (): MediaItem[] => {
  return getItem<MediaItem[]>('media_library') || [];
};

// Function to set all media items
export const setMediaLibrary = (media: MediaItem[]): boolean => {
  return setItem('media_library', media);
};

// Function to get a specific media item by id
export const getMediaItem = (id: string): MediaItem | null => {
  const mediaLibrary = getMediaLibrary();
  return mediaLibrary.find(item => item.id === id) || null;
};

// Function to add or update a media item
export const updateMediaItem = (item: MediaItem): boolean => {
  const mediaLibrary = getMediaLibrary();
  const index = mediaLibrary.findIndex(i => i.id === item.id);
  
  if (index !== -1) {
    mediaLibrary[index] = item;
    return setMediaLibrary(mediaLibrary);
  }
  
  // Item doesn't exist, add it
  mediaLibrary.push(item);
  return setMediaLibrary(mediaLibrary);
};

// Function to delete a media item by id
export const deleteMediaItem = (id: string): boolean => {
  const mediaLibrary = getMediaLibrary();
  const filtered = mediaLibrary.filter(item => item.id !== id);
  return setMediaLibrary(filtered);
};

// Function to sync all website content
export const syncContentToEditor = (): boolean => {
  try {
    // Read all rendered pages
    const pages = getAllPageIds();
    
    // For each page, create a snapshot for the editor
    pages.forEach(pageId => {
      const pageContent = getPageContent(pageId);
      if (pageContent) {
        setItem(`editor_${pageId}`, pageContent);
      }
    });
    
    // Sync news content
    const news = getNews();
    setItem('editor_news', news);
    
    // Sync resources content
    const resources = getResources();
    setItem('editor_resources', resources);
    
    // Sync global content
    const globalContent = getGlobalContent();
    setItem('editor_global_content', globalContent);
    
    // Sync website structure
    const websiteStructure = getItem<WebsiteStructure>('websiteStructure');
    if (websiteStructure) {
      setItem('editor_websiteStructure', websiteStructure);
    }
    
    // Sync media library
    const mediaLibrary = getMediaLibrary();
    setItem('editor_media_library', mediaLibrary);
    
    return true;
  } catch (error) {
    console.error('Error syncing content to editor:', error);
    return false;
  }
};

// Function to apply editor changes to the actual website content
export const applyEditorChanges = (pageId: string): boolean => {
  try {
    const editorContent = getItem<PageContent>(`editor_${pageId}`);
    if (editorContent) {
      // Save directly to the main storage, not just editor version
      setItem(`page_${pageId}`, editorContent);
      return true;
    }
    return false;
  } catch (error) {
    console.error(`Error applying editor changes for ${pageId}:`, error);
    return false;
  }
};

// Function to update the homepage with all necessary sections
export const updateHomePageWithAllSections = (): boolean => {
  try {
    // Check if the home page exists
    const existingHome = getPageContent('home');
    
    if (existingHome) {
      // Define all required section IDs for the home page
      const requiredSectionIds = [
        'hero', 'slogan', 'mission', 'droits_egaux', 'objectives', 
        'impact', 'actualites', 'objectifs_details', 'mission_details',
        'programmes', 'identite_visuelle', 'newsletter'
      ];
      
      // Check if any required sections are missing
      const existingSectionIds = existingHome.sections.map(section => section.id);
      const missingSectionIds = requiredSectionIds.filter(id => !existingSectionIds.includes(id));
      
      // If there are no missing sections, return (no update needed)
      if (missingSectionIds.length === 0) {
        return true;
      }
      
      // Get the complete home page content from initialization template
      const completeHome = createDefaultPageContent('home');
      if (!completeHome) return false;
      
      // Add any missing sections to the existing home page
      for (const id of missingSectionIds) {
        const sectionToAdd = completeHome.sections.find(section => section.id === id);
        if (sectionToAdd) {
          existingHome.sections.push(sectionToAdd);
        }
      }
      
      // Save the updated home page
      setPageContent(existingHome);
      return true;
    }
    
    // If home page doesn't exist at all, create it with all sections
    const newHome = createDefaultPageContent('home');
    if (newHome) {
      setPageContent(newHome);
      return true;
    }
    
    return false;
  } catch (error) {
    console.error('Error updating home page sections:', error);
    return false;
  }
};

// Update the About page with all sections
export const updateAboutPageWithAllSections = (): boolean => {
  try {
    // Get current about page content
    let content = getPageContent('about');
    
    // If no content exists, create a base content
    if (!content) {
      content = {
        id: 'about',
        title: { fr: 'À Propos', ar: 'من نحن' },
        sections: []
      };
    }
    
    // Define the required sections for About page
    const requiredSections = [
      {
        id: 'intro',
        title: { fr: 'Introduction', ar: 'مقدمة' },
        content: { 
          fr: 'Découvrez notre mission, nos valeurs et notre équipe dédiée à la promotion et à la défense des droits humains.', 
          ar: 'اكتشف مهمتنا وقيمنا وفريقنا المكرس لتعزيز وحماية حقوق الإنسان.' 
        }
      },
      {
        id: 'mission',
        title: { fr: 'Notre mission', ar: 'مهمتنا' },
        content: { 
          fr: 'Notre mission principale est de contribuer à la construction d\'un État de droit solide et inclusif. Pour cela, nous mettons en place des actions de plaidoyer, des campagnes de sensibilisation, des formations juridiques et des programmes d\'éducation civique. Nous exhortons les citoyennes et citoyens à s\'engager activement, à faire respecter la loi et à défendre leurs droits avec responsabilité et solidarité.',
          ar: 'مهمتنا هي تعزيز والدفاع عن الحقوق من خلال التوعية والتدريب وتوثيق الانتهاكات ودعم الفاعلين في المجتمع المدني.'
        }
      },
      {
        id: 'vision',
        title: { fr: 'Notre vision', ar: 'رؤيتنا' },
        content: { 
          fr: '"Contribuer à l\'édification d\'une société où la dignité humaine est respectée et où les droits sont garantis pour tous, sans discrimination."', 
          ar: '"المساهمة في بناء مجتمع تُحترم فيه كرامة الإنسان وتُضمن فيه الحقوق للجميع، دون تمييز."' 
        }
      },
      {
        id: 'justice',
        title: { fr: 'Justice et Droits', ar: 'العدالة والحقوق' },
        content: { 
          fr: 'Face aux défis, nous restons engagés et mobilisés pour faire avancer la justice et promouvoir le respect des droits fondamentaux.',
          ar: 'في مواجهة التحديات، نبقى ملتزمين ومجندين لدفع العدالة وتعزيز احترام الحقوق الأساسية.'
        },
        image: '/images/law/justice-law-scales.jpg'
      },
      {
        id: 'objectives',
        title: { fr: 'Nos objectifs', ar: 'أهدافنا' },
        content: { 
          fr: 'Contribuer et œuvrer à la construction d\'un État de droit en exhortant les citoyens à s\'engager à faire appliquer et respecter la loi et à promouvoir les droits.',
          ar: 'المساهمة والعمل على بناء دولة القانون من خلال حث المواطنين على الالتزام بتطبيق واحترام القانون وتعزيز الحقوق.'
        }
      },
      {
        id: 'objectives_intro',
        title: { fr: 'Introduction aux objectifs', ar: 'مقدمة الأهداف' },
        content: { 
          fr: 'La Fondation pour la promotion des droits poursuit les objectifs suivants pour concrétiser sa vision d\'une société juste et respectueuse des droits fondamentaux.',
          ar: 'تسعى المؤسسة من اجل ترقية الحقوق لتحقيق الأهداف التالية لتجسيد رؤيتها لمجتمع عادل يحترم الحقوق الأساسية.'
        }
      },
      {
        id: 'target_audience',
        title: { fr: 'Notre public cible', ar: 'جمهورنا المستهدف' },
        content: { 
          fr: 'Nos actions et programmes sont conçus pour répondre aux besoins spécifiques de différentes catégories de personnes concernées par les droits humains.',
          ar: 'تم تصميم إجراءاتنا وبرامجنا لتلبية الاحتياجات المحددة لمختلف فئات الأشخاص المعنيين بحقوق الإنسان.'
        }
      },
      {
        id: 'history',
        title: { fr: 'Notre histoire', ar: 'تاريخنا' },
        content: { 
          fr: 'Notre histoire est avant tout celle d\'un engagement collectif. Face aux défis persistants liés au respect des droits fondamentaux, nous avons choisi d\'unir nos expertises et nos convictions pour créer une structure indépendante, transparente et active. Depuis sa création, la Fondation œuvre pour renforcer la culture des droits humains, sensibiliser les citoyennes et citoyens à leurs droits et devoirs, et promouvoir une société fondée sur la loi, la justice et l\'égalité.',
          ar: 'تاريخنا هو قبل كل شيء تاريخ التزام جماعي. في مواجهة التحديات المستمرة المرتبطة باحترام الحقوق الأساسية، اخترنا توحيد خبراتنا وقناعاتنا لإنشاء هيكل مستقل وشفاف ونشط.'
        }
      },
      {
        id: 'founder',
        title: { fr: 'Mot du Gérant', ar: 'كلمة المدير' },
        content: { 
          fr: 'C\'est avec une grande fierté et une profonde conviction que je vous adresse ces quelques mots en tant que gérant de la Fondation pour la promotion des droits. Notre monde traverse une période où les droits fondamentaux sont souvent remis en question, ignorés, voire bafoués. Face à ces défis, il est impératif de ne pas rester silencieux.',
          ar: 'بكل فخر وقناعة عميقة أخاطبكم بهذه الكلمات القليلة كمدير للمؤسسة من اجل ترقية الحقوق. يمر عالمنا بفترة يتم فيها غالبًا التشكيك في الحقوق الأساسية أو تجاهلها أو حتى انتهاكها. في مواجهة هذه التحديات، من الضروري عدم البقاء صامتين.'
        },
        image: '/images/zakaria.jpg'
      }
    ];
    
    // For each required section, check if it exists
    requiredSections.forEach(requiredSection => {
      const existingSection = content.sections.find(s => s.id === requiredSection.id);
      
      if (!existingSection) {
        // If section doesn't exist, add it
        content.sections.push(requiredSection);
      }
    });
    
    // Save the updated content
    setItem(`page_about`, content);
    setItem(`editor_about`, content);
    
    return true;
  } catch (error) {
    console.error('Error updating about page sections:', error);
    return false;
  }
};

// Update the Programs page with all sections
export const updateProgramsPageWithAllSections = (): boolean => {
  try {
    // Get current programs page content
    let content = getPageContent('programs');
    
    // If no content exists, create a base content
    if (!content) {
      content = {
        id: 'programs',
        title: { fr: 'Nos Programmes', ar: 'برامجنا' },
        sections: []
      };
    }
    
    // Define the required sections for Programs page
    const requiredSections = [
      {
        id: 'intro',
        title: { fr: 'Nos Programmes', ar: 'برامجنا' },
        content: { 
          fr: 'Découvrez les différents programmes à travers lesquels nous travaillons pour promouvoir et protéger les droits fondamentaux.', 
          ar: 'اكتشف البرامج المختلفة التي نعمل من خلالها على تعزيز وحماية الحقوق الأساسية.' 
        }
      },
      {
        id: 'research',
        title: { fr: 'Recherche & Documentation', ar: 'البحث والتوثيق' },
        content: { 
          fr: 'Notre programme de recherche documente systématiquement les situations des droits humains et mène des études sur les questions liées aux droits pour informer le plaidoyer et le développement des politiques.', 
          ar: 'يوثق برنامج البحث لدينا بشكل منهجي حالات حقوق الإنسان ويجري دراسات حول القضايا المتعلقة بالحقوق لإثراء المناصرة وتطوير السياسات.' 
        }
      },
      {
        id: 'training',
        title: { fr: 'Formation & Éducation', ar: 'التدريب والتعليم' },
        content: { 
          fr: 'Dans le cadre de notre engagement pour la promotion, la diffusion et la protection des droits humains en Algérie, la Fondation pour la promotion des droits a organisé une formation nationale intitulée :\n\n"Les mécanismes nationaux de défense des droits humains", destinée aux jeunes activistes et étudiants en droit issus de toutes les wilayas du pays.\n\nCette initiative s\'inscrit dans notre plan stratégique de renforcement des capacités de la jeunesse algérienne engagée, en leur offrant des outils pratiques pour défendre efficacement les droits humains, conformément à la Constitution algérienne de novembre 2020 et aux traités internationaux en vigueur.\n\nLa session a été marquée par plusieurs volets importants, notamment :\n• Une analyse approfondie de la Constitution ainsi que des textes législatifs en vigueur,\n• Un examen des accords internationaux ratifiés par l\'Algérie,\n• Des ateliers pratiques visant à maîtriser l\'utilisation de ces instruments juridiques dans les contextes professionnels et militants.\n\nNous aurons des formations tout au long de l\'année. La prochaine formation sera sur le thème de la protection digitale, programmée pour le mois de juin. Plus de détails seront fournis les jours à venir.', 
          ar: 'في إطار التزامنا بتعزيز ونشر وحماية حقوق الإنسان في الجزائر، نظمت المؤسسة من أجل ترقية الحقوق تدريبًا وطنيًا بعنوان:\n\n"الآليات الوطنية للدفاع عن حقوق الإنسان"، موجه للناشطين الشباب وطلاب القانون من جميع ولايات البلاد.\n\nتندرج هذه المبادرة ضمن خطتنا الاستراتيجية لتعزيز قدرات الشباب الجزائري الملتزم، من خلال تزويدهم بأدوات عملية للدفاع الفعال عن حقوق الإنسان، وفقًا لدستور نوفمبر 2020 والاتفاقيات الدولية السارية.\n\nتميزت الدورة بعدة محاور هامة منها:\n• تحليل معمق للدستور والنصوص التشريعية السارية،\n• دراسة الاتفاقيات الدولية التي صادقت عليها الجزائر،\n• ورشات تطبيقية لإتقان استخدام هذه الأدوات القانونية في السياقات المهنية والنضالية.\n\nستتواصل الدورات التدريبية على مدار السنة، وستكون الدورة القادمة حول موضوع الحماية الرقمية مبرمجة لشهر جوان، وسيتم تقديم تفاصيل أكثر في الأيام القادمة.' 
        }
      },
      {
        id: 'advocacy',
        title: { fr: 'Plaidoyer & Campagnes', ar: 'المناصرة والحملات' },
        content: { 
          fr: 'Nous défendons des changements systémiques en engageant les décideurs politiques, en sensibilisant le public et en mobilisant des actions collectives pour les droits fondamentaux.', 
          ar: 'ندافع عن التغييرات المنهجية من خلال إشراك صناع السياسات ورفع الوعي العام وتعبئة العمل الجماعي للحقوق الأساسية.' 
        }
      },
      {
        id: 'implementation',
        title: { fr: 'Notre Approche de Mise en Œuvre', ar: 'منهجية التنفيذ' },
        content: { 
          fr: 'Notre méthodologie assure que nos programmes sont efficaces, inclusifs et adaptés aux besoins locaux.', 
          ar: 'تضمن منهجيتنا أن تكون برامجنا فعالة وشاملة ومكيفة للاحتياجات المحلية.' 
        }
      },
      {
        id: 'implementation_subtitle',
        title: { fr: 'Sous-titre de mise en œuvre', ar: 'العنوان الفرعي للتنفيذ' },
        content: { 
          fr: 'implementation.subtitle', 
          ar: 'implementation.subtitle' 
        }
      },
      {
        id: 'participatory',
        title: { fr: 'Méthodologie Participative', ar: 'المنهجية التشاركية' },
        content: { 
          fr: 'Nous utilisons des approches participatives qui impliquent les bénéficiaires dans la conception et la mise en œuvre des programmes, assurant la pertinence, l\'appropriation et la durabilité. Nos méthodes comprennent:', 
          ar: 'نستخدم مناهج تشاركية تشرك المستفيدين في تصميم وتنفيذ البرامج، مما يضمن الملاءمة والملكية والاستدامة. تشمل طرقنا:' 
        }
      },
      {
        id: 'results_based',
        title: { fr: 'Gestion Axée sur les Résultats', ar: 'الإدارة القائمة على النتائج' },
        content: { 
          fr: 'Nous mettons en œuvre un cadre de gestion axée sur les résultats pour assurer l\'efficacité et l\'impact des programmes. Notre approche comprend:', 
          ar: 'نقوم بتنفيذ إطار الإدارة القائمة على النتائج لضمان فعالية وتأثير البرامج. يتضمن نهجنا:' 
        }
      },
      {
        id: 'implementation_cycle',
        title: { fr: 'Cycle de mise en œuvre', ar: 'دورة التنفيذ' },
        content: { 
          fr: 'Notre cycle de mise en œuvre', 
          ar: 'دورة التنفيذ لدينا' 
        }
      },
      {
        id: 'impact',
        title: { fr: 'Impact du Programme', ar: 'تأثير البرنامج' },
        content: { 
          fr: 'Les chiffres qui reflètent notre engagement et notre impact dans la promotion et la défense des droits.', 
          ar: 'الأرقام التي تعكس التزامنا وتأثيرنا في تعزيز والدفاع عن الحقوق.' 
        }
      },
      {
        id: 'impact_trained',
        title: { fr: 'Personnes Formées', ar: 'الأشخاص المدربين' },
        content: { 
          fr: '760+\nPersonnes formées par nos programmes de renforcement des capacités', 
          ar: '+760\nشخص تم تدريبهم من خلال برامجنا لبناء القدرات' 
        }
      },
      {
        id: 'impact_partners',
        title: { fr: 'Organisations Partenaires', ar: 'المنظمات الشريكة' },
        content: { 
          fr: '25+\nOrganisations partenaires collaborant à la mise en œuvre du programme', 
          ar: '+25\nمنظمة شريكة تتعاون في تنفيذ البرنامج' 
        }
      },
      {
        id: 'impact_workshops',
        title: { fr: 'Ateliers de Formation', ar: 'ورش العمل التدريبية' },
        content: { 
          fr: '38+\nAteliers de formation organisés dans différentes régions', 
          ar: '+38\nورشة عمل تدريبية منظمة في مناطق مختلفة' 
        }
      },
      {
        id: 'impact_regions',
        title: { fr: 'Impact Régional', ar: 'التأثير الإقليمي' },
        content: { 
          fr: 'Nos programmes ont atteint diverses régions d\'Algérie, permettant aux individus et aux organisations de devenir des défenseurs efficaces des droits humains et des valeurs démocratiques.', 
          ar: 'وصلت برامجنا إلى مناطق مختلفة من الجزائر، مما مكّن الأفراد والمنظمات من أن يصبحوا مدافعين فعالين عن حقوق الإنسان والقيم الديمقراطية.' 
        }
      },
      {
        id: 'partners',
        title: { fr: 'Nos Partenaires', ar: 'شركاؤنا' },
        content: { 
          fr: 'Nous collaborons avec divers partenaires pour améliorer l\'impact et la portée de nos programmes.', 
          ar: 'نتعاون مع شركاء متنوعين لتحسين تأثير ومدى برامجنا.' 
        }
      },
      {
        id: 'global_presence',
        title: { fr: 'Notre présence globale', ar: 'تواجدنا العالمي' },
        content: { 
          fr: 'Nos partenaires à travers le monde', 
          ar: 'شركاؤنا حول العالم' 
        }
      }
    ];
    
    // For each required section, check if it exists
    requiredSections.forEach(requiredSection => {
      const existingSection = content.sections.find(s => s.id === requiredSection.id);
      
      if (!existingSection) {
        // If section doesn't exist, add it
        content.sections.push(requiredSection);
      }
    });
    
    // Save the updated content
    setItem(`page_programs`, content);
    setItem(`editor_programs`, content);
    
    return true;
  } catch (error) {
    console.error('Error updating programs page sections:', error);
    return false;
  }
};

// Create default content for a page if none exists
const createDefaultPageContent = (pageId: string): PageContent | null => {
  const defaultTitles: {[key: string]: TranslatedText} = {
    'home': { fr: 'Accueil', ar: 'الرئيسية' },
    'about': { fr: 'À Propos', ar: 'من نحن' },
    'programs': { fr: 'Programmes', ar: 'البرامج' },
    'news': { fr: 'Actualités', ar: 'الأخبار' },
    'resources': { fr: 'Ressources', ar: 'الموارد' },
    'testimonials': { fr: 'Témoignages', ar: 'الشهادات' },
    'review': { fr: 'Revue & Publications', ar: 'المراجعة والمنشورات' },
    'contact': { fr: 'Contact', ar: 'اتصل بنا' }
  };

  if (!defaultTitles[pageId]) {
    return null;
  }

  // For programs page, return template with all sections
  if (pageId === 'programs') {
    return {
      id: 'programs',
      title: { fr: 'Programmes', ar: 'البرامج' },
      sections: [
        {
          id: 'intro',
          title: {
            fr: 'Nos Programmes',
            ar: 'برامجنا'
          },
          content: {
            fr: 'À travers nos divers programmes, nous travaillons à promouvoir et à protéger les droits humains, à renforcer les capacités de la société civile et à créer une culture de sensibilisation et de défense des droits.',
            ar: 'من خلال برامجنا المتنوعة، نعمل على تعزيز وحماية حقوق الإنسان، وبناء قدرات المجتمع المدني، وخلق ثقافة الوعي والدفاع عن الحقوق.'
          }
        },
        {
          id: 'research',
          title: {
            fr: 'Recherche & Documentation',
            ar: 'البحث والتوثيق'
          },
          content: {
            fr: 'Notre programme de recherche documente systématiquement les situations des droits humains et mène des études sur les questions liées aux droits pour informer le plaidoyer et le développement des politiques.',
            ar: 'يوثق برنامج البحث لدينا بشكل منهجي حالات حقوق الإنسان ويجري دراسات حول القضايا المتعلقة بالحقوق لإثراء المناصرة وتطوير السياسات.'
          }
        },
        {
          id: 'training',
          title: {
            fr: 'Formation & Éducation',
            ar: 'التدريب والتعليم'
          },
          content: {
            fr: 'Nous renforçons les compétences des défenseurs des droits, des organisations de la société civile et du grand public grâce à des ateliers, des formations et des ressources éducatives.',
            ar: 'نقوم بتعزيز مهارات المدافعين عن الحقوق والمنظمات المجتمعية والجمهور العام من خلال ورش العمل والتدريبات والموارد التعليمية.'
          }
        },
        {
          id: 'advocacy',
          title: {
            fr: 'Plaidoyer & Campagnes',
            ar: 'المناصرة والحملات'
          },
          content: {
            fr: 'Nous défendons des changements systémiques en engageant les décideurs politiques, en sensibilisant le public et en mobilisant des actions collectives pour les droits fondamentaux.',
            ar: 'ندافع عن التغييرات المنهجية من خلال إشراك صناع السياسات ورفع الوعي العام وتعبئة العمل الجماعي للحقوق الأساسية.'
          }
        },
        {
          id: 'methodology',
          title: {
            fr: 'Notre méthodologie',
            ar: 'منهجيتنا'
          },
          content: {
            fr: 'Nos programmes utilisent une méthodologie participative centrée sur les bénéficiaires, adaptée aux contextes spécifiques et visant un impact durable.',
            ar: 'تستخدم برامجنا منهجية تشاركية تركز على المستفيدين، وتتكيف مع السياقات المحددة وتهدف إلى تحقيق تأثير مستدام.'
          }
        }
      ]
    };
  }
  
  // For news page, return template with all sections
  if (pageId === 'news') {
    return {
      id: 'news',
      title: { fr: 'Actualités', ar: 'الأخبار' },
      sections: [
        {
          id: 'intro',
          title: {
            fr: 'Actualités',
            ar: 'الأخبار'
          },
          content: {
            fr: 'Restez informé des dernières initiatives, événements et développements concernant notre travail sur les droits humains.',
            ar: 'ابق على اطلاع بآخر المبادرات والأحداث والتطورات المتعلقة بعملنا في مجال حقوق الإنسان.'
          }
        },
        {
          id: 'categories',
          title: {
            fr: 'Catégories',
            ar: 'التصنيفات'
          },
          content: {
            fr: 'Formation\nRapports\nPartenariats\nÉvénements\nProgrammes',
            ar: 'تدريب\nتقارير\nشراكات\nفعاليات\nبرامج'
          }
        },
        {
          id: 'featured',
          title: {
            fr: 'À la une',
            ar: 'المميزة'
          },
          content: {
            fr: 'Découvrez nos actualités à la une, mettant en lumière nos principales initiatives et réalisations dans le domaine des droits.',
            ar: 'اكتشف أخبارنا المميزة، التي تسلط الضوء على مبادراتنا وإنجازاتنا الرئيسية في مجال الحقوق.'
          }
        },
        {
          id: 'recent',
          title: {
            fr: 'Actualités récentes',
            ar: 'الأخبار الحديثة'
          },
          content: {
            fr: 'Consultez nos dernières activités, projets et engagements en faveur des droits fondamentaux.',
            ar: 'اطلع على آخر أنشطتنا ومشاريعنا والتزاماتنا لصالح الحقوق الأساسية.'
          }
        }
      ]
    };
  }
  
  // For testimonials page, return template with all sections
  if (pageId === 'testimonials') {
    return {
      id: 'testimonials',
      title: { fr: 'Témoignages', ar: 'الشهادات' },
      sections: [
        {
          id: 'intro',
          title: {
            fr: 'Témoignages',
            ar: 'الشهادات'
          },
          content: {
            fr: 'Découvrez ce que nos bénéficiaires, partenaires et volontaires disent de notre travail',
            ar: 'اكتشف ما يقوله المستفيدون وشركاؤنا ومتطوعونا عن عملنا'
          }
        },
        {
          id: 'header',
          title: {
            fr: 'Ce qu\'ils disent de nous',
            ar: 'ما يقولونه عنا'
          },
          content: {
            fr: 'Voici les témoignages de personnes et d\'organisations qui ont bénéficié de nos programmes et collaboré avec nous.',
            ar: 'فيما يلي شهادات من الأشخاص والمنظمات التي استفادت من برامجنا وتعاونت معنا.'
          }
        },
        {
          id: 'categories',
          title: {
            fr: 'Catégories',
            ar: 'الفئات'
          },
          content: {
            fr: 'Tous\nBénéficiaires\nPartenaires\nVolontaires\nExperts',
            ar: 'الكل\nالمستفيدون\nالشركاء\nالمتطوعون\nالخبراء'
          }
        },
        {
          id: 'coming_soon',
          title: {
            fr: 'Témoignages à venir',
            ar: 'شهادات قادمة'
          },
          content: {
            fr: 'Nous sommes en train de recueillir des témoignages de nos bénéficiaires, partenaires et volontaires. Revenez bientôt pour découvrir leurs expériences avec notre fondation.',
            ar: 'نحن نجمع الشهادات من المستفيدين وشركائنا ومتطوعينا. عد قريبًا لاكتشاف تجاربهم مع مؤسستنا.'
          }
        },
        {
          id: 'share',
          title: {
            fr: 'Partagez votre expérience',
            ar: 'شارك تجربتك'
          },
          content: {
            fr: 'Avez-vous participé à l\'un de nos programmes ou collaboré avec nous ? Nous serions ravis d\'entendre votre histoire.',
            ar: 'هل شاركت في أحد برامجنا أو تعاونت معنا؟ يسعدنا سماع قصتك.'
          }
        },
        {
          id: 'form',
          title: {
            fr: 'Formulaire de témoignage',
            ar: 'نموذج الشهادة'
          },
          content: {
            fr: 'Nom complet\nEmail\nOrganisation\nRôle / Fonction\nVotre expérience avec nous\nPartagez votre expérience en détail...\nVotre évaluation\nSoumettre votre témoignage',
            ar: 'الاسم الكامل\nالبريد الإلكتروني\nالمنظمة\nالدور / الوظيفة\nتجربتك معنا\nشارك تجربتك بالتفصيل...\nتقييمك\nإرسال شهادتك'
          }
        }
      ]
    };
  }
  
  // For review page, return template with all sections
  if (pageId === 'review') {
    return {
      id: 'review',
      title: { fr: 'Revue & Publications', ar: 'المراجعة والمنشورات' },
      sections: [
        {
          id: 'intro',
          title: {
            fr: 'Revue & Publications',
            ar: 'المراجعة والمنشورات'
          },
          content: {
            fr: 'Explorez nos analyses et publications sur les droits humains et les enjeux juridiques actuels',
            ar: 'استكشف تحليلاتنا ومنشوراتنا حول حقوق الإنسان والقضايا القانونية الحالية'
          }
        },
        {
          id: 'coming_soon',
          title: {
            fr: 'Notre première revue arrive en juillet 2025 !',
            ar: 'تصدر مجلتنا الأولى في يوليو 2025!'
          },
          content: {
            fr: 'Nous avons le plaisir de vous annoncer que la première édition de notre revue sera publiée en juillet 2025. Cette revue trimestrielle abordera les questions juridiques, les droits humains et les enjeux sociaux actuels.',
            ar: 'يسرنا أن نعلن أن العدد الأول من مجلتنا سيصدر في يوليو 2025. ستتناول هذه المجلة الفصلية القضايا القانونية وحقوق الإنسان والقضايا الاجتماعية الحالية.'
          }
        },
        {
          id: 'contribution',
          title: {
            fr: 'Vous souhaitez contribuer ?',
            ar: 'هل ترغب في المساهمة؟'
          },
          content: {
            fr: 'Nous invitons les chercheurs, juristes, académiciens et experts à contribuer à notre revue. Si vous souhaitez soumettre un article ou partager votre expertise, n\'hésitez pas à nous contacter via notre formulaire de contact ou sur nos réseaux sociaux.',
            ar: 'ندعو الباحثين والمحامين والأكاديميين والخبراء للمساهمة في مجلتنا. إذا كنت ترغب في تقديم مقالة أو مشاركة خبرتك، فلا تتردد في الاتصال بنا من خلال نموذج الاتصال الخاص بنا أو على وسائل التواصل الاجتماعي.'
          }
        },
        {
          id: 'recent_publications',
          title: {
            fr: 'Publications récentes',
            ar: 'المنشورات الحديثة'
          },
          content: {
            fr: 'Découvrez l\'ensemble de nos ressources documentaires sur les droits humains et les questions juridiques.',
            ar: 'اكتشف جميع مواردنا الوثائقية حول حقوق الإنسان والقضايا القانونية.'
          }
        },
        {
          id: 'media_library',
          title: {
            fr: 'Médiathèque',
            ar: 'مكتبة الوسائط'
          },
          content: {
            fr: 'Explorez notre collection de ressources audiovisuelles sur les droits humains.',
            ar: 'استكشف مجموعتنا من الموارد السمعية البصرية حول حقوق الإنسان.'
          }
        },
        {
          id: 'featured',
          title: {
            fr: 'Publication à la une',
            ar: 'المنشور المميز'
          },
          content: {
            fr: 'Notre rapport annuel présente un aperçu complet de l\'état des droits humains en Algérie.\n\nRapport annuel 2023\nMai 2023 | 120 pages\nCe rapport présente un aperçu complet de l\'état des droits humains en Algérie en 2023. Il aborde les avancées et défis dans différents domaines, notamment les libertés civiles, les droits économiques et sociaux, et l\'accès à la justice.',
            ar: 'يقدم تقريرنا السنوي نظرة شاملة عن حالة حقوق الإنسان في الجزائر.\n\nالتقرير السنوي 2023\nمايو 2023 | 120 صفحة\nيقدم هذا التقرير نظرة شاملة عن حالة حقوق الإنسان في الجزائر في عام 2023. ويتناول التقدم والتحديات في مختلف المجالات، بما في ذلك الحريات المدنية والحقوق الاقتصادية والاجتماعية والوصول إلى العدالة.'
          }
        }
      ]
    };
  }
  
  // For resources page, return template with all sections
  if (pageId === 'resources') {
    return {
      id: 'resources',
      title: { fr: 'Ressources', ar: 'الموارد' },
      sections: [
        {
          id: 'intro',
          title: {
            fr: 'Ressources',
            ar: 'الموارد'
          },
          content: {
            fr: 'Découvrez nos ressources pour comprendre et défendre les droits fondamentaux.',
            ar: 'اكتشف مواردنا لفهم الحقوق الأساسية والدفاع عنها.'
          }
        },
        {
          id: 'guides',
          title: {
            fr: 'Guides pratiques',
            ar: 'أدلة عملية'
          },
          content: {
            fr: 'Nos guides expliquent les droits fondamentaux dans un langage accessible à tous. Téléchargez-les gratuitement et partagez-les avec votre entourage.',
            ar: 'توضح أدلتنا الحقوق الأساسية بلغة يسهل فهمها للجميع. قم بتنزيلها مجانًا ومشاركتها مع من حولك.'
          }
        },
        {
          id: 'templates',
          title: {
            fr: 'Modèles de documents',
            ar: 'نماذج المستندات'
          },
          content: {
            fr: 'Utilisez nos modèles pour rédiger des lettres officielles, des plaintes ou des demandes de documentation. Ces modèles vous aideront à structurer vos démarches administratives et juridiques.',
            ar: 'استخدم نماذجنا لكتابة الخطابات الرسمية أو الشكاوى أو طلبات الوثائق. ستساعدك هذه النماذج على هيكلة إجراءاتك الإدارية والقانونية.'
          }
        },
        {
          id: 'reports',
          title: {
            fr: 'Rapports et études',
            ar: 'التقارير والدراسات'
          },
          content: {
            fr: 'Consultez nos rapports et études sur les différentes problématiques liées aux droits fondamentaux, notamment les libertés civiles, l\'accès à la justice et les droits des personnes vulnérables.',
            ar: 'راجع تقاريرنا ودراساتنا حول مختلف القضايا المتعلقة بالحقوق الأساسية، بما في ذلك الحريات المدنية والوصول إلى العدالة وحقوق الفئات الضعيفة.'
          }
        },
        {
          id: 'training',
          title: {
            fr: 'Matériel de formation',
            ar: 'مواد التدريب'
          },
          content: {
            fr: 'Accédez à notre matériel de formation pour approfondir vos connaissances sur les droits. Ces ressources sont particulièrement utiles pour les enseignants, les formateurs et les animateurs d\'ateliers.',
            ar: 'الوصول إلى مواد التدريب الخاصة بنا لتعميق معرفتك بالحقوق. هذه الموارد مفيدة بشكل خاص للمعلمين والمدربين ومنظمي ورش العمل.'
          }
        },
        {
          id: 'multimedia',
          title: {
            fr: 'Ressources multimédias',
            ar: 'موارد الوسائط المتعددة'
          },
          content: {
            fr: 'Explorez notre collection de vidéos, podcasts et infographies sur les droits fondamentaux. Ces ressources sont conçues pour rendre l\'information accessible à tous les publics.',
            ar: 'استكشف مجموعتنا من مقاطع الفيديو والبودكاست والرسوم المعلوماتية حول الحقوق الأساسية. تم تصميم هذه الموارد لجعل المعلومات في متناول جميع الجماهير.'
          }
        }
      ]
    };
  }
  
  // For other pages, return a basic template
  return {
    id: pageId,
    title: defaultTitles[pageId],
    sections: [
      {
        id: '1',
        title: defaultTitles[pageId],
        content: { 
          fr: `Contenu de la page ${defaultTitles[pageId].fr}`, 
          ar: `محتوى صفحة ${defaultTitles[pageId].ar}` 
        }
      }
    ]
  };
};

// Enhanced function to get the exact website content for editing
export const getExactPageContent = (pageId: string): PageContent => {
  // First try to get any editor-specific content
  let content = getItem<PageContent>(`editor_${pageId}`);
  
  // If no editor content exists, get the live content
  if (!content) {
    content = getPageContent(pageId);
    
    // If we found live content, create an editor copy
    if (content) {
      // For home page, ensure all sections are available
      if (pageId === 'home') {
        updateHomePageWithAllSections();
        // Refresh content after update
        content = getPageContent(pageId);
      }
      // For about page, ensure all sections are available
      else if (pageId === 'about') {
        updateAboutPageWithAllSections();
        // Refresh content after update
        content = getPageContent(pageId);
      }
      
      if (content) {
        setItem(`editor_${pageId}`, content);
      }
    } else {
      // If no content exists at all, create default content
      content = createDefaultPageContent(pageId);
      
      if (content) {
        // Save the default content to both editor and live versions
        setItem(`editor_${pageId}`, content);
        setItem(`page_${pageId}`, content);
        
        // For special pages that need all sections
        if (pageId === 'home') {
          updateHomePageWithAllSections();
          content = getPageContent(pageId);
        }
        else if (pageId === 'about') {
          updateAboutPageWithAllSections();
          content = getPageContent(pageId);
        }
      }
    }
  }
  
  // Ensure we always return a valid content object to prevent errors
  if (!content) {
    console.warn(`No content found for ${pageId}, creating default empty content`);
    
    const defaultTitle = { 
      fr: pageId.charAt(0).toUpperCase() + pageId.slice(1), 
      ar: pageId 
    };
    
    content = {
      id: pageId,
      title: defaultTitle,
      sections: [
        {
          id: 'intro',
          title: defaultTitle,
          content: { 
            fr: `Contenu de la page ${defaultTitle.fr}`, 
            ar: `محتوى صفحة ${defaultTitle.ar}` 
          }
        }
      ]
    };
    
    // Save this default content to avoid future issues
    setItem(`editor_${pageId}`, content);
    setItem(`page_${pageId}`, content);
  }
  
  // Ensure sections is always an array and that all sections have titles
  if (!content.sections) {
    content.sections = [];
  }
  
  // Make sure all sections have their title property defined
  content.sections = content.sections.map(section => {
    // If section is missing title property, add a default one
    if (!section.title) {
      section.title = { 
        fr: section.id.charAt(0).toUpperCase() + section.id.slice(1).replace(/_/g, ' '), 
        ar: section.id 
      };
    }
    return section;
  });
  
  // Make sure the content has a valid title
  if (!content.title || !content.title.fr || !content.title.ar) {
    content.title = { 
      fr: pageId.charAt(0).toUpperCase() + pageId.slice(1), 
      ar: pageId 
    };
  }
  
  return content;
};

// Enhanced initialize database function to capture the exact website structure
export const initializeDatabase = () => {
  // Check if database was already initialized
  if (localStorage.getItem('dbInitialized')) {
    return;
  }

  // Initialize website structure
  const websiteStructure: WebsiteStructure = {
    pages: ['home', 'about', 'programs', 'news', 'resources', 'contact', 'testimonials', 'review'],
    mainMenu: [
      {
        id: 'home',
        title: { fr: 'Accueil', ar: 'الرئيسية' },
        href: '/'
      },
      {
        id: 'about',
        title: { fr: 'À Propos', ar: 'من نحن' },
        href: '/about'
      },
      {
        id: 'programs',
        title: { fr: 'Programmes', ar: 'البرامج' },
        href: '/programs'
      },
      {
        id: 'news',
        title: { fr: 'Actualités', ar: 'الأخبار' },
        href: '/news'
      },
      {
        id: 'resources',
        title: { fr: 'Ressources', ar: 'الموارد' },
        href: '/resources'
      },
      {
        id: 'review',
        title: { fr: 'Revue & Publications', ar: 'المراجعة والمنشورات' },
        href: '/review'
      },
      {
        id: 'testimonials',
        title: { fr: 'Témoignages', ar: 'الشهادات' },
        href: '/testimonials'
      },
      {
        id: 'contact',
        title: { fr: 'Contact', ar: 'اتصل بنا' },
        href: '/contact'
      }
    ],
    footer: [
      {
        id: 'about',
        title: { fr: 'À propos de nous', ar: 'عن المؤسسة' },
        content: { 
          fr: 'La Fondation pour la promotion des droits est une organisation indépendante dédiée à la promotion et la protection des droits fondamentaux.', 
          ar: 'المؤسسة من اجل ترقية الحقوق هي منظمة مستقلة مكرسة لتعزيز وحماية الحقوق الأساسية.'
        }
      },
      {
        id: 'links',
        title: { fr: 'Liens rapides', ar: 'روابط سريعة' },
        links: [
          { text: { fr: 'Accueil', ar: 'الرئيسية' }, href: '/' },
          { text: { fr: 'À Propos', ar: 'من نحن' }, href: '/about' },
          { text: { fr: 'Programmes', ar: 'البرامج' }, href: '/programs' },
          { text: { fr: 'Actualités', ar: 'الأخبار' }, href: '/news' },
          { text: { fr: 'Ressources', ar: 'الموارد' }, href: '/resources' },
          { text: { fr: 'Revue & Publications', ar: 'المراجعة والمنشورات' }, href: '/review' },
          { text: { fr: 'Témoignages', ar: 'الشهادات' }, href: '/testimonials' },
          { text: { fr: 'Contact', ar: 'اتصل بنا' }, href: '/contact' }
        ]
      },
      {
        id: 'contact',
        title: { fr: 'Contact', ar: 'اتصل بنا' },
        content: { 
          fr: 'Email: contact@fondation-droits.org\nAdresse: Alger, Algérie', 
          ar: 'البريد الإلكتروني: contact@fondation-droits.org\nالعنوان: الجزائر، الجزائر'
        }
      }
    ]
  };

  // Store website structure
  setItem('websiteStructure', websiteStructure);

  // Initialize global content
  const globalContent: GlobalContent[] = [
    // Common buttons
    {
      id: 'btn_read_more',
      category: 'buttons',
      key: 'read_more',
      text: { fr: 'Lire la suite', ar: 'قراءة المزيد' }
    },
    {
      id: 'btn_submit',
      category: 'buttons',
      key: 'submit',
      text: { fr: 'Soumettre', ar: 'إرسال' }
    },
    {
      id: 'btn_download',
      category: 'buttons',
      key: 'download',
      text: { fr: 'Télécharger', ar: 'تحميل' }
    },
    {
      id: 'btn_search',
      category: 'buttons',
      key: 'search',
      text: { fr: 'Rechercher', ar: 'بحث' }
    },
    {
      id: 'btn_subscribe',
      category: 'buttons',
      key: 'subscribe',
      text: { fr: 'S\'abonner', ar: 'اشتراك' }
    },
    
    // Navigation
    {
      id: 'nav_prev',
      category: 'navigation',
      key: 'previous',
      text: { fr: 'Précédent', ar: 'السابق' }
    },
    {
      id: 'nav_next',
      category: 'navigation',
      key: 'next',
      text: { fr: 'Suivant', ar: 'التالي' }
    },
    {
      id: 'nav_back',
      category: 'navigation',
      key: 'back',
      text: { fr: 'Retour', ar: 'رجوع' }
    },
    
    // Common labels
    {
      id: 'label_name',
      category: 'labels',
      key: 'name',
      text: { fr: 'Nom', ar: 'الاسم' }
    },
    {
      id: 'label_email',
      category: 'labels',
      key: 'email',
      text: { fr: 'Email', ar: 'البريد الإلكتروني' }
    },
    {
      id: 'label_phone',
      category: 'labels',
      key: 'phone',
      text: { fr: 'Téléphone', ar: 'الهاتف' }
    },
    {
      id: 'label_message',
      category: 'labels',
      key: 'message',
      text: { fr: 'Message', ar: 'الرسالة' }
    },
    {
      id: 'label_date',
      category: 'labels',
      key: 'date',
      text: { fr: 'Date', ar: 'التاريخ' }
    },
    {
      id: 'label_author',
      category: 'labels',
      key: 'author',
      text: { fr: 'Auteur', ar: 'الكاتب' }
    },
    {
      id: 'label_category',
      category: 'labels',
      key: 'category',
      text: { fr: 'Catégorie', ar: 'الفئة' }
    },
    
    // Error messages
    {
      id: 'error_required',
      category: 'errors',
      key: 'required',
      text: { fr: 'Ce champ est requis', ar: 'هذا الحقل مطلوب' }
    },
    {
      id: 'error_invalid_email',
      category: 'errors',
      key: 'invalid_email',
      text: { fr: 'Email invalide', ar: 'البريد الإلكتروني غير صالح' }
    },
    
    // Success messages
    {
      id: 'success_contact_sent',
      category: 'success',
      key: 'contact_sent',
      text: { fr: 'Votre message a été envoyé avec succès', ar: 'تم إرسال رسالتك بنجاح' }
    },
    
    // Section titles
    {
      id: 'section_recent_news',
      category: 'sections',
      key: 'recent_news',
      text: { fr: 'Actualités récentes', ar: 'آخر الأخبار' }
    },
    {
      id: 'section_featured_resources',
      category: 'sections',
      key: 'featured_resources',
      text: { fr: 'Ressources en vedette', ar: 'موارد مميزة' }
    },
    {
      id: 'section_testimonials',
      category: 'sections',
      key: 'testimonials',
      text: { fr: 'Témoignages', ar: 'شهادات' }
    },
    {
      id: 'section_partners',
      category: 'sections',
      key: 'partners',
      text: { fr: 'Nos partenaires', ar: 'شركاؤنا' }
    },
    
    // Social media
    {
      id: 'social_follow',
      category: 'social',
      key: 'follow_us',
      text: { fr: 'Suivez-nous', ar: 'تابعنا' }
    },
    {
      id: 'social_share',
      category: 'social',
      key: 'share',
      text: { fr: 'Partager', ar: 'مشاركة' }
    },
    
    // Common images with alt texts
    {
      id: 'img_logo',
      category: 'images',
      key: 'logo',
      text: { fr: 'Logo de la Fondation', ar: 'شعار المؤسسة' },
      image: '/images/logo.png'
    },
    {
      id: 'img_banner',
      category: 'images',
      key: 'banner',
      text: { fr: 'Bannière principale', ar: 'الشعار الرئيسي' },
      image: '/images/hero-background.jpg'
    }
  ];
  
  // Save global content
  setGlobalContent(globalContent);
  setItem('editor_global_content', globalContent);

  // Initialize media library
  const mediaLibrary: MediaItem[] = [
    {
      id: 'media_1',
      name: 'Hero Background',
      path: '/images/hero-background.jpg',
      url: '/images/hero-background.jpg',
      type: 'image',
      alt: { fr: 'Arrière-plan de la bannière principale', ar: 'خلفية البانر الرئيسي' },
      tags: ['hero', 'banner', 'background'],
      uploadDate: new Date().toISOString().split('T')[0]
    },
    {
      id: 'media_2',
      name: 'Droits Egaux',
      path: '/images/droits-egaux.jpg',
      url: '/images/droits-egaux.jpg',
      type: 'image',
      alt: { fr: 'Droits égaux pour tous', ar: 'حقوق متساوية للجميع' },
      tags: ['rights', 'equality'],
      uploadDate: new Date().toISOString().split('T')[0]
    },
    {
      id: 'media_3',
      name: 'Justice Law Scales',
      path: '/images/law/justice-law-scales.jpg',
      url: '/images/law/justice-law-scales.jpg',
      type: 'image',
      alt: { fr: 'Balance de la justice', ar: 'ميزان العدالة' },
      tags: ['justice', 'law'],
      uploadDate: new Date().toISOString().split('T')[0]
    },
    {
      id: 'media_4',
      name: 'Research Program',
      path: '/images/programs/research.jpg',
      url: '/images/programs/research.jpg',
      type: 'image',
      alt: { fr: 'Programme de recherche', ar: 'برنامج البحث' },
      tags: ['programs', 'research'],
      uploadDate: new Date().toISOString().split('T')[0]
    },
    {
      id: 'media_5',
      name: 'Training Program',
      path: '/images/programs/training.jpg',
      url: '/images/programs/training.jpg',
      type: 'image',
      alt: { fr: 'Programme de formation', ar: 'برنامج التدريب' },
      tags: ['programs', 'training'],
      uploadDate: new Date().toISOString().split('T')[0]
    },
    {
      id: 'media_6',
      name: 'Advocacy Program',
      path: '/images/programs/advocacy.jpg',
      url: '/images/programs/advocacy.jpg',
      type: 'image',
      alt: { fr: 'Programme de plaidoyer', ar: 'برنامج المناصرة' },
      tags: ['programs', 'advocacy'],
      uploadDate: new Date().toISOString().split('T')[0]
    }
  ];
  
  // Save media library
  setMediaLibrary(mediaLibrary);
  setItem('editor_media_library', mediaLibrary);

  // Initialize home page content with the exact same content as the website
  const homePageContent: PageContent = {
    id: 'home',
    title: {
      fr: 'Accueil',
      ar: 'الرئيسية'
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
        },
        image: '/images/hero-background.jpg'
      },
      {
        id: 'slogan',
        title: {
          fr: 'Notre slogan',
          ar: 'شعارنا'
        },
        content: {
          fr: 'Ensemble, pour des droits connus, reconnus et défendus.',
          ar: 'معاً، من أجل حقوق معروفة ومعترف بها ومحمية.'
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
        },
        image: '/images/droits-egaux.jpg'
      },
      {
        id: 'droits_egaux',
        title: {
          fr: 'Droits égaux',
          ar: 'حقوق متساوية'
        },
        content: {
          fr: '"La dignité humaine n\'est pas un privilège accordé par l\'État, mais un droit inhérent à chaque individu."',
          ar: '"الكرامة الإنسانية ليست امتيازاً تمنحه الدولة، بل هي حق متأصل في كل فرد."'
        }
      },
      {
        id: 'objectives',
        title: {
          fr: 'Nos objectifs',
          ar: 'أهدافنا'
        },
        content: {
          fr: 'La Fondation pour la promotion des droits poursuit les objectifs suivants pour concrétiser sa vision d\'une société juste et respectueuse des droits fondamentaux.',
          ar: 'تسعى المؤسسة من اجل ترقية الحقوق لتحقيق الأهداف التالية لتجسيد رؤيتها لمجتمع عادل يحترم الحقوق الأساسية.'
        }
      },
      {
        id: 'impact',
        title: {
          fr: 'Notre Impact',
          ar: 'تأثيرنا'
        },
        content: {
          fr: '38+ Formations\n760+ Bénéficiaires\n25+ Partenaires\n\nLes chiffres qui reflètent notre engagement et notre impact dans la promotion et la défense des droits.',
          ar: '+38 تدريب\n+760 مستفيد\n+25 شريك\n\nالأرقام التي تعكس التزامنا وتأثيرنا في تعزيز والدفاع عن الحقوق.'
        }
      },
      {
        id: 'actualites',
        title: {
          fr: 'Actualités Récentes',
          ar: 'آخر الأخبار'
        },
        content: {
          fr: 'Découvrez les dernières informations sur nos activités, projets et engagements.',
          ar: 'اكتشف أحدث المعلومات حول أنشطتنا ومشاريعنا والتزاماتنا.'
        }
      },
      {
        id: 'objectifs_details',
        title: {
          fr: 'Détails de nos objectifs',
          ar: 'تفاصيل أهدافنا'
        },
        content: {
          fr: 'Formations et recherches: Organiser des formations continues et des forums et réaliser des recherches et des études dans le domaine de la promotion des droits.\n\nSensibilisation et médias: Réaliser toute activité de sensibilisation et médiatique liée à la promotion des droits pour informer et éduquer le public.\n\nConstruction d\'un État de droit: Contribuer et œuvrer à la construction d\'un État de droit en exhortant les citoyens à s\'engager à faire appliquer et respecter la loi et à promouvoir les droits.',
          ar: 'التدريب والبحث: تنظيم دورات تدريبية مستمرة ومنتديات وإجراء بحوث ودراسات في مجال تعزيز الحقوق.\n\nالتوعية والإعلام: تنفيذ جميع أنشطة التوعية والإعلام المتعلقة بتعزيز الحقوق لإعلام وتثقيف الجمهور.\n\nبناء دولة القانون: المساهمة والعمل على بناء دولة القانون من خلال حث المواطنين على الالتزام بتطبيق واحترام القانون وتعزيز الحقوق.'
          }
        },
        {
          id: 'mission_details',
          title: {
            fr: 'Détails de notre mission',
            ar: 'تفاصيل مهمتنا'
          },
          content: {
            fr: 'Promotion des principes démocratiques et de l\'état de droit\nProtection des droits des populations vulnérables\nÉducation et sensibilisation aux droits\nRenforcement des capacités de la société civile',
            ar: 'تعزيز المبادئ الديمقراطية وسيادة القانون\nحماية حقوق الفئات الضعيفة\nالتعليم والتوعية بالحقوق\nتعزيز قدرات المجتمع المدني'
          }
        },
        {
          id: 'programmes',
          title: {
            fr: 'Nos Programmes',
            ar: 'برامجنا'
          },
          content: {
            fr: 'Découvrez les différents programmes à travers lesquels nous travaillons pour promouvoir et protéger les droits fondamentaux.\n\nÉducation aux droits: Sensibilisation et formation aux principes des droits fondamentaux pour différents publics.\n\nAssistance juridique: Soutien juridique aux individus et organisations dans la défense de leurs droits.\n\nPlaidoyer: Actions de plaidoyer auprès des décideurs pour l\'amélioration des politiques liées aux droits.',
            ar: 'اكتشف البرامج المختلفة التي نعمل من خلالها على تعزيز وحماية الحقوق الأساسية.\n\nالتثقيف بالحقوق: التوعية والتدريب على مبادئ الحقوق الأساسية لمختلف الجماهير.\n\nالمساعدة القانونية: الدعم القانوني للأفراد والمنظمات في الدفاع عن حقوقهم.\n\nالمناصرة: أنشطة المناصرة مع صناع القرار لتحسين السياسات المتعلقة بالحقوق.'
          }
        },
        {
          id: 'identite_visuelle',
          title: {
            fr: 'Notre identité visuelle',
            ar: 'هويتنا البصرية'
          },
          content: {
            fr: 'Notre identité visuelle reflète nos valeurs d\'équilibre, de durabilité et d\'action positive. Les couleurs de notre logo représentent notre engagement envers ces principes.\n\nTurquoise: R60 / V180 / B150 #3cb496\nOrange: R243 / V146 / B7 #f39207',
            ar: 'تعكس هويتنا البصرية قيمنا المتمثلة في التوازن والاستدامة والعمل الإيجابي. تمثل ألوان شعارنا التزامنا بهذه المبادئ.\n\nتركواز: R60 / V180 / B150 #3cb496\nبرتقالي: R243 / V146 / B7 #f39207'
          }
        },
        {
          id: 'newsletter',
          title: {
            fr: 'Restez informé(e)',
            ar: 'ابق على اطلاع'
          },
          content: {
            fr: 'Inscrivez-vous à notre newsletter pour recevoir les dernières actualités, publications et événements de la Fondation pour la promotion des droits.',
            ar: 'اشترك في نشرتنا الإخبارية لتلقي آخر الأخبار والمنشورات والفعاليات من المؤسسة من اجل ترقية الحقوق.'
          }
        }
      ]
    };

  // Initialize about page content
  const aboutPageContent: PageContent = {
    id: 'about',
    title: {
      fr: 'À propos de la Fondation',
      ar: 'حول المؤسسة'
    },
    sections: [
      {
        id: 'mission',
        title: {
          fr: 'Notre mission',
          ar: 'مهمتنا'
        },
        content: {
          fr: 'Notre mission principale est de contribuer à la construction d\'un État de droit solide et inclusif. Pour cela, nous mettons en place des actions de plaidoyer, des campagnes de sensibilisation, des formations juridiques et des programmes d\'éducation civique. Nous exhortons les citoyennes et citoyens à s\'engager activement, à faire respecter la loi et à défendre leurs droits avec responsabilité et solidarité.',
          ar: 'مهمتنا هي تعزيز والدفاع عن الحقوق من خلال التوعية والتدريب وتوثيق الانتهاكات ودعم الفاعلين في المجتمع المدني.'
        }
      },
      {
        id: 'vision',
        title: {
          fr: 'Notre vision',
          ar: 'رؤيتنا'
        },
        content: {
          fr: '"Contribuer à l\'édification d\'une société où la dignité humaine est respectée et où les droits sont garantis pour tous, sans discrimination."',
          ar: '"المساهمة في بناء مجتمع تُحترم فيه كرامة الإنسان وتُضمن فيه الحقوق للجميع، دون تمييز."'
        }
      },
      {
        id: 'justice',
        title: {
          fr: 'Justice et Droits',
          ar: 'العدالة والحقوق'
        },
        content: {
          fr: 'Face aux défis, nous restons engagés et mobilisés pour faire avancer la justice et promouvoir le respect des droits fondamentaux.',
          ar: 'في مواجهة التحديات، نبقى ملتزمين ومجندين لدفع العدالة وتعزيز احترام الحقوق الأساسية.'
        },
        image: '/images/law/justice-law-scales.jpg'
      },
      {
        id: 'objectives',
        title: {
          fr: 'Nos objectifs',
          ar: 'أهدافنا'
        },
        content: {
          fr: 'La Fondation pour la promotion des droits poursuit les objectifs suivants pour concrétiser sa vision d\'une société juste et respectueuse des droits fondamentaux.',
          ar: 'تسعى المؤسسة من اجل ترقية الحقوق لتحقيق الأهداف التالية لتجسيد رؤيتها لمجتمع عادل يحترم الحقوق الأساسية.'
        }
      },
      {
        id: 'target_audience',
        title: {
          fr: 'Notre public cible',
          ar: 'جمهورنا المستهدف'
        },
        content: {
          fr: 'Nos actions et programmes sont conçus pour répondre aux besoins spécifiques de différentes catégories de personnes concernées par les droits humains.',
          ar: 'تم تصميم إجراءاتنا وبرامجنا لتلبية الاحتياجات المحددة لمختلف فئات الأشخاص المعنيين بحقوق الإنسان.'
        }
      },
      {
        id: 'history',
        title: {
          fr: 'Notre histoire',
          ar: 'تاريخنا'
        },
        content: {
          fr: 'Notre histoire est avant tout celle d\'un engagement collectif. Face aux défis persistants liés au respect des droits fondamentaux, nous avons choisi d\'unir nos expertises et nos convictions pour créer une structure indépendante, transparente et active. Depuis sa création, la Fondation œuvre pour renforcer la culture des droits humains, sensibiliser les citoyennes et citoyens à leurs droits et devoirs, et promouvoir une société fondée sur la loi, la justice et l\'égalité.',
          ar: 'تاريخنا هو قبل كل شيء تاريخ التزام جماعي. في مواجهة التحديات المستمرة المرتبطة باحترام الحقوق الأساسية، اخترنا توحيد خبراتنا وقناعاتنا لإنشاء هيكل مستقل وشفاف ونشط.'
        }
      }
    ]
  };

  // Initialize programs page content
  const programsPageContent: PageContent = {
    id: 'programs',
    title: {
      fr: 'Nos Programmes',
      ar: 'برامجنا'
    },
    sections: [
      {
        id: 'intro',
        title: {
          fr: 'Nos Programmes',
          ar: 'برامجنا'
        },
        content: {
          fr: 'Découvrez les différents programmes à travers lesquels nous travaillons pour promouvoir et protéger les droits fondamentaux.',
          ar: 'اكتشف البرامج المختلفة التي نعمل من خلالها على تعزيز وحماية الحقوق الأساسية.'
        }
      },
      {
        id: 'research',
        title: {
          fr: 'Recherche & Documentation',
          ar: 'البحث والتوثيق'
        },
        content: {
          fr: 'Notre programme de recherche documente systématiquement les situations des droits humains et mène des études sur les questions liées aux droits pour informer le plaidoyer et le développement des politiques.',
          ar: 'يوثق برنامج البحث لدينا بشكل منهجي حالات حقوق الإنسان ويجري دراسات حول القضايا المتعلقة بالحقوق لإثراء المناصرة وتطوير السياسات.'
        },
        image: '/images/programs/research.jpg'
      },
      {
        id: 'training',
        title: {
          fr: 'Formation & Éducation',
          ar: 'التدريب والتعليم'
        },
        content: {
          fr: 'Nous renforçons les compétences des défenseurs des droits, des organisations de la société civile et du grand public grâce à des ateliers, des formations et des ressources éducatives.',
          ar: 'نقوم بتعزيز مهارات المدافعين عن الحقوق والمنظمات المجتمعية والجمهور العام من خلال ورش العمل والتدريبات والموارد التعليمية.'
        },
        image: '/images/programs/training.jpg'
      },
      {
        id: 'advocacy',
        title: {
          fr: 'Plaidoyer & Campagnes',
          ar: 'المناصرة والحملات'
        },
        content: {
          fr: 'Nous défendons des changements systémiques en engageant les décideurs politiques, en sensibilisant le public et en mobilisant des actions collectives pour les droits fondamentaux.',
          ar: 'ندافع عن التغييرات المنهجية من خلال إشراك صناع السياسات ورفع الوعي العام وتعبئة العمل الجماعي للحقوق الأساسية.'
        },
        image: '/images/programs/advocacy.jpg'
      }
    ]
  };

  // Initialize testimonials page content
  const testimonialsPageContent: PageContent = {
    id: 'testimonials',
    title: { fr: 'Témoignages', ar: 'الشهادات' },
    sections: [
      {
        id: 'intro',
        title: {
          fr: 'Témoignages',
          ar: 'الشهادات'
        },
        content: {
          fr: 'Découvrez ce que nos bénéficiaires, partenaires et volontaires disent de notre travail',
          ar: 'اكتشف ما يقوله المستفيدون وشركاؤنا ومتطوعونا عن عملنا'
        }
      },
      {
        id: 'header',
        title: {
          fr: 'Ce qu\'ils disent de nous',
          ar: 'ما يقولونه عنا'
        },
        content: {
          fr: 'Voici les témoignages de personnes et d\'organisations qui ont bénéficié de nos programmes et collaboré avec nous.',
          ar: 'فيما يلي شهادات من الأشخاص والمنظمات التي استفادت من برامجنا وتعاونت معنا.'
        }
      },
      {
        id: 'categories',
        title: {
          fr: 'Catégories',
          ar: 'الفئات'
        },
        content: {
          fr: 'Tous\nBénéficiaires\nPartenaires\nVolontaires\nExperts',
          ar: 'الكل\nالمستفيدون\nالشركاء\nالمتطوعون\nالخبراء'
        }
      },
      {
        id: 'coming_soon',
        title: {
          fr: 'Témoignages à venir',
          ar: 'شهادات قادمة'
        },
        content: {
          fr: 'Nous sommes en train de recueillir des témoignages de nos bénéficiaires, partenaires et volontaires. Revenez bientôt pour découvrir leurs expériences avec notre fondation.',
          ar: 'نحن نجمع الشهادات من المستفيدين وشركائنا ومتطوعينا. عد قريبًا لاكتشاف تجاربهم مع مؤسستنا.'
        }
      },
      {
        id: 'share',
        title: {
          fr: 'Partagez votre expérience',
          ar: 'شارك تجربتك'
        },
        content: {
          fr: 'Avez-vous participé à l\'un de nos programmes ou collaboré avec nous ? Nous serions ravis d\'entendre votre histoire.',
          ar: 'هل شاركت في أحد برامجنا أو تعاونت معنا؟ يسعدنا سماع قصتك.'
        }
      },
      {
        id: 'form',
        title: {
          fr: 'Formulaire de témoignage',
          ar: 'نموذج الشهادة'
        },
        content: {
          fr: 'Nom complet\nEmail\nOrganisation\nRôle / Fonction\nVotre expérience avec nous\nPartagez votre expérience en détail...\nVotre évaluation\nSoumettre votre témoignage',
          ar: 'الاسم الكامل\nالبريد الإلكتروني\nالمنظمة\nالدور / الوظيفة\nتجربتك معنا\nشارك تجربتك بالتفصيل...\nتقييمك\nإرسال شهادتك'
        }
      }
    ]
  };
  
  // Initialize review page content
  const reviewPageContent: PageContent = {
    id: 'review',
    title: { fr: 'Revue & Publications', ar: 'المراجعة والمنشورات' },
    sections: [
      {
        id: 'intro',
        title: {
          fr: 'Revue & Publications',
          ar: 'المراجعة والمنشورات'
        },
        content: {
          fr: 'Explorez nos analyses et publications sur les droits humains et les enjeux juridiques actuels',
          ar: 'استكشف تحليلاتنا ومنشوراتنا حول حقوق الإنسان والقضايا القانونية الحالية'
        }
      },
      {
        id: 'coming_soon',
        title: {
          fr: 'Notre première revue arrive en juillet 2025 !',
          ar: 'تصدر مجلتنا الأولى في يوليو 2025!'
        },
        content: {
          fr: 'Nous avons le plaisir de vous annoncer que la première édition de notre revue sera publiée en juillet 2025. Cette revue trimestrielle abordera les questions juridiques, les droits humains et les enjeux sociaux actuels.',
          ar: 'يسرنا أن نعلن أن العدد الأول من مجلتنا سيصدر في يوليو 2025. ستتناول هذه المجلة الفصلية القضايا القانونية وحقوق الإنسان والقضايا الاجتماعية الحالية.'
        }
      },
      {
        id: 'contribution',
        title: {
          fr: 'Vous souhaitez contribuer ?',
          ar: 'هل ترغب في المساهمة؟'
        },
        content: {
          fr: 'Nous invitons les chercheurs, juristes, académiciens et experts à contribuer à notre revue. Si vous souhaitez soumettre un article ou partager votre expertise, n\'hésitez pas à nous contacter via notre formulaire de contact ou sur nos réseaux sociaux.',
          ar: 'ندعو الباحثين والمحامين والأكاديميين والخبراء للمساهمة في مجلتنا. إذا كنت ترغب في تقديم مقالة أو مشاركة خبرتك، فلا تتردد في الاتصال بنا من خلال نموذج الاتصال الخاص بنا أو على وسائل التواصل الاجتماعي.'
        }
      },
      {
        id: 'recent_publications',
        title: {
          fr: 'Publications récentes',
          ar: 'المنشورات الحديثة'
        },
        content: {
          fr: 'Découvrez l\'ensemble de nos ressources documentaires sur les droits humains et les questions juridiques.',
          ar: 'اكتشف جميع مواردنا الوثائقية حول حقوق الإنسان والقضايا القانونية.'
        }
      },
      {
        id: 'media_library',
        title: {
          fr: 'Médiathèque',
          ar: 'مكتبة الوسائط'
        },
        content: {
          fr: 'Explorez notre collection de ressources audiovisuelles sur les droits humains.',
          ar: 'استكشف مجموعتنا من الموارد السمعية البصرية حول حقوق الإنسان.'
        }
      },
      {
        id: 'featured',
        title: {
          fr: 'Publication à la une',
          ar: 'المنشور المميز'
        },
        content: {
          fr: 'Notre rapport annuel présente un aperçu complet de l\'état des droits humains en Algérie.\n\nRapport annuel 2023\nMai 2023 | 120 pages\nCe rapport présente un aperçu complet de l\'état des droits humains en Algérie en 2023. Il aborde les avancées et défis dans différents domaines, notamment les libertés civiles, les droits économiques et sociaux, et l\'accès à la justice.',
            ar: 'يقدم تقريرنا السنوي نظرة شاملة عن حالة حقوق الإنسان في الجزائر.\n\nالتقرير السنوي 2023\nمايو 2023 | 120 صفحة\nيقدم هذا التقرير نظرة شاملة عن حالة حقوق الإنسان في الجزائر في عام 2023. ويتناول التقدم والتحديات في مختلف المجالات، بما في ذلك الحريات المدنية والحقوق الاقتصادية والاجتماعية والوصول إلى العدالة.'
          }
        }
      ]
    };

  // Initialize contact page content
  const contactPageContent: PageContent = {
    id: 'contact',
    title: {
      fr: 'Contactez-nous',
      ar: 'اتصل بنا'
    },
    sections: [
      {
        id: 'contact_info',
        title: {
          fr: 'Contactez-nous',
          ar: 'اتصل بنا'
        },
        content: {
          fr: 'Email: contact@fondation-droits.org\nAdresse: Alger, Algérie',
          ar: 'البريد الإلكتروني: contact@fondation-droits.org\nالعنوان: الجزائر، الجزائر'
        }
      },
      {
        id: 'address',
        title: {
          fr: 'Notre Bureau',
          ar: 'مكتبنا'
        },
        content: {
          fr: 'Alger, Algérie',
          ar: 'الجزائر، الجزائر'
        }
      },
      {
        id: 'email',
        title: {
          fr: 'Email',
          ar: 'البريد الإلكتروني'
        },
        content: {
          fr: 'contact@fondation-droits.org',
          ar: 'contact@fondation-droits.org'
        }
      },
      {
        id: 'phone',
        title: {
          fr: 'Téléphone',
          ar: 'الهاتف'
        },
        content: {
          fr: '00213 560 66 71 20',
          ar: '00213 560 66 71 20'
        }
      },
      {
        id: 'hours',
        title: {
          fr: 'Heures d\'ouverture',
          ar: 'ساعات العمل'
        },
        content: {
          fr: 'Lundi - Vendredi: 9h00 - 17h00',
          ar: 'الاثنين - الجمعة: 9:00 - 17:00'
        }
      }
    ]
  };

  // Save the page content
  if (typeof window !== 'undefined') {
    // Déclaration des variables pour éviter les erreurs de référence
    const homePageContent = createDefaultPageContent('home');
    const aboutPageContent = createDefaultPageContent('about');
    const programsPageContent = createDefaultPageContent('programs');
    const testimonialsPageContent = createDefaultPageContent('testimonials');
    const reviewPageContent = createDefaultPageContent('review');
    
    if (homePageContent) setPageContent(homePageContent);
    if (aboutPageContent) setPageContent(aboutPageContent);
    if (programsPageContent) setPageContent(programsPageContent);
    if (contactPageContent) setPageContent(contactPageContent);
    if (testimonialsPageContent) setPageContent(testimonialsPageContent);
    if (reviewPageContent) setPageContent(reviewPageContent);

    // Create editor copies
    if (homePageContent) setItem('editor_home', homePageContent);
    if (aboutPageContent) setItem('editor_about', aboutPageContent);
    if (programsPageContent) setItem('editor_programs', programsPageContent);
    if (contactPageContent) setItem('editor_contact', contactPageContent);
    if (testimonialsPageContent) setItem('editor_testimonials', testimonialsPageContent);
    if (reviewPageContent) setItem('editor_review', reviewPageContent);
  }

  // Mark database as initialized
  localStorage.setItem('dbInitialized', 'true');
};

// Call initialize function when on client side
if (typeof window !== 'undefined') {
  // Check if we've already initialized
  if (!localStorage.getItem('dbInitialized')) {
    initializeDatabase();
    localStorage.setItem('dbInitialized', 'true');
  }
  
  // Check if we need to update the home page with all sections
  updateHomePageWithAllSections();
} 