'use client';

import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { getPageContent } from '@/lib/database';
import Image from 'next/image';

// Client-only component for the hero background
function HeroBackground() {
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  if (!isClient) {
    // Server-side render a simpler version without animations
    return (
      <div className="absolute inset-0 bg-secondary z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-[#2AA084]/50"></div>
        <div className="absolute top-0 right-0 w-1/3 h-1/2 bg-gradient-to-bl from-orange/30 to-transparent"></div>
      </div>
    );
  }
  
  return (
    <motion.div 
      className="absolute inset-0 bg-secondary z-0" 
      initial={{ opacity: 0.8 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
    >
      {/* Main gradient overlay */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-r from-black/30 to-[#2AA084]/50"
        initial={{ opacity: 0.5 }}
        animate={{ opacity: 0.9 }}
        transition={{ duration: 1.5 }}
      ></motion.div>
      
      {/* Centered logo */}
      <div className="absolute inset-0 flex items-center justify-center z-0">
        <div className="relative w-[400px] h-[400px] opacity-20">
          <Image 
            src="/images/logo.png" 
            alt="Foundation Logo" 
            fill
            className="object-contain"
          />
        </div>
      </div>
      
      {/* Orange lighting effect on the top right */}
      <motion.div
        className="absolute top-0 right-0 w-1/3 h-1/2 bg-gradient-to-bl from-orange/30 to-transparent"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ 
          opacity: [0.2, 0.4, 0.2], 
          scale: [0.8, 1.1, 0.8]
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity, 
          repeatType: "reverse" 
        }}
      ></motion.div>
      
      {/* Additional orange glow on right side */}
      <div className="absolute right-0 inset-y-0 w-1/4 bg-gradient-to-l from-orange/20 to-transparent z-0"></div>
      
      {/* Bottom orange accent */}
      <div className="absolute bottom-0 right-0 w-1/2 h-1/4 bg-gradient-to-tl from-orange/15 to-transparent z-0"></div>
      
      {/* Subtle light particles */}
      {isClient && [...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white/10"
          style={{
            width: Math.random() * 100 + 50,
            height: Math.random() * 100 + 50,
            borderRadius: '50%',
            filter: 'blur(40px)',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          initial={{ opacity: 0.1 }}
          animate={{ 
            opacity: [0.05, 0.2, 0.05],
            x: [0, Math.random() * 20 - 10, 0],
            y: [0, Math.random() * 20 - 10, 0],
          }}
          transition={{ 
            duration: 15 + Math.random() * 10, 
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
      ))}
    </motion.div>
  );
}

export default function Hero() {
  const { language } = useLanguage();
  const [pageContent, setPageContent] = useState<any | null>(null);

  const loadContent = async () => {
    try {
      const content = await getPageContent('home');
      if (content) {
        setPageContent(content);
      }
    } catch (error) {
      console.error('Error loading hero content:', error);
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

  // Get hero section content
  const heroSection = pageContent?.sections?.find((section: any) => section.id === 'hero');
  const missionSection = pageContent?.sections?.find((section: any) => section.id === 'mission');
  
  // Default content if not found in database
  const heroTitle = heroSection?.title?.[language] || 
    (language === 'fr' ? 'Bannière principale' : 'البانر الرئيسي');
    
  const heroText = heroSection?.content?.[language] || 
    (language === 'fr' ? 'Fondation pour la Promotion des Droits' : 'المؤسسة من اجل ترقية الحقوق');
  
  const missionTitle = missionSection?.title?.[language] || 
    (language === 'fr' ? 'Notre mission' : 'مهمتنا');
    
  const missionText = missionSection?.content?.[language] || 
    (language === 'fr' ? 'Notre mission est de promouvoir et défendre les droits par la sensibilisation, la formation, la documentation des violations et le soutien aux acteurs de la société civile.' 
    : 'مهمتنا هي تعزيز والدفاع عن الحقوق من خلال التوعية والتدريب وتوثيق الانتهاكات ودعم الفاعلين في المجتمع المدني.');

  return (
    <div className="relative h-screen min-h-[600px] sm:min-h-[700px] flex items-center overflow-hidden">
      {/* Background with gradient - no image */}
      <HeroBackground />
      
      <div className="container mx-auto px-4 z-10 relative">
        <div className="max-w-5xl mx-auto text-center">
          {/* Subtitle with orange accent */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-[#2AA084] uppercase tracking-widest text-xs sm:text-sm md:text-base font-medium mb-2 sm:mb-4">
              {heroTitle}
            </p>
          </motion.div>
          
          {/* Main title with animated characters */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 sm:mb-8 leading-tight tracking-tight relative z-10">
              {heroText}
              <motion.div 
                className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-1 bg-orange"
                initial={{ width: 0 }}
                animate={{ width: "40%" }}
                transition={{ delay: 1, duration: 1 }}
              ></motion.div>
            </h1>
          </motion.div>
          
          {/* Mission text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="relative"
          >
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 mb-8 sm:mb-16 max-w-3xl mx-auto leading-relaxed px-4 sm:px-8">
              {missionText}
            </p>
          </motion.div>
          
          {/* CTA Buttons */}
          <motion.div 
            className="flex flex-wrap justify-center gap-4 sm:gap-6 mt-6 sm:mt-10 px-2"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <Link 
              href="/about" 
              className="bg-[#2AA084] hover:bg-[#228E74] text-white font-bold py-3 sm:py-4 px-6 sm:px-10 rounded-lg transition-all shadow-lg flex items-center gap-2 sm:gap-3 text-sm sm:text-base"
            >
              <span>{language === 'fr' ? 'Qui sommes-nous' : 'من نحن'}</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
            
            <Link 
              href="/contact" 
              className="bg-orange hover:bg-orange-dark text-white font-bold py-3 sm:py-4 px-6 sm:px-10 rounded-lg transition-all shadow-lg flex items-center gap-2 sm:gap-3 text-sm sm:text-base"
            >
              <span>{language === 'fr' ? 'Nous contacter' : 'اتصل بنا'}</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
            </Link>
            
            <Link 
              href="/resources" 
              className="bg-transparent hover:bg-white/10 text-white border-2 border-white font-bold py-3 sm:py-4 px-6 sm:px-10 rounded-lg transition-all flex items-center gap-2 sm:gap-3 hover:border-orange text-sm sm:text-base"
            >
              <span>{language === 'fr' ? 'Nos publications' : 'منشوراتنا'}</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 group-hover:text-orange transition-colors" viewBox="0 0 20 20" fill="currentColor">
                <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
              </svg>
            </Link>
          </motion.div>
          
          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: [0, 10, 0] }}
            transition={{ 
              opacity: { delay: 1.5, duration: 1 },
              y: { repeat: Infinity, duration: 1.5, ease: "easeInOut" }
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 text-[#2AA084]" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 