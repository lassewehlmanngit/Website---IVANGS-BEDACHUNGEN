import { useTina } from 'tinacms/dist/react';
import { client } from './client';
import { useEffect, useState } from 'react';

export function useJobsData() {
  const [payload, setPayload] = useState<any>(null);

  useEffect(() => {
    // Fetch initial data using Tina client
    client.queries.jobConnection()
      .then((response) => {
        setPayload(response);
      })
      .catch((error) => {
        console.error('Error fetching jobs data:', error);
        setPayload({ data: null, query: '', variables: {} });
      });
  }, []);

  // Pass the fetched data to useTina for visual editing
  return useTina({
    query: payload?.query || '',
    variables: payload?.variables || {},
    data: payload?.data || null,
  });
}
