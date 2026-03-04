import React from 'react';
import { Seo } from '@/shared/ui/Seo';
import { SupportedLang } from '@/shared/config/i18n';
import { Breadcrumbs } from '@/shared/ui/Breadcrumbs';
import { tinaField } from 'tinacms/dist/react';
import { TinaMarkdown } from 'tinacms/dist/rich-text';
import { useLegalPageData } from '@/shared/lib/tina/useLegalPageData';
import { Skeleton, SkeletonText } from '@/shared/ui/Skeleton';

export const PrivacyPage: React.FC<{ lang: SupportedLang }> = ({ lang }) => {
  const { data, isLoading } = useLegalPageData('privacy');

  if (isLoading) {
    return (
      <div className="bg-white pt-12 pb-24 animate-pulse">
        <div className="container mx-auto px-4 max-w-3xl">
          <Skeleton variant="rectangular" height={24} width={150} className="mb-6 rounded" />
          <Skeleton variant="rectangular" height={60} className="w-1/2 mb-8 rounded" />
          <div className="space-y-4">
            <SkeletonText lines={10} />
          </div>
        </div>
      </div>
    );
  }

  const page = data?.legalPage || {
    title: 'Datenschutzerklärung',
    seo: {
      title: 'Datenschutzerklärung',
      description: 'Datenschutzerklärung der Ivangs Bedachungen GmbH & Co. KG. Informationen zur Verarbeitung Ihrer personenbezogenen Daten.',
    },
    body: ''
  };

  return (
    <>
      <Seo
        title={`${page.seo?.title || page.title} - Ivangs Bedachungen`}
        description={page.seo?.description}
        ogLocale="de_DE"
      />
      <div className="animate-fade-in bg-white pt-12 pb-24">
        <div className="container mx-auto px-4 max-w-3xl">
          <Breadcrumbs
            lang={lang}
            items={[{ label: 'Datenschutz' }]}
            className="mb-6"
          />
          <h1
            className="text-h1 font-bold text-slate-900 mb-8 border-b border-slate-200 pb-4"
            data-tina-field={data?.legalPage && tinaField(data.legalPage, 'title')}
          >
            {page.title}
          </h1>

          <div
            className="prose prose-slate max-w-none text-slate-600"
            data-tina-field={data?.legalPage && tinaField(data.legalPage, 'body')}
          >
            <TinaMarkdown content={page.body as any} />
          </div>
        </div>
      </div>
    </>
  );
};
