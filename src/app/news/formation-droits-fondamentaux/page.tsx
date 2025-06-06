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
    { fr: 'Mécanismes de protection internationale des droits', ar: 'آليات الحماية الدولية للحقوق' },
    { fr: 'Techniques de plaidoyer et de sensibilisation', ar: 'تقنيات المناصرة والتوعية' },
    { fr: 'Documentation des violations des droits', ar: 'توثيق انتهاكات الحقوق' }
  ],
  content: {
    fr: 'Nouvelle session de formation prévue à Alger pour les défenseurs des droits, axée sur les mécanismes de protection internationale. Cette formation intensive de trois jours permettra aux participants de renforcer leurs compétences en matière de défense des droits et d\'acquérir des outils pratiques pour leurs activités. Des experts nationaux et internationaux animeront les différentes sessions thématiques.',
    ar: 'دورة تدريبية جديدة مخططة في الجزائر العاصمة للمدافعين عن الحقوق، تركز على آليات الحماية الدولية. ستتيح هذه الدورة التدريبية المكثفة التي تستمر ثلاثة أيام للمشاركين تعزيز مهاراتهم في الدفاع عن الحقوق واكتساب أدوات عملية لأنشطتهم. سيقوم خبراء وطنيون ودوليون بتنشيط مختلف الجلسات المواضيعية.'
  },
  slug: '/news/formation-droits-fondamentaux'
};

export default function FormationDroitsFondamentauxPage() {
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
                <Link href="/news/table-ronde-reformes-juridiques" className="block hover:bg-light p-3 rounded-lg transition-colors">
                  <h4 className="font-semibold text-secondary hover:text-orange transition-colors">
                    {language === 'fr' ? 'Table Ronde sur les Réformes Juridiques' : 'طاولة مستديرة حول الإصلاحات القانونية'}
                  </h4>
                  <p className="text-gray-500 text-sm mt-1">
                    {language === 'fr' ? '5 août 2023' : '5 أغسطس 2023'}
                  </p>
                </Link>
                
                <Link href="/news/analyse-projet-loi-associations" className="block hover:bg-light p-3 rounded-lg transition-colors">
                  <h4 className="font-semibold text-secondary hover:text-orange transition-colors">
                    {language === 'fr' ? 'Note d\'analyse sur le projet de loi sur les associations' : 'مذكرة تحليلية حول مشروع قانون الجمعيات'}
                  </h4>
                  <p className="text-gray-500 text-sm mt-1">
                    {language === 'fr' ? '18 décembre 2024' : '18 ديسمبر 2024'}
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