import React from 'react';
import { Warehouse, Truck } from 'lucide-react';
import { tinaField } from 'tinacms/dist/react';

export interface TrustIndicatorsProps {
  trustData?: any;
}

const iconMap: Record<string, React.ElementType> = {
  Warehouse,
  Truck,
};

export const TrustIndicators: React.FC<TrustIndicatorsProps> = ({ trustData }) => {
  // Use trustData from TinaCMS if available, otherwise fall back to hardcoded defaults
  const trust = trustData || {};
  const items = trust.items || [
    {
      icon: 'Warehouse',
      title: 'Keine Wartezeiten',
      description: 'Gängige Materialien für Reparaturen haben wir immer auf Lager.',
    },
    {
      icon: 'Truck',
      title: 'Eigener Kran-Service',
      description: 'Wir müssen nicht auf den Verleih warten. Unser Kran ist einsatzbereit, wenn wir ihn brauchen.',
    },
  ];

  return (
    <section className="bg-slate-900 text-white py-24 border-b border-slate-800">
        <div className="container mx-auto px-4">
           <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                 <span 
                   className="text-primary-400 font-bold uppercase tracking-wider text-sm mb-4 block"
                   data-tina-field={trustData && tinaField(trustData, 'eyebrow')}
                 >
                   {trust.eyebrow || 'Prozess & Effizienz'}
                 </span>
                 <h2 
                   className="text-h2 font-medium mb-6 leading-tight"
                   data-tina-field={trustData && tinaField(trustData, 'title')}
                 >
                   {trust.title || 'Wir warten nicht auf Material. Wir haben es.'}
                 </h2>
                 <p 
                   className="text-slate-300 text-lg leading-relaxed mb-8 font-light"
                   data-tina-field={trustData && tinaField(trustData, 'description')}
                 >
                    {trust.description || 'Viele Betriebe sind abhängig von Baustoffhändlern und Mietgeräten. Wir nicht. Mit eigenen Lagerräumen, einem modernen Maschinenpark und dem firmeneigenen Autokran sind wir unabhängig von Lieferengpässen.'}
                 </p>
                 <ul className="space-y-6">
                    {items.map((item: any, index: number) => {
                      const Icon = iconMap[item.icon] || Warehouse;
                      return (
                        <li key={index} className="flex items-start gap-4">
                           <div className="bg-primary-600/20 p-2 rounded-full text-primary-400">
                              <Icon size={20} />
                           </div>
                           <div>
                              <strong 
                                className="block text-white text-lg"
                                data-tina-field={trustData?.items && tinaField(trustData.items[index], 'title')}
                              >
                                {item.title}
                              </strong>
                              <span 
                                className="text-slate-400"
                                data-tina-field={trustData?.items && tinaField(trustData.items[index], 'description')}
                              >
                                {item.description}
                              </span>
                           </div>
                        </li>
                      );
                    })}
                 </ul>
              </div>
              <div className="relative h-[500px] rounded-lg overflow-hidden border border-white/10">
                <img 
                   src={trust.image || '/uploads/ivangs-car-logo.avif'}
                   alt="Materiallager und Logistik" 
                   className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-700"
                   data-tina-field={trustData && tinaField(trustData, 'image')}
                />
              </div>
           </div>
        </div>
      </section>
  );
};
