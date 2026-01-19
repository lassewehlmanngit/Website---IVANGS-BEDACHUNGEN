import React from 'react';
import { SupportedLang } from '@/shared/config/i18n';
import { Seo } from '@/shared/ui/Seo';
import { CareerWizard } from '@/features/career/ui/CareerWizard';

export const CareerPage: React.FC<{ lang: SupportedLang }> = ({ lang }) => {
  return (
    <>
      <Seo 
        title="Karriere bei Ivangs - Werde Teil des Teams" 
        description="Jobs für Dachdecker und Bürokräfte im Kreis Viersen. Finde heraus, ob du zu uns passt."
      />
      <div className="bg-slate-50 min-h-screen">
         <div className="bg-slate-900 text-white py-20 text-center">
            <div className="container mx-auto px-4">
                <h1 className="text-4xl md:text-5xl font-bold mb-6">Deine Karriere auf dem Dach.</h1>
                <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                    Wir suchen Verstärkung. Egal ob auf der Baustelle oder im Büro. 
                    Mach den Check und finde heraus, ob wir zusammenpassen.
                </p>
            </div>
         </div>

         <div className="container mx-auto px-4 py-16 -mt-10 relative z-10">
             <CareerWizard />
         </div>

         <div className="container mx-auto px-4 py-20 text-center">
            <h2 className="text-2xl font-bold mb-8">Warum Ivangs?</h2>
            <div className="grid md:grid-cols-3 gap-8 text-left">
                <div className="bg-white p-6 rounded-xl shadow-sm">
                    <h3 className="font-bold text-lg mb-2">Top Bezahlung</h3>
                    <p className="text-slate-600 text-sm">Überdurchschnittlicher Stundenlohn und Weihnachtsgeld.</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm">
                    <h3 className="font-bold text-lg mb-2">Modernes Werkzeug</h3>
                    <p className="text-slate-600 text-sm">Kein alter Schrott. Wir arbeiten mit dem besten Equipment.</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm">
                    <h3 className="font-bold text-lg mb-2">Starkes Team</h3>
                    <p className="text-slate-600 text-sm">Einer für alle, alle für einen. Familiäres Betriebsklima.</p>
                </div>
            </div>
         </div>
      </div>
    </>
  );
};
