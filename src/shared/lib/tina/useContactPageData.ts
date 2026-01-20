import { useTina } from 'tinacms/dist/react';
import { client } from './client';
import type { SupportedLang } from '@/shared/config/i18n';
import { useEffect, useState } from 'react';

export function useContactPageData(lang: SupportedLang) {
  const relativePath = 'kontakt.json';
  const [payload, setPayload] = useState<any>(null);

  useEffect(() => {
    // Fetch initial data using Tina client
    client.queries.contactPage({ relativePath })
      .then((response) => {
        setPayload(response);
      })
      .catch((error) => {
        console.error('Error fetching contact page data:', error);
        setPayload({ data: null, query: '', variables: { relativePath } });
      });
  }, [relativePath]);

  // Pass the fetched data to useTina for visual editing
  return useTina({
    query: payload?.query || '',
    variables: payload?.variables || { relativePath },
    data: payload?.data || null,
  });
}
