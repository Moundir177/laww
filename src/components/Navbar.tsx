'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaBars, FaTimes } from 'react-icons/fa';
import LanguageSwitcher from './LanguageSwitcher';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const navItems = [
    { name: t('home'), href: '/' },
    { name: t('about'), href: '/about' },
    { name: t('programs'), href: '/programs', highlight: 'orange' },
    { name: t('news'), href: '/news', highlight: 'orange' },
    { name: t('review'), href: '/review' },
    { name: t('testimonials'), href: '/testimonials' },
    { name: t('contact'), href: '/contact', highlight: 'orange' },
  ];

  // Classes to handle RTL/LTR layout
  const textAlignment = language === 'ar' ? 'text-right' : 'text-left';
  const flexDirection = language === 'ar' ? 'flex-row-reverse' : 'flex-row';

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className={`flex justify-between items-center py-2 ${flexDirection}`}>
          {/* Logo */}
          <Link href="/" className={`flex items-center ${language === 'ar' ? 'flex-row-reverse' : 'flex-row'} ${language === 'ar' ? 'space-x-0' : 'space-x-2'}`}>
            <div className="relative h-10 w-10 md:h-12 md:w-12 flex items-center justify-center">
              <Image 
                src="/images/g19.png" 
                alt="Foundation Logo" 
                width={96} 
                height={96} 
                className="object-contain absolute transform -translate-y-1"
              />
            </div>
            <div className={`font-poppins ${language === 'ar' ? 'mr-2' : 'ml-2'}`}>
              <div className="font-bold text-sm md:text-lg leading-tight">
                {language === 'fr' ? 'Fondation' : 'المؤسسة'}
              </div>
              <div className="text-xs md:text-sm leading-tight">
                {language === 'fr' ? 'Pour la Promotion des Droits' : 'من اجل ترقية الحقوق'}
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center">
            {/* Navigation Items */}
            <div className={`flex ${language === 'ar' ? 'flex-row-reverse' : 'flex-row'} ${language === 'ar' ? 'space-x-0 space-x-reverse rtl:space-x-6' : 'space-x-6'}`}>
              {navItems.map((item) => (
                <div key={item.name} className={`relative group ${language === 'ar' ? 'ml-6' : ''}`}>
                  <Link
                    href={item.href}
                    className={`px-1 py-2 text-sm font-medium text-gray-700 transition-colors duration-200 ${
                      item.highlight === 'orange' 
                        ? 'hover:text-orange' 
                        : 'hover:text-primary'
                    }`}
                  >
                    {item.name}
                  </Link>
                  <div className={`absolute bottom-0 ${language === 'ar' ? 'right-0' : 'left-0'} h-0.5 w-0 ${
                    item.highlight === 'orange' 
                      ? 'group-hover:bg-orange' 
                      : 'group-hover:bg-primary'
                  } transition-all duration-300 group-hover:w-full`}></div>
                </div>
              ))}
            </div>
            
            {/* Language Switcher */}
            <div className={`${language === 'ar' ? 'border-r mr-6 pr-6' : 'border-l ml-6 pl-6'} border-gray-200`}>
              <LanguageSwitcher 
                currentLanguage={language} 
                onChange={setLanguage} 
              />
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center">
            <LanguageSwitcher 
              currentLanguage={language} 
              onChange={setLanguage} 
              className="scale-90"
            />
            <button
              type="button"
              className={`inline-flex items-center justify-center p-1 sm:p-2 rounded-md text-gray-700 hover:text-orange focus:outline-none ${language === 'ar' ? 'mr-1 sm:mr-2' : 'ml-1 sm:ml-2'}`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <FaTimes className="h-5 w-5 sm:h-6 sm:w-6" />
              ) : (
                <FaBars className="h-5 w-5 sm:h-6 sm:w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`${
          mobileMenuOpen ? 'block' : 'hidden'
        } lg:hidden bg-white shadow-md`}
      >
        <div className={`px-2 pt-2 pb-3 space-y-1 ${textAlignment}`}>
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`block px-3 py-2 text-sm font-medium text-gray-700 ${
                item.highlight === 'orange' 
                  ? 'hover:text-orange hover:bg-orange/5' 
                  : 'hover:text-primary hover:bg-primary/5'
              } rounded transition-colors`}
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div className="border-t border-gray-100 pt-2 pb-4 px-4">
          <Link 
            href="/contact" 
            className={`btn-orange w-full flex ${language === 'ar' ? 'justify-center' : 'justify-center'} items-center text-center text-sm font-medium py-2`}
          >
            {language === 'fr' ? 'Contactez-nous' : 'اتصل بنا'}
          </Link>
        </div>
      </div>
    </nav>
  );
} 