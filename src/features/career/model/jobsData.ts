export interface JobOffer {
  id: string;
  title: string;
  location: string;
  type: 'Vollzeit' | 'Ausbildung' | 'Teilzeit';
  shortDesc: string;
  tasks: string[];
  profile: string[];
  benefits: string[];
}

export const jobsData: JobOffer[] = [
  {
    id: "dachdecker",
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
    id: "ausbildung",
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
