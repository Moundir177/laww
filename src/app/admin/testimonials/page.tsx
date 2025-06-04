'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import AdminLayout from '@/components/admin/AdminLayout';
import { FaEdit, FaSave, FaTimes, FaPlus, FaTrash, FaStar } from 'react-icons/fa';
import { 
  getTestimonials, 
  saveTestimonial, 
  deleteTestimonial,
  Testimonial
} from '@/lib/database';

export default function TestimonialsAdmin() {
  const { language } = useLanguage();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [selectedTestimonial, setSelectedTestimonial] = useState<Testimonial | null>(null);
  const [editedTestimonial, setEditedTestimonial] = useState<Testimonial | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadTestimonials();
  }, []);

  const loadTestimonials = async () => {
    setIsLoading(true);
    try {
      const testimonialsData = await getTestimonials();
      setTestimonials(testimonialsData);
    } catch (error) {
      console.error('Error loading testimonials:', error);
      setMessage('Error loading testimonials');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectTestimonial = (testimonial: Testimonial) => {
    setSelectedTestimonial(testimonial);
    setEditedTestimonial(JSON.parse(JSON.stringify(testimonial))); // Deep copy
    setIsEditing(false);
  };

  const handleSaveTestimonial = async () => {
    if (!editedTestimonial) return;
    
    setIsLoading(true);
    try {
      const success = await saveTestimonial(editedTestimonial);
      
      if (success) {
        await loadTestimonials(); // Reload the list
        setSelectedTestimonial(editedTestimonial);
        setIsEditing(false);
        setMessage('Testimonial saved successfully!');
      } else {
        setMessage('Error saving testimonial');
      }
    } catch (error) {
      console.error('Error saving testimonial:', error);
      setMessage('Error saving testimonial');
    } finally {
      setIsLoading(false);
      
      // Clear message after 3 seconds
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const handleDeleteTestimonial = async (testimonialId: string) => {
    if (!window.confirm('Are you sure you want to delete this testimonial?')) return;
    
    setIsLoading(true);
    try {
      const success = await deleteTestimonial(testimonialId);
      
      if (success) {
        await loadTestimonials();
        setSelectedTestimonial(null);
        setEditedTestimonial(null);
        setMessage('Testimonial deleted successfully!');
      } else {
        setMessage('Error deleting testimonial');
      }
    } catch (error) {
      console.error('Error deleting testimonial:', error);
      setMessage('Error deleting testimonial');
    } finally {
      setIsLoading(false);
      
      // Clear message after 3 seconds
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const handleCreateTestimonial = () => {
    const newTestimonial: Testimonial = {
      id: Date.now().toString(),
      name: {
        fr: 'Nouveau nom',
        ar: 'اسم جديد'
      },
      role: {
        fr: 'Nouveau rôle',
        ar: 'دور جديد'
      },
      content: {
        fr: 'Nouveau témoignage',
        ar: 'شهادة جديدة'
      },
      rating: 5,
      date: new Date().toISOString().split('T')[0]
    };
    
    setSelectedTestimonial(newTestimonial);
    setEditedTestimonial(newTestimonial);
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    if (selectedTestimonial) {
      setEditedTestimonial(JSON.parse(JSON.stringify(selectedTestimonial)));
    }
    setIsEditing(false);
  };

  const handleInputChange = (field: string, lang: 'fr' | 'ar', value: string) => {
    if (!editedTestimonial) return;
    
    const updatedTestimonial = {...editedTestimonial};
    
    if (field === 'name') {
      updatedTestimonial.name[lang] = value;
    } else if (field === 'role') {
      updatedTestimonial.role[lang] = value;
    } else if (field === 'content') {
      updatedTestimonial.content[lang] = value;
    }
    
    setEditedTestimonial(updatedTestimonial);
  };

  const handleRatingChange = (rating: number) => {
    if (!editedTestimonial) return;
    setEditedTestimonial({...editedTestimonial, rating});
  };

  const handleDateChange = (date: string) => {
    if (!editedTestimonial) return;
    setEditedTestimonial({...editedTestimonial, date});
  };

  const handleImageUrlChange = (imageUrl: string) => {
    if (!editedTestimonial) return;
    setEditedTestimonial({...editedTestimonial, imageUrl});
  };

  // Render star rating component
  const renderStarRating = (rating: number, editable = false) => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={editable ? () => handleRatingChange(star) : undefined}
            className={`${editable ? 'cursor-pointer' : 'cursor-default'} text-xl mr-1`}
          >
            <FaStar className={star <= (rating || 0) ? 'text-yellow-500' : 'text-gray-300'} />
          </button>
        ))}
      </div>
    );
  };

  return (
    <AdminLayout currentPage="testimonials">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">
          {language === 'fr' ? 'Gestion des Témoignages' : 'إدارة الشهادات'}
        </h1>
        <p className="text-gray-600">
          {language === 'fr' ? 'Ajoutez, modifiez ou supprimez des témoignages' : 'إضافة أو تعديل أو حذف الشهادات'}
        </p>
      </div>
      
      {message && (
        <div className={`p-4 mb-4 rounded ${message.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
          {message}
        </div>
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar with testimonials list */}
        <div className="lg:col-span-1 bg-white p-4 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">
              {language === 'fr' ? 'Témoignages' : 'الشهادات'}
            </h2>
            <button
              onClick={handleCreateTestimonial}
              className="p-2 bg-primary text-white rounded-full hover:bg-primary-dark transition-colors"
              title={language === 'fr' ? 'Ajouter un témoignage' : 'إضافة شهادة'}
            >
              <FaPlus />
            </button>
          </div>
          
          {testimonials.length > 0 ? (
            <ul className="space-y-1">
              {testimonials.map((testimonial) => (
                <li key={testimonial.id}>
                  <button
                    onClick={() => handleSelectTestimonial(testimonial)}
                    className={`w-full text-left px-4 py-2 rounded-md ${
                      selectedTestimonial?.id === testimonial.id ? 'bg-primary text-white' : 'hover:bg-gray-100'
                    }`}
                  >
                    {testimonial.name[language === 'fr' ? 'fr' : 'ar']}
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">
              {language === 'fr' ? 'Aucun témoignage disponible' : 'لا توجد شهادات متاحة'}
            </p>
          )}
        </div>
        
        {/* Main content area */}
        <div className="lg:col-span-3">
          {selectedTestimonial ? (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-semibold">
                  {isEditing 
                    ? (language === 'fr' ? 'Modifier le témoignage' : 'تعديل الشهادة') 
                    : (language === 'fr' ? 'Détails du témoignage' : 'تفاصيل الشهادة')}
                </h3>
                
                <div className="flex space-x-2">
                  {isEditing ? (
                    <>
                      <button
                        onClick={handleSaveTestimonial}
                        disabled={isLoading}
                        className="flex items-center px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                      >
                        <FaSave className="mr-1" />
                        {language === 'fr' ? 'Enregistrer' : 'حفظ'}
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="flex items-center px-3 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
                      >
                        <FaTimes className="mr-1" />
                        {language === 'fr' ? 'Annuler' : 'إلغاء'}
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => setIsEditing(true)}
                        className="flex items-center px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                      >
                        <FaEdit className="mr-1" />
                        {language === 'fr' ? 'Modifier' : 'تعديل'}
                      </button>
                      <button
                        onClick={() => handleDeleteTestimonial(selectedTestimonial.id)}
                        className="flex items-center px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                      >
                        <FaTrash className="mr-1" />
                        {language === 'fr' ? 'Supprimer' : 'حذف'}
                      </button>
                    </>
                  )}
                </div>
              </div>
              
              {isEditing ? (
                <form>
                  {/* Name */}
                  <div className="mb-6">
                    <label className="block mb-2 font-medium">
                      {language === 'fr' ? 'Nom' : 'الاسم'}
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm text-gray-500 mb-1">Français</div>
                        <input
                          type="text"
                          value={editedTestimonial?.name?.fr || ''}
                          onChange={(e) => handleInputChange('name', 'fr', e.target.value)}
                          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                      <div>
                        <div className="text-sm text-gray-500 mb-1">العربية</div>
                        <input
                          type="text"
                          value={editedTestimonial?.name?.ar || ''}
                          onChange={(e) => handleInputChange('name', 'ar', e.target.value)}
                          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                          dir="rtl"
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* Role */}
                  <div className="mb-6">
                    <label className="block mb-2 font-medium">
                      {language === 'fr' ? 'Rôle' : 'الدور'}
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm text-gray-500 mb-1">Français</div>
                        <input
                          type="text"
                          value={editedTestimonial?.role?.fr || ''}
                          onChange={(e) => handleInputChange('role', 'fr', e.target.value)}
                          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                      <div>
                        <div className="text-sm text-gray-500 mb-1">العربية</div>
                        <input
                          type="text"
                          value={editedTestimonial?.role?.ar || ''}
                          onChange={(e) => handleInputChange('role', 'ar', e.target.value)}
                          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                          dir="rtl"
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="mb-6">
                    <label className="block mb-2 font-medium">
                      {language === 'fr' ? 'Contenu du témoignage' : 'محتوى الشهادة'}
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm text-gray-500 mb-1">Français</div>
                        <textarea
                          value={editedTestimonial?.content?.fr || ''}
                          onChange={(e) => handleInputChange('content', 'fr', e.target.value)}
                          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                          rows={5}
                        />
                      </div>
                      <div>
                        <div className="text-sm text-gray-500 mb-1">العربية</div>
                        <textarea
                          value={editedTestimonial?.content?.ar || ''}
                          onChange={(e) => handleInputChange('content', 'ar', e.target.value)}
                          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                          rows={5}
                          dir="rtl"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Rating */}
                    <div className="mb-6">
                      <label className="block mb-2 font-medium">
                        {language === 'fr' ? 'Évaluation' : 'التقييم'}
                      </label>
                      {renderStarRating(editedTestimonial?.rating || 0, true)}
                    </div>
                    
                    {/* Date */}
                    <div className="mb-6">
                      <label className="block mb-2 font-medium">
                        {language === 'fr' ? 'Date' : 'التاريخ'}
                      </label>
                      <input
                        type="date"
                        value={editedTestimonial?.date || ''}
                        onChange={(e) => handleDateChange(e.target.value)}
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>
                  
                  {/* Image URL */}
                  <div className="mb-6">
                    <label className="block mb-2 font-medium">
                      {language === 'fr' ? 'URL de l\'image' : 'رابط الصورة'}
                    </label>
                    <input
                      type="text"
                      value={editedTestimonial?.imageUrl || ''}
                      onChange={(e) => handleImageUrlChange(e.target.value)}
                      className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="/images/testimonials/example.jpg"
                    />
                    {editedTestimonial?.imageUrl && (
                      <div className="mt-2">
                        <div className="text-sm text-gray-500 mb-1">
                          {language === 'fr' ? 'Aperçu de l\'image' : 'معاينة الصورة'}
                        </div>
                        <div className="w-24 h-24 border rounded overflow-hidden">
                          <img 
                            src={editedTestimonial.imageUrl} 
                            alt="Preview" 
                            className="w-full h-full object-cover"
                            onError={(e) => (e.target as HTMLImageElement).src = '/images/placeholder.jpg'}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </form>
              ) : selectedTestimonial ? (
                <div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
                    {/* Details */}
                    <div>
                      <h4 className="text-lg font-semibold mb-4 border-b pb-2">
                        {language === 'fr' ? 'Informations' : 'المعلومات'}
                      </h4>
                      
                      <div className="space-y-4">
                        <div>
                          <div className="text-sm text-gray-500 mb-1">
                            {language === 'fr' ? 'Nom' : 'الاسم'}
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <span className="text-xs text-gray-500">FR</span>
                              <div>{selectedTestimonial.name.fr}</div>
                            </div>
                            <div>
                              <span className="text-xs text-gray-500">AR</span>
                              <div dir="rtl">{selectedTestimonial.name.ar}</div>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <div className="text-sm text-gray-500 mb-1">
                            {language === 'fr' ? 'Rôle' : 'الدور'}
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <span className="text-xs text-gray-500">FR</span>
                              <div>{selectedTestimonial.role.fr}</div>
                            </div>
                            <div>
                              <span className="text-xs text-gray-500">AR</span>
                              <div dir="rtl">{selectedTestimonial.role.ar}</div>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <div className="text-sm text-gray-500 mb-1">
                            {language === 'fr' ? 'Évaluation' : 'التقييم'}
                          </div>
                          {renderStarRating(selectedTestimonial.rating || 0)}
                        </div>
                        
                        <div>
                          <div className="text-sm text-gray-500 mb-1">
                            {language === 'fr' ? 'Date' : 'التاريخ'}
                          </div>
                          <div>{selectedTestimonial.date || 'N/A'}</div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Image */}
                    <div>
                      <h4 className="text-lg font-semibold mb-4 border-b pb-2">
                        {language === 'fr' ? 'Image' : 'الصورة'}
                      </h4>
                      
                      {selectedTestimonial.imageUrl ? (
                        <div className="w-full h-48 border rounded overflow-hidden">
                          <img 
                            src={selectedTestimonial.imageUrl} 
                            alt={selectedTestimonial.name.fr}
                            className="w-full h-full object-cover"
                            onError={(e) => (e.target as HTMLImageElement).src = '/images/placeholder.jpg'}
                          />
                        </div>
                      ) : (
                        <div className="w-full h-48 border rounded flex items-center justify-center bg-gray-100">
                          <span className="text-gray-500">
                            {language === 'fr' ? 'Aucune image disponible' : 'لا توجد صورة متاحة'}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div>
                    <h4 className="text-lg font-semibold mb-4 border-b pb-2">
                      {language === 'fr' ? 'Contenu du témoignage' : 'محتوى الشهادة'}
                    </h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm text-gray-500 mb-1">Français</div>
                        <div className="bg-gray-50 p-3 rounded border">
                          {selectedTestimonial.content.fr}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500 mb-1">العربية</div>
                        <div className="bg-gray-50 p-3 rounded border" dir="rtl">
                          {selectedTestimonial.content.ar}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          ) : (
            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center justify-center text-center h-64">
              <p className="text-gray-500 mb-4">
                {language === 'fr' 
                  ? 'Sélectionnez un témoignage pour voir les détails ou créez-en un nouveau' 
                  : 'حدد شهادة لعرض التفاصيل أو أنشئ واحدة جديدة'}
              </p>
              <button
                onClick={handleCreateTestimonial}
                className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark transition-colors"
              >
                <FaPlus className="inline mr-2" />
                {language === 'fr' ? 'Créer un témoignage' : 'إنشاء شهادة'}
              </button>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
} 