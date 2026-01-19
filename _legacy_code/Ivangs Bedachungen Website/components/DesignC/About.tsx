import React from 'react';
import { Target, Users, Shield, ArrowRight } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="animate-fade-in pt-24 bg-white">
      {/* Intro */}
      <div className="container mx-auto px-6 py-16">
        <h1 className="text-6xl md:text-8xl font-medium text-slate-900 mb-8 tracking-tighter">Über Uns.</h1>
        <div className="grid md:grid-cols-2 gap-16">
           <p className="text-xl md:text-2xl text-slate-600 leading-relaxed">
             Ruther Bedachungen steht seit 25 Jahren für kompromisslose Qualität. Wir verbinden traditionelles Handwerk mit modernster Architektur.
           </p>
           <div className="flex flex-col justify-end">
             <div className="h-px w-full bg-slate-200 mb-8"></div>
             <p className="text-slate-500">
               Gegründet 1998 in Musterstadt. Heute ein Team aus 20+ Experten.
             </p>
           </div>
        </div>
      </div>

      {/* Large Image */}
      <div className="w-full h-[600px] overflow-hidden">
        <img src="https://images.unsplash.com/photo-1596253686851-90a6e35509d3?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover" alt="Team Work" />
      </div>

      {/* Values Grid */}
      <div className="container mx-auto px-6 py-24">
         <div className="grid md:grid-cols-3 gap-12">
            {[
              { icon: <Target size={32} />, title: "Präzision", text: "Jeder Millimeter zählt. Wir arbeiten exakt." },
              { icon: <Shield size={32} />, title: "Sicherheit", text: "Schutz für Jahrzehnte. Garantiert." },
              { icon: <Users size={32} />, title: "Partnerschaft", text: "Auf Augenhöhe mit unseren Kunden." }
            ].map((item, idx) => (
              <div key={idx} className="border-t border-slate-200 pt-8">
                 <div className="text-slate-900 mb-6">{item.icon}</div>
                 <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                 <p className="text-slate-600">{item.text}</p>
              </div>
            ))}
         </div>
      </div>
    </div>
  );
};

export default About;