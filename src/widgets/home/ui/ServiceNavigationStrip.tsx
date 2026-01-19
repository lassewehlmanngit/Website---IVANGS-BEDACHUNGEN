import React from 'react';
import { Home as HomeIcon, Layers, Zap, Sun, Hammer } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { SupportedLang } from '@/shared/config/i18n';
import type { ServiceId } from '@/features/service/model/serviceData';

interface ServiceNavigationStripProps {
  lang: SupportedLang;
}

export const ServiceNavigationStrip: React.FC<ServiceNavigationStripProps> = ({ lang }) => {
  const navigate = useNavigate();

  const services: { id: ServiceId; label: string; Icon: React.ElementType }[] = [
    { id: 'steildach', label: 'Steildach', Icon: HomeIcon },
    { id: 'flachdach', label: 'Flachdach', Icon: Layers },
    { id: 'solar', label: 'Solar & PV', Icon: Zap },
    { id: 'fenster', label: 'Fenster', Icon: Sun },
    { id: 'sanierung', label: 'Sanierung', Icon: Hammer },
  ];

  return (
    <section className="bg-white text-slate-800 border-b border-slate-200 hidden md:block relative z-30 shadow-sm">
      <div className="w-full grid grid-cols-5 divide-x divide-slate-100">
        {services.map(({ id, label, Icon }) => (
          <button
            key={id}
            onClick={() => navigate(`/${lang}/services/${id}`)}
            className="group flex flex-col items-center justify-center py-6 px-2 hover:bg-slate-50 transition-colors"
          >
            <Icon 
              size={24} 
              className="mb-2 text-slate-400 group-hover:text-primary transition-colors group-hover:scale-110 duration-300" 
            />
            <span className="font-bold text-sm uppercase tracking-wide group-hover:text-primary transition-colors">
              {label}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
};
