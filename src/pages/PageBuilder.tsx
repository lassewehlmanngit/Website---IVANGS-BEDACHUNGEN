import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import type { SupportedLang } from '@/shared/config/i18n';
import { Seo } from '@/shared/ui/Seo';
import { BlockRenderer } from '@/widgets/blocks';
import { usePageBuilderData } from '@/shared/lib/tina/usePageBuilderData';

export interface PageBuilderProps {
  lang: SupportedLang;
  slug?: string;
}

export const PageBuilder: React.FC<PageBuilderProps> = ({ lang, slug: propSlug }) => {
  const { slug: paramSlug } = useParams<{ slug: string }>();
  const slug = propSlug || paramSlug;

  if (!slug) {
    return <Navigate to={`/${lang}`} replace />;
  }

  return <PageBuilderContent lang={lang} slug={slug} />;
};

interface PageBuilderContentProps {
  lang: SupportedLang;
  slug: string;
}

const PageBuilderContent: React.FC<PageBuilderContentProps> = ({ lang, slug }) => {
  const { data, isLoading, error } = usePageBuilderData(lang, slug);
  const page = data?.page;

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Error state - redirect to 404
  if (error || !page) {
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

export default PageBuilder;
