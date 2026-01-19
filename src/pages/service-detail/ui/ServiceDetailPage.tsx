import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { SupportedLang } from '@/shared/config/i18n';
import { Seo } from '@/shared/ui/Seo';
import { Button } from '@/shared/ui/Button';
import { CheckCircle2, ArrowLeft, ArrowRight } from 'lucide-react';
import { NotFoundPage } from '@/pages/NotFoundPage';

const servicesData: Record<string, { title: string; desc: string; img?: string; checkpoints: string[] }> = {
    'steildach': {
      title: 'Steildach',
      desc: 'Ob Schieferarbeiten oder klassische Ziegel: Wir beherrschen traditionelles Handwerk und moderne Technik für Ihr Steildach.',
      img: '/uploads/ivangs-steildach_Ziegeldach mit Gaubenbekleidung in Zinkstehfalz.avif',
      checkpoints: [
        "Langlebiger Schutz vor Wind & Wetter",
        "Wertsteigerung Ihrer Immobilie",
        "Energetische Sanierung inklusive"
      ]
    },
    'flachdach': {
      title: 'Flachdach',
      desc: 'Ob moderne Abdichtung oder Dachbegrünung: Wir nutzen Hochleistungs-Materialien, die Jahrzehnte halten.',
      img: '/uploads/ivangs_flachdach_Flachdach mit Dachbegrünung_2.avif',
      checkpoints: [
        "100% Dichtheitsgarantie",
        "Moderne Nutzungskonzepte (Begrünung)",
        "Optimale Raumausnutzung"
      ]
    },
    'solar': {
      title: 'Solar & PV',
      desc: 'Machen Sie Ihr Dach zum Kraftwerk. Wir montieren Auf-Dach-Solar-Anlagen fachgerecht und sicher – alles aus einer Hand.',
      img: undefined,
      checkpoints: [
        "Stromkosten senken & unabhängig werden",
        "Sichere Montage ohne Dachschäden",
        "Komplettservice vom Meisterbetrieb"
      ]
    },
    'fenster': {
      title: 'VELUX Fenster-Lösungen',
      desc: 'Als VELUX-geschulter Betrieb bringen wir mehr Licht und Luft in Ihr Dachgeschoss. Fachgerecht eingebaut durch qualifizierte Mitarbeiter.',
      img: '/uploads/ivangs-arbeiter-fenstertausch.avif',
      checkpoints: [
        "Helle Wohnräume und gesundes Klima",
        "Schneller Austausch ohne viel Dreck",
        "Effektiver Hitzeschutz"
      ]
    },
    'sanierung': {
      title: 'Fassade & Sanierung',
      desc: 'Vom Altbau bis zum Balkon: Wir stellen den Wert Ihrer Immobilie materialgetreu wieder her.',
      img: '/uploads/ivangs-dach-sanierung.avif',
      checkpoints: [
        "Materialgetreue Wiederherstellung",
        "Energetische Optimierung",
        "Fassadenbekleidung vom Fachmann"
      ]
    }
};

export const ServiceDetailPage: React.FC<{ lang: SupportedLang }> = ({ lang }) => {
  const { id } = useParams<{ id: string }>();
  const service = id ? servicesData[id] : null;

  if (!service) return <NotFoundPage lang={lang} />;

  return (
    <>
      <Seo 
        title={`${service.title} - Ivangs Bedachungen`}
        description={service.desc}
      />
      <div className="pt-20 pb-24 bg-white">
         <div className="container mx-auto px-4">
             <Link to={`/${lang}/services`} className="inline-flex items-center text-slate-500 hover:text-primary mb-8 transition-colors">
                 <ArrowLeft size={16} className="mr-2" /> Zur Übersicht
             </Link>

             <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                 {service.img && (
                    <div className="rounded-3xl overflow-hidden shadow-2xl">
                        <img src={service.img} alt={service.title} className="w-full h-auto object-cover" />
                    </div>
                 )}
                 <div className={service.img ? "" : "lg:col-span-2 max-w-4xl mx-auto text-center"}>
                     <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">{service.title}</h1>
                     <p className="text-xl text-slate-600 leading-relaxed mb-8">
                         {service.desc}
                     </p>
                     
                     <ul className={`space-y-4 mb-10 ${!service.img ? "text-left inline-block" : ""}`}>
                        {service.checkpoints.map((point, idx) => (
                           <li key={idx} className="flex items-center gap-3 text-slate-800 font-medium text-lg">
                              <CheckCircle2 className="text-primary shrink-0" size={24} />
                              <span>{point}</span>
                           </li>
                        ))}
                     </ul>

                     <div className={`flex gap-4 ${!service.img ? "justify-center" : ""}`}>
                        <Link to={`/${lang}/contact`}>
                            <Button className="px-8 py-6 text-lg">
                                Jetzt anfragen <ArrowRight size={20} className="ml-2" />
                            </Button>
                        </Link>
                     </div>
                 </div>
             </div>
         </div>
      </div>
    </>
  );
};
