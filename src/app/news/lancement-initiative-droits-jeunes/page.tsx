'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import NewsDetail from '@/components/NewsDetail';
import Link from 'next/link';
import Newsletter from '@/components/Newsletter';

const articleContent = {
  id: 7,
  title: {
    fr: 'Lancement de l\'Initiative Droits des Jeunes',
    ar: 'إطلاق مبادرة حقوق الشباب'
  },
  date: {
    fr: '28 juillet 2023',
    ar: '28 يوليو 2023'
  },
  author: {
    fr: 'Équipe des programmes',
    ar: 'فريق البرامج'
  },
  category: {
    fr: 'Programmes',
    ar: 'برامج'
  },
  keyPoints: [
    { fr: 'Éducation civique pour les jeunes de 14 à 25 ans', ar: 'التربية المدنية للشباب من 14 إلى 25 سنة' },
    { fr: 'Ateliers interactifs dans les établissements scolaires', ar: 'ورش عمل تفاعلية في المؤسسات التعليمية' },
    { fr: 'Formation de jeunes ambassadeurs des droits', ar: 'تدريب سفراء شباب للحقوق' }
  ],
  content: {
    fr: 'Une nouvelle initiative visant à éduquer les jeunes sur leurs droits et à encourager leur engagement dans la société civile. Ce programme ambitieux inclut des ateliers interactifs dans les établissements scolaires, des campagnes de sensibilisation sur les réseaux sociaux et la formation de jeunes ambassadeurs qui pourront à leur tour partager leurs connaissances avec leurs pairs. L\'objectif est de créer une génération consciente de ses droits et capable de les défendre.',
    ar: 'مبادرة جديدة تهدف إلى تثقيف الشباب حول حقوقهم وتشجيع مشاركتهم في المجتمع المدني. يتضمن هذا البرنامج الطموح ورش عمل تفاعلية في المؤسسات التعليمية، وحملات توعية على وسائل التواصل الاجتماعي، وتدريب سفراء شباب يمكنهم بدورهم مشاركة معرفتهم مع أقرانهم. الهدف هو خلق جيل واعٍ بحقوقه وقادر على الدفاع عنها.'
  },
  slug: '/news/lancement-initiative-droits-jeunes'
};

export default function LancementInitiativeDroitsJeunesPage() {
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
                {['Tous', 'Programmes', 'Formation', 'Publications'].map((category, idx) => (
                  <Link 
                    key={category}
                    href="/news"
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      category === 'Programmes'
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
                
                <Link href="/news/conference-droits-numeriques" className="block hover:bg-light p-3 rounded-lg transition-colors">
                  <h4 className="font-semibold text-secondary hover:text-orange transition-colors">
                    {language === 'fr' ? 'Conférence sur les Droits Numériques' : 'مؤتمر حول الحقوق الرقمية'}
                  </h4>
                  <p className="text-gray-500 text-sm mt-1">
                    {language === 'fr' ? '15 juillet 2023' : '15 يوليو 2023'}
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