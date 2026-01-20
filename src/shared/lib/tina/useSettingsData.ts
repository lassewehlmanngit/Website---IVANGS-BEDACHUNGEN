import { client } from './client';
import { useTinaOptional } from './useTinaOptional';
import { useEffect, useState, useMemo } from 'react';

// Stable constants defined outside the component
const RELATIVE_PATH = 'settings.json';
const EMPTY_DATA = { settings: null };
const DEFAULT_VARIABLES = { relativePath: RELATIVE_PATH };

// Fallback query for settings
const SETTINGS_QUERY = `
  query SettingsQuery($relativePath: String!) {
    settings(relativePath: $relativePath) {
      _sys { filename }
      siteName
      siteDescription
      cookieBanner {
        message
        privacyLinkText
        cookieLinkText
        rejectButtonText
        acceptButtonText
      }
      notFoundPage {
        title
        description
        buttonText
      }
    }
  }
`;

interface TinaPayload {
  data: any;
  query: string;
  variables: Record<string, any>;
}

export function useSettingsData() {
  const [payload, setPayload] = useState<TinaPayload | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      // Try to fetch from TinaCMS client first
      if (client) {
        try {
          const response = await client.queries.settings({ relativePath: RELATIVE_PATH });
          setPayload({
            data: response.data,
            query: response.query,
            variables: response.variables,
          });
          setIsLoading(false);
          return;
        } catch (error) {
          console.error('Error fetching settings data from TinaCMS:', error);
        }
      }

      // Fallback: Load from static JSON file
      try {
        const response = await fetch('/content/globals/settings.json');
        const jsonData = await response.json();
        setPayload({
          data: { settings: jsonData },
          query: SETTINGS_QUERY,
          variables: DEFAULT_VARIABLES,
        });
      } catch (error) {
        console.error('Error loading static settings data:', error);
        // Last resort: empty structure
        setPayload({
          data: EMPTY_DATA,
          query: SETTINGS_QUERY,
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
    query: payload?.query || SETTINGS_QUERY,
    variables: tinaVariables,
    data: tinaData,
  });

  return { data, isLoading };
}
