import * as fs from 'fs';
import * as path from 'path';

interface SitemapUrl {
  loc: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

// German-only site
const LANG = 'de';

// Service IDs for service detail pages
const SERVICE_IDS = ['steildach', 'flachdach', 'solar', 'fenster', 'sanierung'];

async function generateSitemap() {
  const baseUrl = process.env.VITE_BASE_URL || 'https://ivangs-bedachungen.de';
  const outputPath = path.join(process.cwd(), 'public', 'sitemap.xml');

  const urls: SitemapUrl[] = [];

  // 1. Home
  urls.push({
    loc: `${baseUrl}/${LANG}`,
    changefreq: 'daily',
    priority: 1.0,
  });

  // 2. Main pages
  const mainPages = [
    { slug: 'about', priority: 0.8 },
    { slug: 'contact', priority: 0.9 },
    { slug: 'career', priority: 0.7 },
  ];

  for (const page of mainPages) {
    urls.push({
      loc: `${baseUrl}/${LANG}/${page.slug}`,
      changefreq: 'weekly',
      priority: page.priority,
    });
  }

  // 3. Service detail pages
  for (const serviceId of SERVICE_IDS) {
    urls.push({
      loc: `${baseUrl}/${LANG}/services/${serviceId}`,
      changefreq: 'weekly',
      priority: 0.8,
    });
  }

  // 4. Legal pages
  const legalPages = ['imprint', 'privacy', 'terms', 'cookies'];
  for (const page of legalPages) {
    urls.push({
      loc: `${baseUrl}/${LANG}/${page}`,
      changefreq: 'monthly',
      priority: 0.3,
    });
  }

  const now = new Date().toISOString().split('T')[0];
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod || now}</lastmod>
    <changefreq>${url.changefreq || 'weekly'}</changefreq>
    <priority>${url.priority ?? 0.5}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>`;

  fs.writeFileSync(outputPath, xml, 'utf-8');
  console.log(`✅ Sitemap generated: ${urls.length} URLs written to ${outputPath}`);
}

const isMainModule = import.meta.url === `file://${process.argv[1]}` || process.argv[1]?.endsWith('generate-sitemap.ts');
if (isMainModule) {
  generateSitemap().catch((e) => {
    console.error(e);
    process.exit(1);
  });
}

export { generateSitemap };
