-- Pages table
CREATE TABLE pages (
  id TEXT PRIMARY KEY,
  title_fr TEXT NOT NULL,
  title_ar TEXT NOT NULL,
  created_at INTEGER NOT NULL DEFAULT (strftime('%s', 'now')),
  updated_at INTEGER NOT NULL DEFAULT (strftime('%s', 'now'))
);

-- Sections table
CREATE TABLE sections (
  id TEXT NOT NULL,
  page_id TEXT NOT NULL,
  title_fr TEXT NOT NULL,
  title_ar TEXT NOT NULL,
  content_fr TEXT,
  content_ar TEXT,
  order_index INTEGER NOT NULL DEFAULT 0,
  image TEXT,
  metadata TEXT,
  created_at INTEGER NOT NULL DEFAULT (strftime('%s', 'now')),
  updated_at INTEGER NOT NULL DEFAULT (strftime('%s', 'now')),
  PRIMARY KEY (id, page_id),
  FOREIGN KEY (page_id) REFERENCES pages (id) ON DELETE CASCADE
);

-- News table
CREATE TABLE news (
  id TEXT PRIMARY KEY,
  title_fr TEXT NOT NULL,
  title_ar TEXT NOT NULL,
  summary_fr TEXT,
  summary_ar TEXT,
  content_fr TEXT,
  content_ar TEXT,
  slug_fr TEXT UNIQUE,
  slug_ar TEXT UNIQUE,
  date TEXT NOT NULL,
  category TEXT,
  author TEXT,
  image TEXT,
  tags TEXT,
  created_at INTEGER NOT NULL DEFAULT (strftime('%s', 'now')),
  updated_at INTEGER NOT NULL DEFAULT (strftime('%s', 'now'))
);

-- Resources table
CREATE TABLE resources (
  id TEXT PRIMARY KEY,
  title_fr TEXT NOT NULL,
  title_ar TEXT NOT NULL,
  summary_fr TEXT,
  summary_ar TEXT,
  content_fr TEXT,
  content_ar TEXT,
  slug_fr TEXT UNIQUE,
  slug_ar TEXT UNIQUE,
  date TEXT NOT NULL,
  category TEXT,
  file_url TEXT,
  image TEXT,
  tags TEXT,
  created_at INTEGER NOT NULL DEFAULT (strftime('%s', 'now')),
  updated_at INTEGER NOT NULL DEFAULT (strftime('%s', 'now'))
);

-- Initial data for pages
INSERT INTO pages (id, title_fr, title_ar) VALUES
('home', 'Page d''accueil', 'الصفحة الرئيسية'),
('about', 'À propos', 'من نحن'),
('contact', 'Contact', 'اتصل بنا'),
('news', 'Actualités', 'أخبار'),
('programs', 'Programmes', 'برامج');

-- Initial sections for home page
INSERT INTO sections (id, page_id, title_fr, title_ar, content_fr, content_ar, order_index) VALUES
('hero', 'home', 'Bannière principale', 'البانر الرئيسي', 'Fondation pour la Promotion des Droits', 'المؤسسة من اجل ترقية الحقوق', 0),
('mission', 'home', 'Notre mission', 'مهمتنا', 'Notre mission est de promouvoir et défendre les droits par la sensibilisation, la formation, la documentation des violations et le soutien aux acteurs de la société civile.', 'مهمتنا هي تعزيز والدفاع عن الحقوق من خلال التوعية والتدريب وتوثيق الانتهاكات ودعم الفاعلين في المجتمع المدني.', 1);

-- Initial sections for about page
INSERT INTO sections (id, page_id, title_fr, title_ar, content_fr, content_ar, order_index) VALUES
('about_main', 'about', 'À propos de nous', 'من نحن', 'Notre fondation œuvre pour la protection et la promotion des droits fondamentaux.', 'تعمل مؤسستنا على حماية وتعزيز الحقوق الأساسية.', 0);

-- Initial news
INSERT INTO news (id, title_fr, title_ar, summary_fr, summary_ar, content_fr, content_ar, slug_fr, slug_ar, date, category) VALUES
('news1', 'Lancement de notre nouveau site web', 'إطلاق موقعنا الإلكتروني الجديد', 'Nous sommes ravis de vous présenter notre nouveau site web.', 'يسعدنا أن نقدم لكم موقعنا الإلكتروني الجديد.', 'Notre nouveau site web est en ligne, offrant un accès facile à nos ressources et informations.', 'موقعنا الإلكتروني الجديد متاح الآن، مما يوفر وصولاً سهلاً إلى مواردنا ومعلوماتنا.', 'lancement-nouveau-site', 'إطلاق-موقع-جديد', '2023-05-15', 'announcement'); 