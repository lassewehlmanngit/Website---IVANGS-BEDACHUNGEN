import React from 'react';
import { tinaField } from 'tinacms/dist/react';
import { useJobsData } from '@/shared/lib/tina/useJobsData';
import { JobListing } from '@/features/career/ui/JobListing';
import { Accordion } from '@/shared/ui/Accordion';
import type { SupportedLang } from '@/shared/config/i18n';

export interface JobsListBlockProps {
  data: {
    title: string;
    emptyMessage?: string;
  };
  parentField?: string;
  lang?: SupportedLang;
}

export const JobsListBlock: React.FC<JobsListBlockProps> = ({ data, parentField, lang = 'de' }) => {
  const { data: jobsData } = useJobsData();
  const jobs = jobsData?.jobConnection?.edges?.map((edge: any) => edge.node) || [];
  const publishedJobs = jobs.filter((job: any) => job.published !== false);

  return (
    <section className="py-16 md:py-20 bg-white" id="jobs">
      <div className="container mx-auto px-4">
        <h2 
          className="text-h2 font-bold text-slate-900 mb-8 md:mb-12"
          data-tina-field={parentField && tinaField(data, 'title')}
        >
          {data.title}
        </h2>

        {publishedJobs.length > 0 ? (
          <Accordion type="single" collapsible className="space-y-4 border-none">
            {publishedJobs.map((job: any) => (
              <JobListing 
                key={job._sys?.filename || job.id}
                job={job}
                lang={lang}
                useTinaField={true}
              />
            ))}
          </Accordion>
        ) : (
          <div className="bg-slate-50 p-8 rounded-sm text-center">
            <p 
              className="text-slate-600"
              data-tina-field={parentField && tinaField(data, 'emptyMessage')}
            >
              {data.emptyMessage || 'Aktuell sind keine offenen Stellen verfügbar. Initiativbewerbungen sind jederzeit willkommen!'}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
