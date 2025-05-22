'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import NewsDetail from '@/components/NewsDetail';
import Link from 'next/link';
import Newsletter from '@/components/Newsletter';

const articleContent = {
  id: 3,
  title: {
    fr: 'Collaboration avec des ONG Internationales',
    ar: 'التعاون مع المنظمات غير الحكومية الدولية'
  },
  date: {
    fr: '10 août 2023',
    ar: '10 أغسطس 2023'
  },
  author: {
    fr: 'Équipe des Partenariats',
    ar: 'فريق الشراكات'
  },
  category: {
    fr: 'Partenariats',
    ar: 'شراكات'
  },
  keyPoints: [
    { fr: 'Échange d\'expertise et bonnes pratiques', ar: 'تبادل الخبرات وأفضل الممارسات' },
    { fr: 'Projets communs de sensibilisation', ar: 'مشاريع مشتركة للتوعية' },
    { fr: 'Renforcement des capacités locales', ar: 'تعزيز القدرات المحلية' }
  ],
  content: {
    fr: 'Un nouveau partenariat stratégique avec des organisations internationales pour renforcer la promotion des droits. Cette collaboration vise à amplifier notre impact par le partage de ressources, de connaissances et d\'outils méthodologiques. Des organisations de différentes régions du monde participeront à cette initiative pour développer des approches innovantes en matière de défense des droits.',
    ar: 'شراكة استراتيجية جديدة مع منظمات دولية لتعزيز تعزيز الحقوق. تهدف هذه الشراكة إلى تعزيز تأثيرنا من خلال تبادل الموارد والمعرفة والأدوات المنهجية. ستشارك منظمات من مناطق مختلفة من العالم في هذه المبادرة لتطوير مناهج مبتكرة لحماية الحقوق.'
  },
  slug: '/images/programs/advocacy.jpg'
};

export default function CollaborationONGPage() {
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
                      category === 'Partenariats'
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