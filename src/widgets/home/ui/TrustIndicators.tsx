import React from 'react';
import { Warehouse, Truck } from 'lucide-react';

export const TrustIndicators: React.FC = () => {
  return (
    <section className="bg-slate-900 text-white py-24 border-b border-slate-800">
        <div className="container mx-auto px-4">
           <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                 <span className="text-primary-400 font-bold uppercase tracking-wider text-sm mb-4 block">Prozess & Effizienz</span>
                 <h2 className="text-3xl md:text-5xl font-medium mb-6 leading-tight">Wir warten nicht auf Material. Wir haben es.</h2>
                 <p className="text-slate-300 text-lg leading-relaxed mb-8 font-light">
                    Viele Betriebe sind abhängig von Baustoffhändlern und Mietgeräten. Wir nicht.
                    Mit eigenen Lagerräumen, einem modernen Maschinenpark und dem firmeneigenen Autokran sind wir unabhängig von Lieferengpässen.
                 </p>
                 <ul className="space-y-6">
                    <li className="flex items-start gap-4">
                       <div className="bg-primary-600/20 p-2 rounded-full text-primary-400">
                          <Warehouse size={20} />
                       </div>
                       <div>
                          <strong className="block text-white text-lg">Keine Wartezeiten</strong>
                          <span className="text-slate-400">Gängige Materialien für Reparaturen haben wir immer auf Lager.</span>
                       </div>
                    </li>
                    <li className="flex items-start gap-4">
                       <div className="bg-primary-600/20 p-2 rounded-full text-primary-400">
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
                <img 
                   src="/uploads/ivangs-car-logo.avif" 
                   alt="Materiallager und Logistik" 
                   className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-700" 
                />
              </div>
           </div>
        </div>
      </section>
  );
};
