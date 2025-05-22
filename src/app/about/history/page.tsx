'use client';

import { FaCalendarAlt, FaUsers, FaGlobe, FaBullhorn, FaBook } from 'react-icons/fa';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import Image from 'next/image';

const timelineEvents = {
  fr: [
    {
      year: 2010,
      title: 'Fondation Établie',
      description:
        'La Fondation pour la Promotion des Droits a été établie par un groupe d\'avocats et d\'activistes des droits humains dédiés à la promotion et à la protection des droits humains.',
      icon: <FaCalendarAlt className="text-white" />,
    },
    {
      year: 2012,
      title: 'Premier Programme de Formation Majeur',
      description:
        'Lancement de notre premier programme de formation complet pour les organisations de la société civile, axé sur la documentation des droits humains et les stratégies de plaidoyer.',
      icon: <FaUsers className="text-white" />,
    },
    {
      year: 2014,
      title: 'Expansion du Focus des Programmes',
      description:
        'Élargissement de notre focus pour inclure les droits des femmes et la participation des jeunes, développant des modules de formation spécialisés et des campagnes de plaidoyer.',
      icon: <FaBullhorn className="text-white" />,
    },
    {
      year: 2016,
      title: 'Partenariats Internationaux',
      description:
        'Établissement de partenariats formels avec des organisations internationales de droits humains, renforçant notre capacité et notre portée grâce à des projets collaboratifs.',
      icon: <FaGlobe className="text-white" />,
    },
    {
      year: 2018,
      title: 'Initiative sur les Droits Numériques',
      description:
        'Lancement d\'un programme dédié aux droits numériques et aux libertés en ligne, répondant à l\'importance croissante des espaces numériques pour l\'engagement civique.',
      icon: <FaBook className="text-white" />,
    },
    {
      year: 2020,
      title: 'Centre de Renforcement des Capacités',
      description:
        'Établissement de notre Centre de Renforcement des Capacités, fournissant un soutien continu, des ressources et du mentorat à un réseau d\'organisations de la société civile.',
      icon: <FaUsers className="text-white" />,
    },
    {
      year: 2022,
      title: 'Expansion Stratégique',
      description:
        'Mise en œuvre de notre nouveau plan stratégique quinquennal, axé sur le renforcement des cadres juridiques, la mobilisation populaire et la durabilité institutionnelle.',
      icon: <FaGlobe className="text-white" />,
    },
    {
      year: 2023,
      title: 'Focus Actuel',
      description:
        'Actuellement concentré sur l\'avancement de la participation démocratique, le soutien aux réformes juridiques et la promotion d\'espaces civiques inclusifs pour tous les secteurs de la société.',
      icon: <FaBullhorn className="text-white" />,
    },
  ],
  ar: [
  {
    year: 2010,
      title: 'تأسيس المؤسسة',
    description:
        'تأسست المؤسسة من اجل ترقية الحقوق من قبل مجموعة من المحامين والنشطاء في مجال حقوق الإنسان المكرسين لتعزيز وحماية حقوق الإنسان.',
    icon: <FaCalendarAlt className="text-white" />,
  },
  {
    year: 2012,
      title: 'أول برنامج تدريبي رئيسي',
    description:
        'إطلاق أول برنامج تدريبي شامل لمنظمات المجتمع المدني، مع التركيز على توثيق حقوق الإنسان واستراتيجيات المناصرة.',
    icon: <FaUsers className="text-white" />,
  },
  {
    year: 2014,
      title: 'توسيع تركيز البرامج',
    description:
        'توسيع تركيزنا ليشمل حقوق المرأة ومشاركة الشباب، وتطوير وحدات تدريبية متخصصة وحملات مناصرة.',
    icon: <FaBullhorn className="text-white" />,
  },
  {
    year: 2016,
      title: 'شراكات دولية',
    description:
        'إقامة شراكات رسمية مع منظمات دولية لحقوق الإنسان، مما يعزز قدرتنا ونطاقنا من خلال المشاريع التعاونية.',
    icon: <FaGlobe className="text-white" />,
  },
  {
    year: 2018,
      title: 'مبادرة الحقوق الرقمية',
    description:
        'إطلاق برنامج مخصص للحقوق الرقمية والحريات عبر الإنترنت، استجابة للأهمية المتزايدة للفضاءات الرقمية للمشاركة المدنية.',
    icon: <FaBook className="text-white" />,
  },
  {
    year: 2020,
      title: 'مركز بناء القدرات',
    description:
        'إنشاء مركز بناء القدرات، الذي يوفر الدعم المستمر والموارد والتوجيه لشبكة من منظمات المجتمع المدني.',
    icon: <FaUsers className="text-white" />,
  },
  {
    year: 2022,
      title: 'التوسع الاستراتيجي',
    description:
        'تنفيذ خطتنا الاستراتيجية الخمسية الجديدة، مع التركيز على تعزيز الأطر القانونية، والتعبئة الشعبية، والاستدامة المؤسسية.',
    icon: <FaGlobe className="text-white" />,
  },
  {
    year: 2023,
      title: 'التركيز الحالي',
    description:
        'نركز حاليًا على تعزيز المشاركة الديمقراطية، ودعم الإصلاحات القانونية، وتعزيز الفضاءات المدنية الشاملة لجميع قطاعات المجتمع.',
    icon: <FaBullhorn className="text-white" />,
  },
  ]
};

export default function History() {
  const { language } = useLanguage();
  const events = language === 'fr' ? timelineEvents.fr : timelineEvents.ar;

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const timelineVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  const eventVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="bg-gray-50 py-16 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
        <motion.div 
          className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-[#2AA084]/40 blur-3xl"
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
          className="absolute top-1/3 right-0 w-96 h-96 rounded-full bg-orange/30 blur-3xl"
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
        <motion.div 
          className="absolute bottom-0 left-1/4 w-80 h-80 rounded-full bg-[#8FD694]/30 blur-3xl"
          animate={{
            x: [0, 60, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
    
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="max-w-4xl mx-auto text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <span className="inline-block px-4 py-1 bg-[#8FD694]/10 text-[#2AA084] text-sm font-medium rounded-full mb-4">
            {language === 'fr' ? 'NOTRE PARCOURS' : 'مسيرتنا'}
          </span>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {language === 'fr' ? 'Notre Histoire' : 'تاريخنا'}
          </h1>
          
          <motion.div 
            className="h-1.5 bg-gradient-to-r from-[#8FD694] to-[#2AA084] w-24 mx-auto mb-8"
            initial={{ width: 0 }}
            whileInView={{ width: '6rem' }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
          
          <p className="text-lg text-gray-700 mb-8 max-w-3xl mx-auto">
            {language === 'fr' 
              ? 'Depuis notre fondation en 2010, la Fondation pour la Promotion des Droits s\'est consacrée à la promotion des droits humains et au renforcement de la société civile. Découvrez notre parcours et nos étapes clés au fil des ans.'
              : 'منذ تأسيسنا في عام 2010، كرست مؤسسة تعزيز الحقوق جهودها لتعزيز حقوق الإنسان وتقوية المجتمع المدني. اكتشف رحلتنا والمراحل الرئيسية على مر السنين.'}
          </p>
          
          {/* Hero image */}
          <div className="relative h-[300px] rounded-xl overflow-hidden shadow-xl mb-16">
            <Image 
              src="/images/programs/foundation-image.jpg" 
              alt={language === 'fr' ? "Histoire de la fondation" : "تاريخ المؤسسة"} 
              fill
              style={{objectFit: "cover"}}
              priority
              className="transition-transform duration-500 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent flex items-end">
              <div className="p-8 text-white">
                <h2 className="text-2xl font-bold mb-2">
                  {language === 'fr' ? 'Une décennie d\'engagement' : 'عقد من الالتزام'}
                </h2>
                <p className="max-w-2xl">
                  {language === 'fr'
                    ? 'Parcourez notre histoire depuis notre création en 2010 jusqu\'à nos initiatives actuelles.'
                    : 'استعرض تاريخنا من تأسيسنا في عام 2010 حتى مبادراتنا الحالية.'}
                </p>
              </div>
            </div>
        </div>
        </motion.div>
        
        <motion.div 
          className="relative"
          variants={timelineVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Center line with animation */}
          <motion.div 
            className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-[#8FD694] via-[#2AA084] to-[#8FD694]"
            initial={{ height: 0 }}
            whileInView={{ height: '100%' }}
            viewport={{ once: true }}
            transition={{ duration: 1.5 }}
          />
          
          {/* Timeline dots animation */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full flex flex-col justify-between items-center">
            {events.map((_, index) => (
              <motion.div 
                key={index} 
                className="w-2 h-2 rounded-full bg-white border-2 border-[#8FD694]"
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + index * 0.1, duration: 0.3 }}
              />
            ))}
          </div>
          
          <div className="relative z-10">
            {events.map((event, index) => (
              <motion.div 
                key={index} 
                className={`mb-16 flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                variants={eventVariants}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className={`w-1/2 ${index % 2 === 0 ? 'pr-12 text-right' : 'pl-12'}`}>
                  <motion.div 
                    className={`bg-white rounded-xl shadow-xl p-6 ${index % 2 === 0 ? 'ml-auto' : 'mr-auto'} border-t border-l border-gray-100 relative overflow-hidden`}
                    style={{ maxWidth: '90%' }}
                    whileHover={{ y: -5, boxShadow: "0 20px 30px rgba(0,0,0,0.1)" }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Decorative accent */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#8FD694]/10 to-transparent rounded-bl-[100px] -mt-10 -mr-10 z-0"></div>
                    
                    <div className="relative z-10">
                      <span className="inline-block px-3 py-1 bg-[#8FD694]/10 text-[#2AA084] text-sm font-medium rounded-full mb-3">
                        {event.year}
                      </span>
                      <h3 className="text-2xl font-bold text-gray-900 mb-3">{event.title}</h3>
                      <div className="w-16 h-1 bg-[#8FD694] mb-4"></div>
                      <p className="text-gray-700 leading-relaxed">{event.description}</p>
                  </div>
                  </motion.div>
                </div>
                
                <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center">
                  <motion.div 
                    className="w-12 h-12 bg-[#8FD694] rounded-full flex items-center justify-center z-20 shadow-lg"
                    whileHover={{ scale: 1.2 }}
                    transition={{ duration: 0.3 }}
                  >
                    {event.icon}
                  </motion.div>
                </div>
                
                <div className="w-1/2"></div>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        <motion.div 
          className="bg-white rounded-xl shadow-xl p-10 mb-12 mt-16 relative overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Decorative elements */}
          <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-bl from-[#8FD694]/20 to-transparent rounded-full"></div>
          <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-gradient-to-tr from-[#2AA084]/20 to-transparent rounded-full"></div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center relative inline-block">
            {language === 'fr' ? 'Notre Engagement Continu' : 'التزامنا المستمر'}
              <motion.div 
                className="h-1 bg-gradient-to-r from-[#8FD694] to-[#2AA084] absolute -bottom-2 left-0"
                initial={{ width: 0 }}
                whileInView={{ width: '100%' }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
              />
          </h2>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            {language === 'fr'
              ? 'Tout au long de notre histoire, nous sommes restés fidèles à nos valeurs fondatrices d\'égalité, de justice et de dignité pour tous. En regardant vers l\'avenir, nous continuons à adapter nos approches pour répondre aux défis émergents en matière de droits humains tout en nous appuyant sur notre base établie d\'expertise et de confiance communautaire.'
              : 'على مدار تاريخنا، ظللنا ملتزمين بقيمنا التأسيسية المتمثلة في المساواة والعدالة والكرامة للجميع. وبينما نتطلع إلى المستقبل، نواصل تكييف نهجنا لمواجهة التحديات الناشئة في مجال حقوق الإنسان مع البناء على أساسنا الراسخ من الخبرة والثقة المجتمعية.'}
          </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <p className="text-lg text-gray-700 leading-relaxed">
            {language === 'fr'
              ? 'Notre histoire témoigne de la puissance de l\'action collective et de l\'importance d\'un engagement soutenu envers les principes des droits humains. Nous honorons ceux qui ont contribué à notre parcours et nous nous réjouissons de travailler avec de nouveaux partenaires et soutiens alors que nous poursuivons notre mission.'
              : 'يشهد تاريخنا على قوة العمل الجماعي وأهمية الالتزام المستمر بمبادئ حقوق الإنسان. نحن نكرم أولئك الذين ساهموا في رحلتنا ونتطلع إلى العمل مع شركاء وداعمين جدد بينما نواصل مهمتنا.'}
          </p>
            </motion.div>
          </div>
          
          <motion.div 
            className="flex justify-center mt-8 relative z-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <div className="bg-gray-50 px-6 py-4 rounded-lg border border-gray-200 inline-flex items-center">
              <div className="w-12 h-12 rounded-full bg-[#8FD694]/20 flex items-center justify-center mr-4">
                <FaUsers className="text-[#2AA084]" />
              </div>
              <div>
                <p className="font-medium text-gray-800">
                  {language === 'fr' 
                    ? 'Rejoignez-nous dans la prochaine phase de notre voyage' 
                    : 'انضم إلينا في المرحلة التالية من رحلتنا'}
                </p>
                <p className="text-sm text-gray-600">
                  {language === 'fr' 
                    ? 'Ensemble, nous pouvons faire une différence durable' 
                    : 'معًا، يمكننا إحداث فرق دائم'}
                </p>
              </div>
        </div>
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Link 
            href="/about" 
            className="inline-block bg-[#8FD694] hover:bg-[#7ac683] text-[#171717] font-bold py-3 px-6 rounded-lg transition duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
          >
            {language === 'fr' ? 'Retour à À Propos' : 'العودة إلى من نحن'}
          </Link>
        </motion.div>
      </div>
    </div>
  );
} 