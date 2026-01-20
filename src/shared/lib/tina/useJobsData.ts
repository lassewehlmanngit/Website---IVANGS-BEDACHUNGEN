import { client } from './client';
import { useTinaOptional } from './useTinaOptional';
import { useEffect, useState, useMemo } from 'react';
import fm from 'front-matter';

// Stable constants defined outside the component
const EMPTY_DATA = { jobConnection: { edges: [] } };
const EMPTY_VARIABLES = {};

// Fallback query for jobs - used when client response doesn't include query
const JOBS_QUERY = `
  query JobsQuery {
    jobConnection {
      edges {
        node {
          _sys { filename }
          title location type shortDesc
          tasks profile benefits published
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

export function useJobsData() {
  const [payload, setPayload] = useState<TinaPayload | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      // Try to fetch from TinaCMS client first
      if (client) {
        try {
          const response = await client.queries.jobConnection();
          setPayload({
            data: response.data,
            query: response.query,
            variables: response.variables || EMPTY_VARIABLES,
          });
          setIsLoading(false);
          return;
        } catch (error) {
          console.error('Error fetching jobs data from TinaCMS:', error);
        }
      }

      // Fallback: Load from static markdown files
      try {
        const jobFiles = ['dachdecker.md', 'ausbildung.md'];
        const jobs = await Promise.all(
          jobFiles.map(async (file) => {
            try {
              const response = await fetch(`/content/jobs/${file}`);
              const text = await response.text();
              const parsed = fm<any>(text);
              return {
                node: {
                  ...parsed.attributes,
                  _sys: { filename: file.replace('.md', '') },
                },
              };
            } catch {
              return null;
            }
          })
        );

        setPayload({
          data: {
            jobConnection: {
              edges: jobs.filter(Boolean),
            },
          },
          query: JOBS_QUERY,
          variables: EMPTY_VARIABLES,
        });
      } catch (error) {
        console.error('Error loading static jobs data:', error);
        // Last resort: empty structure
        setPayload({
          data: EMPTY_DATA,
          query: JOBS_QUERY,
          variables: EMPTY_VARIABLES,
        });
      }
      setIsLoading(false);
    };

    loadData();
  }, []);

  // Memoize the variables to ensure stability
  const tinaVariables = useMemo(() => {
    return payload?.variables || EMPTY_VARIABLES;
  }, [payload?.variables]);

  // Memoize the data structure
  const tinaData = useMemo(() => {
    return payload?.data || EMPTY_DATA;
  }, [payload?.data]);

  // Pass the fetched data to useTinaOptional for visual editing
  const { data } = useTinaOptional({
    query: payload?.query || JOBS_QUERY,
    variables: tinaVariables,
    data: tinaData,
  });

  return { data, isLoading };
}
