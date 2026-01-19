import React from 'react';
import { Helmet } from 'react-helmet-async';

export interface SeoImage {
  url: string;
  alt?: string;
  width?: number;
  height?: number;
}

export interface SeoArticle {
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  section?: string;
  tags?: string[];
}

export interface LocalBusiness {
  name: string;
  image?: string;
  telephone?: string;
  email?: string;
  address?: {
    streetAddress: string;
    addressLocality: string;
    postalCode: string;
    addressCountry: string;
  };
  geo?: {
    latitude: number;
    longitude: number;
  };
  priceRange?: string;
  openingHours?: string[];
}

export interface SeoProps {
  title: string;
  description?: string;
  canonicalUrl?: string;
  noindex?: boolean;
  // Open Graph
  ogType?: 'website' | 'article' | 'product';
  ogImage?: SeoImage;
  ogSiteName?: string;
  ogLocale?: string;
  // Twitter
  twitterCard?: 'summary' | 'summary_large_image';
  twitterSite?: string;
  twitterCreator?: string;
  // Article metadata
  article?: SeoArticle;
  // Local Business
  localBusiness?: LocalBusiness;
  // JSON-LD
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

export const Seo: React.FC<SeoProps> = ({
  title,
  description,
  canonicalUrl,
  noindex,
  ogType = 'website',
  ogImage,
  ogSiteName,
  ogLocale = 'en_US',
  twitterCard = 'summary_large_image',
  twitterSite,
  twitterCreator,
  article,
  localBusiness,
  jsonLd,
}) => {
  // Build JSON-LD structured data
  const structuredData = jsonLd
    ? Array.isArray(jsonLd)
      ? jsonLd
      : [jsonLd]
    : [];

  // Auto-generate WebPage schema if not provided
  const hasWebPageSchema = structuredData.some(
    (item) => item['@type'] === 'WebPage' || item['@type'] === 'Article',
  );

  if (!hasWebPageSchema && canonicalUrl) {
    const baseSchema: Record<string, unknown> = {
      '@context': 'https://schema.org',
      '@type': ogType === 'article' ? 'Article' : 'WebPage',
      name: title,
      url: canonicalUrl,
    };

    if (description) {
      baseSchema.description = description;
    }

    if (ogImage?.url) {
      baseSchema.image = ogImage.url;
    }

    if (ogType === 'article' && article) {
      if (article.publishedTime) baseSchema.datePublished = article.publishedTime;
      if (article.modifiedTime) baseSchema.dateModified = article.modifiedTime;
      if (article.author) {
        baseSchema.author = {
          '@type': 'Person',
          name: article.author,
        };
      }
    }

    structuredData.push(baseSchema);
  }

  // LocalBusiness Schema
  if (localBusiness) {
    structuredData.push({
      '@context': 'https://schema.org',
      '@type': 'RoofingContractor', // Specific for Bedachungen
      name: localBusiness.name,
      image: localBusiness.image,
      telephone: localBusiness.telephone,
      email: localBusiness.email,
      address: localBusiness.address
        ? {
            '@type': 'PostalAddress',
            streetAddress: localBusiness.address.streetAddress,
            addressLocality: localBusiness.address.addressLocality,
            postalCode: localBusiness.address.postalCode,
            addressCountry: localBusiness.address.addressCountry,
          }
        : undefined,
      geo: localBusiness.geo
        ? {
            '@type': 'GeoCoordinates',
            latitude: localBusiness.geo.latitude,
            longitude: localBusiness.geo.longitude,
          }
        : undefined,
      priceRange: localBusiness.priceRange,
      openingHoursSpecification: localBusiness.openingHours?.map((spec) => ({
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: spec.split(' ')[0], // Simplification, expects "Monday 09:00-17:00" format parsing in real app
        opens: spec.split(' ')[1]?.split('-')[0],
        closes: spec.split(' ')[1]?.split('-')[1],
      })),
    });
  }

  return (
    <Helmet>
      <title>{title}</title>

      {/* Basic meta */}
      {description && <meta name="description" content={description} />}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      {noindex && <meta name="robots" content="noindex,nofollow" />}

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:type" content={ogType} />
      {description && <meta property="og:description" content={description} />}
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
      {ogSiteName && <meta property="og:site_name" content={ogSiteName} />}
      <meta property="og:locale" content={ogLocale} />

      {ogImage && (
        <>
          <meta property="og:image" content={ogImage.url} />
          {ogImage.alt && <meta property="og:image:alt" content={ogImage.alt} />}
          {ogImage.width && <meta property="og:image:width" content={String(ogImage.width)} />}
          {ogImage.height && <meta property="og:image:height" content={String(ogImage.height)} />}
        </>
      )}

      {/* Article specific OG tags */}
      {ogType === 'article' && article && (
        <>
          {article.publishedTime && (
            <meta property="article:published_time" content={article.publishedTime} />
          )}
          {article.modifiedTime && (
            <meta property="article:modified_time" content={article.modifiedTime} />
          )}
          {article.author && <meta property="article:author" content={article.author} />}
          {article.section && <meta property="article:section" content={article.section} />}
          {article.tags?.map((tag) => (
            <meta key={tag} property="article:tag" content={tag} />
          ))}
        </>
      )}

      {/* Twitter Card */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={title} />
      {description && <meta name="twitter:description" content={description} />}
      {ogImage && <meta name="twitter:image" content={ogImage.url} />}
      {ogImage?.alt && <meta name="twitter:image:alt" content={ogImage.alt} />}
      {twitterSite && <meta name="twitter:site" content={twitterSite} />}
      {twitterCreator && <meta name="twitter:creator" content={twitterCreator} />}

      {/* JSON-LD Structured Data */}
      {structuredData.length > 0 && (
        <script type="application/ld+json">
          {JSON.stringify(
            structuredData.length === 1 ? structuredData[0] : structuredData,
            null,
            0,
          )}
        </script>
      )}
    </Helmet>
  );
};
