import React from 'react';
import { Page } from '../../types';
import Wizard from '../DesignA/Wizard'; // Reuse Logic, styling can be overridden via CSS if needed or just use consistent clean UI

interface CareerProps {
  setCurrentPage: (page: Page) => void;
}

const Career: React.FC<CareerProps> = ({ setCurrentPage }) => {
  return (
    <div className="animate-fade-in pt-32 bg-white min-h-screen">
      <div className="container mx-auto px-6 mb-16">
         <h1 className="text-6xl font-medium text-slate-900 mb-6 tracking-tighter">Karriere.</h1>
         <div className="w-full h-[300px] rounded-3xl overflow-hidden mb-16 relative">
             <img src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover" />
             <div className="absolute inset-0 bg-slate-900/30 flex items-center justify-center">
               <h2 className="text-white text-3xl font-bold">Werde Teil des Teams</h2>
             </div>
         </div>
         
         <div className="grid lg:grid-cols-2 gap-16">
           <div>
              <h3 className="text-2xl font-bold mb-6">Offene Stellen</h3>
              <div className="space-y-4">
                 {[
                   { t: "Dachdeckergeselle (m/w/d)", loc: "Musterstadt", type: "Vollzeit" },
                   { t: "Bauklempner (m/w/d)", loc: "Musterstadt", type: "Vollzeit" },
                   { t: "Ausbildung 2024", loc: "Musterstadt", type: "Ausbildung" }
                 ].map((job, i) => (
                   <div key={i} className="border border-slate-200 p-6 rounded-2xl hover:border-slate-900 transition-colors cursor-pointer group">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="text-lg font-bold group-hover:text-primary-600 transition-colors">{job.t}</h4>
                          <p className="text-slate-500 text-sm">{job.loc} • {job.type}</p>
                        </div>
                        <button className="px-4 py-2 bg-slate-100 rounded-full text-xs font-bold group-hover:bg-slate-900 group-hover:text-white transition-colors">Apply</button>
                      </div>
                   </div>
                 ))}
              </div>
           </div>
           
           <div>
             <h3 className="text-2xl font-bold mb-6">Karriere Finder</h3>
             <div className="bg-slate-50 p-8 rounded-3xl">
                <Wizard />
             </div>
           </div>
         </div>
      </div>
    </div>
  );
};

export default Career;