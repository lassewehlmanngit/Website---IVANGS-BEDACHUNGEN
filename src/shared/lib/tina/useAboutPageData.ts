import { useTina } from 'tinacms/dist/react';
import { client } from './client';
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
    // Skip fetching if TinaCMS client is not available
    if (!client) {
      setPayload(null);
      setIsLoading(false);
      return;
    }

    // Fetch initial data using Tina client - keep full response for metadata
    client.queries.aboutPage({ relativePath })
      .then((response) => {
        setPayload({
          data: response.data,
          query: response.query,
          variables: response.variables,
        });
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching about page data:', error);
        setPayload(null);
        setIsLoading(false);
      });
  }, [relativePath]);

  // Pass the fetched data to useTina for visual editing
  const { data } = useTina({
    query: payload?.query || ABOUT_PAGE_QUERY,
    variables: payload?.variables || { relativePath },
    data: payload?.data || { aboutPage: null },
  });

  return { data, isLoading };
}
