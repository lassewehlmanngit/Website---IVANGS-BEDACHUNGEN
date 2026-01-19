import React, { useEffect, useState } from 'react';
import { Page, ServiceId } from '../../types';
import { ArrowRight, CheckCircle2, Mail, Home as HomeIcon, Layers, Sun, Hammer, Zap, Phone, Briefcase, User, Calendar, Truck, Warehouse, Users, ArrowDown, Activity } from 'lucide-react';

interface HomeProps {
  setCurrentPage: (page: Page) => void;
  navigateToService: (id: ServiceId) => void;
}

const Home: React.FC<HomeProps> = ({ setCurrentPage, navigateToService }) => {
  const [scrollY, setScrollY] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const services = [
    {
      id: 'steildach',
      title: 'Steildach',
      desc: 'Ob Schieferarbeiten oder klassische Ziegel: Wir beherrschen traditionelles Handwerk und moderne Technik für Ihr Steildach.',
      img: 'https://images.unsplash.com/photo-1632759132036-799d5059d481?q=80&w=800&auto=format&fit=crop',
      checkpoints: [
        "Langlebiger Schutz vor Wind & Wetter",
        "Wertsteigerung Ihrer Immobilie",
        "Energetische Sanierung inklusive"
      ]
    },
    {
      id: 'flachdach',
      title: 'Flachdach',
      desc: 'Ob moderne Abdichtung oder Dachbegrünung: Wir nutzen Hochleistungs-Materialien, die Jahrzehnte halten.',
      img: 'https://images.unsplash.com/photo-1626292378345-d81230198e3b?q=80&w=800&auto=format&fit=crop',
      checkpoints: [
        "100% Dichtheitsgarantie",
        "Moderne Nutzungskonzepte (Begrünung)",
        "Optimale Raumausnutzung"
      ]
    },
    {
      id: 'solar',
      title: 'Solar & PV',
      desc: 'Machen Sie Ihr Dach zum Kraftwerk. Wir montieren Auf-Dach-Solar-Anlagen fachgerecht und sicher – alles aus einer Hand.',
      img: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=800&auto=format&fit=crop',
      checkpoints: [
        "Stromkosten senken & unabhängig werden",
        "Sichere Montage ohne Dachschäden",
        "Komplettservice vom Meisterbetrieb"
      ]
    },
    {
      id: 'fenster',
      title: 'VELUX Fenster-Lösungen',
      desc: 'Als VELUX-geschulter Betrieb bringen wir mehr Licht und Luft in Ihr Dachgeschoss. Fachgerecht eingebaut durch qualifizierte Mitarbeiter.',
      img: 'https://images.unsplash.com/photo-1596637508677-03cb29559c5d?q=80&w=800&auto=format&fit=crop',
      checkpoints: [
        "Helle Wohnräume und gesundes Klima",
        "Schneller Austausch ohne viel Dreck",
        "Effektiver Hitzeschutz"
      ]
    },
    {
      id: 'sanierung',
      title: 'Fassade & Sanierung',
      desc: 'Vom Altbau bis zum Balkon: Wir stellen den Wert Ihrer Immobilie materialgetreu wieder her.',
      img: 'https://images.unsplash.com/photo-1555699847-f41e54911049?q=80&w=800&auto=format&fit=crop',
      checkpoints: [
        "Materialgetreue Wiederherstellung",
        "Energetische Optimierung",
        "Fassadenbekleidung vom Fachmann"
      ]
    }
  ];

  return (
    <div className="animate-fade-in relative">
      
      {/* 1. Hero Section (Combined Design A + C with Video) */}
      <section className="relative min-h-[85vh] flex flex-col justify-center bg-slate-900 overflow-hidden">
        
        {/* Background Video & Overlay */}
        <div className="absolute inset-0 z-0">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="w-full h-full object-cover"
            poster="https://images.unsplash.com/photo-1621251939103-6f59c8821035?q=80&w=2070&auto=format&fit=crop"
          >
            {/* Using a stock video URL for roofing/construction ambiance */}
            <source src="https://cdn.coverr.co/videos/coverr-roofing-works-5309/1080p.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/60 to-slate-900/40 z-10"></div>
          {/* Design C Grid Texture */}
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/grid-me.png')] opacity-10 z-10"></div>
        </div>

        <div className="relative z-20 container mx-auto px-4 py-20 lg:py-0 grid lg:grid-cols-2 gap-16 items-center flex-grow">
          {/* Left: Copy & Main Message (Design C Typography + Design A Content) */}
          <div className="text-white mt-8 md:mt-0">
            <span className="text-primary-400 font-bold uppercase tracking-[0.2em] text-sm mb-4 block animate-slide-up">
              Meisterbetrieb seit 1996
            </span>
            <h1 className="text-5xl md:text-7xl font-medium leading-tight tracking-tight mb-6 animate-slide-up" style={{animationDelay: '100ms'}}>
              Dächer, die <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">begeistern.</span>
            </h1>
            <p className="text-xl text-slate-300 mb-10 max-w-lg font-light leading-relaxed animate-slide-up" style={{animationDelay: '200ms'}}>
              Ob Sanierung, Neubau oder Reparatur: Wir schützen, was Ihnen wichtig ist. Mit 28 Experten, eigenem Kran und Festpreis-Garantie.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 animate-slide-up" style={{animationDelay: '300ms'}}>
               <button 
                  onClick={() => setCurrentPage(Page.CONTACT)}
                  className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-full font-bold transition-all shadow-lg shadow-primary-600/30 flex items-center justify-center gap-2"
               >
                 Projekt anfragen <ArrowRight size={20} />
               </button>
               {/* Updated CTA to "Karriere starten" */}
               <button 
                  onClick={() => setCurrentPage(Page.CAREER)}
                  className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 px-8 py-4 rounded-full font-bold transition-all flex items-center justify-center gap-2"
               >
                 Karriere starten
               </button>
            </div>
          </div>

          {/* Right: Lead Form (Design A Functionality, Design C Aesthetic) */}
          <div className="hidden lg:block animate-slide-up" style={{animationDelay: '400ms'}}>
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-3xl shadow-2xl max-w-md ml-auto relative overflow-hidden">
               {/* Decorative Blur */}
               <div className="absolute top-0 right-0 w-32 h-32 bg-primary-600 rounded-full blur-[60px] opacity-30 -mr-10 -mt-10 pointer-events-none"></div>

              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2 relative z-10">
                <Mail size={20} className="text-primary-400" /> Schnellanfrage
              </h3>
              <div className="space-y-4 relative z-10">
                <div>
                   <label className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-1 block">Ihr Name</label>
                   <input type="text" className="bg-slate-900/50 border border-white/10 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-primary-500 w-full text-sm transition-colors" placeholder="Max Mustermann" />
                </div>
                <div>
                   <label className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-1 block">E-Mail oder Telefon</label>
                   <input type="text" className="bg-slate-900/50 border border-white/10 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-primary-500 w-full text-sm transition-colors" placeholder="Kontaktmöglichkeit" />
                </div>
                
                <button className="bg-white text-slate-900 hover:bg-slate-200 px-6 py-4 rounded-xl font-bold transition-all w-full flex items-center justify-center gap-2 shadow-lg mt-2">
                  Kostenlos anfragen <ArrowRight size={18} />
                </button>
                <p className="text-[10px] text-slate-400 text-center">
                   Wir melden uns innerhalb von 24h. Unverbindlich.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Glass Bar (Design C Style, Design A Content) */}
        <div className="relative z-20 border-t border-white/10 bg-white/5 backdrop-blur-md">
           <div className="container mx-auto px-4 py-6 md:py-8">
             <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-primary-400">
                      <Users size={24} />
                   </div>
                   <div>
                      <h3 className="text-2xl font-medium text-white leading-none mb-1">28</h3>
                      <p className="text-xs text-slate-400 uppercase tracking-wider font-bold">Experten</p>
                   </div>
                </div>
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-primary-400">
                      <Truck size={24} />
                   </div>
                   <div>
                      <h3 className="text-2xl font-medium text-white leading-none mb-1">Eigener</h3>
                      <p className="text-xs text-slate-400 uppercase tracking-wider font-bold">Kran-Service</p>
                   </div>
                </div>
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-primary-400">
                      <Warehouse size={24} />
                   </div>
                   <div>
                      <h3 className="text-2xl font-medium text-white leading-none mb-1">400m²</h3>
                      <p className="text-xs text-slate-400 uppercase tracking-wider font-bold">Lagerfläche</p>
                   </div>
                </div>
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-primary-400">
                      <Calendar size={24} />
                   </div>
                   <div>
                      <h3 className="text-2xl font-medium text-white leading-none mb-1">1996</h3>
                      <p className="text-xs text-slate-400 uppercase tracking-wider font-bold">Gegründet</p>
                   </div>
                </div>
             </div>
           </div>
        </div>
      </section>

      {/* 2. Quick Service Nav Strip */}
      <section className="bg-white text-slate-800 border-b border-slate-200 hidden md:block relative z-30 shadow-sm">
        <div className="w-full grid grid-cols-5 divide-x divide-slate-100">
            <button 
              onClick={() => navigateToService('steildach')}
              className="group flex flex-col items-center justify-center py-6 px-2 hover:bg-slate-50 transition-colors"
            >
              <HomeIcon size={24} className="mb-2 text-slate-400 group-hover:text-primary-600 transition-colors group-hover:scale-110 duration-300" />
              <span className="font-bold text-sm uppercase tracking-wide group-hover:text-primary-600">Steildach</span>
            </button>
            <button 
              onClick={() => navigateToService('flachdach')}
              className="group flex flex-col items-center justify-center py-6 px-2 hover:bg-slate-50 transition-colors"
            >
              <Layers size={24} className="mb-2 text-slate-400 group-hover:text-primary-600 transition-colors group-hover:scale-110 duration-300" />
              <span className="font-bold text-sm uppercase tracking-wide group-hover:text-primary-600">Flachdach</span>
            </button>
            <button 
              onClick={() => navigateToService('solar')}
              className="group flex flex-col items-center justify-center py-6 px-2 hover:bg-slate-50 transition-colors"
            >
              <Zap size={24} className="mb-2 text-slate-400 group-hover:text-primary-600 transition-colors group-hover:scale-110 duration-300" />
              <span className="font-bold text-sm uppercase tracking-wide group-hover:text-primary-600">Solar</span>
            </button>
            <button 
              onClick={() => navigateToService('fenster')}
              className="group flex flex-col items-center justify-center py-6 px-2 hover:bg-slate-50 transition-colors"
            >
              <Sun size={24} className="mb-2 text-slate-400 group-hover:text-primary-600 transition-colors group-hover:scale-110 duration-300" />
              <span className="font-bold text-sm uppercase tracking-wide group-hover:text-primary-600">Fenster</span>
            </button>
            <button 
              onClick={() => navigateToService('sanierung')}
              className="group flex flex-col items-center justify-center py-6 px-2 hover:bg-slate-50 transition-colors"
            >
              <Hammer size={24} className="mb-2 text-slate-400 group-hover:text-primary-600 transition-colors group-hover:scale-110 duration-300" />
              <span className="font-bold text-sm uppercase tracking-wide group-hover:text-primary-600">Sanierung</span>
            </button>
        </div>
      </section>

      {/* 3. Detailed Services List (Retained for detailed business info) */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          
           <div className="mb-24 text-center max-w-3xl mx-auto">
              <span className="text-primary-600 font-bold uppercase tracking-wider text-sm">Unsere Expertise</span>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mt-2 mb-6">Nicht nur dicht, sondern durchdacht.</h2>
              <p className="text-slate-600 text-lg">
                Ivangs Bedachungen bietet Ihnen das komplette Spektrum der Dach- und Fassadentechnik.
              </p>
           </div>

          <div className="space-y-24">
            {services.map((service, index) => (
              <div key={index} className={`flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12 lg:gap-20`}>
                 <div className="w-full lg:w-1/2">
                    <div className="relative rounded-3xl overflow-hidden cursor-pointer border border-slate-100 group" onClick={() => navigateToService(service.id as ServiceId)}>
                       <img src={service.img} alt={service.title} className="w-full h-[400px] object-cover group-hover:scale-105 transition-transform duration-700" />
                       <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors"></div>
                    </div>
                 </div>
                 <div className="w-full lg:w-1/2">
                    <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">{service.title}</h3>
                    <p className="text-slate-600 text-lg leading-relaxed mb-8">
                       {service.desc}
                    </p>
                    
                    <ul className="space-y-3 mb-8">
                      {service.checkpoints.map((point, idx) => (
                        <li key={idx} className="flex items-center gap-3 text-slate-700 font-medium">
                          <CheckCircle2 className="text-primary-600 shrink-0" size={20} />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>

                    <button 
                      onClick={() => navigateToService(service.id as ServiceId)}
                      className="text-white bg-slate-900 px-8 py-4 rounded-full font-bold hover:bg-primary-600 transition-colors flex items-center gap-3 shadow-lg"
                    >
                      Mehr erfahren <ArrowRight size={18} />
                    </button>
                 </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Infrastructure & Process Section (Restored & Modernized) */}
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
                    src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=2070&auto=format&fit=crop" 
                    alt="Materiallager und Logistik" 
                    className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-700" 
                 />
                 <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent p-8">
                    <div className="flex items-center gap-4 text-white font-bold text-xl">
                       <Truck className="text-primary-400" size={32} /> IVANGS Logistik
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* 5. CEO / Authority Section */}
      <section className="bg-slate-50 py-24 border-y border-slate-200">
        <div className="container mx-auto px-4">
           <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="order-2 lg:order-1">
                <span className="text-primary-600 font-bold uppercase tracking-wider text-sm block mb-4">Ein Wort vom Chef</span>
                <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-2">Marcus Ivangs</h2>
                <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-8">Geschäftsführer & Dachdeckermeister</p>
                
                <div className="prose prose-lg text-slate-600 leading-relaxed mb-10">
                   <p className="italic font-medium text-slate-800 text-xl border-l-4 border-primary-600 pl-6 mb-6">
                     "Warum man auf uns zählen kann? Weil unser Unternehmen mehr ist, als nur ein Business."
                   </p>
                   <p>
                     Jede Person in unserem Team ist einzigartig – und wir alle teilen die gleichen Werte. 
                     Wenn wir sagen, wir sind pünktlich, dann sind wir es. Wenn wir einen Preis nennen, dann halten wir ihn.
                     Handwerk ist Vertrauenssache, und dieses Vertrauen erarbeiten wir uns jeden Tag neu – auf Ihrem Dach.
                   </p>
                </div>
                
                <button 
                  onClick={() => setCurrentPage(Page.ABOUT)} 
                  className="group flex items-center gap-3 text-slate-900 font-bold hover:text-primary-600 transition-colors"
                >
                  Mehr über unser Team erfahren
                  <div className="w-10 h-10 bg-white border border-slate-200 rounded-full flex items-center justify-center group-hover:bg-primary-600 group-hover:text-white group-hover:border-primary-600 transition-all">
                    <ArrowRight size={18} />
                  </div>
                </button>
              </div>

              <div className="relative order-1 lg:order-2">
                 <div className="absolute top-0 right-0 w-full h-full border-4 border-slate-200 translate-x-6 translate-y-6 rounded-3xl -z-10"></div>
                 <img 
                   src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1000&auto=format&fit=crop" 
                   className="rounded-3xl w-full h-[600px] object-cover grayscale hover:grayscale-0 transition-all duration-700" 
                   alt="Marcus Ivangs" 
                 />
                 <div className="absolute bottom-8 left-8 bg-white p-6 rounded-xl shadow-lg max-w-xs">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Signature_sample.svg/1200px-Signature_sample.svg.png" alt="Unterschrift" className="h-12 opacity-80" />
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* 6. Featured Projects (3 Cards with Captions) */}
      <section className="py-24 bg-white overflow-hidden">
         <div className="container mx-auto px-4">
            <div className="mb-12 flex justify-between items-end">
                <div>
                  <span className="text-primary-600 font-bold uppercase tracking-wider text-sm">Referenzen</span>
                  <h2 className="text-4xl font-bold text-slate-900 mt-2">Ergebnisse, die zählen.</h2>
                </div>
                {/* Removed Link as requested */}
            </div>

            <div className="grid md:grid-cols-3 gap-8">
               {/* Project 1 */}
               <div className="group cursor-pointer">
                  <div className="relative h-72 overflow-hidden rounded-2xl mb-4">
                     <img 
                       src="https://images.unsplash.com/photo-1632759132036-799d5059d481?q=80&w=800&auto=format&fit=crop" 
                       className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" 
                       alt="Steildach Sanierung" 
                     />
                     <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-bold uppercase tracking-wider text-slate-900 rounded-full">
                       Sanierung
                     </div>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-primary-600 transition-colors">Einfamilienhaus in Kempen</h3>
                  <p className="text-slate-600 text-sm leading-relaxed border-l-2 border-primary-600 pl-3">
                    "Durch die neue Aufsparrendämmung sparen wir jetzt <strong>30% Heizkosten</strong> pro Jahr."
                  </p>
               </div>

               {/* Project 2 */}
               <div className="group cursor-pointer">
                  <div className="relative h-72 overflow-hidden rounded-2xl mb-4">
                     <img 
                       src="https://images.unsplash.com/photo-1626292378345-d81230198e3b?q=80&w=800&auto=format&fit=crop" 
                       className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" 
                       alt="Flachdach Begrünung" 
                     />
                     <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-bold uppercase tracking-wider text-slate-900 rounded-full">
                       Flachdach
                     </div>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-primary-600 transition-colors">Gewerbehalle Viersen</h3>
                  <p className="text-slate-600 text-sm leading-relaxed border-l-2 border-primary-600 pl-3">
                    "Die Dachbegrünung sorgt im Sommer für <strong>angenehme Temperaturen</strong> in der Produktion."
                  </p>
               </div>

               {/* Project 3 */}
               <div className="group cursor-pointer">
                  <div className="relative h-72 overflow-hidden rounded-2xl mb-4">
                     <img 
                       src="https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=800&auto=format&fit=crop" 
                       className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" 
                       alt="Solaranlage" 
                     />
                     <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-bold uppercase tracking-wider text-slate-900 rounded-full">
                       Solar
                     </div>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-primary-600 transition-colors">Neubau in Willich</h3>
                  <p className="text-slate-600 text-sm leading-relaxed border-l-2 border-primary-600 pl-3">
                    "Unabhängig vom Stromnetz in nur <strong>3 Tagen Montagezeit</strong>."
                  </p>
               </div>
            </div>
         </div>
      </section>

      {/* 7. Final CTA Section */}
      <section className="py-24 bg-primary-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Planen Sie sicher. Planen Sie mit Ivangs.</h2>
          <p className="text-primary-100 text-xl max-w-2xl mx-auto mb-10">
            Bevor der erste Hammer fällt, beraten wir Sie ausführlich. Gerne auch gemeinsam mit Ihrem Architekten.
          </p>
          <div className="flex justify-center gap-4">
            <button 
              onClick={() => setCurrentPage(Page.CONTACT)}
              className="bg-white text-primary-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-slate-100 transition-colors shadow-xl"
            >
              Beratungstermin vereinbaren
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;