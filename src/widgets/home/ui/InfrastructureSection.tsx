import React from 'react';
import { Warehouse, Truck } from 'lucide-react';
import { OptimizedImage } from '@/shared/ui/Image';

export const InfrastructureSection: React.FC = () => {
  return (
    <section className="bg-slate-900 text-white py-24 border-b border-slate-800">
      <div className="container mx-auto px-4">
         <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
               <span className="text-primary font-bold uppercase tracking-wider text-sm mb-4 block">Prozess & Effizienz</span>
               <h2 className="text-3xl md:text-5xl font-medium mb-6 leading-tight">Wir warten nicht auf Material. Wir haben es.</h2>
               <p className="text-slate-300 text-lg leading-relaxed mb-8 font-light">
                  Viele Betriebe sind abhängig von Baustoffhändlern und Mietgeräten. Wir nicht.
                  Mit eigenen Lagerräumen, einem modernen Maschinenpark und dem firmeneigenen Autokran sind wir unabhängig von Lieferengpässen.
               </p>
               <ul className="space-y-6">
                  <li className="flex items-start gap-4">
                     <div className="bg-primary/20 p-2 rounded-full text-primary">
                        <Warehouse size={20} />
                     </div>
                     <div>
                        <strong className="block text-white text-lg">Keine Wartezeiten</strong>
                        <span className="text-slate-400">Gängige Materialien für Reparaturen haben wir immer auf Lager.</span>
                     </div>
                  </li>
                  <li className="flex items-start gap-4">
                     <div className="bg-primary/20 p-2 rounded-full text-primary">
                        <Truck size={20} />
                     </div>
                     <div>
                        <strong className="block text-white text-lg">Eigener Kran-Service</strong>
                        <span className="text-slate-400">Wir müssen nicht auf den Verleih warten. Unser Kran ist einsatzbereit, wenn wir ihn brauchen.</span>
                     </div>
                  </li>
               </ul>
            </div>
            <div className="relative h-[500px] rounded-3xl overflow-hidden border border-white/10">
               <OptimizedImage 
                  src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=2070&auto=format&fit=crop" 
                  alt="Materiallager und Logistik" 
                  className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-700" 
               />
               <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent p-8">
                  <div className="flex items-center gap-4 text-white font-bold text-xl">
                     <Truck className="text-primary" size={32} /> IVANGS Logistik
                  </div>
               </div>
            </div>
         </div>
      </div>
    </section>
  );
};
