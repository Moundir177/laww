'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { FaCalendarAlt } from 'react-icons/fa';

// Timeline data
const timelineEvents = [
  {
    date: {
      fr: 'Février 2024',
      ar: 'فبراير 2024'
    },
    title: {
      fr: 'Création officielle',
      ar: 'الإنشاء الرسمي'
    },
    description: {
      fr: 'Fondation de l\'association le 14 février 2024 par un groupe de militants des droits humains et d\'avocats.',
      ar: 'تأسيس الجمعية في 14 فبراير 2024 من قبل مجموعة من نشطاء حقوق الإنسان والمحامين.'
    },
    color: 'teal'
  },
  {
    date: {
      fr: 'Mars 2024',
      ar: 'مارس 2024'
    },
    title: {
      fr: 'Notre équipe diverse',
      ar: 'فريقنا المتنوع'
    },
    description: {
      fr: 'Créée le 14 février 2024, la Fondation pour la promotion des droits est née de l\'initiative de militantes, militants et avocat(e)s engagé(e)s, forts d\'une longue expérience dans le domaine des droits humains. Constituée sous l\'égide de la loi 12/06 relative aux associations, notre Fondation s\'inscrit dans une dynamique citoyenne, juridique et sociale en faveur de la dignité humaine, de la justice et de l\'État de droit.',
      ar: 'تأسست في 14 فبراير 2024، ولدت المؤسسة من اجل ترقية الحقوق من مبادرة ناشطين وناشطات ومحامين ملتزمين، يتمتعون بخبرة طويلة في مجال حقوق الإنسان. تأسست تحت رعاية القانون 12/06 المتعلق بالجمعيات، وتندرج مؤسستنا في ديناميكية مواطنة وقانونية واجتماعية لصالح الكرامة الإنسانية والعدالة وسيادة القانون.'
    },
    color: 'yellow'
  },
  {
    date: {
      fr: 'Mars 2024',
      ar: 'مارس 2024'
    },
    title: {
      fr: 'Premier programme de formation',
      ar: 'البرنامج التدريبي الأول'
    },
    description: {
      fr: 'Lancement du premier cycle de formation sur les droits juridiques fondamentaux à Alger.',
      ar: 'إطلاق الدورة التدريبية الأولى حول الحقوق القانونية الأساسية في الجزائر.'
    },
    color: 'yellow'
  },
  {
    date: {
      fr: 'Avril 2024',
      ar: 'أبريل 2024'
    },
    title: {
      fr: 'Premier partenariat international',
      ar: 'أول شراكة دولية'
    },
    description: {
      fr: 'Signature d\'un accord de collaboration avec une ONG internationale reconnue dans le domaine des droits humains.',
      ar: 'توقيع اتفاقية تعاون مع منظمة غير حكومية دولية معترف بها في مجال حقوق الإنسان.'
    },
    color: 'orange'
  },
  {
    date: {
      fr: 'Juin 2024',
      ar: 'يونيو 2024'
    },
    title: {
      fr: 'Lancement du site web',
      ar: 'إطلاق الموقع الإلكتروني'
    },
    description: {
      fr: 'Mise en ligne de notre plateforme digitale pour amplifier notre impact et élargir notre audience.',
      ar: 'إطلاق منصتنا الرقمية لتعزيز تأثيرنا وتوسيع جمهورنا.'
    },
    color: 'teal'
  }
];

export default function Timeline() {
  const { language } = useLanguage();
  
  // Animation variants
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
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  // Helper function to get the appropriate color class
  const getColorClass = (color: string, type: 'bg' | 'border' | 'text'): string => {
    if (color === 'teal') {
      if (type === 'bg') return 'bg-teal-500';
      if (type === 'border') return 'border-teal-500';
      if (type === 'text') return 'text-teal-600';
    } else if (color === 'yellow') {
      if (type === 'bg') return 'bg-yellow-500';
      if (type === 'border') return 'border-yellow-500';
      if (type === 'text') return 'text-yellow-600';
    } else if (color === 'orange') {
      if (type === 'bg') return 'bg-orange-500';
      if (type === 'border') return 'border-orange-500';
      if (type === 'text') return 'text-orange-600';
    }
    return '';
  };

  return (
    <div className="py-16 relative">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
        <motion.div 
          className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-teal-500/40 blur-3xl"
          animate={{
            x: [0, 30, 0],
            y: [0, 20, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute top-1/3 right-0 w-96 h-96 rounded-full bg-orange-500/30 blur-3xl"
          animate={{
            x: [0, -40, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
      
      <div className="container mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative"
        >
          {/* Timeline center line - Make it a full-height position absolute div that extends beyond the content */}
          <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-teal-500 via-yellow-500 to-orange-500" style={{ height: 'calc(100% + 100px)' }}></div>
          
          {/* Timeline events */}
          {timelineEvents.map((event, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              className={`mb-16 flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
            >
              {/* Date marker in center for mobile, hidden on desktop */}
              <div className="md:hidden flex justify-center mb-8">
                <motion.div 
                  className={`${getColorClass(event.color, 'bg')} text-white font-semibold py-2 px-6 rounded-full shadow-lg flex items-center space-x-2`}
                  whileHover={{ scale: 1.05 }}
                >
                  <FaCalendarAlt className="mr-2" />
                  <span>{language === 'ar' ? event.date.ar : event.date.fr}</span>
                </motion.div>
              </div>
              
              {/* Left side content (for even indexes on desktop) */}
              <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:pr-12 text-right' : 'md:pl-12 md:order-1'}`}>
                {/* Date indicator for desktop, positioned on correct side */}
                <div className={`hidden md:flex ${index % 2 === 0 ? 'justify-end' : 'justify-start'} mb-4`}>
                  <motion.div 
                    className={`${getColorClass(event.color, 'bg')} text-white font-semibold py-2 px-6 rounded-full shadow-lg flex items-center space-x-2`}
                    whileHover={{ scale: 1.05 }}
                  >
                    <FaCalendarAlt className="mr-2" />
                    <span>{language === 'ar' ? event.date.ar : event.date.fr}</span>
                  </motion.div>
                </div>
                
                {/* Content card */}
                <motion.div 
                  className={`bg-white p-6 rounded-xl shadow-xl ${index % 2 === 0 ? 'ml-0 md:ml-auto' : 'mr-0 md:mr-auto'} border-t-4 ${getColorClass(event.color, 'border')} relative`}
                  style={{ maxWidth: '90%' }}
                  whileHover={{ y: -5, boxShadow: "0 20px 30px rgba(0,0,0,0.1)" }}
                >
                  <h3 className={`text-xl font-bold mb-3 ${getColorClass(event.color, 'text')}`}>
                    {language === 'ar' ? event.title.ar : event.title.fr}
                  </h3>
                  <p className="text-gray-700">
                    {language === 'ar' ? event.description.ar : event.description.fr}
                  </p>
                </motion.div>
              </div>
              
              {/* Timeline center dot */}
              <div className="absolute left-1/2 transform -translate-x-1/2 md:flex items-center justify-center">
                <motion.div 
                  className={`hidden md:flex w-5 h-5 rounded-full ${getColorClass(event.color, 'bg')} border-4 border-white shadow-md z-10`}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.3 }}
                />
              </div>
              
              {/* Right side spacer (for even indexes) */}
              <div className={`hidden md:block md:w-1/2 ${index % 2 === 0 ? '' : 'md:order-2'}`}></div>
            </motion.div>
          ))}
          
          {/* "À suivre..." section */}
          <motion.div 
            className="flex justify-center pt-8 z-10 relative"
            variants={itemVariants}
          >
            {/* Hourglass dot for À suivre */}
            <div className="absolute left-1/2 transform -translate-x-1/2 top-0 w-5 h-5 rounded-full bg-orange-500 border-4 border-white shadow-md"></div>
            
            <motion.div 
              className="bg-white p-8 rounded-xl border-2 border-dashed border-gray-300 shadow-lg max-w-md text-center"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex justify-center mb-4">
                <motion.div
                  animate={{ 
                    rotate: [0, 15, 0, -15, 0],
                    scale: [1, 1.1, 1, 1.1, 1]
                  }}
                  transition={{ 
                    duration: 5, 
                    repeat: Infinity,
                    repeatType: "loop"
                  }}
                >
                  <span className="text-4xl">⏳</span>
                </motion.div>
              </div>
              <h3 className="text-xl font-bold text-gray-700 mb-3">
                {language === 'ar' ? 'يتبع...' : 'À suivre...'}
              </h3>
              <p className="text-gray-600">
                {language === 'ar' 
                  ? 'ما زال تاريخنا قيد الكتابة. انضموا إلينا في هذه الرحلة للدفاع عن وتعزيز الحقوق الأساسية.'
                  : 'Notre histoire continue de s\'écrire. Rejoignez-nous dans ce parcours pour la défense et la promotion des droits fondamentaux.'}
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
} 