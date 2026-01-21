import React from 'react';
import type { SupportedLang } from '@/shared/config/i18n';
import { Seo } from '@/shared/ui/Seo';
import { Button } from '@/shared/ui/Button';
import { SmartLink } from '@/shared/ui/SmartLink';
import { tinaField } from 'tinacms/dist/react';
import { useAboutPageData } from '@/shared/lib/tina/useAboutPageData';
import { TeamGridBlock } from '@/widgets/blocks/TeamGridBlock';
import { CheckCircle, Hammer } from 'lucide-react';

export interface AboutPageProps {
  lang: SupportedLang;
}

export const AboutPage: React.FC<AboutPageProps> = ({ lang }) => {
  const { data, isLoading, error } = useAboutPageData(lang);
  const about = data?.aboutPage;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !about) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-muted-foreground">Seite konnte nicht geladen werden.</p>
      </div>
    );
  }

  return (
    <>
      <Seo
        title={about.seo?.title || 'Über Uns - Ivangs Bedachungen'}
        description={about.seo?.description}
        ogImage={about.seo?.ogImage}
        ogLocale="de_DE"
        ogSiteName="Ivangs Bedachungen"
      />

      <div className="animate-fade-in">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 bg-slate-900 text-white overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl">
              {about.hero?.eyebrow && (
                <p 
                  className="text-primary font-bold uppercase tracking-wider mb-4"
                  data-tina-field={about.hero && tinaField(about.hero, 'eyebrow')}
                >
                  {about.hero.eyebrow}
                </p>
              )}
              <h1 
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
                data-tina-field={about.hero && tinaField(about.hero, 'title')}
              >
                {about.hero?.title}
              </h1>
              {about.hero?.description && (
                <p 
                  className="text-xl text-slate-300 max-w-2xl"
                  data-tina-field={about.hero && tinaField(about.hero, 'description')}
                >
                  {about.hero.description}
                </p>
              )}
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 
                  className="text-3xl md:text-4xl font-bold mb-6 text-slate-900"
                  data-tina-field={about.story && tinaField(about.story, 'title')}
                >
                  {about.story?.title}
                </h2>
                <p 
                  className="text-lg text-slate-600 mb-4"
                  data-tina-field={about.story && tinaField(about.story, 'text1')}
                >
                  {about.story?.text1}
                </p>
                <p 
                  className="text-lg text-slate-600"
                  data-tina-field={about.story && tinaField(about.story, 'text2')}
                >
                  {about.story?.text2}
                </p>
              </div>
              {about.story?.image && (
                <div className="relative">
                  <img
                    src={about.story.image}
                    alt="Über Ivangs Bedachungen"
                    className="rounded-lg shadow-xl w-full h-auto"
                    data-tina-field={about.story && tinaField(about.story, 'image')}
                  />
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Values Section */}
        {about.values && about.values.length > 0 && (
          <section className="py-16 md:py-20 bg-slate-50">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto">
                <ul className="space-y-4">
                  {about.values.map((value: { text: string; icon?: string }, index: number) => (
                    <li 
                      key={index} 
                      className="flex items-start gap-4 bg-white p-4 rounded-lg shadow-sm"
                      data-tina-field={value && tinaField(value, 'text')}
                    >
                      <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-lg text-slate-700">{value.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        )}

        {/* Equipment Section */}
        {about.equipment && (
          <section className="py-16 md:py-24 bg-white">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
                  <Hammer className="w-8 h-8 text-primary" />
                </div>
                <h2 
                  className="text-3xl md:text-4xl font-bold mb-6 text-slate-900"
                  data-tina-field={about.equipment && tinaField(about.equipment, 'title')}
                >
                  {about.equipment.title}
                </h2>
                <p 
                  className="text-lg text-slate-600"
                  data-tina-field={about.equipment && tinaField(about.equipment, 'description')}
                >
                  {about.equipment.description}
                </p>
              </div>
            </div>
          </section>
        )}

        {/* Team Section */}
        {about.teamSection && (
          <section className="py-16 md:py-24 bg-slate-50">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 
                  className="text-3xl md:text-4xl font-bold mb-4 text-slate-900"
                  data-tina-field={about.teamSection && tinaField(about.teamSection, 'title')}
                >
                  {about.teamSection.title}
                </h2>
                <p 
                  className="text-lg text-slate-600 max-w-2xl mx-auto"
                  data-tina-field={about.teamSection && tinaField(about.teamSection, 'description')}
                >
                  {about.teamSection.description}
                </p>
              </div>
              <TeamGridBlock data={{ showEmail: true, categories: ['leadership', 'office', 'craftsmen'] }} />
            </div>
          </section>
        )}

        {/* CTA Section */}
        {about.cta && (
          <section className="py-16 md:py-24 bg-slate-900 text-white">
            <div className="container mx-auto px-4 text-center">
              <h2 
                className="text-3xl md:text-4xl font-bold mb-6"
                data-tina-field={about.cta && tinaField(about.cta, 'title')}
              >
                {about.cta.title}
              </h2>
              <p 
                className="text-xl text-slate-300 max-w-2xl mx-auto mb-8"
                data-tina-field={about.cta && tinaField(about.cta, 'description')}
              >
                {about.cta.description}
              </p>
              <SmartLink link={`/${lang}/contact`}>
                <Button 
                  variant="default" 
                  size="lg"
                  className="bg-primary hover:bg-primary/90"
                  data-tina-field={about.cta && tinaField(about.cta, 'buttonText')}
                >
                  {about.cta.buttonText || 'Kontakt aufnehmen'}
                </Button>
              </SmartLink>
            </div>
          </section>
        )}
      </div>
    </>
  );
};
