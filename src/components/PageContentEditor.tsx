'use client';

import React, { useState, useEffect } from 'react';
import { FaSave, FaPlus, FaTrash, FaArrowUp, FaArrowDown, FaImage } from 'react-icons/fa';
import { useLanguage } from '@/contexts/LanguageContext';
import { PageContent, PageSection, TranslatedText } from '@/lib/database';

interface PageContentEditorProps {
  pageId: string;
  initialContent: PageContent | null;
  onSave: (content: PageContent) => Promise<boolean>;
  isLoading?: boolean;
}

export default function PageContentEditor({
  pageId,
  initialContent,
  onSave,
  isLoading = false
}: PageContentEditorProps) {
  const { language } = useLanguage();
  const [content, setContent] = useState<PageContent | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [successMessage, setSuccessMessage] = useState('');
  const [lastUpdated, setLastUpdated] = useState<number>(Date.now());
  const [forceRefresh, setForceRefresh] = useState(0);

  useEffect(() => {
    if (initialContent) {
      console.log(`PageContentEditor: Received updated content for ${pageId} with ${initialContent.sections.length} sections`);
      // Make sure sections array is properly defined
      const validatedContent = {
        ...initialContent,
        sections: initialContent.sections || []
      };
      setContent(validatedContent);
      setLastUpdated(Date.now());
      setForceRefresh(prev => prev + 1);
    } else {
      // Create default empty content if none provided
      console.log(`PageContentEditor: Creating default empty content for ${pageId}`);
      setContent({
        id: pageId,
        title: { fr: '', ar: '' },
        sections: []
      });
    }
  }, [initialContent, pageId]);

  const handleTitleChange = (value: string, lang: 'fr' | 'ar') => {
    if (!content) return;
    
    // Create a title object if it doesn't exist
    const currentTitle = content.title || { fr: '', ar: '' };
    
    setContent({
      ...content,
      title: {
        ...currentTitle,
        [lang]: value
      }
    });
    
    // Clear error if field was previously in error
    if (errors[`title_${lang}`]) {
      const newErrors = { ...errors };
      delete newErrors[`title_${lang}`];
      setErrors(newErrors);
    }
  };

  const handleSectionTitleChange = (sectionIndex: number, value: string, lang: 'fr' | 'ar') => {
    if (!content) return;
    
    const updatedSections = [...content.sections];
    const section = { ...updatedSections[sectionIndex] };
    
    // Create a title object if it doesn't exist
    const currentTitle = section.title || { fr: '', ar: '' };
    
    section.title = {
      ...currentTitle,
      [lang]: value
    };
    
    updatedSections[sectionIndex] = section;
    
    setContent({
      ...content,
      sections: updatedSections
    });
    
    // Clear error if field was previously in error
    if (errors[`section_${sectionIndex}_title_${lang}`]) {
      const newErrors = { ...errors };
      delete newErrors[`section_${sectionIndex}_title_${lang}`];
      setErrors(newErrors);
    }
  };

  const handleSectionContentChange = (sectionIndex: number, value: string, lang: 'fr' | 'ar') => {
    if (!content) return;
    
    const updatedSections = [...content.sections];
    const section = { ...updatedSections[sectionIndex] };
    
    // Create a content object if it doesn't exist
    const currentContent = section.content || { fr: '', ar: '' };
    
    section.content = {
      ...currentContent,
      [lang]: value
    };
    
    updatedSections[sectionIndex] = section;
    
    setContent({
      ...content,
      sections: updatedSections
    });
    
    // Clear error if field was previously in error
    if (errors[`section_${sectionIndex}_content_${lang}`]) {
      const newErrors = { ...errors };
      delete newErrors[`section_${sectionIndex}_content_${lang}`];
      setErrors(newErrors);
    }
  };

  const handleImageChange = (sectionIndex: number, event: React.ChangeEvent<HTMLInputElement>) => {
    if (!content || !event.target.files || event.target.files.length === 0) return;
    
    const file = event.target.files[0];
    const reader = new FileReader();
    
    reader.onloadend = () => {
      const updatedSections = [...content.sections];
      const section = { ...updatedSections[sectionIndex] };
      
      // Store the image data URL
      section.image = reader.result as string;
      
      updatedSections[sectionIndex] = section;
      
      setContent({
        ...content,
        sections: updatedSections
      });
    };
    
    reader.readAsDataURL(file);
  };

  const addNewSection = () => {
    if (!content) return;
    
    const newSectionId = `section_${Date.now()}`;
    console.log(`PageContentEditor: Adding new section with ID ${newSectionId}`);
    
    const newSection: PageSection = {
      id: newSectionId,
      title: { fr: 'Nouvelle section', ar: 'قسم جديد' },
      content: { fr: '', ar: '' }
    };
    
    setContent({
      ...content,
      sections: [...content.sections, newSection]
    });
  };

  const deleteSection = (index: number) => {
    if (!content) return;
    
    if (window.confirm(language === 'fr' 
      ? 'Êtes-vous sûr de vouloir supprimer cette section ?' 
      : 'هل أنت متأكد أنك تريد حذف هذا القسم؟')) {
      
      const sectionToDelete = content.sections[index];
      console.log(`PageContentEditor: Deleting section at index ${index} with ID ${sectionToDelete.id}`);
      
      const updatedSections = [...content.sections];
      updatedSections.splice(index, 1);
      
      setContent({
        ...content,
        sections: updatedSections
      });
    }
  };

  const moveSection = (index: number, direction: 'up' | 'down') => {
    if (!content) return;
    
    const updatedSections = [...content.sections];
    
    if (direction === 'up' && index > 0) {
      // Swap with previous section
      [updatedSections[index - 1], updatedSections[index]] = 
        [updatedSections[index], updatedSections[index - 1]];
    } else if (direction === 'down' && index < updatedSections.length - 1) {
      // Swap with next section
      [updatedSections[index], updatedSections[index + 1]] = 
        [updatedSections[index + 1], updatedSections[index]];
    }
    
    setContent({
      ...content,
      sections: updatedSections
    });
  };
  
  const validate = (): boolean => {
    if (!content) return false;
    
    const newErrors: Record<string, string> = {};
    
    // Validate page title
    if (!content.title) {
      newErrors.title_fr = language === 'fr' 
        ? 'Le titre est manquant' 
        : 'العنوان مفقود';
      newErrors.title_ar = language === 'fr'
        ? 'Le titre est manquant'
        : 'العنوان مفقود';
    } else {
      if (!content.title.fr || !content.title.fr.trim()) {
        newErrors.title_fr = language === 'fr' 
          ? 'Le titre en français est requis' 
          : 'العنوان بالفرنسية مطلوب';
      }
      
      if (!content.title.ar || !content.title.ar.trim()) {
        newErrors.title_ar = language === 'fr'
          ? 'Le titre en arabe est requis'
          : 'العنوان بالعربية مطلوب';
      }
    }
    
    // Validate sections
    if (!content.sections) {
      newErrors.sections = language === 'fr'
        ? 'Au moins une section est requise'
        : 'مطلوب قسم واحد على الأقل';
    } else {
      content.sections.forEach((section, index) => {
        if (!section.content) {
          newErrors[`section_${index}_content`] = language === 'fr'
            ? 'Le contenu de la section est manquant'
            : 'محتوى القسم مفقود';
        } else {
          if (!section.content.fr || !section.content.fr.trim()) {
            newErrors[`section_${index}_content_fr`] = language === 'fr'
              ? 'Le contenu en français est requis'
              : 'المحتوى بالفرنسية مطلوب';
          }
          
          if (!section.content.ar || !section.content.ar.trim()) {
            newErrors[`section_${index}_content_ar`] = language === 'fr'
              ? 'Le contenu en arabe est requis'
              : 'المحتوى بالعربية مطلوب';
          }
        }
      });
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Custom event name for content updates
  const CONTENT_UPDATED_EVENT = 'content_updated';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!content || !validate()) return;
    
    setIsSaving(true);
    
    try {
      console.log(`PageContentEditor: Saving content for ${pageId} with ${content.sections.length} sections`);
      
      // Make sure all sections have a unique ID and proper structure
      const secureContent = {
        ...content,
        // Ensure content has a proper title
        title: content.title || { fr: pageId.charAt(0).toUpperCase() + pageId.slice(1), ar: pageId },
        sections: content.sections.map(section => {
          // Create a new section with all required properties
          const secureSection = { ...section };
          
          // Generate ID if missing
          if (!secureSection.id) {
            secureSection.id = `section_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
          }
          
          // Ensure title is properly defined
          if (!secureSection.title) {
            secureSection.title = { 
              fr: secureSection.id.charAt(0).toUpperCase() + secureSection.id.slice(1).replace(/_/g, ' '), 
              ar: secureSection.id 
            };
          } else {
            // Make sure fr and ar properties exist
            if (!secureSection.title.fr) {
              secureSection.title.fr = secureSection.id.charAt(0).toUpperCase() + secureSection.id.slice(1).replace(/_/g, ' ');
            }
            if (!secureSection.title.ar) {
              secureSection.title.ar = secureSection.id;
            }
          }
          
          // Ensure content is properly defined
          if (!secureSection.content) {
            secureSection.content = { fr: '', ar: '' };
          } else {
            // Make sure fr and ar properties exist
            if (!secureSection.content.fr) {
              secureSection.content.fr = '';
            }
            if (!secureSection.content.ar) {
              secureSection.content.ar = '';
            }
          }
          
          return secureSection;
        })
      };
      
      const success = await onSave(secureContent);
      
      if (success) {
        setSuccessMessage(language === 'fr'
          ? 'Contenu enregistré avec succès'
          : 'تم حفظ المحتوى بنجاح');
          
        // Convert content to string once for efficiency
        const contentString = JSON.stringify(secureContent);
        
        // Dispatch a custom event to notify all components that content has been updated
        window.dispatchEvent(new Event(CONTENT_UPDATED_EVENT));
        
        // Force re-rendering of other components by triggering localStorage events
        // Send events for both page and editor keys to ensure all components update
        window.dispatchEvent(new StorageEvent('storage', {
          key: `page_${pageId}`,
          newValue: contentString
        }));
        
        window.dispatchEvent(new StorageEvent('storage', {
          key: `editor_${pageId}`,
          newValue: contentString
        }));
        
        // Force local re-render
        setForceRefresh(prev => prev + 1);
        
        // Add to recent edits in localStorage
        const recentEditKey = 'recentEdits';
        const storedEdits = localStorage.getItem(recentEditKey);
        let recentEdits = [];
        
        if (storedEdits) {
          try {
            recentEdits = JSON.parse(storedEdits);
          } catch (e) {
            console.error('Error parsing recent edits:', e);
            recentEdits = [];
          }
        }
        
        // Add new edit at the beginning and limit to 10 items
        const newEdit = {
          id: Date.now(),
          page: secureContent.title?.[language] || pageId,
          date: new Date().toISOString().split('T')[0],
          user: 'admin'
        };
        
        recentEdits = [newEdit, ...recentEdits.filter((edit: {page: string}) => 
          edit.page !== (secureContent.title?.[language] || '')
        )].slice(0, 10);
        
        localStorage.setItem(recentEditKey, JSON.stringify(recentEdits));
        
        console.log(`PageContentEditor: Content updated for page ${pageId}, triggering real-time updates`);
        
        // Record last updated time
        setLastUpdated(Date.now());
        
        // Hide success message after 3 seconds
        setTimeout(() => {
          setSuccessMessage('');
        }, 3000);
      } else {
        console.error('Failed to save content');
      }
    } catch (error) {
      console.error('Error saving content', error);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading || !content) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8" key={`editor-${lastUpdated}_${forceRefresh}`} suppressHydrationWarning>
      {/* Success message */}
      {successMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
          {successMessage}
        </div>
      )}
      
      {/* Page Title */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-4">
          {language === 'fr' ? 'Titre de la page' : 'عنوان الصفحة'}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 mb-2">
              {language === 'fr' ? 'Titre (Français)' : 'العنوان (الفرنسية)'}
            </label>
            <input
              type="text"
              value={content?.title?.fr || ''}
              onChange={e => handleTitleChange(e.target.value, 'fr')}
              className={`w-full p-2 border rounded-md ${errors.title_fr ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.title_fr && (
              <p className="text-red-500 text-sm mt-1">{errors.title_fr}</p>
            )}
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2">
              {language === 'fr' ? 'Titre (Arabe)' : 'العنوان (العربية)'}
            </label>
            <input
              type="text"
              value={content?.title?.ar || ''}
              onChange={e => handleTitleChange(e.target.value, 'ar')}
              className={`w-full p-2 border rounded-md text-right ${errors.title_ar ? 'border-red-500' : 'border-gray-300'}`}
              dir="rtl"
            />
            {errors.title_ar && (
              <p className="text-red-500 text-sm mt-1">{errors.title_ar}</p>
            )}
          </div>
        </div>
      </div>
      
      {/* Sections */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">
            {language === 'fr' ? 'Sections' : 'الأقسام'}
          </h2>
          <button
            type="button"
            onClick={addNewSection}
            className="flex items-center bg-green-500 text-white px-3 py-2 rounded-md hover:bg-green-600"
          >
            <FaPlus className="mr-2" />
            {language === 'fr' ? 'Ajouter une section' : 'إضافة قسم'}
          </button>
        </div>
        
        {content.sections.length === 0 ? (
          <div className="bg-gray-100 p-6 rounded-lg text-center">
            <p className="text-gray-600">
              {language === 'fr' 
                ? 'Aucune section disponible. Cliquez sur "Ajouter une section" pour commencer.' 
                : 'لا توجد أقسام متاحة. انقر على "إضافة قسم" للبدء.'}
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {content.sections.map((section, index) => (
              <div key={section.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">
                    {language === 'fr' ? `Section ${index + 1}` : `القسم ${index + 1}`}
                  </h3>
                  <div className="flex space-x-2">
                    <button
                      type="button"
                      onClick={() => moveSection(index, 'up')}
                      disabled={index === 0}
                      className={`p-2 rounded-md ${
                        index === 0 ? 'text-gray-400 bg-gray-100' : 'text-blue-500 bg-blue-100 hover:bg-blue-200'
                      }`}
                    >
                      <FaArrowUp />
                    </button>
                    <button
                      type="button"
                      onClick={() => moveSection(index, 'down')}
                      disabled={index === content.sections.length - 1}
                      className={`p-2 rounded-md ${
                        index === content.sections.length - 1 
                          ? 'text-gray-400 bg-gray-100' 
                          : 'text-blue-500 bg-blue-100 hover:bg-blue-200'
                      }`}
                    >
                      <FaArrowDown />
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteSection(index)}
                      className="p-2 text-red-500 bg-red-100 rounded-md hover:bg-red-200"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
                
                {/* Section Title */}
                <div className="mb-6">
                  <h4 className="font-medium mb-2">
                    {language === 'fr' ? 'Titre de la section' : 'عنوان القسم'}
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <input
                        type="text"
                        value={section.title?.fr || ''}
                        onChange={e => handleSectionTitleChange(index, e.target.value, 'fr')}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        placeholder={language === 'fr' ? 'Titre en français' : 'العنوان بالفرنسية'}
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        value={section.title?.ar || ''}
                        onChange={e => handleSectionTitleChange(index, e.target.value, 'ar')}
                        className="w-full p-2 border border-gray-300 rounded-md text-right"
                        dir="rtl"
                        placeholder={language === 'fr' ? 'Titre en arabe' : 'العنوان بالعربية'}
                      />
                    </div>
                  </div>
                </div>
                
                {/* Section Content */}
                <div className="mb-6">
                  <h4 className="font-medium mb-2">
                    {language === 'fr' ? 'Contenu de la section' : 'محتوى القسم'}
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <textarea
                        value={section.content.fr}
                        onChange={e => handleSectionContentChange(index, e.target.value, 'fr')}
                        className={`w-full p-2 border rounded-md h-32 ${
                          errors[`section_${index}_content_fr`] ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder={language === 'fr' ? 'Contenu en français' : 'المحتوى بالفرنسية'}
                      ></textarea>
                      {errors[`section_${index}_content_fr`] && (
                        <p className="text-red-500 text-sm mt-1">{errors[`section_${index}_content_fr`]}</p>
                      )}
                    </div>
                    <div>
                      <textarea
                        value={section.content.ar}
                        onChange={e => handleSectionContentChange(index, e.target.value, 'ar')}
                        className={`w-full p-2 border rounded-md h-32 text-right ${
                          errors[`section_${index}_content_ar`] ? 'border-red-500' : 'border-gray-300'
                        }`}
                        dir="rtl"
                        placeholder={language === 'fr' ? 'Contenu en arabe' : 'المحتوى بالعربية'}
                      ></textarea>
                      {errors[`section_${index}_content_ar`] && (
                        <p className="text-red-500 text-sm mt-1">{errors[`section_${index}_content_ar`]}</p>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Section Image */}
                <div>
                  <h4 className="font-medium mb-2">
                    {language === 'fr' ? 'Image de la section (optionnelle)' : 'صورة القسم (اختيارية)'}
                  </h4>
                  <div className="flex items-start space-x-4">
                    <div className="flex-1">
                      <div className="border border-gray-300 rounded-md p-4">
                        <div className="flex items-center">
                          <FaImage className="text-gray-500 mr-2" />
                          <input
                            type="file"
                            accept="image/*"
                            onChange={e => handleImageChange(index, e)}
                            className="flex-1"
                          />
                        </div>
                      </div>
                    </div>
                    
                    {section.image && (
                      <div className="w-24 h-24 relative border border-gray-300 rounded-md overflow-hidden">
                        <img 
                          src={section.image} 
                          alt={`Section ${index + 1}`} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSaving}
          className={`flex items-center px-4 py-2 rounded-md ${
            isSaving 
              ? 'bg-gray-400 text-white cursor-not-allowed' 
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          {isSaving ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {language === 'fr' ? 'Enregistrement...' : 'جاري الحفظ...'}
            </>
          ) : (
            <>
              <FaSave className="mr-2" />
              {language === 'fr' ? 'Enregistrer' : 'حفظ'}
            </>
          )}
        </button>
      </div>
    </form>
  );
} 