import { useState, useEffect } from 'react';
import { tinaClient } from './client';
import type { SupportedLang } from '@/shared/config/i18n';

export function useJobsData(lang: SupportedLang) {
  const [state, setState] = useState({
    data: null,
    query: '',
    variables: {},
    loading: true,
    error: null,
  });

  useEffect(() => {
    // Fetch all jobs - TinaCMS will return a collection
    tinaClient.queries.jobConnection()
      .then((response) => {
        setState({
          data: response.data,
          query: response.query,
          variables: response.variables,
          loading: false,
          error: null,
        });
      })
      .catch((error) => {
        setState({
          data: null,
          query: '',
          variables: {},
          loading: false,
          error: error.message,
        });
      });
  }, [lang]);

  return state;
}
