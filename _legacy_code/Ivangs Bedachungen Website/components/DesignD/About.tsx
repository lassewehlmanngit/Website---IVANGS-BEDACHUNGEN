import React from 'react';

const About: React.FC = () => {
  return (
    <div className="animate-fade-in p-4 md:p-6 bg-[#F3F5F7] min-h-screen pt-32">
       <div className="container mx-auto max-w-5xl">
          <div className="bg-white rounded-[3rem] p-12 md:p-24 shadow-sm">
             <div className="text-sm font-bold tracking-widest uppercase text-slate-400 mb-6">Über Uns</div>
             <h1 className="text-5xl md:text-7xl font-medium text-slate-900 mb-12 tracking-tight">
               Wir bauen nicht nur Dächer.<br/>Wir bauen Vertrauen.
             </h1>
             
             <div className="grid md:grid-cols-2 gap-16">
                <div>
                  <p className="text-xl text-slate-600 leading-relaxed mb-8">
                    Seit über 20 Jahren sind wir führend in der Region. Unsere Philosophie ist einfach: Perfektion im Detail und Ehrlichkeit gegenüber dem Kunden.
                  </p>
                  <div className="flex gap-4">
                    <div className="bg-[#F3F5F7] px-6 py-4 rounded-2xl">
                       <span className="block text-3xl font-bold text-slate-900">2005</span>
                       <span className="text-xs text-slate-500 uppercase">Gegründet</span>
                    </div>
                    <div className="bg-[#F3F5F7] px-6 py-4 rounded-2xl">
                       <span className="block text-3xl font-bold text-slate-900">50+</span>
                       <span className="text-xs text-slate-500 uppercase">Mitarbeiter</span>
                    </div>
                  </div>
                </div>
                <div className="relative h-80 rounded-[2rem] overflow-hidden">
                   <img src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover" />
                </div>
             </div>
          </div>
       </div>
    </div>
  );
};

export default About;