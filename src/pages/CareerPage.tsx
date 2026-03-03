import React from 'react';
import type { SupportedLang } from '@/shared/config/i18n';
import { Seo } from '@/shared/ui/Seo';
import { Button } from '@/shared/ui/Button';
import { Accordion } from '@/shared/ui/Accordion';
import { SmartLink } from '@/shared/ui/SmartLink';
import { Skeleton, SkeletonCard, SkeletonText } from '@/shared/ui/Skeleton';
import { tinaField } from 'tinacms/dist/react';
import { useCareerPageData } from '@/shared/lib/tina/useCareerPageData';
import { JobListing } from '@/features/career/ui/JobListing';
import { CareerWizard } from '@/features/career/ui/CareerWizard';
import { useJobsData } from '@/shared/lib/tina/useJobsData';
import { Wallet, Wrench, Users, GraduationCap } from 'lucide-react';

export interface CareerPageProps {
  lang: SupportedLang;
}

const BENEFITS = [
  {
    icon: Wallet,
    title: 'Faire Bezahlung',
    description: 'Übertarifliche Vergütung und pünktliche Auszahlung.',
  },
  {
    icon: Wrench,
    title: 'Modernes Equipment',
    description: 'Eigener Kran, 8 LKWs und neueste Werkzeuge.',
  },
  {
    icon: Users,
    title: 'Starkes Team',
    description: '28 Kollegen, die aufeinander achten.',
  },
  {
    icon: GraduationCap,
    title: 'Weiterbildung',
    description: 'Regelmäßige Schulungen und Aufstiegschancen.',
  },
];

export const CareerPage: React.FC<CareerPageProps> = ({ lang }) => {
  const { data, isLoading, error } = useCareerPageData(lang);
  const { data: jobsData } = useJobsData();
  const career = data?.careerPage;
  const jobs = jobsData?.jobConnection?.edges?.map((edge: any) => edge.node) || [];

  if (isLoading) {
    return (
      <div className="absolute inset-0 bg-slate-900 animate-pulse flex items-center justify-center">
        <Skeleton variant="rectangular" width="40%" height="60%" className="rounded-xl opacity-20" />
      </div>
    );
  }

  if (error || !career) {
    return (
      <div className="flex items-center justify-center min-h-dvh">
        <p className="text-muted-foreground">Seite konnte nicht geladen werden.</p>
      </div>
    );
  }

  return (
    <>
      <Seo
        title={career.seo?.title || 'Karriere bei Ivangs - Werde Teil des Teams'}
        description={career.seo?.description}
        ogImage={career.seo?.ogImage ? { url: career.seo.ogImage, alt: career.seo?.title || 'Karriere bei Ivangs' } : undefined}
        ogLocale="de_DE"
        ogSiteName="Ivangs Bedachungen"
      />

      <div className="animate-fade-in bg-slate-50 min-h-screen">
        {/* Interactive Hero with Glassmorphic Wizard */}
        <section
          className="relative text-white overflow-hidden min-h-[80vh] flex items-center pt-24 pb-16 lg:py-24"
        >
          {/* Background Image / Gradient */}
          <div
            className="absolute inset-0 z-0 bg-slate-900"
            style={career.hero?.backgroundImage ? {
              backgroundImage: `url(${career.hero.backgroundImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            } : undefined}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-900/40" />
          </div>

          <div className="container mx-auto px-4 relative z-10 flex flex-col xl:flex-row items-center gap-12 xl:gap-24">

            {/* Hero Left Content */}
            <div className="flex-1 w-full max-w-2xl text-center xl:text-left">
              {career.hero?.eyebrow && (
                <p
                  className="inline-block px-4 py-1.5 rounded-full bg-primary/20 text-primary font-bold uppercase tracking-wider text-sm mb-6 border border-primary/20"
                  data-tina-field={career.hero && tinaField(career.hero, 'eyebrow')}
                >
                  {career.hero.eyebrow}
                </p>
              )}
              <h1
                className="text-4xl md:text-5xl lg:text-h1 font-bold mb-6 text-white leading-tight"
                data-tina-field={career.hero && tinaField(career.hero, 'title')}
              >
                {career.hero?.title}
              </h1>
              {career.hero?.description && (
                <p
                  className="text-lg md:text-xl text-slate-300 mb-8 max-w-xl mx-auto xl:mx-0"
                  data-tina-field={career.hero && tinaField(career.hero, 'description')}
                >
                  {career.hero.description}
                </p>
              )}
              <div className="flex flex-wrap gap-4 justify-center xl:justify-start">
                <a href="#jobs">
                  <Button variant="default" size="xl" className="shadow-[0_0_20px_rgba(var(--primary),0.4)]">
                    Offene Stellen besehen
                  </Button>
                </a>
              </div>
            </div>

            {/* Hero Right: Floating Frost Glass Wizard */}
            {career.wizardSection && (
              <div className="flex-1 w-full max-w-lg xl:max-w-xl">
                <div className="rounded-3xl p-[1px] bg-gradient-to-br from-white/30 to-white/5 shadow-2xl">
                  <div className="rounded-3xl bg-slate-900/60 backdrop-blur-2xl p-6 sm:p-8">
                    <h2
                      className="text-xl font-bold text-white mb-2"
                      data-tina-field={career.wizardSection && tinaField(career.wizardSection, 'title')}
                    >
                      {career.wizardSection.title || "Karriere-Finder"}
                    </h2>
                    <p
                      className="text-slate-300 text-sm mb-6 pb-6 border-b border-white/10"
                      data-tina-field={career.wizardSection && tinaField(career.wizardSection, 'description')}
                    >
                      {career.wizardSection.description || "Finde in 2 Minuten heraus, ob wir zusammenpassen."}
                    </p>

                    {/* The Wizard component itself */}
                    <div className="wizard-container-dark">
                      <CareerWizard />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Dynamic Benefits Section */}
        <section className="py-20 md:py-32 bg-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/2"></div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16 max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-h2 font-bold text-slate-900 mb-4">Warum IVANGS?</h2>
              <p className="text-lg text-slate-600">Wir bieten mehr als nur einen sicheren Arbeitsplatz. Entdecke, was dich bei uns erwartet.</p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
              {BENEFITS.map((benefit, index) => (
                <div
                  key={index}
                  className="group relative p-8 bg-surface-elevated rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:border-primary/30 transition-all duration-500 hover:-translate-y-1 overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl -mr-10 -mt-10 group-hover:bg-primary/10 transition-colors"></div>

                  <div className="relative z-10">
                    <div className="inline-flex items-center justify-center w-14 h-14 bg-primary/10 text-primary rounded-xl mb-6 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-sm">
                      <benefit.icon className="w-7 h-7" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">{benefit.title}</h3>
                    <p className="text-slate-600 leading-relaxed">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Elevated Jobs Grid Section */}
        <section id="jobs" className="py-20 md:py-32 bg-surface-subtle">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
              <div className="max-w-2xl">
                <p className="text-primary font-bold uppercase tracking-wider mb-2">Karriere bei IVANGS</p>
                <h2
                  className="text-3xl md:text-h2 font-bold text-slate-900"
                  data-tina-field={career.jobsSection && tinaField(career.jobsSection, 'title')}
                >
                  {career.jobsSection?.title || 'Werde Teil unseres Teams'}
                </h2>
              </div>
              <div className="flex-shrink-0">
                <SmartLink link={`/contact`}>
                  <Button variant="outline" className="bg-white hover:bg-slate-50">
                    Initiativbewerbung senden
                  </Button>
                </SmartLink>
              </div>
            </div>

            {jobs.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-6 items-stretch">
                {jobs.filter((job: any) => job.published !== false).map((job: any, index: number) => (
                  <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100/60 hover:shadow-lg transition-shadow flex flex-col h-full">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        {job.type && <span className="inline-block px-3 py-1 bg-slate-100 text-slate-600 text-xs font-medium rounded-full mb-3">{job.type}</span>}
                        <h3 className="text-xl font-bold text-slate-900">{job.title}</h3>
                      </div>
                      {job.department && <span className="text-sm text-primary font-semibold hidden sm:block">{job.department}</span>}
                    </div>
                    <p className="text-slate-600 mb-6">{job.shortDescription || 'Werde Teil unseres erfolgreichen Teams und arbeite an spannenden Projekten in der Region.'}</p>
                    <div className="mt-auto">
                      <JobListing job={job} lang={lang} isCardMode={true} />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-3xl border border-slate-100/60 shadow-sm">
                <p
                  className="text-lg text-slate-600 max-w-2xl mx-auto"
                  data-tina-field={career.jobsSection && tinaField(career.jobsSection, 'emptyMessage')}
                >
                  {career.jobsSection?.emptyMessage || 'Aktuell keine offenen Stellen verfügbar. Initiativbewerbungen sind jederzeit willkommen!'}
                </p>
                <SmartLink link={`/contact`}>
                  <Button className="mt-6">Jetzt initiativ bewerben</Button>
                </SmartLink>
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-full h-full bg-[url('/images/noise.png')] opacity-20 mix-blend-overlay pointer-events-none"></div>
          <div className="absolute -top-[300px] -right-[300px] w-[800px] h-[800px] bg-primary/20 rounded-full blur-[120px] pointer-events-none"></div>

          <div className="container mx-auto px-4 text-center relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Nichts passendes dabei?</h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed">
              Gute Leute können wir immer gebrauchen. Zeig uns, was du drauf hast, und bewirb dich initiativ. Wir melden uns umgehend bei dir zurück!
            </p>
            <SmartLink link={`/contact`}>
              <Button size="2xl" className="bg-primary hover:bg-primary/90 text-white shadow-[0_0_30px_rgba(var(--primary),0.3)]">
                Jetzt Initiativbewerbung starten
              </Button>
            </SmartLink>
          </div>
        </section>
      </div>
    </>
  );
};
