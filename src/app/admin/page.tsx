'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import Link from 'next/link';
import { 
  getPages, 
  getPageContent, 
  savePageContent, 
  saveSection, 
  deleteSection,
  PageContent,
  PageSection
} from '@/lib/database';

export default function AdminPage() {
  const { language } = useLanguage();
  const [pages, setPages] = useState<string[]>([]);
  const [selectedPage, setSelectedPage] = useState<string>('');
  const [pageContent, setPageContent] = useState<PageContent | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState<PageContent | null>(null);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Load all available pages
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

    loadPages();
  }, []);

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
      // Save page title
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
    
    // If we're not in edit mode, also delete from the database
    if (!isEditing && sectionToDelete) {
      try {
        await deleteSection(editedContent.id, sectionToDelete.id);
      } catch (error) {
        console.error('Error deleting section:', error);
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      
      {message && (
        <div className={`p-4 mb-4 rounded ${message.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
          {message}
        </div>
      )}
      
      {isLoading && (
        <div className="flex justify-center my-8">
          <div className="loader rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 animate-spin"></div>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1 bg-gray-50 p-4 rounded">
          <h2 className="text-xl font-semibold mb-4">Pages</h2>
          {pages.length > 0 ? (
            <ul className="space-y-2">
              {pages.map((page) => (
                <li key={page}>
                  <button
                    onClick={() => loadPageContent(page)}
                    className={`w-full text-left px-3 py-2 rounded ${selectedPage === page ? 'bg-primary text-white' : 'hover:bg-gray-200'}`}
                  >
                    {page.charAt(0).toUpperCase() + page.slice(1)}
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No pages available</p>
          )}
        </div>
        
        <div className="md:col-span-3">
          {selectedPage ? (
            <div className="bg-white p-6 rounded shadow-md">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">
                  {selectedPage.charAt(0).toUpperCase() + selectedPage.slice(1)} Page
                </h2>
                <div className="space-x-2">
                  {isEditing ? (
                    <>
                      <button
                        onClick={handleSaveContent}
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                        disabled={isLoading}
                      >
                        {isLoading ? 'Saving...' : 'Save Changes'}
                      </button>
                      <button
                        onClick={() => {
                          setEditedContent(JSON.parse(JSON.stringify(pageContent)));
                          setIsEditing(false);
                        }}
                        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                        disabled={isLoading}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark"
                      disabled={isLoading}
                    >
                      Edit Content
                    </button>
                  )}
                </div>
              </div>
              
              {pageContent && (
                <div>
                  <h3 className="text-xl font-semibold mb-3">Page Title</h3>
                  {isEditing ? (
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div>
                        <label className="block text-sm font-medium mb-1">French</label>
                        <input
                          type="text"
                          value={editedContent?.title.fr || ''}
                          onChange={(e) => {
                            if (!editedContent) return;
                            const updatedContent = { ...editedContent };
                            updatedContent.title.fr = e.target.value;
                            setEditedContent(updatedContent);
                          }}
                          className="w-full p-2 border rounded"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Arabic</label>
                        <input
                          type="text"
                          value={editedContent?.title.ar || ''}
                          onChange={(e) => {
                            if (!editedContent) return;
                            const updatedContent = { ...editedContent };
                            updatedContent.title.ar = e.target.value;
                            setEditedContent(updatedContent);
                          }}
                          className="w-full p-2 border rounded"
                          dir="rtl"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="p-3 bg-gray-50 rounded">
                        <p className="text-sm text-gray-500 mb-1">French</p>
                        <p>{pageContent.title.fr}</p>
                      </div>
                      <div className="p-3 bg-gray-50 rounded">
                        <p className="text-sm text-gray-500 mb-1">Arabic</p>
                        <p dir="rtl">{pageContent.title.ar}</p>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex justify-between items-center mb-3 mt-6">
                    <h3 className="text-xl font-semibold">Sections</h3>
                    {isEditing && (
                      <button 
                        onClick={handleAddSection}
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm"
                      >
                        Add New Section
                      </button>
                    )}
                  </div>
                  
                  {pageContent.sections.length > 0 ? (
                    pageContent.sections.map((section, index) => (
                      <div key={section.id} className="mb-8 p-4 bg-gray-50 rounded">
                        <div className="flex justify-between items-center mb-3">
                          <h4 className="text-lg font-medium">Section: {section.id}</h4>
                          {isEditing && (
                            <button
                              onClick={() => handleDeleteSection(index)}
                              className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 text-xs"
                            >
                              Delete
                            </button>
                          )}
                        </div>
                        
                        <div className="mb-4">
                          <h5 className="font-medium mb-2">Title</h5>
                          {isEditing ? (
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium mb-1">French</label>
                                <input
                                  type="text"
                                  value={editedContent?.sections[index].title.fr || ''}
                                  onChange={(e) => handleEditSection(index, 'title', 'fr', e.target.value)}
                                  className="w-full p-2 border rounded"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium mb-1">Arabic</label>
                                <input
                                  type="text"
                                  value={editedContent?.sections[index].title.ar || ''}
                                  onChange={(e) => handleEditSection(index, 'title', 'ar', e.target.value)}
                                  className="w-full p-2 border rounded"
                                  dir="rtl"
                                />
                              </div>
                            </div>
                          ) : (
                            <div className="grid grid-cols-2 gap-4">
                              <div className="p-3 bg-white rounded">
                                <p className="text-sm text-gray-500 mb-1">French</p>
                                <p>{section.title.fr}</p>
                              </div>
                              <div className="p-3 bg-white rounded">
                                <p className="text-sm text-gray-500 mb-1">Arabic</p>
                                <p dir="rtl">{section.title.ar}</p>
                              </div>
                            </div>
                          )}
                        </div>
                        
                        <div>
                          <h5 className="font-medium mb-2">Content</h5>
                          {isEditing ? (
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium mb-1">French</label>
                                <textarea
                                  value={editedContent?.sections[index].content.fr || ''}
                                  onChange={(e) => handleEditSection(index, 'content', 'fr', e.target.value)}
                                  className="w-full p-2 border rounded min-h-32"
                                  rows={4}
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium mb-1">Arabic</label>
                                <textarea
                                  value={editedContent?.sections[index].content.ar || ''}
                                  onChange={(e) => handleEditSection(index, 'content', 'ar', e.target.value)}
                                  className="w-full p-2 border rounded min-h-32"
                                  dir="rtl"
                                  rows={4}
                                />
                              </div>
                            </div>
                          ) : (
                            <div className="grid grid-cols-2 gap-4">
                              <div className="p-3 bg-white rounded">
                                <p className="text-sm text-gray-500 mb-1">French</p>
                                <p>{section.content.fr}</p>
                              </div>
                              <div className="p-3 bg-white rounded">
                                <p className="text-sm text-gray-500 mb-1">Arabic</p>
                                <p dir="rtl">{section.content.ar}</p>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500">No sections available</p>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white p-6 rounded shadow-md">
              <p className="text-gray-500">Select a page from the sidebar to edit its content</p>
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-8">
        <Link href="/" className="text-primary hover:underline">
          ← Back to website
        </Link>
      </div>
      
      <style jsx>{`
        .loader {
          border-top-color: #3b82f6;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        .animate-spin {
          animation: spin 1s linear infinite;
        }
      `}</style>
    </div>
  );
} 