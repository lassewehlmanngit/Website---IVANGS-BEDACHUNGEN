import React from 'react';
import { ServiceCard } from '@/features/service/ui/ServiceCard';
import { Button } from '@/shared/ui/Button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const services = [
    {
      id: 'steildach',
      title: 'Steildach',
      description: 'Ob Schieferarbeiten oder klassische Ziegel: Wir beherrschen traditionelles Handwerk und moderne Technik für Ihr Steildach.',
      img: 'https://images.unsplash.com/photo-1632759132036-799d5059d481?q=80&w=800&auto=format&fit=crop'
    },
    {
      id: 'flachdach',
      title: 'Flachdach',
      description: 'Ob moderne Abdichtung oder Dachbegrünung: Wir nutzen Hochleistungs-Materialien, die Jahrzehnte halten.',
      img: 'https://images.unsplash.com/photo-1626292378345-d81230198e3b?q=80&w=800&auto=format&fit=crop'
    },
    {
      id: 'solar',
      title: 'Solar & PV',
      description: 'Machen Sie Ihr Dach zum Kraftwerk. Wir montieren Auf-Dach-Solar-Anlagen fachgerecht und sicher – alles aus einer Hand.',
      img: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=800&auto=format&fit=crop'
    }
  ];

export const ServicePreview: React.FC<{ lang: string }> = ({ lang }) => {
  return (
    <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          
           <div className="mb-24 text-center max-w-3xl mx-auto">
              <span className="text-primary-600 font-bold uppercase tracking-wider text-sm">Unsere Expertise</span>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mt-2 mb-6">Nicht nur dicht, sondern durchdacht.</h2>
              <p className="text-slate-600 text-lg">
                Ivangs Bedachungen bietet Ihnen das komplette Spektrum der Dach- und Fassadentechnik.
              </p>
           </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {services.map((service, index) => (
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

          <div className="flex justify-center">
             <Link to={`/${lang}/services`}>
                <Button variant="secondary" className="px-8 py-6 text-lg">
                    Alle Leistungen ansehen <ArrowRight size={20} className="ml-2" />
                </Button>
             </Link>
          </div>
        </div>
      </section>
  );
};
