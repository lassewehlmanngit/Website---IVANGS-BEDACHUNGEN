import { client } from './client';
import { useTinaOptional } from './useTinaOptional';
import { useEffect, useState } from 'react';
import type { SupportedLang } from '@/shared/config/i18n';

const FOOTER_QUERY = `
  query FooterQuery($relativePath: String!) {
    footer(relativePath: $relativePath) {
      copyright
      links { label href }
      social { platform url }
    }
  }
`;

interface TinaPayload {
  data: any;
  query: string;
  variables: Record<string, any>;
}

export function useFooterData(_lang: SupportedLang) {
  const relativePath = 'footer.json';
  const [payload, setPayload] = useState<TinaPayload | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      // Try to fetch from TinaCMS client first
      if (client) {
        try {
          const response = await client.queries.footer({ relativePath });
          setPayload({
            data: response.data,
            query: response.query,
            variables: response.variables,
          });
          setIsLoading(false);
          return;
        } catch (error) {
          console.error('Error fetching footer from TinaCMS:', error);
        }
      }

      // Fallback: Load from static JSON file
      try {
        const response = await fetch('/content/globals/footer.json');
        const jsonData = await response.json();
        setPayload({
          data: { footer: jsonData },
          query: FOOTER_QUERY,
          variables: { relativePath },
        });
      } catch (error) {
        console.error('Error loading static footer data:', error);
        // Last resort: empty structure
        setPayload({
          data: { footer: { links: [], social: [] } },
          query: FOOTER_QUERY,
          variables: { relativePath },
        });
      }
      setIsLoading(false);
    };

    loadData();
  }, [relativePath]);

  // Pass the fetched data to useTinaOptional for visual editing
  const { data } = useTinaOptional({
    query: payload?.query || FOOTER_QUERY,
    variables: payload?.variables || { relativePath },
    data: payload?.data || { footer: { links: [], social: [] } },
  });

  return { data, isLoading };
}
