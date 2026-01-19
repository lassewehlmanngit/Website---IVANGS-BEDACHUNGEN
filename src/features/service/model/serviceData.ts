import { teamMembersLegacy as teamMembers, TeamMember } from '../../company/model/teamData';

export type ServiceId = 'steildach' | 'flachdach' | 'fenster' | 'sanierung' | 'solar';

export interface ServiceSection {
  title: string;
  icon: string; // Icon name from Lucide
  content: string;
}

export interface ServiceProcessStep {
  step: number;
  title: string;
  text: string;
}

export interface ServiceFAQ {
  q: string;
  a: string;
}

export interface ServiceDetailData {
  id: ServiceId;
  title: string;
  subtitle: string;
  intro: string;
  img: string;
  expertTip: string;
  sections: ServiceSection[];
  process: ServiceProcessStep[];
  references: string[];
  contacts: TeamMember[];
  faq: ServiceFAQ[];
  checkpoints?: string[]; // Added from Home/Services data
  description?: string; // Short description from Home/Services data
}

export const servicesData: Record<ServiceId, ServiceDetailData> = {
  steildach: {
    id: 'steildach',
    title: 'Steildach',
    subtitle: 'Der Charakter Ihres Hauses',
    intro: 'Ein Steildach ist ein komplexes System aus vielen Schichten. Es muss atmen, dämmen und schützen. Wir erklären Ihnen, wie eine fachgerechte Sanierung abläuft und warum wir auf bestimmte Materialien setzen.',
    img: 'https://images.unsplash.com/photo-1632759132036-799d5059d481?q=80&w=2070&auto=format&fit=crop',
    description: 'Ob Schieferarbeiten oder klassische Ziegel: Wir beherrschen traditionelles Handwerk und moderne Technik für Ihr Steildach.',
    checkpoints: [
      "Langlebiger Schutz vor Wind & Wetter",
      "Wertsteigerung Ihrer Immobilie",
      "Energetische Sanierung inklusive"
    ],
    expertTip: "Wussten Sie schon? Ein neues Dach mit Aufsparrendämmung kann Ihre Heizkosten um bis zu 30% senken und wird vom Staat (BAFA) hoch gefördert.",
    sections: [
      {
        title: 'Materialkunde: Die Qual der Wahl',
        icon: 'Hammer',
        content: 'Die Eindeckung bestimmt die Optik und Lebensdauer:\n\n• **Tonziegel:** Das Naturprodukt. Brennt bei über 1000°C, ist farbecht und hält 80+ Jahre. Ideal für klassische Optik.\n• **Betondachstein:** Die wirtschaftliche Lösung. Extrem hart, frostbeständig und mit besserer Ökobilanz in der Herstellung.\n• **Naturschiefer:** Die Königsklasse. Jedes Stück ein Unikat, handwerklich anspruchsvoll verlegt für zeitlose Eleganz.'
      },
      {
        title: 'Bauphysik & Dämmung',
        icon: 'Thermometer',
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
    contacts: [teamMembers.sascha, teamMembers.isabel],
    faq: [
      { q: 'Wie lange dauert eine komplette Sanierung?', a: 'Bei einem Einfamilienhaus rechnen wir wetterabhängig mit ca. 2 Wochen.' },
      { q: 'Kann ich während der Arbeiten im Haus wohnen?', a: 'Ja, absolut. Da wir meist von außen arbeiten, ist die Beeinträchtigung im Wohnraum minimal.' }
    ]
  },
  flachdach: {
    id: 'flachdach',
    title: 'Flachdach',
    subtitle: 'Moderne Architektur & Nutzbarkeit',
    intro: 'Das moderne Flachdach ist ein Hochleistungsbauteil. Vergessen Sie die alten "Teerpappe-Geschichten". Wir arbeiten mit Materialien, die Jahrzehnte halten und neue Lebensräume schaffen.',
    img: 'https://images.unsplash.com/photo-1626292378345-d81230198e3b?q=80&w=2070&auto=format&fit=crop',
    description: 'Ob moderne Abdichtung oder Dachbegrünung: Wir nutzen Hochleistungs-Materialien, die Jahrzehnte halten.',
    checkpoints: [
      "100% Dichtheitsgarantie",
      "Moderne Nutzungskonzepte (Begrünung)",
      "Optimale Raumausnutzung"
    ],
    expertTip: "Ein Flachdach bietet Platz! Nutzen Sie es doppelt: Als Terrasse zum Entspannen oder als Gründach für besseres Klima.",
    sections: [
      {
        title: 'Die Abdichtung: Bitumen oder Kunststoff?',
        icon: 'Layers',
        content: 'Wir beraten objektiv:\n\n• **Bitumen:** Der Klassiker. Zweilagig verschweißt entsteht eine dicke, robuste Schicht. Ideal, wenn das Dach später begehbar sein soll.\n• **Kunststoff (FPO/PVC):** Einlagig, leicht und flexibel. Perfekt für große Hallen oder Leichtbauweisen. Chemisch beständig und langlebig.'
      },
      {
        title: 'Entwässerung ist alles',
        icon: 'CloudRain',
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
    contacts: [teamMembers.sascha, teamMembers.isabel],
    faq: [
      { q: 'Wie oft muss ein Flachdach gewartet werden?', a: 'Wir empfehlen 1x jährlich. Wir reinigen die Abläufe (Laub!) und prüfen die Nähte.' },
      { q: 'Kann ich Kies aufs Dach schütten?', a: 'Kies schützt vor UV-Strahlung, ist aber schwer. Wir müssen vorher die Statik prüfen.' }
    ]
  },
  fenster: {
    id: 'fenster',
    title: 'Fenster & VELUX Partner',
    subtitle: 'Licht, Luft & Lebensqualität',
    intro: 'Warum wir so viel über VELUX sprechen? Weil es für Qualität steht. Ein Dachfenster ist extremen Belastungen ausgesetzt – Hitze, Frost, Schlagregen. Hier sparen wir nicht am Material.',
    img: 'https://images.unsplash.com/photo-1596637508677-03cb29559c5d?q=80&w=2070&auto=format&fit=crop',
    description: 'Als VELUX-geschulter Betrieb bringen wir mehr Licht und Luft in Ihr Dachgeschoss. Fachgerecht eingebaut durch qualifizierte Mitarbeiter.',
    checkpoints: [
      "Helle Wohnräume und gesundes Klima",
      "Schneller Austausch ohne viel Dreck",
      "Effektiver Hitzeschutz"
    ],
    expertTip: "Tauschen Sie alt gegen neu an einem Tag. Mit speziellen Renovierungsrahmen geht das oft ohne Dreck im Innenraum.",
    sections: [
      {
        title: 'Was heißt "Geschulter Betrieb"?',
        icon: 'CheckCircle2',
        content: 'Jeder kann ein Fenster kaufen. Aber der Einbau entscheidet über Dichtigkeit und Schimmelbildung. Wir sind von VELUX geschult, den **BDX-Dämmrahmen** und die **BFX-Anschlussschürze** korrekt zu verbauen. Das garantiert, dass der Anschluss ans Dach winddicht und gedämmt ist. Zudem erhalten Sie so die volle Herstellergarantie.'
      },
      {
        title: 'Mehr als nur Glas',
        icon: 'Sun',
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
    contacts: [teamMembers.sabine, teamMembers.sascha],
    faq: [
      { q: 'Holz oder Kunststoff?', a: 'Im Bad immer Kunststoff (feuchtraumgeeignet). Im Wohnraum wirkt Holz gemütlicher. VELUX bietet beides.' },
      { q: 'Lohnt sich 3-fach Verglasung?', a: 'Ja! Sie dämmt besser und reduziert Regengeräusche massiv ("Anti-Regen-Geräusch-Effekt").' }
    ]
  },
  sanierung: {
    id: 'sanierung',
    title: 'Sanierung & Reparatur',
    subtitle: 'Werterhalt statt Totalschaden',
    intro: 'Kleine Schäden werden schnell groß. Ein loser Ziegel, eine undichte Rinne – Wasser sucht sich seinen Weg. Wir kümmern uns um den Werterhalt Ihrer Immobilie.',
    img: 'https://images.unsplash.com/photo-1555699847-f41e54911049?q=80&w=2070&auto=format&fit=crop',
    description: 'Vom Altbau bis zum Balkon: Wir stellen den Wert Ihrer Immobilie materialgetreu wieder her.',
    checkpoints: [
      "Materialgetreue Wiederherstellung",
      "Energetische Optimierung",
      "Fassadenbekleidung vom Fachmann"
    ],
    expertTip: "Warten Sie nicht auf den Sturm. Ein Wartungsvertrag ist wie der TÜV fürs Auto – und oft günstiger als ein Wasserschaden.",
    sections: [
      {
        title: 'Reparatur vs. Sanierung',
        icon: 'ShieldCheck',
        content: 'Wir verkaufen Ihnen kein neues Dach, wenn eine Reparatur reicht. Wir prüfen den Zustand der Substanz ehrlich. Sind >30% der Fläche betroffen oder die Dämmung nass, planen wir eine Sanierung. Bei Sturmschäden oder Verschleißteilen reparieren wir punktuell.'
      },
      {
        title: 'Wartungsservice',
        icon: 'Calendar',
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
    contacts: [teamMembers.sabine, teamMembers.isabel],
    faq: [
      { q: 'Was kostet eine Rinnenreinigung?', a: 'Das hängt von der Länge und Höhe ab. Rufen Sie Sabine Hammes an, sie gibt Ihnen einen Richtwert.' },
      { q: 'Helfen Sie bei Versicherungsschäden?', a: 'Ja, wir erstellen die nötigen Fotos und Berichte für Ihre Wohngebäudeversicherung.' }
    ]
  },
  solar: {
    id: 'solar',
    title: 'Solar & Photovoltaik',
    subtitle: 'Warum der Dachdecker die bessere Wahl ist',
    intro: 'Photovoltaik boomt. Aber Vorsicht: Die meisten Anlagen werden von Elektrikern montiert, die die Dachhaut nicht kennen. Wir garantieren Ihnen: Strom fließt, Wasser bleibt draußen.',
    img: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=2070&auto=format&fit=crop',
    description: 'Machen Sie Ihr Dach zum Kraftwerk. Wir montieren Auf-Dach-Solar-Anlagen fachgerecht und sicher – alles aus einer Hand.',
    checkpoints: [
      "Stromkosten senken & unabhängig werden",
      "Sichere Montage ohne Dachschäden",
      "Komplettservice vom Meisterbetrieb"
    ],
    expertTip: "Lassen Sie keine Laien an Ihr Dach. Ein durchgebohrter Ziegel kann Jahre später zu morschen Balken führen.",
    sections: [
      {
        title: 'Das Problem mit den Dachhaken',
        icon: 'Info',
        content: 'Um Solarmodule zu befestigen, müssen Haken unter die Ziegel. Viele Anbieter "flexen" die Ziegel einfach aus. Die Folge: Bruchgefahr bei Schneelast. Wir nutzen **spezielle Metalldachplatten** oder bearbeiten die Ziegel fachgerecht, damit die Regensicherheit zu 100% erhalten bleibt.'
      },
      {
        title: 'Statik Check',
        icon: 'Ruler',
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
    contacts: [teamMembers.marcus, teamMembers.sascha],
    faq: [
      { q: 'Lohnt sich ein Speicher?', a: 'Ja, um den Eigenverbrauch zu erhöhen (Strom abends nutzen).' },
      { q: 'Kann ich Solar auf ein altes Dach bauen?', a: 'Nur wenn das Dach noch 20 Jahre hält. Sonst sanieren wir vorher – das spart Gerüstkosten.' }
    ]
  }
};
