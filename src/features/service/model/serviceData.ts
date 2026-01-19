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
      { q: 'Was kostet eine Steildachsanierung im Kreis Viersen?', a: 'Die Kosten für eine Steildachsanierung variieren je nach Dachfläche, Material und Dämmung. Bei einem durchschnittlichen Einfamilienhaus (ca. 100-150 m²) können Sie mit 15.000 bis 35.000 Euro rechnen. Wir erstellen Ihnen gerne ein kostenloses, detailliertes Festpreis-Angebot.' },
      { q: 'Wie lange dauert eine komplette Dachsanierung?', a: 'Bei einem Einfamilienhaus rechnen wir wetterabhängig mit ca. 2 Wochen Bauzeit. Ein Reihenhaus dauert etwa 1 Woche, größere Objekte entsprechend länger. Wir planen Pufferzeiten für Schlechtwetter ein und halten Sie stets auf dem Laufenden.' },
      { q: 'Kann ich während der Dacharbeiten im Haus wohnen?', a: 'Ja, absolut. Da wir ausschließlich von außen arbeiten, ist die Beeinträchtigung im Wohnraum minimal. Sie müssen lediglich mit Geräuschen durch Abbruch und Montage rechnen. Bei Dachfenstertausch wird kurzzeitig von innen gearbeitet.' },
      { q: 'Welche Dachziegel sind die besten?', a: 'Das hängt von Ihren Prioritäten ab: Tonziegel sind das langlebigste Naturprodukt (80+ Jahre), Betondachsteine sind wirtschaftlich und robust, Naturschiefer ist die Premium-Lösung für zeitlose Eleganz. Wir beraten Sie objektiv basierend auf Ihrem Budget und der Architektur.' },
      { q: 'Wird eine Dachsanierung gefördert?', a: 'Ja! Bei energetischer Sanierung mit Dämmung können Sie BAFA-Förderung (bis zu 20% der Kosten) oder KfW-Kredite mit Tilgungszuschuss beantragen. Wir unterstützen Sie bei der Antragstellung und kennen die Anforderungen für förderfähige Maßnahmen.' },
      { q: 'Brauche ich eine Baugenehmigung für die Dachsanierung?', a: 'Eine reine Sanierung (gleiche Dachform, gleiches Material) ist in NRW genehmigungsfrei. Bei Änderungen der Dachneigung, Gauben oder Dachaufbauten benötigen Sie eine Genehmigung. Wir prüfen das vorab für Sie und koordinieren bei Bedarf mit dem Bauamt.' },
      { q: 'Wie erkenne ich, dass mein Dach saniert werden muss?', a: 'Warnsignale sind: poröse oder verrutschte Ziegel, Feuchtigkeit auf dem Dachboden, sichtbare Risse, Moos- und Algenbefall oder eine Dämmung älter als 30 Jahre. Wir bieten eine kostenlose Dachinspektion an und beraten ehrlich, ob Reparatur oder Sanierung sinnvoll ist.' },
      { q: 'Welche Dämmung empfehlen Sie für Steildächer?', a: 'Wir setzen auf Aufsparrendämmung mit PU-Hartschaum (beste Dämmwerte, dünn) oder Holzfaser (ökologisch, guter Hitzeschutz im Sommer). Zwischensparrendämmung ist günstiger, aber weniger effektiv. Die Wahl hängt von Ihrem Budget und Ihren Werten ab.' },
      { q: 'Arbeiten Sie auch bei Regen?', a: 'Starkregen stoppt die Arbeiten aus Sicherheitsgründen. Bei leichtem Regen können wir mit Notabdeckungen weiterarbeiten. Sobald die Dämmung montiert ist, ist Ihr Haus wieder vollständig wetterfest. Wir planen Wetterpuffer ein und informieren Sie proaktiv.' }
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
      { q: 'Was kostet eine Flachdachabdichtung pro m²?', a: 'Eine professionelle Flachdachabdichtung kostet zwischen 80 und 150 Euro pro m², abhängig vom System (Bitumen oder Kunststoff), der Dämmstärke und Zugänglichkeit. Dachbegrünung erhöht die Kosten auf 120-200 Euro/m². Wir kalkulieren transparent und bieten Festpreise an.' },
      { q: 'Wie lange hält ein Flachdach?', a: 'Ein fachgerecht abgedichtetes Flachdach hält 25-40 Jahre. Bitumenbahnen halten etwa 25-30 Jahre, moderne Kunststoffbahnen (FPO/PVC) erreichen 30-40 Jahre. Entscheidend ist die regelmäßige Wartung – damit verlängern Sie die Lebensdauer erheblich.' },
      { q: 'Wie oft muss ein Flachdach gewartet werden?', a: 'Wir empfehlen eine professionelle Wartung einmal jährlich, idealerweise im Herbst. Dabei reinigen wir die Abläufe von Laub und Schmutz, prüfen Nähte und Anschlüsse und dokumentieren den Zustand. Das kostet etwa 200-400 Euro und verhindert teure Folgeschäden.' },
      { q: 'Kann ich mein Flachdach begrünen?', a: 'Ja, Dachbegrünung ist eine hervorragende Lösung! Sie schützt die Abdichtung vor UV-Strahlung, verbessert das Raumklima und bindet Regenwasser. Wichtig ist die Statikprüfung (Zusatzlast ca. 60-150 kg/m²). Wir planen und bauen extensive und intensive Begrünungen.' },
      { q: 'Ist ein Flachdach als Terrasse nutzbar?', a: 'Absolut! Wir planen begehbare Flachdächer mit entsprechender Abdichtung und Entwässerung. Sie können Terrassenplatten, Kies oder Holzdielen verlegen. Die Statik muss die Nutzlast tragen, und die Abdichtung muss durchtrittsicher sein – beides planen wir für Sie.' },
      { q: 'Warum ist mein Flachdach undicht?', a: 'Häufigste Ursachen sind verstopfte Abläufe (Wasser staut sich), gerissene Nähte durch Alterung, mechanische Beschädigungen oder fehlerhafte Anschlüsse an Wände/Lichtkuppeln. Wir finden die Leckage mit Thermografie oder Rauchprüfung und reparieren gezielt.' },
      { q: 'Bitumen oder Kunststoff – was ist besser?', a: 'Bitumen ist robust, schwer und ideal für begehbare Dächer. Kunststoff (FPO/PVC) ist leicht, flexibel und chemisch beständig – perfekt für große Flächen und Leichtbau. Beide Systeme sind langlebig. Wir beraten objektiv basierend auf Ihrem Objekt und Nutzung.' },
      { q: 'Braucht ein Flachdach ein Gefälle?', a: 'Ja, mindestens 2% Gefälle sind Pflicht! Nur so fließt Regenwasser zuverlässig ab. Wir erzeugen das Gefälle durch Gefälledämmung – das spart Bauhöhe und verbessert die Dämmleistung. Stehendes Wasser ist der Feind jeder Abdichtung.' },
      { q: 'Kann ich ein altes Flachdach überdachen statt es zu erneuern?', a: 'Ja, wenn die alte Abdichtung noch intakt ist, können wir eine neue Lage aufschweißen (Aufdoppelung). Das spart Entsorgungskosten. Ist die Dämmung aber durchfeuchtet oder die Statik überlastet, empfehlen wir einen Komplettabriss und Neuaufbau.' }
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
      { q: 'Was kostet ein VELUX Dachfenster mit Einbau?', a: 'Ein Standard-VELUX Schwingfenster (78x118 cm) kostet komplett eingebaut etwa 1.200-1.800 Euro, abhängig von Verglasung und Zubehör. Größere Fenster oder Klapp-Schwing-Varianten kosten entsprechend mehr. Der Einbau dauert etwa 3-4 Stunden pro Fenster.' },
      { q: 'Kann man alte Dachfenster einfach austauschen?', a: 'Ja! Mit VELUX-Renovierungsrahmen geht der Austausch oft in 2-3 Stunden ohne Dreck im Innenraum. Der alte Rahmen bleibt als Basis, das neue Fenster wird eingesetzt. Das spart Zeit und Kosten. Wir prüfen vorab, ob Ihr altes Fenster dafür geeignet ist.' },
      { q: 'Welches Material ist besser: Holz oder Kunststoff?', a: 'Im Bad und Feuchträumen empfehlen wir immer Kunststoff (wartungsfrei, feuchtigkeitsresistent). Im Wohnbereich wirkt Holz wärmer und natürlicher. VELUX bietet beide Varianten in gleicher Qualität. Preislich liegen sie etwa gleichauf.' },
      { q: 'Lohnt sich 3-fach Verglasung bei Dachfenstern?', a: 'Absolut! 3-fach Verglasung dämmt deutlich besser (U-Wert 0,5 statt 1,1), reduziert Regengeräusche erheblich und verhindert Kondenswasser. Der Aufpreis von ca. 150 Euro amortisiert sich durch Energieeinsparung und höheren Wohnkomfort.' },
      { q: 'Wie schütze ich mein Dachfenster vor Hitze im Sommer?', a: 'Außenrollläden oder Markisen sind am effektivsten – sie halten bis zu 95% der Hitze draußen. Innenliegende Verdunkelungsrollos helfen gegen Licht, aber kaum gegen Hitze. Wir montieren elektrische Rollläden, die per App oder Zeitschaltuhr gesteuert werden können.' },
      { q: 'Brauche ich eine Baugenehmigung für ein neues Dachfenster?', a: 'In NRW sind Dachfenster in bestehende Dächer meist genehmigungsfrei, solange sie nicht zur Straßenseite zeigen und die Dachform unverändert bleibt. Bei Denkmalschutz oder in speziellen Baugebieten gelten Sonderregeln. Wir klären das vorab für Sie.' },
      { q: 'Kann man Dachfenster nachträglich elektrisch nachrüsten?', a: 'Ja, VELUX bietet Nachrüst-Motoren für bestehende Fenster an. Auch Rollläden, Jalousien und Hitzeschutz können elektrisch und smart gesteuert werden. Die Steuerung erfolgt per Fernbedienung, App oder Sprachassistent (Alexa, Google Home).' },
      { q: 'Wie verhindere ich Kondenswasser am Dachfenster?', a: 'Kondenswasser entsteht durch hohe Luftfeuchtigkeit (Kochen, Duschen) und kalte Scheiben. Lösungen: Regelmäßiges Stoßlüften, 3-fach Verglasung (wärmere Innenscheibe), Lüftungsklappen am Fenster. Wir bauen optional elektrische Lüftungsklappen ein, die automatisch bei hoher Luftfeuchte öffnen.' },
      { q: 'Wie lange hält ein VELUX Dachfenster?', a: 'VELUX gibt 10 Jahre Garantie, aber ein Dachfenster hält bei guter Pflege 30-40 Jahre. Wichtig ist regelmäßige Reinigung der Dichtungen und Scharniere. Holzfenster sollten alle 5-7 Jahre nachgestrichen werden. Wir bieten auch Wartungsservice an.' }
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
      { q: 'Was kostet eine Dachreparatur im Kreis Viersen?', a: 'Kleine Reparaturen (einzelne Ziegel, Dichtungen) kosten etwa 200-500 Euro. Größere Arbeiten wie Rinnenerneuerung oder Flachdachabdichtung liegen bei 1.000-5.000 Euro. Sturmschäden rechnen wir oft direkt mit Ihrer Versicherung ab. Wir erstellen kostenlose Kostenvoranschläge.' },
      { q: 'Wie schnell können Sie bei einem Notfall kommen?', a: 'Bei akuten Schadensfällen (Sturmschaden, Wassereintritt) sind wir innerhalb von 24 Stunden vor Ort und sichern das Dach provisorisch ab. Für reguläre Reparaturen bieten wir Termine innerhalb einer Woche. Rufen Sie uns an: 02162 356666.' },
      { q: 'Was kostet eine Rinnenreinigung?', a: 'Eine Rinnenreinigung kostet pauschal etwa 150-300 Euro für ein Einfamilienhaus, abhängig von Länge und Höhe. Bei stark verschmutzten oder schwer zugänglichen Rinnen kann es mehr werden. Wir bieten auch Wartungsverträge mit jährlicher Rinnenreinigung an.' },
      { q: 'Helfen Sie bei Versicherungsschäden?', a: 'Ja, wir sind erfahren im Umgang mit Versicherungen. Wir dokumentieren den Schaden mit Fotos, erstellen detaillierte Gutachten und rechnen auf Wunsch direkt mit Ihrer Wohngebäudeversicherung ab. Das spart Ihnen Aufwand und beschleunigt die Schadenregulierung.' },
      { q: 'Lohnt sich ein Wartungsvertrag fürs Dach?', a: 'Absolut! Ein Wartungsvertrag kostet etwa 200-400 Euro jährlich und beinhaltet Rinnenreinigung, Sichtprüfung und Protokoll. Damit verhindern Sie teure Folgeschäden und haben ein gutes Gefühl. Viele Versicherungen gewähren Rabatte bei regelmäßiger Wartung.' },
      { q: 'Können Sie auch historische Dächer sanieren?', a: 'Ja, wir haben Erfahrung mit denkmalgeschützten Gebäuden und historischen Baustoffen. Wir arbeiten mit Naturschiefer, historischen Ziegeln und traditionellen Techniken. Bei Bedarf koordinieren wir mit der Denkmalbehörde und beraten zu förderfähigen Maßnahmen.' },
      { q: 'Was ist der Unterschied zwischen Reparatur und Sanierung?', a: 'Reparatur bedeutet punktuellen Austausch defekter Teile (Ziegel, Rinnen, Abdichtung). Sanierung ist die Erneuerung größerer Bereiche oder des gesamten Daches inkl. Dämmung. Faustregel: Sind mehr als 30% der Fläche betroffen, lohnt sich eine Komplettsanierung.' },
      { q: 'Wie erkenne ich einen Sturmschaden am Dach?', a: 'Typische Anzeichen: fehlende oder verschobene Ziegel, abgerissene Dachrinnen, gelöste Bleche oder Eindringen von Wasser. Nach Unwettern empfehlen wir eine Sichtprüfung. Melden Sie Schäden sofort der Versicherung – wir unterstützen Sie bei der Dokumentation.' },
      { q: 'Übernehmen Sie auch Fassadenarbeiten?', a: 'Ja, als Fachbetrieb für Außenhülle machen wir auch Fassadenverkleidungen mit Schiefer, Metall oder Faserzement. Das passt perfekt zur Dacharbeit – so haben Sie einen Ansprechpartner für die komplette Gebäudehülle und einheitliche Optik.' }
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
      { q: 'Was kostet eine Solaranlage mit Montage?', a: 'Eine Photovoltaik-Anlage für ein Einfamilienhaus (6-10 kWp, ca. 15-25 Module) kostet komplett installiert zwischen 12.000 und 20.000 Euro. Das beinhaltet Module, Wechselrichter, Montagesystem und fachgerechten Einbau durch uns. Mit Speicher (5-10 kWh) kommen 6.000-12.000 Euro hinzu.' },
      { q: 'Warum sollte ein Dachdecker die Solaranlage montieren?', a: 'Weil wir die Dachhaut kennen und schützen! Viele Elektriker bohren Ziegel an oder beschädigen die Abdichtung – mit teuren Folgeschäden. Wir setzen Dachhaken fachgerecht, verwenden Metalldachplatten wo nötig und garantieren: Strom fließt, Wasser bleibt draußen.' },
      { q: 'Lohnt sich ein Stromspeicher?', a: 'Ja, wenn Sie Ihren Eigenverbrauch maximieren wollen. Ohne Speicher nutzen Sie ca. 30% des Solarstroms selbst, mit Speicher bis zu 70%. Ein Speicher kostet etwa 6.000-12.000 Euro und amortisiert sich durch eingesparte Stromkosten in 10-15 Jahren. Wir rechnen das individuell für Sie durch.' },
      { q: 'Kann ich Solar auf ein altes Dach montieren?', a: 'Nur wenn das Dach noch mindestens 20 Jahre hält – eine Solaranlage hat diese Lebensdauer. Sonst sanieren wir das Dach vorher, was sogar günstiger ist, da wir das Gerüst nur einmal aufbauen. Wir prüfen den Dachzustand kostenlos und beraten ehrlich.' },
      { q: 'Trägt mein Dach das Gewicht einer Solaranlage?', a: 'Eine PV-Anlage wiegt etwa 15-20 kg pro m² – die meisten Dächer halten das problemlos. Wir prüfen vorab die Statik und erkennen als Dachdecker morsche Balken oder Schwachstellen sofort. Bei Bedarf verstärken wir die Konstruktion, bevor wir montieren.' },
      { q: 'Wie lange dauert die Montage einer Solaranlage?', a: 'Bei einem Einfamilienhaus dauert die reine Montage 2-3 Tage: Tag 1 Gerüst und Dachhaken, Tag 2 Schienen und Module, Tag 3 elektrischer Anschluss (mit Partner-Elektriker). Nach 1-2 Wochen kommt der Netzbetreiber für die Zählermontage und Netzfreischaltung.' },
      { q: 'Gibt es Förderung für Photovoltaik?', a: 'Ja! Die Einspeisevergütung läuft 20 Jahre (aktuell ca. 8-13 Cent/kWh je nach Anlagengröße). Zudem gibt es zinsgünstige KfW-Kredite und regionale Förderprogramme. Seit 2023 entfällt die Mehrwertsteuer bei PV-Anlagen. Wir beraten Sie zu allen Fördermöglichkeiten.' },
      { q: 'Muss ich die Solaranlage warten?', a: 'PV-Anlagen sind wartungsarm. Wir empfehlen alle 3-5 Jahre eine Sichtprüfung und Reinigung der Module (Verschmutzung reduziert Ertrag um 5-10%). Die Überprüfung der elektrischen Anlage sollte alle 4 Jahre erfolgen. Wir bieten Wartungsverträge ab 150 Euro/Jahr an.' },
      { q: 'Was passiert bei Schnee und Sturm?', a: 'Module sind für Schneelasten bis 5.400 Pa (ca. 50 cm Schnee) und Windlasten bis 2.400 Pa ausgelegt. Unsere Montage ist TÜV-geprüft und hält Orkanen stand. Schnee rutscht von geneigten Modulen meist von selbst ab. Bei extremen Wetterlagen prüfen wir die Anlage kostenfrei.' },
      { q: 'Kann ich mit Solar autark werden?', a: 'Vollständig autark ist in Deutschland schwierig – im Winter reicht die Sonne nicht. Mit großzügiger Anlage (10+ kWp) und Speicher (10+ kWh) erreichen Sie etwa 70-80% Autarkie übers Jahr. Für 100% bräuchten Sie riesige Speicher, was wirtschaftlich nicht sinnvoll ist. Wir planen Ihre optimale Eigenverbrauchsquote.' }
    ]
  }
};
