import { useTina } from 'tinacms/dist/react';
import { useRef, useMemo } from 'react';
import { isVisualEditingEnabled } from './client';

interface TinaProps {
  query: string;
  variables: Record<string, any>;
  data: any;
}

// Cache the check at module load time to avoid repeated DOM checks
let _isVisualEditingEnabled: boolean | null = null;

function getIsVisualEditingEnabled(): boolean {
  if (_isVisualEditingEnabled === null) {
    _isVisualEditingEnabled = isVisualEditingEnabled();
  }
  return _isVisualEditingEnabled;
}

/**
 * A wrapper around useTina that only enables live editing subscriptions
 * when visual editing mode is active (inside TinaCMS admin iframe).
 * 
 * This prevents performance issues from multiple concurrent useTina subscriptions
 * in production, which can cause browser crashes due to infinite update loops.
 * 
 * The key insight: useTina's subscription mechanism can cause cascading re-renders
 * when multiple instances are active. By returning stable data when not in editing
 * mode, we break the update cycle.
 */
export function useTinaOptional<T = any>(props: TinaProps): { data: T } {
  const isEditingEnabled = getIsVisualEditingEnabled();
  
  // #region agent log
  fetch('http://127.0.0.1:7245/ingest/984a66b5-88db-4299-9992-dc0fd2248136',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'useTinaOptional.ts:33',message:'useTinaOptional called',data:{isEditingEnabled,hasQuery:!!props.query,hasData:!!props.data,dataKeys:props.data?Object.keys(props.data):[]},timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'E'})}).catch(()=>{});
  // #endregion
  
  // Store the initial data as a stable reference to prevent re-render cycles
  const stableDataRef = useRef(props.data);
  
  // Update the ref when props.data changes (from the fetch)
  if (props.data !== stableDataRef.current && props.data !== null) {
    stableDataRef.current = props.data;
  }
  
  // Only use useTina when visual editing is enabled
  // This is the key optimization - we avoid setting up subscriptions in production
  const tinaResult = useTina({
    query: props.query,
    variables: props.variables,
    // When not editing, pass stable data to prevent useTina from triggering updates
    data: isEditingEnabled ? props.data : stableDataRef.current,
  });
  
  // When editing is enabled, use Tina's live data
  // Otherwise, return the stable fetched data without Tina's subscription overhead
  const result = useMemo(() => {
    if (isEditingEnabled) {
      return tinaResult;
    }
    return { data: stableDataRef.current };
  }, [isEditingEnabled, tinaResult]);
  
  return result;
}
