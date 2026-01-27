import { useState, useEffect } from 'react';
import { tinaClient } from './client';
import type { SupportedLang } from '@/shared/config/i18n';

interface PageDataState {
  data: any;
  query: string;
  variables: Record<string, any>;
  loading: boolean;
  error: string | null;
}

export function usePageData(lang: SupportedLang, slug: string) {
  const [state, setState] = useState<PageDataState>({
    data: null,
    query: '',
    variables: {},
    loading: true,
    error: null,
  });

  useEffect(() => {
    const relativePath = `${lang}/${slug}.md`;

    tinaClient.queries
      .page({ relativePath })
      .then((response) => {
        setState({
          data: response.data,
          query: response.query,
          variables: response.variables,
          loading: false,
          error: null,
        });
      })
      .catch((error: any) => {
        setState({
          data: null,
          query: '',
          variables: {},
          loading: false,
          error: error.message || 'Failed to load page',
        });
      });
  }, [lang, slug]);

  return state;
}
