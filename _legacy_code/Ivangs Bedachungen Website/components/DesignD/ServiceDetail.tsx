import React from 'react';
import { Page, ServiceId } from '../../types';
import { ArrowLeft, ArrowRight, CheckCircle, Info } from 'lucide-react';

interface ServiceDetailProps {
  serviceId: ServiceId;
  setCurrentPage: (page: Page) => void;
}

const ServiceDetail: React.FC<ServiceDetailProps> = ({ serviceId, setCurrentPage }) => {
  const data = {
    steildach: { 
      title: 'Steildach', 
      desc: 'Charakter & Schutz', 
      intro: 'Das Steildach ist die Visitenkarte Ihres Hauses. Wir decken Ihr Dach mit Ziegeln, Betonsteinen oder Schiefer ein und sorgen für eine optimale Wärmedämmung.',
      img: 'https://images.unsplash.com/photo-1632759132036-799d5059d481?q=80&w=2070&auto=format&fit=crop',
      steps: [
        { t: 'Beratung', d: 'Auswahl von Material (Ziegel, Schiefer) und Dämmung.' },
        { t: 'Planung', d: 'Erstellung eines detaillierten Sanierungsplans.' },
        { t: 'Umsetzung', d: 'Fachgerechte Eindeckung und Spenglerarbeiten.' }
      ]
    },
    flachdach: { 
      title: 'Flachdach', 
      desc: 'Modern & Effizient', 
      intro: 'Flachdächer sind ideal für modernes Wohnen. Wir sind Experten für langlebige Abdichtungen (Bitumen/FPO) und Dachbegrünungen, die Ihr Gebäude kühlen.',
      img: 'https://images.unsplash.com/photo-1626292378345-d81230198e3b?q=80&w=2070&auto=format&fit=crop',
      steps: [
        { t: 'Analyse', d: 'Prüfung der Unterkonstruktion und Entwässerung.' },
        { t: 'Abdichtung', d: 'Verlegung hochwertiger Schweißbahnen.' },
        { t: 'Veredelung', d: 'Optional: Begrünung oder Terrassenbelag.' }
      ]
    },
    fenster: { 
      title: 'Dachfenster', 
      desc: 'Mehr Tageslicht', 
      intro: 'Bringen Sie Licht ins Dunkel. Wir bauen hochwertige Dachfenster von Velux und Roto ein. Austausch oft an einem Tag möglich.',
      img: 'https://images.unsplash.com/photo-1596637508677-03cb29559c5d?q=80&w=2070&auto=format&fit=crop',
      steps: [
        { t: 'Auswahl', d: 'Schwingfenster, Klapp-Schwing oder Panoramalösung.' },
        { t: 'Einbau', d: 'Sauberer Wechsel inkl. Innenfutter und Dämmrahmen.' },
        { t: 'Zubehör', d: 'Montage von Rollläden und Sonnenschutz.' }
      ]
    },
    brandschaden: { 
      title: 'Sanierung', 
      desc: 'Hilfe im Notfall', 
      intro: 'Wir kümmern uns um alles. Von der Notsicherung bis zum kompletten Wiederaufbau des Dachstuhls sind wir Ihr verlässlicher Partner.',
      img: 'https://images.unsplash.com/photo-1555699847-f41e54911049?q=80&w=2070&auto=format&fit=crop',
      steps: [
        { t: 'Sicherung', d: 'Notdach und statische Überprüfung sofort.' },
        { t: 'Rückbau', d: 'Fachgerechte Entsorgung des Brandguts.' },
        { t: 'Neubau', d: 'Wiederherstellung von Dachstuhl und Eindeckung.' }
      ]
    },
  };
  const s = data[serviceId] || data.steildach;

  return (
    <div className="animate-fade-in p-4 md:p-6 bg-[#F3F5F7] min-h-screen pt-24">
       <div className="container mx-auto max-w-5xl">
          <button onClick={() => setCurrentPage(Page.SERVICES)} className="mb-8 flex items-center gap-2 text-slate-500 font-medium hover:text-slate-900 transition-colors">
             <ArrowLeft size={18} /> Zur Übersicht
          </button>

          <div className="bg-white rounded-[3rem] p-8 md:p-12 shadow-sm mb-6">
             <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                   <div className="inline-block px-4 py-2 bg-[#F3F5F7] rounded-full text-sm font-bold text-slate-600 mb-6">
                     Unsere Expertise
                   </div>
                   <h1 className="text-5xl md:text-7xl font-medium text-slate-900 mb-4 tracking-tight leading-none">{s.title}</h1>
                   <p className="text-xl text-slate-400 mb-8 font-medium">{s.desc}</p>
                   
                   <p className="text-slate-600 leading-relaxed mb-8 text-lg">
                     {s.intro}
                   </p>
                   
                   <div className="space-y-3 mb-8">
                      <div className="flex items-center gap-3 text-slate-600">
                        <CheckCircle size={20} className="text-slate-900" />
                        <span>Meisterbetrieb seit 1998</span>
                      </div>
                      <div className="flex items-center gap-3 text-slate-600">
                        <CheckCircle size={20} className="text-slate-900" />
                        <span>Kostenlose Erstberatung</span>
                      </div>
                   </div>

                   <button 
                     onClick={() => setCurrentPage(Page.CONTACT)}
                     className="bg-slate-900 text-white px-8 py-4 rounded-full font-bold flex items-center gap-3 hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/10"
                   >
                     Angebot anfordern <ArrowRight size={18} />
                   </button>
                </div>
                <div className="h-[450px] rounded-[2.5rem] overflow-hidden relative shadow-inner">
                   <img src={s.img} className="w-full h-full object-cover" alt={s.title} />
                   <div className="absolute inset-0 border-[10px] border-white/20 rounded-[2.5rem] pointer-events-none"></div>
                </div>
             </div>
          </div>
          
          {/* Process Steps */}
          <div className="grid md:grid-cols-3 gap-6">
             {s.steps.map((step: any, idx: number) => (
               <div key={idx} className="bg-white p-8 rounded-[2.5rem] hover:shadow-md transition-shadow">
                  <span className="block text-5xl font-medium mb-3 text-slate-200">0{idx + 1}</span>
                  <h3 className="font-bold text-lg mb-2">{step.t}</h3>
                  <span className="text-slate-500 text-sm leading-relaxed block">{step.d}</span>
               </div>
             ))}
          </div>
       </div>
    </div>
  );
};

export default ServiceDetail;