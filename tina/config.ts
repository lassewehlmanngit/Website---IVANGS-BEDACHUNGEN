import { defineConfig } from 'tinacms';

const branch =
  process.env.GITHUB_BRANCH ||
  process.env.RENDER_GIT_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  'main';

const clientId = 
  process.env.TINA_PUBLIC_CLIENT_ID || 
  process.env.VITE_TINA_PUBLIC_CLIENT_ID || 
  process.env.VITE_TINA_CLIENT_ID || 
  null;
const token = 
  process.env.TINA_TOKEN || 
  process.env.VITE_TINA_TOKEN || 
  null;

export default defineConfig({
  branch,
  clientId,
  token,
  build: {
    outputFolder: 'admin',
    publicFolder: 'public',
  },
  media: {
    tina: {
      publicFolder: 'public',
      mediaRoot: 'uploads',
    },
  },
  schema: {
    collections: [
      // Home Page Collection (Single Document)
      {
        name: 'homePage',
        label: '🏠 Startseite',
        path: 'content/home',
        format: 'json',
        ui: {
          router: () => '/de',
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        fields: [
          // 1. SEO Section
          {
            type: 'object',
            name: 'seo',
            label: '🔍 SEO Einstellungen',
            fields: [
              { type: 'string', name: 'title', label: 'Seitentitel', required: true },
              { type: 'string', name: 'description', label: 'Meta Beschreibung', ui: { component: 'textarea' } },
            ],
          },
          // 2. Hero Section
          {
            type: 'object',
            name: 'hero',
            label: '✨ Hero Bereich',
            fields: [
              { type: 'string', name: 'eyebrow', label: 'Überschrift Klein' },
              { type: 'string', name: 'title', label: 'Haupttitel', required: true },
              { type: 'string', name: 'subtitle', label: 'Untertitel' },
              { type: 'string', name: 'description', label: 'Beschreibung', ui: { component: 'textarea' } },
              // Grouped buttons for cleaner form
              {
                type: 'object',
                name: 'buttons',
                label: 'Buttons',
                fields: [
                  { type: 'string', name: 'primaryText', label: 'Hauptbutton Text' },
                  { type: 'string', name: 'primaryLink', label: 'Hauptbutton Link', description: 'z.B. /de/contact, https://..., tel:02162..., mailto:..., #section' },
                  { type: 'string', name: 'secondaryText', label: 'Zweitbutton Text' },
                  { type: 'string', name: 'secondaryLink', label: 'Zweitbutton Link', description: 'z.B. /de/career, https://..., tel:..., mailto:..., #section' },
                ],
              },
              { type: 'image', name: 'backgroundImage', label: 'Hintergrundbild' },
              { type: 'string', name: 'videoUrl', label: 'Video URL' },
              { type: 'boolean', name: 'showQuickForm', label: 'Schnellkontakt anzeigen' },
            ],
          },
          // 3. Stats Section (with itemProps for smart labels)
          {
            type: 'object',
            list: true,
            name: 'stats',
            label: '📊 Statistiken',
            ui: {
              max: 6,
              itemProps: (item) => {
                return { label: item?.label || 'Neue Statistik' };
              },
            },
            fields: [
              { type: 'string', name: 'value', label: 'Wert (z.B. 25+)', required: true },
              { type: 'string', name: 'label', label: 'Beschriftung', required: true },
              { type: 'string', name: 'icon', label: 'Icon Name (Lucide)' },
            ],
          },
          // 4. Services Section (grouped header)
          {
            type: 'object',
            name: 'servicesSection',
            label: '🔧 Leistungen (Header)',
            fields: [
              { type: 'string', name: 'eyebrow', label: 'Überschrift Klein' },
              { type: 'string', name: 'title', label: 'Titel' },
              { type: 'string', name: 'description', label: 'Beschreibung', ui: { component: 'textarea' } },
            ],
          },
          // 5. CEO Quote
          {
            type: 'object',
            name: 'ceoQuote',
            label: '💬 Geschäftsführer Zitat',
            fields: [
              { type: 'string', name: 'eyebrow', label: 'Überschrift Klein' },
              { type: 'string', name: 'name', label: 'Name', required: true },
              { type: 'string', name: 'role', label: 'Position', required: true },
              { type: 'string', name: 'quote', label: 'Zitat', ui: { component: 'textarea' }, required: true },
              { type: 'string', name: 'text', label: 'Fließtext', ui: { component: 'textarea' } },
              { type: 'image', name: 'image', label: 'Bild' },
              { type: 'string', name: 'buttonText', label: 'Button Text' },
              { type: 'string', name: 'buttonLink', label: 'Button Link', description: 'z.B. /de/about' },
            ],
          },
          // 6. Projects Section (grouped header + list with itemProps)
          {
            type: 'object',
            name: 'projectsSection',
            label: '🏗️ Projekte Showcase',
            fields: [
              { type: 'string', name: 'eyebrow', label: 'Überschrift Klein' },
              { type: 'string', name: 'title', label: 'Titel' },
              {
                type: 'object',
                list: true,
                name: 'items',
                label: 'Projekt Liste',
                ui: {
                  max: 6,
                  itemProps: (item) => ({ label: item?.title || 'Neues Projekt' }),
                },
                fields: [
                  { type: 'string', name: 'title', label: 'Projekt Titel', required: true },
                  { type: 'string', name: 'description', label: 'Beschreibung' },
                  { type: 'image', name: 'image', label: 'Bild', required: true },
                ],
              },
            ],
          },
          // 7. Trust Indicators (with itemProps)
          {
            type: 'object',
            name: 'trustIndicators',
            label: '🤝 Vertrauensindikatoren',
            fields: [
              { type: 'string', name: 'eyebrow', label: 'Überschrift Klein' },
              { type: 'string', name: 'title', label: 'Titel', required: true },
              { type: 'string', name: 'description', label: 'Beschreibung', ui: { component: 'textarea' } },
              { type: 'image', name: 'image', label: 'Bild' },
              {
                type: 'object',
                list: true,
                name: 'items',
                label: 'Punkte',
                ui: {
                  max: 4,
                  itemProps: (item) => ({ label: item?.title || 'Neuer Punkt' }),
                },
                fields: [
                  { type: 'string', name: 'title', label: 'Titel', required: true },
                  { type: 'string', name: 'description', label: 'Beschreibung' },
                  { type: 'string', name: 'icon', label: 'Icon (Lucide)' },
                ],
              },
            ],
          },
          // 8. FAQ Section (grouped header + questions list + CTA)
          {
            type: 'object',
            name: 'faqSection',
            label: '❓ FAQ Bereich',
            fields: [
              { type: 'string', name: 'title', label: 'Titel' },
              { type: 'string', name: 'description', label: 'Beschreibung' },
              {
                type: 'object',
                list: true,
                name: 'questions',
                label: 'Fragen & Antworten',
                ui: {
                  max: 10,
                  itemProps: (item) => ({ label: item?.question || 'Neue Frage' }),
                },
                fields: [
                  { type: 'string', name: 'question', label: 'Frage', required: true },
                  { type: 'string', name: 'answer', label: 'Antwort', ui: { component: 'textarea' }, required: true },
                ],
              },
              {
                type: 'object',
                name: 'cta',
                label: 'FAQ Call-to-Action',
                fields: [
                  { type: 'string', name: 'title', label: 'Titel' },
                  { type: 'string', name: 'description', label: 'Text' },
                  { type: 'string', name: 'phone', label: 'Telefon' },
                  { type: 'string', name: 'buttonText', label: 'Button Text' },
                  { type: 'string', name: 'buttonLink', label: 'Button Link', description: 'z.B. /de/contact' },
                ],
              },
            ],
          },
          // 9. Final CTA
          {
            type: 'object',
            name: 'finalCTA',
            label: '📣 Abschluss CTA',
            fields: [
              { type: 'string', name: 'title', label: 'Titel', required: true },
              { type: 'string', name: 'description', label: 'Beschreibung', ui: { component: 'textarea' } },
              { type: 'string', name: 'buttonText', label: 'Button Text' },
              { type: 'string', name: 'buttonLink', label: 'Button Link', description: 'z.B. /de/contact' },
            ],
          },
        ],
      },
      
      // Team Members Collection
      {
        name: 'teamMember',
        label: '👥 Team Mitglieder',
        path: 'content/team',
        format: 'md',
        ui: {
          router: ({ document }) => {
            return `/de/about#team-${document._sys.filename}`;
          },
        },
        fields: [
          { type: 'string', name: 'name', label: 'Name', required: true, isTitle: true },
          { type: 'string', name: 'role', label: 'Position', required: true },
          { type: 'string', name: 'email', label: 'E-Mail' },
          {
            type: 'string',
            name: 'category',
            label: 'Kategorie',
            required: true,
            options: ['leadership', 'office', 'craftsmen'],
          },
          { type: 'string', name: 'description', label: 'Beschreibung', ui: { component: 'textarea' } },
          { type: 'image', name: 'image', label: 'Foto' },
          { type: 'number', name: 'order', label: 'Reihenfolge' },
        ],
      },
      
      // Services Collection
      {
        name: 'service',
        label: '🔧 Leistungen',
        path: 'content/services',
        format: 'md',
        ui: {
          router: ({ document }) => {
            return `/de/services/${document._sys.filename}`;
          },
        },
        fields: [
          { type: 'string', name: 'title', label: 'Titel', required: true, isTitle: true },
          { type: 'string', name: 'subtitle', label: 'Untertitel' },
          { type: 'string', name: 'shortDescription', label: 'Kurzbeschreibung', ui: { component: 'textarea' } },
          { type: 'string', name: 'intro', label: 'Einführungstext', ui: { component: 'textarea' } },
          { type: 'rich-text', name: 'body', label: 'Beschreibung (Lang)' },
          { type: 'image', name: 'image', label: 'Hauptbild' },
          { type: 'image', name: 'heroImage', label: 'Hero Bild' },
          { type: 'string', name: 'icon', label: 'Icon Name (Lucide)' },
          { type: 'string', name: 'expertTip', label: 'Experten-Tipp', ui: { component: 'textarea' } },
          {
            type: 'string',
            list: true,
            name: 'features',
            label: 'Merkmale',
          },
          {
            type: 'string',
            list: true,
            name: 'benefits',
            label: 'Vorteile',
          },
          {
            type: 'object',
            list: true,
            name: 'sections',
            label: 'Detailsektionen',
            ui: { max: 6 },
            fields: [
              { type: 'string', name: 'title', label: 'Titel', required: true },
              { type: 'string', name: 'icon', label: 'Icon (Lucide)' },
              { type: 'string', name: 'content', label: 'Inhalt', ui: { component: 'textarea' } },
            ],
          },
          {
            type: 'object',
            list: true,
            name: 'processSteps',
            label: 'Prozessschritte',
            ui: { max: 8 },
            fields: [
              { type: 'number', name: 'step', label: 'Schritt Nr.' },
              { type: 'string', name: 'title', label: 'Titel' },
              { type: 'string', name: 'text', label: 'Beschreibung' },
            ],
          },
          {
            type: 'string',
            list: true,
            name: 'referenceImages',
            label: 'Projektbilder (URLs)',
          },
          {
            type: 'string',
            list: true,
            name: 'contactIds',
            label: 'Ansprechpartner IDs',
          },
          {
            type: 'object',
            list: true,
            name: 'faq',
            label: 'FAQ',
            ui: { max: 8 },
            fields: [
              { type: 'string', name: 'question', label: 'Frage', required: true },
              { type: 'string', name: 'answer', label: 'Antwort', ui: { component: 'textarea' }, required: true },
            ],
          },
          {
            type: 'object',
            list: true,
            name: 'gallery',
            label: 'Galerie',
            ui: { max: 12 },
            fields: [
              { type: 'image', name: 'image', label: 'Bild' },
              { type: 'string', name: 'caption', label: 'Bildunterschrift' },
            ],
          },
          {
            type: 'object',
            name: 'uiText',
            label: 'UI Texte',
            fields: [
              { type: 'string', name: 'introHeader', label: 'Intro Überschrift', required: true },
              { type: 'string', name: 'contactButtonText', label: 'Kontakt Button Text' },
              { type: 'string', name: 'careerCtaTitle', label: 'Karriere CTA Titel' },
              { type: 'string', name: 'careerCtaDescription', label: 'Karriere CTA Beschreibung' },
              { type: 'string', name: 'careerCtaButtonText', label: 'Karriere CTA Button Text' },
            ],
          },
        ],
      },
      
      // Jobs Collection
      {
        name: 'job',
        label: '📋 Stellenangebote',
        path: 'content/jobs',
        format: 'md',
        ui: {
          router: ({ document }) => {
            return `/de/career#${document._sys.filename}`;
          },
        },
        fields: [
          { type: 'string', name: 'title', label: 'Titel', required: true, isTitle: true },
          { type: 'string', name: 'location', label: 'Standort', required: true },
          {
            type: 'string',
            name: 'type',
            label: 'Typ',
            required: true,
            options: ['Vollzeit', 'Teilzeit', 'Ausbildung'],
          },
          { type: 'string', name: 'shortDesc', label: 'Kurzbeschreibung', ui: { component: 'textarea' } },
          {
            type: 'string',
            list: true,
            name: 'tasks',
            label: 'Aufgaben',
          },
          {
            type: 'string',
            list: true,
            name: 'profile',
            label: 'Ihr Profil',
          },
          {
            type: 'string',
            list: true,
            name: 'benefits',
            label: 'Wir bieten',
          },
          { type: 'boolean', name: 'published', label: 'Veröffentlicht' },
        ],
      },
      
      // About Page Collection (Single Document)
      {
        name: 'aboutPage',
        label: '📄 Über Uns',
        path: 'content/about',
        format: 'json',
        ui: {
          router: () => '/de/about',
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        fields: [
          {
            type: 'object',
            name: 'seo',
            label: 'SEO',
            fields: [
              { type: 'string', name: 'title', label: 'Seitentitel', required: true },
              { type: 'string', name: 'description', label: 'Beschreibung', ui: { component: 'textarea' } },
            ],
          },
          {
            type: 'object',
            name: 'hero',
            label: 'Hero Bereich',
            fields: [
              { type: 'string', name: 'eyebrow', label: 'Überschrift Klein' },
              { type: 'string', name: 'title', label: 'Titel', required: true },
              { type: 'string', name: 'description', label: 'Beschreibung', ui: { component: 'textarea' } },
            ],
          },
          {
            type: 'object',
            name: 'story',
            label: 'Unternehmensgeschichte',
            fields: [
              { type: 'string', name: 'title', label: 'Titel', required: true },
              { type: 'string', name: 'text1', label: 'Absatz 1', ui: { component: 'textarea' } },
              { type: 'string', name: 'text2', label: 'Absatz 2', ui: { component: 'textarea' } },
              { type: 'image', name: 'image', label: 'Bild' },
            ],
          },
          {
            type: 'object',
            list: true,
            name: 'values',
            label: 'Werte',
            fields: [
              { type: 'string', name: 'text', label: 'Text', required: true },
            ],
          },
          {
            type: 'object',
            name: 'equipment',
            label: 'Ausstattung',
            fields: [
              { type: 'string', name: 'title', label: 'Titel', required: true },
              { type: 'string', name: 'description', label: 'Beschreibung', ui: { component: 'textarea' } },
            ],
          },
          {
            type: 'object',
            name: 'teamSection',
            label: 'Team Bereich',
            fields: [
              { type: 'string', name: 'title', label: 'Titel', required: true },
              { type: 'string', name: 'description', label: 'Beschreibung', ui: { component: 'textarea' } },
            ],
          },
          {
            type: 'object',
            name: 'cta',
            label: 'Abschluss CTA',
            fields: [
              { type: 'string', name: 'title', label: 'Titel', required: true },
              { type: 'string', name: 'description', label: 'Beschreibung', ui: { component: 'textarea' } },
              { type: 'string', name: 'buttonText', label: 'Button Text' },
              { type: 'string', name: 'email', label: 'E-Mail' },
            ],
          },
        ],
      },
      
      // Career Page Collection (Single Document)
      {
        name: 'careerPage',
        label: '💼 Karriere',
        path: 'content/career',
        format: 'json',
        ui: {
          router: () => '/de/career',
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        fields: [
          {
            type: 'object',
            name: 'seo',
            label: 'SEO',
            fields: [
              { type: 'string', name: 'title', label: 'Seitentitel', required: true },
              { type: 'string', name: 'description', label: 'Beschreibung', ui: { component: 'textarea' } },
            ],
          },
          {
            type: 'object',
            name: 'hero',
            label: 'Hero Bereich',
            fields: [
              { type: 'string', name: 'eyebrow', label: 'Überschrift Klein' },
              { type: 'string', name: 'title', label: 'Titel', required: true },
              { type: 'string', name: 'description', label: 'Beschreibung' },
              { type: 'image', name: 'backgroundImage', label: 'Hintergrundbild' },
            ],
          },
          {
            type: 'object',
            name: 'jobsSection',
            label: 'Stellenangebote Bereich',
            fields: [
              { type: 'string', name: 'title', label: 'Titel', required: true },
              { type: 'string', name: 'emptyMessage', label: 'Keine Stellen Text' },
            ],
          },
          {
            type: 'object',
            name: 'wizardSection',
            label: 'Karriere Finder',
            fields: [
              { type: 'string', name: 'title', label: 'Titel', required: true },
              { type: 'string', name: 'description', label: 'Beschreibung' },
            ],
          },
        ],
      },
      
      // Contact Page Collection (Single Document)
      {
        name: 'contactPage',
        label: '📞 Kontakt',
        path: 'content/contact',
        format: 'json',
        ui: {
          router: () => '/de/contact',
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        fields: [
          {
            type: 'object',
            name: 'seo',
            label: 'SEO',
            fields: [
              { type: 'string', name: 'title', label: 'Seitentitel', required: true },
              { type: 'string', name: 'description', label: 'Beschreibung', ui: { component: 'textarea' } },
            ],
          },
          { type: 'string', name: 'title', label: 'Titel', required: true },
          { type: 'string', name: 'description', label: 'Beschreibung', ui: { component: 'textarea' } },
          {
            type: 'object',
            name: 'address',
            label: 'Adresse',
            fields: [
              { type: 'string', name: 'company', label: 'Firmenname', required: true },
              { type: 'string', name: 'street', label: 'Straße', required: true },
              { type: 'string', name: 'city', label: 'Stadt', required: true },
              { type: 'string', name: 'zip', label: 'PLZ', required: true },
            ],
          },
          { type: 'string', name: 'phone', label: 'Telefon', required: true },
          { type: 'string', name: 'fax', label: 'Fax' },
          { type: 'string', name: 'email', label: 'E-Mail', required: true },
          { type: 'string', name: 'website', label: 'Website' },
          { type: 'string', name: 'facebook', label: 'Facebook URL' },
          {
            type: 'object',
            name: 'officeHours',
            label: 'Büro Öffnungszeiten',
            fields: [
              { type: 'string', name: 'weekdays', label: 'Mo-Fr', required: true },
            ],
          },
          {
            type: 'object',
            name: 'repairHours',
            label: 'Reparaturplanung Öffnungszeiten',
            fields: [
              { type: 'string', name: 'tueThu', label: 'Di-Do', required: true },
              { type: 'string', name: 'fri', label: 'Fr', required: true },
            ],
          },
        ],
      },
      
      // Settings (Global Config)
      {
        name: 'settings',
        label: '⚙️ Einstellungen',
        path: 'content/globals',
        format: 'json',
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        match: {
          include: 'settings',
        },
        fields: [
          { type: 'string', name: 'siteName', label: 'Website Name', required: true },
          { type: 'string', name: 'siteDescription', label: 'Website Beschreibung' },
          { type: 'image', name: 'favicon', label: 'Favicon' },
          { type: 'image', name: 'logo', label: 'Logo' },
          { type: 'image', name: 'defaultOgImage', label: 'Standard OG Bild' },
          { type: 'string', name: 'gtmId', label: 'Google Tag Manager ID' },
          { type: 'string', name: 'gaId', label: 'Google Analytics ID' },
          { type: 'string', name: 'sentryDsn', label: 'Sentry DSN' },
          {
            type: 'object',
            name: 'cookieBanner',
            label: 'Cookie Banner',
            fields: [
              { type: 'string', name: 'message', label: 'Nachricht', ui: { component: 'textarea' } },
              { type: 'string', name: 'privacyLinkText', label: 'Datenschutz Link Text' },
              { type: 'string', name: 'cookieLinkText', label: 'Cookie-Einstellungen Link Text' },
              { type: 'string', name: 'rejectButtonText', label: 'Ablehnen Button Text' },
              { type: 'string', name: 'acceptButtonText', label: 'Akzeptieren Button Text' },
            ],
          },
          {
            type: 'object',
            name: 'notFoundPage',
            label: '404 Seite',
            fields: [
              { type: 'string', name: 'title', label: 'Titel', required: true },
              { type: 'string', name: 'description', label: 'Beschreibung', ui: { component: 'textarea' } },
              { type: 'string', name: 'buttonText', label: 'Button Text' },
            ],
          },
        ],
      },
      
      // Navigation
      {
        name: 'navigation',
        label: '🧭 Navigation',
        path: 'content/globals',
        format: 'json',
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        match: {
          include: 'navigation',
        },
        fields: [
          { type: 'image', name: 'logo', label: 'Logo' },
          {
            type: 'object',
            name: 'ctaButton',
            label: 'CTA Button',
            fields: [
              { type: 'string', name: 'text', label: 'Button Text', required: true },
              { type: 'string', name: 'link', label: 'Button Link', required: true },
            ],
          },
          {
            type: 'object',
            list: true,
            name: 'items',
            label: 'Menüpunkte',
            fields: [
              { type: 'string', name: 'label', label: 'Bezeichnung', required: true },
              { type: 'string', name: 'href', label: 'Link', required: true },
            ],
          },
        ],
      },
      
      // Footer
      {
        name: 'footer',
        label: '🦶 Footer',
        path: 'content/globals',
        format: 'json',
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        match: {
          include: 'footer',
        },
        fields: [
          { type: 'string', name: 'copyright', label: 'Copyright Text' },
          {
            type: 'object',
            list: true,
            name: 'links',
            label: 'Links',
            fields: [
              { type: 'string', name: 'label', label: 'Bezeichnung', required: true },
              { type: 'string', name: 'href', label: 'Link', required: true },
            ],
          },
          {
            type: 'object',
            list: true,
            name: 'social',
            label: 'Social Media',
            fields: [
              { type: 'string', name: 'platform', label: 'Platform', required: true },
              { type: 'string', name: 'url', label: 'URL', required: true },
            ],
          },
        ],
      },
      
      // Legal Pages Collection
      {
        name: 'legalPage',
        label: '⚖️ Rechtliches',
        path: 'content/legal',
        format: 'md',
        ui: {
          router: ({ document }) => {
            const slugMap: Record<string, string> = {
              'imprint': '/de/imprint',
              'privacy': '/de/privacy',
              'terms': '/de/terms',
              'cookies': '/de/cookies',
            };
            return slugMap[document._sys.filename] || `/de/${document._sys.filename}`;
          },
        },
        fields: [
          { 
            type: 'string', 
            name: 'title', 
            label: 'Titel', 
            required: true,
            isTitle: true 
          },
          { 
            type: 'string', 
            name: 'description', 
            label: 'Meta Beschreibung', 
            ui: { component: 'textarea' } 
          },
          { 
            type: 'rich-text', 
            name: 'body', 
            label: 'Inhalt',
            isBody: true 
          },
        ],
      },
    ],
  },
});
