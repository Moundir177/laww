'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import NewsDetail from '@/components/NewsDetail';
import Link from 'next/link';
import Newsletter from '@/components/Newsletter';

const articleContent = {
  id: 1,
  title: {
    fr: 'Note d\'analyse sur le projet de loi sur les associations',
    ar: 'مذكرة تحليلية حول مشروع قانون الجمعيات'
  },
  date: {
    fr: '18 décembre 2024',
    ar: '18 ديسمبر 2024'
  },
  author: {
    fr: 'Équipe de recherche',
    ar: 'فريق البحث'
  },
  category: {
    fr: 'Analyses',
    ar: 'تحليلات'
  },
  keyPoints: [
    { fr: 'Analyse des implications pour la société civile', ar: 'تحليل الآثار المترتبة على المجتمع المدني' },
    { fr: 'Évaluation de la conformité aux standards internationaux', ar: 'تقييم التوافق مع المعايير الدولية' },
    { fr: 'Recommandations pour améliorer le projet de loi', ar: 'توصيات لتحسين مشروع القانون' }
  ],
  content: {
    fr: 'À l\'occasion de la journée internationale des droits des migrants, nous annonçons la création d\'une cellule juridique pour les migrants et les familles des disparus en mer en Algérie. N\'hésitez pas à visiter notre page Facebook et nous contacter.',
    ar: 'بمناسبة اليوم العالمي لحقوق المهاجرين، نعلن عن إنشاء خلية قانونية للمهاجرين وعائلات المفقودين في البحر في الجزائر. لا تترددوا في زيارة صفحتنا على فيسبوك والاتصال بنا.'
  },
  slug: '/news/analyse-projet-loi-associations'
};

export default function AnalyseProjetLoiPage() {
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
                {['Tous', 'Analyses', 'Rapports', 'Événements'].map((category, idx) => (
                  <Link 
                    key={category}
                    href="/news"
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      category === 'Analyses'
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
                
                <Link href="/news/table-ronde-reformes-juridiques" className="block hover:bg-light p-3 rounded-lg transition-colors">
                  <h4 className="font-semibold text-secondary hover:text-orange transition-colors">
                    {language === 'fr' ? 'Table Ronde sur les Réformes Juridiques' : 'طاولة مستديرة حول الإصلاحات القانونية'}
                  </h4>
                  <p className="text-gray-500 text-sm mt-1">
                    {language === 'fr' ? '5 août 2023' : '5 أغسطس 2023'}
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