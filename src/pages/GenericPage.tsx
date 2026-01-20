import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useTina, tinaField } from 'tinacms/dist/react';
import type { SupportedLang } from '@/shared/config/i18n';
import { Seo } from '@/shared/ui/Seo';
import { Markdown } from '@/shared/ui/Markdown';
import type { PageBlock } from '@/shared/lib/content/types';
import { usePageData } from '@/shared/lib/tina/usePageData';
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
        <div data-tina-field={tinaField(block, 'title')}>
          <Hero
            title={<span data-tina-field={tinaField(block, 'title')}>{block.title}</span>}
            description={<span data-tina-field={tinaField(block, 'description')}>{block.description}</span>}
            media={block.image ? <Image src={block.image} alt={block.title} className="rounded-lg shadow-xl" data-tina-field={tinaField(block, 'image')} /> : undefined}
            actions={
              block.actions?.map((action, i) => (
                <ButtonLink key={i} to={action.href} variant={action.variant as any} data-tina-field={tinaField(block, `actions.${i}.label`)}>
                  {action.label}
                </ButtonLink>
              ))
            }
          />
        </div>
      );

    case 'features':
      return (
        <div data-tina-field={tinaField(block, 'title')}>
          <FeatureSection 
            title={<span data-tina-field={tinaField(block, 'title')}>{block.title}</span>} 
            description={<span data-tina-field={tinaField(block, 'description')}>{block.description}</span>}
          >
            {block.items?.map((item, i) => {
              const IconComponent = item.icon ? (Icons as any)[item.icon] : undefined;
              return (
                <div key={i} data-tina-field={tinaField(block, `items.${i}`)}>
                  <FeatureCard
                    title={<span data-tina-field={tinaField(block, `items.${i}.title`)}>{item.title}</span>}
                    description={<span data-tina-field={tinaField(block, `items.${i}.description`)}>{item.description}</span>}
                    icon={IconComponent ? <IconComponent /> : undefined}
                  />
                </div>
              );
            })}
          </FeatureSection>
        </div>
      );

    case 'testimonial':
      return (
        <Section>
          <div className="container mx-auto max-w-4xl" data-tina-field={tinaField(block, 'quote')}>
            <Testimonial
              quote={<span data-tina-field={tinaField(block, 'quote')}>{block.quote}</span>}
              author={{
                name: <span data-tina-field={tinaField(block, 'author')}>{block.author}</span>,
                title: <span data-tina-field={tinaField(block, 'role')}>{block.role}</span>,
              }}
            />
          </div>
        </Section>
      );

    case 'contact':
      return (
        <Section>
          <div className="container mx-auto max-w-xl">
            {block.title && <h2 className="mb-4 text-3xl font-bold" data-tina-field={tinaField(block, 'title')}>{block.title}</h2>}
            {block.description && <p className="mb-8 text-muted-foreground" data-tina-field={tinaField(block, 'description')}>{block.description}</p>}
            <ContactForm />
          </div>
        </Section>
      );

    case 'content':
      return (
        <Section>
          <div className="container mx-auto max-w-3xl prose prose-lg dark:prose-invert" data-tina-field={tinaField(block, 'body')}>
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

  // Fetch data using Tina's GraphQL client
  const pageData = usePageData(lang, normalizedSlug);

  // Enable visual editing with useTina hook
  const { data } = useTina({
    query: pageData.query,
    variables: pageData.variables,
    data: pageData.data,
  });

  if (pageData.loading) {
    return (
      <div className="container py-12">
        <p className="text-white/70">{lang === 'de' ? 'Laden…' : 'Loading…'}</p>
      </div>
    );
  }

  if (pageData.error) {
    return (
      <div className="container py-12">
        <Seo title="Not found" />
        <h1 className="text-2xl font-semibold">{lang === 'de' ? 'Nicht gefunden' : 'Not found'}</h1>
        <p className="mt-2 text-white/75">{pageData.error}</p>
      </div>
    );
  }

  if (!data?.page) {
    return (
      <div className="container py-12">
        <p className="text-white/70">{lang === 'de' ? 'Keine Daten' : 'No data'}</p>
      </div>
    );
  }

  return (
    <>
      <Seo title={data.page.title} description={data.page.description} />
      {data.page.blocks?.map((block: PageBlock, i: number) => (
        <BlockRenderer key={i} block={block} />
      ))}
    </>
  );
};
