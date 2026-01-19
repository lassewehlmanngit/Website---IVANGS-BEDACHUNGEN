import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { ErrorBoundary } from './ErrorBoundary';
import { ContactProvider } from '@/features/contact/ContactProvider';
import { AnalyticsProvider } from './AnalyticsProvider';

export interface AppProvidersProps {
  children: React.ReactNode;
}

export const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
  return (
    <ErrorBoundary>
      <HelmetProvider>
        <AnalyticsProvider>
          <ContactProvider>{children}</ContactProvider>
        </AnalyticsProvider>
      </HelmetProvider>
    </ErrorBoundary>
  );
};

