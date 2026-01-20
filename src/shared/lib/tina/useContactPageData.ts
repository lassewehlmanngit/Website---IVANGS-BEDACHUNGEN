import { useTina } from 'tinacms/dist/react';
import { client } from './client';
import type { SupportedLang } from '@/shared/config/i18n';
import { useEffect, useState } from 'react';

// Fallback query for contact page - used when client response doesn't include query
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

interface TinaPayload {
  data: any;
  query: string;
  variables: Record<string, any>;
}

export function useContactPageData(lang: SupportedLang) {
  const relativePath = 'kontakt.json';
  const [payload, setPayload] = useState<TinaPayload | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Skip fetching if TinaCMS client is not available
    if (!client) {
      setPayload(null);
      setIsLoading(false);
      return;
    }

    // Fetch initial data using Tina client - keep full response for metadata
    client.queries.contactPage({ relativePath })
      .then((response) => {
        setPayload({
          data: response.data,
          query: response.query,
          variables: response.variables,
        });
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching contact page data:', error);
        setPayload(null);
        setIsLoading(false);
      });
  }, [relativePath]);

  // Pass the fetched data to useTina for visual editing
  const { data } = useTina({
    query: payload?.query || CONTACT_PAGE_QUERY,
    variables: payload?.variables || { relativePath },
    data: payload?.data || { contactPage: null },
  });

  return { data, isLoading };
}
