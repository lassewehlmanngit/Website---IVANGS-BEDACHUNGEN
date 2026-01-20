import React from 'react';
import { Seo } from '@/shared/ui/Seo';
import { SupportedLang } from '@/shared/config/i18n';
import { Breadcrumbs } from '@/shared/ui/Breadcrumbs';
import { Markdown } from '@/shared/ui/Markdown';
import { tinaField } from 'tinacms/dist/react';
import { useLegalPageData } from '@/shared/lib/tina/useLegalPageData';

export const TermsPage: React.FC<{ lang: SupportedLang }> = ({ lang }) => {
  const { data, isLoading } = useLegalPageData('terms');
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  const page = data?.legalPage || {
    title: 'Allgemeine Geschäftsbedingungen (AGB)',
    description: 'Allgemeine Geschäftsbedingungen der Ivangs Bedachungen GmbH & Co. KG für Dachdeckerarbeiten und Bedachungen.',
    body: ''
  };
  
  return (
    <>
      <Seo 
        title={`${page.title} - Ivangs Bedachungen`}
        description={page.description}
        ogLocale="de_DE"
      />
      <div className="animate-fade-in bg-white pt-12 pb-24">
        <div className="container mx-auto px-4 max-w-3xl">
          <Breadcrumbs 
            lang={lang}
            items={[{ label: 'AGB' }]}
            className="mb-6"
          />
          <h1 
            className="text-4xl font-bold text-slate-900 mb-8 border-b border-slate-200 pb-4"
            data-tina-field={data?.legalPage && tinaField(data.legalPage, 'title')}
          >
            {page.title}
          </h1>

          <div 
            className="prose prose-slate max-w-none text-slate-600"
            data-tina-field={data?.legalPage && tinaField(data.legalPage, 'body')}
          >
            <Markdown>{page.body}</Markdown>
          </div>
        </div>
      </div>
    </>
  );
};
