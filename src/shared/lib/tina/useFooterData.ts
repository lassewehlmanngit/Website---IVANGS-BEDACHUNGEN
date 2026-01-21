import { client } from './client';
import { useTinaOptional } from './useTinaOptional';
import { useEffect, useState, useMemo } from 'react';
import type { SupportedLang } from '@/shared/config/i18n';

// Stable constants defined outside the component
const RELATIVE_PATH = 'footer.json';
const EMPTY_DATA = { footer: { links: [], social: [] } };
const DEFAULT_VARIABLES = { relativePath: RELATIVE_PATH };

const FOOTER_QUERY = `
  query footer($relativePath: String!) {
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
  const [payload, setPayload] = useState<TinaPayload | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      // Try to fetch from TinaCMS client first
      if (client) {
        try {
          const response = await client.queries.footer({ relativePath: RELATIVE_PATH });
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
          variables: DEFAULT_VARIABLES,
        });
      } catch (error) {
        console.error('Error loading static footer data:', error);
        // Last resort: empty structure
        setPayload({
          data: EMPTY_DATA,
          query: FOOTER_QUERY,
          variables: DEFAULT_VARIABLES,
        });
      }
      setIsLoading(false);
    };

    loadData();
  }, []);

  // Memoize the variables to ensure stability
  const tinaVariables = useMemo(() => {
    return payload?.variables || DEFAULT_VARIABLES;
  }, [payload?.variables]);

  // Memoize the data structure
  const tinaData = useMemo(() => {
    return payload?.data || EMPTY_DATA;
  }, [payload?.data]);

  // Pass the fetched data to useTinaOptional for visual editing
  const { data } = useTinaOptional({
    query: payload?.query || FOOTER_QUERY,
    variables: tinaVariables,
    data: tinaData,
  });

  return { data, isLoading };
}
