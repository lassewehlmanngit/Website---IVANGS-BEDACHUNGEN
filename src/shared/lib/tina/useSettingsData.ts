import { useTina } from 'tinacms/dist/react';
import { client } from './client';
import { useEffect, useState } from 'react';

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
  const relativePath = 'de/settings.json';
  const [payload, setPayload] = useState<TinaPayload | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      // Try to fetch from TinaCMS client first
      if (client) {
        try {
          const response = await client.queries.settings({ relativePath });
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
        const response = await fetch('/content/globals/de/settings.json');
        const jsonData = await response.json();
        setPayload({
          data: { settings: jsonData },
          query: SETTINGS_QUERY,
          variables: { relativePath },
        });
      } catch (error) {
        console.error('Error loading static settings data:', error);
        // Last resort: empty structure
        setPayload({
          data: { settings: null },
          query: SETTINGS_QUERY,
          variables: { relativePath },
        });
      }
      setIsLoading(false);
    };

    loadData();
  }, [relativePath]);

  // Pass the fetched data to useTina for visual editing
  const { data } = useTina({
    query: payload?.query || SETTINGS_QUERY,
    variables: payload?.variables || { relativePath },
    data: payload?.data || { settings: null },
  });

  return { data, isLoading };
}
