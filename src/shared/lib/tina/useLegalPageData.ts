import { client } from './client';
import { useTinaOptional } from './useTinaOptional';
import { useEffect, useState, useMemo } from 'react';

// Stable constant for empty data
const EMPTY_DATA = { legalPage: null };

// Fallback query for legal page
const LEGAL_PAGE_QUERY = `
  query LegalPageQuery($relativePath: String!) {
    legalPage(relativePath: $relativePath) {
      _sys { filename }
      title
      description
      body
    }
  }
`;

interface TinaPayload {
  data: any;
  query: string;
  variables: Record<string, any>;
}

export function useLegalPageData(slug: string) {
  const relativePath = `${slug}.md`;
  const [payload, setPayload] = useState<TinaPayload | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Memoize the default variables based on slug
  const defaultVariables = useMemo(() => ({ relativePath }), [relativePath]);

  useEffect(() => {
    const loadData = async () => {
      // Try to fetch from TinaCMS client first
      if (client) {
        try {
          const response = await client.queries.legalPage({ relativePath });
          setPayload({
            data: response.data,
            query: response.query,
            variables: response.variables,
          });
          setIsLoading(false);
          return;
        } catch (error) {
          console.error('Error fetching legal page data from TinaCMS:', error);
        }
      }

      // Fallback: Load from static markdown file
      try {
        const response = await fetch(`/content/legal/${slug}.md`);
        const text = await response.text();
        
        // Simple frontmatter parsing
        const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
        const match = text.match(frontmatterRegex);
        
        if (match) {
          const frontmatter = match[1];
          const body = match[2];
          
          // Parse frontmatter
          const metadata: Record<string, string> = {};
          frontmatter.split('\n').forEach(line => {
            const colonIndex = line.indexOf(':');
            if (colonIndex > 0) {
              const key = line.substring(0, colonIndex).trim();
              const value = line.substring(colonIndex + 1).trim();
              metadata[key] = value;
            }
          });
          
          setPayload({
            data: { 
              legalPage: {
                title: metadata.title || '',
                description: metadata.description || '',
                body: body
              }
            },
            query: LEGAL_PAGE_QUERY,
            variables: { relativePath },
          });
        } else {
          setPayload({
            data: EMPTY_DATA,
            query: LEGAL_PAGE_QUERY,
            variables: { relativePath },
          });
        }
      } catch (error) {
        console.error('Error loading static legal page data:', error);
        setPayload({
          data: EMPTY_DATA,
          query: LEGAL_PAGE_QUERY,
          variables: { relativePath },
        });
      }
      setIsLoading(false);
    };

    loadData();
  }, [relativePath, slug]);

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
    query: payload?.query || LEGAL_PAGE_QUERY,
    variables: tinaVariables,
    data: tinaData,
  });

  return { data, isLoading };
}
