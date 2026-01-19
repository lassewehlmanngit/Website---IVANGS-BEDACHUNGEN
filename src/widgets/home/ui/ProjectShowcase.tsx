import React from 'react';

export const ProjectShowcase: React.FC = () => {
  return (
    <section className="py-24 bg-white overflow-hidden">
         <div className="container mx-auto px-4">
            <div className="mb-12 flex justify-between items-end">
                <div>
                  <span className="text-primary font-bold uppercase tracking-wider text-sm">Referenzen</span>
                  <h2 className="text-4xl font-bold text-slate-900 mt-2">Ergebnisse, die zählen.</h2>
                </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
               {/* Project 1 */}
               <div className="group cursor-pointer">
                  <div className="relative h-72 overflow-hidden rounded-2xl mb-4">
                     <img 
                       src="https://images.unsplash.com/photo-1632759132036-799d5059d481?q=80&w=800&auto=format&fit=crop" 
                       className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" 
                       alt="Steildach Sanierung" 
                     />
                     <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-bold uppercase tracking-wider text-slate-900 rounded-full">
                       Sanierung
                     </div>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-primary transition-colors">Einfamilienhaus in Kempen</h3>
                  <p className="text-slate-600 text-sm leading-relaxed border-l-2 border-primary pl-3">
                    "Durch die neue Aufsparrendämmung sparen wir jetzt <strong>30% Heizkosten</strong> pro Jahr."
                  </p>
               </div>

               {/* Project 2 */}
               <div className="group cursor-pointer">
                  <div className="relative h-72 overflow-hidden rounded-2xl mb-4">
                     <img 
                       src="https://images.unsplash.com/photo-1626292378345-d81230198e3b?q=80&w=800&auto=format&fit=crop" 
                       className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" 
                       alt="Flachdach Begrünung" 
                     />
                     <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-bold uppercase tracking-wider text-slate-900 rounded-full">
                       Flachdach
                     </div>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-primary transition-colors">Gewerbehalle Viersen</h3>
                  <p className="text-slate-600 text-sm leading-relaxed border-l-2 border-primary pl-3">
                    "Die Dachbegrünung sorgt im Sommer für <strong>angenehme Temperaturen</strong> in der Produktion."
                  </p>
               </div>

               {/* Project 3 */}
               <div className="group cursor-pointer">
                  <div className="relative h-72 overflow-hidden rounded-2xl mb-4">
                     <img 
                       src="https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=800&auto=format&fit=crop" 
                       className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" 
                       alt="Solaranlage" 
                     />
                     <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-bold uppercase tracking-wider text-slate-900 rounded-full">
                       Solar
                     </div>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-primary transition-colors">Neubau in Willich</h3>
                  <p className="text-slate-600 text-sm leading-relaxed border-l-2 border-primary pl-3">
                    "Unabhängig vom Stromnetz in nur <strong>3 Tagen Montagezeit</strong>."
                  </p>
               </div>
            </div>
         </div>
      </section>
  );
};
