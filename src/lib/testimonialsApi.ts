import { Testimonial } from './database';

// Initial testimonials data
export const initialTestimonials: Testimonial[] = [
  {
    id: '1',
    name: {
      fr: 'Amina Khelif',
      ar: 'أمينة خليف'
    },
    role: {
      fr: 'Responsable d\'une association locale',
      ar: 'مسؤولة جمعية محلية'
    },
    content: {
      fr: 'Grâce à la formation sur les droits humains organisée par la Fondation, notre association a pu développer de nouvelles compétences en matière de plaidoyer et de documentation des violations. Le soutien continu et les ressources fournies ont été inestimables pour notre travail sur le terrain.',
      ar: 'بفضل التدريب على حقوق الإنسان الذي نظمته المؤسسة، تمكنت جمعيتنا من تطوير مهارات جديدة في مجال المناصرة وتوثيق الانتهاكات. كان الدعم المستمر والموارد المقدمة لا تقدر بثمن لعملنا الميداني.'
    },
    imageUrl: '/images/testimonials/amina-khelif.jpg',
    rating: 5,
    date: '2023-11-15'
  },
  {
    id: '2',
    name: {
      fr: 'Mohammed Benmalek',
      ar: 'محمد بن مالك'
    },
    role: {
      fr: 'Avocat en droit des réfugiés',
      ar: 'محامي في قانون اللاجئين'
    },
    content: {
      fr: 'La cellule juridique pour les migrants mise en place par la Fondation offre un soutien crucial pour les personnes les plus vulnérables. J\'ai eu l\'occasion de collaborer avec leur équipe sur plusieurs cas, et j\'ai été impressionné par leur professionnalisme et leur engagement à défendre les droits des migrants et des réfugiés.',
      ar: 'توفر الخلية القانونية للمهاجرين التي أنشأتها المؤسسة دعمًا حاسمًا للأشخاص الأكثر ضعفًا. لقد سنحت لي الفرصة للتعاون مع فريقهم في عدة حالات، وقد أعجبت بمهنيتهم والتزامهم بالدفاع عن حقوق المهاجرين واللاجئين.'
    },
    imageUrl: '/images/testimonials/mohammed-benmalek.jpg',
    rating: 5,
    date: '2023-10-20'
  },
  {
    id: '3',
    name: {
      fr: 'Fatima Zahra',
      ar: 'فاطمة الزهراء'
    },
    role: {
      fr: 'Bénéficiaire du programme jeunesse',
      ar: 'مستفيدة من برنامج الشباب'
    },
    content: {
      fr: 'Participer au programme pour les droits des jeunes a été une expérience transformatrice. Les ateliers m\'ont permis de mieux comprendre mes droits et de développer des compétences de leadership que j\'utilise maintenant dans mon engagement communautaire. Je suis reconnaissante pour cette opportunité qui a changé ma perspective et m\'a donné des outils pour agir.',
      ar: 'كانت المشاركة في برنامج حقوق الشباب تجربة تحويلية. مكنتني ورش العمل من فهم حقوقي بشكل أفضل وتطوير مهارات القيادة التي أستخدمها الآن في مشاركتي المجتمعية. أنا ممتنة لهذه الفرصة التي غيرت منظوري وأعطتني أدوات للعمل.'
    },
    imageUrl: '/images/testimonials/fatima-zahra.jpg',
    rating: 4,
    date: '2023-09-05'
  },
  {
    id: '4',
    name: {
      fr: 'Kamel Daoud',
      ar: 'كمال داود'
    },
    role: {
      fr: 'Journaliste et activiste',
      ar: 'صحفي وناشط'
    },
    content: {
      fr: 'Le guide pratique sur l\'accès à la justice publié par la Fondation est une ressource exceptionnelle. Il présente les informations juridiques complexes d\'une manière claire et accessible pour tous. Je le recommande régulièrement dans mon travail avec les communautés marginalisées qui ont besoin de comprendre leurs droits et les voies de recours disponibles.',
      ar: 'الدليل العملي حول الوصول إلى العدالة الذي نشرته المؤسسة هو مورد استثنائي. يقدم المعلومات القانونية المعقدة بطريقة واضحة ويمكن الوصول إليها للجميع. أوصي به بانتظام في عملي مع المجتمعات المهمشة التي تحتاج إلى فهم حقوقها وسبل الانتصاف المتاحة.'
    },
    imageUrl: '/images/testimonials/kamel-daoud.jpg',
    rating: 5,
    date: '2023-08-12'
  },
  {
    id: '5',
    name: {
      fr: 'Yasmine Benali',
      ar: 'ياسمين بن علي'
    },
    role: {
      fr: 'Enseignante en droit',
      ar: 'مدرسة قانون'
    },
    content: {
      fr: 'Les rapports et analyses produits par l\'équipe de recherche de la Fondation sont d\'une qualité exceptionnelle. Je les utilise régulièrement comme ressources pédagogiques dans mes cours de droit des droits humains. La rigueur analytique et l\'attention portée aux contextes locaux font de ces documents des références incontournables dans le domaine.',
      ar: 'التقارير والتحليلات التي أنتجها فريق البحث في المؤسسة ذات جودة استثنائية. أستخدمها بانتظام كموارد تعليمية في دوراتي في قانون حقوق الإنسان. الصرامة التحليلية والاهتمام بالسياقات المحلية تجعل هذه الوثائق مراجع أساسية في هذا المجال.'
    },
    imageUrl: '/images/testimonials/yasmine-benali.jpg',
    rating: 4,
    date: '2023-07-18'
  },
  {
    id: '6',
    name: {
      fr: 'Rachid Hamidi',
      ar: 'رشيد حميدي'
    },
    role: {
      fr: 'Parent d\'un participant aux ateliers pour jeunes',
      ar: 'والد أحد المشاركين في ورش عمل الشباب'
    },
    content: {
      fr: 'J\'ai observé un changement remarquable chez mon fils depuis qu\'il participe aux ateliers sur les droits organisés par la Fondation. Il est devenu plus confiant, plus conscient de ses droits et responsabilités, et montre un véritable intérêt pour les questions sociales. Ces programmes ont un impact réel sur la formation des jeunes citoyens engagés.',
      ar: 'لاحظت تغييرًا ملحوظًا في ابني منذ أن شارك في ورش العمل حول الحقوق التي تنظمها المؤسسة. أصبح أكثر ثقة، وأكثر وعيًا بحقوقه ومسؤولياته، ويظهر اهتمامًا حقيقيًا بالقضايا الاجتماعية. هذه البرامج لها تأثير حقيقي على تكوين المواطنين الشباب الملتزمين.'
    },
    imageUrl: '/images/testimonials/rachid-hamidi.jpg',
    rating: 5,
    date: '2023-06-10'
  }
];

// Store testimonials in localStorage
export const initializeTestimonialsData = () => {
  if (typeof window === 'undefined') return;
  
  const testimonialsData = localStorage.getItem('droitfpra_testimonials');
  if (!testimonialsData) {
    localStorage.setItem('droitfpra_testimonials', JSON.stringify(initialTestimonials));
  }
};

// Get all testimonials
export const getPersistedTestimonials = (): Testimonial[] => {
  if (typeof window === 'undefined') return [];
  
  const testimonialsData = localStorage.getItem('droitfpra_testimonials');
  return testimonialsData ? JSON.parse(testimonialsData) : [];
};

// Get a single testimonial by ID
export const getPersistedTestimonial = (testimonialId: string): Testimonial | null => {
  const testimonials = getPersistedTestimonials();
  return testimonials.find(testimonial => testimonial.id === testimonialId) || null;
};

// Save a testimonial
export const savePersistentTestimonial = (testimonial: Testimonial): boolean => {
  if (typeof window === 'undefined') return false;
  
  try {
    const testimonials = getPersistedTestimonials();
    const existingIndex = testimonials.findIndex(item => item.id === testimonial.id);
    
    if (existingIndex !== -1) {
      testimonials[existingIndex] = testimonial;
    } else {
      testimonials.push(testimonial);
    }
    
    localStorage.setItem('droitfpra_testimonials', JSON.stringify(testimonials));
    return true;
  } catch (error) {
    console.error('Error saving testimonial:', error);
    return false;
  }
};

// Delete a testimonial
export const deletePersistedTestimonial = (testimonialId: string): boolean => {
  if (typeof window === 'undefined') return false;
  
  try {
    let testimonials = getPersistedTestimonials();
    testimonials = testimonials.filter(testimonial => testimonial.id !== testimonialId);
    localStorage.setItem('droitfpra_testimonials', JSON.stringify(testimonials));
    return true;
  } catch (error) {
    console.error('Error deleting testimonial:', error);
    return false;
  }
};

// Initialize when module loads
if (typeof window !== 'undefined') {
  initializeTestimonialsData();
} 