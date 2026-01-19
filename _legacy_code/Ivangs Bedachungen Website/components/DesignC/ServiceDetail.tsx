import React from 'react';
import { Page, ServiceId } from '../../types';
import { ArrowLeft, Check, ArrowRight, Star, Layers, Zap, Shield } from 'lucide-react';

interface ServiceDetailProps {
  serviceId: ServiceId;
  setCurrentPage: (page: Page) => void;
}

const ServiceDetail: React.FC<ServiceDetailProps> = ({ serviceId, setCurrentPage }) => {
   const data = {
    steildach: { 
      title: 'Steildach', 
      desc: 'Ästhetik trifft Funktion.', 
      intro: 'Das Steildach ist ein Klassiker, der nie aus der Mode kommt. Wir kombinieren traditionelle Handwerkskunst mit modernster Energietechnik.',
      img: 'https://images.unsplash.com/photo-1632759132036-799d5059d481?q=80&w=2070&auto=format&fit=crop',
      details: [
        { t: 'Materialien', d: 'Tonziegel, Betonstein & Naturschiefer' },
        { t: 'Energie', d: 'Hocheffiziente Dämmung nach GEG' },
        { t: 'Komfort', d: 'Dachgauben & Wohnraum-Erweiterung' }
      ]
    },
    flachdach: { 
      title: 'Flachdach', 
      desc: 'Architektonische Freiheit.', 
      intro: 'Nutzen Sie das volle Potenzial Ihres Gebäudes. Unsere Flachdachlösungen verwandeln ungenutzte Flächen in grüne Oasen oder stilvolle Dachterrassen.',
      img: 'https://images.unsplash.com/photo-1626292378345-d81230198e3b?q=80&w=2070&auto=format&fit=crop',
      details: [
        { t: 'Abdichtung', d: 'Bitumenbahnen & Kunststoff (FPO)' },
        { t: 'Nutzung', d: 'Dachbegrünung & Terrassenbeläge' },
        { t: 'Tech', d: 'Solar-Integration & Lichtkuppeln' }
      ]
    },
    fenster: { 
      title: 'Fenster', 
      desc: 'Atmosphäre durch Licht.', 
      intro: 'Tageslicht ist der Schlüssel zu gesundem Wohnen. Wir installieren Premium-Dachfenster, die Räume öffnen und das Raumklima optimieren.',
      img: 'https://images.unsplash.com/photo-1596637508677-03cb29559c5d?q=80&w=2070&auto=format&fit=crop',
      details: [
        { t: 'Modelle', d: 'Schwing-, Klapp- & Panoramafenster' },
        { t: 'Service', d: 'Austausch meist an einem Tag' },
        { t: 'Schutz', d: 'Rollläden & Hitzeschutz-Markisen' }
      ]
    },
    brandschaden: { 
      title: 'Brandschaden', 
      desc: 'Wiederaufbau mit Sorgfalt.', 
      intro: 'In schwierigen Zeiten sind wir Ihr Fels in der Brandung. Wir übernehmen die komplette Sanierung nach Brandschäden – diskret, schnell und professionell.',
      img: 'https://images.unsplash.com/photo-1555699847-f41e54911049?q=80&w=2070&auto=format&fit=crop',
      details: [
        { t: 'Notdienst', d: 'Sofortige Sicherung der Bausubstanz' },
        { t: 'Ablauf', d: 'Entsorgung, Statik & Neuaufbau' },
        { t: 'Partner', d: 'Direkte Abwicklung mit Versicherer' }
      ]
    },
  };

  const s = data[serviceId] || data.steildach;

  return (
    <div className="bg-slate-50 min-h-screen pt-32 pb-24 animate-fade-in relative overflow-hidden">
       {/* Background Effects */}
       <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-100 rounded-full blur-[120px] -mr-32 -mt-32 opacity-60 pointer-events-none"></div>
       <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-100 rounded-full blur-[100px] -ml-24 -mb-24 opacity-40 pointer-events-none"></div>
       
       <div className="container mx-auto px-6 relative z-10">
          <button onClick={() => setCurrentPage(Page.SERVICES)} className="group flex items-center gap-2 text-slate-500 font-medium mb-12 hover:text-slate-900 transition-colors">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform"><ArrowLeft size={16} /></div>
            <span className="text-sm uppercase tracking-widest font-bold">Zurück</span>
          </button>

          <div className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-2xl rounded-[3rem] overflow-hidden">
             {/* Header Image */}
             <div className="h-[400px] relative">
               <img src={s.img} className="w-full h-full object-cover" alt={s.title} />
               <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent flex items-end p-8 md:p-16">
                 <div>
                    <h1 className="text-6xl md:text-8xl font-medium text-white mb-4 tracking-tighter leading-none">{s.title}</h1>
                    <p className="text-2xl md:text-3xl text-slate-200 font-light tracking-wide">{s.desc}</p>
                 </div>
               </div>
             </div>
             
             {/* Content Area */}
             <div className="p-8 md:p-16">
                <div className="grid lg:grid-cols-2 gap-16 mb-16">
                   <div>
                     <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">Überblick</h2>
                     <p className="text-xl md:text-2xl text-slate-700 leading-relaxed font-light">
                       {s.intro}
                     </p>
                   </div>
                   <div className="flex flex-col justify-end">
                      <div className="bg-slate-900 text-white p-8 rounded-3xl">
                        <h3 className="text-xl font-bold mb-4">Interesse geweckt?</h3>
                        <p className="text-slate-400 mb-6">Lassen Sie uns gemeinsam Ihr Projekt realisieren.</p>
                        <button 
                          onClick={() => setCurrentPage(Page.CONTACT)}
                          className="w-full bg-white text-slate-900 px-6 py-3 rounded-full font-bold flex items-center justify-center gap-2 hover:bg-primary-50 transition-colors"
                        >
                          Anfrage starten <ArrowRight size={16} />
                        </button>
                      </div>
                   </div>
                </div>

                {/* Details Cards */}
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-8">Details & Fakten</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  {s.details.map((item: any, i: number) => (
                    <div key={i} className="bg-slate-50 border border-slate-100 p-8 rounded-[2rem] hover:shadow-lg transition-shadow">
                       <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center mb-4 text-slate-700">
                          {i === 0 ? <Layers size={20} /> : i === 1 ? <Zap size={20} /> : <Shield size={20} />}
                       </div>
                       <h4 className="text-xl font-bold text-slate-900 mb-2">{item.t}</h4>
                       <p className="text-slate-500">{item.d}</p>
                    </div>
                  ))}
                </div>
             </div>
          </div>
       </div>
    </div>
  );
};

export default ServiceDetail;