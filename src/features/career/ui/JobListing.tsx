import React from 'react';
import { MapPin, Clock, ChevronDown, CheckCircle2, Briefcase } from 'lucide-react';
import { AccordionItem, AccordionTrigger, AccordionContent } from '@/shared/ui/Accordion';
import { Button } from '@/shared/ui/Button';
import { useNavigate } from 'react-router-dom';
import type { JobOffer } from '@/features/career/model/jobsData';
import { cn } from '@/shared/lib/cn';

interface JobListingProps {
  job: JobOffer;
  lang: string;
}

export const JobListing: React.FC<JobListingProps> = ({ job, lang }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white border border-slate-200 rounded-sm hover:border-primary hover:shadow-lg transition-all group overflow-hidden mb-6">
      <AccordionItem value={job.id} className="border-none">
        <AccordionTrigger className="hover:bg-white px-4 py-6 md:px-8 md:py-8 flex-col items-start gap-4">
          <div className="w-full">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold text-slate-900 group-hover:text-primary transition-colors">{job.title}</h3>
              <span className={cn(
                "px-3 py-1 rounded-sm text-xs font-bold",
                job.type === 'Ausbildung' ? 'bg-orange-100 text-orange-700' : 'bg-primary/10 text-primary'
              )}>
                {job.type}
              </span>
            </div>
            
            <div className="flex gap-6 text-sm text-slate-500 mb-4">
              <span className="flex items-center gap-1"><MapPin size={16} /> {job.location}</span>
              <span className="flex items-center gap-1"><Clock size={16} /> Ab sofort</span>
            </div>

            <p className="text-slate-600 text-sm leading-relaxed mb-4">
              {job.shortDesc}
            </p>

            <div className="flex items-center justify-between mt-4 w-full">
                <span className="text-primary font-bold text-sm hover:underline flex items-center gap-1">
                   Mehr erfahren
                </span>
                {/* Chevron is handled by AccordionTrigger but we can hide the default one if we want custom placement, 
                    or rely on the trigger's chevron. My AccordionTrigger puts it at the end. 
                    Here I want it at the end of this row. 
                    Actually AccordionTrigger flex is 'justify-between'.
                    So the Chevron will be at the far right.
                */}
            </div>
          </div>
        </AccordionTrigger>
        <AccordionContent className="p-0">
          <div className="bg-slate-50 border-t border-slate-100 p-6 md:p-8 grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-bold text-slate-900 mb-3 text-sm uppercase tracking-wide">Deine Aufgaben</h4>
              <ul className="space-y-2 mb-6">
                {job.tasks.map((task, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-slate-600">
                    <CheckCircle2 size={16} className="text-primary shrink-0 mt-0.5" />
                    <span>{task}</span>
                  </li>
                ))}
              </ul>

              <h4 className="font-bold text-slate-900 mb-3 text-sm uppercase tracking-wide">Das bringst du mit</h4>
                <ul className="space-y-2">
                {job.profile.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-slate-600">
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
                  {job.benefits.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-slate-600">
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
