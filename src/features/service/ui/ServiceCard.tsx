import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/shared/lib/cn';
import { ButtonLink } from '@/shared/ui/ButtonLink';

export interface ServiceCardProps {
  id: string;
  title: string;
  description: string;
  img?: string;
  lang: string;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ id, title, description, img, lang }) => {
  return (
    <Link 
      to={`/${lang}/services/${id}`}
      className="group bg-white rounded-sm overflow-hidden shadow-lg hover:shadow-lg transition-all duration-300 border border-slate-100 flex flex-col h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      {img && (
        <div className="relative h-64 overflow-hidden">
          <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-colors z-10"></div>
          <img 
            src={img} 
            alt={title} 
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" 
          />
        </div>
      )}
      <div className="p-8 flex-grow flex flex-col justify-between">
        <div>
          <h3 className="text-2xl font-bold mb-3 text-slate-900 group-hover:text-primary transition-colors">{title}</h3>
          <p className="text-slate-600 mb-6 leading-relaxed">
            {description}
          </p>
        </div>
        <div className="flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-wide group-hover:gap-3 transition-all">
          Details ansehen <ArrowRight size={16} />
        </div>
      </div>
    </Link>
  );
};
