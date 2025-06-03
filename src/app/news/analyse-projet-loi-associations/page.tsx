'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import Link from 'next/link';
import Newsletter from '@/components/Newsletter';
import { FaCalendarAlt, FaUser } from 'react-icons/fa';

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
            {/* YouTube Video as Main Content */}
            <div className="bg-white p-0 rounded-2xl shadow-lg overflow-hidden mb-8">
              <div className="w-full">
                <div className="relative pb-[56.25%] h-0 overflow-hidden">
                  <iframe 
                    src="https://www.youtube.com/embed/ne8ZEXcXa6A?showinfo=0" 
                    title="Journée internationale des droits des migrants"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                    className="absolute top-0 left-0 w-full h-full"
                  ></iframe>
                </div>
              </div>
              
              <div className="p-8">
                <h1 className="text-3xl md:text-4xl font-bold mb-6 text-secondary">
                  {language === 'fr' ? articleContent.title.fr : articleContent.title.ar}
                </h1>
                
                <div className="flex items-center mb-8">
                  <div className="bg-light px-3 py-1 rounded text-sm text-gray-500 flex items-center">
                    <FaCalendarAlt className="text-orange mr-2" size={14} />
                    <span>{language === 'fr' ? articleContent.date.fr : articleContent.date.ar}</span>
                  </div>
                  <div className="ml-4 px-3 py-1 bg-light rounded text-sm text-gray-500 flex items-center">
                    <FaUser className="text-orange mr-2" size={14} />
                    <span>{language === 'fr' ? articleContent.author.fr : articleContent.author.ar}</span>
                  </div>
                </div>
                
                <p className="text-gray-700 leading-relaxed">
                  {language === 'fr' ? articleContent.content.fr : articleContent.content.ar}
                </p>
              </div>
            </div>
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
                {['Tous', 'Formation', 'Rapports', 'Événements', 'Publications', 'Analyses', 'Programmes'].map((category, idx) => (
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