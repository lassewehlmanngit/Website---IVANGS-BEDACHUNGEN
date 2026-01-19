import React from 'react';
import { Page } from '../../types';
import Wizard from '../DesignA/Wizard';

interface CareerProps {
  setCurrentPage: (page: Page) => void;
}

const Career: React.FC<CareerProps> = ({ setCurrentPage }) => {
  return (
    <div className="animate-fade-in p-4 md:p-6 bg-[#F3F5F7] min-h-screen pt-32">
      <div className="container mx-auto max-w-4xl text-center mb-16">
         <div className="inline-block bg-white px-4 py-2 rounded-full text-sm font-bold mb-6 shadow-sm">Wir stellen ein</div>
         <h1 className="text-5xl md:text-6xl font-medium text-slate-900 mb-8">
           Bau deine Zukunft mit uns.
         </h1>
         <p className="text-xl text-slate-500 max-w-2xl mx-auto">
           Finde heraus, welcher Job zu dir passt. Nutze unseren interaktiven Karriere-Guide.
         </p>
      </div>

      <div className="container mx-auto max-w-2xl mb-24">
         <div className="bg-white rounded-[3rem] p-8 shadow-sm">
            <Wizard />
         </div>
      </div>
      
      <div className="container mx-auto max-w-5xl">
         <h2 className="text-3xl font-medium mb-8 ml-4">Offene Positionen</h2>
         <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-slate-900 text-white p-10 rounded-[2.5rem] relative overflow-hidden group cursor-pointer">
               <div className="absolute top-0 right-0 w-32 h-32 bg-slate-800 rounded-full -mr-8 -mt-8 transition-transform group-hover:scale-150"></div>
               <h3 className="text-2xl font-bold mb-2 relative z-10">Dachdecker (m/w/d)</h3>
               <p className="text-slate-400 mb-8 relative z-10">Vollzeit • Ab Sofort</p>
               <button className="bg-white text-slate-900 px-6 py-3 rounded-full font-bold text-sm relative z-10">Bewerben</button>
            </div>
            <div className="bg-white text-slate-900 p-10 rounded-[2.5rem] border border-slate-100 group cursor-pointer hover:border-slate-300 transition-colors">
               <h3 className="text-2xl font-bold mb-2">Bürokaufmann (m/w/d)</h3>
               <p className="text-slate-500 mb-8">Ausbildung • 2024</p>
               <button className="bg-slate-100 text-slate-900 px-6 py-3 rounded-full font-bold text-sm group-hover:bg-slate-200 transition-colors">Bewerben</button>
            </div>
         </div>
      </div>
    </div>
  );
};

export default Career;