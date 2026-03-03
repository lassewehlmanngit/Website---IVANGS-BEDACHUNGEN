import React from 'react';
import type { SupportedLang } from '@/shared/config/i18n';
import { Seo } from '@/shared/ui/Seo';
import { Button } from '@/shared/ui/Button';
import { SmartLink } from '@/shared/ui/SmartLink';
import { PageHero } from '@/shared/ui/PageHero';
import { Skeleton, SkeletonText } from '@/shared/ui/Skeleton';
import { tinaField } from 'tinacms/dist/react';
import { useAboutPageData } from '@/shared/lib/tina/useAboutPageData';
import { TeamGridBlock } from '@/widgets/blocks/TeamGridBlock';
import { CheckCircle, Hammer } from 'lucide-react';

export interface AboutPageProps {
  lang: SupportedLang;
}

export const AboutPage: React.FC<AboutPageProps> = ({ lang }) => {
  const { data, isLoading, error } = useAboutPageData(lang);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const about = (data as any)?.aboutPage;

  if (isLoading) {
    return (
      <div className="absolute inset-0 bg-slate-900 animate-pulse flex items-center justify-center">
        <Skeleton variant="rectangular" width="40%" height="60%" className="rounded-xl opacity-20" />
      </div>
    );
  }

  if (error || !about) {
    return (
      <div className="flex items-center justify-center min-h-dvh">
        <p className="text-muted-foreground">Seite konnte nicht geladen werden.</p>
      </div>
    );
  }

  // Pre-defined bento box configurations for up to 4 values
  const bentoGridClasses = [
    "col-span-12 lg:col-span-8 bg-slate-900 text-white rounded-[2rem] p-10 shadow-lg relative overflow-hidden group",
    "col-span-12 lg:col-span-4 bg-primary text-white rounded-[2rem] p-10 shadow-lg relative overflow-hidden group",
    "col-span-12 lg:col-span-5 bg-white border border-slate-100 rounded-[2rem] p-10 shadow-md relative group",
    "col-span-12 lg:col-span-7 bg-surface-subtle border border-slate-100 rounded-[2rem] p-10 shadow-md relative group"
  ];

  return (
    <>
      <Seo
        title={about.seo?.title || 'Über Uns - Ivangs Bedachungen'}
        description={about.seo?.description}
        ogImage={about.seo?.ogImage ? { url: about.seo.ogImage, alt: about.seo?.title || 'Über Uns - Ivangs Bedachungen' } : undefined}
        ogLocale="de_DE"
        ogSiteName="Ivangs Bedachungen"
      />

      <div className="animate-fade-in bg-slate-50 min-h-screen">
        {/* Modern Minimal Hero Section */}
        <section className="pt-32 pb-16 md:pt-40 md:pb-24 px-4 bg-white text-center relative overflow-hidden">
          {/* Subtle grid background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20"></div>

          <div className="container mx-auto max-w-4xl relative z-10">
            {about.hero?.eyebrow && (
              <p
                className="text-primary font-bold uppercase tracking-widest text-sm mb-6"
                data-tina-field={about.hero && tinaField(about.hero, 'eyebrow')}
              >
                {about.hero.eyebrow}
              </p>
            )}
            <h1
              className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight leading-[1.1] mb-8"
              data-tina-field={about.hero && tinaField(about.hero, 'title')}
            >
              {about.hero?.title || 'Wir sind Ivangs.'}
            </h1>
            {about.hero?.description && (
              <p
                className="text-xl md:text-2xl text-slate-600 leading-relaxed max-w-2xl mx-auto"
                data-tina-field={about.hero && tinaField(about.hero, 'description')}
              >
                {about.hero.description}
              </p>
            )}
          </div>
        </section>

        {/* Immersive Story Section (Image Collage) */}
        <section className="py-20 md:py-32 bg-white relative">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

              {/* Text Side */}
              <div className="order-2 lg:order-1">
                <h2
                  className="text-4xl md:text-5xl font-bold mb-8 text-slate-900 leading-tight"
                  data-tina-field={about.story && tinaField(about.story, 'title')}
                >
                  {about.story?.title}
                </h2>
                <div className="prose prose-lg prose-slate text-slate-600">
                  <p
                    className="text-xl leading-relaxed mb-6 font-medium"
                    data-tina-field={about.story && tinaField(about.story, 'text1')}
                  >
                    {about.story?.text1}
                  </p>
                  <p
                    className="leading-relaxed"
                    data-tina-field={about.story && tinaField(about.story, 'text2')}
                  >
                    {about.story?.text2}
                  </p>
                </div>
              </div>

              {/* Image Collage Side */}
              <div className="order-1 lg:order-2 relative">
                {/* Decorative background blur */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>

                {about.story?.image && (
                  <div className="relative z-10 aspect-[4/5] md:aspect-square lg:aspect-[4/5] w-full max-w-lg mx-auto">
                    {/* Main Image */}
                    <img
                      src={about.story.image}
                      alt="Über Ivangs Bedachungen"
                      className="absolute inset-0 w-full h-full object-cover rounded-[2rem] shadow-2xl"
                      data-tina-field={about.story && tinaField(about.story, 'image')}
                    />

                    {/* Floating Accent Card (Optional, visually represents the "collage" feel) */}
                    <div className="absolute -bottom-8 -left-8 md:-left-12 bg-white p-6 md:p-8 rounded-[1.5rem] shadow-xl border border-slate-100 max-w-[240px] hidden sm:block animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                        <CheckCircle className="w-6 h-6 text-primary" />
                      </div>
                      <p className="font-bold text-slate-900 text-lg leading-tight mb-2">Tradition & Innovation</p>
                      <p className="text-sm text-slate-500">Zwei Generationen Dachdeckerhandwerk.</p>
                    </div>

                    {/* Secondary decorative image or pattern block */}
                    <div className="absolute -top-8 -right-8 w-40 h-40 bg-[url('/images/noise.png')] opacity-50 rounded-[1.5rem] hidden md:block mix-blend-multiply" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Bento Box Grid for Values (Wir-Gefühl) */}
        {about.values && about.values.length > 0 && (
          <section className="py-20 md:py-32 bg-slate-50">
            <div className="container mx-auto px-4">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <p className="text-primary font-bold uppercase tracking-wider mb-4">Inhabergeführt</p>
                <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">Unser Wir-Gefühl</h2>
                <p className="text-xl text-slate-600 mt-6">Was uns als Team auszeichnet und wie wir arbeiten.</p>
              </div>

              <div className="grid grid-cols-12 gap-6 max-w-6xl mx-auto">
                {about.values.map((value: { text: string; icon?: string }, index: number) => {
                  const styleClass = bentoGridClasses[index % bentoGridClasses.length];
                  // Determine text styling based on background
                  const isDark = index === 0 || index === 1;

                  return (
                    <div
                      key={index}
                      className={styleClass}
                      data-tina-field={value && tinaField(value, 'text')}
                    >
                      {/* Decorative background element per card */}
                      {isDark && <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/5 rounded-full blur-2xl group-hover:bg-white/10 transition-colors"></div>}
                      {!isDark && <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors"></div>}

                      <div className="relative z-10 flex flex-col h-full justify-between">
                        <CheckCircle className={`w-10 h-10 mb-8 ${isDark ? 'text-white/80' : 'text-primary'}`} />
                        <h3 className={`text-2xl md:text-3xl font-bold leading-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                          {value.text}
                        </h3>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* Equipment Section (Enhanced with hover scales) */}
        {about.equipment && (
          <section className="py-20 md:py-32 bg-white">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center mb-16">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-[2rem] mb-8">
                  <Hammer className="w-10 h-10 text-primary" />
                </div>
                <h2
                  className="text-4xl md:text-5xl font-bold mb-6 text-slate-900 tracking-tight"
                  data-tina-field={about.equipment && tinaField(about.equipment, 'title')}
                >
                  {about.equipment.title}
                </h2>
                <p
                  className="text-xl text-slate-600"
                  data-tina-field={about.equipment && tinaField(about.equipment, 'description')}
                >
                  {about.equipment.description}
                </p>
              </div>

              {/* Fleet / Equipment Gallery */}
              {about.equipment.gallery && about.equipment.gallery.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                  {about.equipment.gallery.map((item: any, index: number) => (
                    <div
                      key={index}
                      className="rounded-[2rem] overflow-hidden bg-slate-100 relative group h-64 md:h-80 shadow-md"
                      data-tina-field={tinaField(about.equipment, `gallery.${index}`)}
                    >
                      <img
                        src={item.image || '/images/placeholder-fleet.jpg'}
                        alt={item.alt || 'Fuhrpark & Ausstattung'}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)]"
                      />
                      {/* Dark Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>

                      {item.alt && (
                        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                          <p className="text-white text-lg font-bold">{item.alt}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        {/* Team Section */}
        {about.teamSection && (
          <div className="bg-slate-50 pt-10 pb-20">
            <TeamGridBlock data={{
              title: about.teamSection.title,
              description: about.teamSection.description,
              showEmail: true,
              categories: ['leadership', 'office', 'craftsmen']
            }} />
          </div>
        )}

        {/* CTA Section (Modern Dark) */}
        {about.cta && (
          <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
            {/* Ambient Background glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-primary/20 rounded-full blur-[150px] pointer-events-none"></div>

            <div className="container mx-auto px-4 text-center relative z-10">
              <h2
                className="text-4xl md:text-6xl font-bold mb-8 tracking-tight"
                data-tina-field={about.cta && tinaField(about.cta, 'title')}
              >
                {about.cta.title}
              </h2>
              <p
                className="text-xl md:text-2xl text-slate-300 max-w-2xl mx-auto mb-12"
                data-tina-field={about.cta && tinaField(about.cta, 'description')}
              >
                {about.cta.description}
              </p>
              <SmartLink link={`/contact`}>
                <Button
                  variant="default"
                  size="2xl"
                  className="bg-primary hover:bg-primary/90 shadow-[0_0_40px_rgba(var(--primary),0.3)] transform hover:-translate-y-1 transition-all"
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
