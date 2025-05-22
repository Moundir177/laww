'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import NewsDetail from '@/components/NewsDetail';
import Link from 'next/link';
import Newsletter from '@/components/Newsletter';

const articleContent = {
  id: 4,
  title: {
    fr: 'Table Ronde sur les Réformes Juridiques',
    ar: 'طاولة مستديرة حول الإصلاحات القانونية'
  },
  date: {
    fr: '5 août 2023',
    ar: '5 أغسطس 2023'
  },
  author: {
    fr: 'Équipe des Événements',
    ar: 'فريق الفعاليات'
  },
  category: {
    fr: 'Événements',
    ar: 'فعاليات'
  },
  keyPoints: [
    { fr: 'Analyse des récentes réformes législatives', ar: 'تحليل الإصلاحات التشريعية الأخيرة' },
    { fr: 'Impact sur les droits des citoyens', ar: 'التأثير على حقوق المواطنين' },
    { fr: 'Perspectives d\'évolution du cadre juridique', ar: 'آفاق تطور الإطار القانوني' }
  ],
  content: {
    fr: 'Une journée d\'étude consacrée aux récentes réformes juridiques et à leur impact sur les droits des citoyens. Des experts juridiques, des magistrats et des acteurs de la société civile ont échangé leurs analyses et perspectives sur l\'évolution du cadre légal en Algérie. La rencontre a permis d\'identifier les avancées réalisées ainsi que les défis persistants dans le domaine juridique.',
    ar: 'يوم دراسي مخصص للإصلاحات القانونية الأخيرة وتأثيرها على حقوق المواطنين. تبادل خبراء قانونيون وقضاة وفاعلون في المجتمع المدني تحليلاتهم ووجهات نظرهم حول تطور الإطار القانوني في الجزائر. سمح اللقاء بتحديد التقدم المحرز والتحديات المستمرة في المجال القانوني.'
  },
  slug: '/images/law/justice-law-scales.jpg'
};

export default function TableRondePage() {
  const { language } = useLanguage();
  
  return (
    <div className={`bg-light min-h-screen pb-16 ${language === 'ar' ? 'rtl' : ''}`}>
      {/* Breadcrumbs */}
      <div className="bg-white py-4 shadow-sm">
        <div className="container mx-auto px-4">
          <div className={`flex items-center text-gray-500 text-sm ${language === 'ar' ? 'justify-end' : ''}`}>
            <Link href="/" className="hover:text-orange">
              {language === 'fr' ? 'Accueil' : 'الرئيسية'}
            </Link>
            <span className="mx-2">/</span>
            <Link href="/news" className="hover:text-orange">
              {language === 'fr' ? 'Actualités' : 'الأخبار'}
            </Link>
            <span className="mx-2">/</span>
            <span className="text-orange">
              {language === 'fr' ? articleContent.title.fr : articleContent.title.ar}
            </span>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <NewsDetail 
              {...articleContent}
              content={language === 'ar' ? articleContent.content.ar : articleContent.content.fr}
            />
          </div>
          
          <div className="space-y-6">
            {/* Categories */}
            <div className="bg-white p-7 rounded-2xl shadow-lg">
              <h3 className="font-bold text-xl mb-5 text-secondary flex items-center">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-orange to-orange-light flex items-center justify-center text-white shadow-orange mr-3">
                  <span className="text-xs font-bold">+</span>
                </div>
                {language === 'fr' ? 'Catégories' : 'الفئات'}
              </h3>
              
              <div className="flex flex-wrap gap-2">
                {['Tous', 'Formation', 'Rapports', 'Partenariats', 'Événements'].map((category, idx) => (
                  <Link 
                    key={category}
                    href="/news"
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      category === 'Événements'
                        ? 'bg-gradient-to-r from-orange to-orange-light text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category}
                  </Link>
                ))}
              </div>
            </div>
            
            {/* Related Articles */}
            <div className="bg-white p-7 rounded-2xl shadow-lg">
              <h3 className="font-bold text-xl mb-5 text-secondary flex items-center">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-orange to-orange-light flex items-center justify-center text-white shadow-orange mr-3">
                  <span className="text-xs font-bold">+</span>
                </div>
                {language === 'fr' ? 'Articles liés' : 'مقالات ذات صلة'}
              </h3>
              
              <div className="space-y-4">
                <Link href="/news/formation-droits-fondamentaux" className="block hover:bg-light p-3 rounded-lg transition-colors">
                  <h4 className="font-semibold text-secondary hover:text-orange transition-colors">
                    {language === 'fr' ? 'Formation sur les Droits Fondamentaux' : 'تدريب على الحقوق الأساسية'}
                  </h4>
                  <p className="text-gray-500 text-sm mt-1">
                    {language === 'fr' ? '25 août 2023' : '25 أغسطس 2023'}
                  </p>
                </Link>
                
                <Link href="/news/collaboration-ong-internationales" className="block hover:bg-light p-3 rounded-lg transition-colors">
                  <h4 className="font-semibold text-secondary hover:text-orange transition-colors">
                    {language === 'fr' ? 'Collaboration avec des ONG Internationales' : 'التعاون مع المنظمات غير الحكومية الدولية'}
                  </h4>
                  <p className="text-gray-500 text-sm mt-1">
                    {language === 'fr' ? '10 août 2023' : '10 أغسطس 2023'}
                  </p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Newsletter Section */}
      <Newsletter />
    </div>
  );
} 