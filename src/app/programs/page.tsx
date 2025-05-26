'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaUsers, FaBullhorn, FaBook, FaChalkboardTeacher, FaHandsHelping, FaUniversity, FaArrowRight } from 'react-icons/fa';
import { useLanguage } from '@/contexts/LanguageContext';
import PageHeader from '@/components/PageHeader';
import { getPageContent, PageContent } from '@/lib/database';
import Newsletter from '@/components/Newsletter';
import { motion } from 'framer-motion';

// Custom event name for content updates
const CONTENT_UPDATED_EVENT = 'content_updated';

const programs = [
  {
    id: 'training',
    titleKey: 'programs.training',
    descriptionFr: `Dans le cadre de notre engagement pour la promotion, la diffusion et la protection des droits humains en Algérie, la Fondation pour la promotion des droits a organisé une formation nationale intitulée :\n\n"Les mécanismes nationaux de défense des droits humains", destinée aux jeunes activistes et étudiants en droit issus de toutes les wilayas du pays.\n\nCette initiative s'inscrit dans notre plan stratégique de renforcement des capacités de la jeunesse algérienne engagée, en leur offrant des outils pratiques pour défendre efficacement les droits humains, conformément à la Constitution algérienne de novembre 2020 et aux traités internationaux en vigueur.\n\nLa session a été marquée par plusieurs volets importants, notamment :\n• Une analyse approfondie de la Constitution ainsi que des textes législatifs en vigueur,\n• Un examen des accords internationaux ratifiés par l'Algérie,\n• Des ateliers pratiques visant à maîtriser l'utilisation de ces instruments juridiques dans les contextes professionnels et militants.\n\nNous aurons des formations tout au long de l'année. La prochaine formation sera sur le thème de la protection digitale, programmée pour le mois de juin. Plus de détails seront fournis les jours à venir.`,
    descriptionAr: `في إطار التزامنا بتعزيز ونشر وحماية حقوق الإنسان في الجزائر، نظمت المؤسسة من أجل ترقية الحقوق تدريبًا وطنيًا بعنوان:\n\n"الآليات الوطنية للدفاع عن حقوق الإنسان"، موجه للناشطين الشباب وطلاب القانون من جميع ولايات البلاد.\n\nتندرج هذه المبادرة ضمن خطتنا الاستراتيجية لتعزيز قدرات الشباب الجزائري الملتزم، من خلال تزويدهم بأدوات عملية للدفاع الفعال عن حقوق الإنسان، وفقًا لدستور نوفمبر 2020 والاتفاقيات الدولية السارية.\n\nتميزت الدورة بعدة محاور هامة منها:\n• تحليل معمق للدستور والنصوص التشريعية السارية،\n• دراسة الاتفاقيات الدولية التي صادقت عليها الجزائر،\n• ورشات تطبيقية لإتقان استخدام هذه الأدوات القانونية في السياقات المهنية والنضالية.\n\nستتواصل الدورات التدريبية على مدار السنة، وستكون الدورة القادمة حول موضوع الحماية الرقمية مبرمجة لشهر جوان، وسيتم تقديم تفاصيل أكثر في الأيام القادمة.`,
    icon: <FaChalkboardTeacher className="text-white" />,
    color: 'bg-[#8FD694]',
    featuresFr: [],
    featuresAr: []
  },
  {
    id: 'advocacy',
    titleKey: 'programs.advocacy',
    descriptionFr: 'Campagnes et initiatives pour promouvoir la sensibilisation aux droits humains, plaider en faveur de réformes juridiques et impliquer le public dans la défense des droits.',
    descriptionAr: 'حملات ومبادرات لتعزيز الوعي بحقوق الإنسان، والدعوة إلى إصلاحات قانونية، وإشراك الجمهور في الدفاع عن الحقوق.',
    icon: <FaBullhorn className="text-white" />,
    color: 'bg-[#171717]',
    featuresFr: [
      'Campagnes de sensibilisation du public',
      'Initiatives de réforme des politiques',
      'Stratégies d\'engagement médiatique',
      'Dialogues communautaires',
      'Publications de sensibilisation aux droits'
    ],
    featuresAr: [
      'حملات التوعية العامة',
      'مبادرات إصلاح السياسات',
      'استراتيجيات المشاركة الإعلامية',
      'حوارات مجتمعية',
      'منشورات التوعية بالحقوق'
    ]
  },
  {
    id: 'research',
    titleKey: 'programs.research',
    descriptionFr: 'Documentation systématique des situations des droits humains et recherche sur les questions liées aux droits pour informer le plaidoyer et le développement des politiques.',
    descriptionAr: 'التوثيق المنهجي لأوضاع حقوق الإنسان والبحث في القضايا المتعلقة بالحقوق لإثراء المناصرة وتطوير السياسات.',
    icon: <FaBook className="text-white" />,
    color: 'bg-[#8FD694]',
    featuresFr: [
      'Surveillance des droits humains',
      'Études de recherche thématiques',
      'Documentation des meilleures pratiques',
      'Évaluation d\'impact',
      'Analyse des politiques'
    ],
    featuresAr: [
      'رصد حقوق الإنسان',
      'دراسات بحثية موضوعية',
      'توثيق أفضل الممارسات',
      'تقييم الأثر',
      'تحليل السياسات'
    ]
  }
];

export default function Programs() {
  const { language, t } = useLanguage();
  const [pageContent, setPageContent] = useState<PageContent | null>(null);
  const [forceRefresh, setForceRefresh] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Function to load page content from localStorage with better error handling
  const loadContent = () => {
    try {
      const content = getPageContent('programs');
      if (content) {
        console.log('Programs page - Content loaded with sections:', 
          content.sections.map(s => `${s.id}: ${s.title?.fr}`).join(', '));
        setPageContent(content);
        // Force re-render by incrementing the refresh counter
        setForceRefresh(prev => prev + 1);
      }
    } catch (error) {
      console.error('Error loading programs page content:', error);
    }
  };

  useEffect(() => {
    // Load content on initial render
    loadContent();
    
    // Set up event listeners for content updates
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'page_programs' || event.key === 'editor_programs') {
        console.log('Programs page - Storage change detected for key:', event.key);
        // Force complete refresh from localStorage
        loadContent();
      }
    };
    
    const handleContentUpdated = () => {
      console.log('Programs page - Content updated event received');
      // Force complete refresh
      loadContent();
    };
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    // Listen for direct localStorage changes
    window.addEventListener('storage', handleStorageChange);
    
    // Listen for custom content updated event
    window.addEventListener(CONTENT_UPDATED_EVENT, handleContentUpdated);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener(CONTENT_UPDATED_EVENT, handleContentUpdated);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  // When the language changes, we should refresh the content too
  useEffect(() => {
    console.log('Programs page - Language changed, refreshing content');
    // This forces a re-render with the new language
    setForceRefresh(prev => prev + 1);
  }, [language]);
  
  // Get section content by id
  const getSectionContent = (sectionId: string, defaultText: string) => {
    if (!pageContent || !pageContent.sections) return defaultText;
    
    const section = pageContent.sections.find(s => s.id === sectionId);
    if (!section) return defaultText;
    
    return section.content?.[language as 'fr' | 'ar'] || defaultText;
  };

  // Get section title by id
  const getSectionTitle = (sectionId: string, defaultText: string) => {
    if (!pageContent || !pageContent.sections) return defaultText;
    
    const section = pageContent.sections.find(s => s.id === sectionId);
    if (!section || !section.title) return defaultText;
    
    return section.title[language as 'fr' | 'ar'] || defaultText;
  };

  // Get page title from content or use default
  const pageTitle = pageContent?.title?.[language as 'fr' | 'ar'] || 
    (language === 'fr' ? 'Nos Programmes' : 'برامجنا');
  
  // Get page subtitle or use default
  const pageSubtitle = getSectionContent('intro',
    language === 'fr' 
      ? 'À travers nos divers programmes, nous travaillons à promouvoir et à protéger les droits humains, à renforcer les capacités de la société civile et à créer une culture de sensibilisation et de défense des droits.' 
      : 'من خلال برامجنا المتنوعة، نعمل على تعزيز وحماية حقوق الإنسان، وبناء قدرات المجتمع المدني، وخلق ثقافة الوعي والدفاع عن الحقوق.');
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };
  
  return (
    <div key={`programs-${forceRefresh}`} suppressHydrationWarning className="bg-white">
      {/* Page Header */}
      <PageHeader 
        title={pageTitle}
        subtitle={pageSubtitle}
        language={language as 'fr' | 'ar'}
      />
      
      <div className="bg-gray-50 pt-12 pb-24 relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
          <motion.div 
            className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-[#2AA084]/40 blur-3xl"
            animate={{
              x: [0, 30, 0],
              y: [0, 20, 0],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="absolute top-1/3 right-0 w-96 h-96 rounded-full bg-orange/30 blur-3xl"
            animate={{
              x: [0, -40, 0],
              y: [0, 50, 0],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="absolute bottom-0 left-1/4 w-80 h-80 rounded-full bg-[#8FD694]/30 blur-3xl"
            animate={{
              x: [0, 60, 0],
              y: [0, -30, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
      
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-2">{language === 'fr' ? 'Nos domaines de programmes' : 'مجالات برامجنا'}</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-orange mx-auto"></div>
          </motion.div>
          
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {programs.map((program, index) => (
              <motion.div 
                key={program.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-shadow duration-300 border border-gray-100"
                variants={itemVariants}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="relative overflow-hidden h-48">
                  <div className="h-12 w-full absolute top-0 left-0 bg-gradient-to-r from-primary to-[#8FD694] opacity-90 z-10 flex items-center justify-start pl-6">
                    <h3 className="text-xl font-bold text-white">
                      {program.titleKey === 'programs.training' 
                        ? (language === 'fr' ? 'Formation & Renforcement' : 'التدريب والتعزيز')
                        : program.titleKey === 'programs.advocacy'
                          ? (language === 'fr' ? 'Plaidoyer & Sensibilisation' : 'المناصرة والتوعية')
                          : (language === 'fr' ? 'Recherche & Documentation' : 'البحث والتوثيق')
                      }
                    </h3>
                  </div>
                  <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
                    <div className={`rounded-full p-5 ${program.id === 'training' ? 'bg-[#8FD694]' : program.id === 'advocacy' ? 'bg-orange' : 'bg-primary'} text-3xl`}>
                    {program.icon}
                    </div>
                  </div>
                </div>
                
                <div className="p-6 relative">
                  <div className="prose prose-lg max-w-none" dir={language === 'ar' ? 'rtl' : 'ltr'}>
                    {program.id === 'training' ? (
                      <div>
                        {language === 'fr' ? (
                          <div className="space-y-4">
                            <p className="text-gray-700">Dans le cadre de notre engagement pour la promotion, la diffusion et la protection des droits humains en Algérie, la Fondation pour la promotion des droits a organisé une formation nationale intitulée :</p>
                            
                            <blockquote className="pl-4 border-l-4 border-[#8FD694] italic font-medium text-gray-800">
                              "Les mécanismes nationaux de défense des droits humains"
                            </blockquote>
                            
                            <p className="text-gray-700">Destinée aux jeunes activistes et étudiants en droit issus de toutes les wilayas du pays.</p>
                            
                            <p className="text-gray-700">Cette initiative s'inscrit dans notre plan stratégique de renforcement des capacités de la jeunesse algérienne engagée, en leur offrant des outils pratiques pour défendre efficacement les droits humains, conformément à la Constitution algérienne de novembre 2020 et aux traités internationaux en vigueur.</p>
                            
                            <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-primary">
                              <h4 className="font-bold text-gray-800 mb-2">La session a été marquée par plusieurs volets importants :</h4>
                              <ul className="list-disc list-inside space-y-1 text-gray-700">
                                <li>Une analyse approfondie de la Constitution ainsi que des textes législatifs en vigueur</li>
                                <li>Un examen des accords internationaux ratifiés par l'Algérie</li>
                                <li>Des ateliers pratiques visant à maîtriser l'utilisation de ces instruments juridiques dans les contextes professionnels et militants</li>
                              </ul>
                            </div>
                            
                            <div className="bg-[#8FD694]/10 p-4 rounded-lg">
                              <p className="text-gray-700"><span className="font-bold">Formations à venir :</span> Nous aurons des formations tout au long de l'année. La prochaine formation sera sur le thème de la protection digitale, programmée pour le mois de juin. Plus de détails seront fournis les jours à venir.</p>
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-4 text-right">
                            <p className="text-gray-700">في إطار التزامنا بتعزيز ونشر وحماية حقوق الإنسان في الجزائر، نظمت المؤسسة من أجل ترقية الحقوق تدريبًا وطنيًا بعنوان:</p>
                            
                            <blockquote className="pr-4 border-r-4 border-[#8FD694] italic font-medium text-gray-800 text-right">
                              "الآليات الوطنية للدفاع عن حقوق الإنسان"
                            </blockquote>
                            
                            <p className="text-gray-700">موجه للناشطين الشباب وطلاب القانون من جميع ولايات البلاد.</p>
                            
                            <p className="text-gray-700">تندرج هذه المبادرة ضمن خطتنا الاستراتيجية لتعزيز قدرات الشباب الجزائري الملتزم، من خلال تزويدهم بأدوات عملية للدفاع الفعال عن حقوق الإنسان، وفقًا لدستور نوفمبر 2020 والاتفاقيات الدولية السارية.</p>
                            
                            <div className="bg-gray-50 p-4 rounded-lg border-r-4 border-primary">
                              <h4 className="font-bold text-gray-800 mb-2">تميزت الدورة بعدة محاور هامة منها:</h4>
                              <ul className="list-disc list-inside space-y-1 text-gray-700">
                                <li>تحليل معمق للدستور والنصوص التشريعية السارية</li>
                                <li>دراسة الاتفاقيات الدولية التي صادقت عليها الجزائر</li>
                                <li>ورشات تطبيقية لإتقان استخدام هذه الأدوات القانونية في السياقات المهنية والنضالية</li>
                              </ul>
                            </div>
                            
                            <div className="bg-[#8FD694]/10 p-4 rounded-lg">
                              <p className="text-gray-700"><span className="font-bold">الدورات القادمة:</span> ستتواصل الدورات التدريبية على مدار السنة، وستكون الدورة القادمة حول موضوع الحماية الرقمية مبرمجة لشهر جوان، وسيتم تقديم تفاصيل أكثر في الأيام القادمة.</p>
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div>
                        <p className={`text-gray-700 ${language === 'ar' ? 'text-right' : ''}`}>
                    {language === 'fr' ? program.descriptionFr : program.descriptionAr}
                  </p>
                        
                        {program.featuresFr.length > 0 && (
                          <div className={`mt-4 ${language === 'ar' ? 'text-right' : ''}`}>
                            <h4 className="font-bold text-gray-800 mb-2">
                              {language === 'fr' ? 'Composantes Clés:' : 'المكونات الرئيسية:'}
                            </h4>
                            <ul className="list-disc list-inside space-y-1 text-gray-700">
                              {language === 'fr' 
                                ? program.featuresFr.map((feature, i) => (
                                    <li key={i}>{feature}</li>
                                  ))
                                : program.featuresAr.map((feature, i) => (
                                    <li key={i}>{feature}</li>
                                  ))
                              }
                  </ul>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  
                  <Link href={`/programs#${program.id}`} className="mt-6 inline-flex items-center gap-2 text-primary hover:text-[#8FD694] transition-colors font-medium">
                    {language === 'fr' ? 'En Savoir Plus' : 'اقرأ المزيد'}
                    <span className={`${language === 'ar' ? 'rotate-180' : ''}`}>
                      <FaArrowRight />
                    </span>
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div 
            className="bg-white rounded-xl shadow-xl p-8 mb-24 relative overflow-hidden"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {/* Enhanced decorative accents */}
            <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-orange/5 to-[#2AA084]/10 rounded-br-[100px]"></div>
            <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-tl from-[#8FD694]/10 to-transparent rounded-tl-[100px]"></div>
            
            {/* Animated background elements */}
            <motion.div 
              className="absolute top-1/3 left-1/4 w-6 h-6 rounded-full bg-[#2AA084]/10"
              animate={{
                y: [0, -15, 0],
                opacity: [0.4, 0.7, 0.4],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div 
              className="absolute bottom-1/3 right-1/4 w-8 h-8 rounded-full bg-orange/10"
              animate={{
                y: [0, 20, 0],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            <div className="relative">
              <motion.h2 
                className="text-3xl font-bold text-gray-900 mb-2 text-center"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
              >
                {language === 'fr' ? 'Notre Approche de Mise en Œuvre' : 'نهجنا في التنفيذ'}
              </motion.h2>
              <motion.p 
                className="text-center text-gray-600 mb-6 max-w-2xl mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                {language === 'fr' ? 'Notre méthodologie assure que nos programmes sont efficaces, inclusifs et adaptés aux besoins locaux.' : 'تضمن منهجيتنا أن برامجنا فعالة وشاملة ومكيفة للاحتياجات المحلية.'}
              </motion.p>
              <motion.div 
                className="w-28 h-1.5 bg-gradient-to-r from-orange to-primary mx-auto mb-12"
                initial={{ width: 0 }}
                animate={{ width: "7rem" }}
                transition={{ duration: 0.7, delay: 0.4 }}
              />
            </div>
            
            <div className="grid md:grid-cols-2 gap-x-16 gap-y-10 relative z-10">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="relative bg-gradient-to-br from-white to-gray-50 rounded-xl p-8 shadow-lg border-t border-l border-white/50"
                whileHover={{ 
                  y: -5,
                  boxShadow: "0 15px 30px rgba(0,0,0,0.1)",
                  transition: { duration: 0.3 }
                }}
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#8FD694]/10 rounded-full blur-xl"></div>
                
                <motion.div 
                  className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#8FD694] to-[#2AA084] flex items-center justify-center shadow-lg mb-6"
                  whileHover={{ 
                    rotate: 5, 
                    scale: 1.05,
                    transition: { duration: 0.2 } 
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </motion.div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {language === 'fr' ? 'Méthodologie Participative' : 'المنهجية التشاركية'}
                </h3>
                
                <p className="text-gray-700 mb-6 leading-relaxed">
                  {language === 'fr' ? 'Nous utilisons des approches participatives qui impliquent les bénéficiaires dans la conception et la mise en œuvre des programmes, assurant la pertinence, l\'appropriation et la durabilité. Nos méthodes comprennent:' : 'نستخدم نهجًا تشاركيًا يشرك المستفيدين في تصميم وتنفيذ البرامج، مما يضمن الملاءمة والملكية والاستدامة. تشمل طرقنا:'}
                </p>
                
                <ul className="space-y-4">
                  {[
                    {fr: 'Évaluations des besoins avec les groupes cibles', ar: 'تقييمات الاحتياجات مع المجموعات المستهدفة'},
                    {fr: 'Conception collaborative des programmes', ar: 'التصميم التعاوني للبرامج'},
                    {fr: 'Mécanismes de retour d\'information réguliers', ar: 'آليات التغذية الراجعة المنتظمة'},
                    {fr: 'Stratégies de mise en œuvre adaptatives', ar: 'استراتيجيات التنفيذ التكيفية'}
                  ].map((item, index) => (
                    <motion.li 
                      key={index} 
                      className="flex items-start bg-white p-3 rounded-lg shadow-sm border border-gray-50"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.5 + (index * 0.1) }}
                      whileHover={{ 
                        x: 5, 
                        backgroundColor: "rgba(143, 214, 148, 0.05)",
                        borderColor: "rgba(143, 214, 148, 0.2)",
                        transition: { duration: 0.2 }
                      }}
                    >
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#8FD694]/20 flex items-center justify-center mr-3">
                        <span className="w-2 h-2 rounded-full bg-[#8FD694]"></span>
                      </span>
                      <span className="text-gray-700">{language === 'fr' ? item.fr : item.ar}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="relative bg-gradient-to-br from-white to-gray-50 rounded-xl p-8 shadow-lg border-t border-l border-white/50"
                whileHover={{ 
                  y: -5,
                  boxShadow: "0 15px 30px rgba(0,0,0,0.1)",
                  transition: { duration: 0.3 }
                }}
              >
                <div className="absolute top-0 left-0 w-24 h-24 bg-[#171717]/5 rounded-full blur-xl"></div>
                
                <motion.div 
                  className="w-14 h-14 rounded-xl bg-gradient-to-br from-gray-700 to-[#171717] flex items-center justify-center shadow-lg mb-6"
                  whileHover={{ 
                    rotate: -5, 
                    scale: 1.05,
                    transition: { duration: 0.2 } 
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </motion.div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {language === 'fr' ? 'Gestion Axée sur les Résultats' : 'الإدارة القائمة على النتائج'}
                </h3>
                
                <p className="text-gray-700 mb-6 leading-relaxed">
                  {language === 'fr' ? 'Nous mettons en œuvre un cadre de gestion axée sur les résultats pour assurer l\'efficacité et l\'impact des programmes. Notre approche comprend:' : 'نطبق إطار الإدارة القائمة على النتائج لضمان فعالية وتأثير البرامج. يتضمن نهجنا:'}
                </p>
                
                <ul className="space-y-4">
                  {[
                    {fr: 'Objectifs clairs et indicateurs mesurables', ar: 'أهداف واضحة ومؤشرات قابلة للقياس'},
                    {fr: 'Suivi et évaluation systématiques', ar: 'الرصد والتقييم المنهجي'},
                    {fr: 'Documentation des leçons apprises', ar: 'توثيق الدروس المستفادة'},
                    {fr: 'Processus d\'amélioration continue', ar: 'عمليات التحسين المستمر'}
                  ].map((item, index) => (
                    <motion.li 
                      key={index} 
                      className="flex items-start bg-white p-3 rounded-lg shadow-sm border border-gray-50"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.6 + (index * 0.1) }}
                      whileHover={{ 
                        x: -5, 
                        backgroundColor: "rgba(23, 23, 23, 0.02)",
                        borderColor: "rgba(23, 23, 23, 0.1)",
                        transition: { duration: 0.2 }
                      }}
                    >
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#171717]/10 flex items-center justify-center mr-3">
                        <span className="w-2 h-2 rounded-full bg-[#171717]"></span>
                      </span>
                      <span className="text-gray-700">{language === 'fr' ? item.fr : item.ar}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Newsletter section - Placed outside of container, directly like on homepage */}
      <Newsletter />
    </div>
  );
} 