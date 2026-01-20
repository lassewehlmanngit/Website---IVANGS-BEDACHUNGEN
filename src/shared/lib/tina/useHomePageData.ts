import { useTina } from 'tinacms/dist/react';
import { client } from './client';
import type { SupportedLang } from '@/shared/config/i18n';
import { useEffect, useState, useMemo } from 'react';

// Default query for home page - must match the TinaCMS schema
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

export function useHomePageData(lang: SupportedLang) {
  const relativePath = 'startseite.json';
  const variables = useMemo(() => ({ relativePath }), [relativePath]);
  const [initialData, setInitialData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Skip fetching if TinaCMS client is not available
    if (!client) {
      setInitialData(null);
      setIsLoading(false);
      return;
    }

    // Fetch initial data using Tina client
    client.queries.homePage({ relativePath })
      .then((response) => {
        setInitialData(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching home page data:', error);
        setInitialData(null);
        setIsLoading(false);
      });
  }, [relativePath]);

  // Pass the fetched data to useTina for visual editing
  // The query must be provided even if data is null for the admin to set up the form
  const { data } = useTina({
    query: HOME_PAGE_QUERY,
    variables,
    data: initialData || { homePage: null },
  });

  return { data, isLoading };
}
