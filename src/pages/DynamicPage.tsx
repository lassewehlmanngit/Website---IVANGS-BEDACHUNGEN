import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import type { SupportedLang } from '@/shared/config/i18n';
import { Seo } from '@/shared/ui/Seo';
import { BlockRenderer } from '@/widgets/blocks';
import { usePageBuilderData } from '@/shared/lib/tina/usePageBuilderData';
import { Skeleton, SkeletonText } from '@/shared/ui/Skeleton';

export interface DynamicPageProps {
  lang: SupportedLang;
  slug?: string;
}

export const DynamicPage: React.FC<DynamicPageProps> = ({ lang, slug: propSlug }) => {
  const params = useParams();
  const splat = params['*'];

  // Use prop slug if available, otherwise use the catch-all splat
  const slug = propSlug || splat;

  // Move hook above conditional returns
  const { data, isLoading, error } = usePageBuilderData(lang, slug || '');

  if (!slug) {
    return <Navigate to="/" replace />;
  }

  const page = (data as any)?.page;

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-32 space-y-12 animate-pulse">
        <div className="space-y-6">
          <Skeleton variant="rectangular" height={80} className="w-1/2 rounded" />
          <SkeletonText lines={3} className="w-full" />
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <Skeleton variant="rectangular" height={300} className="w-full rounded-2xl" />
          <Skeleton variant="rectangular" height={300} className="w-full rounded-2xl" />
        </div>
      </div>
    );
  }

  if (error || !page) {
    // If we can't find the page, redirect to 404
    return <Navigate to="/404" replace />;
  }

  return (
    <>
      <Seo
        title={page.seo?.title || page.title}
        description={page.seo?.description}
        ogImage={page.seo?.ogImage ? { url: page.seo.ogImage, alt: page.seo?.title || page.title } : undefined}
        ogLocale="de_DE"
        ogSiteName="Ivangs Bedachungen"
      />
      <div className="animate-fade-in">
        <BlockRenderer blocks={page.blocks || []} lang={lang} />
      </div>
    </>
  );
};
