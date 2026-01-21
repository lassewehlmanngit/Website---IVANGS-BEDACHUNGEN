import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import type { SupportedLang } from '@/shared/config/i18n';
import { Seo } from '@/shared/ui/Seo';
import { BlockRenderer } from '@/widgets/blocks';
import { usePageBuilderData } from '@/shared/lib/tina/usePageBuilderData';

export interface DynamicPageProps {
  lang: SupportedLang;
  slug?: string;
}

export const DynamicPage: React.FC<DynamicPageProps> = ({ lang, slug: propSlug }) => {
  const params = useParams();
  const splat = params['*'];
  
  // Use prop slug if available, otherwise use the catch-all splat
  const slug = propSlug || splat;

  if (!slug) {
    return <Navigate to={`/${lang}`} replace />;
  }

  const { data, isLoading, error } = usePageBuilderData(lang, slug);
  const page = data?.page;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !page) {
    // If we can't find the page, redirect to 404
    return <Navigate to={`/${lang}/404`} replace />;
  }

  return (
    <>
      <Seo 
        title={page.seo?.title || page.title}
        description={page.seo?.description}
        ogImage={page.seo?.ogImage}
        ogLocale="de_DE"
        ogSiteName="Ivangs Bedachungen"
      />
      <div className="animate-fade-in">
        <BlockRenderer blocks={page.blocks || []} lang={lang} />
      </div>
    </>
  );
};
