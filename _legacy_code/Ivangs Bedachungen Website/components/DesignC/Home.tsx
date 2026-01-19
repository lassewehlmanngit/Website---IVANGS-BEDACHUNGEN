import React from 'react';
import { Page } from '../../types';
import { ArrowRight, ArrowDown, Layout, PenTool, Phone, Activity, Users, DollarSign } from 'lucide-react';

interface HomeProps {
  setCurrentPage: (page: Page) => void;
}

const Home: React.FC<HomeProps> = ({ setCurrentPage }) => {
  return (
    <div className="animate-fade-in">
      
      {/* Hero Section */}
      <section className="relative h-screen min-h-[800px] w-full bg-slate-900 text-white overflow-hidden flex flex-col">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1621251939103-6f59c8821035?q=80&w=2070&auto=format&fit=crop" 
            alt="Modern Architecture Roof" 
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
          {/* Grid Overlay Effect */}
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/grid-me.png')] opacity-10"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 flex-grow container mx-auto px-6 flex flex-col justify-center pt-20">
          <span className="text-primary-400 text-sm font-bold tracking-[0.2em] uppercase mb-4 animate-slide-up">
            Built to inspire
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-tight leading-tight max-w-4xl mb-8 animate-slide-up" style={{animationDelay: '100ms'}}>
            Dächer, die <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">begeistern.</span>
          </h1>
          
          <div className="flex items-center gap-4 animate-slide-up" style={{animationDelay: '200ms'}}>
            <button 
              onClick={() => setCurrentPage(Page.CONTACT)}
              className="bg-white text-slate-900 px-8 py-4 rounded-full font-bold flex items-center gap-2 hover:bg-primary-50 transition-colors"
            >
              Projekt starten <ArrowRight size={18} />
            </button>
            <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center backdrop-blur-md cursor-pointer hover:bg-white/10 transition-colors">
               <ArrowDown size={20} className="animate-bounce" />
            </div>
          </div>
        </div>

        {/* Stats Glass Bar */}
        <div className="relative z-20 border-t border-white/10 bg-white/5 backdrop-blur-md">
           <div className="container mx-auto px-6 py-8">
             <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div>
                   <h3 className="text-3xl font-medium mb-1">25+</h3>
                   <p className="text-sm text-slate-400 uppercase tracking-wider">Jahre Erfahrung</p>
                </div>
                <div>
                   <h3 className="text-3xl font-medium mb-1">100+</h3>
                   <p className="text-sm text-slate-400 uppercase tracking-wider">Experten Teams</p>
                </div>
                <div>
                   <h3 className="text-3xl font-medium mb-1">1000+</h3>
                   <p className="text-sm text-slate-400 uppercase tracking-wider">Projekte</p>
                </div>
                <div>
                   <h3 className="text-3xl font-medium mb-1">Top</h3>
                   <p className="text-sm text-slate-400 uppercase tracking-wider">Bewertungen</p>
                </div>
             </div>
           </div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="bg-white py-24 md:py-32">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center mb-24">
             <h2 className="text-4xl md:text-5xl font-medium text-slate-900 mb-8 leading-tight">
               Erleben Sie innovative Handwerkskunst, die Ihre Vision in Realität verwandelt.
             </h2>
             <div className="flex justify-center items-center gap-4 mb-8">
                <div className="flex -space-x-4">
                  {[1,2,3].map(i => (
                    <img key={i} src={`https://picsum.photos/100/100?random=${i}`} className="w-12 h-12 rounded-full border-4 border-white" alt="Avatar" />
                  ))}
                </div>
                <div className="text-left">
                  <p className="text-sm font-bold text-slate-900">Unser Team</p>
                  <p className="text-xs text-slate-500">Meister & Gesellen</p>
                </div>
                <button onClick={() => setCurrentPage(Page.ABOUT)} className="ml-4 w-12 h-12 bg-slate-900 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform">
                  <ArrowRight size={20} />
                </button>
             </div>
             
             {/* Logo Strip */}
             <div className="flex flex-wrap justify-center gap-8 opacity-40 grayscale">
                <div className="flex items-center gap-2"><Activity /> Logoipsum</div>
                <div className="flex items-center gap-2"><Layout /> Logoipsum</div>
                <div className="flex items-center gap-2"><PenTool /> Logoipsum</div>
             </div>
          </div>

          {/* Bottom Cards from Screenshot */}
          <div className="grid md:grid-cols-3 gap-6">
            
            {/* Projects Card */}
            <div 
               onClick={() => setCurrentPage(Page.HOME)} // Assuming portfolio is on home or separate
               className="group bg-slate-50 rounded-3xl p-8 min-h-[400px] flex flex-col justify-between cursor-pointer hover:shadow-xl transition-all duration-300 relative overflow-hidden"
            >
               <div className="absolute top-0 right-0 w-64 h-64 bg-slate-200 rounded-full blur-[80px] -mr-16 -mt-16 opacity-0 group-hover:opacity-100 transition-opacity"></div>
               <div className="w-10 h-10 bg-slate-900 text-white rounded-lg flex items-center justify-center mb-4 relative z-10">
                 <Layout size={20} />
               </div>
               <div className="relative z-10">
                 <h3 className="text-2xl font-bold text-slate-900 mb-2">Unsere Projekte</h3>
                 <p className="text-slate-500 text-sm mb-6">Werfen Sie einen Blick auf unser Portfolio.</p>
               </div>
               <div className="relative h-48 rounded-2xl overflow-hidden mt-auto">
                 <img src="https://picsum.photos/400/300?random=10" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Project" />
               </div>
            </div>

            {/* Services Card */}
            <div 
               onClick={() => setCurrentPage(Page.SERVICES)}
               className="group bg-slate-50 rounded-3xl p-8 min-h-[400px] flex flex-col justify-between cursor-pointer hover:shadow-xl transition-all duration-300 relative overflow-hidden"
            >
               <div className="absolute top-0 right-0 w-64 h-64 bg-slate-200 rounded-full blur-[80px] -mr-16 -mt-16 opacity-0 group-hover:opacity-100 transition-opacity"></div>
               <div className="w-10 h-10 bg-slate-900 text-white rounded-lg flex items-center justify-center mb-4 relative z-10">
                 <Activity size={20} />
               </div>
               <div className="relative z-10">
                 <h3 className="text-2xl font-bold text-slate-900 mb-2">Unsere Leistungen</h3>
                 <p className="text-slate-500 text-sm mb-6">Entdecken Sie unsere Services.</p>
               </div>
               {/* Abstract decorative lines */}
               <div className="relative h-48 mt-auto flex items-center justify-center">
                  <div className="w-full h-px bg-slate-200 rotate-12 absolute"></div>
                  <div className="w-full h-px bg-slate-200 -rotate-12 absolute"></div>
                  <div className="w-32 h-32 border border-slate-200 rounded-full"></div>
               </div>
            </div>

            {/* Contact Card - Dark */}
            <div 
               onClick={() => setCurrentPage(Page.CONTACT)}
               className="group bg-slate-900 rounded-3xl p-8 min-h-[400px] flex flex-col justify-between cursor-pointer hover:shadow-2xl hover:shadow-primary-900/20 transition-all duration-300 relative overflow-hidden text-white"
            >
               <div className="absolute top-0 right-0 w-64 h-64 bg-primary-900 rounded-full blur-[100px] -mr-16 -mt-16 opacity-40"></div>
               <div className="w-10 h-10 bg-white text-slate-900 rounded-lg flex items-center justify-center mb-4 relative z-10">
                 <Phone size={20} />
               </div>
               <div className="relative z-10 mt-auto">
                 <h3 className="text-2xl font-bold mb-2">Kontaktieren Sie uns</h3>
                 <p className="text-slate-400 text-sm mb-6">Lassen Sie uns Ihre Vision verwirklichen.</p>
                 <div className="w-full h-12 border border-white/20 rounded-full flex items-center justify-between px-4 hover:bg-white/10 transition-colors">
                   <span className="text-sm font-medium">Nachricht senden</span>
                   <ArrowRight size={16} />
                 </div>
               </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;