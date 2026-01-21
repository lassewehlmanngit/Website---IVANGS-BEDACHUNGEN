import { useState, useEffect, useMemo } from 'react';
import { client } from './client';
import { useTinaOptional } from './useTinaOptional';

interface UseGenericPageOptions {
  query: string;
  variables: Record<string, any>;
  fallbackPath?: string;
  clientQuery?: (variables: Record<string, any>) => Promise<any>;
  transformFallback?: (data: any) => any;
}

interface GenericPageResult<T> {
  data: T;
  isLoading: boolean;
  error: Error | null;
}

export function useGenericPage<T>({
  query,
  variables,
  fallbackPath,
  clientQuery,
  transformFallback = (d) => d,
}: UseGenericPageOptions): GenericPageResult<T> {
  const [payload, setPayload] = useState<{
    data: any;
    query: string;
    variables: Record<string, any>;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // JSON.stringify variables to use as dependency
  const variablesKey = JSON.stringify(variables);

  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      setIsLoading(true);
      setError(null);

      // 1. Try fetching from TinaCMS client (if available)
      if (client && clientQuery) {
        try {
          const response = await clientQuery(variables);
          if (isMounted) {
            setPayload({
              data: response.data,
              query: response.query,
              variables: response.variables,
            });
            setIsLoading(false);
            return;
          }
        } catch (err) {
          console.error('Error fetching data from TinaCMS:', err);
          // Continue to fallback
        }
      }

      // 2. Fallback: Load from static JSON file
      if (fallbackPath) {
        try {
          const response = await fetch(fallbackPath);
          if (!response.ok) {
            throw new Error(`Failed to load static data from ${fallbackPath}`);
          }
          const jsonData = await response.json();
          
          if (isMounted) {
            setPayload({
              data: transformFallback(jsonData),
              query,
              variables,
            });
          }
        } catch (err: any) {
          console.error('Error loading static page data:', err);
          if (isMounted) {
            setError(err);
            // Set empty structure to prevent crashes
            setPayload({
              data: transformFallback(null),
              query,
              variables,
            });
          }
        }
      } else {
        // No fallback path provided, just stop loading
        if (isMounted) {
           // If we didn't get data from client and no fallback, we have no data.
           // But we might want to initialize with empty data.
           setPayload({
             data: transformFallback(null),
             query,
             variables,
           });
        }
      }

      if (isMounted) {
        setIsLoading(false);
      }
    };

    loadData();

    return () => {
      isMounted = false;
    };
  }, [variablesKey, fallbackPath]);

  // Memoize variables and data for useTinaOptional
  const tinaVariables = useMemo(() => {
    return payload?.variables || variables;
  }, [payload?.variables, variablesKey]);

  const tinaData = useMemo(() => {
    return payload?.data || transformFallback(null);
  }, [payload?.data]);

  // Hook into TinaCMS visual editing
  const { data } = useTinaOptional({
    query: payload?.query || query,
    variables: tinaVariables,
    data: tinaData,
  });

  return { data: data as T, isLoading, error };
}
