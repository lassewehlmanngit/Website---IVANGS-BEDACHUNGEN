import React from 'react';
import type { SupportedLang } from '@/shared/config/i18n';
import { Seo } from '@/shared/ui/Seo';
import { Button } from '@/shared/ui/Button';
import { SmartLink } from '@/shared/ui/SmartLink';
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
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !career) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-muted-foreground">Seite konnte nicht geladen werden.</p>
      </div>
    );
  }

  return (
    <>
      <Seo
        title={career.seo?.title || 'Karriere bei Ivangs - Werde Teil des Teams'}
        description={career.seo?.description}
        ogImage={career.seo?.ogImage}
        ogLocale="de_DE"
        ogSiteName="Ivangs Bedachungen"
      />

      <div className="animate-fade-in">
        {/* Hero Section */}
        <section 
          className="relative py-20 md:py-32 bg-slate-900 text-white overflow-hidden"
          style={career.hero?.backgroundImage ? {
            backgroundImage: `url(${career.hero.backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          } : undefined}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/95 via-slate-800/90 to-slate-900/95" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl">
              {career.hero?.eyebrow && (
                <p 
                  className="text-primary font-bold uppercase tracking-wider mb-4"
                  data-tina-field={career.hero && tinaField(career.hero, 'eyebrow')}
                >
                  {career.hero.eyebrow}
                </p>
              )}
              <h1 
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
                data-tina-field={career.hero && tinaField(career.hero, 'title')}
              >
                {career.hero?.title}
              </h1>
              {career.hero?.description && (
                <p 
                  className="text-xl text-slate-300 max-w-2xl mb-8"
                  data-tina-field={career.hero && tinaField(career.hero, 'description')}
                >
                  {career.hero.description}
                </p>
              )}
              <div className="flex flex-wrap gap-4">
                <a href="#jobs">
                  <Button variant="default" size="lg" className="bg-primary hover:bg-primary/90">
                    Offene Stellen
                  </Button>
                </a>
                <SmartLink link={`/${lang}/contact`}>
                  <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                    Initiativbewerbung
                  </Button>
                </SmartLink>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <p className="text-primary font-bold uppercase tracking-wider mb-4">Warum IVANGS?</p>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Das erwartet dich bei uns</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {BENEFITS.map((benefit, index) => (
                <div key={index} className="text-center p-6 bg-slate-50 rounded-lg">
                  <div className="inline-flex items-center justify-center w-14 h-14 bg-primary/10 rounded-full mb-4">
                    <benefit.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{benefit.title}</h3>
                  <p className="text-slate-600">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Jobs Section */}
        <section id="jobs" className="py-16 md:py-24 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 
                className="text-3xl md:text-4xl font-bold text-slate-900 mb-4"
                data-tina-field={career.jobsSection && tinaField(career.jobsSection, 'title')}
              >
                {career.jobsSection?.title || 'Offene Stellen'}
              </h2>
            </div>
            {jobs.length > 0 ? (
              <div className="max-w-3xl mx-auto space-y-6">
                {jobs.filter((job: any) => job.published !== false).map((job: any, index: number) => (
                  <JobListing key={index} job={job} lang={lang} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p 
                  className="text-lg text-slate-600"
                  data-tina-field={career.jobsSection && tinaField(career.jobsSection, 'emptyMessage')}
                >
                  {career.jobsSection?.emptyMessage || 'Aktuell keine offenen Stellen verfügbar. Initiativbewerbungen sind jederzeit willkommen!'}
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Career Wizard Section */}
        {career.wizardSection && (
          <section className="py-16 md:py-24 bg-white">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 
                  className="text-3xl md:text-4xl font-bold text-slate-900 mb-4"
                  data-tina-field={career.wizardSection && tinaField(career.wizardSection, 'title')}
                >
                  {career.wizardSection.title}
                </h2>
                <p 
                  className="text-lg text-slate-600"
                  data-tina-field={career.wizardSection && tinaField(career.wizardSection, 'description')}
                >
                  {career.wizardSection.description}
                </p>
              </div>
              <div className="max-w-2xl mx-auto">
                <CareerWizard />
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-primary text-white">
          <div className="container mx-auto px-4 text-center">
            <p className="text-primary-foreground/80 font-bold uppercase tracking-wider mb-4">Keine passende Stelle?</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Initiativbewerbung</h2>
            <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-8">
              Du hast keine passende Stelle gefunden? Bewirb dich trotzdem! Wir sind immer auf der Suche nach motivierten Mitarbeitern.
            </p>
            <SmartLink link={`/${lang}/contact`}>
              <Button variant="secondary" size="lg" className="bg-white text-primary hover:bg-white/90">
                Jetzt bewerben
              </Button>
            </SmartLink>
          </div>
        </section>
      </div>
    </>
  );
};
