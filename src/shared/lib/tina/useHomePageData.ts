import { useTina } from 'tinacms/dist/react';
import { client } from './client';
import type { SupportedLang } from '@/shared/config/i18n';
import { useEffect, useState } from 'react';

// Fallback query for home page - used when client response doesn't include query
const HOME_PAGE_QUERY = `
  query HomePageQuery($relativePath: String!) {
    homePage(relativePath: $relativePath) {
      _sys { filename }
      seo { title description }
      hero {
        eyebrow title subtitle description
        primaryButtonText primaryButtonLink
        secondaryButtonText secondaryButtonLink
        backgroundImage videoUrl showQuickForm
      }
      stats { value label icon }
      servicesSection { eyebrow title description }
      ceoQuote { eyebrow name role quote text image buttonText buttonLink }
      projects { title description image }
      finalCTA { title description buttonText buttonLink }
    }
  }
`;

interface TinaPayload {
  data: any;
  query: string;
  variables: Record<string, any>;
}

export function useHomePageData(lang: SupportedLang) {
  const relativePath = 'startseite.json';
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
    client.queries.homePage({ relativePath })
      .then((response) => {
        // Store the full response including query and variables for useTina
        setPayload({
          data: response.data,
          query: response.query,
          variables: response.variables,
        });
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching home page data:', error);
        setPayload(null);
        setIsLoading(false);
      });
  }, [relativePath]);

  // Pass the fetched data to useTina for visual editing
  // useTina adds _content_source metadata needed for tinaField to work
  const { data } = useTina({
    query: payload?.query || HOME_PAGE_QUERY,
    variables: payload?.variables || { relativePath },
    data: payload?.data || { homePage: null },
  });

  return { data, isLoading };
}
