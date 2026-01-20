import React from 'react';
import type { SupportedLang } from '@/shared/config/i18n';
import { Seo } from '@/shared/ui/Seo';
import { ButtonLink } from '@/shared/ui/ButtonLink';
import { useSettingsData } from '@/shared/lib/tina/useSettingsData';
import { tinaField } from 'tinacms/dist/react';

export interface NotFoundPageProps {
  lang: SupportedLang;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ lang }) => {
  const { data } = useSettingsData();
  const settings = data?.settings || {};
  const notFoundPage = settings.notFoundPage || {};
  
  // Fallback values
  const title = notFoundPage.title || 'Seite nicht gefunden';
  const description = notFoundPage.description || 'Die angeforderte Seite existiert nicht oder wurde verschoben.';
  const buttonText = notFoundPage.buttonText || 'Zur Startseite';
  
  return (
    <div className="container py-12">
      <Seo title={title} noindex />
      <div className="mx-auto max-w-2xl rounded-xl border border-border bg-card p-8 shadow-sm text-center">
        <h1 
          className="text-3xl font-bold text-foreground"
          data-tina-field={data?.settings?.notFoundPage && tinaField(data.settings.notFoundPage, 'title')}
        >
          {title}
        </h1>
        <p 
          className="mt-4 text-lg text-muted-foreground"
          data-tina-field={data?.settings?.notFoundPage && tinaField(data.settings.notFoundPage, 'description')}
        >
          {description}
        </p>
        <div className="mt-8 flex justify-center">
          <ButtonLink 
            to={`/${lang}`} 
            variant="primary"
            data-tina-field={data?.settings?.notFoundPage && tinaField(data.settings.notFoundPage, 'buttonText')}
          >
            {buttonText}
          </ButtonLink>
        </div>
      </div>
    </div>
  );
};

