export interface TeamMember {
  id: string;
  name: string;
  role: string;
  email?: string;
  desc?: string;
  img?: string;
  category: 'leadership' | 'office' | 'craftsmen';
}

export const teamMembers: TeamMember[] = [
  // Leadership & Management
  { 
    id: 'marcus',
    name: "Marcus Ivangs", 
    role: "Geschäftsführer",
    email: "m.ivangs@ivangs.de",
    desc: "Für Großprojekte & strategische Fragen.", 
    category: 'leadership'
  },
  { 
    id: 'sascha-peters',
    name: "Sascha Peters", 
    role: "Dachdeckermeister / Bauleitung",
    email: "s.peters@ivangs.de",
    desc: "Ihr Experte für technische Planung & Machbarkeit.", 
    category: 'leadership'
  },

  // Office & Administration
  { 
    id: 'isabel',
    name: "Isabel Ivangs", 
    role: "Assistenz Geschäftsführung, Buchhaltung",
    email: "i.ivangs@ivangs.de",
    desc: "Für Terminabsprachen & Rechnungsfragen.", 
    category: 'office'
  },
  {
    id: 'heike',
    name: "Heike Hänsel",
    role: "Personalwesen, Versicherungsangelegenheiten",
    email: "h.haensel@ivangs.de",
    desc: "Ansprechpartnerin für Personalfragen.",
    category: 'office'
  },
  { 
    id: 'sabine',
    name: "Sabine Hammes", 
    role: "Reparaturenplanung (in Teilzeit)",
    email: "s.hammes@ivangs.de",
    desc: "Koordination von Reparatur- und Wartungsterminen.", 
    category: 'office'
  },

  // Craftsmen
  { 
    id: 'martin',
    name: "Martin Baron", 
    role: "Dachdeckergeselle / Vorarbeiter",
    category: 'craftsmen'
  },
  { 
    id: 'alexander',
    name: "Alexander Gutnik", 
    role: "Dachdeckergeselle / Vorarbeiter",
    category: 'craftsmen'
  },
  { 
    id: 'sascha-hanck',
    name: "Sascha Hanck", 
    role: "Dachdeckergeselle / Vorarbeiter",
    category: 'craftsmen'
  },
  { 
    id: 'marco',
    name: "Marco Janssen", 
    role: "Dachdeckergeselle / Reparaturen Kolonne",
    category: 'craftsmen'
  },
  { 
    id: 'heinz-peter',
    name: "Heinz-Peter Merkens", 
    role: "Dachdeckergeselle / Vorarbeiter",
    category: 'craftsmen'
  },
  { 
    id: 'nils',
    name: "Nils Minkner", 
    role: "Dachdeckergeselle / Vorarbeiter",
    category: 'craftsmen'
  },
  { 
    id: 'goran',
    name: "Goran Prerad", 
    role: "Dachdeckergeselle / Vorarbeiter",
    category: 'craftsmen'
  },
  { 
    id: 'detlef',
    name: "Detlef Staude", 
    role: "Dachdeckergeselle / Vorarbeiter",
    category: 'craftsmen'
  },
  { 
    id: 'antonius',
    name: "Antonius Ivangs", 
    role: "Dachdeckergeselle",
    category: 'craftsmen'
  },
];

// Helper functions to get team members by category
export const getLeadership = () => teamMembers.filter(m => m.category === 'leadership');
export const getOfficeTeam = () => teamMembers.filter(m => m.category === 'office');
export const getCraftsmen = () => teamMembers.filter(m => m.category === 'craftsmen');

// Legacy export for backward compatibility
export const teamMembersLegacy: Record<string, TeamMember> = {
  marcus: teamMembers.find(m => m.id === 'marcus')!,
  sascha: teamMembers.find(m => m.id === 'sascha-peters')!,
  isabel: teamMembers.find(m => m.id === 'isabel')!,
  heike: teamMembers.find(m => m.id === 'heike')!,
  sabine: teamMembers.find(m => m.id === 'sabine')!,
};
