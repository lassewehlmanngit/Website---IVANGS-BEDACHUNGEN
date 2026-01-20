import React from 'react';

/**
 * TinaProvider wrapper for TinaCMS integration.
 * 
 * In TinaCMS v2, visual editing is automatically enabled when:
 * 1. Pages use the useTina hook with proper query/variables
 * 2. The page is loaded in the TinaCMS admin iframe
 * 3. tinaField attributes are added to editable elements
 * 
 * No additional provider wrapping is needed - the useTina hook
 * handles the connection to the TinaCMS backend automatically.
 */
export const TinaProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <>{children}</>;
};
