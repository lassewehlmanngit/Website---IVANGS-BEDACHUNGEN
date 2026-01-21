import { client } from './client';
import { useGenericPage } from './useGenericPage';
import type { SupportedLang } from '@/shared/config/i18n';

// GraphQL query for Contact page singleton
const CONTACT_PAGE_QUERY = `
  query ContactPageQuery($relativePath: String!) {
    contactPage(relativePath: $relativePath) {
      _sys { filename }
      seo {
        title
        description
        ogImage
      }
      title
      description
      address {
        company
        street
        city
        zip
      }
      phone
      fax
      email
      website
      facebook
      officeHours {
        weekdays
      }
      repairHours {
        tueThu
        fri
      }
    }
  }
`;

export function useContactPageData(_lang: SupportedLang) {
  const relativePath = 'contact.json';
  const fallbackPath = '/content/contact/contact.json';

  const { data, isLoading, error } = useGenericPage({
    query: CONTACT_PAGE_QUERY,
    variables: { relativePath },
    fallbackPath,
    clientQuery: (vars) => client.queries.contactPage(vars),
    transformFallback: (jsonData) => ({ contactPage: jsonData }),
  });

  return { data, isLoading, error };
}
