import { teamMembersLegacy as teamMembers, TeamMember } from '../../company/model/teamData';

export type ServiceId = 'steildach' | 'flachdach' | 'fenster' | 'sanierung' | 'reparatur' | 'brandschaden';

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
    img: '/uploads/ivangs-steildach_Ziegeldach mit Gaubenbekleidung in Zinkstehfalz.avif',
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
      "/uploads/ivangs-steildach_Ziegeldach mit Gaubenbekleidung in Zinkstehfalz.avif",
      "/uploads/ivangs_steildach_Ziegeldach mit Kamin- und Gaubenverschieferung.avif",
      "/uploads/ivangs_steildach_Ziegeldach mit Kamin- und Gaubenverschieferung_2.avif",
      "/uploads/ivangs_steildach_Ziegeldach mit Klempnerarbeiten aus Zinkscharen.avif"
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
    subtitle: 'Lösung für Industrie & Gewerbe',
    intro: 'Gerade im Industriebau ist das Dach kapitalentscheidend. Wir sanieren große Hallendächer energetisch effizient und dauerhaft dicht. Mit Systemen, die den Betrieb nicht stören.',
    img: '/uploads/ivangs_flachdach_Flachdach mit Dachbegrünung_2.avif',
    description: 'Spezialisiert auf Industriehallen und Großprojekte. Langlebige Abdichtungssysteme für Ihr Gewerbe.',
    checkpoints: [
      "Industriestandards & Großflächen",
      "Energetische Sanierung bei laufendem Betrieb",
      "Wirtschaftliche Lösungen"
    ],
    expertTip: "Bei Industriehallen rechnet sich eine Sanierung oft doppelt: Durch massive Heizkostenersparnis und staatliche Förderung.",
    sections: [
      {
        title: 'Die Abdichtung: Bitumen oder Kunststoff?',
        icon: 'Layers',
        content: 'Wir beraten objektiv für Ihr Projekt:\n\n• **Kunststoff (FPO/PVC):** Die erste Wahl für Industriehallen. Einlagig, leicht, schnell zu verlegen und mechanisch hoch belastbar. Ideal für große Spannweiten.\n• **Bitumen:** Der robuste Klassiker für begehbare Flächen oder Parkdecks. Zweilagig für höchste Sicherheit.'
      },
      {
        title: 'Entwässerung & Gefälle',
        icon: 'CloudRain',
        content: 'Bei großen Flächen ist stehendes Wasser ein Risiko. Wir planen Gefälledämmungen und leistungsstarke Entwässerungssysteme (Freispiegel oder Unterdruck), die auch Starkregen sicher ableiten.'
      }
    ],
    process: [
      { step: 1, title: "Bestandsaufnahme", text: "Drohnenanalyse und Kernbohrungen zur Prüfung des Schichtenpakets." },
      { step: 2, title: "Konzept & Angebot", text: "Wir erstellen ein Sanierungskonzept unter Berücksichtigung der EnEV und Statik." },
      { step: 3, title: "Sicherung & Vorbereitung", text: "Absturzsicherungen und Einrichtung der Baustelle." },
      { step: 4, title: "Ausführung", text: "Segmentweise Sanierung, damit die Halle stets wettergeschützt bleibt." }
    ],
    references: [
      "/uploads/ivangs_flachdach_Flachdach mit Dachbegrünung_1.avif",
      "/uploads/ivangs_flachdach_Flachdach mit Dachbegrünung_2.avif",
      "/uploads/ivangs_flachdach_Flachdach mit Dachbegrünung_3.avif"
    ],
    contacts: [teamMembers.sascha, teamMembers.isabel],
    faq: [
      { q: 'Was kostet eine Flachdachsanierung für Industriehallen?', a: 'Das hängt stark von Größe, Dämmstandard und gewähltem Material ab. Bei Hallendächern kalkulieren wir oft mit Quadratmeterpreisen, die bei großen Flächen wirtschaftlicher sind. Gerne erstellen wir ein individuelles Angebot nach Besichtigung.' },
      { q: 'Kann der Betrieb während der Sanierung weiterlaufen?', a: 'Ja. Wir arbeiten so, dass Ihr Betrieb möglichst wenig gestört wird. Lärmintensive Arbeiten stimmen wir ab, und die Dichtigkeit ist zu jedem Zeitpunkt gewährleistet.' },
      { q: 'Welche Dämmung eignet sich für Hallen?', a: 'Oft kommen Mineralwolle (Brandschutz!) oder PIR-Hartschaum zum Einsatz. Wir beraten Sie zu Brandschutzvorgaben und energetischen Anforderungen.' },
      { q: 'Wie lange hält eine neue Abdichtung?', a: 'Moderne Kunststoffbahnen halten bei fachgerechter Verlegung und Wartung 30-40 Jahre, Bitumenbahnen ca. 25-30 Jahre.' },
      { q: 'Bieten Sie auch regelmäßige Wartung für Hallendächer an?', a: 'Ja, das ist essentiell. Wir bieten Wartungsverträge an, die jährliche Inspektionen und Rinnenreinigungen beinhalten, um die Lebensdauer des Daches zu maximieren und Versicherungsschutz zu gewährleisten.' }
    ]
  },
  fenster: {
    id: 'fenster',
    title: 'Fenster & VELUX Partner',
    subtitle: 'Licht, Luft & Lebensqualität',
    intro: 'Warum wir so viel über VELUX sprechen? Weil es für Qualität steht. Ein Dachfenster ist extremen Belastungen ausgesetzt – Hitze, Frost, Schlagregen. Hier sparen wir nicht am Material.',
    img: '/uploads/ivangs_fenster_Ziegeldach im Denkmalschutz mit Dachfenster-Anlage.avif',
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
      "/uploads/ivangs_fenster_Ziegeldach im Denkmalschutz mit Dachfenster-Anlage.avif",
      "/uploads/ivangs-arbeiter-fenstertausch.avif"
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
    title: 'Sanierung',
    subtitle: 'Werterhalt & Modernisierung',
    intro: 'Bei einer Dachsanierung geht es um mehr als nur Dichtigkeit. Es geht um Energieeffizienz, Wohnkomfort und den langfristigen Erhalt Ihrer Immobilie. Wir machen Ihr Dach fit für die Zukunft.',
    img: '/uploads/ivangs-dach-sanierung.avif',
    description: 'Komplettsanierung nach neuesten energetischen Standards. Alles aus einer Hand für Ihre Immobilie.',
    checkpoints: [
      "Energetische Optimierung (KfW/BAFA)",
      "Wertsteigerung der Immobilie",
      "Nachhaltige Materialien"
    ],
    expertTip: "Eine energetische Sanierung ist der beste Inflationsschutz. Sie investieren in Ihr Eigentum und senken dauerhaft Ihre laufenden Kosten.",
    sections: [
      {
        title: 'Mehr als nur neue Ziegel',
        icon: 'ShieldCheck',
        content: 'Eine Sanierung umfasst den kompletten Dachaufbau: Von der Dampfbremse über die Dämmung bis zur Eindeckung. Wir prüfen auch den Dachstuhl auf Tragfähigkeit und Schädlinge.'
      },
      {
        title: 'Investition, die sich lohnt',
        icon: 'Calendar',
        content: 'Durch moderne Dämmung sparen Sie nicht nur Heizkosten. Sie verbessern auch das Wohnklima im Sommer (Hitzeschutz) und steigern den Wiederverkaufswert Ihres Hauses massiv.'
      }
    ],
    process: [
      { step: 1, title: "Analyse", text: "Ausführliche Bestandsaufnahme und Prüfung der Bausubstanz." },
      { step: 2, title: "Planung & Förderung", text: "Wir erstellen ein Sanierungskonzept und beraten zu Fördermitteln." },
      { step: 3, title: "Umsetzung", text: "Fachgerechte Ausführung aller Arbeiten aus einer Hand." },
      { step: 4, title: "Abnahme", text: "Gemeinsame Begehung und Übergabe des sanierten Daches." }
    ],
    references: [
      "/uploads/ivangs-dach-sanierung.avif",
      "/uploads/ivangs-steildach_Ziegeldach mit Gaubenbekleidung in Zinkstehfalz.avif"
    ],
    contacts: [teamMembers.sabine, teamMembers.isabel],
    faq: [
      { q: 'Lohnt sich eine Sanierung oder reicht eine Reparatur?', a: 'Das hängt vom Gesamtzustand ab. Wenn die Bausubstanz gut ist, reicht oft eine Reparatur. Ist die Dämmung alt oder feucht, spart eine Sanierung langfristig viel Geld.' },
      { q: 'Wie lange dauert eine Dachsanierung?', a: 'Etwa 2-3 Wochen bei einem Einfamilienhaus, stark wetterabhängig.' },
      { q: 'Bekomme ich Förderung?', a: 'Ja, für energetische Maßnahmen gibt es attraktive Zuschüsse. Wir beraten Sie gerne.' }
    ]
  },
  reparatur: {
    id: 'reparatur',
    title: 'Reparatur & Service',
    subtitle: 'Schnelle Hilfe & Wartung',
    intro: 'Ein kleiner Schaden kann schnell teuer werden. Wasser sucht sich seinen Weg. Wir reparieren schnell, unkompliziert und nachhaltig – damit aus Kleinigkeiten keine Großbaustellen werden.',
    img: '/images/services/reparatur-service.jpg',
    description: 'Sturmschaden? Undichtes Fenster? Lose Ziegel? Wir kümmern uns sofort um den Werterhalt.',
    checkpoints: [
      "Schnelle Reaktionszeiten",
      "Reparatur aller Dacharten",
      "Wartungsservice"
    ],
    expertTip: "Warten Sie nicht auf den Sturm. Ein Wartungsvertrag ist wie der TÜV fürs Auto – und oft günstiger als ein Wasserschaden.",
    sections: [
      {
        title: 'Reparatur vor Austausch',
        icon: 'ShieldCheck',
        content: 'Wir verkaufen Ihnen kein neues Dach, wenn eine Reparatur reicht. Wir prüfen den Zustand ehrlich. Oft lassen sich Schäden lokal beheben, ohne gleich alles neu zu machen.'
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
      { step: 3, title: "Reparatur", text: "Kleine Reparaturen erledigen wir oft sofort. Für Größeres erhalten Sie ein Festpreis-Angebot." }
    ],
    references: [],
    contacts: [teamMembers.sabine, teamMembers.isabel],
    faq: [
      { q: 'Was kostet eine Dachreparatur?', a: 'Kleine Reparaturen (einzelne Ziegel) ab ca. 200€. Wir geben Ihnen vorab eine Einschätzung.' },
      { q: 'Helfen Sie bei Sturmschäden?', a: 'Ja, wir sichern das Dach und dokumentieren den Schaden für Ihre Versicherung.' },
      { q: 'Reinigen Sie auch Dachrinnen?', a: 'Ja, das gehört zu unseren Standard-Serviceleistungen.' }
    ]
  },
  brandschaden: {
    id: 'brandschaden',
    title: 'Brandschadensanierung',
    subtitle: 'Wiederaufbau mit Verstand',
    intro: 'Ein Brandschaden ist ein Ausnahmezustand. Wir helfen Ihnen, schnell wieder zur Normalität zurückzufinden. Von der Sicherung bis zum kompletten Wiederaufbau der Dachkonstruktion.',
    img: '/images/services/brandschaden-dach.jpg',
    description: 'Spezialisierte Sanierung nach Feuer- und Löschwasserschäden. Statikprüfung, Abbruch und Wiederaufbau aus einer Hand.',
    checkpoints: [
      "Sofortmaßnahmen & Sicherung",
      "Statische Überprüfung",
      "Kompletter Wiederaufbau"
    ],
    expertTip: "Nach einem Brand ist oft nicht nur das Feuer das Problem, sondern auch das Löschwasser. Wir prüfen die Dämmung auf Feuchtigkeit, um Spätschäden zu vermeiden.",
    sections: [
      {
        title: 'Sicherheit zuerst',
        icon: 'ShieldCheck',
        content: 'Brandruinen sind gefährlich. Wir prüfen zuerst die Statik und sichern die Baustelle, bevor wir mit Aufräumarbeiten beginnen.'
      },
      {
        title: 'Alles aus einer Hand',
        icon: 'Hammer',
        content: 'Wir koordinieren Abriss, Entsorgung von Brandlasten und den fachgerechten Wiederaufbau. So haben Sie nur einen Ansprechpartner in dieser stressigen Zeit.'
      }
    ],
    process: [
      { step: 1, title: "Sicherung", text: "Notabdichtung und Sicherung der Statik, um Folgeschäden zu vermeiden." },
      { step: 2, title: "Bestandsaufnahme", text: "Detaillierte Analyse für Versicherung und Sanierungsplan." },
      { step: 3, title: "Rückbau", text: "Fachgerechte Entsorgung beschädigter und kontaminierter Bauteile." },
      { step: 4, title: "Wiederaufbau", text: "Erstellung des neuen Dachstuhls und der Eindeckung." }
    ],
    references: [
      "/uploads/ivangs_brandschadensanierung_Eternit-Dach mit Brandschadensanierung_1.avif",
      "/uploads/ivangs_brandschadensanierung_Eternit-Dach mit Brandschadensanierung_2.avif"
    ],
    contacts: [teamMembers.marcus, teamMembers.sascha],
    faq: [
      { q: 'Rechnen Sie mit der Versicherung ab?', a: 'Wir unterstützen Sie mit detaillierten Angeboten und Dokumentationen für Ihre Versicherung.' },
      { q: 'Ist der Dachstuhl noch zu retten?', a: 'Das muss ein Statiker prüfen. Oft sind Balken nur oberflächlich angekohlt, manchmal muss aber alles neu. Wir klären das.' },
      { q: 'Wie lange dauert die Brandschadensanierung?', a: 'Das ist sehr individuell. Nach Freigabe durch die Behörden/Versicherung arbeiten wir mit Hochdruck am Wiederaufbau.' }
    ]
  }
};
