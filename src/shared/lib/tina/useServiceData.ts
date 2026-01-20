import { client } from './client';
import { useTinaOptional } from './useTinaOptional';
import { useEffect, useState } from 'react';
import fm from 'front-matter';

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
      uiText { introHeader contactButtonText careerCtaTitle careerCtaDescription careerCtaButtonText }
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
    const loadData = async () => {
      // Try to fetch from TinaCMS client first
      if (client) {
        try {
          const response = await client.queries.service({ relativePath });
          setPayload({
            data: response.data,
            query: response.query,
            variables: response.variables,
          });
          setIsLoading(false);
          return;
        } catch (error) {
          console.error('Error fetching service data from TinaCMS:', error);
        }
      }

      // Fallback: Load from static markdown file
      try {
        const response = await fetch(`/content/services/${serviceId}.md`);
        const text = await response.text();
        const parsed = fm<any>(text);
        setPayload({
          data: { service: { ...parsed.attributes, body: parsed.body } },
          query: SERVICE_QUERY,
          variables: { relativePath },
        });
      } catch (error) {
        console.error('Error loading static service data:', error);
        // Last resort: empty structure
        setPayload({
          data: { service: null },
          query: SERVICE_QUERY,
          variables: { relativePath },
        });
      }
      setIsLoading(false);
    };

    loadData();
  }, [relativePath, serviceId]);

  // Pass the fetched data to useTinaOptional for visual editing
  const { data } = useTinaOptional({
    query: payload?.query || SERVICE_QUERY,
    variables: payload?.variables || { relativePath },
    data: payload?.data || { service: null },
  });

  return { data, isLoading };
}
