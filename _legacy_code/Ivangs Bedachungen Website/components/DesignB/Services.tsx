import React from 'react';
import { Page, ServiceId } from '../../types';
import { ArrowUpRight, Shield, Maximize2, Sun, AlertTriangle } from 'lucide-react';

interface ServicesProps {
  setCurrentPage: (page: Page) => void;
  navigateToService: (id: ServiceId) => void;
}

const Services: React.FC<ServicesProps> = ({ setCurrentPage, navigateToService }) => {
  return (
    <div className="animate-fade-in bg-slate-900 min-h-screen text-white">
      {/* Header */}
      <div className="pt-32 pb-16 px-4 container mx-auto text-center">
        <span className="text-primary-500 font-extrabold tracking-[0.2em] uppercase mb-4 block animate-slide-up">
          Unsere Expertise
        </span>
        <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter mb-6 leading-none animate-slide-up" style={{animationDelay: '100ms'}}>
          Kompetenz<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-white">am Bau.</span>
        </h1>
      </div>

      {/* Bento Grid */}
      <div className="container mx-auto px-4 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:auto-rows-[400px]">
          
          {/* Item 1: Steildach (Large Square 2x2) */}
          <div 
            onClick={() => navigateToService('steildach')}
            className="group relative md:col-span-2 md:row-span-2 rounded-3xl overflow-hidden cursor-pointer bg-slate-800"
          >
            <img 
              src="https://images.unsplash.com/photo-1632759132036-799d5059d481?q=80&w=2070&auto=format&fit=crop" 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-40" 
              alt="Steildach" 
            />
            <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end items-start transition-all duration-500">
               <div className="transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="bg-primary-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-white shadow-lg">
                    <Shield size={32} />
                  </div>
                  <h2 className="text-4xl md:text-6xl font-black uppercase mb-4">Steildach</h2>
                  <div className="h-0 overflow-hidden group-hover:h-auto opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                    <p className="text-slate-300 text-lg mb-6 max-w-lg">
                      Das Steildach ist die Krone Ihres Hauses: es ist entscheidend für das Erscheinungsbild und die Schönheit des ganzen Gebäudes.
                    </p>
                    <button className="flex items-center gap-2 text-primary-400 font-bold uppercase tracking-widest hover:text-white transition-colors">
                      Details ansehen <ArrowUpRight />
                    </button>
                  </div>
               </div>
            </div>
          </div>

          {/* Item 2: Flachdach (Tall 1x2) */}
          <div 
             onClick={() => navigateToService('flachdach')}
             className="group relative md:col-span-1 md:row-span-2 rounded-3xl overflow-hidden cursor-pointer bg-slate-800"
          >
            <img 
              src="https://images.unsplash.com/photo-1626292378345-d81230198e3b?q=80&w=2070&auto=format&fit=crop" 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-40" 
              alt="Flachdach" 
            />
            <div className="absolute inset-0 p-8 flex flex-col justify-end items-start">
               <div className="bg-white/10 w-12 h-12 rounded-xl flex items-center justify-center mb-4 backdrop-blur-sm">
                  <Maximize2 size={24} />
               </div>
               <h2 className="text-3xl font-black uppercase mb-2">Flachdach</h2>
               <p className="text-slate-300 text-sm mb-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                 Sicherheit für Ihr Eigentum, attraktive Gestaltungsmöglichkeiten, optimale Raumausnutzung.
               </p>
               <div className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center group-hover:bg-primary-600 group-hover:border-primary-600 transition-colors">
                 <ArrowUpRight size={20} />
               </div>
            </div>
          </div>

          {/* Item 3: Brandschaden (Wide 2x1) */}
          <div 
             onClick={() => navigateToService('brandschaden')}
             className="group relative md:col-span-2 md:row-span-1 rounded-3xl overflow-hidden cursor-pointer bg-red-900"
          >
             <img 
               src="https://images.unsplash.com/photo-1555699847-f41e54911049?q=80&w=2070&auto=format&fit=crop" 
               className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-30 group-hover:opacity-20 mix-blend-multiply" 
             />
             <div className="absolute inset-0 p-8 flex flex-col justify-between relative z-10">
               <div className="flex justify-between items-start">
                 <div>
                    <h2 className="text-3xl font-black uppercase mb-2">Brandschadensanierung</h2>
                    <p className="text-red-200 max-w-sm">Schnelle und effektive Lösungen, um Ihr Zuhause wieder sicher zu machen.</p>
                 </div>
                 <AlertTriangle className="text-white w-12 h-12" />
               </div>
               <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                 <span className="text-sm font-bold text-white uppercase tracking-widest flex items-center gap-2">Sofort-Hilfe anfordern <ArrowUpRight /></span>
               </div>
            </div>
          </div>

          {/* Item 4: Fenster (Standard 1x1) */}
          <div 
             onClick={() => navigateToService('fenster')}
             className="group relative md:col-span-1 md:row-span-1 rounded-3xl overflow-hidden cursor-pointer bg-blue-900"
          >
             <img 
               src="https://images.unsplash.com/photo-1596637508677-03cb29559c5d?q=80&w=2070&auto=format&fit=crop" 
               className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-40 group-hover:opacity-20" 
             />
             <div className="absolute inset-0 p-8 flex items-center justify-between relative z-10">
                <div>
                   <h2 className="text-3xl font-black uppercase mb-2">Fenster</h2>
                   <p className="text-blue-200">Licht, Luft & Ausblick.</p>
                </div>
                <Sun size={32} className="text-white" />
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Services;