import React, { useState } from 'react';
import { Page } from '../../types';
import Wizard from './Wizard';
import { Briefcase, MapPin, Clock, ChevronDown, CheckCircle2 } from 'lucide-react';

interface CareerProps {
  setCurrentPage: (page: Page) => void;
}

const Career: React.FC<CareerProps> = ({ setCurrentPage }) => {
  const [expandedJob, setExpandedJob] = useState<number | null>(null);

  const jobs = [
    {
      title: "Dachdeckergeselle / Vorarbeiter (m/w/d)",
      location: "Kreis Viersen & Umgebung",
      type: "Vollzeit",
      shortDesc: "Du bist Profi auf dem Steil- und Flachdach? Wir suchen Macher für unser Team.",
      tasks: [
        "Eindeckung von Dach- und Wandflächen",
        "Abdichtungsarbeiten im Flachdachbereich",
        "Einbau von Dachfenstern und Solarmodulen",
        "Wartung und Reparatur"
      ],
      profile: [
        "Abgeschlossene Ausbildung als Dachdecker",
        "Führerschein Klasse B (BE von Vorteil)",
        "Selbstständige Arbeitsweise",
        "Teamfähigkeit und Zuverlässigkeit"
      ],
      benefits: [
        "Sicherer Job in einem wachsenden Familienunternehmen",
        "Top-Ausstattung: Eigener Fuhrpark & hochwertige Arbeitskleidung",
        "Weiterbildung: Wir fördern Sonderqualifikationen (z.B. Velux, Solar)",
        "Team-Events: Weil Arbeit auch Spaß machen muss"
      ]
    },
    {
      title: "Ausbildung 2024 (m/w/d)",
      location: "Kreis Viersen",
      type: "Ausbildung",
      shortDesc: "Wir nehmen unsere Ausbildungspflicht sehr ernst. Starte deine Karriere im Handwerk.",
      tasks: [
        "Erlernen aller Grundtechniken der Dachdeckerei",
        "Arbeiten mit Holz, Ziegel, Schiefer und Metall",
        "Baustelleneinrichtung und Sicherung",
        "Kundenumgang und Teamarbeit"
      ],
      profile: [
        "Mindestens Hauptschulabschluss",
        "Handwerkliches Interesse und Geschick",
        "Lust an der Arbeit im Freien",
        "Teamgeist und Motivation"
      ],
      benefits: [
        "Attraktive Ausbildungsvergütung",
        "Übernahmegarantie bei guten Leistungen",
        "Zuschuss zum Führerschein",
        "Azubi-Events und Ausflüge"
      ]
    }
  ];

  const toggleJob = (index: number) => {
    setExpandedJob(expandedJob === index ? null : index);
  };

  return (
    <div className="animate-fade-in bg-slate-50 min-h-screen">
      
      {/* Hero Header */}
      <div className="relative h-[40vh] min-h-[400px]">
        <img src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover" alt="Workers on roof" />
        <div className="absolute inset-0 bg-slate-900/60 flex items-center justify-center">
          <div className="text-center px-4">
            <span className="text-primary-400 font-bold uppercase tracking-widest text-sm mb-4 block">Karriere bei Ivangs</span>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Bock auf Handwerk? Komm ins Team Ivangs.</h1>
            <p className="text-slate-200 text-lg max-w-2xl mx-auto">
              Wir suchen Macher, keine Nummern. 28 Kollegen freuen sich auf dich.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-20">
         <div className="grid lg:grid-cols-12 gap-16">
           
           {/* Left Column: Job Listings */}
           <div className="lg:col-span-7">
              <h2 className="text-3xl font-bold text-slate-900 mb-8">Offene Stellen</h2>
              <div className="space-y-6">
                 {jobs.map((job, i) => (
                   <div key={i} className="bg-white border border-slate-200 rounded-sm hover:border-primary-500 hover:shadow-lg transition-all cursor-pointer group overflow-hidden">
                      {/* Header Section (Always Visible) */}
                      <div className="p-8" onClick={() => toggleJob(i)}>
                        <div className="flex justify-between items-start mb-4">
                          <h3 className="text-xl font-bold text-slate-900 group-hover:text-primary-600 transition-colors">{job.title}</h3>
                          <span className={`px-3 py-1 rounded-sm text-xs font-bold ${job.type === 'Ausbildung' ? 'bg-orange-100 text-orange-700' : 'bg-primary-100 text-primary-700'}`}>
                            {job.type}
                          </span>
                        </div>
                        
                        <div className="flex gap-6 text-sm text-slate-500 mb-4">
                          <span className="flex items-center gap-1"><MapPin size={16} /> {job.location}</span>
                          <span className="flex items-center gap-1"><Clock size={16} /> Ab sofort</span>
                        </div>

                        <p className="text-slate-600 text-sm leading-relaxed mb-4">
                          {job.shortDesc}
                        </p>

                        <div className="flex items-center justify-between mt-4">
                            <span className="text-primary-600 font-bold text-sm hover:underline flex items-center gap-1">
                               {expandedJob === i ? 'Weniger anzeigen' : 'Mehr erfahren'}
                            </span>
                            <ChevronDown size={20} className={`text-slate-400 transition-transform duration-300 ${expandedJob === i ? 'rotate-180' : ''}`} />
                        </div>
                      </div>

                      {/* Accordion Content */}
                      <div className={`grid transition-[grid-template-rows] duration-300 ease-out ${expandedJob === i ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                        <div className="overflow-hidden bg-slate-50 border-t border-slate-100">
                           <div className="p-8 grid md:grid-cols-2 gap-8">
                              <div>
                                <h4 className="font-bold text-slate-900 mb-3 text-sm uppercase tracking-wide">Deine Aufgaben</h4>
                                <ul className="space-y-2 mb-6">
                                  {job.tasks.map((task, idx) => (
                                    <li key={idx} className="flex items-start gap-2 text-sm text-slate-600">
                                      <CheckCircle2 size={16} className="text-primary-600 shrink-0 mt-0.5" />
                                      <span>{task}</span>
                                    </li>
                                  ))}
                                </ul>

                                <h4 className="font-bold text-slate-900 mb-3 text-sm uppercase tracking-wide">Das bringst du mit</h4>
                                 <ul className="space-y-2">
                                  {job.profile.map((item, idx) => (
                                    <li key={idx} className="flex items-start gap-2 text-sm text-slate-600">
                                      <CheckCircle2 size={16} className="text-primary-600 shrink-0 mt-0.5" />
                                      <span>{item}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              
                              <div className="flex flex-col justify-between">
                                 <div>
                                   <h4 className="font-bold text-slate-900 mb-3 text-sm uppercase tracking-wide">Wir bieten dir</h4>
                                   <ul className="space-y-2 mb-8">
                                    {job.benefits.map((item, idx) => (
                                      <li key={idx} className="flex items-start gap-2 text-sm text-slate-600">
                                        <CheckCircle2 size={16} className="text-primary-600 shrink-0 mt-0.5" />
                                        <span>{item}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                                
                                <button 
                                  onClick={(e) => {
                                     e.stopPropagation();
                                     setCurrentPage(Page.CONTACT);
                                  }}
                                  className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-sm font-bold w-full transition-colors flex items-center justify-center gap-2 shadow-lg"
                                >
                                  Jetzt bewerben <Briefcase size={16} />
                                </button>
                              </div>
                           </div>
                        </div>
                      </div>
                   </div>
                 ))}
              </div>
           </div>
           
           {/* Right Column: Wizard & Sidebar */}
           <div className="lg:col-span-5 space-y-8">
             <div className="bg-white p-8 rounded-sm shadow-xl border border-slate-100">
               <h3 className="text-xl font-bold mb-6">Karriere Finder</h3>
               <p className="text-sm text-slate-500 mb-6">Unsicher welche Stelle passt? Beantworte 3 Fragen.</p>
               <Wizard />
             </div>

             <div className="bg-slate-900 text-white p-8 rounded-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary-600 rounded-full blur-[50px] opacity-20 -mr-10 -mt-10"></div>
                <h3 className="text-xl font-bold mb-4 relative z-10">Initiativbewerbung</h3>
                <p className="text-slate-400 text-sm mb-6 relative z-10">
                  Keine passende Stelle dabei? Wir freuen uns immer über motivierte Bewerber.
                </p>
                <button 
                  onClick={() => setCurrentPage(Page.CONTACT)}
                  className="w-full bg-white text-slate-900 font-bold py-3 rounded-sm hover:bg-slate-200 transition-colors"
                >
                  Kontakt aufnehmen
                </button>
             </div>
           </div>
         </div>
      </div>
    </div>
  );
};

export default Career;