import { useTina } from 'tinacms/dist/react';
import { client } from './client';
import type { SupportedLang } from '@/shared/config/i18n';
import { useEffect, useState, useMemo } from 'react';

// Default query for contact page - must match the TinaCMS schema
const CONTACT_PAGE_QUERY = `
  query ContactPageQuery($relativePath: String!) {
    contactPage(relativePath: $relativePath) {
      _sys { filename }
      seo { title description }
      title description
      address { company street city zip }
      phone fax email website facebook
      officeHours { weekdays }
      repairHours { tueThu fri }
    }
  }
`;

export function useContactPageData(lang: SupportedLang) {
  const relativePath = 'kontakt.json';
  const variables = useMemo(() => ({ relativePath }), [relativePath]);
  const [initialData, setInitialData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Skip fetching if TinaCMS client is not available
    if (!client) {
      setInitialData(null);
      setIsLoading(false);
      return;
    }

    // Fetch initial data using Tina client
    client.queries.contactPage({ relativePath })
      .then((response) => {
        setInitialData(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching contact page data:', error);
        setInitialData(null);
        setIsLoading(false);
      });
  }, [relativePath]);

  // Pass the fetched data to useTina for visual editing
  const { data } = useTina({
    query: CONTACT_PAGE_QUERY,
    variables,
    data: initialData || { contactPage: null },
  });

  return { data, isLoading };
}
