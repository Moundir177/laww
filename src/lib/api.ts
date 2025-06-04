// API utility for local storage data persistence
import { PageContent, NewsItem, TeamMember, Testimonial, MediaItem } from './database';

// LocalStorage keys
const STORAGE_KEYS = {
  PAGES: 'droitfpra_pages',
  NEWS: 'droitfpra_news',
  TEAM: 'droitfpra_team',
  TESTIMONIALS: 'droitfpra_testimonials',
  MEDIA: 'droitfpra_media',
};

// Initialize with default data if empty
export const initializeData = () => {
  if (typeof window === 'undefined') return;
  
  // Load real website data
  const initialPages: Record<string, PageContent> = {
    home: {
      id: 'home',
      title: {
        fr: 'Accueil',
        ar: 'الرئيسية'
      },
      sections: [
        {
          id: 'hero',
          title: {
            fr: 'Fondation pour la Promotion des Droits',
            ar: 'مؤسسة من أجل ترقية الحقوق'
          },
          content: {
            fr: 'Pour la défense et la promotion des droits fondamentaux',
            ar: 'للدفاع عن وتعزيز الحقوق الأساسية'
          }
        },
        {
          id: 'mission',
          title: {
            fr: 'Notre Mission',
            ar: 'مهمتنا'
          },
          content: {
            fr: 'Défendre les droits fondamentaux des individus et des communautés à travers la recherche, l\'éducation et le plaidoyer.',
            ar: 'الدفاع عن الحقوق الأساسية للأفراد والمجتمعات من خلال البحث والتعليم والمناصرة.'
          }
        },
        {
          id: 'areas',
          title: {
            fr: 'Nos Domaines d\'Action',
            ar: 'مجالات عملنا'
          },
          content: {
            fr: 'Accès à la justice, éducation aux droits, soutien aux migrants, promotion de l\'égalité des sexes.',
            ar: 'الوصول إلى العدالة، والتثقيف بشأن الحقوق، ودعم المهاجرين، وتعزيز المساواة بين الجنسين.'
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
            fr: 'La Fondation pour la Promotion des Droits est une organisation indépendante qui œuvre pour la défense et la promotion des droits fondamentaux. Créée en 2010, notre organisation s\'engage à sensibiliser, former et documenter les violations des droits pour construire une société plus juste et équitable.',
            ar: 'مؤسسة ترقية الحقوق هي منظمة مستقلة تعمل للدفاع عن وتعزيز الحقوق الأساسية. تأسست عام 2010، وتلتزم منظمتنا بزيادة الوعي والتدريب وتوثيق انتهاكات الحقوق لبناء مجتمع أكثر عدلاً وإنصافاً.'
          }
        },
        {
          id: 'vision',
          title: {
            fr: 'Notre Vision',
            ar: 'رؤيتنا'
          },
          content: {
            fr: 'Nous aspirons à un monde où chaque individu jouit pleinement de ses droits fondamentaux, dans le respect de la dignité humaine et où la justice sociale est une réalité pour tous.',
            ar: 'نطمح إلى عالم يتمتع فيه كل فرد بحقوقه الأساسية بشكل كامل، في ظل احترام الكرامة الإنسانية وحيث تكون العدالة الاجتماعية حقيقة للجميع.'
          }
        },
        {
          id: 'values',
          title: {
            fr: 'Nos Valeurs',
            ar: 'قيمنا'
          },
          content: {
            fr: 'Dignité humaine, justice, transparence, indépendance, solidarité et engagement citoyen sont les principes qui guident notre action au quotidien.',
            ar: 'الكرامة الإنسانية والعدالة والشفافية والاستقلالية والتضامن والالتزام المدني هي المبادئ التي توجه عملنا اليومي.'
          }
        }
      ]
    },
    programs: {
      id: 'programs',
      title: {
        fr: 'Programmes',
        ar: 'البرامج'
      },
      sections: [
        {
          id: 'programs_intro',
          title: {
            fr: 'Nos Programmes',
            ar: 'برامجنا'
          },
          content: {
            fr: 'La Fondation pour la Promotion des Droits développe plusieurs programmes visant à défendre et promouvoir les droits fondamentaux à travers différentes approches complémentaires.',
            ar: 'تطور مؤسسة ترقية الحقوق العديد من البرامج التي تهدف إلى الدفاع عن وتعزيز الحقوق الأساسية من خلال مناهج تكميلية مختلفة.'
          }
        },
        {
          id: 'advocacy',
          title: {
            fr: 'Plaidoyer et Mobilisation',
            ar: 'المناصرة والتعبئة'
          },
          content: {
            fr: 'Notre programme de plaidoyer vise à influencer les politiques publiques et à mobiliser les acteurs clés pour faire progresser la protection des droits humains. Nous développons des campagnes de sensibilisation, produisons des rapports et participons activement au dialogue avec les autorités et institutions nationales et internationales.',
            ar: 'يهدف برنامج المناصرة لدينا إلى التأثير على السياسات العامة وتعبئة الجهات الفاعلة الرئيسية لتعزيز حماية حقوق الإنسان. نقوم بتطوير حملات توعوية وإنتاج تقارير والمشاركة بنشاط في الحوار مع السلطات والمؤسسات الوطنية والدولية.'
          }
        },
        {
          id: 'research',
          title: {
            fr: 'Recherche et Documentation',
            ar: 'البحث والتوثيق'
          },
          content: {
            fr: 'Notre équipe de recherche documente les violations des droits, analyse les tendances et propose des recommandations concrètes. Nos études contribuent à une meilleure compréhension des enjeux et à l\'élaboration de solutions durables.',
            ar: 'يقوم فريق البحث لدينا بتوثيق انتهاكات الحقوق وتحليل الاتجاهات وتقديم توصيات ملموسة. تساهم دراساتنا في فهم أفضل للقضايا وتطوير حلول مستدامة.'
          }
        },
        {
          id: 'training',
          title: {
            fr: 'Formation et Renforcement des Capacités',
            ar: 'التدريب وبناء القدرات'
          },
          content: {
            fr: 'Nous offrons des formations aux acteurs de la société civile, aux professionnels du droit et aux groupes vulnérables pour renforcer leurs connaissances et leurs capacités à défendre leurs droits.',
            ar: 'نقدم تدريبات لأطراف المجتمع المدني والمهنيين القانونيين والفئات الضعيفة لتعزيز معرفتهم وقدرتهم على الدفاع عن حقوقهم.'
          }
        }
      ]
    },
    review: {
      id: 'review',
      title: {
        fr: 'Revue',
        ar: 'المراجعة'
      },
      sections: [
        {
          id: 'review_intro',
          title: {
            fr: 'Notre Revue',
            ar: 'مراجعتنا'
          },
          content: {
            fr: 'La Revue pour la Promotion des Droits est une publication semestrielle qui propose des analyses approfondies sur les enjeux actuels liés aux droits fondamentaux.',
            ar: 'مراجعة ترقية الحقوق هي منشور نصف سنوي يقدم تحليلات متعمقة للقضايا الحالية المتعلقة بالحقوق الأساسية.'
          }
        },
        {
          id: 'publications',
          title: {
            fr: 'Publications Récentes',
            ar: 'المنشورات الحديثة'
          },
          content: {
            fr: 'Consultez nos dernières publications, rapports thématiques et analyses juridiques dans notre bibliothèque en ligne.',
            ar: 'راجع أحدث منشوراتنا وتقاريرنا المواضيعية وتحليلاتنا القانونية في مكتبتنا عبر الإنترنت.'
          }
        },
        {
          id: 'multimedia',
          title: {
            fr: 'Médiathèque',
            ar: 'مكتبة الوسائط'
          },
          content: {
            fr: 'Découvrez nos ressources audiovisuelles, infographies et podcasts sur les questions relatives aux droits humains.',
            ar: 'اكتشف مواردنا السمعية البصرية والرسوم البيانية والبودكاست حول قضايا حقوق الإنسان.'
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
            fr: 'Nous Contacter',
            ar: 'تواصل معنا'
          },
          content: {
            fr: 'Pour toute demande d\'information ou pour rejoindre notre réseau, n\'hésitez pas à nous contacter via le formulaire ci-dessous ou aux coordonnées suivantes:\n\nEmail: contact@droitfpra.org\nTéléphone: +213 XX XX XX XX\nAdresse: 10 Rue des Droits Humains, Alger, Algérie',
            ar: 'لأي استفسار أو للانضمام إلى شبكتنا، لا تتردد في الاتصال بنا عبر النموذج أدناه أو على التفاصيل التالية:\n\nالبريد الإلكتروني: contact@droitfpra.org\nالهاتف: +213 XX XX XX XX\nالعنوان: 10 شارع حقوق الإنسان، الجزائر، الجزائر'
          }
        }
      ]
    },
    news: {
      id: 'news',
      title: {
        fr: 'Actualités',
        ar: 'الأخبار'
      },
      sections: [
        {
          id: 'news_intro',
          title: {
            fr: 'Nos Actualités',
            ar: 'آخر أخبارنا'
          },
          content: {
            fr: 'Suivez nos dernières activités, événements et prises de position sur les questions d\'actualité liées aux droits fondamentaux.',
            ar: 'تابع أحدث أنشطتنا وفعالياتنا ومواقفنا حول القضايا الحالية المتعلقة بالحقوق الأساسية.'
          }
        }
      ]
    },
    testimonials: {
      id: 'testimonials',
      title: {
        fr: 'Témoignages',
        ar: 'الشهادات'
      },
      sections: [
        {
          id: 'testimonials_intro',
          title: {
            fr: 'Témoignages',
            ar: 'الشهادات'
          },
          content: {
            fr: 'Découvrez les témoignages de personnes qui ont bénéficié de nos programmes et actions.',
            ar: 'اكتشف شهادات الأشخاص الذين استفادوا من برامجنا وأنشطتنا.'
          }
        }
      ]
    }
  };

  // Fix the About page to match the screenshot
  initialPages.about = {
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
          fr: 'La Fondation pour la Promotion des Droits est une organisation indépendante qui œuvre pour la défense et la promotion des droits fondamentaux. Créée en 2010, notre organisation s\'engage à sensibiliser, former et documenter les violations des droits pour construire une société plus juste et équitable.',
          ar: 'مؤسسة ترقية الحقوق هي منظمة مستقلة تعمل للدفاع عن وتعزيز الحقوق الأساسية. تأسست عام 2010، وتلتزم منظمتنا بزيادة الوعي والتدريب وتوثيق انتهاكات الحقوق لبناء مجتمع أكثر عدلاً وإنصافاً.'
        }
      }
    ]
  };

  // Save initial data if not exists
  if (!localStorage.getItem(STORAGE_KEYS.PAGES)) {
    localStorage.setItem(STORAGE_KEYS.PAGES, JSON.stringify(initialPages));
  }
};

// Get all pages
export const getPersistedPages = (): Record<string, PageContent> => {
  if (typeof window === 'undefined') return {};
  
  const pagesData = localStorage.getItem(STORAGE_KEYS.PAGES);
  return pagesData ? JSON.parse(pagesData) : {};
};

// Get a single page
export const getPersistedPage = (pageId: string): PageContent | null => {
  const pages = getPersistedPages();
  return pages[pageId] || null;
};

// Save a page
export const savePersistentPage = (page: PageContent): boolean => {
  if (typeof window === 'undefined') return false;
  
  try {
    const pages = getPersistedPages();
    pages[page.id] = page;
    localStorage.setItem(STORAGE_KEYS.PAGES, JSON.stringify(pages));
    return true;
  } catch (error) {
    console.error('Error saving page:', error);
    return false;
  }
};

// Get all news items
export const getPersistedNews = (): NewsItem[] => {
  if (typeof window === 'undefined') return [];
  
  const newsData = localStorage.getItem(STORAGE_KEYS.NEWS);
  return newsData ? JSON.parse(newsData) : [];
};

// Save a news item
export const savePersistentNews = (news: NewsItem): boolean => {
  if (typeof window === 'undefined') return false;
  
  try {
    const newsItems = getPersistedNews();
    const existingIndex = newsItems.findIndex(item => item.id === news.id);
    
    if (existingIndex !== -1) {
      newsItems[existingIndex] = news;
    } else {
      newsItems.push(news);
    }
    
    localStorage.setItem(STORAGE_KEYS.NEWS, JSON.stringify(newsItems));
    return true;
  } catch (error) {
    console.error('Error saving news:', error);
    return false;
  }
};

// Initialize data when module loads
if (typeof window !== 'undefined') {
  initializeData();
} 