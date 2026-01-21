import { client } from './client';
import { useTinaOptional } from './useTinaOptional';
import type { SupportedLang } from '@/shared/config/i18n';
import { useEffect, useState, useMemo } from 'react';

const EMPTY_DATA = { page: null };

// GraphQL query for page builder pages
const PAGE_QUERY = `
  query PageQuery($relativePath: String!) {
    page(relativePath: $relativePath) {
      _sys { filename }
      title
      slug
      seo {
        title
        description
        ogImage
      }
      blocks {
        ... on PageBlocksHero {
          __typename
          eyebrow
          title
          subtitle
          description
          primaryButton { text link variant }
          secondaryButton { text link variant }
          backgroundImage
          variant
        }
        ... on PageBlocksContent {
          __typename
          eyebrow
          title
          body
          image
          imagePosition
        }
        ... on PageBlocksStory {
          __typename
          title
          text1
          text2
          image
          highlights { text icon }
        }
        ... on PageBlocksFeatures {
          __typename
          eyebrow
          title
          description
          items { icon title description }
          columns
        }
        ... on PageBlocksEquipment {
          __typename
          icon
          title
          description
        }
        ... on PageBlocksTeamGrid {
          __typename
          title
          description
          categories
          showEmail
        }
        ... on PageBlocksJobsList {
          __typename
          title
          emptyMessage
        }
        ... on PageBlocksForm {
          __typename
          title
          description
          formType
          submitButtonText
          successMessage
        }
        ... on PageBlocksContactInfo {
          __typename
          title
          description
          address { company street city zip }
          phone
          fax
          email
          website
          officeHours { weekdays }
          repairHours { tueThu fri }
        }
        ... on PageBlocksCta {
          __typename
          eyebrow
          title
          description
          button { text link variant }
          variant
        }
        ... on PageBlocksFaq {
          __typename
          title
          description
          questions { question answer }
        }
      }
    }
  }
`;

interface TinaPayload {
  data: any;
  query: string;
  variables: Record<string, any>;
}

export function usePageBuilderData(_lang: SupportedLang, slug: string) {
  const relativePath = `${slug}.json`;
  const defaultVariables = { relativePath };

  const [payload, setPayload] = useState<TinaPayload | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      setError(null);

      // Try to fetch from TinaCMS client first
      if (client) {
        try {
          const response = await client.queries.page({ relativePath });
          setPayload({
            data: response.data,
            query: response.query,
            variables: response.variables,
          });
          setIsLoading(false);
          return;
        } catch (err) {
          console.error(`Error fetching page "${slug}" from TinaCMS:`, err);
        }
      }

      // Fallback: Load from static JSON file
      try {
        const response = await fetch(`/content/pages/${relativePath}`);
        if (!response.ok) {
          throw new Error(`Page not found: ${slug}`);
        }
        const jsonData = await response.json();
        setPayload({
          data: { page: jsonData },
          query: PAGE_QUERY,
          variables: defaultVariables,
        });
      } catch (err: any) {
        console.error('Error loading static page data:', err);
        setError(err.message || 'Failed to load page');
        // Last resort: empty structure
        setPayload({
          data: EMPTY_DATA,
          query: PAGE_QUERY,
          variables: defaultVariables,
        });
      }
      setIsLoading(false);
    };

    loadData();
  }, [slug, relativePath]);

  // Memoize the variables to ensure stability
  const tinaVariables = useMemo(() => {
    return payload?.variables || defaultVariables;
  }, [payload?.variables, defaultVariables]);

  // Memoize the data structure
  const tinaData = useMemo(() => {
    return payload?.data || EMPTY_DATA;
  }, [payload?.data]);

  // Pass the fetched data to useTinaOptional for visual editing
  const { data } = useTinaOptional({
    query: payload?.query || PAGE_QUERY,
    variables: tinaVariables,
    data: tinaData,
  });

  return { data, isLoading, error };
}
