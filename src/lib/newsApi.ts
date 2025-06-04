import { NewsItem } from './database';

// Initial news data
export const initialNews: NewsItem[] = [
  {
    id: '1',
    title: {
      fr: 'Journée internationale des droits des migrants',
      ar: 'اليوم العالمي لحقوق المهاجرين'
    },
    summary: {
      fr: 'À l\'occasion de la journée internationale des droits des migrants, nous annonçons la création d\'une cellule juridique pour les migrants et les familles des disparus en mer.',
      ar: 'بمناسبة اليوم العالمي لحقوق المهاجرين، نعلن عن إنشاء خلية قانونية للمهاجرين وعائلات المفقودين في البحر.'
    },
    content: {
      fr: 'À l\'occasion de la journée internationale des droits des migrants, nous annonçons la création d\'une cellule juridique pour les migrants et les familles des disparus en mer en Algérie. Cette cellule offrira une assistance juridique gratuite et un accompagnement dans les démarches administratives. Elle documentera également les cas de disparitions et plaidera pour des politiques migratoires plus humaines et respectueuses des droits fondamentaux. N\'hésitez pas à visiter notre page Facebook et nous contacter pour plus d\'informations.',
      ar: 'بمناسبة اليوم العالمي لحقوق المهاجرين، نعلن عن إنشاء خلية قانونية للمهاجرين وعائلات المفقودين في البحر في الجزائر. ستقدم هذه الخلية مساعدة قانونية مجانية ودعمًا في الإجراءات الإدارية. كما ستوثق حالات الاختفاء وتدافع عن سياسات هجرة أكثر إنسانية واحترامًا للحقوق الأساسية. لا تترددوا في زيارة صفحتنا على فيسبوك والاتصال بنا لمزيد من المعلومات.'
    },
    slug: {
      fr: 'journee-internationale-droits-migrants',
      ar: 'اليوم-العالمي-لحقوق-المهاجرين'
    },
    date: '2023-12-18',
    category: 'Actualités',
    author: 'Équipe DROITFPRA',
    image: '/images/news/migrants-rights.jpg',
    videoUrl: 'https://www.youtube.com/embed/ne8ZEXcXa6A'
  },
  {
    id: '2',
    title: {
      fr: 'Formation sur les droits fondamentaux',
      ar: 'تدريب على الحقوق الأساسية'
    },
    summary: {
      fr: 'Notre fondation organise une série de formations sur les droits fondamentaux destinées aux acteurs de la société civile.',
      ar: 'تنظم مؤسستنا سلسلة من التدريبات حول الحقوق الأساسية موجهة لفاعلي المجتمع المدني.'
    },
    content: {
      fr: 'Notre fondation organise une série de formations sur les droits fondamentaux destinées aux acteurs de la société civile. Ces sessions visent à renforcer les connaissances et les compétences des participants sur les mécanismes de protection des droits, le plaidoyer et la documentation des violations. Les formations se dérouleront sur trois mois et seront animées par des experts nationaux et internationaux. Un certificat sera délivré aux participants ayant suivi l\'ensemble du programme.',
      ar: 'تنظم مؤسستنا سلسلة من التدريبات حول الحقوق الأساسية موجهة لفاعلي المجتمع المدني. تهدف هذه الدورات إلى تعزيز معرفة ومهارات المشاركين حول آليات حماية الحقوق والمناصرة وتوثيق الانتهاكات. ستقام التدريبات على مدى ثلاثة أشهر وسيقدمها خبراء وطنيون ودوليون. سيتم منح شهادة للمشاركين الذين أكملوا البرنامج بأكمله.'
    },
    slug: {
      fr: 'formation-droits-fondamentaux',
      ar: 'تدريب-على-الحقوق-الأساسية'
    },
    date: '2023-08-25',
    category: 'Formation',
    author: 'Département Formation',
    image: '/images/news/training.jpg'
  },
  {
    id: '3',
    title: {
      fr: 'Table ronde sur les réformes juridiques',
      ar: 'طاولة مستديرة حول الإصلاحات القانونية'
    },
    summary: {
      fr: 'La Fondation a organisé une table ronde réunissant experts juridiques, académiciens et représentants de la société civile pour discuter des réformes juridiques nécessaires.',
      ar: 'نظمت المؤسسة طاولة مستديرة جمعت خبراء قانونيين وأكاديميين وممثلين عن المجتمع المدني لمناقشة الإصلاحات القانونية اللازمة.'
    },
    content: {
      fr: 'La Fondation a organisé une table ronde réunissant experts juridiques, académiciens et représentants de la société civile pour discuter des réformes juridiques nécessaires pour renforcer la protection des droits fondamentaux. Les discussions ont porté sur l\'harmonisation de la législation nationale avec les standards internationaux, l\'accès à la justice et l\'indépendance du pouvoir judiciaire. Les recommandations issues de cette rencontre seront compilées dans un rapport qui sera soumis aux autorités compétentes.',
      ar: 'نظمت المؤسسة طاولة مستديرة جمعت خبراء قانونيين وأكاديميين وممثلين عن المجتمع المدني لمناقشة الإصلاحات القانونية اللازمة لتعزيز حماية الحقوق الأساسية. تركزت المناقشات على مواءمة التشريعات الوطنية مع المعايير الدولية، والوصول إلى العدالة، واستقلال السلطة القضائية. سيتم تجميع التوصيات الناتجة عن هذا الاجتماع في تقرير سيتم تقديمه إلى السلطات المختصة.'
    },
    slug: {
      fr: 'table-ronde-reformes-juridiques',
      ar: 'طاولة-مستديرة-حول-الإصلاحات-القانونية'
    },
    date: '2023-08-05',
    category: 'Événements',
    author: 'Département Recherche',
    image: '/images/news/roundtable.jpg'
  },
  {
    id: '4',
    title: {
      fr: 'Lancement d\'une initiative pour les droits des jeunes',
      ar: 'إطلاق مبادرة لحقوق الشباب'
    },
    summary: {
      fr: 'La Fondation lance une nouvelle initiative visant à promouvoir les droits des jeunes et à renforcer leur participation civique.',
      ar: 'تطلق المؤسسة مبادرة جديدة تهدف إلى تعزيز حقوق الشباب وتعزيز مشاركتهم المدنية.'
    },
    content: {
      fr: 'La Fondation lance une nouvelle initiative visant à promouvoir les droits des jeunes et à renforcer leur participation civique. Ce programme comprendra des formations sur le leadership, des ateliers sur les droits fondamentaux et un accompagnement pour des projets communautaires initiés par les jeunes. L\'objectif est de créer une nouvelle génération de défenseurs des droits humains et de citoyens engagés. Les inscriptions pour participer à ce programme sont ouvertes jusqu\'au 30 juillet.',
      ar: 'تطلق المؤسسة مبادرة جديدة تهدف إلى تعزيز حقوق الشباب وتعزيز مشاركتهم المدنية. سيشمل هذا البرنامج تدريبات على القيادة، وورش عمل حول الحقوق الأساسية، ودعمًا للمشاريع المجتمعية التي يبادر بها الشباب. الهدف هو خلق جيل جديد من المدافعين عن حقوق الإنسان والمواطنين الملتزمين. التسجيل للمشاركة في هذا البرنامج مفتوح حتى 30 يوليو.'
    },
    slug: {
      fr: 'lancement-initiative-droits-jeunes',
      ar: 'إطلاق-مبادرة-لحقوق-الشباب'
    },
    date: '2023-07-15',
    category: 'Programmes',
    author: 'Coordinateur Jeunesse',
    image: '/images/news/youth-rights.jpg'
  },
  {
    id: '5',
    title: {
      fr: 'Guide pratique sur l\'accès à la justice',
      ar: 'دليل عملي حول الوصول إلى العدالة'
    },
    summary: {
      fr: 'La Fondation publie un guide pratique pour aider les citoyens à mieux comprendre et naviguer dans le système judiciaire.',
      ar: 'تنشر المؤسسة دليلاً عملياً لمساعدة المواطنين على فهم النظام القضائي والتنقل فيه بشكل أفضل.'
    },
    content: {
      fr: 'La Fondation publie un guide pratique pour aider les citoyens à mieux comprendre et naviguer dans le système judiciaire. Ce guide, disponible en arabe et en français, offre des informations claires sur les droits des justiciables, les procédures judiciaires et les recours disponibles. Il contient également des conseils pratiques, des modèles de documents et des contacts utiles. Ce guide sera distribué gratuitement dans nos bureaux et disponible en téléchargement sur notre site web.',
      ar: 'تنشر المؤسسة دليلاً عملياً لمساعدة المواطنين على فهم النظام القضائي والتنقل فيه بشكل أفضل. يقدم هذا الدليل، المتوفر باللغتين العربية والفرنسية، معلومات واضحة حول حقوق المتقاضين والإجراءات القضائية وسبل الانتصاف المتاحة. كما يحتوي على نصائح عملية ونماذج مستندات وجهات اتصال مفيدة. سيتم توزيع هذا الدليل مجانًا في مكاتبنا وسيكون متاحًا للتنزيل على موقعنا الإلكتروني.'
    },
    slug: {
      fr: 'guide-acces-justice',
      ar: 'دليل-عملي-حول-الوصول-إلى-العدالة'
    },
    date: '2023-06-20',
    category: 'Publications',
    author: 'Département Juridique',
    image: '/images/news/justice-access.jpg'
  },
  {
    id: '6',
    title: {
      fr: 'Conférence sur les droits numériques',
      ar: 'مؤتمر حول الحقوق الرقمية'
    },
    summary: {
      fr: 'La Fondation organise une conférence sur les défis et opportunités liés aux droits numériques dans notre région.',
      ar: 'تنظم المؤسسة مؤتمراً حول التحديات والفرص المتعلقة بالحقوق الرقمية في منطقتنا.'
    },
    content: {
      fr: 'La Fondation organise une conférence sur les défis et opportunités liés aux droits numériques dans notre région. Cet événement réunira des experts nationaux et internationaux pour discuter de la protection des données personnelles, de la liberté d\'expression en ligne, de la désinformation et de la fracture numérique. La conférence se tiendra le 10 mai 2023 à l\'hôtel El Aurassi à Alger. Les inscriptions sont ouvertes à tous les intéressés, dans la limite des places disponibles.',
      ar: 'تنظم المؤسسة مؤتمراً حول التحديات والفرص المتعلقة بالحقوق الرقمية في منطقتنا. سيجمع هذا الحدث خبراء وطنيين ودوليين لمناقشة حماية البيانات الشخصية، وحرية التعبير عبر الإنترنت، والمعلومات المضللة، والفجوة الرقمية. سيعقد المؤتمر في 10 مايو 2023 في فندق الأوراسي بالجزائر العاصمة. التسجيل مفتوح لجميع المهتمين، حسب توفر المقاعد.'
    },
    slug: {
      fr: 'conference-droits-numeriques',
      ar: 'مؤتمر-حول-الحقوق-الرقمية'
    },
    date: '2023-04-25',
    category: 'Événements',
    author: 'Équipe Communication',
    image: '/images/news/digital-rights.jpg'
  },
  {
    id: '7',
    title: {
      fr: 'Analyse du projet de loi sur les associations',
      ar: 'تحليل مشروع قانون الجمعيات'
    },
    summary: {
      fr: 'La Fondation publie une note d\'analyse détaillée du nouveau projet de loi sur les associations.',
      ar: 'تنشر المؤسسة مذكرة تحليلية مفصلة لمشروع القانون الجديد المتعلق بالجمعيات.'
    },
    content: {
      fr: 'La Fondation publie une note d\'analyse détaillée du nouveau projet de loi sur les associations. Ce document examine les principales dispositions du projet, identifie les avancées et les points problématiques, et formule des recommandations pour améliorer le texte. Notre analyse souligne la nécessité d\'assouplir les conditions de création et de fonctionnement des associations, de renforcer les garanties contre les dissolutions arbitraires et d\'assurer l\'accès au financement. Le rapport complet est disponible sur notre site web.',
      ar: 'تنشر المؤسسة مذكرة تحليلية مفصلة لمشروع القانون الجديد المتعلق بالجمعيات. تفحص هذه الوثيقة الأحكام الرئيسية للمشروع، وتحدد التقدم والنقاط الإشكالية، وتقدم توصيات لتحسين النص. يؤكد تحليلنا على الحاجة إلى تبسيط شروط إنشاء وتشغيل الجمعيات، وتعزيز الضمانات ضد الحل التعسفي، وضمان الوصول إلى التمويل. التقرير الكامل متاح على موقعنا الإلكتروني.'
    },
    slug: {
      fr: 'analyse-projet-loi-associations',
      ar: 'تحليل-مشروع-قانون-الجمعيات'
    },
    date: '2023-03-15',
    category: 'Analyses',
    author: 'Département Juridique',
    image: '/images/news/law-analysis.jpg',
    videoUrl: 'https://www.youtube.com/embed/ne8ZEXcXa6A'
  }
];

// Store news items in localStorage
export const initializeNewsData = () => {
  if (typeof window === 'undefined') return;
  
  const newsData = localStorage.getItem('droitfpra_news');
  if (!newsData) {
    localStorage.setItem('droitfpra_news', JSON.stringify(initialNews));
  }
};

// Get all news items
export const getPersistedNewsItems = (): NewsItem[] => {
  if (typeof window === 'undefined') return [];
  
  const newsData = localStorage.getItem('droitfpra_news');
  return newsData ? JSON.parse(newsData) : [];
};

// Get a single news item by ID
export const getPersistedNewsItem = (newsId: string): NewsItem | null => {
  const newsItems = getPersistedNewsItems();
  return newsItems.find(item => item.id === newsId) || null;
};

// Get a news item by slug
export const getPersistedNewsBySlug = (slug: string, lang: 'fr' | 'ar'): NewsItem | null => {
  const newsItems = getPersistedNewsItems();
  return newsItems.find(item => item.slug[lang] === slug) || null;
};

// Save a news item
export const savePersistentNewsItem = (news: NewsItem): boolean => {
  if (typeof window === 'undefined') return false;
  
  try {
    const newsItems = getPersistedNewsItems();
    const existingIndex = newsItems.findIndex(item => item.id === news.id);
    
    if (existingIndex !== -1) {
      newsItems[existingIndex] = news;
    } else {
      newsItems.push(news);
    }
    
    localStorage.setItem('droitfpra_news', JSON.stringify(newsItems));
    return true;
  } catch (error) {
    console.error('Error saving news item:', error);
    return false;
  }
};

// Delete a news item
export const deletePersistedNewsItem = (newsId: string): boolean => {
  if (typeof window === 'undefined') return false;
  
  try {
    let newsItems = getPersistedNewsItems();
    newsItems = newsItems.filter(item => item.id !== newsId);
    localStorage.setItem('droitfpra_news', JSON.stringify(newsItems));
    return true;
  } catch (error) {
    console.error('Error deleting news item:', error);
    return false;
  }
};

// Initialize when module loads
if (typeof window !== 'undefined') {
  initializeNewsData();
} 