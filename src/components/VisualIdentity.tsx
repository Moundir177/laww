'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { getPageContent, PageContent } from '@/lib/database';

// Custom event name for content updates
const CONTENT_UPDATED_EVENT = 'content_updated';

export default function VisualIdentity() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const { language } = useLanguage();
  const [sectionTitle, setSectionTitle] = useState(language === 'fr' ? 'Notre identité visuelle' : 'هويتنا البصرية');
  const [sectionDesc, setSectionDesc] = useState(
    language === 'fr' 
      ? 'Notre identité visuelle reflète nos valeurs d\'équilibre, de durabilité et d\'action positive. Les couleurs de notre logo représentent notre engagement envers ces principes.'
      : 'تعكس هويتنا البصرية قيمنا المتمثلة في التوازن والاستدامة والعمل الإيجابي. تمثل ألوان شعارنا التزامنا بهذه المبادئ.'
  );
  const [colors, setColors] = useState([
    {
      name: language === 'fr' ? 'Turquoise' : 'فيروزي',
      hex: '#3cb496',
      rgb: 'R60 / V180 / B150',
      box: 'bg-[#3cb496] border-4 border-white',
      inner: 'bg-[#FF8A00]',
    },
    {
      name: language === 'fr' ? 'Orange' : 'برتقالي',
      hex: '#f39207',
      rgb: 'R243 / V146 / B7',
      box: 'bg-[#f39207] border-4 border-white',
      inner: 'bg-[#3cb496]',
    }
  ]);

  const loadContent = async () => {
    try {
      const content = await getPageContent('home');
    if (content) {
      console.log('VisualIdentity - Loading content, available sections:', content.sections.map(s => s.id));
      
      // Find the identite_visuelle section by checking multiple possible IDs
      const identiteVisuelleSection = content.sections.find(section => 
          section.id === 'identite_visuelle' || section.id === 'visual_identity');
        
        if (identiteVisuelleSection) {
          console.log('VisualIdentity - Found section:', identiteVisuelleSection.title);
          
          // Set the section title and description
          setSectionTitle(identiteVisuelleSection.title?.[language] || (language === 'ar' ? 'هويتنا البصرية' : 'Notre identité visuelle'));
          setSectionDesc(identiteVisuelleSection.content?.[language] || '');
        }
      }
    } catch (error) {
      console.error('Error loading visual identity content:', error);
    }
  };

  useEffect(() => {
    loadContent();
    
    // Listen for custom content updated event
    const handleContentUpdated = () => {
      loadContent();
    };
    
    window.addEventListener('content_updated', handleContentUpdated);
    
    return () => {
      window.removeEventListener('content_updated', handleContentUpdated);
    };
  }, [language]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section className="py-12 md:py-20 bg-gray-50" ref={ref} id="section_11">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-10 md:mb-16"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.h2 
            className="text-2xl md:text-3xl lg:text-4xl font-bold text-black mb-4" 
            variants={itemVariants}
          >
            {sectionTitle}
          </motion.h2>
          
          <motion.div 
            className="w-16 md:w-24 h-1.5 bg-[#f39207] mx-auto rounded-full mb-6 md:mb-8"
            variants={itemVariants}
          ></motion.div>
          
          <motion.p 
            className="text-sm md:text-base text-gray-700 max-w-3xl mx-auto px-2"
            variants={itemVariants}
          >
            {sectionDesc}
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
          {colors.map((color, index) => (
            <motion.div
              key={color.name}
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.3 + (index * 0.2) }}
            >
              <div className={`w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 ${color.box} relative flex items-center justify-center mb-4 md:mb-8`}>
                <div className={`w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 ${color.inner} absolute`}></div>
              </div>
              
              <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-2 md:mb-3">{color.name}</h3>
              <div className="space-y-1 text-center">
                <p className="text-sm md:text-base text-gray-600">{color.rgb}</p>
                <p className="text-sm md:text-base text-gray-800 font-semibold">{color.hex}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 