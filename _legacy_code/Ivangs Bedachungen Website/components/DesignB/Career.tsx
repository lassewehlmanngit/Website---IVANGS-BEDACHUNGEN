import React from 'react';
import { Page } from '../../types';
import Wizard from './Wizard';

interface CareerProps {
  setCurrentPage: (page: Page) => void;
}

const Career: React.FC<CareerProps> = ({ setCurrentPage }) => {
  return (
    <div className="animate-fade-in bg-slate-50 min-h-screen">
      <div className="bg-slate-900 text-white py-24 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10 text-center">
           <span className="text-primary-600 font-bold uppercase tracking-widest mb-4 block">Jobs & Karriere</span>
           <h1 className="text-5xl font-extrabold mb-8">Werde Teil der Ruther Familie.</h1>
           <p className="text-xl text-slate-300 max-w-2xl mx-auto">
             Wir suchen Menschen mit Leidenschaft für das Handwerk. Egal ob Profi oder Azubi.
           </p>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-16 relative z-20 pb-24">
        <Wizard />

        <div className="mt-24 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-12">Offene Stellen</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto text-left">
             <div className="bg-white p-8 rounded-2xl shadow-lg border-l-8 border-primary-600">
                <h3 className="text-xl font-bold mb-2">Dachdeckergeselle (m/w/d)</h3>
                <p className="text-slate-600 mb-4">Vollzeit | Ab sofort</p>
                <button className="text-primary-600 font-bold hover:underline">Details ansehen</button>
             </div>
             <div className="bg-white p-8 rounded-2xl shadow-lg border-l-8 border-slate-700">
                <h3 className="text-xl font-bold mb-2">Ausbildung Büromanagement</h3>
                <p className="text-slate-600 mb-4">Ausbildung | Start Aug 2024</p>
                <button className="text-slate-700 font-bold hover:underline">Details ansehen</button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;