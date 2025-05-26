'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import NewsDetail from '@/components/NewsDetail';
import Link from 'next/link';
import Newsletter from '@/components/Newsletter';

const articleContent = {
  id: 1,
  title: {
    fr: 'Journée internationale des droits des migrants',
    ar: 'اليوم العالمي لحقوق المهاجرين'
  },
  date: {
    fr: '18 décembre 2023',
    ar: '18 ديسمبر 2023'
  },
  author: {
    fr: 'Équipe de Sensibilisation',
    ar: 'فريق التوعية'
  },
  category: {
    fr: 'Rapports',
    ar: 'تقارير'
  },
  keyPoints: [
    { fr: 'Analyse de la situation des migrants', ar: 'تحليل وضع المهاجرين' },
    { fr: 'Mécanismes de protection disponibles', ar: 'آليات الحماية المتاحة' },
    { fr: 'Recommandations pour l\'amélioration', ar: 'توصيات للتحسين' }
  ],
  content: {
    fr: 'À l\'occasion de la Journée internationale des droits des migrants, nous mettons en lumière les défis et les avancées concernant la protection des droits des personnes migrantes en Algérie et dans la région. Notre analyse couvre les développements récents dans les politiques migratoires, les actions de sensibilisation menées par notre fondation et nos partenaires, ainsi que les recommandations pour améliorer les mécanismes de protection.',
    ar: 'بمناسبة اليوم العالمي لحقوق المهاجرين، نسلط الضوء على التحديات والتقدم المحرز في حماية حقوق المهاجرين في الجزائر والمنطقة. يغطي تحليلنا التطورات الأخيرة في سياسات الهجرة، وحملات التوعية التي تقوم بها مؤسستنا وشركاؤنا، والتوصيات لتحسين آليات الحماية.'
  },
  slug: '/images/report/report.jpg'
};

export default function MigrantRightsPage() {
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
                {['Tous', 'Formation', 'Rapports', 'Événements'].map((category, idx) => (
                  <Link 
                    key={category}
                    href="/news"
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      category === 'Rapports'
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