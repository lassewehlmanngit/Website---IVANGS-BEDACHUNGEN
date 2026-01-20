import { client } from './client';
import { useTinaOptional } from './useTinaOptional';
import type { SupportedLang } from '@/shared/config/i18n';
import { useEffect, useState } from 'react';

// Fallback query for career page
const CAREER_PAGE_QUERY = `
  query CareerPageQuery($relativePath: String!) {
    careerPage(relativePath: $relativePath) {
      _sys { filename }
      seo { title description }
      hero {
        eyebrow
        title
        description
        backgroundImage
      }
      jobsSection {
        title
        emptyMessage
      }
      wizardSection {
        title
        description
      }
    }
  }
`;

interface TinaPayload {
  data: any;
  query: string;
  variables: Record<string, any>;
}

export function useCareerPageData(lang: SupportedLang) {
  const relativePath = 'karriere.json';
  const [payload, setPayload] = useState<TinaPayload | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      // Try to fetch from TinaCMS client first
      if (client) {
        try {
          const response = await client.queries.careerPage({ relativePath });
          setPayload({
            data: response.data,
            query: response.query,
            variables: response.variables,
          });
          setIsLoading(false);
          return;
        } catch (error) {
          console.error('Error fetching career page data from TinaCMS:', error);
        }
      }

      // Fallback: Load from static JSON file
      try {
        const response = await fetch('/content/career/karriere.json');
        const jsonData = await response.json();
        setPayload({
          data: { careerPage: jsonData },
          query: CAREER_PAGE_QUERY,
          variables: { relativePath },
        });
      } catch (error) {
        console.error('Error loading static career page data:', error);
        // Last resort: empty structure
        setPayload({
          data: { careerPage: null },
          query: CAREER_PAGE_QUERY,
          variables: { relativePath },
        });
      }
      setIsLoading(false);
    };

    loadData();
  }, [relativePath]);

  // Pass the fetched data to useTinaOptional for visual editing
  const { data } = useTinaOptional({
    query: payload?.query || CAREER_PAGE_QUERY,
    variables: payload?.variables || { relativePath },
    data: payload?.data || { careerPage: null },
  });

  return { data, isLoading };
}
