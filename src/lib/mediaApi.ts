import { MediaItem } from './database';

// Initial media data
export const initialMedia: MediaItem[] = [
  {
    id: '1',
    title: {
      fr: 'Conférence sur les droits numériques',
      ar: 'مؤتمر حول الحقوق الرقمية'
    },
    description: {
      fr: 'Photos de la conférence sur les droits numériques organisée par la Fondation à Alger en mai 2023.',
      ar: 'صور من مؤتمر الحقوق الرقمية الذي نظمته المؤسسة في الجزائر في مايو 2023.'
    },
    type: 'image',
    url: '/images/media/digital-rights-conference.jpg',
    thumbnailUrl: '/images/media/thumbnails/digital-rights-conference.jpg',
    date: '2023-05-10',
    category: 'Événements',
    tags: ['droits numériques', 'conférence', 'protection des données']
  },
  {
    id: '2',
    title: {
      fr: 'Formation sur les droits fondamentaux',
      ar: 'تدريب على الحقوق الأساسية'
    },
    description: {
      fr: 'Séance de formation sur les mécanismes de protection des droits humains pour les acteurs de la société civile.',
      ar: 'جلسة تدريبية حول آليات حماية حقوق الإنسان لفاعلي المجتمع المدني.'
    },
    type: 'image',
    url: '/images/media/training-session.jpg',
    thumbnailUrl: '/images/media/thumbnails/training-session.jpg',
    date: '2023-08-25',
    category: 'Formation',
    tags: ['formation', 'société civile', 'droits humains']
  },
  {
    id: '3',
    title: {
      fr: 'Interview avec Dr. Ahmed Benali',
      ar: 'مقابلة مع د. أحمد بن علي'
    },
    description: {
      fr: 'Entretien vidéo avec le président de la Fondation sur les défis actuels en matière de droits humains en Algérie.',
      ar: 'مقابلة فيديو مع رئيس المؤسسة حول التحديات الحالية في مجال حقوق الإنسان في الجزائر.'
    },
    type: 'video',
    url: 'https://www.youtube.com/embed/ne8ZEXcXa6A',
    thumbnailUrl: '/images/media/thumbnails/ahmed-benali-interview.jpg',
    date: '2023-07-12',
    category: 'Interviews',
    tags: ['interview', 'défis', 'droits humains']
  },
  {
    id: '4',
    title: {
      fr: 'Guide pratique sur l\'accès à la justice',
      ar: 'دليل عملي حول الوصول إلى العدالة'
    },
    description: {
      fr: 'Guide pratique pour aider les citoyens à mieux comprendre et naviguer dans le système judiciaire.',
      ar: 'دليل عملي لمساعدة المواطنين على فهم النظام القضائي والتنقل فيه بشكل أفضل.'
    },
    type: 'document',
    url: '/documents/guide-acces-justice.pdf',
    thumbnailUrl: '/images/media/thumbnails/justice-guide.jpg',
    date: '2023-06-20',
    category: 'Publications',
    tags: ['guide', 'justice', 'accès']
  },
  {
    id: '5',
    title: {
      fr: 'Table ronde sur les réformes juridiques',
      ar: 'طاولة مستديرة حول الإصلاحات القانونية'
    },
    description: {
      fr: 'Photos de la table ronde organisée par la Fondation sur les réformes juridiques nécessaires pour renforcer la protection des droits fondamentaux.',
      ar: 'صور من الطاولة المستديرة التي نظمتها المؤسسة حول الإصلاحات القانونية اللازمة لتعزيز حماية الحقوق الأساسية.'
    },
    type: 'image',
    url: '/images/media/legal-reforms-roundtable.jpg',
    thumbnailUrl: '/images/media/thumbnails/legal-reforms-roundtable.jpg',
    date: '2023-08-05',
    category: 'Événements',
    tags: ['réformes juridiques', 'table ronde', 'experts']
  },
  {
    id: '6',
    title: {
      fr: 'Rapport sur les droits des migrants',
      ar: 'تقرير عن حقوق المهاجرين'
    },
    description: {
      fr: 'Rapport détaillé sur la situation des droits des migrants et des réfugiés, incluant des recommandations pour améliorer leur protection.',
      ar: 'تقرير مفصل عن وضع حقوق المهاجرين واللاجئين، بما في ذلك توصيات لتحسين حمايتهم.'
    },
    type: 'document',
    url: '/documents/rapport-droits-migrants.pdf',
    thumbnailUrl: '/images/media/thumbnails/migrants-report.jpg',
    date: '2023-12-18',
    category: 'Publications',
    tags: ['migrants', 'réfugiés', 'rapport']
  },
  {
    id: '7',
    title: {
      fr: 'Atelier sur les droits des jeunes',
      ar: 'ورشة عمل حول حقوق الشباب'
    },
    description: {
      fr: 'Séance d\'atelier avec des jeunes sur leurs droits et les moyens de participation civique.',
      ar: 'جلسة ورشة عمل مع الشباب حول حقوقهم ووسائل المشاركة المدنية.'
    },
    type: 'image',
    url: '/images/media/youth-workshop.jpg',
    thumbnailUrl: '/images/media/thumbnails/youth-workshop.jpg',
    date: '2023-07-15',
    category: 'Ateliers',
    tags: ['jeunes', 'participation', 'droits']
  },
  {
    id: '8',
    title: {
      fr: 'Webinaire sur l\'égalité des genres',
      ar: 'ندوة عبر الإنترنت حول المساواة بين الجنسين'
    },
    description: {
      fr: 'Enregistrement du webinaire sur la promotion de l\'égalité des genres et la lutte contre les discriminations.',
      ar: 'تسجيل الندوة عبر الإنترنت حول تعزيز المساواة بين الجنسين ومكافحة التمييز.'
    },
    type: 'video',
    url: 'https://www.youtube.com/embed/ne8ZEXcXa6A',
    thumbnailUrl: '/images/media/thumbnails/gender-equality-webinar.jpg',
    date: '2023-09-28',
    category: 'Webinaires',
    tags: ['égalité des genres', 'webinaire', 'discrimination']
  }
];

// Store media items in localStorage
export const initializeMediaData = () => {
  if (typeof window === 'undefined') return;
  
  const mediaData = localStorage.getItem('droitfpra_media');
  if (!mediaData) {
    localStorage.setItem('droitfpra_media', JSON.stringify(initialMedia));
  }
};

// Get all media items
export const getPersistedMedia = (): MediaItem[] => {
  if (typeof window === 'undefined') return [];
  
  const mediaData = localStorage.getItem('droitfpra_media');
  return mediaData ? JSON.parse(mediaData) : [];
};

// Get a single media item by ID
export const getPersistedMediaItem = (mediaId: string): MediaItem | null => {
  const mediaItems = getPersistedMedia();
  return mediaItems.find(item => item.id === mediaId) || null;
};

// Save a media item
export const savePersistentMediaItem = (media: MediaItem): boolean => {
  if (typeof window === 'undefined') return false;
  
  try {
    const mediaItems = getPersistedMedia();
    const existingIndex = mediaItems.findIndex(item => item.id === media.id);
    
    if (existingIndex !== -1) {
      mediaItems[existingIndex] = media;
    } else {
      mediaItems.push(media);
    }
    
    localStorage.setItem('droitfpra_media', JSON.stringify(mediaItems));
    return true;
  } catch (error) {
    console.error('Error saving media item:', error);
    return false;
  }
};

// Delete a media item
export const deletePersistedMediaItem = (mediaId: string): boolean => {
  if (typeof window === 'undefined') return false;
  
  try {
    let mediaItems = getPersistedMedia();
    mediaItems = mediaItems.filter(item => item.id !== mediaId);
    localStorage.setItem('droitfpra_media', JSON.stringify(mediaItems));
    return true;
  } catch (error) {
    console.error('Error deleting media item:', error);
    return false;
  }
};

// Initialize when module loads
if (typeof window !== 'undefined') {
  initializeMediaData();
} 