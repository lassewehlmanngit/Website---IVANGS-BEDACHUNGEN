import { useTina } from 'tinacms/dist/react';
import { client } from './client';
import { useEffect, useState } from 'react';

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
    // Skip fetching if TinaCMS client is not available
    if (!client) {
      setPayload(null);
      setIsLoading(false);
      return;
    }

    // Fetch initial data using Tina client - keep full response for metadata
    client.queries.jobConnection()
      .then((response) => {
        setPayload({
          data: response.data,
          query: response.query,
          variables: response.variables,
        });
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching jobs data:', error);
        setPayload(null);
        setIsLoading(false);
      });
  }, []);

  // Pass the fetched data to useTina for visual editing
  const { data } = useTina({
    query: payload?.query || JOBS_QUERY,
    variables: payload?.variables || {},
    data: payload?.data || { jobConnection: null },
  });

  return { data, isLoading };
}
