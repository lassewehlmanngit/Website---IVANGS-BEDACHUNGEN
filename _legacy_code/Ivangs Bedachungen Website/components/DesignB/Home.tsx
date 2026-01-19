import React, { useState } from 'react';
import { Page } from '../../types';
import { ArrowRight, CheckCircle2, ChevronDown, ChevronUp, Shield, Wind, Hammer, Leaf, Thermometer, Phone } from 'lucide-react';

interface HomeProps {
  setCurrentPage: (page: Page) => void;
}

const Home: React.FC<HomeProps> = ({ setCurrentPage }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [accordionOpen, setAccordionOpen] = useState(0);

  const services = [
    {
      id: 0,
      icon: <Wind size={20} />,
      title: 'Sturmschaden Bewertung',
      desc: 'Schnelle und professionelle Analyse von Sturmschäden an Ihrem Dach.'
    },
    {
      id: 1,
      icon: <Shield size={20} />,
      title: 'Steildach Eindeckung',
      desc: 'Klassische Ziegel oder moderne Materialien. Steildächer sind unsere Spezialität. Wir sorgen für Langlebigkeit und Ästhetik.',
      details: ['Dachrinnen Installation', 'Dachfenster Einbau', 'Kaminverkleidung']
    },
    {
      id: 2,
      icon: <Hammer size={20} />,
      title: 'Metallbedachungen',
      desc: 'Langlebige und wartungsarme Lösungen aus Zink, Kupfer oder Aluminium.'
    },
    {
      id: 3,
      icon: <Leaf size={20} />,
      title: 'Gründach Installation',
      desc: 'Ökologisch wertvoll und optisch ein Highlight. Wir begrünen Ihr Flachdach.'
    },
    {
      id: 4,
      icon: <Thermometer size={20} />,
      title: 'Dachbelüftung',
      desc: 'Für ein gesundes Raumklima und den Schutz der Bausubstanz.'
    }
  ];

  return (
    <div className="animate-fade-in font-sans">
      
      {/* Hero Section - Screenshot Style */}
      <section className="relative bg-white pt-10 pb-20 lg:pt-20 lg:pb-32 overflow-hidden">
        {/* Background Image Container - Positioned to right */}
        <div className="hidden lg:block absolute top-0 right-0 w-[55%] h-full">
           <div className="relative w-full h-full">
              <img 
                src="https://picsum.photos/1000/1200?random=100" 
                alt="Roofer Hero" 
                className="w-full h-full object-cover rounded-bl-[100px]"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-transparent to-white/10"></div>
           </div>
        </div>
        
        {/* Mobile Background */}
        <div className="lg:hidden absolute inset-0 z-0">
          <img src="https://picsum.photos/800/600?random=100" alt="Hero" className="w-full h-full object-cover opacity-20" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="bg-white/95 backdrop-blur-sm shadow-2xl rounded-3xl p-8 md:p-12 max-w-2xl border-t-8 border-primary-600">
            <span className="text-primary-600 font-bold uppercase tracking-widest text-sm mb-4 block">
              Bezahlbar, Zuverlässig & Langlebig
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 leading-tight mb-6">
              Starke Dächer für <br/>eine sichere Zukunft.
            </h1>
            <p className="text-slate-600 text-lg mb-8 leading-relaxed">
              Ihr Dach ist die erste Verteidigungslinie Ihres Hauses. Wir bieten erstklassige Dachdeckerarbeiten, Fassadenbau und Bauklempnerei – präzise geplant und meisterhaft ausgeführt.
            </p>
            <button 
              onClick={() => setCurrentPage(Page.CONTACT)}
              className="bg-primary-600 hover:bg-primary-700 text-white text-lg font-bold px-8 py-4 rounded-lg shadow-xl shadow-primary-600/20 transition-all hover:translate-y-[-2px]"
            >
              BERATUNGSTERMIN VEREINBAREN
            </button>
          </div>
        </div>
      </section>

      {/* About Us - 3 Column/Grid Layout from Screenshot */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Column: Text */}
            <div className="lg:col-span-4">
              <span className="text-primary-600 font-bold uppercase tracking-widest text-sm mb-2 block">Über Uns</span>
              <h2 className="text-4xl font-extrabold text-slate-900 mb-6 leading-tight">
                Wir verwandeln Häuser mit Qualität.
              </h2>
              <p className="text-slate-600 mb-8 leading-relaxed">
                Von kleinen Reparaturen bis hin zur kompletten Neueindeckung behandeln wir jedes Haus wie unser eigenes. Unser Team aus erfahrenen Fachkräften garantiert Langlebigkeit, Qualität und Sicherheit.
              </p>
              <button 
                onClick={() => setCurrentPage(Page.ABOUT)}
                className="bg-primary-600 text-white font-bold px-8 py-3 rounded-lg hover:bg-primary-700 transition-colors"
              >
                MEHR ERFAHREN
              </button>
            </div>

            {/* Middle Column: Image */}
            <div className="lg:col-span-4">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl h-[500px]">
                <img src="https://picsum.photos/500/800?random=101" alt="Workers" className="w-full h-full object-cover" />
                {/* Floating Badge */}
                <div className="absolute bottom-6 left-6 bg-white p-4 rounded-xl shadow-lg">
                  <p className="text-3xl font-bold text-primary-600">25+</p>
                  <p className="text-xs font-bold text-slate-800 uppercase">Jahre Erfahrung</p>
                </div>
              </div>
            </div>

            {/* Right Column: Accordion */}
            <div className="lg:col-span-4 space-y-4">
              {[
                { title: 'Unsere Mission', content: 'Wir liefern Handwerkskunst, die Generationen überdauert. Qualität ist unser oberstes Gebot.' },
                { title: 'Unsere Vision', content: 'Der führende Ansprechpartner für moderne und nachhaltige Bedachungen in der Region zu sein.' },
                { title: 'Unsere Werte', content: 'Verlässlichkeit, Transparenz und faire Partnerschaft mit unseren Kunden und Mitarbeitern.' }
              ].map((item, idx) => (
                <div key={idx} className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                  <button 
                    onClick={() => setAccordionOpen(accordionOpen === idx ? -1 : idx)}
                    className={`w-full flex justify-between items-center p-6 text-left transition-colors ${
                      accordionOpen === idx ? 'bg-primary-600 text-white' : 'bg-white text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    <span className="font-bold text-lg">{item.title}</span>
                    {accordionOpen === idx ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </button>
                  {accordionOpen === idx && (
                    <div className="p-6 text-slate-600 leading-relaxed bg-white">
                      {item.content}
                    </div>
                  )}
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* Services Section - Tabbed Layout */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="bg-primary-100 text-primary-700 px-4 py-2 rounded-full font-bold text-xs uppercase tracking-widest inline-block mb-4">
              Unsere Leistungen
            </span>
            <h2 className="text-4xl font-extrabold text-slate-900">
              Schützen Sie Ihr Zuhause mit unseren Profi-Lösungen
            </h2>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 bg-white border border-slate-200 rounded-3xl shadow-xl overflow-hidden">
            {/* Sidebar Tabs */}
            <div className="lg:col-span-4 bg-slate-50 p-8 space-y-3 border-r border-slate-200">
              {services.map((s, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveTab(idx)}
                  className={`w-full flex items-center gap-4 p-4 rounded-xl transition-all duration-300 ${
                    activeTab === idx 
                      ? 'bg-primary-600 text-white shadow-lg transform scale-105' 
                      : 'bg-white text-slate-600 hover:bg-primary-50'
                  }`}
                >
                  <div className={`${activeTab === idx ? 'text-white' : 'text-primary-600'}`}>
                    {s.icon}
                  </div>
                  <span className="font-bold text-sm md:text-base text-left">{s.title}</span>
                </button>
              ))}
            </div>

            {/* Content Area */}
            <div className="lg:col-span-8 p-8 md:p-12">
               <div className="grid md:grid-cols-2 gap-12 items-center h-full">
                  <div className="order-2 md:order-1">
                    <h3 className="text-3xl font-bold text-slate-900 mb-6">{services[activeTab].title}</h3>
                    <p className="text-slate-600 text-lg mb-8 leading-relaxed">
                      {services[activeTab].desc}
                    </p>
                    
                    {services[activeTab].details && (
                      <ul className="space-y-4 mb-8">
                        {services[activeTab].details?.map((detail, i) => (
                          <li key={i} className="flex items-center gap-3">
                            <div className="bg-primary-100 p-1 rounded-full text-primary-600">
                              <CheckCircle2 size={18} />
                            </div>
                            <span className="font-semibold text-slate-700">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    <button 
                      onClick={() => setCurrentPage(Page.SERVICES)}
                      className="bg-primary-600 text-white font-bold px-8 py-3 rounded-lg hover:bg-primary-700 transition-all flex items-center gap-2"
                    >
                      MEHR DAZU <ArrowRight size={18} />
                    </button>
                  </div>
                  <div className="order-1 md:order-2 h-full min-h-[300px]">
                    <img 
                      src={`https://picsum.photos/600/800?random=${200 + activeTab}`} 
                      alt="Service Detail" 
                      className="w-full h-full object-cover rounded-2xl shadow-lg transform rotate-2 hover:rotate-0 transition-transform duration-500"
                    />
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Strip - Primary Blue */}
      <section className="bg-primary-600 py-16">
         <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-white">
              <h2 className="text-3xl font-extrabold mb-2">Notfall am Dach?</h2>
              <p className="text-primary-100 text-lg">Unser Notdienst ist 24/7 für Sie erreichbar.</p>
            </div>
            <div className="flex gap-4">
              <a href="tel:+123" className="bg-white text-primary-600 px-8 py-4 rounded-lg font-bold shadow-lg hover:bg-slate-100 transition-colors flex items-center gap-2">
                <Phone size={20} />
                +49 123 456 789
              </a>
            </div>
         </div>
      </section>

    </div>
  );
};

export default Home;