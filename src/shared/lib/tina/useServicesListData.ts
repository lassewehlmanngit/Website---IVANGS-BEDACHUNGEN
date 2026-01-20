import { client } from './client';
import { useTinaOptional } from './useTinaOptional';
import { useEffect, useState, useMemo } from 'react';

// Stable constants defined outside the component
const EMPTY_DATA = { serviceConnection: { edges: [] } };
const EMPTY_VARIABLES = {};

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
          benefits
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
            variables: response.variables || EMPTY_VARIABLES,
          });
          setIsLoading(false);
          return;
        } catch (error) {
          console.error('Error fetching services list from TinaCMS:', error);
        }
      }

      // Fallback: Return empty structure
      setPayload({
        data: EMPTY_DATA,
        query: SERVICES_LIST_QUERY,
        variables: EMPTY_VARIABLES,
      });
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
    query: payload?.query || SERVICES_LIST_QUERY,
    variables: tinaVariables,
    data: tinaData,
  });

  return { data, isLoading };
}
