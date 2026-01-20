import React from 'react';
import { Home as HomeIcon, Layers, Zap, Sun, Hammer } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { SupportedLang } from '@/shared/config/i18n';
import type { ServiceId } from '@/features/service/model/serviceData';
import { useServicesListData } from '@/shared/lib/tina/useServicesListData';

interface ServiceNavigationStripProps {
  lang: SupportedLang;
}

const iconMap: Record<string, React.ElementType> = {
  home: HomeIcon,
  layers: Layers,
  zap: Zap,
  sun: Sun,
  hammer: Hammer,
};

export const ServiceNavigationStrip: React.FC<ServiceNavigationStripProps> = ({ lang }) => {
  const navigate = useNavigate();
  const { data: servicesData, isLoading } = useServicesListData();

  // Fallback services
  const fallbackServices: { id: ServiceId; label: string; Icon: React.ElementType }[] = [
    { id: 'steildach', label: 'Steildach', Icon: HomeIcon },
    { id: 'flachdach', label: 'Flachdach', Icon: Layers },
    { id: 'solar', label: 'Solar & PV', Icon: Zap },
    { id: 'fenster', label: 'Fenster', Icon: Sun },
    { id: 'sanierung', label: 'Sanierung', Icon: Hammer },
  ];
  
  // Extract services from CMS if available
  const cmsServices = servicesData?.serviceConnection?.edges?.map((edge: any) => {
    const node = edge.node;
    return {
      id: node._sys.filename as ServiceId,
      label: node.title,
      Icon: iconMap[node.icon] || HomeIcon,
    };
  }) || [];
  
  const services = cmsServices.length > 0 ? cmsServices : fallbackServices;
  
  if (isLoading) {
    return null; // Or a skeleton loader
  }

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
