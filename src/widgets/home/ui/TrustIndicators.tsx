import React from 'react';
import { Warehouse, Truck, Shield, Timer } from 'lucide-react';
import { tinaField } from 'tinacms/dist/react';

export interface TrustIndicatorsProps {
  trustData?: any;
}

export const TrustIndicators: React.FC<TrustIndicatorsProps> = ({ trustData }) => {
  const trust = trustData || {};

  // High-value items for the Bento Grid
  const bentoItems = [
    {
      title: 'Termingarantie durch Unabhängigkeit',
      description: 'Während andere auf Mietkräne warten, rollt unser eigener Kran längst auf Ihre Baustelle. Das bedeutet: Wir halten Wort bei jedem Termin.',
      icon: Truck,
      size: 'lg', // Larger card
      image: '/uploads/ivangs-dachdecker-einsatz.avif',
      badge: 'Unschlagbar schnell'
    },
    {
      title: '1.500m² Lagerfläche',
      description: 'Alle gängigen Materialien sind sofort verfügbar. Keine Lieferstopps, kein Stillstand.',
      icon: Warehouse,
      size: 'md',
      badge: 'Sofort bereit'
    },
    {
      title: 'Präzision auf dem neuesten Stand',
      description: 'Modernste Maschinen sorgen für Ergebnisse, die Jahrzehnte überdauern.',
      icon: Shield,
      size: 'md',
      badge: 'Meister-Qualität'
    }
  ];

  return (
    <section className="bg-slate-900 text-white py-24 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[100px]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-6">
            <Timer size={14} />
            <span>Effizienz & Logistik</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-8 leading-[1.1] tracking-tight text-white">
            Wir warten nicht auf Material. <span className="text-primary">Wir haben es.</span>
          </h2>
          <p className="text-slate-400 text-lg md:text-xl leading-relaxed font-light">
            Der größte Feind Ihrer Baustelle sind Verzögerungen. Durch unseren eigenen Fuhrpark,
            einen firmeneigenen Autokran und riesige Lagerkapazitäten sind wir völlig unabhängig von
            Lieferengpässen und Mietfirmen.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bentoItems.map((item, idx) => (
            <div
              key={idx}
              className={`group relative rounded-[2.5rem] overflow-hidden border border-white/10 bg-slate-800/50 backdrop-blur-sm transition-all duration-500 hover:border-primary/50 hover:shadow-[0_0_50px_rgba(var(--primary),0.1)] flex flex-col ${item.size === 'lg' ? 'md:col-span-2 lg:col-span-2' : 'col-span-1'
                }`}
            >
              {/* Content Side */}
              <div className={`p-8 md:p-10 flex flex-col h-full ${item.size === 'lg' ? 'md:flex-row gap-8 items-center' : ''}`}>
                <div className="flex-1">
                  <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform duration-500">
                    <item.icon size={24} />
                  </div>
                  <span className="text-primary/80 text-[10px] font-bold uppercase tracking-widest mb-2 block">{item.badge}</span>
                  <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white leading-tight">{item.title}</h3>
                  <p className="text-slate-400 leading-relaxed text-lg">{item.description}</p>
                </div>

                {item.image && (
                  <div className="flex-1 w-full h-64 md:h-full min-h-[250px] relative rounded-3xl overflow-hidden mt-8 md:mt-0 shadow-2xl">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="absolute inset-0 w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
