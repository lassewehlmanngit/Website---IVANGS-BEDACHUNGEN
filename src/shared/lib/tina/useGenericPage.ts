import { useState, useEffect, useMemo } from 'react';
import { client } from './client';
import { useTinaOptional } from './useTinaOptional';

const pageCache: Record<string, { data: any; query: string; variables: Record<string, any>; timestamp: number }> = {};
const CACHE_TTL = 5 * 60 * 1000;

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
  const variablesKey = JSON.stringify(variables);
  const cacheKey = `${query}-${variablesKey}`;
  const cached = pageCache[cacheKey];
  const isCacheValid = cached && (Date.now() - cached.timestamp < CACHE_TTL);

  const [payload, setPayload] = useState<{
    data: any;
    query: string;
    variables: Record<string, any>;
  } | null>(isCacheValid ? { data: cached.data, query: cached.query, variables: cached.variables } : null);
  const [isLoading, setIsLoading] = useState(!isCacheValid);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;

    if (isCacheValid) {
      return;
    }

    const loadData = async () => {
      setIsLoading(true);
      setError(null);

      const isEditMode = typeof window !== 'undefined' && window.parent !== window;
      // 1. Try fetching from TinaCMS client (if available and in dev/edit mode)
      if (client && clientQuery && (!import.meta.env.PROD || isEditMode)) {
        try {
          const response = await clientQuery(variables);
          if (isMounted) {
            pageCache[cacheKey] = {
              data: response.data,
              query: response.query,
              variables: response.variables,
              timestamp: Date.now(),
            };
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
            const transformedData = transformFallback(jsonData);
            pageCache[cacheKey] = {
              data: transformedData,
              query,
              variables,
              timestamp: Date.now(),
            };
            setPayload({
              data: transformedData,
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
          const defaultData = transformFallback(null);
          pageCache[cacheKey] = {
            data: defaultData,
            query,
            variables,
            timestamp: Date.now(),
          };
          setPayload({
            data: defaultData,
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
  }, [variablesKey, fallbackPath, isCacheValid, cacheKey, query]);

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
