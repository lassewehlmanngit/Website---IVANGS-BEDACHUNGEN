import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Home as HomeIcon, Layers, Zap, Sun, Hammer, LucideIcon } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
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
  
  // #region agent log
  fetch('http://127.0.0.1:7245/ingest/984a66b5-88db-4299-9992-dc0fd2248136',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'ServicePreview.tsx:ServiceSection',message:'Service section render',data:{id,hasCmsService:!!cmsService,cmsServiceKeys:cmsService?Object.keys(cmsService):[],hasSys:cmsService?._sys?true:false,sysFilename:cmsService?._sys?.filename},timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'A'})}).catch(()=>{});
  // #endregion
  
  // Use CMS data with fallbacks - handle both string arrays and potential nested objects
  const title = cmsService?.title || fallbackService.title;
  const description = cmsService?.shortDescription || cmsService?.intro || fallbackService.description;
  const img = cmsService?.heroImage || cmsService?.image || serviceImages[id];
  
  // Handle benefits - could be string array from CMS or checkpoints from fallback
  const rawBenefits = cmsService?.benefits || cmsService?.features || fallbackService.checkpoints || [];
  const checkpoints = Array.isArray(rawBenefits) 
    ? rawBenefits.map((item: any) => typeof item === 'string' ? item : item?.text || item)
    : [];
  const ctaText = ctaTexts[id];

  // Note: tinaField is NOT used on service data from connection queries because
  // connection queries don't provide proper document metadata for visual editing.
  // To edit individual services, navigate to the service detail page (/de/services/{id}).
  // The service preview section header (eyebrow, title, description) IS editable
  // via the home page document's servicesSection field.

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
          />
          <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors"></div>
          {/* Service label overlay */}
          <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-sm flex items-center gap-2 shadow-sm">
            <Icon size={18} className="text-primary" />
            <span className="font-bold text-sm text-slate-900">{title}</span>
          </div>
        </Link>
      </div>

      {/* Content */}
      <div className="w-full lg:w-1/2">
        <h3 className="text-h3 font-bold text-slate-900 mb-4 md:mb-6">{title}</h3>
        <p className="text-slate-600 text-base md:text-lg leading-relaxed mb-6 md:mb-8">
          {description}
        </p>

        {checkpoints && checkpoints.length > 0 && (
          <ul className="space-y-3 mb-8">
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

// Helper to get icon component from string name
const getIconComponent = (iconName: string | undefined): React.ElementType => {
  if (!iconName) return HomeIcon;
  const Icon = (LucideIcons as any)[iconName];
  return Icon || HomeIcon;
};

export const ServicePreview: React.FC<ServicePreviewProps> = ({ lang, homeData }) => {
  const { data: cmsData, isLoading } = useServicesListData();
  const serviceOrder: ServiceId[] = ['steildach', 'flachdach', 'solar', 'fenster', 'sanierung'];
  
  // Check if home page has custom services defined
  const hasCustomServices = homeData?.servicesSection?.services && homeData.servicesSection.services.length > 0;
  
  // Extract services from CMS if available (fallback)
  const cmsServices = cmsData?.serviceConnection?.edges?.map((edge: any) => edge.node) || [];
  
  // If we have CMS services, use them; otherwise fall back to hardcoded order
  const displayOrder = cmsServices.length > 0 
    ? cmsServices.map((s: any) => s._sys.filename).filter((id: string) => serviceOrder.includes(id as ServiceId))
    : serviceOrder;

  if (isLoading && !hasCustomServices) {
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
          <span className="text-primary-600 font-bold uppercase tracking-wider text-xs sm:text-sm" data-tina-field={homeData?.servicesSection && tinaField(homeData.servicesSection, 'eyebrow')}>
            {homeData?.servicesSection?.eyebrow || 'Unsere Expertise'}
          </span>
          <h2 className="text-h2 font-bold text-slate-900 mt-2 mb-4 md:mb-6" data-tina-field={homeData?.servicesSection && tinaField(homeData.servicesSection, 'title')}>
            {homeData?.servicesSection?.title || 'Nicht nur dicht, sondern durchdacht.'}
          </h2>
          <p className="text-slate-600 text-base md:text-lg" data-tina-field={homeData?.servicesSection && tinaField(homeData.servicesSection, 'description')}>
            {homeData?.servicesSection?.description || 'Ivangs Bedachungen bietet Ihnen das komplette Spektrum der Dach- und Fassadentechnik.'}
          </p>
        </div>

        <div className="space-y-24 lg:space-y-32">
          {hasCustomServices ? (
            // Render custom services from home page data
            homeData.servicesSection.services.map((service: any, index: number) => {
              const Icon = getIconComponent(service.icon);
              return (
                <div
                  key={index}
                  className={cn(
                    "flex flex-col items-center gap-12 lg:gap-20",
                    index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'
                  )}
                  data-tina-field={tinaField(homeData.servicesSection, `services.${index}`)}
                >
                  {/* Image */}
                  <div className="w-full lg:w-1/2">
                    <Link to={service.link || '#'} className="relative rounded-sm overflow-hidden cursor-pointer border border-slate-100 group block">
                      <OptimizedImage
                        src={service.image}
                        alt={service.title}
                        className="w-full h-[300px] md:h-[400px] object-cover group-hover:scale-105 transition-transform duration-700"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        data-tina-field={tinaField(service, 'image')}
                      />
                      <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors"></div>
                      <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-sm flex items-center gap-2 shadow-sm">
                        <Icon size={18} className="text-primary" />
                        <span className="font-bold text-sm text-slate-900" data-tina-field={tinaField(service, 'title')}>{service.title}</span>
                      </div>
                    </Link>
                  </div>

                  {/* Content */}
                  <div className="w-full lg:w-1/2">
                    <h3 className="text-h3 font-bold text-slate-900 mb-4 md:mb-6" data-tina-field={tinaField(service, 'title')}>
                      {service.title}
                    </h3>
                    <p className="text-slate-600 text-base md:text-lg leading-relaxed mb-6 md:mb-8" data-tina-field={tinaField(service, 'description')}>
                      {service.description}
                    </p>

                    {service.checkpoints && service.checkpoints.length > 0 && (
                      <ul className="space-y-3 mb-8" data-tina-field={tinaField(service, 'checkpoints')}>
                        {service.checkpoints.map((point: string, idx: number) => (
                          <li key={idx} className="flex items-center gap-3 text-slate-700 font-medium">
                            <CheckCircle2 className="text-primary shrink-0" size={20} />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {service.link && (
                      <Link to={service.link}>
                        <Button
                          className="text-white bg-slate-900 px-6 py-3 md:px-8 md:py-4 rounded-sm font-bold hover:bg-primary transition-colors flex items-center gap-2 md:gap-3 shadow-lg text-sm md:text-base"
                          data-tina-field={tinaField(service, 'ctaText')}
                        >
                          {service.ctaText || 'Mehr erfahren'} <ArrowRight size={18} className="shrink-0" />
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            // Fallback: Render from service collection
            displayOrder.map((id, index) => {
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
            })
          )}
        </div>
      </div>
    </section>
  );
};
