import React from 'react';
import { Phone, Mail } from 'lucide-react';
import type { TeamMember } from '@/features/company/model/teamData';

interface TeamContactCardProps {
  member: TeamMember;
}

export const TeamContactCard: React.FC<TeamContactCardProps> = ({ member }) => {
  return (
    <div className="bg-white p-6 rounded-sm shadow-sm border border-slate-100 hover:border-primary/50 transition-colors">
      <div className="font-bold text-slate-900">{member.name}</div>
      <div className="text-xs font-bold text-primary uppercase tracking-wide mb-2">{member.role}</div>
      <p className="text-sm text-slate-500 mb-4">{member.desc}</p>
      <div className="flex gap-3">
        <button className="p-2 bg-slate-100 rounded-full hover:bg-primary hover:text-white transition-colors" title="Anrufen" aria-label={`Anrufen bei ${member.name}`}>
          <Phone size={16}/>
        </button>
        <button className="p-2 bg-slate-100 rounded-full hover:bg-primary hover:text-white transition-colors" title="E-Mail" aria-label={`E-Mail an ${member.name} senden`}>
          <Mail size={16}/>
        </button>
      </div>
    </div>
  );
};
