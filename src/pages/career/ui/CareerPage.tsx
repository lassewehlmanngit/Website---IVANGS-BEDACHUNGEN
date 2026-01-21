import React from 'react';
import { SupportedLang } from '@/shared/config/i18n';
import { Seo } from '@/shared/ui/Seo';
import { CareerWizard } from '@/features/career/ui/CareerWizard';
import { jobsData } from '@/features/career/model/jobsData';
import { JobListing } from '@/features/career/ui/JobListing';
import { Accordion } from '@/shared/ui/Accordion';
import { Button } from '@/shared/ui/Button';
import { useNavigate } from 'react-router-dom';
import { OptimizedImage, generateUnsplashSrcSet } from '@/shared/ui/Image';
import { tinaField } from 'tinacms/dist/react';
import { useJobsData } from '@/shared/lib/tina/useJobsData';
import { usePageContent } from '@/shared/lib/tina/usePageContent';

export const CareerPage: React.FC<{ lang: SupportedLang }> = ({ lang }) => {
  const navigate = useNavigate();
  
  // Fetch career page data and global settings from TinaCMS
  const { page: career, global, isLoading: careerLoading } = usePageContent('career');
  
  // Fetch jobs data from TinaCMS with visual editing support
  const { data, isLoading } = useJobsData();
  
  const hero = career?.hero || {};
  const jobsSection = career?.jobsSection || {};
  const wizardSection = career?.wizardSection || {};
  
  // Show loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  // Use TinaCMS data if available, otherwise fall back to static data
  // Filter for published jobs only
  const jobs = data?.jobConnection?.edges
    ? data.jobConnection.edges
        .map((edge: any) => edge.node)
        .filter((job: any) => job.published !== false)
    : jobsData;

  return (
    <>
      <Seo 
        title={career.seo?.title || "Karriere bei Ivangs - Werde Teil des Teams"}
        description={career.seo?.description || "Arbeite bei einem der führenden Dachdeckerbetriebe im Kreis Viersen. Faire Bezahlung, modernes Equipment, starkes Team."}
        ogLocale="de_DE"
        ogSiteName="Ivangs Bedachungen"
      />
      <div className="animate-fade-in bg-slate-50 min-h-screen">
        
        {/* Hero Header */}
        <div className="relative h-[60vh] md:h-[50vh] min-h-[400px] max-h-[600px] overflow-hidden">
          <OptimizedImage 
            src={hero.backgroundImage || ""}
            className="absolute inset-0 w-full h-full object-cover" 
            alt="Dachdecker bei der Arbeit auf einem Dach"
            srcSet={hero.backgroundImage ? generateUnsplashSrcSet(hero.backgroundImage) : undefined}
            sizes="100vw"
            priority
            data-tina-field={career?.hero && tinaField(career.hero, 'backgroundImage')}
          />
          {/* Stronger overlay for better text readability */}
          <div className="absolute inset-0 bg-slate-900/80 flex items-center justify-center">
            <div className="container mx-auto px-4">
              <div className="text-center max-w-4xl mx-auto">
                {/* Text container with semi-transparent background */}
                <div className="bg-slate-900/80 supports-[backdrop-filter]:bg-slate-900/60 backdrop-blur-sm px-4 sm:px-6 md:px-8 py-6 md:py-8 lg:py-10 rounded-sm border border-white/10">
                  <span 
                    className="text-primary font-bold uppercase tracking-widest text-xs sm:text-sm mb-3 md:mb-4 block"
                    data-tina-field={career?.hero && tinaField(career.hero, 'eyebrow')}
                  >
                    {hero.eyebrow || 'Karriere bei Ivangs'}
                  </span>
                  <h1 
                    className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-3 md:mb-4 lg:mb-6"
                    data-tina-field={career?.hero && tinaField(career.hero, 'title')}
                  >
                    {hero.title || 'Bock auf Handwerk? Komm ins Team Ivangs.'}
                  </h1>
                  <p 
                    className="text-slate-200 text-sm sm:text-base md:text-lg max-w-2xl mx-auto font-medium"
                    data-tina-field={career?.hero && tinaField(career.hero, 'description')}
                  >
                    {hero.description || 'Wir suchen Macher, keine Nummern. 28 Kollegen freuen sich auf dich.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12 md:py-20">
           <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
             
             {/* Left Column: Job Listings */}
             <div className="lg:col-span-7 order-2 lg:order-1">
                <h2 
                  className="text-h2 font-bold text-slate-900 mb-6 md:mb-8"
                  data-tina-field={career?.jobsSection && tinaField(career.jobsSection, 'title')}
                >
                  {jobsSection.title || 'Offene Stellen'}
                </h2>
                {jobs.length > 0 ? (
                  <div className="space-y-4 md:space-y-6">
                     <Accordion type="single" collapsible className="w-full border-none divide-y-0 rounded-none bg-transparent">
                       {jobs.map((job: any, i: number) => (
                         <JobListing key={i} job={job} lang={lang} useTinaField={!!data?.jobConnection} />
                       ))}
                     </Accordion>
                  </div>
                ) : (
                  <p 
                    className="text-slate-600"
                    data-tina-field={career?.jobsSection && tinaField(career.jobsSection, 'emptyMessage')}
                  >
                    {jobsSection.emptyMessage || 'Aktuell keine offenen Stellen verfügbar.'}
                  </p>
                )}
             </div>
             
             {/* Right Column: Wizard & Sidebar */}
             <div className="lg:col-span-5 space-y-6 md:space-y-8 order-1 lg:order-2">
               <div className="bg-white p-6 md:p-8 rounded-sm shadow-xl border border-slate-100">
                 <h3 
                   className="text-h4 font-bold mb-4 md:mb-6 text-slate-900"
                   data-tina-field={career?.wizardSection && tinaField(career.wizardSection, 'title')}
                 >
                   {wizardSection.title || 'Karriere Finder'}
                 </h3>
                 <p 
                   className="text-sm text-slate-500 mb-4 md:mb-6"
                   data-tina-field={career?.wizardSection && tinaField(career.wizardSection, 'description')}
                 >
                   {wizardSection.description || 'Unsicher welche Stelle passt? Beantworte 3 Fragen.'}
                 </p>
                 <CareerWizard />
               </div>

               <div className="bg-slate-900 text-white p-6 md:p-8 rounded-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary rounded-full blur-[50px] opacity-20 -mr-10 -mt-10"></div>
                  <h3 className="text-h4 font-bold mb-3 md:mb-4 relative z-10">Initiativbewerbung</h3>
                  <p className="text-slate-400 text-sm mb-4 md:mb-6 relative z-10">
                    Keine passende Stelle dabei? Wir freuen uns immer über motivierte Bewerber.
                  </p>
                  <Button 
                    onClick={() => navigate(`/${lang}/contact`)}
                    className="relative z-10 w-full bg-white text-slate-900 font-bold py-3 rounded-sm hover:bg-slate-200 transition-colors"
                  >
                    Kontakt aufnehmen
                  </Button>
               </div>
             </div>
           </div>
        </div>
      </div>
    </>
  );
};
