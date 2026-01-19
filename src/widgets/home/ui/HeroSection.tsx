import React from 'react';
import { ArrowRight, Users, Truck, Warehouse, Calendar } from 'lucide-react';
import { Button } from '@/shared/ui/Button';
import { Link } from 'react-router-dom';

export const HeroSection: React.FC<{ lang: string }> = ({ lang }) => {
  return (
    <section className="relative min-h-[85vh] flex flex-col justify-center bg-slate-900 overflow-hidden">
      {/* Background Video & Overlay */}
      <div className="absolute inset-0 z-0">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="w-full h-full object-cover"
          poster="/uploads/ivangs-dachdecker-einsatz.avif"
        >
          <source src="https://cdn.coverr.co/videos/coverr-roofing-works-5309/1080p.mp4" type="video/mp4" />
        </video>
        
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/60 to-slate-900/40 z-10"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/grid-me.png')] opacity-10 z-10"></div>
      </div>

      <div className="relative z-20 container mx-auto px-4 py-20 lg:py-0 grid lg:grid-cols-2 gap-16 items-center flex-grow">
        {/* Left: Copy & Main Message */}
        <div className="text-white mt-8 md:mt-0">
          <span className="text-primary font-bold uppercase tracking-[0.2em] text-sm mb-4 block animate-slide-up">
            Meisterbetrieb seit 1996
          </span>
          <h1 className="text-5xl md:text-7xl font-medium leading-tight tracking-tight mb-6 animate-slide-up">
            Dächer, die <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">begeistern.</span>
          </h1>
          <p className="text-xl text-slate-300 mb-10 max-w-lg font-light leading-relaxed animate-slide-up">
            Ob Sanierung, Neubau oder Reparatur: Wir schützen, was Ihnen wichtig ist. Mit 28 Experten, eigenem Kran und Festpreis-Garantie.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 animate-slide-up">
             <Link to={`/${lang}/contact`}>
                <Button className="w-full sm:w-auto text-lg py-6 px-8 rounded-full shadow-lg shadow-primary/30">
                   Projekt anfragen <ArrowRight size={20} className="ml-2" />
                </Button>
             </Link>
             <Link to={`/${lang}/career`}>
                <Button variant="outline" className="w-full sm:w-auto text-lg py-6 px-8 rounded-full bg-white/10 text-white border-white/20 hover:bg-white/20">
                   Karriere starten
                </Button>
             </Link>
          </div>
        </div>

        {/* Right: Lead Form (Optional - skipped to focus on clear CTA for now, or could restore) */}
        {/* For FSD migration, keeping it simple as per plan components */}
      </div>

      {/* Bottom Glass Bar */}
      <div className="relative z-20 border-t border-white/10 bg-white/5 backdrop-blur-md hidden md:block">
         <div className="container mx-auto px-4 py-6 md:py-8">
           <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="flex items-center gap-4">
                 <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-primary">
                    <Users size={24} />
                 </div>
                 <div>
                    <h3 className="text-2xl font-medium text-white leading-none mb-1">28</h3>
                    <p className="text-xs text-slate-400 uppercase tracking-wider font-bold">Experten</p>
                 </div>
              </div>
              <div className="flex items-center gap-4">
                 <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-primary">
                    <Truck size={24} />
                 </div>
                 <div>
                    <h3 className="text-2xl font-medium text-white leading-none mb-1">Eigener</h3>
                    <p className="text-xs text-slate-400 uppercase tracking-wider font-bold">Kran-Service</p>
                 </div>
              </div>
              <div className="flex items-center gap-4">
                 <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-primary">
                    <Warehouse size={24} />
                 </div>
                 <div>
                    <h3 className="text-2xl font-medium text-white leading-none mb-1">400m²</h3>
                    <p className="text-xs text-slate-400 uppercase tracking-wider font-bold">Lagerfläche</p>
                 </div>
              </div>
              <div className="flex items-center gap-4">
                 <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-primary">
                    <Calendar size={24} />
                 </div>
                 <div>
                    <h3 className="text-2xl font-medium text-white leading-none mb-1">1996</h3>
                    <p className="text-xs text-slate-400 uppercase tracking-wider font-bold">Gegründet</p>
                 </div>
              </div>
           </div>
         </div>
      </div>
    </section>
  );
};
