import React from 'react';
import { Info } from 'lucide-react';
import { cn } from '@/shared/lib/cn';

export interface ExpertTipProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
}

export const ExpertTip: React.FC<ExpertTipProps> = ({ children, className, title = "Experten Tipp:" }) => {
  return (
    <div className={cn("bg-primary-50 border-l-4 border-primary-600 p-6 rounded-r-sm flex gap-4", className)}>
      <Info className="text-primary-600 shrink-0 mt-1" size={24} />
      <div>
        <span className="font-bold text-primary-800 block mb-1">{title}</span>
        <div className="text-primary-900/80 leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  );
};
