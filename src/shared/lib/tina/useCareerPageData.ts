import { client } from './client';
import { useGenericPage } from './useGenericPage';
import type { SupportedLang } from '@/shared/config/i18n';

// GraphQL query for Career page singleton
const CAREER_PAGE_QUERY = `
  query CareerPageQuery($relativePath: String!) {
    careerPage(relativePath: $relativePath) {
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
        backgroundImage
      }
      jobsSection {
        title
        emptyMessage
      }
      wizardSection {
        title
        description
      }
    }
  }
`;

export function useCareerPageData(_lang: SupportedLang) {
  const relativePath = 'career.json';
  const fallbackPath = '/content/career/career.json';

  const { data, isLoading, error } = useGenericPage({
    query: CAREER_PAGE_QUERY,
    variables: { relativePath },
    fallbackPath,
    clientQuery: (vars) => client.queries.careerPage(vars),
    transformFallback: (jsonData) => ({ careerPage: jsonData }),
  });

  return { data, isLoading, error };
}
