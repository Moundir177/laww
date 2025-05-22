'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { FaArrowLeft } from 'react-icons/fa';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import AdminSidebar from '@/components/AdminSidebar';
import { getExactPageContent, setPageContent, PageContent, updateProgramsPageWithAllSections } from '@/lib/database';
import PageContentEditor from '@/components/PageContentEditor';

// Define all required sections for the Programs page
const REQUIRED_PROGRAM_SECTIONS = [
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
    id: 'participatory',
    title: { fr: 'Méthodologie Participative', ar: 'المنهجية التشاركية' },
    content: { 
      fr: 'Nous utilisons des approches participatives qui impliquent les bénéficiaires dans la conception et la mise en œuvre des programmes, assurant la pertinence, l\'appropriation et la durabilité.', 
      ar: 'نستخدم مناهج تشاركية تشرك المستفيدين في تصميم وتنفيذ البرامج، مما يضمن الملاءمة والملكية والاستدامة.' 
    }
  },
  {
    id: 'results_based',
    title: { fr: 'Gestion Axée sur les Résultats', ar: 'الإدارة القائمة على النتائج' },
    content: { 
      fr: 'Nous mettons en œuvre un cadre de gestion axée sur les résultats pour assurer l\'efficacité et l\'impact des programmes.', 
      ar: 'نقوم بتنفيذ إطار الإدارة القائمة على النتائج لضمان فعالية وتأثير البرامج.' 
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
    id: 'partners',
    title: { fr: 'Nos Partenaires', ar: 'شركاؤنا' },
    content: { 
      fr: 'Nous collaborons avec divers partenaires pour améliorer l\'impact et la portée de nos programmes.', 
      ar: 'نتعاون مع شركاء متنوعين لتحسين تأثير ومدى برامجنا.' 
    }
  }
];

// Custom event name for content updates
const CONTENT_UPDATED_EVENT = 'content_updated';

export default function EditProgramsPage() {
  const router = useRouter();
  const { language } = useLanguage();
  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [pageContent, setPageData] = useState<PageContent | null>(null);
  const [forceRefresh, setForceRefresh] = useState(0);

  // Function to ensure all required sections exist in the content
  const ensureAllSections = (content: PageContent): PageContent => {
    if (!content) {
      content = {
        id: 'programs',
        title: { fr: 'Nos Programmes', ar: 'برامجنا' },
        sections: []
      };
    }
    
    // Make sure sections array exists
    if (!content.sections) {
      content.sections = [];
    }
    
    // Add any missing required sections
    REQUIRED_PROGRAM_SECTIONS.forEach(requiredSection => {
      const existingSection = content.sections.find(s => s.id === requiredSection.id);
      
      if (!existingSection) {
        console.log(`Programs page editor - Adding missing section: ${requiredSection.id}`);
        content.sections.push(requiredSection);
      }
    });
    
    return content;
  };

  // Create a memoized loadPageContent function that can be used in event handlers
  const loadPageContent = useCallback(() => {
    try {
      // First update the programs page to ensure all sections exist
      updateProgramsPageWithAllSections();
      
      // Get the exact page content (from editor or live)
      let content = getExactPageContent('programs');
      
      // Ensure all required sections exist
      content = ensureAllSections(content);
      
      // Save the updated content to ensure all sections are available
      setPageContent(content);
      
      setPageData(content);
      setIsLoading(false);
      setForceRefresh(prev => prev + 1);
      
      console.log('Programs page editor - Loaded content with sections:', content?.sections?.map(s => s.id) || []);
    } catch (error) {
      console.error('Error loading programs page content in editor:', error);
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    setIsClient(true);
    
    // Initial content load
    loadPageContent();
    
    // Add event listeners for content updates
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'page_programs' || event.key === 'editor_programs') {
        console.log('Programs page editor - Storage change detected for key:', event.key);
        loadPageContent();
      }
    };
    
    const handleContentUpdated = () => {
      console.log('Programs page editor - Content updated event received');
      loadPageContent();
    };
    
    // Listen for direct localStorage changes
    window.addEventListener('storage', handleStorageChange);
    
    // Listen for our custom content updated event
    window.addEventListener(CONTENT_UPDATED_EVENT, handleContentUpdated);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener(CONTENT_UPDATED_EVENT, handleContentUpdated);
    };
  }, [loadPageContent]);

  // Also refresh when language changes
  useEffect(() => {
    if (isClient) {
      console.log('Programs page editor - Language changed, refreshing content');
      setForceRefresh(prev => prev + 1);
    }
  }, [language, isClient]);

  const handleSave = async (content: PageContent): Promise<boolean> => {
    try {
      // Save the content to localStorage
      const success = setPageContent(content);
      
      if (success) {
        // Force immediate update of the component state
        setPageData(content);
        
        // Prepare content string for events
        const contentString = JSON.stringify(content);
        
        // Dispatch a custom event to notify all components that content has been updated
        window.dispatchEvent(new Event(CONTENT_UPDATED_EVENT));
        
        // Force re-rendering of other components by triggering localStorage events
        window.dispatchEvent(new StorageEvent('storage', {
          key: `page_programs`,
          newValue: contentString
        }));
        
        window.dispatchEvent(new StorageEvent('storage', {
          key: `editor_programs`,
          newValue: contentString
        }));
        
        // Force a re-render on this component too
        setForceRefresh(prev => prev + 1);
        
        setTimeout(() => {
          router.push('/admin/pages');
        }, 1500);
      }
      
      return success;
    } catch (error) {
      console.error('Error saving programs content:', error);
      return false;
    }
  };

  // Only render on client side to avoid hydration issues
  if (!isClient) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex" key={`programs-editor-${forceRefresh}`} suppressHydrationWarning>
      <AdminSidebar />
      
      <main className="flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center">
            <Link 
              href="/admin/pages" 
              className="mr-4 p-2 bg-white rounded-md shadow hover:shadow-md"
            >
              <FaArrowLeft className="text-gray-600" />
            </Link>
            <h1 className="text-2xl font-bold text-gray-800">
              {language === 'fr' ? 'Éditer la page Programmes' : 'تحرير صفحة البرامج'}
            </h1>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <p className="text-gray-600 mb-6">
            {language === 'fr' 
              ? 'Modifiez le contenu de la page Programmes ci-dessous. Les modifications seront visibles sur le site après l\'enregistrement.'
              : 'قم بتعديل محتوى صفحة البرامج أدناه. ستظهر التغييرات على الموقع بعد الحفظ.'}
          </p>
          
          <PageContentEditor
            pageId="programs"
            initialContent={pageContent}
            onSave={handleSave}
            isLoading={isLoading}
          />
        </div>
      </main>
    </div>
  );
} 