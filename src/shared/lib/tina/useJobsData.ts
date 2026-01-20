import { useTina } from 'tinacms/dist/react';
import { client } from './client';
import { useEffect, useState, useMemo } from 'react';

// Default query for jobs - must match the TinaCMS schema
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

export function useJobsData() {
  const variables = useMemo(() => ({}), []);
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
    client.queries.jobConnection()
      .then((response) => {
        setInitialData(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching jobs data:', error);
        setInitialData(null);
        setIsLoading(false);
      });
  }, []);

  // Pass the fetched data to useTina for visual editing
  const { data } = useTina({
    query: JOBS_QUERY,
    variables,
    data: initialData || { jobConnection: null },
  });

  return { data, isLoading };
}
