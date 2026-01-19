export interface TeamMember {
  id: string;
  name: string;
  role: string;
  desc: string;
  img: string;
}

export const teamMembers: Record<string, TeamMember> = {
  marcus: { 
    id: 'marcus',
    name: "Marcus Ivangs", 
    role: "Geschäftsführer", 
    desc: "Für Großprojekte & strategische Fragen.", 
    img: "https://randomuser.me/api/portraits/men/32.jpg" 
  },
  sascha: { 
    id: 'sascha',
    name: "Sascha Peters", 
    role: "Dachdeckermeister & Bauleitung", 
    desc: "Ihr Experte für technische Planung & Machbarkeit.", 
    img: "https://randomuser.me/api/portraits/men/44.jpg" 
  },
  isabel: { 
    id: 'isabel',
    name: "Isabel Ivangs", 
    role: "Büro & Terminierung", 
    desc: "Für Terminabsprachen & Rechnungsfragen.", 
    img: "https://randomuser.me/api/portraits/women/44.jpg" 
  },
  sabine: { 
    id: 'sabine',
    name: "Sabine Hammes", 
    role: "Reparaturenplanung", 
    desc: "Koordination von Reparatur- und Wartungsterminen.", 
    img: "https://randomuser.me/api/portraits/women/68.jpg" 
  },
  heike: {
    id: 'heike',
    name: "Heike Hänsel",
    role: "Personalwesen & Versicherung",
    desc: "Ansprechpartnerin für Personalfragen.",
    img: "https://randomuser.me/api/portraits/women/45.jpg" 
  }
};
