import React from 'react';
import { Page } from '../../types';
import { Users, Target, Shield, Mail, CheckCircle, Home, Hammer } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="bg-slate-900 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary-900/10 z-0"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <span className="text-primary-400 font-bold uppercase tracking-wider text-sm mb-4 block">Das Unternehmen</span>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Seit 1996: Ein Familienbetrieb, der hoch hinaus will.</h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto leading-relaxed">
            Vom Ein-Mann-Betrieb zum 28-köpfigen Kompetenz-Team. Wir verbinden Tradition mit modernster Technik.
          </p>
        </div>
      </div>

      {/* Main Introduction */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-16 items-center">
           <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Qualität ist bei uns Familiensache.</h2>
              <p className="text-slate-600 text-lg leading-relaxed mb-6">
                Was 1996 als Vision von Dachdeckermeister Marcus Ivangs begann, ist heute eine feste Größe im Kreis Viersen und darüber hinaus. Doch trotz unseres Wachstums auf 28 Mitarbeiter und 8 LKWs haben wir eines nie verloren: Den persönlichen Draht zu unseren Kunden.
              </p>
              <p className="text-slate-600 text-lg leading-relaxed mb-8">
                Bei uns sind Sie keine Nummer, sondern ein Partner. Wir setzen auf langfristige Beziehungen und handwerkliche Ehrlichkeit.
              </p>
              
              <div className="flex flex-col gap-4">
                 <div className="flex items-center gap-3">
                   <CheckCircle className="text-primary-600 shrink-0" size={24} />
                   <span className="font-semibold text-slate-800">Inhabergeführt seit über 25 Jahren</span>
                 </div>
                 <div className="flex items-center gap-3">
                   <CheckCircle className="text-primary-600 shrink-0" size={24} />
                   <span className="font-semibold text-slate-800">Ausbildungsbetrieb (derzeit 5 Azubis)</span>
                 </div>
                 <div className="flex items-center gap-3">
                   <CheckCircle className="text-primary-600 shrink-0" size={24} />
                   <span className="font-semibold text-slate-800">Modernster Maschinenpark & eigener Kran</span>
                 </div>
              </div>
           </div>
           <div className="relative">
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary-100 rounded-sm -z-10"></div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-slate-100 rounded-sm -z-10"></div>
              <img 
                src="https://images.unsplash.com/photo-1621251939103-6f59c8821035?q=80&w=2070&auto=format&fit=crop" 
                alt="Modern Roof Architecture" 
                className="w-full h-auto rounded-md"
              />
           </div>
        </div>
      </section>

      {/* Equipment Section */}
      <section className="py-20 bg-primary-50">
         <div className="container mx-auto px-4 text-center max-w-4xl">
            <Hammer size={48} className="text-primary-600 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Wir warten nicht auf Material. Wir haben es.</h2>
            <p className="text-slate-600 text-lg leading-relaxed">
               Mit eigenen Lagerräumen, einem modernen Maschinenpark und dem firmeneigenen Autokran (IVANGS Bauservice) sind wir unabhängig von Mietfirmen und Lieferengpässen. Das bedeutet für Sie: <strong>Keine unnötigen Verzögerungen auf der Baustelle.</strong>
            </p>
         </div>
      </section>

      {/* Team / Leadership Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
             <h2 className="text-3xl font-bold text-slate-900">Menschen statt Maschinen.</h2>
             <p className="text-slate-600 mt-4 max-w-2xl mx-auto">Hinter jedem dichten Dach steht ein starkes Team. Jeder Handgriff sitzt, weil wir aufeinander eingespielt sind.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
             {/* Card 1 */}
             <div className="bg-slate-50 p-8 rounded-sm border border-slate-100">
                <h3 className="font-bold text-xl text-slate-900 mb-2">Führung & Planung</h3>
                <p className="text-slate-600 text-sm mb-4">Die Köpfe hinter dem Projekt.</p>
                <ul className="space-y-3">
                   <li className="flex gap-2"><div className="w-1.5 h-1.5 bg-primary-600 rounded-full mt-2"></div><span><strong>Marcus Ivangs</strong><br/><span className="text-xs text-slate-500">Geschäftsführer & Dachdeckermeister</span></span></li>
                   <li className="flex gap-2"><div className="w-1.5 h-1.5 bg-primary-600 rounded-full mt-2"></div><span><strong>Sascha Peters</strong><br/><span className="text-xs text-slate-500">Dachdeckermeister & Bauleitung</span></span></li>
                </ul>
             </div>

             {/* Card 2 */}
             <div className="bg-slate-50 p-8 rounded-sm border border-slate-100">
                <h3 className="font-bold text-xl text-slate-900 mb-2">Organisation & Büro</h3>
                <p className="text-slate-600 text-sm mb-4">Ihre Ansprechpartner am Telefon.</p>
                <ul className="space-y-3">
                   <li className="flex gap-2"><div className="w-1.5 h-1.5 bg-primary-600 rounded-full mt-2"></div><span><strong>Isabel Ivangs</strong><br/><span className="text-xs text-slate-500">Assistenz & Buchhaltung</span></span></li>
                   <li className="flex gap-2"><div className="w-1.5 h-1.5 bg-primary-600 rounded-full mt-2"></div><span><strong>Heike Hänsel</strong><br/><span className="text-xs text-slate-500">Personalwesen & Versicherung</span></span></li>
                   <li className="flex gap-2"><div className="w-1.5 h-1.5 bg-primary-600 rounded-full mt-2"></div><span><strong>Sabine Hammes</strong><br/><span className="text-xs text-slate-500">Reparaturenplanung</span></span></li>
                </ul>
             </div>

             {/* Card 3 */}
             <div className="bg-slate-50 p-8 rounded-sm border border-slate-100">
                <h3 className="font-bold text-xl text-slate-900 mb-2">Zukunft</h3>
                <p className="text-slate-600 text-sm mb-4">Wir bilden aus.</p>
                <p className="text-slate-600 leading-relaxed mb-4">
                   Wir nehmen unsere Ausbildungspflicht ernst. Derzeit bilden wir <strong>fünf Jung-Dachdecker</strong> aus, um das Handwerk am Leben zu halten und Qualität für die Zukunft zu sichern.
                </p>
             </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="container mx-auto px-4 text-center">
           <h2 className="text-3xl font-bold mb-6">Lernen Sie uns kennen</h2>
           <p className="text-slate-300 max-w-2xl mx-auto mb-8">
             Sie planen ein Neubauprojekt oder eine Sanierung? Lassen Sie uns darüber sprechen. Wir beraten Sie gerne unverbindlich vor Ort.
           </p>
           <a href="mailto:info@ivangs-bedachungen.de" className="inline-flex items-center gap-2 bg-primary-600 text-white px-8 py-4 rounded-sm font-bold hover:bg-primary-700 transition-colors shadow-lg">
             <Mail size={20} /> Kontakt aufnehmen
           </a>
        </div>
      </section>
    </div>
  );
};

export default About;