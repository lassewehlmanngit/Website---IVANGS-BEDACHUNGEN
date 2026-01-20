import { client } from './client';
import { useTinaOptional } from './useTinaOptional';
import type { SupportedLang } from '@/shared/config/i18n';
import { useEffect, useState, useMemo } from 'react';

// Stable constants defined outside the component to prevent re-creation
const RELATIVE_PATH = 'startseite.json';
const EMPTY_DATA = { homePage: null };
const DEFAULT_VARIABLES = { relativePath: RELATIVE_PATH };

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
      servicesEyebrow servicesTitle servicesDescription
      ceoQuote { eyebrow name role quote text image buttonText buttonLink }
      projects { title description image }
      trustIndicators {
        eyebrow title description image
        items { title description icon }
      }
      projectsEyebrow projectsTitle
      faqTitle faqDescription
      faq { question answer }
      faqCTA { title description phone buttonText buttonLink }
      finalCTA { title description buttonText buttonLink }
    }
  }
`;

interface TinaPayload {
  data: any;
  query: string;
  variables: Record<string, any>;
}

export function useHomePageData(_lang: SupportedLang) {
  const [payload, setPayload] = useState<TinaPayload | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      // Try to fetch from TinaCMS client first
      if (client) {
        try {
          const response = await client.queries.homePage({ relativePath: RELATIVE_PATH });
          setPayload({
            data: response.data,
            query: response.query,
            variables: response.variables,
          });
          setIsLoading(false);
          return;
        } catch (error) {
          console.error('Error fetching home page data from TinaCMS:', error);
        }
      }

      // Fallback: Load from static JSON file
      try {
        const response = await fetch('/content/home/startseite.json');
        const jsonData = await response.json();
        setPayload({
          data: { homePage: jsonData },
          query: HOME_PAGE_QUERY,
          variables: DEFAULT_VARIABLES,
        });
      } catch (error) {
        console.error('Error loading static home page data:', error);
        // Last resort: empty structure
        setPayload({
          data: EMPTY_DATA,
          query: HOME_PAGE_QUERY,
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
  // Only enables live subscriptions when inside TinaCMS admin iframe
  const { data } = useTinaOptional({
    query: payload?.query || HOME_PAGE_QUERY,
    variables: tinaVariables,
    data: tinaData,
  });

  return { data, isLoading };
}
