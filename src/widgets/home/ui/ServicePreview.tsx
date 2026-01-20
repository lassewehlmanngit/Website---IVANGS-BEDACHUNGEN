import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Home as HomeIcon, Layers, Zap, Sun, Hammer } from 'lucide-react';
import { Button } from '@/shared/ui/Button';
import { OptimizedImage } from '@/shared/ui/Image';
import { servicesData, ServiceId } from '@/features/service/model/serviceData';
import { cn } from '@/shared/lib/cn';
import { tinaField } from 'tinacms/dist/react';
import { useServicesListData } from '@/shared/lib/tina/useServicesListData';

interface ServiceSectionProps {
  id: ServiceId;
  lang: string;
  reverse?: boolean;
  cmsService?: any;
}

const serviceIcons: Record<ServiceId, React.ElementType> = {
  steildach: HomeIcon,
  flachdach: Layers,
  solar: Zap,
  fenster: Sun,
  sanierung: Hammer,
};

const serviceImages: Record<ServiceId, string> = {
  steildach: '/uploads/ivangs-steildach_Ziegeldach mit Gaubenbekleidung in Zinkstehfalz.avif',
  flachdach: '/uploads/ivangs_flachdach_Flachdach mit Dachbegrünung_2.avif',
  solar: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=2070&auto=format&fit=crop',
  fenster: 'https://images.unsplash.com/photo-1596637508677-03cb29559c5d?q=80&w=2070&auto=format&fit=crop',
  sanierung: 'https://images.unsplash.com/photo-1555699847-f41e54911049?q=80&w=2070&auto=format&fit=crop',
};

const ctaTexts: Record<ServiceId, string> = {
  steildach: 'Steildach-Sanierung planen',
  flachdach: 'Flachdach-Lösung anfragen',
  solar: 'Solar-Beratung starten',
  fenster: 'Dachfenster-Tausch anfragen',
  sanierung: 'Sanierung besprechen',
};

const ServiceSection: React.FC<ServiceSectionProps> = ({ id, lang, reverse = false, cmsService }) => {
  const fallbackService = servicesData[id];
  const Icon = serviceIcons[id];
  
  // Use CMS data with fallbacks
  const title = cmsService?.title || fallbackService.title;
  const description = cmsService?.shortDescription || fallbackService.description;
  const img = cmsService?.heroImage || serviceImages[id];
  const checkpoints = cmsService?.benefits || fallbackService.checkpoints;
  const ctaText = ctaTexts[id];

  return (
    <div className={cn(
      "flex flex-col items-center gap-12 lg:gap-20",
      reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'
    )}>
      {/* Image */}
      <div className="w-full lg:w-1/2">
        <Link to={`/${lang}/services/${id}`} className="relative rounded-sm overflow-hidden cursor-pointer border border-slate-100 group block">
          <OptimizedImage
            src={img}
            alt={title}
            className="w-full h-[300px] md:h-[400px] object-cover group-hover:scale-105 transition-transform duration-700"
            sizes="(max-width: 1024px) 100vw, 50vw"
            data-tina-field={cmsService && tinaField(cmsService, 'heroImage')}
          />
          <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors"></div>
          {/* Service label overlay */}
          <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-sm flex items-center gap-2 shadow-sm">
            <Icon size={18} className="text-primary" />
            <span className="font-bold text-sm text-slate-900" data-tina-field={cmsService && tinaField(cmsService, 'title')}>{title}</span>
          </div>
        </Link>
      </div>

      {/* Content */}
      <div className="w-full lg:w-1/2">
        <h3 className="text-h3 font-bold text-slate-900 mb-4 md:mb-6" data-tina-field={cmsService && tinaField(cmsService, 'title')}>{title}</h3>
        <p className="text-slate-600 text-base md:text-lg leading-relaxed mb-6 md:mb-8" data-tina-field={cmsService && tinaField(cmsService, 'shortDescription')}>
          {description}
        </p>

        {checkpoints && checkpoints.length > 0 && (
          <ul className="space-y-3 mb-8" data-tina-field={cmsService && tinaField(cmsService, 'benefits')}>
            {checkpoints.map((point: string, idx: number) => (
              <li key={idx} className="flex items-center gap-3 text-slate-700 font-medium">
                <CheckCircle2 className="text-primary shrink-0" size={20} />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        )}

        <Link to={`/${lang}/services/${id}`}>
          <Button
            className="text-white bg-slate-900 px-6 py-3 md:px-8 md:py-4 rounded-sm font-bold hover:bg-primary transition-colors flex items-center gap-2 md:gap-3 shadow-lg text-sm md:text-base"
          >
            {ctaText} <ArrowRight size={18} className="shrink-0" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export interface ServicePreviewProps {
  lang: string;
  homeData?: any;
}

export const ServicePreview: React.FC<ServicePreviewProps> = ({ lang, homeData }) => {
  const { data: cmsData, isLoading } = useServicesListData();
  const serviceOrder: ServiceId[] = ['steildach', 'flachdach', 'solar', 'fenster', 'sanierung'];
  
  // Extract services from CMS if available
  const cmsServices = cmsData?.serviceConnection?.edges?.map((edge: any) => edge.node) || [];
  
  // If we have CMS services, use them; otherwise fall back to hardcoded order
  const displayOrder = cmsServices.length > 0 
    ? cmsServices.map((s: any) => s._sys.filename).filter((id: string) => serviceOrder.includes(id as ServiceId))
    : serviceOrder;

  if (isLoading) {
    return (
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        
        <div className="mb-16 md:mb-24 text-center max-w-3xl mx-auto">
          <span className="text-primary-600 font-bold uppercase tracking-wider text-xs sm:text-sm" data-tina-field={homeData && tinaField(homeData, 'servicesEyebrow')}>
            {homeData?.servicesEyebrow || 'Unsere Expertise'}
          </span>
          <h2 className="text-h2 font-bold text-slate-900 mt-2 mb-4 md:mb-6" data-tina-field={homeData && tinaField(homeData, 'servicesTitle')}>
            {homeData?.servicesTitle || 'Nicht nur dicht, sondern durchdacht.'}
          </h2>
          <p className="text-slate-600 text-base md:text-lg" data-tina-field={homeData && tinaField(homeData, 'servicesDescription')}>
            {homeData?.servicesDescription || 'Ivangs Bedachungen bietet Ihnen das komplette Spektrum der Dach- und Fassadentechnik.'}
          </p>
        </div>

        <div className="space-y-24 lg:space-y-32">
          {displayOrder.map((id, index) => {
            // Find the matching CMS service
            const cmsService = cmsServices.find((s: any) => s._sys.filename === id);
            return (
              <ServiceSection 
                key={id}
                id={id as ServiceId}
                lang={lang}
                reverse={index % 2 === 1}
                cmsService={cmsService}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};
