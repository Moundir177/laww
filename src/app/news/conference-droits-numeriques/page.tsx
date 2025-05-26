'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import NewsDetail from '@/components/NewsDetail';
import Link from 'next/link';
import Newsletter from '@/components/Newsletter';

const articleContent = {
  id: 6,
  title: {
    fr: 'Conférence sur les Droits Numériques',
    ar: 'مؤتمر حول الحقوق الرقمية'
  },
  date: {
    fr: '15 juillet 2023',
    ar: '15 يوليو 2023'
  },
  author: {
    fr: 'Équipe des événements',
    ar: 'فريق الفعاليات'
  },
  category: {
    fr: 'Événements',
    ar: 'فعاليات'
  },
  keyPoints: [
    { fr: 'Protection des données personnelles', ar: 'حماية البيانات الشخصية' },
    { fr: 'Liberté d\'expression en ligne', ar: 'حرية التعبير عبر الإنترنت' },
    { fr: 'Accès équitable aux technologies numériques', ar: 'وصول عادل إلى التقنيات الرقمية' }
  ],
  content: {
    fr: 'Une conférence abordant les défis et les opportunités de la protection des droits à l\'ère numérique. Cet événement a réuni des experts en droit numérique, des défenseurs des droits humains et des professionnels des technologies pour discuter de l\'impact de la révolution numérique sur les droits fondamentaux. Des sessions thématiques ont porté sur la protection des données personnelles, la liberté d\'expression en ligne et l\'accès équitable aux technologies numériques.',
    ar: 'مؤتمر يتناول تحديات وفرص حماية الحقوق في العصر الرقمي. جمع هذا الحدث خبراء في القانون الرقمي، ومدافعين عن حقوق الإنسان، ومتخصصين في التكنولوجيا لمناقشة تأثير الثورة الرقمية على الحقوق الأساسية. تناولت الجلسات المواضيعية حماية البيانات الشخصية، وحرية التعبير عبر الإنترنت، والوصول العادل إلى التقنيات الرقمية.'
  },
  slug: '/news/conference-droits-numeriques'
};

export default function ConferenceDroitsNumeriquesPage() {
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
                {['Tous', 'Événements', 'Rapports', 'Publications'].map((category, idx) => (
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
                <Link href="/news/table-ronde-reformes-juridiques" className="block hover:bg-light p-3 rounded-lg transition-colors">
                  <h4 className="font-semibold text-secondary hover:text-orange transition-colors">
                    {language === 'fr' ? 'Table Ronde sur les Réformes Juridiques' : 'طاولة مستديرة حول الإصلاحات القانونية'}
                  </h4>
                  <p className="text-gray-500 text-sm mt-1">
                    {language === 'fr' ? '5 août 2023' : '5 أغسطس 2023'}
                  </p>
                </Link>
                
                <Link href="/news/guide-acces-justice" className="block hover:bg-light p-3 rounded-lg transition-colors">
                  <h4 className="font-semibold text-secondary hover:text-orange transition-colors">
                    {language === 'fr' ? 'Guide sur l\'Accès à la Justice' : 'دليل حول الوصول إلى العدالة'}
                  </h4>
                  <p className="text-gray-500 text-sm mt-1">
                    {language === 'fr' ? '5 juillet 2023' : '5 يوليو 2023'}
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