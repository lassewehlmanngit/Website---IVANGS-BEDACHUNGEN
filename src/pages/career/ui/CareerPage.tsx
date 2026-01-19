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

const CAREER_HERO_IMG = "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2070&auto=format&fit=crop";

export const CareerPage: React.FC<{ lang: SupportedLang }> = ({ lang }) => {
  const navigate = useNavigate();

  return (
    <>
      <Seo 
        title="Karriere bei Ivangs - Werde Teil des Teams" 
        description="Jobs für Dachdecker und Bürokräfte im Kreis Viersen. Finde heraus, ob du zu uns passt."
        ogLocale="de_DE"
        ogSiteName="Ivangs Bedachungen"
      />
      <div className="animate-fade-in bg-slate-50 min-h-screen">
        
        {/* Hero Header */}
        <div className="relative h-[40vh] min-h-[400px]">
          <OptimizedImage 
            src={CAREER_HERO_IMG}
            className="w-full h-full object-cover" 
            alt="Dachdecker bei der Arbeit auf einem Dach"
            srcSet={generateUnsplashSrcSet(CAREER_HERO_IMG)}
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/70 to-slate-900/80 flex items-center justify-center">
            <div className="text-center px-4">
              <span className="text-primary-400 font-bold uppercase tracking-widest text-sm mb-4 block drop-shadow-md">Karriere bei Ivangs</span>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">Bock auf Handwerk? Komm ins Team Ivangs.</h1>
              <p className="text-slate-200 text-lg max-w-2xl mx-auto drop-shadow-md font-medium">
                Wir suchen Macher, keine Nummern. 28 Kollegen freuen sich auf dich.
              </p>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-20">
           <div className="grid lg:grid-cols-12 gap-16">
             
             {/* Left Column: Job Listings */}
             <div className="lg:col-span-7">
                <h2 className="text-3xl font-bold text-slate-900 mb-8">Offene Stellen</h2>
                <div className="space-y-6">
                   <Accordion type="single" collapsible>
                     {jobsData.map((job, i) => (
                       <JobListing key={i} job={job} lang={lang} />
                     ))}
                   </Accordion>
                </div>
             </div>
             
             {/* Right Column: Wizard & Sidebar */}
             <div className="lg:col-span-5 space-y-8">
               <div className="bg-white p-8 rounded-sm shadow-xl border border-slate-100">
                 <h3 className="text-xl font-bold mb-6 text-slate-900">Karriere Finder</h3>
                 <p className="text-sm text-slate-500 mb-6">Unsicher welche Stelle passt? Beantworte 3 Fragen.</p>
                 <CareerWizard />
               </div>

               <div className="bg-slate-900 text-white p-8 rounded-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary rounded-full blur-[50px] opacity-20 -mr-10 -mt-10"></div>
                  <h3 className="text-xl font-bold mb-4 relative z-10">Initiativbewerbung</h3>
                  <p className="text-slate-400 text-sm mb-6 relative z-10">
                    Keine passende Stelle dabei? Wir freuen uns immer über motivierte Bewerber.
                  </p>
                  <Button 
                    onClick={() => navigate(`/${lang}/contact`)}
                    className="w-full bg-white text-slate-900 font-bold py-3 rounded-sm hover:bg-slate-200 transition-colors"
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
