'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  FaHome, 
  FaNewspaper, 
  FaImage, 
  FaUsers, 
  FaComments, 
  FaBook, 
  FaCog, 
  FaBars,
  FaTimes
} from 'react-icons/fa';
import { useLanguage } from '@/contexts/LanguageContext';

interface AdminLayoutProps {
  children: React.ReactNode;
  currentPage?: string;
}

export default function AdminLayout({ children, currentPage }: AdminLayoutProps) {
  const { language } = useLanguage();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    {
      id: 'dashboard',
      label: { fr: 'Tableau de bord', ar: 'لوحة التحكم' },
      icon: <FaHome className="w-5 h-5" />,
      href: '/admin'
    },
    {
      id: 'pages',
      label: { fr: 'Pages', ar: 'الصفحات' },
      icon: <FaBook className="w-5 h-5" />,
      href: '/admin/pages'
    },
    {
      id: 'news',
      label: { fr: 'Actualités', ar: 'الأخبار' },
      icon: <FaNewspaper className="w-5 h-5" />,
      href: '/admin/news'
    },
    {
      id: 'media',
      label: { fr: 'Médiathèque', ar: 'مكتبة الوسائط' },
      icon: <FaImage className="w-5 h-5" />,
      href: '/admin/media'
    },
    {
      id: 'team',
      label: { fr: 'Équipe', ar: 'الفريق' },
      icon: <FaUsers className="w-5 h-5" />,
      href: '/admin/team'
    },
    {
      id: 'testimonials',
      label: { fr: 'Témoignages', ar: 'الشهادات' },
      icon: <FaComments className="w-5 h-5" />,
      href: '/admin/testimonials'
    },
    {
      id: 'settings',
      label: { fr: 'Paramètres', ar: 'الإعدادات' },
      icon: <FaCog className="w-5 h-5" />,
      href: '/admin/settings'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile sidebar toggle */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-md bg-white shadow-md text-gray-700"
        >
          {sidebarOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>
      
      {/* Sidebar */}
      <div 
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="p-6 border-b">
          <h1 className="text-2xl font-bold text-gray-800">
            {language === 'fr' ? 'Administration' : 'الإدارة'}
          </h1>
        </div>
        
        <nav className="p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.id}>
                <Link
                  href={item.href}
                  className={`flex items-center p-3 rounded-lg ${
                    currentPage === item.id
                      ? 'bg-primary text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <span className="mr-3">{item.icon}</span>
                  <span>{language === 'fr' ? item.label.fr : item.label.ar}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      
      {/* Main content */}
      <div className="lg:ml-64 p-6">
        {children}
      </div>
      
      {/* Backdrop for mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
} 