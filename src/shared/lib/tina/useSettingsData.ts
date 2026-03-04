import { client } from './client';
import { useTinaOptional } from './useTinaOptional';
import { useEffect, useState, useMemo } from 'react';
import defaultSettingsData from '@content/globals/settings.json';

// Stable constants defined outside the component
const RELATIVE_PATH = 'settings.json';
const EMPTY_DATA = { settings: defaultSettingsData };
const DEFAULT_VARIABLES = { relativePath: RELATIVE_PATH };

const SETTINGS_QUERY = `
  query settings($relativePath: String!) {
    settings(relativePath: $relativePath) {
      _sys { filename }
      siteName
      siteDescription
      favicon
      logo
      defaultOgImage
      gtmId
      gaId
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

const settingsCache: { payload: TinaPayload | null; timestamp: number } = {
  payload: { data: { settings: defaultSettingsData }, query: SETTINGS_QUERY, variables: DEFAULT_VARIABLES },
  timestamp: Date.now()
};
const CACHE_TTL = 5 * 60 * 1000;

export function useSettingsData() {
  const isCacheValid = settingsCache.payload !== null && (Date.now() - settingsCache.timestamp < CACHE_TTL);

  const [payload, setPayload] = useState<TinaPayload | null>(isCacheValid ? settingsCache.payload : { data: { settings: defaultSettingsData }, query: SETTINGS_QUERY, variables: DEFAULT_VARIABLES });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isCacheValid) return;

    const loadData = async () => {
      // Try to fetch from TinaCMS client first
      if (client) {
        try {
          const response = await client.queries.settings({ relativePath: RELATIVE_PATH });
          const newPayload = {
            data: response.data,
            query: response.query,
            variables: response.variables,
          };
          settingsCache.payload = newPayload;
          settingsCache.timestamp = Date.now();
          setPayload(newPayload);
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
        const newPayload = {
          data: { settings: jsonData },
          query: SETTINGS_QUERY,
          variables: DEFAULT_VARIABLES,
        };
        settingsCache.payload = newPayload;
        settingsCache.timestamp = Date.now();
        setPayload(newPayload);
      } catch (error) {
        console.error('Error loading static settings data:', error);
        // Last resort: empty structure
        const newPayload = {
          data: EMPTY_DATA,
          query: SETTINGS_QUERY,
          variables: DEFAULT_VARIABLES,
        };
        settingsCache.payload = newPayload;
        settingsCache.timestamp = Date.now();
        setPayload(newPayload);
      }
      setIsLoading(false);
    };

    loadData();
  }, [isCacheValid]);

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
