import React from 'react';
import { cn } from '@/shared/lib/cn';

export interface ProcessStep {
  step: number | string;
  title: string;
  text: string;
}

export interface ProcessTimelineProps {
  steps: ProcessStep[];
  className?: string;
}

export const ProcessTimeline: React.FC<ProcessTimelineProps> = ({ steps, className }) => {
  return (
    <div className={cn("relative border-l-2 border-slate-200 ml-4 space-y-10 pb-4", className)}>
      {steps.map((item, idx) => (
        <div key={idx} className="relative pl-10">
          <div className="absolute -left-[21px] top-0 w-10 h-10 bg-white border-4 border-slate-100 rounded-full flex items-center justify-center font-bold text-slate-400 text-sm">
            {item.step}
          </div>
          <h4 className="font-bold text-slate-900 text-lg mb-2">{item.title}</h4>
          <p className="text-slate-600 leading-relaxed">{item.text}</p>
        </div>
      ))}
    </div>
  );
};
