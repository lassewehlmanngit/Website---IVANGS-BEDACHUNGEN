import { useTina } from 'tinacms/dist/react';
import { client } from './client';
import { useEffect, useState } from 'react';

// Fallback query for service - used when client response doesn't include query
const SERVICE_QUERY = `
  query ServiceQuery($relativePath: String!) {
    service(relativePath: $relativePath) {
      _sys { filename }
      title subtitle shortDescription intro
      body image heroImage icon expertTip
      features benefits
      sections { title icon content }
      processSteps { step title text }
      referenceImages contactIds
      faq { question answer }
      gallery { image caption }
    }
  }
`;

interface TinaPayload {
  data: any;
  query: string;
  variables: Record<string, any>;
}

export function useServiceData(serviceId: string) {
  const relativePath = `${serviceId}.md`;
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
    client.queries.service({ relativePath })
      .then((response) => {
        setPayload({
          data: response.data,
          query: response.query,
          variables: response.variables,
        });
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching service data:', error);
        setPayload(null);
        setIsLoading(false);
      });
  }, [relativePath]);

  // Pass the fetched data to useTina for visual editing
  const { data } = useTina({
    query: payload?.query || SERVICE_QUERY,
    variables: payload?.variables || { relativePath },
    data: payload?.data || { service: null },
  });

  return { data, isLoading };
}
