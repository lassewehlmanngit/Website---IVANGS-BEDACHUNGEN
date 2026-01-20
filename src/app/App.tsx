import React from 'react';
import { AppProviders } from './providers/AppProviders';
import { AppRouter } from './router/AppRouter';
import { TinaProvider } from './providers/TinaProvider';

export const App: React.FC = () => {
  return (
    <TinaProvider>
      <AppProviders>
        <AppRouter />
      </AppProviders>
    </TinaProvider>
  );
};
