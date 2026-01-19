import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import type { SupportedLang } from '@/shared/config/i18n';
import { Seo } from '@/shared/ui/Seo';
import { Markdown } from '@/shared/ui/Markdown';
import type { ContentPage, PageBlock } from '@/shared/lib/content/types';
import { loadPageBySlug } from '@/shared/lib/content/pages';
import { Hero } from '@/shared/ui/Hero';
import { FeatureSection, FeatureCard } from '@/shared/ui/Feature';
import { Testimonial } from '@/shared/ui/Testimonial';
import { ContactForm } from '@/features/contact/ContactForm';
import { Section } from '@/shared/ui/Section';
import { ButtonLink } from '@/shared/ui/ButtonLink';
import { OptimizedImage as Image } from '@/shared/ui/Image';
import * as Icons from 'lucide-react';

export interface GenericPageProps {
  lang: SupportedLang;
}

const BlockRenderer: React.FC<{ block: PageBlock }> = ({ block }) => {
  switch (block._template) {
    case 'hero':
      return (
        <Hero
          title={block.title}
          description={block.description}
          media={block.image ? <Image src={block.image} alt={block.title} className="rounded-lg shadow-xl" /> : undefined}
          actions={
            block.actions?.map((action, i) => (
              <ButtonLink key={i} to={action.href} variant={action.variant as any}>
                {action.label}
              </ButtonLink>
            ))
          }
        />
      );

    case 'features':
      return (
        <FeatureSection title={block.title} description={block.description}>
          {block.items?.map((item, i) => {
            const IconComponent = item.icon ? (Icons as any)[item.icon] : undefined;
            return (
              <FeatureCard
                key={i}
                title={item.title}
                description={item.description}
                icon={IconComponent ? <IconComponent /> : undefined}
              />
            );
          })}
        </FeatureSection>
      );

    case 'testimonial':
      return (
        <Section>
          <div className="container mx-auto max-w-4xl">
            <Testimonial
              quote={block.quote}
              author={{
                name: block.author,
                title: block.role,
              }}
            />
          </div>
        </Section>
      );

    case 'contact':
      return (
        <Section>
          <div className="container mx-auto max-w-xl">
            {block.title && <h2 className="mb-4 text-3xl font-bold">{block.title}</h2>}
            {block.description && <p className="mb-8 text-muted-foreground">{block.description}</p>}
            <ContactForm />
          </div>
        </Section>
      );

    case 'content':
      return (
        <Section>
          <div className="container mx-auto max-w-3xl prose prose-lg dark:prose-invert">
            <Markdown>{block.body}</Markdown>
          </div>
        </Section>
      );

    default:
      return null;
  }
};

export const GenericPage: React.FC<GenericPageProps> = ({ lang }) => {
  const { slug } = useParams<{ slug: string }>();
  const normalizedSlug = useMemo(() => (slug && slug.trim().length > 0 ? slug.trim() : 'home'), [slug]);

  const [page, setPage] = useState<ContentPage | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    loadPageBySlug(lang, normalizedSlug)
      .then((data) => {
        if (cancelled) return;
        setPage(data);
        setError(null);
      })
      .catch((e: unknown) => {
        if (cancelled) return;
        const message = e instanceof Error ? e.message : 'Failed to load page';
        setError(message);
        setPage(null);
      });

    return () => {
      cancelled = true;
    };
  }, [lang, normalizedSlug]);

  if (error) {
    return (
      <div className="container py-12">
        <Seo title="Not found" />
        <h1 className="text-2xl font-semibold">{lang === 'de' ? 'Nicht gefunden' : 'Not found'}</h1>
        <p className="mt-2 text-white/75">{error}</p>
      </div>
    );
  }

  if (!page) {
    return (
      <div className="container py-12">
        <p className="text-white/70">{lang === 'de' ? 'Laden…' : 'Loading…'}</p>
      </div>
    );
  }

  return (
    <>
      <Seo title={page.meta.title} description={page.meta.description} />
      {page.blocks?.map((block, i) => (
        <BlockRenderer key={i} block={block} />
      ))}
    </>
  );
};
