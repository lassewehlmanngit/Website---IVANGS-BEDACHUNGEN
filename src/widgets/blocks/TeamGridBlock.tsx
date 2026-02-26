import React, { useState } from 'react';
import { tinaField } from 'tinacms/dist/react';
import { User, Mail, Info } from 'lucide-react';
import { teamMembers, getLeadership, getOfficeTeam, getCraftsmen, TeamMember } from '@/features/company/model/teamData';
import { Dialog } from '@/shared/ui/Dialog';
import { Button } from '@/shared/ui/Button';

export interface TeamGridBlockProps {
  data: {
    title?: string;
    description?: string;
    categories?: Array<'leadership' | 'office' | 'craftsmen'>;
    showEmail?: boolean;
  };
  parentField?: string;
}

export const TeamGridBlock: React.FC<TeamGridBlockProps> = ({ data, parentField }) => {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const categories = data.categories || ['leadership', 'office', 'craftsmen'];
  const showEmail = data.showEmail ?? true;

  const leadership = categories.includes('leadership') ? getLeadership() : [];
  const officeTeam = categories.includes('office') ? getOfficeTeam() : [];
  const craftsmen = categories.includes('craftsmen') ? getCraftsmen() : [];

  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4">
        {(data.title || data.description) && (
          <div className="mb-12 md:mb-16 text-center">
            {data.title && (
              <h2
                className="text-h2 font-bold text-slate-900"
                data-tina-field={parentField && tinaField(data, 'title')}
              >
                {data.title}
              </h2>
            )}
            {data.description && (
              <p
                className="text-slate-600 mt-4 max-w-2xl mx-auto"
                data-tina-field={parentField && tinaField(data, 'description')}
              >
                {data.description}
              </p>
            )}
          </div>
        )}

        {/* Leadership */}
        {leadership.length > 0 && (
          <div className="mb-16">
            <h3 className="text-h4 font-bold text-slate-900 mb-8 flex items-center gap-2">
              <span className="w-8 h-1 bg-primary rounded-full"></span>
              Geschäftsführung & Bauleitung
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {leadership.map((member) => (
                <div
                  key={member.id}
                  className="bg-slate-50 p-6 rounded-sm border border-slate-100 flex items-start gap-4 cursor-pointer hover:border-primary hover:shadow-md transition-all group"
                  onClick={() => setSelectedMember(member)}
                >
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center shrink-0 overflow-hidden">
                    {member.img ? (
                      <img src={member.img} alt={member.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    ) : (
                      <User size={28} className="text-primary" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-lg text-slate-900 group-hover:text-primary transition-colors">{member.name}</h4>
                    <p className="text-sm text-slate-500 mb-2">{member.role}</p>
                    {showEmail && member.email && (
                      <a href={`mailto:${member.email}`} className="text-sm text-primary hover:underline flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                        <Mail size={14} /> {member.email}
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Office Team */}
        {officeTeam.length > 0 && (
          <div className="mb-16">
            <h3 className="text-h4 font-bold text-slate-900 mb-8 flex items-center gap-2">
              <span className="w-8 h-1 bg-primary rounded-full"></span>
              Büro & Verwaltung
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {officeTeam.map((member) => (
                <div
                  key={member.id}
                  className="bg-slate-50 p-6 rounded-sm border border-slate-100 cursor-pointer hover:border-primary hover:shadow-md transition-all group"
                  onClick={() => setSelectedMember(member)}
                >
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 overflow-hidden">
                    {member.img ? (
                      <img src={member.img} alt={member.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    ) : (
                      <User size={20} className="text-primary" />
                    )}
                  </div>
                  <h4 className="font-bold text-slate-900 group-hover:text-primary transition-colors">{member.name}</h4>
                  <p className="text-sm text-slate-500 mb-2">{member.role}</p>
                  {showEmail && member.email && (
                    <a href={`mailto:${member.email}`} className="text-xs text-primary hover:underline flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                      <Mail size={12} /> {member.email}
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Craftsmen */}
        {craftsmen.length > 0 && (
          <div>
            <h3 className="text-h4 font-bold text-slate-900 mb-8 flex items-center gap-2">
              <span className="w-8 h-1 bg-primary rounded-full"></span>
              Unsere Dachdecker
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {craftsmen.map((member) => (
                <div key={member.id} className="bg-slate-50 p-4 rounded-sm border border-slate-100 text-center">
                  <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-3">
                    <User size={18} className="text-slate-500" />
                  </div>
                  <h4 className="font-semibold text-sm text-slate-900">{member.name}</h4>
                  <p className="text-xs text-slate-500 mt-1">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Member Modal */}
        <Dialog
          open={!!selectedMember}
          onClose={() => setSelectedMember(null)}
          title={selectedMember?.name}
          description={selectedMember?.role}
        >
          {selectedMember && (
            <div className="mt-4">
              <div className="flex flex-col sm:flex-row gap-6 items-start">
                <div className="w-32 h-32 shrink-0 bg-slate-100 rounded-lg overflow-hidden border border-slate-200">
                  {selectedMember.img ? (
                    <img src={selectedMember.img} alt={selectedMember.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <User size={48} className="text-slate-400" />
                    </div>
                  )}
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-900 flex items-center gap-2 mb-2">
                    <Info size={18} className="text-primary" />
                    Über {selectedMember.name.split(' ')[0]}
                  </h4>
                  <p className="text-slate-600 leading-relaxed mb-6">
                    {selectedMember.desc || `${selectedMember.name} ist ein wichtiger Teil unseres Teams.`}
                  </p>

                  {selectedMember.email && (
                    <div className="pt-4 border-t border-slate-100 flex items-center gap-4">
                      <div className="text-sm text-slate-500">
                        <p className="font-bold text-slate-900">Direkter Kontakt</p>
                        <p className="text-xs">Bei Fragen direkt erreichbar.</p>
                      </div>
                      <a href={`mailto:${selectedMember.email}`} className="ml-auto">
                        <Button className="w-full sm:w-auto" variant="outline">
                          <Mail size={16} className="mr-2" />
                          Nachricht senden
                        </Button>
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </Dialog>

      </div>
    </section>
  );
};
