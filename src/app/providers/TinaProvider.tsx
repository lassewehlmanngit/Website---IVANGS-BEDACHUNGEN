import React from 'react';

/**
 * TinaProvider wrapper for TinaCMS integration.
 * 
 * In TinaCMS v2/v3, visual editing is handled automatically through:
 * 1. The useTina/useTinaOptional hooks which manage data subscriptions
 * 2. The tinaField function which generates field identifiers
 * 3. Iframe communication when the page is loaded in TinaCMS admin
 * 
 * TinaCMS v2+ does not require a context provider wrapper - the hooks
 * communicate directly with the parent iframe via postMessage.
 * 
 * This component is kept as a passthrough for architectural consistency
 * and potential future provider needs.
 */
export const TinaProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <>{children}</>;
};
