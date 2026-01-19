import React from 'react';
import { SupportedLang } from '@/shared/config/i18n';
import { Seo } from '@/shared/ui/Seo';
import { ServiceCard } from '@/features/service/ui/ServiceCard';
import { Button } from '@/shared/ui/Button';
import { Link } from 'react-router-dom';

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

export const ServicesPage: React.FC<{ lang: SupportedLang }> = ({ lang }) => {
  return (
    <>
      <Seo 
        title="Leistungen - Ivangs Bedachungen" 
        description="Alles aus einer Hand: Steildach, Flachdach, Solar & PV, Fenster, Sanierung."
        ogLocale="de_DE"
        ogSiteName="Ivangs Bedachungen"
      />
      
      {/* Header */}
      <div className="bg-white pt-12 pb-20">
        <div className="container mx-auto px-4 text-center">
          <span className="text-primary-600 font-bold uppercase tracking-wider text-sm">Unser Leistungsspektrum</span>
          <h1 className="text-4xl md:text-5xl font-bold mt-2 mb-6 text-slate-900">Alles aus einer Hand. Alles vom Meister.</h1>
          <p className="text-slate-600 text-lg max-w-3xl mx-auto">
            Von der kleinen Reparatur bis zur Großbaustelle im Radius von 200 km.
          </p>
          <div className="sr-only">
             <p>Wir bieten Steildach, Flachdach, Solaranlagen, Fenster und Sanierung an.</p>
          </div>
        </div>
      </div>

      {/* Service Grid */}
      <div className="container mx-auto px-4 pb-24">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {services.map((service) => (
            <ServiceCard 
              key={service.id}
              id={service.id}
              title={service.title}
              description={service.description}
              img={service.img}
              lang={lang}
            />
          ))}
        </div>
      </div>

      {/* CTA Strip */}
      <div className="bg-slate-900 py-16 text-center">
        <div className="container mx-auto px-4">
          <h3 className="text-2xl font-bold text-white mb-6">Sie haben ein spezielles Anliegen?</h3>
          <p className="text-slate-400 mb-8">Kontaktieren Sie uns für eine individuelle Beratung.</p>
          <Link to={`/${lang}/contact`}>
            <Button variant="secondary" className="bg-white text-slate-900 hover:bg-slate-100">
                Kontaktieren Sie uns
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
};
