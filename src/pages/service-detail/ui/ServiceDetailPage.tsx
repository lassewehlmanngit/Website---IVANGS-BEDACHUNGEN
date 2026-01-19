import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { SupportedLang } from '@/shared/config/i18n';
import { Seo } from '@/shared/ui/Seo';
import { Button } from '@/shared/ui/Button';
import { ArrowLeft, ArrowRight, CheckCircle2, Hammer, Thermometer, Layers, CloudRain, Sun, ShieldCheck, Calendar, Info, Ruler, HelpCircle, Image as ImageIcon, Phone, Mail } from 'lucide-react';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { servicesData, type ServiceId } from '@/features/service/model/serviceData';
import { OptimizedImage, generateUnsplashSrcSet } from '@/shared/ui/Image';
import { ExpertTip } from '@/shared/ui/ExpertTip';
import { ProcessTimeline } from '@/shared/ui/ProcessTimeline';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/shared/ui/Accordion';
import { TeamContactCard } from '@/features/service/ui/TeamContactCard';
import { Breadcrumbs } from '@/shared/ui/Breadcrumbs';

const iconMap: Record<string, React.ElementType> = {
  Hammer,
  Thermometer,
  Layers,
  CloudRain,
  CheckCircle2,
  Sun,
  ShieldCheck,
  Calendar,
  Info,
  Ruler
};

export const ServiceDetailPage: React.FC<{ lang: SupportedLang }> = ({ lang }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const service = id && id in servicesData ? servicesData[id as ServiceId] : null;

  if (!service) return <NotFoundPage lang={lang} />;

  return (
    <>
      <Seo 
        title={`${service.title} - Ivangs Bedachungen`}
        description={service.intro}
        ogLocale="de_DE"
        ogSiteName="Ivangs Bedachungen"
      />
      
      <div className="animate-fade-in bg-white">
        {/* Hero Header */}
        <div className="relative h-[60vh] min-h-[500px]">
          <OptimizedImage 
            src={service.img} 
            className="w-full h-full object-cover" 
            alt={service.title}
            srcSet={generateUnsplashSrcSet(service.img)}
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-slate-900/50 to-slate-900/90 flex flex-col justify-center items-center text-white text-center px-4">
            <span className="text-primary font-bold uppercase tracking-widest text-sm mb-4 bg-slate-900/80 px-4 py-2 rounded-sm backdrop-blur-md border border-white/10">
              {service.subtitle}
            </span>
            <h1 className="text-5xl md:text-7xl font-slab font-bold mb-6 drop-shadow-lg">{service.title}</h1>
          </div>
          <Link 
            to={`/${lang}/services`}
            className="absolute top-20 left-4 md:top-32 md:left-8 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white px-4 py-3 md:px-5 md:py-2.5 rounded-sm flex items-center gap-2 transition-colors font-medium text-sm md:text-base border border-white/20 z-10 min-h-[44px]"
          >
            <ArrowLeft size={18} className="shrink-0" /> 
            <span className="hidden xs:inline">Zur Übersicht</span>
            <span className="xs:hidden">Zurück</span>
          </Link>
        </div>

        <div className="container mx-auto px-4 py-16 md:py-24">
          {/* Breadcrumbs */}
          <Breadcrumbs 
            lang={lang}
            items={[
              { label: 'Leistungen', href: '/services' },
              { label: service.title }
            ]}
            className="mb-6 md:mb-8"
          />

          <div className="grid lg:grid-cols-12 gap-12 md:gap-16">
            
            {/* Main Content Area */}
            <div className="lg:col-span-8">
              
              {/* Intro & Expert Tip */}
              <h2 className="text-h2 font-slab font-bold text-slate-900 mb-4 md:mb-6">Worum es wirklich geht.</h2>
              <p className="text-xl text-slate-600 leading-relaxed mb-8">
                {service.intro}
              </p>
              
              <ExpertTip className="mb-12">
                {service.expertTip}
              </ExpertTip>

              {/* Detailed Knowledge Sections */}
              <div className="space-y-12 mb-20">
                {service.sections.map((section, idx) => {
                  const Icon = iconMap[section.icon] || Info;
                  return (
                    <div key={idx} className="flex gap-6 group">
                      <div className="shrink-0 w-12 h-12 bg-white rounded-sm flex items-center justify-center border border-slate-200 shadow-sm group-hover:border-primary transition-colors">
                        <Icon className="text-primary" size={24} />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">{section.title}</h3>
                        <p className="text-slate-600 leading-relaxed whitespace-pre-line">{section.content}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Process Steps Section */}
              <div className="mb-16 md:mb-20">
                 <h3 className="text-h3 font-slab font-bold text-slate-900 mb-6 md:mb-8">So läuft Ihr Projekt ab</h3>
                 <ProcessTimeline steps={service.process} />
              </div>

              {/* Project References Gallery */}
              {service.references && service.references.length > 0 && (
                 <div className="mb-16 md:mb-20">
                    <h3 className="text-h3 font-slab font-bold text-slate-900 mb-6 md:mb-8 flex items-center gap-2">
                      <ImageIcon size={24} className="text-primary" /> 
                      Ausgewählte Projekte
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {service.references.map((img, idx) => (
                        <div key={idx} className="rounded-sm overflow-hidden h-64 border border-slate-100 group">
                          <OptimizedImage 
                            src={img} 
                            alt={`Projektbeispiel ${service.title} ${idx + 1}`} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                          />
                        </div>
                      ))}
                    </div>
                 </div>
              )}

              {/* Humanized Contact Section */}
              <div className="bg-slate-50 border border-slate-100 rounded-md p-6 md:p-8 mb-16 md:mb-20">
                 <h3 className="text-h3 font-slab font-bold text-slate-900 mb-4 md:mb-6">Ihre Ansprechpartner für {service.title}</h3>
                 <p className="text-slate-600 mb-8">Kurze Wege zur richtigen Antwort. Bei uns landen Sie nicht im Callcenter, sondern beim Experten.</p>
                 
                 <div className="grid md:grid-cols-2 gap-6">
                    {service.contacts?.map((person, idx) => (
                      <TeamContactCard key={idx} member={person} />
                    ))}
                 </div>
              </div>

              {/* FAQ Accordion Section */}
              <div className="border-t border-slate-200 pt-8 md:pt-10 mb-10 md:mb-12">
                <div className="flex items-center gap-2 md:gap-3 mb-6 md:mb-8">
                   <HelpCircle className="text-primary shrink-0" size={24} />
                   <h3 className="text-h3 font-slab font-bold text-slate-900">Häufige Kundenfragen</h3>
                </div>
                <Accordion type="single" collapsible>
                  {service.faq.map((item, idx) => (
                    <AccordionItem key={idx} value={`item-${idx}`}>
                      <AccordionTrigger className="text-lg font-bold text-slate-800 hover:text-primary">
                        {item.q}
                      </AccordionTrigger>
                      <AccordionContent>
                        <p className="text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-sm border-l-2 border-primary/30">
                          {item.a}
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>

            {/* Sidebar Navigation - top-40 (160px) clears header (80px) + service nav (48px) + padding */}
            <div className="lg:col-span-4 space-y-6 md:space-y-8 lg:sticky lg:top-40 h-fit">
              {/* Quick CTA Box */}
              <div className="bg-slate-900 text-white p-6 md:p-8 rounded-md shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary rounded-full blur-[60px] opacity-20 -mr-10 -mt-10"></div>
                <h3 className="text-h4 font-bold mb-3 md:mb-4 font-slab relative z-10">Wir schauen uns das an.</h3>
                <p className="text-slate-300 mb-8 text-sm relative z-10 leading-relaxed">
                  Jedes Dach ist anders. Vereinbaren Sie einen unverbindlichen Termin vor Ort.
                </p>
                <Button 
                  onClick={() => navigate(`/${lang}/contact`)}
                  className="w-full py-5 md:py-6 text-base md:text-lg font-bold shadow-lg shadow-primary/20"
                >
                  Termin anfragen <ArrowRight size={18} className="ml-2 shrink-0" />
                </Button>
              </div>

              {/* Other Services Nav */}
              <div className="bg-white p-6 rounded-md border border-slate-200 shadow-sm">
                 <h4 className="font-bold text-slate-900 mb-4 border-b border-slate-100 pb-2">Weitere Leistungen</h4>
                 <ul className="space-y-1">
                   {Object.values(servicesData).filter(s => s.id !== service.id).map(s => (
                     <li key={s.id}>
                       <Link 
                        to={`/${lang}/services/${s.id}`}
                        className="text-slate-600 hover:text-primary hover:bg-slate-50 transition-colors capitalize flex items-center justify-between w-full p-3 rounded-sm group text-left"
                      >
                         <span className="font-medium text-sm">{s.title}</span>
                         <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                       </Link>
                     </li>
                   ))}
                 </ul>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <section className="bg-slate-50 border-t border-slate-200 py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-6 md:gap-8">
              {/* Contact CTA */}
              <div className="bg-primary text-white p-6 md:p-8 rounded-sm shadow-lg shadow-primary/20">
                <h3 className="text-h3 font-bold mb-3 md:mb-4 font-slab">Bereit für Ihr Projekt?</h3>
                <p className="mb-8 text-primary-100 text-lg">Vereinbaren Sie einen unverbindlichen Beratungstermin vor Ort.</p>
                <Button 
                  onClick={() => navigate(`/${lang}/contact`)}
                  className="bg-white text-primary hover:bg-white/90 w-full md:w-auto font-bold"
                >
                  Kontakt aufnehmen
                </Button>
              </div>
              {/* Career CTA */}
              <div className="bg-slate-900 text-white p-6 md:p-8 rounded-sm shadow-lg">
                <h3 className="text-h3 font-bold mb-3 md:mb-4 font-slab">Karriere bei Ivangs</h3>
                <p className="mb-8 text-slate-400 text-lg">Werde Teil unseres 28-köpfigen Teams. Wir suchen Macher.</p>
                <Button 
                  onClick={() => navigate(`/${lang}/career`)}
                  variant="outline"
                  className="w-full md:w-auto font-bold border-white/20 hover:bg-white/10 text-white"
                >
                  Offene Stellen ansehen
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
