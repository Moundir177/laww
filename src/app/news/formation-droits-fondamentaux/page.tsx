'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import NewsDetail from '@/components/NewsDetail';
import Link from 'next/link';
import Newsletter from '@/components/Newsletter';

const articleContent = {
  id: 2,
  title: {
    fr: 'Formation sur les Droits Fondamentaux',
    ar: 'تدريب على الحقوق الأساسية'
  },
  date: {
    fr: '25 août 2023',
    ar: '25 أغسطس 2023'
  },
  author: {
    fr: 'Équipe de Formation',
    ar: 'فريق التدريب'
  },
  category: {
    fr: 'Formation',
    ar: 'تدريب'
  },
  keyPoints: [
    { fr: 'Méthodes pédagogiques interactives', ar: 'طرق تعليمية تفاعلية' },
    { fr: 'Études de cas pratiques', ar: 'دراسات حالة عملية' },
    { fr: 'Documentation de référence complète', ar: 'وثائق مرجعية كاملة' }
  ],
  content: {
    fr: 'Nouvelle session de formation prévue à Alger pour les défenseurs des droits, axée sur les mécanismes de protection internationale. Cette formation comprendra des modules sur les instruments juridiques internationaux, les procédures de plainte et les stratégies de plaidoyer efficaces. Des experts nationaux et internationaux animeront les sessions.',
    ar: 'دورة تدريبية جديدة مخططة في الجزائر العاصمة للمدافعين عن الحقوق، تركز على آليات الحماية الدولية. سيشمل هذا التدريب وحدات حول الصكوك القانونية الدولية، وإجراءات الشكاوى، واستراتيجيات المناصرة الفعالة. سيقوم خبراء وطنيون ودوليون بتيسير الجلسات.'
  },
  slug: '/images/programs/rights-education.jpg'
};

export default function FormationPage() {
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
                      category === 'Formation'
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
                <Link href="/news/journee-internationale-droits-migrants" className="block hover:bg-light p-3 rounded-lg transition-colors">
                  <h4 className="font-semibold text-secondary hover:text-orange transition-colors">
                    {language === 'fr' ? 'Journée internationale des droits des migrants' : 'اليوم العالمي لحقوق المهاجرين'}
                  </h4>
                  <p className="text-gray-500 text-sm mt-1">
                    {language === 'fr' ? '18 décembre 2023' : '18 ديسمبر 2023'}
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