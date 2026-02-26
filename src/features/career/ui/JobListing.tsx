import React from 'react';
import { MapPin, Clock, ChevronDown, CheckCircle2, Briefcase } from 'lucide-react';
import { AccordionItem, AccordionTrigger, AccordionContent } from '@/shared/ui/Accordion';
import { Button } from '@/shared/ui/Button';
import { useNavigate } from 'react-router-dom';
import type { JobOffer } from '@/features/career/model/jobsData';
import { cn } from '@/shared/lib/cn';
import { tinaField } from 'tinacms/dist/react';

export interface JobListingProps {
  job: JobOffer | any;
  lang: string;
  useTinaField?: boolean;
  isCardMode?: boolean;
}

export const JobListing: React.FC<JobListingProps> = ({ job, lang, useTinaField = false, isCardMode = false }) => {
  const navigate = useNavigate();

  // If we are in card mode, we just render the expanded details (or a link to them)
  if (isCardMode) {
    return (
      <div className="flex flex-col h-full">
        {/* We assume the parent component renders the summary/title, so we just provide the CTA and details preview here */}
        <div className="flex flex-wrap gap-4 text-xs md:text-sm text-slate-500 mb-6">
          <span className="flex items-center gap-1" data-tina-field={useTinaField && tinaField(job, 'location')}>
            <MapPin size={14} /> {job.location || 'Dinslaken'}
          </span>
          <span className="flex items-center gap-1"><Clock size={14} /> Ab sofort</span>
        </div>

        <div className="mt-auto pt-4 border-t border-slate-100">
          {/* If we had a dedicated job detail page, we'd link there. Since it's Contact, we open a dialog or link to Contact */}
          <Button
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/${lang}/contact?subject=Bewerbung%20als%20${encodeURIComponent(job.title || '')}`);
            }}
            variant="outline"
            className="w-full justify-between group-hover:bg-primary group-hover:text-white transition-colors"
          >
            <span>Jetzt bewerben</span>
            <Briefcase size={16} />
          </Button>
        </div>
      </div>
    );
  }

  // Original Accordion Mode (Fallback)
  return (
    <div className="bg-white border border-slate-200 rounded-sm hover:border-primary hover:shadow-lg transition-all group overflow-hidden">
      <AccordionItem value={job.id || job._sys?.filename} className="border-none">
        <AccordionTrigger className="hover:no-underline hover:bg-slate-50/50 px-4 py-6 md:px-6 md:py-6 [&[data-state=open]]:bg-slate-50 items-start text-left">
          <div className="flex-1 min-w-0 pr-4">
            <div className="flex justify-between items-start gap-3 mb-3">
              <h3
                className="text-lg md:text-xl font-bold text-slate-900 group-hover:text-primary transition-colors flex-1"
                data-tina-field={useTinaField && tinaField(job, 'title')}
              >
                {job.title}
              </h3>
              <span
                className={cn(
                  "px-3 py-1 rounded-sm text-xs font-bold shrink-0",
                  job.type === 'Ausbildung' ? 'bg-warning/10 text-warning' : 'bg-primary/10 text-primary'
                )}
                data-tina-field={useTinaField && tinaField(job, 'type')}
              >
                {job.type}
              </span>
            </div>

            <div className="flex flex-wrap gap-4 md:gap-6 text-xs md:text-sm text-slate-500 mb-3">
              <span className="flex items-center gap-1" data-tina-field={useTinaField && tinaField(job, 'location')}>
                <MapPin size={14} className="md:w-4 md:h-4" /> {job.location}
              </span>
              <span className="flex items-center gap-1"><Clock size={14} className="md:w-4 md:h-4" /> Ab sofort</span>
            </div>

            <p
              className="text-slate-600 text-sm leading-relaxed mb-3"
              data-tina-field={useTinaField && tinaField(job, 'shortDesc')}
            >
              {job.shortDesc}
            </p>

            <span className="text-primary font-bold text-xs md:text-sm inline-flex items-center gap-1">
              Mehr erfahren
            </span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="p-0">
          <div className="bg-slate-50 border-t border-slate-100 p-6 md:p-8 grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-bold text-slate-900 mb-3 text-sm uppercase tracking-wide">Deine Aufgaben</h4>
              <ul className="space-y-2 mb-6">
                {job.tasks?.map((task: string, idx: number) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2 text-sm text-slate-600"
                    data-tina-field={useTinaField && tinaField(job, `tasks.${idx}`)}
                  >
                    <CheckCircle2 size={16} className="text-primary shrink-0 mt-0.5" />
                    <span>{task}</span>
                  </li>
                ))}
              </ul>

              <h4 className="font-bold text-slate-900 mb-3 text-sm uppercase tracking-wide">Das bringst du mit</h4>
              <ul className="space-y-2">
                {job.profile?.map((item: string, idx: number) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2 text-sm text-slate-600"
                    data-tina-field={useTinaField && tinaField(job, `profile.${idx}`)}
                  >
                    <CheckCircle2 size={16} className="text-primary shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col justify-between">
              <div>
                <h4 className="font-bold text-slate-900 mb-3 text-sm uppercase tracking-wide">Wir bieten dir</h4>
                <ul className="space-y-2 mb-8">
                  {job.benefits?.map((item: string, idx: number) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2 text-sm text-slate-600"
                      data-tina-field={useTinaField && tinaField(job, `benefits.${idx}`)}
                    >
                      <CheckCircle2 size={16} className="text-primary shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/${lang}/contact`);
                }}
                className="w-full shadow-lg"
              >
                Jetzt bewerben <Briefcase size={16} className="ml-2" />
              </Button>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </div>
  );
};
