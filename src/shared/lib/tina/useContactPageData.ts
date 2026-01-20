import { useState, useEffect } from 'react';
import { tinaClient } from './client';
import type { SupportedLang } from '@/shared/config/i18n';

export function useContactPageData(lang: SupportedLang) {
  const [state, setState] = useState({
    data: null,
    query: '',
    variables: {},
    loading: true,
    error: null,
  });

  useEffect(() => {
    const relativePath = 'kontakt.json';

    tinaClient.queries.contactPage({ relativePath })
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
