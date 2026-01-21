import { client } from './client';
import { useGenericPage } from './useGenericPage';
import type { SupportedLang } from '@/shared/config/i18n';

// GraphQL query for About page singleton
const ABOUT_PAGE_QUERY = `
  query aboutPage($relativePath: String!) {
    aboutPage(relativePath: $relativePath) {
      _sys { filename }
      seo {
        title
        description
        ogImage
      }
      hero {
        eyebrow
        title
        description
      }
      story {
        title
        text1
        text2
        image
      }
      values {
        text
        icon
      }
      equipment {
        title
        description
      }
      teamSection {
        title
        description
      }
      cta {
        title
        description
        buttonText
        email
      }
    }
  }
`;

export function useAboutPageData(_lang: SupportedLang) {
  const relativePath = 'about.json';
  const fallbackPath = '/content/about/about.json';

  const { data, isLoading, error } = useGenericPage({
    query: ABOUT_PAGE_QUERY,
    variables: { relativePath },
    fallbackPath,
    clientQuery: (vars) => client.queries.aboutPage(vars),
    transformFallback: (jsonData) => ({ aboutPage: jsonData }),
  });

  return { data, isLoading, error };
}
