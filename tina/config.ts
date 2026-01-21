import { defineConfig, type Template } from 'tinacms';

// =============================================================================
// Environment Variables (standardized naming per TinaCMS guide)
// =============================================================================
const branch =
  process.env.TINA_BRANCH ||
  process.env.VITE_TINA_BRANCH ||
  process.env.GITHUB_BRANCH ||
  process.env.RENDER_GIT_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  'main';

const clientId = 
  process.env.TINA_CLIENT_ID || 
  process.env.VITE_TINA_CLIENT_ID || 
  // Legacy fallbacks (deprecated)
  process.env.TINA_PUBLIC_CLIENT_ID || 
  process.env.VITE_TINA_PUBLIC_CLIENT_ID || 
  null;

const token = 
  process.env.TINA_TOKEN || 
  process.env.VITE_TINA_TOKEN || 
  null;

// =============================================================================
// Route Mapping for Visual Editing
// =============================================================================
const ROUTE_MAP: Record<string, string> = {
  // Pages
  'startseite': '/de',
  'about': '/de/about',
  'career': '/de/career',
  'contact': '/de/contact',
  // Legal pages
  'imprint': '/de/imprint',
  'privacy': '/de/privacy',
  'terms': '/de/terms',
  'cookies': '/de/cookies',
};

function getRouteForDocument(filename: string, fallbackPath?: string): string {
  return ROUTE_MAP[filename] || fallbackPath || `/de/${filename}`;
}

// =============================================================================
// Reusable Field Definitions
// =============================================================================
const seoFields = {
  type: 'object' as const,
  name: 'seo',
  label: '🔍 SEO & Google',
  fields: [
    { type: 'string' as const, name: 'title', label: 'Browser-Titel', required: true, description: 'Titel im Browser-Tab' },
    { type: 'string' as const, name: 'description', label: 'Suchbeschreibung', ui: { component: 'textarea' }, description: 'Text in Google-Ergebnissen' },
    { type: 'image' as const, name: 'ogImage', label: 'Social Media Bild', description: 'Bild für Facebook/Twitter Vorschau' },
  ],
};

const buttonFields = [
  { type: 'string' as const, name: 'text', label: 'Button Text', required: true },
  { type: 'string' as const, name: 'link', label: 'Link', required: true },
  { 
    type: 'string' as const, 
    name: 'variant', 
    label: 'Stil',
    options: [
      { label: 'Primär', value: 'primary' },
      { label: 'Sekundär', value: 'secondary' },
      { label: 'Outline', value: 'outline' },
    ],
  },
];

// =============================================================================
// Block Templates for Page Builder
// =============================================================================
const heroBlock: Template = {
  name: 'hero',
  label: '👋 Hero Banner',
  fields: [
    { type: 'string', name: 'eyebrow', label: 'Kleine Überschrift', description: 'z.B. "MEISTERBETRIEB"' },
    { type: 'string', name: 'title', label: 'Haupttitel (H1)' },
    { type: 'string', name: 'subtitle', label: 'Untertitel' },
    { type: 'string', name: 'description', label: 'Einleitungstext', ui: { component: 'textarea' } },
    { 
      type: 'object', 
      name: 'primaryButton', 
      label: 'Haupt-Button',
      fields: buttonFields,
    },
    { 
      type: 'object', 
      name: 'secondaryButton', 
      label: 'Zweit-Button',
      fields: buttonFields,
    },
    { type: 'image', name: 'backgroundImage', label: 'Hintergrundbild' },
    { 
      type: 'string', 
      name: 'variant', 
      label: 'Stil Variante',
      options: [
        { label: 'Standard (dunkel)', value: 'dark' },
        { label: 'Hell', value: 'light' },
        { label: 'Mit Überlagerung', value: 'overlay' },
      ],
    },
  ],
};

const contentBlock: Template = {
  name: 'content',
  label: '📝 Text/Inhalt',
  fields: [
    { type: 'string', name: 'eyebrow', label: 'Kleine Überschrift' },
    { type: 'string', name: 'title', label: 'Titel' },
    { type: 'rich-text', name: 'body', label: 'Inhalt' },
    { type: 'image', name: 'image', label: 'Bild (optional)' },
    { 
      type: 'string', 
      name: 'imagePosition', 
      label: 'Bild Position',
      options: [
        { label: 'Links', value: 'left' },
        { label: 'Rechts', value: 'right' },
        { label: 'Oben', value: 'top' },
        { label: 'Unten', value: 'bottom' },
      ],
    },
  ],
};

const featuresBlock: Template = {
  name: 'features',
  label: '⭐ Features/Merkmale',
  fields: [
    { type: 'string', name: 'eyebrow', label: 'Kleine Überschrift' },
    { type: 'string', name: 'title', label: 'Titel' },
    { type: 'string', name: 'description', label: 'Beschreibung', ui: { component: 'textarea' } },
    {
      type: 'object',
      list: true,
      name: 'items',
      label: 'Features',
      ui: { 
        max: 8,
        itemProps: (item) => ({ label: item?.title || 'Neues Feature' }),
      },
      fields: [
        { type: 'string', name: 'icon', label: 'Icon (Lucide)', description: 'z.B. CheckCircle, Star, Shield' },
        { type: 'string', name: 'title', label: 'Titel', required: true },
        { type: 'string', name: 'description', label: 'Beschreibung', ui: { component: 'textarea' } },
      ],
    },
    {
      type: 'string',
      name: 'columns',
      label: 'Spalten',
      options: [
        { label: '2 Spalten', value: '2' },
        { label: '3 Spalten', value: '3' },
        { label: '4 Spalten', value: '4' },
      ],
    },
  ],
};

const teamGridBlock: Template = {
  name: 'teamGrid',
  label: '👥 Team Übersicht',
  fields: [
    { type: 'string', name: 'title', label: 'Titel' },
    { type: 'string', name: 'description', label: 'Beschreibung', ui: { component: 'textarea' } },
    {
      type: 'string',
      name: 'categories',
      label: 'Angezeigte Kategorien',
      list: true,
      options: [
        { label: 'Geschäftsführung', value: 'leadership' },
        { label: 'Büro', value: 'office' },
        { label: 'Dachdecker', value: 'craftsmen' },
      ],
    },
    { type: 'boolean', name: 'showEmail', label: 'E-Mails anzeigen?' },
  ],
};

const formBlock: Template = {
  name: 'form',
  label: '📋 Kontaktformular',
  fields: [
    { type: 'string', name: 'title', label: 'Titel' },
    { type: 'string', name: 'description', label: 'Beschreibung', ui: { component: 'textarea' } },
    {
      type: 'string',
      name: 'formType',
      label: 'Formular-Typ',
      required: true,
      options: [
        { label: 'Kontaktformular (vollständig)', value: 'contact' },
        { label: 'Schnellanfrage', value: 'quick' },
        { label: 'Bewerbungsformular', value: 'application' },
      ],
    },
    { type: 'string', name: 'submitButtonText', label: 'Absenden-Button Text' },
    { type: 'string', name: 'successMessage', label: 'Erfolgsmeldung', ui: { component: 'textarea' } },
  ],
};

const ctaBlock: Template = {
  name: 'cta',
  label: '📣 Call-to-Action',
  fields: [
    { type: 'string', name: 'eyebrow', label: 'Kleine Überschrift' },
    { type: 'string', name: 'title', label: 'Titel' },
    { type: 'string', name: 'description', label: 'Beschreibung', ui: { component: 'textarea' } },
    { 
      type: 'object', 
      name: 'button', 
      label: 'Button',
      fields: buttonFields,
    },
    {
      type: 'string',
      name: 'variant',
      label: 'Stil',
      options: [
        { label: 'Dunkel', value: 'dark' },
        { label: 'Hell', value: 'light' },
        { label: 'Primärfarbe', value: 'primary' },
      ],
    },
  ],
};

const faqBlock: Template = {
  name: 'faq',
  label: '❓ FAQ',
  fields: [
    { type: 'string', name: 'title', label: 'Titel' },
    { type: 'string', name: 'description', label: 'Beschreibung' },
    {
      type: 'object',
      list: true,
      name: 'questions',
      label: 'Fragen',
      ui: { 
        max: 15,
        itemProps: (item) => ({ label: item?.question || 'Neue Frage' }),
      },
      fields: [
        { type: 'string', name: 'question', label: 'Frage', required: true },
        { type: 'string', name: 'answer', label: 'Antwort', ui: { component: 'textarea' }, required: true },
      ],
    },
  ],
};

const storyBlock: Template = {
  name: 'story',
  label: '📖 Geschichte/Story',
  fields: [
    { type: 'string', name: 'title', label: 'Titel' },
    { type: 'string', name: 'text1', label: 'Absatz 1', ui: { component: 'textarea' } },
    { type: 'string', name: 'text2', label: 'Absatz 2', ui: { component: 'textarea' } },
    { type: 'image', name: 'image', label: 'Bild' },
    {
      type: 'object',
      list: true,
      name: 'highlights',
      label: 'Highlights/Werte',
      ui: { max: 6 },
      fields: [
        { type: 'string', name: 'text', label: 'Text', required: true },
        { type: 'string', name: 'icon', label: 'Icon (Lucide)' },
      ],
    },
  ],
};

const equipmentBlock: Template = {
  name: 'equipment',
  label: '🔧 Ausstattung/Info',
  fields: [
    { type: 'string', name: 'icon', label: 'Icon (Lucide)', description: 'z.B. Hammer, Wrench, Truck' },
    { type: 'string', name: 'title', label: 'Titel' },
    { type: 'string', name: 'description', label: 'Beschreibung', ui: { component: 'textarea' } },
  ],
};

const jobsListBlock: Template = {
  name: 'jobsList',
  label: '💼 Stellenangebote',
  fields: [
    { type: 'string', name: 'title', label: 'Titel' },
    { type: 'string', name: 'emptyMessage', label: 'Text wenn keine Stellen' },
  ],
};

const contactInfoBlock: Template = {
  name: 'contactInfo',
  label: '📍 Kontaktdaten',
  fields: [
    { type: 'string', name: 'title', label: 'Titel' },
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
    {
      type: 'object',
      name: 'officeHours',
      label: 'Öffnungszeiten Büro',
      fields: [{ type: 'string', name: 'weekdays', label: 'Mo-Fr Text', required: true }],
    },
    {
      type: 'object',
      name: 'repairHours',
      label: 'Reparaturplanung Zeiten',
      fields: [
        { type: 'string', name: 'tueThu', label: 'Di-Do Text', required: true },
        { type: 'string', name: 'fri', label: 'Fr Text', required: true },
      ],
    },
  ],
};

// =============================================================================
// TinaCMS Configuration
// =============================================================================
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
      // 🏠 STARTSEITE (Singleton)
      {
        name: 'homePage',
        label: '🏠 Startseite',
        path: 'content/home',
        format: 'json',
        match: {
          include: 'startseite',
        },
        ui: {
          router: () => '/de',
          allowedActions: { create: false, delete: false },
        },
        fields: [
          seoFields,
          // HERO
          {
            type: 'object',
            name: 'hero',
            label: '👋 Oberer Bereich (Intro)',
            fields: [
              { type: 'string', name: 'eyebrow', label: 'Kleine Überschrift', description: 'z.B. "MEISTERBETRIEB"' },
              { type: 'string', name: 'title', label: 'Haupttitel (H1)', required: true },
              { type: 'string', name: 'subtitle', label: 'Untertitel' },
              { type: 'string', name: 'description', label: 'Einleitungstext', ui: { component: 'textarea' } },
              { 
                type: 'object', 
                name: 'buttons', 
                label: 'Buttons', 
                fields: [
                  { type: 'string', name: 'primaryText', label: 'Haupt-Button Text' },
                  { type: 'string', name: 'primaryLink', label: 'Haupt-Button Link' },
                  { type: 'string', name: 'secondaryText', label: 'Zweit-Button Text' },
                  { type: 'string', name: 'secondaryLink', label: 'Zweit-Button Link' },
                ] 
              },
              { type: 'image', name: 'backgroundImage', label: 'Hintergrundbild' },
              { type: 'string', name: 'videoUrl', label: 'Video URL' },
              { type: 'boolean', name: 'showQuickForm', label: 'Kontaktformular anzeigen?' },
            ],
          },
          // QUICK FORM
          {
            type: 'object',
            name: 'quickForm',
            label: '⚡ Schnellanfrage-Box',
            fields: [
              { type: 'string', name: 'title', label: 'Titel', required: true },
              { type: 'string', name: 'nameLabel', label: 'Platzhalter Name' },
              { type: 'string', name: 'contactLabel', label: 'Platzhalter Kontakt' },
              { type: 'string', name: 'buttonText', label: 'Button Text' },
              { type: 'string', name: 'disclaimer', label: 'Hinweistext' },
            ],
          },
          // STATS
          {
            type: 'object',
            list: true,
            name: 'stats',
            label: '📊 Statistiken (Zahlen)',
            ui: { 
              max: 6,
              itemProps: (item) => ({ label: item?.label || 'Neue Statistik' }) 
            },
            fields: [
              { type: 'string', name: 'value', label: 'Zahl (z.B. 28)', required: true },
              { type: 'string', name: 'label', label: 'Einheit (z.B. Experten)', required: true },
              { type: 'string', name: 'icon', label: 'Icon Name (Englisch)' },
            ],
          },
          // SERVICES
          {
            type: 'object',
            name: 'servicesSection',
            label: '🛠️ Leistungen (Vorschau)',
            fields: [
              { type: 'string', name: 'eyebrow', label: 'Kleine Überschrift' },
              { type: 'string', name: 'title', label: 'Titel' },
              { type: 'string', name: 'description', label: 'Text', ui: { component: 'textarea' } },
            ],
          },
          // CEO QUOTE
          {
            type: 'object',
            name: 'ceoQuote',
            label: '💬 Zitat / Über Uns',
            fields: [
              { type: 'string', name: 'eyebrow', label: 'Kleine Überschrift' },
              { type: 'string', name: 'name', label: 'Name', required: true },
              { type: 'string', name: 'role', label: 'Position', required: true },
              { type: 'string', name: 'quote', label: 'Zitat (Groß)', ui: { component: 'textarea' }, required: true },
              { type: 'string', name: 'text', label: 'Fließtext', ui: { component: 'textarea' } },
              { type: 'image', name: 'image', label: 'Foto' },
              { type: 'string', name: 'buttonText', label: 'Button Text' },
              { type: 'string', name: 'buttonLink', label: 'Button Link' },
            ],
          },
          // PROJECTS
          {
            type: 'object',
            name: 'projectsSection',
            label: '🏗️ Projekte & Referenzen',
            fields: [
              { type: 'string', name: 'eyebrow', label: 'Kleine Überschrift' },
              { type: 'string', name: 'title', label: 'Titel' },
              {
                type: 'object',
                list: true,
                name: 'items',
                label: 'Projekte',
                ui: { 
                  max: 6,
                  itemProps: (item) => ({ label: item?.title || 'Neues Projekt' }) 
                },
                fields: [
                  { type: 'string', name: 'title', label: 'Projektname', required: true },
                  { type: 'string', name: 'description', label: 'Art der Arbeit' },
                  { type: 'image', name: 'image', label: 'Bild', required: true },
                ]
              }
            ],
          },
          // TRUST
          {
            type: 'object',
            name: 'trustIndicators',
            label: '🤝 Vertrauens-Elemente',
            fields: [
              { type: 'string', name: 'eyebrow', label: 'Kleine Überschrift' },
              { type: 'string', name: 'title', label: 'Titel', required: true },
              { type: 'string', name: 'description', label: 'Text', ui: { component: 'textarea' } },
              { type: 'image', name: 'image', label: 'Bild' },
              {
                type: 'object',
                list: true,
                name: 'items',
                label: 'Listenpunkte',
                ui: { 
                  max: 4,
                  itemProps: (item) => ({ label: item?.title || 'Neuer Punkt' }) 
                },
                fields: [
                  { type: 'string', name: 'title', label: 'Titel', required: true },
                  { type: 'string', name: 'description', label: 'Text' },
                  { type: 'string', name: 'icon', label: 'Icon (Lucide)' },
                ]
              }
            ],
          },
          // FAQ
          {
            type: 'object',
            name: 'faqSection',
            label: '❓ Häufige Fragen (FAQ)',
            fields: [
              { type: 'string', name: 'title', label: 'Titel' },
              { type: 'string', name: 'description', label: 'Text' },
              {
                type: 'object',
                list: true,
                name: 'questions',
                label: 'Fragen',
                ui: { 
                  max: 10,
                  itemProps: (item) => ({ label: item?.question || 'Neue Frage' }) 
                },
                fields: [
                  { type: 'string', name: 'question', label: 'Frage', required: true },
                  { type: 'string', name: 'answer', label: 'Antwort', ui: { component: 'textarea' }, required: true },
                ]
              },
              {
                type: 'object',
                name: 'cta',
                label: 'Kontaktbox (unter FAQ)',
                fields: [
                  { type: 'string', name: 'title', label: 'Titel' },
                  { type: 'string', name: 'description', label: 'Text' },
                  { type: 'string', name: 'phone', label: 'Telefon' },
                  { type: 'string', name: 'buttonText', label: 'Button Text' },
                  { type: 'string', name: 'buttonLink', label: 'Link' },
                ]
              }
            ],
          },
          // FINAL CTA
          {
            type: 'object',
            name: 'finalCTA',
            label: '📣 Abschluss-Bereich',
            fields: [
              { type: 'string', name: 'title', label: 'Titel', required: true },
              { type: 'string', name: 'description', label: 'Text', ui: { component: 'textarea' } },
              { type: 'string', name: 'buttonText', label: 'Button Text' },
              { type: 'string', name: 'buttonLink', label: 'Button Link' },
            ],
          },
        ],
      },

      // 📄 PAGE BUILDER (Block-based pages)
      {
        name: 'page',
        label: '📄 Seiten',
        path: 'content/pages',
        format: 'json',
        ui: {
          router: ({ document }) => getRouteForDocument(document._sys.filename),
        },
        fields: [
          { type: 'string', name: 'title', label: 'Seitentitel (intern)', required: true, isTitle: true },
          { type: 'string', name: 'slug', label: 'URL-Pfad', required: true, description: 'z.B. "about" für /de/about' },
          seoFields,
          {
            type: 'object',
            list: true,
            name: 'blocks',
            label: '🧱 Seiteninhalt (Blöcke)',
            templates: [
              heroBlock,
              contentBlock,
              storyBlock,
              featuresBlock,
              equipmentBlock,
              teamGridBlock,
              jobsListBlock,
              formBlock,
              contactInfoBlock,
              ctaBlock,
              faqBlock,
            ],
          },
        ],
      },


      // 👥 TEAM MITGLIEDER
      {
        name: 'teamMember',
        label: '👥 Mitarbeiter',
        path: 'content/team',
        format: 'md',
        ui: {
          router: ({ document }) => {
            return `/de/about#team-${document._sys.filename}`;
          },
        },
        fields: [
          { type: 'string', name: 'name', label: 'Vor- & Nachname', required: true, isTitle: true },
          { type: 'string', name: 'role', label: 'Position / Jobtitel', required: true },
          { type: 'string', name: 'email', label: 'E-Mail' },
          {
            type: 'string',
            name: 'category',
            label: 'Abteilung',
            required: true,
            options: [
              { label: 'Geschäftsführung', value: 'leadership' },
              { label: 'Büro', value: 'office' },
              { label: 'Dachdecker', value: 'craftsmen' }
            ],
          },
          { type: 'string', name: 'description', label: 'Beschreibung', ui: { component: 'textarea' } },
          { type: 'image', name: 'image', label: 'Foto' },
          { type: 'number', name: 'order', label: 'Reihenfolge' },
        ],
      },
      
      // 🔧 DIENSTLEISTUNGEN
      {
        name: 'service',
        label: '🔧 Dienstleistungen',
        path: 'content/services',
        format: 'md',
        ui: {
          router: ({ document }) => {
            return `/de/services/${document._sys.filename}`;
          },
        },
        fields: [
          { type: 'string', name: 'title', label: 'Name der Leistung', required: true, isTitle: true },
          { type: 'string', name: 'subtitle', label: 'Kleiner Untertitel' },
          { type: 'string', name: 'shortDescription', label: 'Kurzbeschreibung', ui: { component: 'textarea' } },
          { type: 'string', name: 'intro', label: 'Einleitungstext', ui: { component: 'textarea' } },
          { type: 'rich-text', name: 'body', label: 'Beschreibung (Lang)' },
          { type: 'image', name: 'image', label: 'Hauptbild' },
          { type: 'image', name: 'heroImage', label: 'Großes Titelbild' },
          { type: 'string', name: 'icon', label: 'Icon Name (Lucide)' },
          { type: 'string', name: 'expertTip', label: 'Experten-Tipp', ui: { component: 'textarea' } },
          {
            type: 'string',
            list: true,
            name: 'features',
            label: 'Merkmale (Liste)',
            description: 'Kurze Stichpunkte zu den Merkmalen dieser Leistung',
          },
          {
            type: 'string',
            list: true,
            name: 'benefits',
            label: 'Vorteile (Liste)',
            description: 'Kurze Stichpunkte zu den Vorteilen für den Kunden',
          },
          {
            type: 'object',
            list: true,
            name: 'sections',
            label: 'Detailsektionen',
            description: 'Ausführliche Informationsblöcke mit Icon und Text',
            ui: { 
              max: 6,
              itemProps: (item) => ({ label: item?.title || 'Neue Sektion' }),
            },
            fields: [
              { type: 'string', name: 'title', label: 'Titel', required: true },
              { type: 'string', name: 'icon', label: 'Icon (Lucide)', description: 'z.B. Hammer, Layers, CloudRain, Sun' },
              { type: 'string', name: 'content', label: 'Inhalt', ui: { component: 'textarea' } },
            ],
          },
          {
            type: 'object',
            list: true,
            name: 'processSteps',
            label: 'Prozessschritte',
            description: 'Ablauf des Projekts in einzelnen Schritten',
            ui: { 
              max: 8,
              itemProps: (item) => ({ label: item?.title ? `${item.step || '?'}. ${item.title}` : 'Neuer Schritt' }),
            },
            fields: [
              { type: 'number', name: 'step', label: 'Schritt Nr.', required: true },
              { type: 'string', name: 'title', label: 'Titel', required: true },
              { type: 'string', name: 'text', label: 'Beschreibung', ui: { component: 'textarea' } },
            ],
          },
          {
            type: 'image',
            list: true,
            name: 'referenceImages',
            label: 'Projektbilder',
            description: 'Referenzbilder aus abgeschlossenen Projekten',
          },
          {
            type: 'string',
            list: true,
            name: 'contactIds',
            label: 'Ansprechpartner IDs',
            description: 'IDs der Team-Mitglieder (z.B. sascha, isabel)',
          },
          {
            type: 'object',
            list: true,
            name: 'faq',
            label: 'FAQ',
            description: 'Häufig gestellte Kundenfragen',
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
            list: true,
            name: 'gallery',
            label: 'Galerie',
            description: 'Zusätzliche Bilder mit Bildunterschrift',
            ui: { 
              max: 12,
              itemProps: (item) => ({ label: item?.caption || 'Neues Bild' }),
            },
            fields: [
              { type: 'image', name: 'image', label: 'Bild', required: true },
              { type: 'string', name: 'caption', label: 'Bildunterschrift' },
            ],
          },
          {
            type: 'object',
            name: 'uiText',
            label: '🎨 UI Texte & Buttons',
            description: 'Anpassbare Texte für Buttons und Call-to-Actions auf der Seite',
            fields: [
              { type: 'string', name: 'introHeader', label: 'Intro Überschrift', description: 'Überschrift über dem Einleitungstext' },
              { type: 'string', name: 'contactButtonText', label: 'Kontakt Button Text', description: 'z.B. "Kontakt aufnehmen"' },
              { type: 'string', name: 'careerCtaTitle', label: 'Karriere CTA Titel', description: 'Titel der Karriere-Box' },
              { type: 'string', name: 'careerCtaDescription', label: 'Karriere CTA Beschreibung', ui: { component: 'textarea' } },
              { type: 'string', name: 'careerCtaButtonText', label: 'Karriere CTA Button Text' },
            ],
          },
        ],
      },
      
      // 💼 STELLENANZEIGEN
      {
        name: 'job',
        label: '💼 Stellenanzeigen',
        path: 'content/jobs',
        format: 'md',
        ui: {
          router: ({ document }) => {
            return `/de/career#${document._sys.filename}`;
          },
        },
        fields: [
          { type: 'string', name: 'title', label: 'Jobtitel', required: true, isTitle: true },
          { type: 'string', name: 'location', label: 'Standort', required: true },
          {
            type: 'string',
            name: 'type',
            label: 'Anstellungsart',
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
          { type: 'boolean', name: 'published', label: 'Veröffentlicht?' },
        ],
      },
      
      // ⚙️ GRUNDEINSTELLUNGEN
      {
        name: 'settings',
        label: '⚙️ Grundeinstellungen',
        path: 'content/globals',
        format: 'json',
        ui: { 
          allowedActions: { create: false, delete: false },
        },
        match: { include: 'settings' },
        fields: [
          { type: 'string', name: 'siteName', label: 'Website Name', required: true },
          { type: 'string', name: 'siteDescription', label: 'Website Beschreibung' },
          { type: 'image', name: 'favicon', label: 'Favicon' },
          { type: 'image', name: 'logo', label: 'Logo' },
          { type: 'image', name: 'defaultOgImage', label: 'Standard Social Bild' },
          { type: 'string', name: 'gtmId', label: 'Google Tag Manager ID' },
          { type: 'string', name: 'gaId', label: 'Google Analytics ID' },
          { type: 'string', name: 'sentryDsn', label: 'Sentry DSN' },
          {
            type: 'object',
            name: 'cookieBanner',
            label: '🍪 Cookie Banner',
            fields: [
              { type: 'string', name: 'message', label: 'Text', ui: { component: 'textarea' } },
              { type: 'string', name: 'privacyLinkText', label: 'Datenschutz Link Text' },
              { type: 'string', name: 'cookieLinkText', label: 'Cookie-Einstellungen Link Text' },
              { type: 'string', name: 'rejectButtonText', label: 'Ablehnen Button Text' },
              { type: 'string', name: 'acceptButtonText', label: 'Annehmen Button Text' },
            ],
          },
          {
            type: 'object',
            name: 'notFoundPage',
            label: '🔍 404 Seite',
            fields: [
              { type: 'string', name: 'title', label: 'Titel', required: true },
              { type: 'string', name: 'description', label: 'Beschreibung', ui: { component: 'textarea' } },
              { type: 'string', name: 'buttonText', label: 'Button Text' },
            ],
          },
        ],
      },
      
      // 🧭 NAVIGATION
      {
        name: 'navigation',
        label: '🧭 Menü / Navigation',
        path: 'content/globals',
        format: 'json',
        ui: { 
          allowedActions: { create: false, delete: false },
        },
        match: { include: 'navigation' },
        fields: [
          { type: 'image', name: 'logo', label: 'Logo' },
          {
            type: 'object',
            name: 'ctaButton',
            label: 'Button oben rechts',
            fields: [
              { type: 'string', name: 'text', label: 'Text', required: true },
              { type: 'string', name: 'link', label: 'Link', required: true },
            ],
          },
          {
            type: 'object',
            list: true,
            name: 'items',
            label: 'Menüpunkte',
            ui: { itemProps: (item) => ({ label: item?.label || 'Neuer Link' }) },
            fields: [
              { type: 'string', name: 'label', label: 'Name (z.B. Leistungen)', required: true },
              { type: 'string', name: 'href', label: 'Link (z.B. /services)', required: true },
            ],
          },
        ],
      },
      

      // 🦶 FOOTER
      {
        name: 'footer',
        label: '🦶 Footer',
        path: 'content/globals',
        format: 'json',
        ui: { 
          allowedActions: { create: false, delete: false },
        },
        match: { include: 'footer' },
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
              { type: 'string', name: 'platform', label: 'Plattform', required: true },
              { type: 'string', name: 'url', label: 'URL', required: true },
            ],
          },
        ],
      },
      
      // ⚖️ RECHTSTEXTE
      {
        name: 'legalPage',
        label: '⚖️ Rechtstexte',
        path: 'content/legal',
        format: 'md',
        ui: {
          router: ({ document }) => getRouteForDocument(document._sys.filename),
        },
        fields: [
          { type: 'string', name: 'title', label: 'Seitentitel (Intern)', required: true, isTitle: true },
          seoFields,
          { type: 'rich-text', name: 'body', label: 'Inhalt', isBody: true },
        ],
      },
    ],
  },
});
