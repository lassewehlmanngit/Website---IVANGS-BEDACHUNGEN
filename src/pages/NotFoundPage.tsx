import React from 'react';
import type { SupportedLang } from '@/shared/config/i18n';
import { Seo } from '@/shared/ui/Seo';
import { ButtonLink } from '@/shared/ui/ButtonLink';

export interface NotFoundPageProps {
  lang: SupportedLang;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ lang }) => {
  return (
    <div className="container py-12">
      <Seo title={lang === 'de' ? 'Nicht gefunden' : 'Not found'} noindex />
      <div className="mx-auto max-w-2xl rounded-xl border border-border bg-card p-8 shadow-sm text-center">
        <h1 className="text-3xl font-bold text-foreground">{lang === 'de' ? 'Seite nicht gefunden' : 'Page not found'}</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          {lang === 'de'
            ? 'Die angeforderte Seite existiert nicht oder wurde verschoben.'
            : 'The page you requested does not exist or has been moved.'}
        </p>
        <div className="mt-8 flex justify-center">
          <ButtonLink to={`/${lang}`} variant="primary">
            {lang === 'de' ? 'Zur Startseite' : 'Back home'}
          </ButtonLink>
        </div>
      </div>
    </div>
  );
};

