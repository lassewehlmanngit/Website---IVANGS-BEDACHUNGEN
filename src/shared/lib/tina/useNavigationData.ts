import { client } from './client';
import { useTinaOptional } from './useTinaOptional';
import { useEffect, useState, useMemo } from 'react';
import type { SupportedLang } from '@/shared/config/i18n';

// Stable constants defined outside the component
const RELATIVE_PATH = 'navigation.json';
const EMPTY_DATA = { navigation: { items: [] } };
const DEFAULT_VARIABLES = { relativePath: RELATIVE_PATH };

const NAVIGATION_QUERY = `
  query navigation($relativePath: String!) {
    navigation(relativePath: $relativePath) {
      logo
      items { label href }
      ctaButton { text link }
    }
  }
`;

interface TinaPayload {
  data: any;
  query: string;
  variables: Record<string, any>;
}

export function useNavigationData(_lang: SupportedLang) {
  const [payload, setPayload] = useState<TinaPayload | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      // Try to fetch from TinaCMS client first
      if (client) {
        try {
          const response = await client.queries.navigation({ relativePath: RELATIVE_PATH });
          setPayload({
            data: response.data,
            query: response.query,
            variables: response.variables,
          });
          setIsLoading(false);
          return;
        } catch (error) {
          console.error('Error fetching navigation from TinaCMS:', error);
        }
      }

      // Fallback: Load from static JSON file
      try {
        const response = await fetch('/content/globals/navigation.json');
        const jsonData = await response.json();
        setPayload({
          data: { navigation: jsonData },
          query: NAVIGATION_QUERY,
          variables: DEFAULT_VARIABLES,
        });
      } catch (error) {
        console.error('Error loading static navigation data:', error);
        // Last resort: empty structure
        setPayload({
          data: EMPTY_DATA,
          query: NAVIGATION_QUERY,
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
    query: payload?.query || NAVIGATION_QUERY,
    variables: tinaVariables,
    data: tinaData,
  });

  return { data, isLoading };
}
