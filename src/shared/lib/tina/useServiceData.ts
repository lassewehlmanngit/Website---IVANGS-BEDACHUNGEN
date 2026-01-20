import { useState, useEffect } from 'react';
import { tinaClient } from './client';
import type { SupportedLang } from '@/shared/config/i18n';

export function useServiceData(serviceId: string, lang: SupportedLang) {
  const [state, setState] = useState({
    data: null,
    query: '',
    variables: {},
    loading: true,
    error: null,
  });

  useEffect(() => {
    const relativePath = `${serviceId}.md`;

    tinaClient.queries.service({ relativePath })
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
  }, [serviceId, lang]);

  return state;
}
