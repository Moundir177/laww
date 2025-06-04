'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import Link from 'next/link';
import { 
  FaHome, 
  FaNewspaper, 
  FaImage, 
  FaUsers, 
  FaComments, 
  FaBook, 
  FaGlobe,
  FaCog,
  FaEdit,
  FaChartBar
} from 'react-icons/fa';
import AdminLayout from '@/components/admin/AdminLayout';

export default function AdminPage() {
  const { language } = useLanguage();
  
  const contentTypes = [
    {
      id: 'pages',
      icon: <FaBook className="w-12 h-12 text-primary" />,
      title: { fr: 'Pages', ar: 'الصفحات' },
      description: { 
        fr: 'Gérer le contenu de toutes les pages du site web', 
        ar: 'إدارة محتوى جميع صفحات الموقع' 
      },
      link: '/admin/pages'
    },
    {
      id: 'news',
      icon: <FaNewspaper className="w-12 h-12 text-blue-500" />,
      title: { fr: 'Actualités', ar: 'الأخبار' },
      description: { 
        fr: 'Ajouter, modifier ou supprimer des articles d\'actualité', 
        ar: 'إضافة أو تعديل أو حذف الأخبار والمقالات' 
      },
      link: '/admin/news'
    },
    {
      id: 'media',
      icon: <FaImage className="w-12 h-12 text-purple-500" />,
      title: { fr: 'Médiathèque', ar: 'مكتبة الوسائط' },
      description: { 
        fr: 'Gérer les images, vidéos et documents', 
        ar: 'إدارة الصور ومقاطع الفيديو والوثائق' 
      },
      link: '/admin/media'
    },
    {
      id: 'team',
      icon: <FaUsers className="w-12 h-12 text-green-500" />,
      title: { fr: 'Équipe', ar: 'الفريق' },
      description: { 
        fr: 'Gérer les informations sur les membres de l\'équipe', 
        ar: 'إدارة معلومات أعضاء الفريق' 
      },
      link: '/admin/team'
    },
    {
      id: 'testimonials',
      icon: <FaComments className="w-12 h-12 text-yellow-500" />,
      title: { fr: 'Témoignages', ar: 'الشهادات' },
      description: { 
        fr: 'Gérer les témoignages et avis', 
        ar: 'إدارة الشهادات والآراء' 
      },
      link: '/admin/testimonials'
    },
    {
      id: 'translations',
      icon: <FaGlobe className="w-12 h-12 text-orange-500" />,
      title: { fr: 'Traductions', ar: 'الترجمات' },
      description: { 
        fr: 'Gérer les traductions du site en français et en arabe', 
        ar: 'إدارة ترجمات الموقع باللغتين الفرنسية والعربية' 
      },
      link: '/admin/translations'
    },
    {
      id: 'review',
      icon: <FaEdit className="w-12 h-12 text-red-500" />,
      title: { fr: 'Revue', ar: 'المراجعة' },
      description: { 
        fr: 'Gérer le contenu de la section Revue', 
        ar: 'إدارة محتوى قسم المراجعة' 
      },
      link: '/admin/review'
    },
    {
      id: 'settings',
      icon: <FaCog className="w-12 h-12 text-gray-600" />,
      title: { fr: 'Paramètres', ar: 'الإعدادات' },
      description: { 
        fr: 'Configurer les paramètres du site', 
        ar: 'تكوين إعدادات الموقع' 
      },
      link: '/admin/settings'
    }
  ];

  return (
    <AdminLayout currentPage="dashboard">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          {language === 'fr' ? 'Tableau de bord' : 'لوحة التحكم'}
        </h1>
        <p className="text-gray-600">
          {language === 'fr' 
            ? 'Bienvenue dans le panneau d\'administration. Ici, vous pouvez gérer tout le contenu du site web.' 
            : 'مرحبًا بك في لوحة الإدارة. هنا يمكنك إدارة كل محتوى الموقع.'
          }
        </p>
        </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {contentTypes.map((item) => (
          <Link 
            key={item.id}
            href={item.link}
            className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 flex flex-col"
          >
            <div className="flex items-center mb-4">
              <div className="mr-4">{item.icon}</div>
              <h2 className="text-xl font-semibold text-gray-800">
                {language === 'fr' ? item.title.fr : item.title.ar}
                </h2>
                </div>
            <p className="text-gray-600 mb-4">
              {language === 'fr' ? item.description.fr : item.description.ar}
            </p>
            <div className="mt-auto">
              <span className="text-primary font-medium flex items-center">
                {language === 'fr' ? 'Gérer' : 'إدارة'}
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${language === 'ar' ? 'mr-2 rotate-180' : 'ml-2'}`} viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </span>
              </div>
          </Link>
        ))}
                  </div>
                  
      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center mb-4">
            <FaChartBar className="w-8 h-8 text-primary mr-3" />
            <h2 className="text-lg font-semibold text-gray-800">
              {language === 'fr' ? 'Statistiques rapides' : 'إحصائيات سريعة'}
            </h2>
                        </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b pb-2">
              <span className="text-gray-600">{language === 'fr' ? 'Pages' : 'الصفحات'}</span>
              <span className="font-semibold">8</span>
                              </div>
            <div className="flex justify-between items-center border-b pb-2">
              <span className="text-gray-600">{language === 'fr' ? 'Articles' : 'المقالات'}</span>
              <span className="font-semibold">12</span>
                              </div>
            <div className="flex justify-between items-center border-b pb-2">
              <span className="text-gray-600">{language === 'fr' ? 'Médias' : 'الوسائط'}</span>
              <span className="font-semibold">24</span>
                            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">{language === 'fr' ? 'Témoignages' : 'الشهادات'}</span>
              <span className="font-semibold">6</span>
                              </div>
                            </div>
                        </div>
                        
        <div className="md:col-span-2 bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center mb-4">
            <FaEdit className="w-8 h-8 text-primary mr-3" />
            <h2 className="text-lg font-semibold text-gray-800">
              {language === 'fr' ? 'Dernières modifications' : 'آخر التعديلات'}
            </h2>
                              </div>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-gray-900">
                  {language === 'fr' ? 'Page d\'accueil mise à jour' : 'تم تحديث الصفحة الرئيسية'}
                </p>
                <p className="text-sm text-gray-500">
                  {language === 'fr' ? 'Il y a 2 heures' : 'منذ ساعتين'}
                </p>
                              </div>
                            </div>
            <div className="flex items-start">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-gray-900">
                  {language === 'fr' ? 'Nouvel article ajouté' : 'تمت إضافة مقال جديد'}
                </p>
                <p className="text-sm text-gray-500">
                  {language === 'fr' ? 'Il y a 1 jour' : 'منذ يوم واحد'}
                </p>
                              </div>
                            </div>
            <div className="flex items-start">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-gray-900">
                  {language === 'fr' ? 'Section "À propos" modifiée' : 'تم تعديل قسم "من نحن"'}
                </p>
                <p className="text-sm text-gray-500">
                  {language === 'fr' ? 'Il y a 3 jours' : 'منذ 3 أيام'}
                </p>
                </div>
            </div>
            </div>
        </div>
      </div>
    </AdminLayout>
  );
} 