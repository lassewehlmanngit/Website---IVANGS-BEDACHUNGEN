import React from 'react';
import { Page } from '../../types';
import { Home, ArrowRight, Search, Hammer, AlertTriangle } from 'lucide-react';

interface NotFoundProps {
  setCurrentPage: (page: Page) => void;
}

const NotFound: React.FC<NotFoundProps> = ({ setCurrentPage }) => {
  return (
    <div className="animate-fade-in min-h-[70vh] flex items-center justify-center bg-slate-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 z-0 opacity-5 pointer-events-none" 
        style={{
          backgroundImage: `linear-gradient(45deg, #cbd5e1 25%, transparent 25%), linear-gradient(-45deg, #cbd5e1 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #cbd5e1 75%), linear-gradient(-45deg, transparent 75%, #cbd5e1 75%)`,
          backgroundSize: '20px 20px',
          backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
        }}
      ></div>

      <div className="container mx-auto px-4 py-20 relative z-10 text-center">
        
        <div className="inline-flex p-6 bg-slate-100 rounded-full mb-8 relative">
           <AlertTriangle size={64} className="text-primary-600" />
           <div className="absolute -bottom-2 -right-2 bg-slate-900 text-white p-2 rounded-full border-4 border-slate-50">
             <Hammer size={24} />
           </div>
        </div>

        <h1 className="text-6xl md:text-8xl font-bold text-slate-900 mb-4 tracking-tighter">404</h1>
        <h2 className="text-2xl md:text-3xl font-bold text-slate-700 mb-6">Ups! Hier fehlt wohl ein Ziegel.</h2>
        
        <p className="text-lg text-slate-500 max-w-lg mx-auto mb-10 leading-relaxed">
          Die Seite, die Sie suchen, wurde verschoben, gelöscht oder befindet sich gerade in der Sanierung.
        </p>

        <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
          <button 
            onClick={() => setCurrentPage(Page.HOME)}
            className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-sm font-bold shadow-lg transition-all flex items-center gap-2 group"
          >
            <Home size={20} /> Zurück zur Startseite
          </button>
          
          <button 
            onClick={() => setCurrentPage(Page.CONTACT)}
            className="bg-white text-slate-700 border border-slate-200 hover:border-primary-600 hover:text-primary-600 px-8 py-4 rounded-sm font-bold transition-all flex items-center gap-2"
          >
            Kontakt aufnehmen <ArrowRight size={20} />
          </button>
        </div>

        <div className="mt-16 pt-16 border-t border-slate-200 max-w-md mx-auto">
           <p className="text-sm text-slate-400 mb-4 uppercase tracking-wider font-semibold">Oder suchen Sie etwas bestimmtes?</p>
           <div className="relative">
             <input 
               type="text" 
               placeholder="Suchbegriff eingeben..." 
               className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-sm focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all shadow-sm"
             />
             <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
           </div>
        </div>

      </div>
    </div>
  );
};

export default NotFound;