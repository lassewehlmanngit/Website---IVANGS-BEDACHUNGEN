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
      {
        name: "page",
        label: "Pages",
        path: "content/pages",
        format: "md",
        ui: {
          filename: {
            slugify: (values) => {
              const raw = typeof values?.title === "string" ? values.title : "page";
              return raw.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
            }
          }
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true
          },
          {
            type: "string",
            name: "description",
            label: "Description"
          },
          {
            type: "image",
            name: "featuredImage",
            label: "Featured Image"
          },
          {
            type: "boolean",
            name: "draft",
            label: "Draft",
            description: "If enabled, this page will not be published"
          },
          {
            type: "object",
            list: true,
            name: "blocks",
            label: "Sections",
            templates: [
              {
                name: "hero",
                label: "Hero",
                fields: [
                  { type: "string", name: "title", label: "Title" },
                  { type: "string", name: "description", label: "Description", ui: { component: "textarea" } },
                  {
                    type: "object",
                    name: "actions",
                    label: "Actions",
                    list: true,
                    fields: [
                      { type: "string", name: "label", label: "Label" },
                      { type: "string", name: "href", label: "Link" },
                      {
                        type: "string",
                        name: "variant",
                        label: "Variant",
                        options: ["primary", "secondary", "outline", "ghost"]
                      }
                    ]
                  },
                  { type: "image", name: "image", label: "Image" }
                ]
              },
              {
                name: "features",
                label: "Features",
                fields: [
                  { type: "string", name: "title", label: "Title" },
                  { type: "string", name: "description", label: "Description", ui: { component: "textarea" } },
                  {
                    type: "object",
                    name: "items",
                    label: "Feature Items",
                    list: true,
                    fields: [
                      { type: "string", name: "title", label: "Title" },
                      { type: "string", name: "description", label: "Description" },
                      { type: "string", name: "icon", label: "Icon (Lucide Name)" }
                    ]
                  }
                ]
              },
              {
                name: "testimonial",
                label: "Testimonial",
                fields: [
                  { type: "string", name: "quote", label: "Quote", ui: { component: "textarea" } },
                  { type: "string", name: "author", label: "Author" },
                  { type: "string", name: "role", label: "Role" }
                ]
              },
              {
                name: "contact",
                label: "Contact Form",
                fields: [
                  { type: "string", name: "title", label: "Title" },
                  { type: "string", name: "description", label: "Description" }
                ]
              },
              {
                name: "content",
                label: "Rich Text",
                fields: [{ type: "rich-text", name: "body", label: "Body" }]
              }
            ]
          }
        ]
      },
      {
        name: "service",
        label: "Services",
        path: "content/services",
        format: "md",
        ui: {
          filename: {
            slugify: (values) => {
              const raw = typeof values?.title === "string" ? values.title : "service";
              return raw.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
            }
          }
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true
          },
          {
            type: "string",
            name: "description",
            label: "Description",
            ui: { component: "textarea" }
          },
          {
            type: "image",
            name: "image",
            label: "Cover Image"
          },
          {
            type: "string",
            name: "icon",
            label: "Icon (Lucide Name)"
          },
          {
            type: "object",
            name: "checkpoints",
            label: "Feature Checkpoints",
            list: true,
            fields: [
              { type: "string", name: "text", label: "Text" }
            ]
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true
          }
        ]
      },
      // Globals: navigation
      {
        name: "navigation",
        label: "Navigation",
        path: "content/globals",
        format: "json",
        match: {
          include: "**/navigation"
        },
        fields: [
          {
            type: "string",
            name: "logo",
            label: "Logo Path"
          },
          {
            type: "object",
            name: "items",
            label: "Nav Items",
            list: true,
            fields: [
              { type: "string", name: "label", label: "Label", required: true },
              { type: "string", name: "href", label: "Link", required: true }
            ]
          }
        ]
      },
      // Globals: footer
      {
        name: "footer",
        label: "Footer",
        path: "content/globals",
        format: "json",
        match: {
          include: "**/footer"
        },
        fields: [
          {
            type: "string",
            name: "copyright",
            label: "Copyright Text"
          },
          {
            type: "object",
            name: "links",
            label: "Footer Links",
            list: true,
            fields: [
              { type: "string", name: "label", label: "Label", required: true },
              { type: "string", name: "href", label: "Link", required: true }
            ]
          },
          {
            type: "object",
            name: "social",
            label: "Social Links",
            list: true,
            fields: [
              { type: "string", name: "platform", label: "Platform", required: true },
              { type: "string", name: "url", label: "URL", required: true }
            ]
          }
        ]
      },
      // Globals: settings
      {
        name: "settings",
        label: "Site Settings",
        path: "content/globals",
        format: "json",
        match: {
          include: "**/settings"
        },
        fields: [
          { type: "string", name: "siteName", label: "Site Name", required: true },
          { type: "string", name: "siteDescription", label: "Site Description" },
          { type: "image", name: "favicon", label: "Favicon (SVG or PNG)" },
          { type: "image", name: "logo", label: "Site Logo" },
          { type: "image", name: "defaultOgImage", label: "Default OG Image" },
          { type: "string", name: "gtmId", label: "Google Tag Manager ID" },
          { type: "string", name: "gaId", label: "Google Analytics ID" },
          { type: "string", name: "sentryDsn", label: "Sentry DSN" },
          {
            type: "object",
            name: "hero",
            label: "Homepage Hero Settings",
            fields: [
              {
                type: "string",
                name: "mediaType",
                label: "Background Type",
                options: ["video", "image"]
              },
              { type: "image", name: "backgroundImage", label: "Background Image" },
              { type: "string", name: "videoUrl", label: "Video URL" },
              { type: "boolean", name: "showQuickForm", label: "Show Quick Inquiry Form" }
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
