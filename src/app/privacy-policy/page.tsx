'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import PageHeader from '@/components/PageHeader';
import Newsletter from '@/components/Newsletter';
import { motion } from 'framer-motion';

export default function PrivacyPolicyPage() {
  const { language } = useLanguage();
  
  // Get text aligned correctly based on language
  const textAlign = language === 'ar' ? 'text-right' : 'text-left';
  const dir = language === 'ar' ? 'rtl' : 'ltr';
  
  // Get page title based on language
  const pageTitle = language === 'fr' 
    ? 'Politique de Confidentialité' 
    : 'سياسة الخصوصية';
  
  // Get page subtitle based on language
  const pageSubtitle = language === 'fr'
    ? 'Comment nous protégeons vos données et respectons votre vie privée.'
    : 'كيف نحمي بياناتك ونحترم خصوصيتك.';

  return (
    <div className={language === 'ar' ? 'rtl' : ''}>
      {/* Page Header */}
      <PageHeader 
        title={pageTitle}
        subtitle={pageSubtitle}
        language={language}
      />

      {/* Breadcrumbs */}
      <div className="bg-white py-4 shadow-sm">
        <div className="container mx-auto px-4">
          <div className={`flex items-center text-gray-500 text-sm ${language === 'ar' ? 'justify-end' : ''}`}>
            <Link href="/" className="hover:text-primary transition-colors">
              {language === 'fr' ? 'Accueil' : 'الرئيسية'}
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-700 font-medium">
              {language === 'fr' ? 'Politique de Confidentialité' : 'سياسة الخصوصية'}
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            className={`max-w-4xl mx-auto ${textAlign}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            dir={dir}
          >
            <div className="prose prose-lg max-w-none">
              {language === 'fr' ? (
                <>
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Introduction</h2>
                  <p className="mb-6">
                    La Fondation pour la Promotion des Droits s'engage à protéger et à respecter votre vie privée. 
                    Cette politique de confidentialité explique quand et pourquoi nous collectons des informations personnelles, 
                    comment nous les utilisons, les conditions dans lesquelles nous pouvons les divulguer à des tiers, 
                    et comment nous les sécurisons.
                  </p>
                  <p className="mb-6">
                    Cette politique s'applique lorsque vous visitez notre site web, lorsque vous vous inscrivez à notre newsletter, 
                    lorsque vous participez à nos programmes ou événements, ou lorsque vous nous contactez d'une quelconque manière.
                  </p>

                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Qui sommes-nous</h2>
                  <p className="mb-6">
                    La Fondation pour la Promotion des Droits est une organisation à but non lucratif qui œuvre pour la promotion 
                    et la défense des droits humains en Algérie. Notre mission principale est de contribuer à la construction d'un 
                    État de droit solide et inclusif à travers des actions de plaidoyer, des campagnes de sensibilisation, 
                    des formations juridiques et des programmes d'éducation civique.
                  </p>

                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Informations que nous collectons</h2>
                  <p className="mb-6">
                    Nous pouvons collecter les types d'informations suivants :
                  </p>
                  <ul className="list-disc pl-8 mb-6">
                    <li className="mb-2">
                      <strong>Informations personnelles</strong> : nom, prénom, adresse email, numéro de téléphone, 
                      et autres coordonnées que vous nous fournissez volontairement lorsque vous nous contactez 
                      ou participez à nos programmes.
                    </li>
                    <li className="mb-2">
                      <strong>Informations d'utilisation</strong> : informations sur la façon dont vous utilisez notre site web, 
                      comme les pages que vous consultez, le temps que vous passez sur chaque page, et les liens sur lesquels vous cliquez.
                    </li>
                    <li className="mb-2">
                      <strong>Informations techniques</strong> : adresse IP, type et version du navigateur, 
                      paramètres de fuseau horaire, types et versions de plug-ins du navigateur, système d'exploitation et plateforme.
                    </li>
                  </ul>

                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Comment nous utilisons vos informations</h2>
                  <p className="mb-6">
                    Nous utilisons vos informations personnelles aux fins suivantes :
                  </p>
                  <ul className="list-disc pl-8 mb-6">
                    <li className="mb-2">Pour vous fournir les informations, les produits ou les services que vous nous demandez.</li>
                    <li className="mb-2">Pour vous envoyer notre newsletter si vous vous y êtes inscrit.</li>
                    <li className="mb-2">Pour vous informer des changements apportés à nos services ou à nos politiques.</li>
                    <li className="mb-2">Pour gérer votre participation à nos programmes, formations et événements.</li>
                    <li className="mb-2">Pour améliorer notre site web et nos services.</li>
                    <li className="mb-2">Pour répondre à vos questions ou demandes.</li>
                  </ul>

                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Base juridique du traitement</h2>
                  <p className="mb-6">
                    Nous traitons vos informations personnelles sur les bases juridiques suivantes :
                  </p>
                  <ul className="list-disc pl-8 mb-6">
                    <li className="mb-2">
                      <strong>Consentement</strong> : lorsque vous avez donné votre consentement explicite, par exemple en vous inscrivant à notre newsletter.
                    </li>
                    <li className="mb-2">
                      <strong>Intérêt légitime</strong> : lorsque le traitement est nécessaire pour nos intérêts légitimes ou ceux d'un tiers, 
                      et que vos intérêts et droits fondamentaux ne prévalent pas sur ces intérêts.
                    </li>
                    <li className="mb-2">
                      <strong>Exécution d'un contrat</strong> : lorsque le traitement est nécessaire pour l'exécution d'un contrat auquel vous êtes partie.
                    </li>
                    <li className="mb-2">
                      <strong>Obligation légale</strong> : lorsque le traitement est nécessaire pour respecter une obligation légale à laquelle nous sommes soumis.
                    </li>
                  </ul>

                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Partage de vos informations</h2>
                  <p className="mb-6">
                    Nous ne vendons pas vos informations personnelles à des tiers. Nous pouvons partager vos informations dans les cas suivants :
                  </p>
                  <ul className="list-disc pl-8 mb-6">
                    <li className="mb-2">Avec des prestataires de services qui nous aident à gérer notre organisation, tels que les fournisseurs d'hébergement web.</li>
                    <li className="mb-2">Avec des partenaires avec lesquels nous collaborons sur des programmes spécifiques, avec votre consentement préalable.</li>
                    <li className="mb-2">Si nous sommes tenus de le faire par la loi ou en réponse à une demande légale valide.</li>
                  </ul>

                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Sécurité des données</h2>
                  <p className="mb-6">
                    Nous prenons des mesures de sécurité appropriées pour protéger vos informations personnelles contre la perte, 
                    l'accès non autorisé, la divulgation, l'altération ou la destruction. Cependant, aucune méthode de transmission 
                    sur Internet ou de stockage électronique n'est totalement sécurisée. Par conséquent, bien que nous nous efforcions 
                    de protéger vos informations personnelles, nous ne pouvons garantir leur sécurité absolue.
                  </p>

                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Conservation des données</h2>
                  <p className="mb-6">
                    Nous conservons vos informations personnelles aussi longtemps que nécessaire pour atteindre les objectifs pour lesquels 
                    nous les avons collectées, y compris pour satisfaire aux exigences légales, comptables ou de reporting.
                  </p>

                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Vos droits</h2>
                  <p className="mb-6">
                    Vous avez les droits suivants concernant vos informations personnelles :
                  </p>
                  <ul className="list-disc pl-8 mb-6">
                    <li className="mb-2">Droit d'accès à vos informations personnelles.</li>
                    <li className="mb-2">Droit de rectification des informations inexactes.</li>
                    <li className="mb-2">Droit à l'effacement de vos informations personnelles.</li>
                    <li className="mb-2">Droit à la limitation du traitement de vos informations personnelles.</li>
                    <li className="mb-2">Droit à la portabilité des données.</li>
                    <li className="mb-2">Droit d'opposition au traitement de vos informations personnelles.</li>
                    <li className="mb-2">Droit de retirer votre consentement à tout moment.</li>
                  </ul>
                  <p className="mb-6">
                    Pour exercer ces droits, veuillez nous contacter à l'adresse email info@fpra-droits.org.
                  </p>

                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Cookies et technologies similaires</h2>
                  <p className="mb-6">
                    Notre site web utilise des cookies et des technologies similaires pour améliorer votre expérience, 
                    analyser le trafic du site et personnaliser le contenu. Vous pouvez contrôler l'utilisation des cookies 
                    au niveau de votre navigateur. Cependant, le fait de désactiver les cookies peut affecter 
                    certaines fonctionnalités de notre site.
                  </p>

                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Liens vers d'autres sites</h2>
                  <p className="mb-6">
                    Notre site web peut contenir des liens vers des sites web tiers. Nous ne sommes pas responsables 
                    des politiques de confidentialité ou du contenu de ces sites. Nous vous encourageons à lire 
                    les politiques de confidentialité de chaque site que vous visitez.
                  </p>

                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Modifications de notre politique de confidentialité</h2>
                  <p className="mb-6">
                    Nous pouvons mettre à jour cette politique de confidentialité de temps à autre. Toute modification 
                    sera publiée sur cette page et, si les modifications sont importantes, nous vous en informerons 
                    par email ou par une notification sur notre site web.
                  </p>

                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Contact</h2>
                  <p className="mb-6">
                    Si vous avez des questions concernant cette politique de confidentialité ou si vous souhaitez exercer vos droits, 
                    veuillez nous contacter à l'adresse suivante :
                  </p>
                  <p className="mb-6">
                    Fondation pour la Promotion des Droits<br />
                    Adresse : Alger, Algérie<br />
                    Email : info@fpra-droits.org<br />
                    Téléphone : 00213 560 66 71 20
                  </p>

                  <p className="text-sm text-gray-600 mt-12">
                    Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
                  </p>
                </>
              ) : (
                <>
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">مقدمة</h2>
                  <p className="mb-6">
                    تلتزم المؤسسة من أجل ترقية الحقوق بحماية واحترام خصوصيتك. توضح سياسة الخصوصية هذه متى ولماذا نجمع المعلومات الشخصية، 
                    وكيف نستخدمها، والظروف التي قد نكشف عنها للآخرين، وكيف نقوم بتأمينها.
                  </p>
                  <p className="mb-6">
                    تنطبق هذه السياسة عند زيارتك لموقعنا الإلكتروني، أو عند الاشتراك في نشرتنا الإخبارية، 
                    أو عند المشاركة في برامجنا أو فعالياتنا، أو عند الاتصال بنا بأي طريقة.
                  </p>

                  <h2 className="text-2xl font-bold text-gray-800 mb-6">من نحن</h2>
                  <p className="mb-6">
                    المؤسسة من أجل ترقية الحقوق هي منظمة غير ربحية تعمل من أجل تعزيز وحماية حقوق الإنسان في الجزائر. 
                    مهمتنا الرئيسية هي المساهمة في بناء دولة قانون قوية وشاملة من خلال أعمال المناصرة وحملات التوعية 
                    والتدريبات القانونية وبرامج التثقيف المدني.
                  </p>

                  <h2 className="text-2xl font-bold text-gray-800 mb-6">المعلومات التي نجمعها</h2>
                  <p className="mb-6">
                    قد نجمع أنواع المعلومات التالية:
                  </p>
                  <ul className="list-disc pr-8 mb-6">
                    <li className="mb-2">
                      <strong>معلومات شخصية</strong>: الاسم، البريد الإلكتروني، رقم الهاتف، 
                      وبيانات الاتصال الأخرى التي تقدمها لنا طواعية عند الاتصال بنا 
                      أو المشاركة في برامجنا.
                    </li>
                    <li className="mb-2">
                      <strong>معلومات الاستخدام</strong>: معلومات حول كيفية استخدامك لموقعنا الإلكتروني، 
                      مثل الصفحات التي تتصفحها، والوقت الذي تقضيه في كل صفحة، والروابط التي تنقر عليها.
                    </li>
                    <li className="mb-2">
                      <strong>معلومات تقنية</strong>: عنوان IP، نوع وإصدار المتصفح، 
                      إعدادات المنطقة الزمنية، أنواع وإصدارات المكونات الإضافية للمتصفح، نظام التشغيل والمنصة.
                    </li>
                  </ul>

                  <h2 className="text-2xl font-bold text-gray-800 mb-6">كيف نستخدم معلوماتك</h2>
                  <p className="mb-6">
                    نستخدم معلوماتك الشخصية للأغراض التالية:
                  </p>
                  <ul className="list-disc pr-8 mb-6">
                    <li className="mb-2">لتزويدك بالمعلومات أو المنتجات أو الخدمات التي تطلبها منا.</li>
                    <li className="mb-2">لإرسال نشرتنا الإخبارية إليك إذا كنت مشتركاً فيها.</li>
                    <li className="mb-2">لإعلامك بالتغييرات التي تطرأ على خدماتنا أو سياساتنا.</li>
                    <li className="mb-2">لإدارة مشاركتك في برامجنا وتدريباتنا وفعالياتنا.</li>
                    <li className="mb-2">لتحسين موقعنا الإلكتروني وخدماتنا.</li>
                    <li className="mb-2">للرد على أسئلتك أو طلباتك.</li>
                  </ul>

                  <h2 className="text-2xl font-bold text-gray-800 mb-6">الأساس القانوني للمعالجة</h2>
                  <p className="mb-6">
                    نقوم بمعالجة معلوماتك الشخصية على الأسس القانونية التالية:
                  </p>
                  <ul className="list-disc pr-8 mb-6">
                    <li className="mb-2">
                      <strong>الموافقة</strong>: عندما تقدم موافقتك الصريحة، على سبيل المثال عند الاشتراك في نشرتنا الإخبارية.
                    </li>
                    <li className="mb-2">
                      <strong>المصلحة المشروعة</strong>: عندما تكون المعالجة ضرورية لمصالحنا المشروعة أو مصالح طرف ثالث، 
                      ولا تتجاوز مصالحك وحقوقك الأساسية هذه المصالح.
                    </li>
                    <li className="mb-2">
                      <strong>تنفيذ عقد</strong>: عندما تكون المعالجة ضرورية لتنفيذ عقد أنت طرف فيه.
                    </li>
                    <li className="mb-2">
                      <strong>الالتزام القانوني</strong>: عندما تكون المعالجة ضرورية للامتثال لالتزام قانوني نخضع له.
                    </li>
                  </ul>

                  <h2 className="text-2xl font-bold text-gray-800 mb-6">مشاركة معلوماتك</h2>
                  <p className="mb-6">
                    نحن لا نبيع معلوماتك الشخصية لأطراف ثالثة. يمكننا مشاركة معلوماتك في الحالات التالية:
                  </p>
                  <ul className="list-disc pr-8 mb-6">
                    <li className="mb-2">مع مقدمي الخدمات الذين يساعدوننا في إدارة منظمتنا، مثل مزودي استضافة الويب.</li>
                    <li className="mb-2">مع شركاء نتعاون معهم في برامج محددة، بموافقتك المسبقة.</li>
                    <li className="mb-2">إذا كنا مطالبين بذلك بموجب القانون أو استجابة لطلب قانوني صالح.</li>
                  </ul>

                  <h2 className="text-2xl font-bold text-gray-800 mb-6">أمن البيانات</h2>
                  <p className="mb-6">
                    نتخذ تدابير أمنية مناسبة لحماية معلوماتك الشخصية من الفقدان أو الوصول غير المصرح به أو الإفصاح أو التغيير أو التدمير. 
                    ومع ذلك، لا توجد طريقة نقل عبر الإنترنت أو تخزين إلكتروني آمنة تماماً. لذلك، على الرغم من أننا نسعى جاهدين 
                    لحماية معلوماتك الشخصية، فإننا لا نستطيع ضمان أمنها المطلق.
                  </p>

                  <h2 className="text-2xl font-bold text-gray-800 mb-6">الاحتفاظ بالبيانات</h2>
                  <p className="mb-6">
                    نحتفظ بمعلوماتك الشخصية طالما كان ذلك ضرورياً لتحقيق الأغراض التي جمعناها من أجلها، 
                    بما في ذلك الوفاء بالمتطلبات القانونية أو المحاسبية أو متطلبات إعداد التقارير.
                  </p>

                  <h2 className="text-2xl font-bold text-gray-800 mb-6">حقوقك</h2>
                  <p className="mb-6">
                    لديك الحقوق التالية فيما يتعلق بمعلوماتك الشخصية:
                  </p>
                  <ul className="list-disc pr-8 mb-6">
                    <li className="mb-2">الحق في الوصول إلى معلوماتك الشخصية.</li>
                    <li className="mb-2">الحق في تصحيح المعلومات غير الدقيقة.</li>
                    <li className="mb-2">الحق في محو معلوماتك الشخصية.</li>
                    <li className="mb-2">الحق في تقييد معالجة معلوماتك الشخصية.</li>
                    <li className="mb-2">الحق في نقل البيانات.</li>
                    <li className="mb-2">الحق في الاعتراض على معالجة معلوماتك الشخصية.</li>
                    <li className="mb-2">الحق في سحب موافقتك في أي وقت.</li>
                  </ul>
                  <p className="mb-6">
                    لممارسة هذه الحقوق، يرجى الاتصال بنا على عنوان البريد الإلكتروني info@fpra-droits.org.
                  </p>

                  <h2 className="text-2xl font-bold text-gray-800 mb-6">ملفات تعريف الارتباط والتقنيات المماثلة</h2>
                  <p className="mb-6">
                    يستخدم موقعنا الإلكتروني ملفات تعريف الارتباط والتقنيات المماثلة لتحسين تجربتك، 
                    وتحليل حركة المرور على الموقع وتخصيص المحتوى. يمكنك التحكم في استخدام ملفات تعريف الارتباط 
                    على مستوى المتصفح الخاص بك. ومع ذلك، قد يؤثر تعطيل ملفات تعريف الارتباط 
                    على بعض وظائف موقعنا.
                  </p>

                  <h2 className="text-2xl font-bold text-gray-800 mb-6">الروابط إلى مواقع أخرى</h2>
                  <p className="mb-6">
                    قد يحتوي موقعنا الإلكتروني على روابط إلى مواقع إلكترونية تابعة لجهات خارجية. نحن لسنا مسؤولين 
                    عن سياسات الخصوصية أو محتوى هذه المواقع. نشجعك على قراءة 
                    سياسات الخصوصية لكل موقع تزوره.
                  </p>

                  <h2 className="text-2xl font-bold text-gray-800 mb-6">تعديلات سياسة الخصوصية الخاصة بنا</h2>
                  <p className="mb-6">
                    يمكننا تحديث سياسة الخصوصية هذه من وقت لآخر. سيتم نشر أي تغييرات 
                    على هذه الصفحة، وإذا كانت التغييرات جوهرية، فسنقوم بإعلامك 
                    عبر البريد الإلكتروني أو من خلال إشعار على موقعنا الإلكتروني.
                  </p>

                  <h2 className="text-2xl font-bold text-gray-800 mb-6">الاتصال</h2>
                  <p className="mb-6">
                    إذا كانت لديك أسئلة حول سياسة الخصوصية هذه أو ترغب في ممارسة حقوقك، 
                    فيرجى الاتصال بنا على العنوان التالي:
                  </p>
                  <p className="mb-6">
                    المؤسسة من أجل ترقية الحقوق<br />
                    العنوان: الجزائر العاصمة، الجزائر<br />
                    البريد الإلكتروني: info@fpra-droits.org<br />
                    الهاتف: 00213 560 66 71 20
                  </p>

                  <p className="text-sm text-gray-600 mt-12">
                    آخر تحديث: {new Date().toLocaleDateString('ar-DZ')}
                  </p>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Newsletter */}
      <Newsletter />
    </div>
  );
} 