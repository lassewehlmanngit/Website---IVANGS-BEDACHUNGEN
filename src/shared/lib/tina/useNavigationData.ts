import { useTina } from 'tinacms/dist/react';
import { client } from './client';
import { useEffect, useState } from 'react';
import type { SupportedLang } from '@/shared/config/i18n';

const NAVIGATION_QUERY = `
  query NavigationQuery($relativePath: String!) {
    navigation(relativePath: $relativePath) {
      logo
      items { label href }
    }
  }
`;

interface TinaPayload {
  data: any;
  query: string;
  variables: Record<string, any>;
}

export function useNavigationData(_lang: SupportedLang) {
  const relativePath = 'navigation.json';
  const [payload, setPayload] = useState<TinaPayload | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      // Try to fetch from TinaCMS client first
      if (client) {
        try {
          const response = await client.queries.navigation({ relativePath });
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
          variables: { relativePath },
        });
      } catch (error) {
        console.error('Error loading static navigation data:', error);
        // Last resort: empty structure
        setPayload({
          data: { navigation: { items: [] } },
          query: NAVIGATION_QUERY,
          variables: { relativePath },
        });
      }
      setIsLoading(false);
    };

    loadData();
  }, [relativePath]);

  // Pass the fetched data to useTina for visual editing
  const { data } = useTina({
    query: payload?.query || NAVIGATION_QUERY,
    variables: payload?.variables || { relativePath },
    data: payload?.data || { navigation: { items: [] } },
  });

  return { data, isLoading };
}
