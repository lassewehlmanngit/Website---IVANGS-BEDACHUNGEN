import { client } from './client';
import { useGenericPage } from './useGenericPage';
import type { SupportedLang } from '@/shared/config/i18n';

// Stable constants
const RELATIVE_PATH = 'kontakt.json';
const FALLBACK_PATH = '/content/contact/kontakt.json';

// GraphQL query for global contact data
const CONTACT_PAGE_QUERY = `
  query ContactPageQuery($relativePath: String!) {
    contactPage(relativePath: $relativePath) {
      _sys { filename }
      seo { title description }
      title
      description
      address { company street city zip }
      phone
      fax
      email
      website
      facebook
      officeHours { weekdays }
      repairHours { tueThu fri }
    }
  }
`;

export function useContactPageData(_lang: SupportedLang) {
  const { data, isLoading, error } = useGenericPage({
    query: CONTACT_PAGE_QUERY,
    variables: { relativePath: RELATIVE_PATH },
    fallbackPath: FALLBACK_PATH,
    clientQuery: (vars) => client.queries.contactPage(vars),
    transformFallback: (jsonData) => ({ contactPage: jsonData }),
  });

  return { data, isLoading, error };
}
