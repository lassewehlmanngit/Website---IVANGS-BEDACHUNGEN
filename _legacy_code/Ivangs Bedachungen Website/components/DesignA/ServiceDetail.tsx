import React, { useState } from 'react';
import { Page, ServiceId } from '../../types';
import { ArrowLeft, CheckCircle2, ArrowRight, Phone, ShieldCheck, Thermometer, Layers, Sun, Hammer, Leaf, HelpCircle, ChevronDown, Image as ImageIcon, Zap, Battery, Ruler, CloudRain, Info, User, Calendar, FileText, Mail } from 'lucide-react';

interface ServiceDetailProps {
  serviceId: ServiceId;
  setCurrentPage: (page: Page) => void;
}

const ServiceDetail: React.FC<ServiceDetailProps> = ({ serviceId, setCurrentPage }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0); 
  
  // Data structure for specific team members
  const team = {
    marcus: { name: "Marcus Ivangs", role: "Geschäftsführer", desc: "Für Großprojekte & strategische Fragen.", img: "https://randomuser.me/api/portraits/men/32.jpg" },
    sascha: { name: "Sascha Peters", role: "Dachdeckermeister & Bauleitung", desc: "Ihr Experte für technische Planung & Machbarkeit.", img: "https://randomuser.me/api/portraits/men/44.jpg" },
    isabel: { name: "Isabel Ivangs", role: "Büro & Terminierung", desc: "Für Terminabsprachen & Rechnungsfragen.", img: "https://randomuser.me/api/portraits/women/44.jpg" },
    sabine: { name: "Sabine Hammes", role: "Reparaturenplanung", desc: "Koordination von Reparatur- und Wartungsterminen.", img: "https://randomuser.me/api/portraits/women/68.jpg" }
  };

  // Rich content structure
  const data: Record<string, any> = {
    steildach: {
      title: 'Steildach',
      subtitle: 'Der Charakter Ihres Hauses',
      intro: 'Ein Steildach ist ein komplexes System aus vielen Schichten. Es muss atmen, dämmen und schützen. Wir erklären Ihnen, wie eine fachgerechte Sanierung abläuft und warum wir auf bestimmte Materialien setzen.',
      img: 'https://images.unsplash.com/photo-1632759132036-799d5059d481?q=80&w=2070&auto=format&fit=crop',
      expertTip: "Wussten Sie schon? Ein neues Dach mit Aufsparrendämmung kann Ihre Heizkosten um bis zu 30% senken und wird vom Staat (BAFA) hoch gefördert.",
      sections: [
        {
          title: 'Materialkunde: Die Qual der Wahl',
          icon: <Hammer className="text-primary-600" />,
          content: 'Die Eindeckung bestimmt die Optik und Lebensdauer:\n\n• **Tonziegel:** Das Naturprodukt. Brennt bei über 1000°C, ist farbecht und hält 80+ Jahre. Ideal für klassische Optik.\n• **Betondachstein:** Die wirtschaftliche Lösung. Extrem hart, frostbeständig und mit besserer Ökobilanz in der Herstellung.\n• **Naturschiefer:** Die Königsklasse. Jedes Stück ein Unikat, handwerklich anspruchsvoll verlegt für zeitlose Eleganz.'
        },
        {
          title: 'Bauphysik & Dämmung',
          icon: <Thermometer className="text-primary-600" />,
          content: 'Das wichtigste passiert unter dem Ziegel. Wir verbauen moderne Unterspannbahnen, die Feuchtigkeit von innen nach außen lassen (Diffusion), aber Regen sicher abhalten. Bei der Dämmung setzen wir auf PU-Hartschaum oder Holzfaser – je nach Ihrem Budget und ökologischem Anspruch.'
        }
      ],
      process: [
        { step: 1, title: "Gerüst & Sicherheit", text: "Sicherheit geht vor. Wir stellen das Gerüst und sichern die Baustelle gegen herabfallende Teile." },
        { step: 2, title: "Abriss & Entsorgung", text: "Alte Ziegel und Lattung werden entfernt und fachgerecht entsorgt (sortenrein)." },
        { step: 3, title: "Dämmung & Unterdach", text: "Montage der Dampfbremse und der Dämmung. Ab jetzt ist das Haus wieder regendicht." },
        { step: 4, title: "Lattung & Eindeckung", text: "Montage der Konterlattung (Hinterlüftung!) und der neuen Eindeckung." },
        { step: 5, title: "Spenglerarbeiten", text: "Montage von Rinnen, Kaminverkleidungen und Wandanschlüssen aus Zink oder Kupfer." }
      ],
      references: [
        "https://images.unsplash.com/photo-1628151016008-61e88e85579f?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1591825729269-caeb344f6df2?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1632759132036-799d5059d481?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1555699847-f41e54911049?q=80&w=600&auto=format&fit=crop"
      ],
      contacts: [team.sascha, team.isabel],
      faq: [
        { q: 'Wie lange dauert eine komplette Sanierung?', a: 'Bei einem Einfamilienhaus rechnen wir wetterabhängig mit ca. 2 Wochen.' },
        { q: 'Kann ich während der Arbeiten im Haus wohnen?', a: 'Ja, absolut. Da wir meist von außen arbeiten, ist die Beeinträchtigung im Wohnraum minimal.' }
      ]
    },
    flachdach: {
      title: 'Flachdach',
      subtitle: 'Moderne Architektur & Nutzbarkeit',
      intro: 'Das moderne Flachdach ist ein Hochleistungsbauteil. Vergessen Sie die alten "Teerpappe-Geschichten". Wir arbeiten mit Materialien, die Jahrzehnte halten und neue Lebensräume schaffen.',
      img: 'https://images.unsplash.com/photo-1626292378345-d81230198e3b?q=80&w=2070&auto=format&fit=crop',
      expertTip: "Ein Flachdach bietet Platz! Nutzen Sie es doppelt: Als Terrasse zum Entspannen oder als Gründach für besseres Klima.",
      sections: [
        {
          title: 'Die Abdichtung: Bitumen oder Kunststoff?',
          icon: <Layers className="text-primary-600" />,
          content: 'Wir beraten objektiv:\n\n• **Bitumen:** Der Klassiker. Zweilagig verschweißt entsteht eine dicke, robuste Schicht. Ideal, wenn das Dach später begehbar sein soll.\n• **Kunststoff (FPO/PVC):** Einlagig, leicht und flexibel. Perfekt für große Hallen oder Leichtbauweisen. Chemisch beständig und langlebig.'
        },
        {
          title: 'Entwässerung ist alles',
          icon: <CloudRain className="text-primary-600" />,
          content: 'Stehendes Wasser ist der Feind. Wir planen das Gefälle exakt und verbauen Notüberläufe, damit auch bei Starkregen das Wasser sicher abfließt und die Statik nicht gefährdet.'
        }
      ],
      process: [
        { step: 1, title: "Untergrundvorbereitung", text: "Reinigung der Betondecke oder Trapezbleche. Auftragung von Voranstrich." },
        { step: 2, title: "Dampfsperre", text: "Verhindert, dass Feuchtigkeit aus dem Wohnraum in die Dämmung zieht." },
        { step: 3, title: "Gefälledämmung", text: "Wir schneiden die Dämmung so, dass das Wasser gezielt zu den Abläufen fließt." },
        { step: 4, title: "Abdichtung", text: "Fachgerechtes Verschweißen der Oberlage. Anschlüsse an Wände und Lichtkuppeln." }
      ],
      references: [
        "https://images.unsplash.com/photo-1596253686851-90a6e35509d3?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1626292378345-d81230198e3b?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1464146072230-91cabc968266?q=80&w=600&auto=format&fit=crop"
      ],
      contacts: [team.sascha, team.isabel],
      faq: [
        { q: 'Wie oft muss ein Flachdach gewartet werden?', a: 'Wir empfehlen 1x jährlich. Wir reinigen die Abläufe (Laub!) und prüfen die Nähte.' },
        { q: 'Kann ich Kies aufs Dach schütten?', a: 'Kies schützt vor UV-Strahlung, ist aber schwer. Wir müssen vorher die Statik prüfen.' }
      ]
    },
    fenster: {
      title: 'Fenster & VELUX Partner',
      subtitle: 'Licht, Luft & Lebensqualität',
      intro: 'Warum wir so viel über VELUX sprechen? Weil es für Qualität steht. Ein Dachfenster ist extremen Belastungen ausgesetzt – Hitze, Frost, Schlagregen. Hier sparen wir nicht am Material.',
      img: 'https://images.unsplash.com/photo-1596637508677-03cb29559c5d?q=80&w=2070&auto=format&fit=crop',
      expertTip: "Tauschen Sie alt gegen neu an einem Tag. Mit speziellen Renovierungsrahmen geht das oft ohne Dreck im Innenraum.",
      sections: [
        {
          title: 'Was heißt "Geschulter Betrieb"?',
          icon: <CheckCircle2 className="text-primary-600" />,
          content: 'Jeder kann ein Fenster kaufen. Aber der Einbau entscheidet über Dichtigkeit und Schimmelbildung. Wir sind von VELUX geschult, den **BDX-Dämmrahmen** und die **BFX-Anschlussschürze** korrekt zu verbauen. Das garantiert, dass der Anschluss ans Dach winddicht und gedämmt ist. Zudem erhalten Sie so die volle Herstellergarantie.'
        },
        {
          title: 'Mehr als nur Glas',
          icon: <Sun className="text-primary-600" />,
          content: 'Das Fenster ist nur die halbe Miete. Wir beraten Sie zum Hitzeschutz (Markisen, Rollläden), der bis zu 95% der Hitze draußen hält, und zu Insektenschutzlösungen.'
        }
      ],
      process: [
        { step: 1, title: "Ausmaß & Beratung", text: "Wir messen vor Ort und prüfen, welcher Fenstertyp (Schwing oder Klapp-Schwing) passt." },
        { step: 2, title: "Staubschutz", text: "Abdecken des Bodens und der Möbel im Innenraum." },
        { step: 3, title: "Ausbau & Entsorgung", text: "Vorsichtiger Ausbau des alten Fensters und fachgerechte Entsorgung." },
        { step: 4, title: "Einbau & Anschluss", text: "Montage des neuen Fensters inkl. Dämmrahmen und Anschluss an die Dachhaut." },
        { step: 5, title: "Einweisung", text: "Wir zeigen Ihnen die Funktionen und Pflege Ihres neuen Fensters." }
      ],
      references: [
        "https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1596637508677-03cb29559c5d?q=80&w=600&auto=format&fit=crop"
      ],
      contacts: [team.sabine, team.sascha],
      faq: [
        { q: 'Holz oder Kunststoff?', a: 'Im Bad immer Kunststoff (feuchtraumgeeignet). Im Wohnraum wirkt Holz gemütlicher. VELUX bietet beides.' },
        { q: 'Lohnt sich 3-fach Verglasung?', a: 'Ja! Sie dämmt besser und reduziert Regengeräusche massiv ("Anti-Regen-Geräusch-Effekt").' }
      ]
    },
    sanierung: {
      title: 'Sanierung & Reparatur',
      subtitle: 'Werterhalt statt Totalschaden',
      intro: 'Kleine Schäden werden schnell groß. Ein loser Ziegel, eine undichte Rinne – Wasser sucht sich seinen Weg. Wir kümmern uns um den Werterhalt Ihrer Immobilie.',
      img: 'https://images.unsplash.com/photo-1555699847-f41e54911049?q=80&w=2070&auto=format&fit=crop',
      expertTip: "Warten Sie nicht auf den Sturm. Ein Wartungsvertrag ist wie der TÜV fürs Auto – und oft günstiger als ein Wasserschaden.",
      sections: [
        {
          title: 'Reparatur vs. Sanierung',
          icon: <ShieldCheck className="text-primary-600" />,
          content: 'Wir verkaufen Ihnen kein neues Dach, wenn eine Reparatur reicht. Wir prüfen den Zustand der Substanz ehrlich. Sind >30% der Fläche betroffen oder die Dämmung nass, planen wir eine Sanierung. Bei Sturmschäden oder Verschleißteilen reparieren wir punktuell.'
        },
        {
          title: 'Wartungsservice',
          icon: <Calendar className="text-primary-600" />,
          content: 'Einmal jährlich kommen wir vorbei: Rinnen reinigen, Sichtprüfung der Ziegel und Anschlüsse, Protokoll für Ihre Versicherung. Das gibt Sicherheit.'
        }
      ],
      process: [
        { step: 1, title: "Meldung", text: "Sie rufen an oder schicken ein Foto des Schadens." },
        { step: 2, title: "Besichtigung", text: "Wir schauen uns den Schaden vor Ort an (bei Gefahr im Verzug sichern wir sofort)." },
        { step: 3, title: "Planung", text: "Kleine Reparaturen erledigen wir oft sofort. Für Größeres erhalten Sie ein Festpreis-Angebot." },
        { step: 4, title: "Ausführung", text: "Schnelle und saubere Durchführung durch unsere Service-Teams." }
      ],
      references: [
        "https://images.unsplash.com/photo-1574739712545-924d77265cbb?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?q=80&w=600&auto=format&fit=crop"
      ],
      contacts: [team.sabine, team.isabel],
      faq: [
        { q: 'Was kostet eine Rinnenreinigung?', a: 'Das hängt von der Länge und Höhe ab. Rufen Sie Sabine Hammes an, sie gibt Ihnen einen Richtwert.' },
        { q: 'Helfen Sie bei Versicherungsschäden?', a: 'Ja, wir erstellen die nötigen Fotos und Berichte für Ihre Wohngebäudeversicherung.' }
      ]
    },
    solar: {
      title: 'Solar & Photovoltaik',
      subtitle: 'Warum der Dachdecker die bessere Wahl ist',
      intro: 'Photovoltaik boomt. Aber Vorsicht: Die meisten Anlagen werden von Elektrikern montiert, die die Dachhaut nicht kennen. Wir garantieren Ihnen: Strom fließt, Wasser bleibt draußen.',
      img: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=2070&auto=format&fit=crop',
      expertTip: "Lassen Sie keine Laien an Ihr Dach. Ein durchgebohrter Ziegel kann Jahre später zu morschen Balken führen.",
      sections: [
        {
          title: 'Das Problem mit den Dachhaken',
          icon: <Info className="text-primary-600" />,
          content: 'Um Solarmodule zu befestigen, müssen Haken unter die Ziegel. Viele Anbieter "flexen" die Ziegel einfach aus. Die Folge: Bruchgefahr bei Schneelast. Wir nutzen **spezielle Metalldachplatten** oder bearbeiten die Ziegel fachgerecht, damit die Regensicherheit zu 100% erhalten bleibt.'
        },
        {
          title: 'Statik Check',
          icon: <Ruler className="text-primary-600" />,
          content: 'Eine Solaranlage wiegt hunderte Kilo. Wir prüfen vorab, ob Ihr Dachstuhl das trägt. Als Dachdecker erkennen wir morsche Balken sofort – bevor die teure Anlage draufgeschraubt wird.'
        }
      ],
      process: [
        { step: 1, title: "Dach-Check & Planung", text: "Prüfung der Ziegel und Statik. Berechnung der möglichen Modulanzahl." },
        { step: 2, title: "Gerüststellung", text: "Arbeitssicherheit für die Montage." },
        { step: 3, title: "Montage Unterkonstruktion", text: "Fachgerechtes Setzen der Dachhaken und Schienen." },
        { step: 4, title: "Modulmontage", text: "Verkabelung und Befestigung der Module." },
        { step: 5, title: "Anschluss", text: "Der elektrische Anschluss erfolgt durch unseren Partner-Elektriker." }
      ],
      references: [
        "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1624397640148-949b1732bb0a?q=80&w=600&auto=format&fit=crop"
      ],
      contacts: [team.marcus, team.sascha],
      faq: [
        { q: 'Lohnt sich ein Speicher?', a: 'Ja, um den Eigenverbrauch zu erhöhen (Strom abends nutzen).' },
        { q: 'Kann ich Solar auf ein altes Dach bauen?', a: 'Nur wenn das Dach noch 20 Jahre hält. Sonst sanieren wir vorher – das spart Gerüstkosten.' }
      ]
    }
  };

  const content = data[serviceId] || data.steildach;

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="animate-fade-in bg-white">
      {/* Hero Header */}
      <div className="relative h-[60vh] min-h-[500px]">
        <img src={content.img} className="w-full h-full object-cover" alt={content.title} />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-slate-900/50 to-slate-900/90 flex flex-col justify-center items-center text-white text-center px-4">
          <span className="text-primary-400 font-bold uppercase tracking-widest text-sm mb-4 bg-slate-900/80 px-4 py-2 rounded-sm backdrop-blur-md border border-white/10">
            {content.subtitle}
          </span>
          <h1 className="text-5xl md:text-7xl font-slab font-bold mb-6 drop-shadow-lg">{content.title}</h1>
        </div>
        <button 
          onClick={() => setCurrentPage(Page.SERVICES)}
          className="absolute top-8 left-8 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white px-5 py-2.5 rounded-sm flex items-center gap-2 transition-colors font-medium border border-white/20"
        >
          <ArrowLeft size={18} /> Zur Übersicht
        </button>
      </div>

      <div className="container mx-auto px-4 py-24">
        <div className="grid lg:grid-cols-12 gap-16">
          
          {/* Main Content Area */}
          <div className="lg:col-span-8">
            
            {/* Intro & Expert Tip */}
            <h2 className="text-3xl font-slab font-bold text-slate-900 mb-6">Worum es wirklich geht.</h2>
            <p className="text-xl text-slate-600 leading-relaxed mb-8">
              {content.intro}
            </p>
            {content.expertTip && (
              <div className="bg-primary-50 border-l-4 border-primary-600 p-6 rounded-r-sm mb-12 flex gap-4">
                 <Info className="text-primary-600 shrink-0 mt-1" />
                 <div>
                   <span className="font-bold text-primary-800 block mb-1">Experten Tipp:</span>
                   <p className="text-primary-900/80">{content.expertTip}</p>
                 </div>
              </div>
            )}

            {/* Detailed Knowledge Sections */}
            <div className="space-y-12 mb-20">
              {content.sections.map((section: any, idx: number) => (
                <div key={idx} className="flex gap-6 group">
                  <div className="shrink-0 w-12 h-12 bg-white rounded-sm flex items-center justify-center border border-slate-200 shadow-sm group-hover:border-primary-500 transition-colors">
                    {section.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{section.title}</h3>
                    <p className="text-slate-600 leading-relaxed whitespace-pre-line">{section.content}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Process Steps Section */}
            <div className="mb-20">
               <h3 className="text-2xl font-slab font-bold text-slate-900 mb-8">So läuft Ihr Projekt ab</h3>
               <div className="relative border-l-2 border-slate-200 ml-4 space-y-10 pb-4">
                  {content.process?.map((step: any, idx: number) => (
                    <div key={idx} className="relative pl-10">
                       <div className="absolute -left-[21px] top-0 w-10 h-10 bg-white border-4 border-slate-100 rounded-full flex items-center justify-center font-bold text-slate-400 text-sm">
                         {step.step}
                       </div>
                       <h4 className="font-bold text-slate-900 text-lg mb-2">{step.title}</h4>
                       <p className="text-slate-600">{step.text}</p>
                    </div>
                  ))}
               </div>
            </div>

            {/* Project References Gallery */}
            {content.references && content.references.length > 0 && (
               <div className="mb-20">
                  <h3 className="text-2xl font-slab font-bold text-slate-900 mb-8 flex items-center gap-2">
                    <ImageIcon size={24} className="text-primary-600" /> 
                    Ausgewählte Projekte
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {content.references.map((img: string, idx: number) => (
                      <div key={idx} className="rounded-sm overflow-hidden h-64 border border-slate-100 group">
                        <img 
                          src={img} 
                          alt={`Projektbeispiel ${content.title} ${idx + 1}`} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                        />
                      </div>
                    ))}
                  </div>
               </div>
            )}

            {/* Humanized Contact Section */}
            <div className="bg-slate-50 border border-slate-100 rounded-md p-8 mb-20">
               <h3 className="text-2xl font-slab font-bold text-slate-900 mb-6">Ihre Ansprechpartner für {content.title}</h3>
               <p className="text-slate-600 mb-8">Kurze Wege zur richtigen Antwort. Bei uns landen Sie nicht im Callcenter, sondern beim Experten.</p>
               
               <div className="grid md:grid-cols-2 gap-6">
                  {content.contacts?.map((person: any, idx: number) => (
                    <div key={idx} className="bg-white p-6 rounded-sm shadow-sm flex items-start gap-4 border border-slate-100 hover:border-primary-300 transition-colors">
                       <img src={person.img} alt={person.name} className="w-16 h-16 rounded-full object-cover border-2 border-slate-100" />
                       <div>
                          <div className="font-bold text-slate-900">{person.name}</div>
                          <div className="text-xs font-bold text-primary-600 uppercase tracking-wide mb-2">{person.role}</div>
                          <p className="text-sm text-slate-500 mb-4">{person.desc}</p>
                          <div className="flex gap-3">
                             <button className="p-2 bg-slate-100 rounded-full hover:bg-primary-600 hover:text-white transition-colors" title="Anrufen"><Phone size={16}/></button>
                             <button className="p-2 bg-slate-100 rounded-full hover:bg-primary-600 hover:text-white transition-colors" title="E-Mail"><Mail size={16}/></button>
                          </div>
                       </div>
                    </div>
                  ))}
               </div>
            </div>

            {/* FAQ Accordion Section */}
            <div className="border-t border-slate-200 pt-10 mb-12">
              <div className="flex items-center gap-3 mb-8">
                 <HelpCircle className="text-primary-600" size={24} />
                 <h3 className="text-2xl font-slab font-bold text-slate-900">Häufige Kundenfragen</h3>
              </div>
              <div className="divide-y divide-slate-100">
                {content.faq.map((item: any, idx: number) => (
                  <div key={idx} className="py-4">
                    <button 
                      onClick={() => toggleFaq(idx)}
                      className="w-full flex justify-between items-start text-left group focus:outline-none"
                    >
                      <h4 className={`font-bold text-lg pr-4 transition-colors ${openFaq === idx ? 'text-primary-600' : 'text-slate-800 group-hover:text-primary-600'}`}>
                        {item.q}
                      </h4>
                      <span className={`shrink-0 text-slate-400 transition-transform duration-300 ${openFaq === idx ? 'rotate-180 text-primary-600' : ''}`}>
                        <ChevronDown size={24} />
                      </span>
                    </button>
                    <div 
                      className={`grid transition-all duration-300 ease-in-out ${
                        openFaq === idx ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0'
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-sm border-l-2 border-primary-200">
                          {item.a}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Navigation */}
          <div className="lg:col-span-4 space-y-8 sticky top-24 h-fit">
            {/* Quick CTA Box */}
            <div className="bg-slate-900 text-white p-8 rounded-md shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary-600 rounded-full blur-[60px] opacity-20 -mr-10 -mt-10"></div>
              <h3 className="text-xl font-bold mb-4 font-slab relative z-10">Wir schauen uns das an.</h3>
              <p className="text-slate-300 mb-8 text-sm relative z-10 leading-relaxed">
                Jedes Dach ist anders. Vereinbaren Sie einen unverbindlichen Termin vor Ort.
              </p>
              <button 
                onClick={() => setCurrentPage(Page.CONTACT)}
                className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-4 rounded-sm transition-all flex items-center justify-center gap-2 mb-4 shadow-lg shadow-primary-600/30"
              >
                Termin anfragen <ArrowRight size={18} />
              </button>
            </div>

            {/* Other Services Nav */}
            <div className="bg-white p-6 rounded-md border border-slate-200 shadow-sm">
               <h4 className="font-bold text-slate-900 mb-4 border-b border-slate-100 pb-2">Weitere Leistungen</h4>
               <ul className="space-y-1">
                 {['steildach', 'flachdach', 'solar', 'fenster', 'sanierung'].filter(id => id !== serviceId).map(id => (
                   <li key={id}>
                     <button 
                      onClick={() => {
                        // In a real app, logic to switch service ID would go here, 
                        // forcing a refresh or navigation.
                        // For this demo, we can just go back to overview or implement direct switch logic in parent
                        setCurrentPage(Page.SERVICES);
                      }}
                      className="text-slate-600 hover:text-primary-600 hover:bg-slate-50 transition-colors capitalize flex items-center justify-between w-full p-3 rounded-sm group text-left"
                    >
                       <span className="font-medium text-sm">{data[id]?.title || id}</span>
                       <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                     </button>
                   </li>
                 ))}
               </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;