'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import NewsDetail from '@/components/NewsDetail';
import Link from 'next/link';
import Newsletter from '@/components/Newsletter';

const articleContent = {
  id: 5,
  title: {
    fr: 'Guide sur l\'Accès à la Justice',
    ar: 'دليل حول الوصول إلى العدالة'
  },
  date: {
    fr: '5 juillet 2023',
    ar: '5 يوليو 2023'
  },
  author: {
    fr: 'Équipe des Publications',
    ar: 'فريق المنشورات'
  },
  category: {
    fr: 'Publications',
    ar: 'منشورات'
  },
  keyPoints: [
    { fr: 'Procédures judiciaires expliquées simplement', ar: 'شرح الإجراءات القضائية بطريقة مبسطة' },
    { fr: 'Droits et recours disponibles pour les citoyens', ar: 'الحقوق وسبل الانتصاف المتاحة للمواطنين' },
    { fr: 'Ressources et contacts utiles', ar: 'الموارد وجهات الاتصال المفيدة' }
  ],
  content: {
    fr: 'Publication d\'un guide pratique pour aider les citoyens à comprendre et à naviguer dans le système judiciaire. Ce document, disponible en format papier et numérique, présente de manière claire et accessible les différentes procédures judiciaires, les droits des justiciables et les recours possibles. Il comprend également des conseils pratiques et des contacts utiles pour faciliter l\'accès à la justice pour tous.',
    ar: 'نشر دليل عملي لمساعدة المواطنين على فهم نظام العدالة والتنقل فيه. تقدم هذه الوثيقة، المتوفرة بنسخة ورقية ورقمية، بطريقة واضحة وسهلة الوصول مختلف الإجراءات القضائية، وحقوق المتقاضين، وسبل الانتصاف الممكنة. كما يتضمن نصائح عملية وجهات اتصال مفيدة لتسهيل الوصول إلى العدالة للجميع.'
  },
  slug: '/news/guide-acces-justice'
};

export default function GuideAccesJusticePage() {
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
                {['Tous', 'Publications', 'Rapports', 'Événements'].map((category, idx) => (
                  <Link 
                    key={category}
                    href="/news"
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      category === 'Publications'
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
                <Link href="/news/table-ronde-reformes-juridiques" className="block hover:bg-light p-3 rounded-lg transition-colors">
                  <h4 className="font-semibold text-secondary hover:text-orange transition-colors">
                    {language === 'fr' ? 'Table Ronde sur les Réformes Juridiques' : 'طاولة مستديرة حول الإصلاحات القانونية'}
                  </h4>
                  <p className="text-gray-500 text-sm mt-1">
                    {language === 'fr' ? '5 août 2023' : '5 أغسطس 2023'}
                  </p>
                </Link>
                
                <Link href="/news/formation-droits-fondamentaux" className="block hover:bg-light p-3 rounded-lg transition-colors">
                  <h4 className="font-semibold text-secondary hover:text-orange transition-colors">
                    {language === 'fr' ? 'Formation sur les Droits Fondamentaux' : 'تدريب على الحقوق الأساسية'}
                  </h4>
                  <p className="text-gray-500 text-sm mt-1">
                    {language === 'fr' ? '25 août 2023' : '25 أغسطس 2023'}
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