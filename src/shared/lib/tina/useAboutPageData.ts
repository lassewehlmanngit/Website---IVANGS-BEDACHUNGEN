import { client } from './client';
import { useTinaOptional } from './useTinaOptional';
import type { SupportedLang } from '@/shared/config/i18n';
import { useEffect, useState } from 'react';

// Fallback query for about page - used when client response doesn't include query
const ABOUT_PAGE_QUERY = `
  query AboutPageQuery($relativePath: String!) {
    aboutPage(relativePath: $relativePath) {
      _sys { filename }
      seo { title description }
      hero { eyebrow title description }
      story { title text1 text2 image }
      values { text }
      equipment { title description }
      teamSection { title description }
      cta { title description buttonText email }
    }
  }
`;

interface TinaPayload {
  data: any;
  query: string;
  variables: Record<string, any>;
}

export function useAboutPageData(lang: SupportedLang) {
  const relativePath = 'ueber-uns.json';
  const [payload, setPayload] = useState<TinaPayload | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      // Try to fetch from TinaCMS client first
      if (client) {
        try {
          const response = await client.queries.aboutPage({ relativePath });
          setPayload({
            data: response.data,
            query: response.query,
            variables: response.variables,
          });
          setIsLoading(false);
          return;
        } catch (error) {
          console.error('Error fetching about page data from TinaCMS:', error);
        }
      }

      // Fallback: Load from static JSON file
      try {
        const response = await fetch('/content/about/ueber-uns.json');
        const jsonData = await response.json();
        setPayload({
          data: { aboutPage: jsonData },
          query: ABOUT_PAGE_QUERY,
          variables: { relativePath },
        });
      } catch (error) {
        console.error('Error loading static about page data:', error);
        // Last resort: empty structure
        setPayload({
          data: { aboutPage: null },
          query: ABOUT_PAGE_QUERY,
          variables: { relativePath },
        });
      }
      setIsLoading(false);
    };

    loadData();
  }, [relativePath]);

  // Pass the fetched data to useTinaOptional for visual editing
  const { data } = useTinaOptional({
    query: payload?.query || ABOUT_PAGE_QUERY,
    variables: payload?.variables || { relativePath },
    data: payload?.data || { aboutPage: null },
  });

  return { data, isLoading };
}
