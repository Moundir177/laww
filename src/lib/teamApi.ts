import { TeamMember } from './database';

// Initial team members data
export const initialTeamMembers: TeamMember[] = [
  {
    id: '1',
    name: {
      fr: 'Dr. Ahmed Benali',
      ar: 'د. أحمد بن علي'
    },
    role: {
      fr: 'Président',
      ar: 'الرئيس'
    },
    bio: {
      fr: 'Dr. Ahmed Benali est avocat et professeur de droit à l\'Université d\'Alger. Il a fondé la Fondation pour la Promotion des Droits en 2010 après une carrière de 20 ans dans le domaine juridique et des droits humains. Il est l\'auteur de plusieurs ouvrages sur les droits fondamentaux et a participé à de nombreuses conférences internationales.',
      ar: 'د. أحمد بن علي محامٍ وأستاذ القانون بجامعة الجزائر. أسس مؤسسة ترقية الحقوق في عام 2010 بعد مسيرة مهنية استمرت 20 عامًا في المجال القانوني وحقوق الإنسان. وهو مؤلف العديد من الكتب حول الحقوق الأساسية وشارك في العديد من المؤتمرات الدولية.'
    },
    imageUrl: '/images/team/ahmed-benali.jpg',
    socialLinks: {
      twitter: 'https://twitter.com/ahmedbenali',
      linkedin: 'https://linkedin.com/in/ahmedbenali'
    },
    order: 1
  },
  {
    id: '2',
    name: {
      fr: 'Mme. Leila Hamdani',
      ar: 'السيدة ليلى حمداني'
    },
    role: {
      fr: 'Directrice Exécutive',
      ar: 'المديرة التنفيذية'
    },
    bio: {
      fr: 'Mme. Leila Hamdani a rejoint la Fondation en 2012 après avoir travaillé pendant 15 ans dans diverses organisations internationales de défense des droits humains. Elle dirige les opérations quotidiennes de la Fondation et supervise la mise en œuvre des programmes. Elle est titulaire d\'un Master en relations internationales et droits humains de l\'Université de Genève.',
      ar: 'انضمت السيدة ليلى حمداني إلى المؤسسة في عام 2012 بعد أن عملت لمدة 15 عامًا في مختلف المنظمات الدولية للدفاع عن حقوق الإنسان. تدير العمليات اليومية للمؤسسة وتشرف على تنفيذ البرامج. حاصلة على درجة الماجستير في العلاقات الدولية وحقوق الإنسان من جامعة جنيف.'
    },
    imageUrl: '/images/team/leila-hamdani.jpg',
    socialLinks: {
      twitter: 'https://twitter.com/leilahamdani',
      linkedin: 'https://linkedin.com/in/leilahamdani'
    },
    order: 2
  },
  {
    id: '3',
    name: {
      fr: 'M. Karim Messaoudi',
      ar: 'السيد كريم مسعودي'
    },
    role: {
      fr: 'Responsable des Programmes',
      ar: 'مسؤول البرامج'
    },
    bio: {
      fr: 'M. Karim Messaoudi supervise la conception, la mise en œuvre et l\'évaluation des programmes de la Fondation. Avant de rejoindre notre équipe, il a travaillé pendant 10 ans dans le développement communautaire et la gestion de projets. Il est spécialisé dans les approches participatives et l\'engagement communautaire.',
      ar: 'يشرف السيد كريم مسعودي على تصميم وتنفيذ وتقييم برامج المؤسسة. قبل انضمامه إلى فريقنا، عمل لمدة 10 سنوات في التنمية المجتمعية وإدارة المشاريع. متخصص في النهج التشاركية والمشاركة المجتمعية.'
    },
    imageUrl: '/images/team/karim-messaoudi.jpg',
    socialLinks: {
      linkedin: 'https://linkedin.com/in/karimmessaoudi'
    },
    order: 3
  },
  {
    id: '4',
    name: {
      fr: 'Dr. Samira Taleb',
      ar: 'د. سميرة طالب'
    },
    role: {
      fr: 'Responsable de la Recherche',
      ar: 'مسؤولة البحوث'
    },
    bio: {
      fr: 'Dr. Samira Taleb dirige le département de recherche de la Fondation. Docteure en sciences politiques, elle a publié de nombreux articles sur les droits humains, la gouvernance et les transitions démocratiques en Afrique du Nord. Elle coordonne les projets de recherche et développe des partenariats avec les universités et les centres de recherche.',
      ar: 'تدير د. سميرة طالب قسم البحوث في المؤسسة. دكتوراه في العلوم السياسية، نشرت العديد من المقالات حول حقوق الإنسان والحوكمة والانتقالات الديمقراطية في شمال إفريقيا. تنسق مشاريع البحث وتطور شراكات مع الجامعات ومراكز البحث.'
    },
    imageUrl: '/images/team/samira-taleb.jpg',
    socialLinks: {
      twitter: 'https://twitter.com/samirataleb',
      linkedin: 'https://linkedin.com/in/samirataleb',
      academia: 'https://academia.edu/samirataleb'
    },
    order: 4
  },
  {
    id: '5',
    name: {
      fr: 'M. Omar Ferhat',
      ar: 'السيد عمر فرحات'
    },
    role: {
      fr: 'Responsable Juridique',
      ar: 'المسؤول القانوني'
    },
    bio: {
      fr: 'M. Omar Ferhat dirige le département juridique de la Fondation. Avocat de formation, il a plus de 15 ans d\'expérience dans le domaine du droit des droits humains. Il coordonne l\'assistance juridique aux victimes de violations et élabore des analyses juridiques sur la conformité des lois nationales avec les normes internationales.',
      ar: 'يدير السيد عمر فرحات القسم القانوني للمؤسسة. محامي التدريب، لديه أكثر من 15 عامًا من الخبرة في مجال قانون حقوق الإنسان. ينسق المساعدة القانونية لضحايا الانتهاكات ويعد تحليلات قانونية حول امتثال القوانين الوطنية للمعايير الدولية.'
    },
    imageUrl: '/images/team/omar-ferhat.jpg',
    socialLinks: {
      linkedin: 'https://linkedin.com/in/omarferhat'
    },
    order: 5
  },
  {
    id: '6',
    name: {
      fr: 'Mme. Nadia Belkacem',
      ar: 'السيدة نادية بلقاسم'
    },
    role: {
      fr: 'Responsable Communication',
      ar: 'مسؤولة الاتصالات'
    },
    bio: {
      fr: 'Mme. Nadia Belkacem est en charge de la stratégie de communication de la Fondation. Avec une formation en journalisme et communication, elle gère les relations médias, le site web et les réseaux sociaux de l\'organisation. Elle développe également des campagnes de sensibilisation et des supports de communication pour promouvoir les droits fondamentaux.',
      ar: 'السيدة نادية بلقاسم مسؤولة عن استراتيجية الاتصال في المؤسسة. مع تدريب في الصحافة والاتصال، تدير العلاقات الإعلامية والموقع الإلكتروني ووسائل التواصل الاجتماعي للمنظمة. كما تطور حملات توعية ومواد اتصال لتعزيز الحقوق الأساسية.'
    },
    imageUrl: '/images/team/nadia-belkacem.jpg',
    socialLinks: {
      twitter: 'https://twitter.com/nadiabelkacem',
      linkedin: 'https://linkedin.com/in/nadiabelkacem'
    },
    order: 6
  }
];

// Store team members in localStorage
export const initializeTeamData = () => {
  if (typeof window === 'undefined') return;
  
  const teamData = localStorage.getItem('droitfpra_team');
  if (!teamData) {
    localStorage.setItem('droitfpra_team', JSON.stringify(initialTeamMembers));
  }
};

// Get all team members
export const getPersistedTeamMembers = (): TeamMember[] => {
  if (typeof window === 'undefined') return [];
  
  const teamData = localStorage.getItem('droitfpra_team');
  return teamData ? JSON.parse(teamData) : [];
};

// Get a single team member by ID
export const getPersistedTeamMember = (memberId: string): TeamMember | null => {
  const teamMembers = getPersistedTeamMembers();
  return teamMembers.find(member => member.id === memberId) || null;
};

// Save a team member
export const savePersistentTeamMember = (member: TeamMember): boolean => {
  if (typeof window === 'undefined') return false;
  
  try {
    const teamMembers = getPersistedTeamMembers();
    const existingIndex = teamMembers.findIndex(item => item.id === member.id);
    
    if (existingIndex !== -1) {
      teamMembers[existingIndex] = member;
    } else {
      teamMembers.push(member);
    }
    
    localStorage.setItem('droitfpra_team', JSON.stringify(teamMembers));
    return true;
  } catch (error) {
    console.error('Error saving team member:', error);
    return false;
  }
};

// Delete a team member
export const deletePersistedTeamMember = (memberId: string): boolean => {
  if (typeof window === 'undefined') return false;
  
  try {
    let teamMembers = getPersistedTeamMembers();
    teamMembers = teamMembers.filter(member => member.id !== memberId);
    localStorage.setItem('droitfpra_team', JSON.stringify(teamMembers));
    return true;
  } catch (error) {
    console.error('Error deleting team member:', error);
    return false;
  }
};

// Initialize when module loads
if (typeof window !== 'undefined') {
  initializeTeamData();
} 