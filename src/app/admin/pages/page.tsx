'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import AdminLayout from '@/components/admin/AdminLayout';
import { FaEdit, FaSave, FaTimes, FaPlus, FaTrash } from 'react-icons/fa';
import { 
  getPages, 
  getPageContent, 
  savePageContent, 
  saveSection, 
  deleteSection,
  PageContent,
  PageSection 
} from '@/lib/database';

export default function PagesAdmin() {
  const { language } = useLanguage();
  const [pages, setPages] = useState<string[]>([]);
  const [selectedPage, setSelectedPage] = useState<string>('');
  const [pageContent, setPageContent] = useState<PageContent | null>(null);
  const [editedContent, setEditedContent] = useState<PageContent | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadPages();
  }, []);

  const loadPages = async () => {
    setIsLoading(true);
    try {
      const pagesData = await getPages();
      const pageIds = pagesData.map(page => page.id);
      setPages(pageIds);
    } catch (error) {
      console.error('Error loading pages:', error);
      setMessage('Error loading pages');
    } finally {
      setIsLoading(false);
    }
  };

  const loadPageContent = async (pageId: string) => {
    setIsLoading(true);
    try {
      const content = await getPageContent(pageId);
      if (content) {
        setPageContent(content);
        setEditedContent(JSON.parse(JSON.stringify(content))); // Deep copy
      } else {
        setMessage(`No content found for page: ${pageId}`);
      }
      setSelectedPage(pageId);
      setIsEditing(false);
    } catch (error) {
      console.error('Error loading page content:', error);
      setMessage('Error loading content');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveContent = async () => {
    if (!editedContent) return;
    
    setIsLoading(true);
    try {
      const success = await savePageContent(editedContent);
      
      if (success) {
        // Save each section
        for (const section of editedContent.sections) {
          await saveSection(section, editedContent.id);
        }
        
        setPageContent(editedContent);
        setIsEditing(false);
        setMessage('Content saved successfully!');
      } else {
        setMessage('Error saving content');
      }
    } catch (error) {
      console.error('Error saving content:', error);
      setMessage('Error saving content');
    } finally {
      setIsLoading(false);
      
      // Clear message after 3 seconds
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const handleEditSection = (sectionIndex: number, field: string, lang: string, value: string) => {
    if (!editedContent) return;
    
    const updatedContent = JSON.parse(JSON.stringify(editedContent));
    const updatedSections = [...updatedContent.sections];
    
    if (field === 'title') {
      updatedSections[sectionIndex].title[lang] = value;
    } else if (field === 'content') {
      updatedSections[sectionIndex].content[lang] = value;
    }
    
    updatedContent.sections = updatedSections;
    setEditedContent(updatedContent);
  };

  const handleAddSection = () => {
    if (!editedContent) return;
    
    const newSectionId = `section_${Date.now()}`;
    const newSection: PageSection = {
      id: newSectionId,
      title: {
        fr: 'Nouvelle section',
        ar: 'قسم جديد'
      },
      content: {
        fr: 'Contenu de la section',
        ar: 'محتوى القسم'
      }
    };
    
    const updatedContent = JSON.parse(JSON.stringify(editedContent));
    updatedContent.sections.push(newSection);
    setEditedContent(updatedContent);
  };

  const handleDeleteSection = async (sectionIndex: number) => {
    if (!editedContent || !window.confirm('Are you sure you want to delete this section?')) return;
    
    const sectionToDelete = editedContent.sections[sectionIndex];
    
    const updatedContent = JSON.parse(JSON.stringify(editedContent));
    updatedContent.sections.splice(sectionIndex, 1);
    setEditedContent(updatedContent);
    
    if (!isEditing && sectionToDelete) {
      try {
        await deleteSection(editedContent.id, sectionToDelete.id);
      } catch (error) {
        console.error('Error deleting section:', error);
      }
    }
  };

  return (
    <AdminLayout currentPage="pages">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">
          {language === 'fr' ? 'Gestion des Pages' : 'إدارة الصفحات'}
        </h1>
        <p className="text-gray-600">
          {language === 'fr' ? 'Modifiez le contenu des pages du site web' : 'تعديل محتوى صفحات الموقع'}
        </p>
      </div>
      
      {message && (
        <div className={`p-4 mb-4 rounded ${message.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
          {message}
        </div>
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar with page list */}
        <div className="lg:col-span-1 bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">
            {language === 'fr' ? 'Pages' : 'الصفحات'}
          </h2>
          
          {pages.length > 0 ? (
            <ul className="space-y-1">
              {pages.map((page) => (
                <li key={page}>
                  <button
                    onClick={() => loadPageContent(page)}
                    className={`w-full text-left px-4 py-2 rounded-md ${
                      selectedPage === page ? 'bg-primary text-white' : 'hover:bg-gray-100'
                    }`}
                  >
                    {page.charAt(0).toUpperCase() + page.slice(1)}
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">
              {language === 'fr' ? 'Aucune page disponible' : 'لا توجد صفحات متاحة'}
            </p>
          )}
        </div>
        
        {/* Main content area */}
        <div className="lg:col-span-3">
          {selectedPage ? (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">
                  {selectedPage.charAt(0).toUpperCase() + selectedPage.slice(1)}
                </h2>
                
                <div className="space-x-2">
                  {isEditing ? (
                    <>
                      <button
                        onClick={handleSaveContent}
                        className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 flex items-center"
                        disabled={isLoading}
                      >
                        <FaSave className="mr-2" />
                        {language === 'fr' ? 'Enregistrer' : 'حفظ'}
                      </button>
                      
                      <button
                        onClick={() => {
                          setEditedContent(JSON.parse(JSON.stringify(pageContent)));
                          setIsEditing(false);
                        }}
                        className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 flex items-center"
                        disabled={isLoading}
                      >
                        <FaTimes className="mr-2" />
                        {language === 'fr' ? 'Annuler' : 'إلغاء'}
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark flex items-center"
                      disabled={isLoading}
                    >
                      <FaEdit className="mr-2" />
                      {language === 'fr' ? 'Modifier' : 'تعديل'}
                    </button>
                  )}
                </div>
              </div>
              
              {pageContent && (
                <div>
                  {/* Page title */}
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold mb-3">
                      {language === 'fr' ? 'Titre de la page' : 'عنوان الصفحة'}
                    </h3>
                    
                    {isEditing ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-1">Français</label>
                          <input
                            type="text"
                            value={editedContent?.title.fr || ''}
                            onChange={(e) => {
                              if (!editedContent) return;
                              const updatedContent = { ...editedContent };
                              updatedContent.title.fr = e.target.value;
                              setEditedContent(updatedContent);
                            }}
                            className="w-full p-2 border rounded-md"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">العربية</label>
                          <input
                            type="text"
                            value={editedContent?.title.ar || ''}
                            onChange={(e) => {
                              if (!editedContent) return;
                              const updatedContent = { ...editedContent };
                              updatedContent.title.ar = e.target.value;
                              setEditedContent(updatedContent);
                            }}
                            className="w-full p-2 border rounded-md text-right"
                            dir="rtl"
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-3 bg-gray-50 rounded-md">
                          <p className="text-sm text-gray-500 mb-1">Français</p>
                          <p>{pageContent.title.fr}</p>
                        </div>
                        <div className="p-3 bg-gray-50 rounded-md">
                          <p className="text-sm text-gray-500 mb-1">العربية</p>
                          <p dir="rtl" className="text-right">{pageContent.title.ar}</p>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Sections */}
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-semibold">
                        {language === 'fr' ? 'Sections' : 'الأقسام'}
                      </h3>
                      
                      {isEditing && (
                        <button 
                          onClick={handleAddSection}
                          className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 text-sm flex items-center"
                        >
                          <FaPlus className="mr-1" />
                          {language === 'fr' ? 'Ajouter une section' : 'إضافة قسم'}
                        </button>
                      )}
                    </div>
                    
                    {pageContent.sections.length > 0 ? (
                      <div className="space-y-8">
                        {pageContent.sections.map((section, index) => (
                          <div key={section.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                            <div className="flex justify-between items-center mb-3">
                              <h4 className="font-medium">
                                {language === 'fr' ? `Section: ${section.id}` : `قسم: ${section.id}`}
                              </h4>
                              
                              {isEditing && (
                                <button
                                  onClick={() => handleDeleteSection(index)}
                                  className="bg-red-600 text-white px-2 py-1 rounded-md hover:bg-red-700 text-xs flex items-center"
                                >
                                  <FaTrash className="mr-1" />
                                  {language === 'fr' ? 'Supprimer' : 'حذف'}
                                </button>
                              )}
                            </div>
                            
                            {/* Section title */}
                            <div className="mb-4">
                              <h5 className="font-medium mb-2">
                                {language === 'fr' ? 'Titre' : 'العنوان'}
                              </h5>
                              
                              {isEditing ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div>
                                    <label className="block text-sm font-medium mb-1">Français</label>
                                    <input
                                      type="text"
                                      value={editedContent?.sections[index].title.fr || ''}
                                      onChange={(e) => handleEditSection(index, 'title', 'fr', e.target.value)}
                                      className="w-full p-2 border rounded-md"
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-sm font-medium mb-1">العربية</label>
                                    <input
                                      type="text"
                                      value={editedContent?.sections[index].title.ar || ''}
                                      onChange={(e) => handleEditSection(index, 'title', 'ar', e.target.value)}
                                      className="w-full p-2 border rounded-md text-right"
                                      dir="rtl"
                                    />
                                  </div>
                                </div>
                              ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div className="p-3 bg-white rounded-md">
                                    <p className="text-sm text-gray-500 mb-1">Français</p>
                                    <p>{section.title.fr}</p>
                                  </div>
                                  <div className="p-3 bg-white rounded-md">
                                    <p className="text-sm text-gray-500 mb-1">العربية</p>
                                    <p dir="rtl" className="text-right">{section.title.ar}</p>
                                  </div>
                                </div>
                              )}
                            </div>
                            
                            {/* Section content */}
                            <div>
                              <h5 className="font-medium mb-2">
                                {language === 'fr' ? 'Contenu' : 'المحتوى'}
                              </h5>
                              
                              {isEditing ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div>
                                    <label className="block text-sm font-medium mb-1">Français</label>
                                    <textarea
                                      value={editedContent?.sections[index].content.fr || ''}
                                      onChange={(e) => handleEditSection(index, 'content', 'fr', e.target.value)}
                                      className="w-full p-2 border rounded-md"
                                      rows={4}
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-sm font-medium mb-1">العربية</label>
                                    <textarea
                                      value={editedContent?.sections[index].content.ar || ''}
                                      onChange={(e) => handleEditSection(index, 'content', 'ar', e.target.value)}
                                      className="w-full p-2 border rounded-md text-right"
                                      dir="rtl"
                                      rows={4}
                                    />
                                  </div>
                                </div>
                              ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div className="p-3 bg-white rounded-md">
                                    <p className="text-sm text-gray-500 mb-1">Français</p>
                                    <p className="whitespace-pre-wrap">{section.content.fr}</p>
                                  </div>
                                  <div className="p-3 bg-white rounded-md">
                                    <p className="text-sm text-gray-500 mb-1">العربية</p>
                                    <p dir="rtl" className="text-right whitespace-pre-wrap">{section.content.ar}</p>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 p-4 bg-gray-50 rounded-md text-center">
                        {language === 'fr' ? 'Aucune section disponible' : 'لا توجد أقسام متاحة'}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <p className="text-gray-500">
                {language === 'fr' 
                  ? 'Sélectionnez une page pour modifier son contenu' 
                  : 'اختر صفحة لتعديل محتواها'
                }
              </p>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
} 