import React from 'react';
import { tinaField } from 'tinacms/dist/react';
import { User, Mail } from 'lucide-react';
import { teamMembers, getLeadership, getOfficeTeam, getCraftsmen } from '@/features/company/model/teamData';

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
                <div key={member.id} className="bg-slate-50 p-6 rounded-sm border border-slate-100 flex items-start gap-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                    <User size={28} className="text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-slate-900">{member.name}</h4>
                    <p className="text-sm text-slate-500 mb-2">{member.role}</p>
                    {showEmail && member.email && (
                      <a href={`mailto:${member.email}`} className="text-sm text-primary hover:underline flex items-center gap-1">
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
                <div key={member.id} className="bg-slate-50 p-6 rounded-sm border border-slate-100">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <User size={20} className="text-primary" />
                  </div>
                  <h4 className="font-bold text-slate-900">{member.name}</h4>
                  <p className="text-sm text-slate-500 mb-2">{member.role}</p>
                  {showEmail && member.email && (
                    <a href={`mailto:${member.email}`} className="text-xs text-primary hover:underline">
                      {member.email}
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
      </div>
    </section>
  );
};
