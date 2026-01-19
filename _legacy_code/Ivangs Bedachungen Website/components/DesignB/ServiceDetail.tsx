import React from 'react';
import { Page, ServiceId } from '../../types';
import { ArrowLeft, ArrowUpRight, Check, Star, Zap, Shield, PenTool, Layout } from 'lucide-react';

interface ServiceDetailProps {
  serviceId: ServiceId;
  setCurrentPage: (page: Page) => void;
}

const ServiceDetail: React.FC<ServiceDetailProps> = ({ serviceId, setCurrentPage }) => {
   const data = {
    steildach: { 
      title: 'Steildach', 
      desc: 'Langlebigkeit trifft Ästhetik.', 
      intro: 'Das Steildach ist der Klassiker. Wir kombinieren traditionelle Materialien wie Tonziegel, Betonstein oder Schiefer mit modernster Dämmtechnik für maximale Energieeffizienz.',
      img: 'https://images.unsplash.com/photo-1632759132036-799d5059d481?q=80&w=2070&auto=format&fit=crop',
      features: [
        { t: 'Materialvielfalt', d: 'Ton, Beton, Schiefer, Metall', i: <Layout size={24} /> },
        { t: 'Energie sparen', d: 'Aufsparrendämmung & KfW-Förderung', i: <Zap size={24} /> },
        { t: 'Wertsteigerung', d: 'Gauben, Loggien & Sturmsicherheit', i: <Shield size={24} /> }
      ]
    },
    flachdach: { 
      title: 'Flachdach', 
      desc: 'Modern & Funktional.', 
      intro: 'Nutzen Sie jeden Quadratmeter. Unsere Flachdachlösungen mit Bitumen oder Kunststoffbahnen sind extrem langlebig und ermöglichen Dachbegrünungen oder Terrassen.',
      img: 'https://images.unsplash.com/photo-1626292378345-d81230198e3b?q=80&w=2070&auto=format&fit=crop',
      features: [
        { t: 'Abdichtung', d: 'Bitumen, FPO, Flüssigkunststoff', i: <Shield size={24} /> },
        { t: 'Nutzung', d: 'Dachterrasse & Gründach', i: <Layout size={24} /> },
        { t: 'Technik', d: 'Ideal für PV-Anlagen & Lichtkuppeln', i: <Zap size={24} /> }
      ]
    },
    fenster: { 
      title: 'Fenster', 
      desc: 'Lichtflutung garantiert.', 
      intro: 'Wir bringen Licht ins Dunkel. Mit Premium-Dachfenstern von Velux und Roto verwandeln wir Ihren Speicher in Wohnraum. Austausch oft an nur einem Tag möglich.',
      img: 'https://images.unsplash.com/photo-1596637508677-03cb29559c5d?q=80&w=2070&auto=format&fit=crop',
      features: [
        { t: 'Vielfalt', d: 'Schwing-, Klapp- & Cabrio-Fenster', i: <Layout size={24} /> },
        { t: 'Komfort', d: 'Hitzeschutz & Insektenschutz', i: <Shield size={24} /> },
        { t: 'Smart Home', d: 'Automatische Lüftung & Regensensor', i: <Zap size={24} /> }
      ]
    },
    brandschaden: { 
      title: 'Sanierung', 
      desc: 'Schnelle Nothilfe.', 
      intro: 'Nach dem Feuer sind wir da. Von der Notsicherung über die statische Prüfung bis zur kompletten Wiederherstellung. Wir koordinieren alles für Sie.',
      img: 'https://images.unsplash.com/photo-1555699847-f41e54911049?q=80&w=2070&auto=format&fit=crop',
      features: [
        { t: 'Sofort-Hilfe', d: 'Notsicherung & Notdach', i: <Shield size={24} /> },
        { t: 'Alles aus einer Hand', d: 'Abwicklung mit Versicherung', i: <PenTool size={24} /> },
        { t: 'Wiederaufbau', d: 'Dachstuhl, Dämmung, Eindeckung', i: <Layout size={24} /> }
      ]
    },
  };

  const s = data[serviceId] || data.steildach;

  return (
    <div className="bg-slate-900 min-h-screen text-white animate-fade-in">
       {/* Big Header */}
       <div className="container mx-auto px-4 pt-32 pb-12">
          <button onClick={() => setCurrentPage(Page.SERVICES)} className="group flex items-center gap-2 text-primary-500 font-bold uppercase tracking-widest mb-8 hover:text-white transition-colors">
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> Zurück
          </button>
          
          <h1 className="text-6xl md:text-9xl font-black uppercase tracking-tighter mb-4 leading-none text-transparent bg-clip-text bg-gradient-to-br from-white to-slate-500">
            {s.title}
          </h1>
          <div className="h-2 w-32 bg-primary-600 mb-8"></div>
          <p className="text-2xl md:text-3xl text-white font-bold max-w-3xl leading-tight mb-8">
            {s.desc}
          </p>
          <p className="text-slate-400 text-lg max-w-2xl leading-relaxed">
            {s.intro}
          </p>
       </div>

       {/* Feature Grid */}
       <div className="bg-slate-800 py-20 border-t border-slate-700">
          <div className="container mx-auto px-4 grid md:grid-cols-3 gap-8">
             {s.features.map((f: any, i: number) => (
                <div key={i} className="bg-slate-900 p-8 rounded-3xl border border-slate-700 hover:border-primary-600 transition-colors group">
                   <div className="w-14 h-14 bg-slate-800 rounded-2xl flex items-center justify-center text-primary-500 mb-6 group-hover:bg-primary-600 group-hover:text-white transition-colors">
                      {f.i}
                   </div>
                   <h3 className="text-xl font-bold mb-2">{f.t}</h3>
                   <p className="text-slate-400">{f.d}</p>
                </div>
             ))}
          </div>
       </div>

       {/* Visual Section */}
       <div className="relative h-[500px] w-full overflow-hidden group">
          <img src={s.img} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent"></div>
          <div className="absolute bottom-10 left-0 right-0 text-center">
             <button 
               onClick={() => setCurrentPage(Page.CONTACT)}
               className="bg-primary-600 text-white px-10 py-5 rounded-full font-bold text-xl inline-flex items-center gap-3 hover:bg-white hover:text-primary-600 transition-colors shadow-2xl"
             >
               Jetzt Projekt anfragen <ArrowUpRight />
             </button>
          </div>
       </div>
    </div>
  );
};

export default ServiceDetail;