import React from 'react';

/**
 * TinaProvider wrapper for TinaCMS integration.
 * 
 * In TinaCMS v2, visual editing is handled automatically through:
 * 1. The useTina hook which adds _content_source metadata to data
 * 2. The tinaField function which generates field identifiers
 * 3. Iframe communication when the page is loaded in TinaCMS admin
 * 
 * No additional provider wrapping is needed.
 */
export const TinaProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <>{children}</>;
};
