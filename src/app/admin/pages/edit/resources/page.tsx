'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { FaArrowLeft } from 'react-icons/fa';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import AdminSidebar from '@/components/AdminSidebar';
import { getExactPageContent, setPageContent, PageContent } from '@/lib/database';
import PageContentEditor from '@/components/PageContentEditor';

// Custom event name for content updates
const CONTENT_UPDATED_EVENT = 'content_updated';

export default function EditResourcesPage() {
  const router = useRouter();
  const { language } = useLanguage();
  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [pageContent, setPageData] = useState<PageContent | null>(null);
  const [forceRefresh, setForceRefresh] = useState(0);

  // Create a memoized loadPageContent function that can be used in event handlers
  const loadPageContent = useCallback(() => {
    try {
      // Get the exact page content (from editor or live)
      const content = getExactPageContent('resources');
      
      // Initialize with default content if empty
      if (!content.sections || content.sections.length === 0) {
        content.sections = [
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
        ];
        
        // Save the initialized content
        setPageContent(content);
      }
      
      setPageData(content);
      setIsLoading(false);
      setForceRefresh(prev => prev + 1);
      
      console.log('Resources page editor - Loaded content with sections:', content?.sections?.map(s => s.id) || []);
    } catch (error) {
      console.error('Error loading resources page content in editor:', error);
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    setIsClient(true);
    
    // Initial content load
    loadPageContent();
    
    // Add event listeners for content updates
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'page_resources' || event.key === 'editor_resources') {
        console.log('Resources page editor - Storage change detected for key:', event.key);
        loadPageContent();
      }
    };
    
    const handleContentUpdated = () => {
      console.log('Resources page editor - Content updated event received');
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
      console.log('Resources page editor - Language changed, refreshing content');
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
          key: `page_resources`,
          newValue: contentString
        }));
        
        window.dispatchEvent(new StorageEvent('storage', {
          key: `editor_resources`,
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
      console.error('Error saving resources content:', error);
      return false;
    }
  };

  // Only render on client side to avoid hydration issues
  if (!isClient) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex" key={`resources-editor-${forceRefresh}`} suppressHydrationWarning>
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
              {language === 'fr' ? 'Éditer la page Ressources' : 'تحرير صفحة الموارد'}
            </h1>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <p className="text-gray-600 mb-6">
            {language === 'fr' 
              ? 'Modifiez le contenu de la page des ressources ci-dessous. Les modifications seront visibles sur le site après l\'enregistrement.'
              : 'قم بتعديل محتوى صفحة الموارد أدناه. ستظهر التغييرات على الموقع بعد الحفظ.'}
          </p>
          
          <PageContentEditor
            pageId="resources"
            initialContent={pageContent}
            onSave={handleSave}
            isLoading={isLoading}
          />
        </div>
      </main>
    </div>
  );
} 