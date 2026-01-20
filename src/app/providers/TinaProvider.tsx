import React from 'react';

/**
 * TinaProvider wrapper for future extensibility.
 * Visual editing is enabled through the useTina hook in individual components.
 * The useTina hook automatically detects edit mode and enables real-time updates.
 */
export const TinaProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <>{children}</>;
};
