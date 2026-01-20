import { useTina } from 'tinacms/dist/react';
import { client } from './client';
import { useEffect, useState, useMemo } from 'react';

// Default query for service - must match the TinaCMS schema
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

export function useServiceData(serviceId: string) {
  const relativePath = `${serviceId}.md`;
  const variables = useMemo(() => ({ relativePath }), [relativePath]);
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
    client.queries.service({ relativePath })
      .then((response) => {
        setInitialData(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching service data:', error);
        setInitialData(null);
        setIsLoading(false);
      });
  }, [relativePath]);

  // Pass the fetched data to useTina for visual editing
  const { data } = useTina({
    query: SERVICE_QUERY,
    variables,
    data: initialData || { service: null },
  });

  return { data, isLoading };
}
