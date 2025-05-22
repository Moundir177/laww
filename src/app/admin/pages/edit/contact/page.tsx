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

export default function EditContactPage() {
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
      const content = getExactPageContent('contact');
      console.log('Contact page editor - Loaded content with sections:', content?.sections?.map(s => s.id) || []);
      
      setPageData(content);
      setIsLoading(false);
      
      // Force a re-render by incrementing the forceRefresh counter
      setForceRefresh(prev => prev + 1);
    } catch (error) {
      console.error('Error loading contact page content in editor:', error);
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    setIsClient(true);
    
    // Initial content load
    loadPageContent();
    
    // Add event listeners for content updates
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'page_contact' || event.key === 'editor_contact') {
        console.log('Contact page editor - Storage change detected for key:', event.key);
        loadPageContent();
      }
    };
    
    const handleContentUpdated = () => {
      console.log('Contact page editor - Content updated event received');
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
      console.log('Contact page editor - Language changed, refreshing content');
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
          key: `page_contact`,
          newValue: contentString
        }));
        
        window.dispatchEvent(new StorageEvent('storage', {
          key: `editor_contact`,
          newValue: contentString
        }));
        
        // Force a re-render on this component too
        setForceRefresh(prev => prev + 1);
        
        // Redirect after short delay
        setTimeout(() => {
          router.push('/admin/pages');
        }, 1500);
      }
      
      return success;
    } catch (error) {
      console.error('Error saving content', error);
      return false;
    }
  };

  // Only render on client side to avoid hydration issues
  if (!isClient) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex" key={forceRefresh}>
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
              {language === 'fr' ? 'Éditer la page contact' : 'تحرير صفحة الاتصال'}
            </h1>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <p className="text-gray-600 mb-6">
            {language === 'fr' 
              ? 'Modifiez le contenu de la page contact ci-dessous. Les modifications seront visibles sur le site après l\'enregistrement.'
              : 'قم بتعديل محتوى صفحة الاتصال أدناه. ستظهر التغييرات على الموقع بعد الحفظ.'}
          </p>
          
          <PageContentEditor
            pageId="contact"
            initialContent={pageContent}
            onSave={handleSave}
            isLoading={isLoading}
          />
        </div>
      </main>
    </div>
  );
} 