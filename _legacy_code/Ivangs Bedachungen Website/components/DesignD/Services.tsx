import React from 'react';
import { Page, ServiceId } from '../../types';
import { ArrowUpRight } from 'lucide-react';

interface ServicesProps {
  setCurrentPage: (page: Page) => void;
  navigateToService: (id: ServiceId) => void;
}

const Services: React.FC<ServicesProps> = ({ setCurrentPage, navigateToService }) => {
  return (
    <div className="animate-fade-in p-4 md:p-6 bg-[#F3F5F7] min-h-screen pt-32">
      <div className="container mx-auto max-w-6xl">
         <h1 className="text-6xl font-medium text-slate-900 mb-16 ml-4">Unsere Leistungen</h1>
         
         <div className="grid gap-6">
           {[
             { id: 'steildach', t: "Steildach", d: "Krone Ihres Hauses" },
             { id: 'flachdach', t: "Flachdach", d: "Vielfältig nutzbar" },
             { id: 'fenster', t: "Fenster", d: "Licht, Luft & Ausblick" },
             { id: 'brandschaden', t: "Brandschadensanierung", d: "Schnelle & effektive Hilfe" }
           ].map((s, i) => (
             <div 
                key={i} 
                className="group bg-white p-10 md:p-14 rounded-[2.5rem] flex flex-col md:flex-row justify-between items-start md:items-center cursor-pointer hover:bg-slate-900 hover:text-white transition-all duration-300" 
                onClick={() => navigateToService(s.id as ServiceId)}
             >
                <div className="mb-6 md:mb-0">
                   <h2 className="text-4xl md:text-5xl font-medium mb-3">{s.t}</h2>
                   <p className="text-slate-400 text-xl group-hover:text-slate-400 font-light">{s.d}</p>
                </div>
                <div className="w-20 h-20 bg-[#F3F5F7] rounded-full flex items-center justify-center group-hover:bg-white/10 transition-colors self-end md:self-auto">
                   <ArrowUpRight size={32} className="text-slate-900 group-hover:text-white" />
                </div>
             </div>
           ))}
         </div>
      </div>
    </div>
  );
};

export default Services;