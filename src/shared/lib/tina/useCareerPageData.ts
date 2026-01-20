import { client } from './client';
import { useTinaOptional } from './useTinaOptional';
import type { SupportedLang } from '@/shared/config/i18n';
import { useEffect, useState, useMemo } from 'react';

// Stable constants defined outside the component
const RELATIVE_PATH = 'karriere.json';
const EMPTY_DATA = { careerPage: null };
const DEFAULT_VARIABLES = { relativePath: RELATIVE_PATH };

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

export function useCareerPageData(_lang: SupportedLang) {
  const [payload, setPayload] = useState<TinaPayload | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      // Try to fetch from TinaCMS client first
      if (client) {
        try {
          const response = await client.queries.careerPage({ relativePath: RELATIVE_PATH });
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
          variables: DEFAULT_VARIABLES,
        });
      } catch (error) {
        console.error('Error loading static career page data:', error);
        // Last resort: empty structure
        setPayload({
          data: EMPTY_DATA,
          query: CAREER_PAGE_QUERY,
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
    query: payload?.query || CAREER_PAGE_QUERY,
    variables: tinaVariables,
    data: tinaData,
  });

  return { data, isLoading };
}
