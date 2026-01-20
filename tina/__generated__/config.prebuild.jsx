// tina/config.ts
import { defineConfig } from "tinacms";
var branch = process.env.GITHUB_BRANCH || process.env.RENDER_GIT_BRANCH || process.env.VERCEL_GIT_COMMIT_REF || process.env.HEAD || "main";
var clientId = process.env.TINA_PUBLIC_CLIENT_ID || process.env.VITE_TINA_CLIENT_ID || null;
var token = process.env.TINA_TOKEN || process.env.VITE_TINA_TOKEN || null;
var config_default = defineConfig({
  branch,
  clientId,
  token,
  build: {
    outputFolder: "admin",
    publicFolder: "public"
  },
  media: {
    tina: {
      publicFolder: "public",
      mediaRoot: "uploads"
    }
  },
  schema: {
    collections: [
      // Home Page Collection (Single Document)
      {
        name: "homePage",
        label: "Startseite",
        path: "content/home",
        format: "json",
        ui: {
          allowedActions: {
            create: false,
            delete: false
          }
        },
        fields: [
          {
            type: "object",
            name: "seo",
            label: "SEO",
            fields: [
              { type: "string", name: "title", label: "Seitentitel", required: true },
              { type: "string", name: "description", label: "Beschreibung", ui: { component: "textarea" } }
            ]
          },
          {
            type: "object",
            name: "hero",
            label: "Hero Bereich",
            fields: [
              { type: "string", name: "eyebrow", label: "\xDCberschrift Klein", required: true },
              { type: "string", name: "title", label: "Haupttitel", required: true },
              { type: "string", name: "subtitle", label: "Untertitel" },
              { type: "string", name: "description", label: "Beschreibung", ui: { component: "textarea" } },
              { type: "string", name: "primaryButtonText", label: "Button 1 Text" },
              { type: "string", name: "primaryButtonLink", label: "Button 1 Link" },
              { type: "string", name: "secondaryButtonText", label: "Button 2 Text" },
              { type: "string", name: "secondaryButtonLink", label: "Button 2 Link" },
              { type: "image", name: "backgroundImage", label: "Hintergrundbild" },
              { type: "string", name: "videoUrl", label: "Video URL" },
              { type: "boolean", name: "showQuickForm", label: "Schnellkontakt-Formular anzeigen" }
            ]
          },
          {
            type: "object",
            list: true,
            name: "stats",
            label: "Statistiken",
            fields: [
              { type: "string", name: "value", label: "Wert", required: true },
              { type: "string", name: "label", label: "Beschriftung", required: true },
              { type: "string", name: "icon", label: "Icon Name (Lucide)" }
            ]
          },
          {
            type: "object",
            name: "servicesSection",
            label: "Leistungen Bereich",
            fields: [
              { type: "string", name: "eyebrow", label: "\xDCberschrift Klein" },
              { type: "string", name: "title", label: "Titel", required: true },
              { type: "string", name: "description", label: "Beschreibung", ui: { component: "textarea" } }
            ]
          },
          {
            type: "object",
            name: "ceoQuote",
            label: "Gesch\xE4ftsf\xFChrer Zitat",
            fields: [
              { type: "string", name: "eyebrow", label: "\xDCberschrift Klein" },
              { type: "string", name: "name", label: "Name", required: true },
              { type: "string", name: "role", label: "Position", required: true },
              { type: "string", name: "quote", label: "Zitat", ui: { component: "textarea" }, required: true },
              { type: "string", name: "text", label: "Text", ui: { component: "textarea" } },
              { type: "image", name: "image", label: "Bild" },
              { type: "string", name: "buttonText", label: "Button Text" },
              { type: "string", name: "buttonLink", label: "Button Link" }
            ]
          },
          {
            type: "object",
            list: true,
            name: "projects",
            label: "Projekt Showcase",
            fields: [
              { type: "string", name: "title", label: "Titel", required: true },
              { type: "string", name: "description", label: "Beschreibung" },
              { type: "image", name: "image", label: "Bild", required: true }
            ]
          },
          {
            type: "object",
            name: "finalCTA",
            label: "Abschluss CTA",
            fields: [
              { type: "string", name: "title", label: "Titel", required: true },
              { type: "string", name: "description", label: "Beschreibung", ui: { component: "textarea" } },
              { type: "string", name: "buttonText", label: "Button Text" },
              { type: "string", name: "buttonLink", label: "Button Link" }
            ]
          }
        ]
      },
      // Team Members Collection
      {
        name: "teamMember",
        label: "Team Mitglieder",
        path: "content/team",
        format: "md",
        ui: {
          router: ({ document }) => {
            return `/de/about#team-${document._sys.filename}`;
          }
        },
        fields: [
          { type: "string", name: "name", label: "Name", required: true, isTitle: true },
          { type: "string", name: "role", label: "Position", required: true },
          { type: "string", name: "email", label: "E-Mail" },
          {
            type: "string",
            name: "category",
            label: "Kategorie",
            required: true,
            options: ["leadership", "office", "craftsmen"]
          },
          { type: "rich-text", name: "description", label: "Beschreibung" },
          { type: "image", name: "image", label: "Foto" },
          { type: "number", name: "order", label: "Reihenfolge" }
        ]
      },
      // Services Collection
      {
        name: "service",
        label: "Leistungen",
        path: "content/services",
        format: "md",
        ui: {
          router: ({ document }) => {
            return `/de/services/${document._sys.filename}`;
          }
        },
        fields: [
          { type: "string", name: "title", label: "Titel", required: true, isTitle: true },
          { type: "string", name: "subtitle", label: "Untertitel" },
          { type: "string", name: "shortDescription", label: "Kurzbeschreibung", ui: { component: "textarea" } },
          { type: "string", name: "intro", label: "Einf\xFChrungstext", ui: { component: "textarea" } },
          { type: "rich-text", name: "body", label: "Beschreibung (Lang)" },
          { type: "image", name: "image", label: "Hauptbild" },
          { type: "image", name: "heroImage", label: "Hero Bild" },
          { type: "string", name: "icon", label: "Icon Name (Lucide)" },
          { type: "string", name: "expertTip", label: "Experten-Tipp", ui: { component: "textarea" } },
          {
            type: "string",
            list: true,
            name: "features",
            label: "Merkmale"
          },
          {
            type: "string",
            list: true,
            name: "benefits",
            label: "Vorteile"
          },
          {
            type: "object",
            list: true,
            name: "sections",
            label: "Detailsektionen",
            fields: [
              { type: "string", name: "title", label: "Titel", required: true },
              { type: "string", name: "icon", label: "Icon (Lucide)" },
              { type: "string", name: "content", label: "Inhalt", ui: { component: "textarea" } }
            ]
          },
          {
            type: "object",
            list: true,
            name: "processSteps",
            label: "Prozessschritte",
            fields: [
              { type: "number", name: "step", label: "Schritt Nr." },
              { type: "string", name: "title", label: "Titel" },
              { type: "string", name: "text", label: "Beschreibung" }
            ]
          },
          {
            type: "string",
            list: true,
            name: "referenceImages",
            label: "Projektbilder (URLs)"
          },
          {
            type: "string",
            list: true,
            name: "contactIds",
            label: "Ansprechpartner IDs"
          },
          {
            type: "object",
            list: true,
            name: "faq",
            label: "FAQ",
            fields: [
              { type: "string", name: "question", label: "Frage", required: true },
              { type: "string", name: "answer", label: "Antwort", ui: { component: "textarea" }, required: true }
            ]
          },
          {
            type: "object",
            list: true,
            name: "gallery",
            label: "Galerie",
            fields: [
              { type: "image", name: "image", label: "Bild" },
              { type: "string", name: "caption", label: "Bildunterschrift" }
            ]
          }
        ]
      },
      // Jobs Collection
      {
        name: "job",
        label: "Stellenangebote",
        path: "content/jobs",
        format: "md",
        ui: {
          router: ({ document }) => {
            return `/de/career#${document._sys.filename}`;
          }
        },
        fields: [
          { type: "string", name: "title", label: "Titel", required: true, isTitle: true },
          { type: "string", name: "location", label: "Standort", required: true },
          {
            type: "string",
            name: "type",
            label: "Typ",
            required: true,
            options: ["Vollzeit", "Teilzeit", "Ausbildung"]
          },
          { type: "string", name: "shortDesc", label: "Kurzbeschreibung", ui: { component: "textarea" } },
          {
            type: "string",
            list: true,
            name: "tasks",
            label: "Aufgaben"
          },
          {
            type: "string",
            list: true,
            name: "profile",
            label: "Ihr Profil"
          },
          {
            type: "string",
            list: true,
            name: "benefits",
            label: "Wir bieten"
          },
          { type: "boolean", name: "published", label: "Ver\xF6ffentlicht" }
        ]
      },
      // Pages Collection
      {
        name: "page",
        label: "Seiten",
        path: "content/pages",
        format: "md",
        ui: {
          router: ({ document }) => {
            const lang = document._sys.breadcrumbs[0] || "de";
            const slug = document._sys.filename;
            if (slug === "home") {
              return `/${lang}`;
            }
            return `/${lang}/${slug}`;
          }
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Titel",
            required: true,
            isTitle: true
          },
          {
            type: "string",
            name: "description",
            label: "Beschreibung",
            ui: { component: "textarea" }
          },
          {
            type: "object",
            list: true,
            name: "blocks",
            label: "Inhaltsbl\xF6cke",
            templates: [
              {
                name: "hero",
                label: "Hero",
                fields: [
                  { type: "string", name: "title", label: "Titel" },
                  { type: "string", name: "description", label: "Beschreibung", ui: { component: "textarea" } },
                  { type: "image", name: "image", label: "Bild" },
                  {
                    type: "object",
                    list: true,
                    name: "actions",
                    label: "Aktionen",
                    fields: [
                      { type: "string", name: "label", label: "Text", required: true },
                      { type: "string", name: "href", label: "Link", required: true },
                      {
                        type: "string",
                        name: "variant",
                        label: "Variante",
                        options: ["primary", "secondary", "outline"]
                      }
                    ]
                  }
                ]
              },
              {
                name: "features",
                label: "Features",
                fields: [
                  { type: "string", name: "title", label: "Titel" },
                  { type: "string", name: "description", label: "Beschreibung", ui: { component: "textarea" } },
                  {
                    type: "object",
                    list: true,
                    name: "items",
                    label: "Elemente",
                    fields: [
                      { type: "string", name: "title", label: "Titel", required: true },
                      { type: "string", name: "description", label: "Beschreibung" },
                      { type: "string", name: "icon", label: "Icon (Lucide)" }
                    ]
                  }
                ]
              },
              {
                name: "testimonial",
                label: "Testimonial",
                fields: [
                  { type: "string", name: "quote", label: "Zitat", required: true, ui: { component: "textarea" } },
                  { type: "string", name: "author", label: "Autor", required: true },
                  { type: "string", name: "role", label: "Position" }
                ]
              },
              {
                name: "contact",
                label: "Kontakt",
                fields: [
                  { type: "string", name: "title", label: "Titel" },
                  { type: "string", name: "description", label: "Beschreibung", ui: { component: "textarea" } }
                ]
              },
              {
                name: "content",
                label: "Rich Text",
                fields: [
                  { type: "rich-text", name: "body", label: "Inhalt" }
                ]
              }
            ]
          }
        ]
      },
      // About Page Collection (Single Document)
      {
        name: "aboutPage",
        label: "\xDCber Uns Seite",
        path: "content/about",
        format: "json",
        ui: {
          allowedActions: {
            create: false,
            delete: false
          }
        },
        fields: [
          {
            type: "object",
            name: "seo",
            label: "SEO",
            fields: [
              { type: "string", name: "title", label: "Seitentitel", required: true },
              { type: "string", name: "description", label: "Beschreibung", ui: { component: "textarea" } }
            ]
          },
          {
            type: "object",
            name: "hero",
            label: "Hero Bereich",
            fields: [
              { type: "string", name: "eyebrow", label: "\xDCberschrift Klein" },
              { type: "string", name: "title", label: "Titel", required: true },
              { type: "string", name: "description", label: "Beschreibung", ui: { component: "textarea" } }
            ]
          },
          {
            type: "object",
            name: "story",
            label: "Unternehmensgeschichte",
            fields: [
              { type: "string", name: "title", label: "Titel", required: true },
              { type: "string", name: "text1", label: "Absatz 1", ui: { component: "textarea" } },
              { type: "string", name: "text2", label: "Absatz 2", ui: { component: "textarea" } },
              { type: "image", name: "image", label: "Bild" }
            ]
          },
          {
            type: "object",
            list: true,
            name: "values",
            label: "Werte",
            fields: [
              { type: "string", name: "text", label: "Text", required: true }
            ]
          },
          {
            type: "object",
            name: "equipment",
            label: "Ausstattung",
            fields: [
              { type: "string", name: "title", label: "Titel", required: true },
              { type: "string", name: "description", label: "Beschreibung", ui: { component: "textarea" } }
            ]
          },
          {
            type: "object",
            name: "teamSection",
            label: "Team Bereich",
            fields: [
              { type: "string", name: "title", label: "Titel", required: true },
              { type: "string", name: "description", label: "Beschreibung", ui: { component: "textarea" } }
            ]
          },
          {
            type: "object",
            name: "cta",
            label: "Abschluss CTA",
            fields: [
              { type: "string", name: "title", label: "Titel", required: true },
              { type: "string", name: "description", label: "Beschreibung", ui: { component: "textarea" } },
              { type: "string", name: "buttonText", label: "Button Text" },
              { type: "string", name: "email", label: "E-Mail" }
            ]
          }
        ]
      },
      // Contact Page Collection (Single Document)
      {
        name: "contactPage",
        label: "Kontakt Seite",
        path: "content/contact",
        format: "json",
        ui: {
          allowedActions: {
            create: false,
            delete: false
          }
        },
        fields: [
          {
            type: "object",
            name: "seo",
            label: "SEO",
            fields: [
              { type: "string", name: "title", label: "Seitentitel", required: true },
              { type: "string", name: "description", label: "Beschreibung", ui: { component: "textarea" } }
            ]
          },
          { type: "string", name: "title", label: "Titel", required: true },
          { type: "string", name: "description", label: "Beschreibung", ui: { component: "textarea" } },
          {
            type: "object",
            name: "address",
            label: "Adresse",
            fields: [
              { type: "string", name: "company", label: "Firmenname", required: true },
              { type: "string", name: "street", label: "Stra\xDFe", required: true },
              { type: "string", name: "city", label: "Stadt", required: true },
              { type: "string", name: "zip", label: "PLZ", required: true }
            ]
          },
          { type: "string", name: "phone", label: "Telefon", required: true },
          { type: "string", name: "fax", label: "Fax" },
          { type: "string", name: "email", label: "E-Mail", required: true },
          { type: "string", name: "website", label: "Website" },
          { type: "string", name: "facebook", label: "Facebook URL" },
          {
            type: "object",
            name: "officeHours",
            label: "B\xFCro \xD6ffnungszeiten",
            fields: [
              { type: "string", name: "weekdays", label: "Mo-Fr", required: true }
            ]
          },
          {
            type: "object",
            name: "repairHours",
            label: "Reparaturplanung \xD6ffnungszeiten",
            fields: [
              { type: "string", name: "tueThu", label: "Di-Do", required: true },
              { type: "string", name: "fri", label: "Fr", required: true }
            ]
          }
        ]
      },
      // Settings (Global Config)
      {
        name: "settings",
        label: "Einstellungen",
        path: "content/globals",
        format: "json",
        match: {
          include: "**/settings"
        },
        fields: [
          { type: "string", name: "siteName", label: "Website Name", required: true },
          { type: "string", name: "siteDescription", label: "Website Beschreibung" },
          { type: "image", name: "favicon", label: "Favicon" },
          { type: "image", name: "logo", label: "Logo" },
          { type: "image", name: "defaultOgImage", label: "Standard OG Bild" },
          { type: "string", name: "gtmId", label: "Google Tag Manager ID" },
          { type: "string", name: "gaId", label: "Google Analytics ID" },
          { type: "string", name: "sentryDsn", label: "Sentry DSN" }
        ]
      },
      // Navigation
      {
        name: "navigation",
        label: "Navigation",
        path: "content/globals",
        format: "json",
        match: {
          include: "**/navigation"
        },
        fields: [
          { type: "image", name: "logo", label: "Logo" },
          {
            type: "object",
            list: true,
            name: "items",
            label: "Men\xFCpunkte",
            fields: [
              { type: "string", name: "label", label: "Bezeichnung", required: true },
              { type: "string", name: "href", label: "Link", required: true }
            ]
          }
        ]
      },
      // Footer
      {
        name: "footer",
        label: "Footer",
        path: "content/globals",
        format: "json",
        match: {
          include: "**/footer"
        },
        fields: [
          { type: "string", name: "copyright", label: "Copyright Text" },
          {
            type: "object",
            list: true,
            name: "links",
            label: "Links",
            fields: [
              { type: "string", name: "label", label: "Bezeichnung", required: true },
              { type: "string", name: "href", label: "Link", required: true }
            ]
          },
          {
            type: "object",
            list: true,
            name: "social",
            label: "Social Media",
            fields: [
              { type: "string", name: "platform", label: "Platform", required: true },
              { type: "string", name: "url", label: "URL", required: true }
            ]
          }
        ]
      }
    ]
  }
});
export {
  config_default as default
};
