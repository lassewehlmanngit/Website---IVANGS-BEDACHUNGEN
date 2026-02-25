import React from 'react';
import { Home as HomeIcon, Layers, Zap, Sun, Hammer, Flame, Wrench } from 'lucide-react';
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
  flame: Flame,
  wrench: Wrench,
};

export const ServiceNavigationStrip: React.FC<ServiceNavigationStripProps> = ({ lang }) => {
  const navigate = useNavigate();
  const { data: servicesData, isLoading } = useServicesListData();

  // Fallback services
  const fallbackServices: { id: ServiceId; label: string; Icon: React.ElementType }[] = [
    { id: 'steildach', label: 'Steildach', Icon: HomeIcon },
    { id: 'flachdach', label: 'Flachdach', Icon: Layers },
    // { id: 'solar', label: 'Solar & PV', Icon: Zap }, // Removed
    { id: 'fenster', label: 'Fenster', Icon: Sun },
    { id: 'sanierung', label: 'Sanierung', Icon: Hammer },
    { id: 'reparatur', label: 'Reparatur', Icon: Wrench },
    { id: 'brandschaden', label: 'Brandschaden', Icon: Flame },
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
      <div className="w-full bg-slate-100 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-[1px]">
        {services.map(({ id, label, Icon }: { id: string, label: string, Icon: React.ElementType }) => (
          <button
            key={id}
            onClick={() => navigate(`/${lang}/services/${id}`)}
            className="group flex flex-col items-center justify-center py-6 px-2 bg-white hover:bg-slate-50 transition-colors h-full w-full"
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
