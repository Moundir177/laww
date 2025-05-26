'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import PageHeader from '@/components/PageHeader';
import Newsletter from '@/components/Newsletter';
import { motion } from 'framer-motion';

export default function TermsOfUsePage() {
  const { language } = useLanguage();
  
  // Get text aligned correctly based on language
  const textAlign = language === 'ar' ? 'text-right' : 'text-left';
  const dir = language === 'ar' ? 'rtl' : 'ltr';
  
  // Get page title based on language
  const pageTitle = language === 'fr' 
    ? 'Conditions d\'Utilisation' 
    : 'شروط الاستخدام';
  
  // Get page subtitle based on language
  const pageSubtitle = language === 'fr'
    ? 'Les règles régissant l\'utilisation de notre site web et de nos services.'
    : 'القواعد التي تحكم استخدام موقعنا الإلكتروني وخدماتنا.';

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
              {language === 'fr' ? 'Conditions d\'Utilisation' : 'شروط الاستخدام'}
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
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Acceptation des conditions</h2>
                  <p className="mb-6">
                    En accédant et en utilisant le site web de la Fondation pour la Promotion des Droits, 
                    vous acceptez d'être lié par ces Conditions d'Utilisation, toutes les lois et réglementations applicables, 
                    et vous acceptez que vous êtes responsable du respect de toutes les lois locales applicables. 
                    Si vous n'acceptez pas l'une de ces conditions, vous n'êtes pas autorisé à utiliser ou à accéder à ce site.
                  </p>

                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Utilisation de la licence</h2>
                  <p className="mb-6">
                    L'autorisation est accordée de télécharger temporairement une copie des documents (informations ou logiciels) 
                    sur le site web de la Fondation pour la Promotion des Droits pour une visualisation transitoire personnelle et non commerciale uniquement. 
                    Il s'agit de l'octroi d'une licence, et non d'un transfert de titre, et sous cette licence, vous ne pouvez pas :
                  </p>
                  <ul className="list-disc pl-8 mb-6">
                    <li className="mb-2">Modifier ou copier les documents;</li>
                    <li className="mb-2">Utiliser les documents à des fins commerciales ou pour toute présentation publique (commerciale ou non commerciale);</li>
                    <li className="mb-2">Tenter de décompiler ou de faire de l'ingénierie inverse de tout logiciel contenu sur le site web de la Fondation;</li>
                    <li className="mb-2">Supprimer tout droit d'auteur ou autres notations de propriété des documents; ou</li>
                    <li className="mb-2">Transférer les documents à une autre personne ou "miroir" des documents sur un autre serveur.</li>
                  </ul>
                  <p className="mb-6">
                    Cette licence sera automatiquement résiliée si vous violez l'une de ces restrictions et peut être résiliée par la Fondation à tout moment. 
                    À la fin de votre consultation de ces documents ou à la résiliation de cette licence, vous devez détruire 
                    tout matériel téléchargé en votre possession, qu'il soit au format électronique ou imprimé.
                  </p>

                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Avis de non-responsabilité</h2>
                  <p className="mb-6">
                    Les documents sur le site web de la Fondation sont fournis "tels quels". La Fondation ne donne aucune garantie, 
                    expresse ou implicite, et décline et annule par la présente toutes les autres garanties, y compris, sans limitation, 
                    les garanties ou conditions implicites de qualité marchande, d'adéquation à un usage particulier, ou de non-violation 
                    de la propriété intellectuelle ou d'autres violations des droits.
                  </p>
                  <p className="mb-6">
                    En outre, la Fondation ne garantit ni ne fait aucune représentation concernant l'exactitude, les résultats probables, 
                    ou la fiabilité de l'utilisation des matériaux sur son site Internet ou autrement liés à ces matériaux ou sur tout 
                    site lié à ce site.
                  </p>

                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Limitations</h2>
                  <p className="mb-6">
                    En aucun cas, la Fondation ou ses fournisseurs ne seront responsables des dommages (y compris, sans limitation, 
                    les dommages pour perte de données ou de profit, ou en raison d'une interruption d'activité) découlant de l'utilisation 
                    ou de l'impossibilité d'utiliser les matériaux sur le site Internet de la Fondation, même si la Fondation ou un 
                    représentant autorisé de la Fondation a été notifié oralement ou par écrit de la possibilité de tels dommages. 
                    Comme certaines juridictions n'autorisent pas les limitations sur les garanties implicites, ou les limitations 
                    de responsabilité pour les dommages consécutifs ou accessoires, ces limitations peuvent ne pas s'appliquer à vous.
                  </p>

                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Révisions et errata</h2>
                  <p className="mb-6">
                    Les documents apparaissant sur le site web de la Fondation pourraient inclure des erreurs techniques, typographiques 
                    ou photographiques. La Fondation ne garantit pas que l'un des documents sur son site web est exact, complet ou à jour. 
                    La Fondation peut apporter des modifications aux documents contenus sur son site web à tout moment sans préavis. 
                    La Fondation ne s'engage toutefois pas à mettre à jour les documents.
                  </p>

                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Liens</h2>
                  <p className="mb-6">
                    La Fondation n'a pas examiné tous les sites liés à son site Internet et n'est pas responsable du contenu de ces sites liés. 
                    L'inclusion de tout lien n'implique pas l'approbation par la Fondation du site. L'utilisation de tout site web lié 
                    est aux risques et périls de l'utilisateur.
                  </p>

                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Modifications des conditions d'utilisation du site</h2>
                  <p className="mb-6">
                    La Fondation peut réviser ces conditions d'utilisation de son site web à tout moment sans préavis. 
                    En utilisant ce site web, vous acceptez d'être lié par la version alors en vigueur de ces conditions d'utilisation.
                  </p>

                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Loi applicable</h2>
                  <p className="mb-6">
                    Toute réclamation relative au site web de la Fondation sera régie par les lois algériennes sans égard 
                    à ses dispositions en matière de conflit de lois.
                  </p>

                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Contact</h2>
                  <p className="mb-6">
                    Si vous avez des questions concernant ces conditions d'utilisation, veuillez nous contacter à l'adresse suivante :
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
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">قبول الشروط</h2>
                  <p className="mb-6">
                    من خلال الوصول إلى موقع المؤسسة من أجل ترقية الحقوق واستخدامه،
                    فإنك توافق على الالتزام بهذه الشروط والأحكام، وجميع القوانين واللوائح المعمول بها،
                    وتوافق على أنك مسؤول عن الامتثال لأي قوانين محلية سارية.
                    إذا كنت لا توافق على أي من هذه الشروط، فلا يُسمح لك باستخدام هذا الموقع أو الوصول إليه.
                  </p>

                  <h2 className="text-2xl font-bold text-gray-800 mb-6">استخدام الترخيص</h2>
                  <p className="mb-6">
                    يُمنح الإذن بتنزيل نسخة مؤقتة من المواد (المعلومات أو البرامج)
                    على موقع المؤسسة من أجل ترقية الحقوق للعرض العابر الشخصي وغير التجاري فقط.
                    هذا منح ترخيص، وليس نقلًا للملكية، وبموجب هذا الترخيص، لا يجوز لك:
                  </p>
                  <ul className="list-disc pr-8 mb-6">
                    <li className="mb-2">تعديل المواد أو نسخها؛</li>
                    <li className="mb-2">استخدام المواد لأي غرض تجاري أو لأي عرض عام (تجاري أو غير تجاري)؛</li>
                    <li className="mb-2">محاولة فك تشفير أو إجراء هندسة عكسية لأي برامج موجودة على موقع المؤسسة؛</li>
                    <li className="mb-2">إزالة أي حقوق نشر أو علامات ملكية أخرى من المواد؛ أو</li>
                    <li className="mb-2">نقل المواد إلى شخص آخر أو "نسخ" المواد على خادم آخر.</li>
                  </ul>
                  <p className="mb-6">
                    سيتم إنهاء هذا الترخيص تلقائيًا إذا انتهكت أيًا من هذه القيود ويمكن إنهاؤه من قبل المؤسسة في أي وقت.
                    عند الانتهاء من مشاهدة هذه المواد أو عند إنهاء هذا الترخيص، يجب عليك إتلاف
                    أي مواد تم تنزيلها في حوزتك، سواء كانت بتنسيق إلكتروني أو مطبوع.
                  </p>

                  <h2 className="text-2xl font-bold text-gray-800 mb-6">إخلاء المسؤولية</h2>
                  <p className="mb-6">
                    المواد الموجودة على موقع المؤسسة مقدمة "كما هي". لا تقدم المؤسسة أي ضمانات،
                    صريحة أو ضمنية، وتتنصل بموجب هذا وتلغي جميع الضمانات الأخرى، بما في ذلك، على سبيل المثال لا الحصر،
                    الضمانات أو الشروط الضمنية للتسويق، أو الملاءمة لغرض معين، أو عدم انتهاك
                    الملكية الفكرية أو الانتهاكات الأخرى للحقوق.
                  </p>
                  <p className="mb-6">
                    علاوة على ذلك، لا تضمن المؤسسة أو تقدم أي إقرارات بشأن دقة النتائج المحتملة
                    أو موثوقية استخدام المواد على موقعها على الإنترنت أو فيما يتعلق بهذه المواد أو على أي
                    موقع مرتبط بهذا الموقع.
                  </p>

                  <h2 className="text-2xl font-bold text-gray-800 mb-6">القيود</h2>
                  <p className="mb-6">
                    لن تكون المؤسسة أو مورديها مسؤولين بأي حال من الأحوال عن الأضرار (بما في ذلك، على سبيل المثال لا الحصر،
                    الأضرار الناجمة عن فقدان البيانات أو الأرباح، أو بسبب انقطاع الأعمال) الناشئة عن استخدام
                    أو عدم القدرة على استخدام المواد الموجودة على موقع المؤسسة على الإنترنت، حتى لو تم إخطار المؤسسة أو ممثل
                    مفوض من المؤسسة شفهيًا أو كتابيًا بإمكانية حدوث مثل هذه الأضرار.
                    ونظرًا لأن بعض الولايات القضائية لا تسمح بفرض قيود على الضمانات الضمنية، أو القيود
                    المفروضة على المسؤولية عن الأضرار التبعية أو العرضية، فقد لا تنطبق عليك هذه القيود.
                  </p>

                  <h2 className="text-2xl font-bold text-gray-800 mb-6">المراجعات والأخطاء</h2>
                  <p className="mb-6">
                    قد تتضمن المواد التي تظهر على موقع المؤسسة أخطاءً فنية أو مطبعية
                    أو تصويرية. لا تضمن المؤسسة أن أيًا من المواد الموجودة على موقعها دقيقة أو كاملة أو حديثة.
                    قد تقوم المؤسسة بإجراء تغييرات على المواد الموجودة على موقعها في أي وقت دون إشعار.
                    ومع ذلك، لا تتعهد المؤسسة بتحديث المواد.
                  </p>

                  <h2 className="text-2xl font-bold text-gray-800 mb-6">الروابط</h2>
                  <p className="mb-6">
                    لم تراجع المؤسسة جميع المواقع المرتبطة بموقعها على الإنترنت وليست مسؤولة عن محتوى أي موقع مرتبط.
                    إدراج أي رابط لا يعني موافقة المؤسسة على الموقع. استخدام أي موقع إلكتروني مرتبط
                    يكون على مسؤولية المستخدم الخاصة.
                  </p>

                  <h2 className="text-2xl font-bold text-gray-800 mb-6">التعديلات على شروط استخدام الموقع</h2>
                  <p className="mb-6">
                    يجوز للمؤسسة مراجعة شروط استخدام موقعها على الإنترنت في أي وقت دون إشعار.
                    باستخدام هذا الموقع الإلكتروني، فإنك توافق على الالتزام بالنسخة الحالية من شروط الاستخدام هذه.
                  </p>

                  <h2 className="text-2xl font-bold text-gray-800 mb-6">القانون المطبق</h2>
                  <p className="mb-6">
                    ستخضع أي مطالبة تتعلق بموقع المؤسسة للقوانين الجزائرية دون اعتبار
                    لأحكامها المتعلقة بتعارض القوانين.
                  </p>

                  <h2 className="text-2xl font-bold text-gray-800 mb-6">الاتصال</h2>
                  <p className="mb-6">
                    إذا كانت لديك أي أسئلة حول شروط الاستخدام هذه، يرجى الاتصال بنا على العنوان التالي:
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