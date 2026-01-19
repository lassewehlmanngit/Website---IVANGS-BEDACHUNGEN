import React from 'react';
import { Page, ServiceId } from '../../types';
import { ArrowRight } from 'lucide-react';

interface ServicesProps {
  setCurrentPage: (page: Page) => void;
  navigateToService: (id: ServiceId) => void;
}

const Services: React.FC<ServicesProps> = ({ setCurrentPage, navigateToService }) => {
  const services = [
    {
      id: 'steildach',
      title: 'Steildach',
      description: 'Klassisch, langlebig und perfekt gedämmt. Ziegel, Beton oder Schiefer.',
      img: 'https://images.unsplash.com/photo-1632759132036-799d5059d481?q=80&w=2070&auto=format&fit=crop'
    },
    {
      id: 'flachdach',
      title: 'Flachdach',
      description: 'Dichtheits-Garantie und moderne Nutzungskonzepte (Begrünung).',
      img: 'https://images.unsplash.com/photo-1626292378345-d81230198e3b?q=80&w=2070&auto=format&fit=crop'
    },
    {
      id: 'solar',
      title: 'Solar & PV',
      description: 'Machen Sie Ihr Dach zum Kraftwerk. Wir montieren Auf-Dach-Solar-Anlagen fachgerecht und sicher.',
      img: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=2070&auto=format&fit=crop'
    },
    {
      id: 'fenster',
      title: 'Fenster',
      description: 'Licht und Energie für Ihr Dachgeschoss. Als VELUX-Partner zertifiziert.',
      img: 'https://images.unsplash.com/photo-1596637508677-03cb29559c5d?q=80&w=2070&auto=format&fit=crop'
    },
    {
      id: 'sanierung',
      title: 'Sanierung & Reparatur',
      description: 'Maßgeschneiderte Blechverarbeitung und Fassadenbekleidung. Vom Altbau bis zum Balkon.',
      img: 'https://images.unsplash.com/photo-1555699847-f41e54911049?q=80&w=2070&auto=format&fit=crop'
    }
  ];

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="bg-white pt-12 pb-20">
        <div className="container mx-auto px-4 text-center">
          <span className="text-primary-600 font-bold uppercase tracking-wider text-sm">Unser Leistungsspektrum</span>
          <h1 className="text-4xl md:text-5xl font-slab font-bold mt-2 mb-6">Alles aus einer Hand. Alles vom Meister.</h1>
          <p className="text-slate-600 text-lg max-w-3xl mx-auto">
            Von der kleinen Reparatur bis zur Großbaustelle im Radius von 200 km.
          </p>
        </div>
      </div>

      {/* Service Grid */}
      <div className="container mx-auto px-4 pb-24">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {services.map((service) => (
            <div 
              key={service.id} 
              className="group bg-white rounded-md overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer border border-slate-100 flex flex-col"
              onClick={() => navigateToService(service.id as ServiceId)}
            >
              <div className="relative h-64 overflow-hidden">
                <div className="absolute inset-0 bg-primary-600/0 group-hover:bg-primary-600/20 transition-colors z-10"></div>
                <img 
                  src={service.img} 
                  alt={service.title} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" 
                />
              </div>
              <div className="p-8 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-slab font-bold mb-3 text-slate-900 group-hover:text-primary-600 transition-colors">{service.title}</h3>
                  <p className="text-slate-600 mb-6">
                    {service.description}
                  </p>
                </div>
                <div className="flex items-center gap-2 text-primary-600 font-bold text-sm uppercase tracking-wide">
                  Details ansehen <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Strip */}
      <div className="bg-slate-900 py-16 text-center">
        <div className="container mx-auto px-4">
          <h3 className="text-2xl font-slab font-bold text-white mb-6">Sie haben ein spezielles Anliegen?</h3>
          <p className="text-slate-400 mb-8">Kontaktieren Sie uns für eine individuelle Beratung.</p>
          <button 
            onClick={() => setCurrentPage(Page.CONTACT)}
            className="bg-white text-slate-900 px-8 py-3 rounded-sm font-bold hover:bg-slate-100 transition-colors"
          >
            Kontaktieren Sie uns
          </button>
        </div>
      </div>
    </div>
  );
};

export default Services;