import React from 'react';
import { Page } from '../../types';
import { ArrowRight, Star, Clock, Shield, PenTool, Hammer, Layout } from 'lucide-react';

interface HomeProps {
  setCurrentPage: (page: Page) => void;
}

const Home: React.FC<HomeProps> = ({ setCurrentPage }) => {
  return (
    <div className="animate-fade-in p-4 md:p-6 bg-[#F3F5F7]">
      
      {/* Hero Section - Dusty Blue Card */}
      <section className="relative bg-[#8DA3B3] rounded-[2rem] md:rounded-[3rem] overflow-hidden min-h-[600px] md:min-h-[700px] flex flex-col md:flex-row shadow-sm">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-[#8DA3B3] via-[#8DA3B3] to-transparent z-10 md:w-2/3"></div>
        
        {/* Content */}
        <div className="relative z-20 w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center text-white">
           <div className="flex items-center gap-2 text-sm font-medium mb-6 opacity-80">
              <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
              RUTHER BEDACHUNGEN
           </div>
           
           <h1 className="text-5xl md:text-7xl font-medium leading-[1.1] mb-8 tracking-tight">
             Dein Dach – <br/>
             <span className="opacity-70">Deine Regeln.</span>
           </h1>
           
           <p className="text-lg md:text-xl opacity-90 mb-12 max-w-md font-light">
             Hohe Qualitätsstandards im Bau von modernen Dächern und Fassaden seit 2005.
           </p>
           
           <button 
             onClick={() => setCurrentPage(Page.CONTACT)}
             className="bg-slate-900 text-white px-8 py-4 rounded-full font-medium w-fit flex items-center gap-3 hover:bg-slate-800 transition-colors"
           >
             Quiz starten
           </button>
           
           <div className="mt-12 text-sm opacity-60">
             Wir beschäftigen uns mit dem Bau von<br/>Rahmenhäusern seit 2005
           </div>
        </div>

        {/* Image */}
        <div className="absolute top-0 right-0 w-full md:w-3/5 h-full z-0">
           <img 
             src="https://images.unsplash.com/photo-1600596542815-2a4d9f6facb8?q=80&w=2069&auto=format&fit=crop" 
             className="w-full h-full object-cover"
             alt="Modern House" 
           />
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-12 gap-12">
           <div className="md:col-span-5">
             <h2 className="text-4xl font-medium text-slate-900 leading-tight mb-6">
               Wir übernehmen Planung, Design und Montage.
             </h2>
             <p className="text-slate-500 mb-8">
               Unser Unternehmen führt den kompletten Arbeitszyklus durch, von der geodätischen Vermessung bis zur schlüsselfertigen Übergabe.
             </p>
           </div>
           
           <div className="md:col-span-7 grid gap-8">
              {[
                { 
                  icon: <PenTool size={24} />, 
                  title: 'Projektierung', 
                  desc: 'Vorbereitung von Festigkeitsberechnungen, Materialplanung und Spezifikationen.',
                  img: 'https://picsum.photos/100/100?random=50'
                },
                { 
                  icon: <Layout size={24} />, 
                  title: 'Design von Fassaden', 
                  desc: 'Entwicklung von Konzeptfassaden, Designprojekten und architektonischen Visualisierungen.',
                  img: 'https://picsum.photos/100/100?random=51'
                },
                { 
                  icon: <Hammer size={24} />, 
                  title: 'Montage & Bau', 
                  desc: 'Arbeiten zur Dämmung, Montage von Unterkonstruktionen und finaler Eindeckung.',
                  img: 'https://picsum.photos/100/100?random=52'
                }
              ].map((s, i) => (
                <div key={i} className="bg-white p-6 rounded-3xl flex items-start gap-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer" onClick={() => setCurrentPage(Page.SERVICES)}>
                   <div className="w-20 h-20 rounded-2xl overflow-hidden shrink-0 bg-slate-100">
                     <img src={s.img} className="w-full h-full object-cover" alt="Service" />
                   </div>
                   <div>
                     <h3 className="text-xl font-bold text-slate-900 mb-2">{s.title}</h3>
                     <p className="text-slate-500 text-sm">{s.desc}</p>
                   </div>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* Quality Section */}
      <section className="py-12 container mx-auto max-w-6xl mb-12">
         <div className="bg-white rounded-[3rem] p-8 md:p-12 shadow-sm grid md:grid-cols-2 gap-12 items-center">
            <div>
               <h2 className="text-3xl font-medium mb-6">Schnelle Zeiten und hohe Arbeitsqualität</h2>
               <div className="grid grid-cols-2 gap-6">
                  <div className="bg-[#F3F5F7] p-6 rounded-3xl">
                     <div className="text-3xl font-bold text-slate-900 mb-1">180+</div>
                     <div className="text-sm text-slate-500">Zufriedene Kunden</div>
                  </div>
                  <div className="bg-[#F3F5F7] p-6 rounded-3xl">
                     <div className="text-3xl font-bold text-slate-900 mb-1">100%</div>
                     <div className="text-sm text-slate-500">Qualitätsstandard</div>
                  </div>
               </div>
            </div>
            <div className="relative h-80 rounded-[2rem] overflow-hidden">
               <img src="https://picsum.photos/800/600?random=60" className="w-full h-full object-cover" />
               <div className="absolute bottom-6 left-6 bg-slate-900 text-white px-6 py-3 rounded-full text-sm font-medium">
                 Individuelle Projekte
               </div>
            </div>
         </div>
      </section>

      {/* Testimonials - Dark Section */}
      <section className="bg-slate-900 text-white py-24 rounded-[3rem] mx-2 md:mx-4 mb-4">
         <div className="container mx-auto px-6 md:px-12">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
               <h2 className="text-4xl font-medium max-w-xl">
                 Der Hauptindikator für die Qualität unserer Arbeit - ein zufriedener Kunde.
               </h2>
               <div className="flex gap-4">
                 <div className="bg-white text-slate-900 px-4 py-2 rounded-full font-bold text-sm flex items-center gap-2">
                    <Star size={16} fill="currentColor" /> 4.9
                 </div>
                 <div className="text-sm opacity-60 self-center">185 Bewertungen</div>
               </div>
            </div>

            <div className="grid md:grid-cols-4 gap-6">
               {[
                 { name: 'Evgeni Lisa', date: '24 Feb 2024', text: 'Für den Bau meines dritten Hauses habe ich diese Firma gewählt. Alles lief perfekt.' },
                 { name: 'Boris K.', date: '12 Jan 2024', text: 'Sehr kreative Architekten, große Experten im Bereich Holzkonstruktionen.' },
                 { name: 'Evgeni K.', date: '05 Dez 2023', text: 'Wir haben das Haus früher als geplant erhalten. Es ist warm und komfortabel.' },
                 { name: 'Sergey B.', date: '20 Nov 2023', text: 'Sie haben unser Traumhaus von Null an gebaut. Das Ergebnis übertrifft alle Erwartungen.' },
               ].map((review, i) => (
                 <div key={i} className="bg-white text-slate-900 p-6 rounded-3xl flex flex-col h-full">
                    <div className="flex items-center gap-3 mb-4">
                       <div className="w-10 h-10 bg-slate-200 rounded-full overflow-hidden">
                         <img src={`https://picsum.photos/100/100?random=${70+i}`} />
                       </div>
                       <div>
                         <div className="font-bold text-sm">{review.name}</div>
                         <div className="text-xs text-slate-400">{review.date}</div>
                       </div>
                    </div>
                    <div className="flex gap-1 text-yellow-500 mb-3">
                       {[1,2,3,4,5].map(s => <Star key={s} size={12} fill="currentColor" />)}
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed mb-4 flex-grow">
                      {review.text}
                    </p>
                    <a href="#" className="text-xs text-slate-400 hover:text-slate-900 underline decoration-slate-300 underline-offset-4">Quelle ansehen</a>
                 </div>
               ))}
            </div>
         </div>
      </section>
    </div>
  );
};

export default Home;