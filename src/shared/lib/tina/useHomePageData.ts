import { client } from './client';
import { useGenericPage } from './useGenericPage';
import type { SupportedLang } from '@/shared/config/i18n';

// Stable constants
const RELATIVE_PATH = 'startseite.json';
const FALLBACK_PATH = '/content/home/startseite.json';

// Fallback query for home page - used when client response doesn't include query
// Matches the nested structure in tina/config.ts
const HOME_PAGE_QUERY = `
  query HomePageQuery($relativePath: String!) {
    homePage(relativePath: $relativePath) {
      _sys { filename }
      seo { title description }
      hero {
        eyebrow title subtitle description
        buttons { primaryText primaryLink secondaryText secondaryLink }
        backgroundImage videoUrl showQuickForm
      }
      quickForm {
        title nameLabel contactLabel buttonText disclaimer
      }
      stats { value label icon }
      servicesSection {
        eyebrow title description
      }
      ceoQuote { eyebrow name role quote text image buttonText buttonLink }
      projectsSection {
        eyebrow title
        items { title description image }
      }
      trustIndicators {
        eyebrow title description image
        items { title description icon }
      }
      faqSection {
        title description
        questions { question answer }
        cta { title description phone buttonText buttonLink }
      }
      finalCTA { title description buttonText buttonLink }
    }
  }
`;

export function useHomePageData(_lang: SupportedLang) {
  const { data, isLoading } = useGenericPage({
    query: HOME_PAGE_QUERY,
    variables: { relativePath: RELATIVE_PATH },
    fallbackPath: FALLBACK_PATH,
    clientQuery: (vars) => client.queries.homePage(vars),
    transformFallback: (jsonData) => ({ homePage: jsonData }),
  });

  return { data, isLoading };
}
