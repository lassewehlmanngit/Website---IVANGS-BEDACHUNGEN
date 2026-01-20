import { useTina } from 'tinacms/dist/react';
import { client } from './client';
import { useEffect, useState } from 'react';

// Query to fetch all services
const SERVICES_LIST_QUERY = `
  query ServicesListQuery {
    serviceConnection {
      edges {
        node {
          _sys { filename }
          id
          title
          shortDescription
          icon
          heroImage
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

export function useServicesListData() {
  const [payload, setPayload] = useState<TinaPayload | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      // Try to fetch from TinaCMS client first
      if (client) {
        try {
          const response = await client.queries.serviceConnection();
          setPayload({
            data: response.data,
            query: response.query,
            variables: response.variables || {},
          });
          setIsLoading(false);
          return;
        } catch (error) {
          console.error('Error fetching services list from TinaCMS:', error);
        }
      }

      // Fallback: Return empty structure
      setPayload({
        data: { serviceConnection: { edges: [] } },
        query: SERVICES_LIST_QUERY,
        variables: {},
      });
      setIsLoading(false);
    };

    loadData();
  }, []);

  // Pass the fetched data to useTina for visual editing
  const { data } = useTina({
    query: payload?.query || SERVICES_LIST_QUERY,
    variables: payload?.variables || {},
    data: payload?.data || { serviceConnection: { edges: [] } },
  });

  return { data, isLoading };
}
