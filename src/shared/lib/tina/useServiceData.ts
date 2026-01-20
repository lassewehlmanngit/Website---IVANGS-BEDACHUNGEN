import { useTina } from 'tinacms/dist/react';
import { client } from './client';
import { useEffect, useState } from 'react';

export function useServiceData(serviceId: string) {
  const relativePath = `${serviceId}.md`;
  const [payload, setPayload] = useState<any>(null);

  useEffect(() => {
    // Skip fetching if TinaCMS client is not available
    if (!client) {
      setPayload({ data: null, query: '', variables: { relativePath } });
      return;
    }

    // Fetch initial data using Tina client
    client.queries.service({ relativePath })
      .then((response) => {
        setPayload(response);
      })
      .catch((error) => {
        console.error('Error fetching service data:', error);
        setPayload({ data: null, query: '', variables: { relativePath } });
      });
  }, [relativePath]);

  // Pass the fetched data to useTina for visual editing
  return useTina({
    query: payload?.query || '',
    variables: payload?.variables || { relativePath },
    data: payload?.data || null,
  });
}
