import { useTina } from 'tinacms/dist/react';
import { client } from './client';
import type { SupportedLang } from '@/shared/config/i18n';
import { useEffect, useState, useMemo } from 'react';

// Default query for about page - must match the TinaCMS schema
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

export function useAboutPageData(lang: SupportedLang) {
  const relativePath = 'ueber-uns.json';
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
    client.queries.aboutPage({ relativePath })
      .then((response) => {
        setInitialData(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching about page data:', error);
        setInitialData(null);
        setIsLoading(false);
      });
  }, [relativePath]);

  // Pass the fetched data to useTina for visual editing
  const { data } = useTina({
    query: ABOUT_PAGE_QUERY,
    variables,
    data: initialData || { aboutPage: null },
  });

  return { data, isLoading };
}
