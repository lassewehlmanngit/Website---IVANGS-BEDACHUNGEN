import React, { useState, useEffect } from 'react';
import { ArrowRight, Users, Truck, Warehouse, Calendar, LucideIcon } from 'lucide-react';
import { Button } from '@/shared/ui/Button';
import type { HeroSettings } from '@/shared/lib/content/globals';
import { tinaField } from 'tinacms/dist/react';
import { SmartLink } from '@/shared/ui/SmartLink';
import { QuickContactForm } from '@/features/contact/QuickContactForm';

export interface HeroSectionProps {
  lang: string;
  settings?: HeroSettings;
  homeData?: any;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ lang, settings, homeData }) => {
  const [loadVideo, setLoadVideo] = useState(false);
  
  // Use homeData from TinaCMS if available, otherwise fall back to settings
  const heroData = homeData?.hero || settings;
  const mediaType = heroData?.mediaType || 'video';
  const backgroundImage = heroData?.backgroundImage || '/uploads/ivangs-dachdecker-einsatz.avif';
  const videoUrl = heroData?.videoUrl || 'https://cdn.coverr.co/videos/coverr-roofing-works-5309/1080p.mp4';
  const showQuickForm = heroData?.showQuickForm ?? true;
  
  // Quick form data from CMS
  const formData = homeData?.quickForm || {};

  // Stats data from CMS or fallback
  const stats = homeData?.stats || [
    { value: '28', label: 'Experten', icon: 'Users' },
    { value: 'Eigener', label: 'Kran-Service', icon: 'Truck' },
    { value: '400m²', label: 'Lagerfläche', icon: 'Warehouse' },
    { value: '1996', label: 'Gegründet', icon: 'Calendar' },
  ];

  // Helper to get icon component from string
  const getIcon = (iconName: string): LucideIcon => {
    const icons: Record<string, LucideIcon> = {
      Users, Truck, Warehouse, Calendar
    };
    return icons[iconName] || Users;
  };

  useEffect(() => {
    // Delay video loading to prioritize initial page render
    const timer = setTimeout(() => setLoadVideo(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-[85vh] min-h-[85dvh] flex flex-col bg-slate-900 overflow-hidden">
      {/* Background Media & Overlay */}
      <div className="absolute inset-0 z-0">
        {mediaType === 'video' ? (
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            preload="none"
            className="w-full h-full object-cover"
            poster={backgroundImage}
            fetchpriority="high"
          >
            {loadVideo && (
              <source src={videoUrl} type="video/mp4" />
            )}
          </video>
        ) : (
          <img 
            src={backgroundImage} 
            alt="Hero Background" 
            className="w-full h-full object-cover"
            fetchpriority="high"
          />
        )}
        
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/70 to-slate-900/50 z-10"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/grid-me.png')] opacity-10 z-10"></div>
      </div>

      <div className="relative z-20 container mx-auto px-4 py-20 lg:py-0 grid lg:grid-cols-2 gap-16 items-center flex-grow content-center">
        {/* Left: Copy & Main Message */}
        <div className="text-white mt-8 md:mt-0">
          <span className="text-primary font-bold uppercase tracking-[0.2em] text-sm mb-4 block animate-slide-up" data-tina-field={homeData?.hero && tinaField(homeData.hero, 'eyebrow')}>
            {heroData?.eyebrow || 'Meisterbetrieb seit 1996'}
          </span>
          <h1 className="text-h1 font-medium leading-tight tracking-tight mb-4 md:mb-6 animate-slide-up" data-tina-field={homeData?.hero && tinaField(homeData.hero, 'title')}>
            {heroData?.title || 'Dächer, die begeistern.'}
          </h1>
          <p className="text-lg md:text-xl text-slate-300 mb-8 md:mb-10 max-w-lg font-light leading-relaxed animate-slide-up" data-tina-field={homeData?.hero && tinaField(homeData.hero, 'description')}>
            {heroData?.description || 'Ob Sanierung, Neubau oder Reparatur: Wir schützen, was Ihnen wichtig ist. Mit 28 Experten, eigenem Kran und Festpreis-Garantie.'}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 animate-slide-up flex-wrap">
             <SmartLink link={heroData?.buttons?.primaryLink || `/${lang}/contact`} className="w-full sm:w-auto">
                <Button size="xl" className="w-full shadow-lg shadow-primary/30" data-tina-field={homeData?.hero?.buttons && tinaField(homeData.hero.buttons, 'primaryText')}>
                   {heroData?.buttons?.primaryText || 'Projekt anfragen'} <ArrowRight size={18} className="ml-2 shrink-0" />
                </Button>
             </SmartLink>
             <SmartLink link={heroData?.buttons?.secondaryLink || `/${lang}/career`} className="w-full sm:w-auto">
                <Button variant="outline" size="xl" className="w-full bg-white/10 text-white border-white/20 hover:bg-white/20" data-tina-field={homeData?.hero?.buttons && tinaField(homeData.hero.buttons, 'secondaryText')}>
                   {heroData?.buttons?.secondaryText || 'Karriere starten'}
                </Button>
             </SmartLink>
          </div>
        </div>

        {/* Right: Quick Inquiry Form (Conditional) */}
        {showQuickForm && (
          <div className="hidden md:block">
            <div className="bg-slate-800/90 supports-[backdrop-filter]:bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-sm shadow-2xl max-w-md ml-auto relative overflow-hidden animate-fade-in">
               {/* Decorative Blur */}
               <div className="absolute top-0 right-0 w-32 h-32 bg-primary rounded-full blur-[60px] opacity-30 -mr-10 -mt-10 pointer-events-none"></div>

              <QuickContactForm 
                source="hero" 
                formData={formData} 
                lang={lang}
                variant="dark"
              />
            </div>
          </div>
        )}
      </div>

      {/* Bottom Glass Bar (Desktop) */}
      <div className="relative z-20 border-t border-white/10 bg-slate-900/80 supports-[backdrop-filter]:bg-white/5 backdrop-blur-md hidden md:block">
         <div className="container mx-auto px-4 py-6 md:py-8">
           <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => {
                const Icon = getIcon(stat.icon || 'Users');
                return (
                  <div key={index} className="flex items-center gap-4">
                 <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-primary">
                        <Icon size={24} />
                 </div>
                 <div>
                        <h3 
                          className="text-2xl font-medium text-white leading-none mb-1"
                          data-tina-field={homeData?.stats && tinaField(homeData.stats[index], 'value')}
                        >
                          {stat.value}
                        </h3>
                        <p 
                          className="text-xs text-slate-300 uppercase tracking-wider font-bold"
                          data-tina-field={homeData?.stats && tinaField(homeData.stats[index], 'label')}
                        >
                          {stat.label}
                        </p>
                 </div>
              </div>
                );
              })}
           </div>
         </div>
      </div>

      {/* Stats Grid (Mobile) */}
      <div className="relative z-20 md:hidden border-t border-white/10 bg-slate-900/90 supports-[backdrop-filter]:bg-slate-900/80 backdrop-blur-md">
         <div className="container mx-auto px-4 py-8">
           <div className="grid grid-cols-2 gap-y-8 gap-x-4">
              {stats.map((stat, index) => {
                const Icon = getIcon(stat.icon || 'Users');
                return (
                  <div key={index} className="flex flex-col items-center text-center gap-2">
                     <Icon size={20} className="text-primary" />
                 <div>
                        <h3 
                          className="text-xl font-bold text-white leading-none mb-1"
                          data-tina-field={homeData?.stats && tinaField(homeData.stats[index], 'value')}
                        >
                          {stat.value}
                        </h3>
                        <p 
                          className="text-[10px] text-slate-300 uppercase tracking-wider font-bold"
                          data-tina-field={homeData?.stats && tinaField(homeData.stats[index], 'label')}
                        >
                          {stat.label}
                        </p>
                 </div>
              </div>
                );
              })}
           </div>
         </div>
      </div>
    </section>
  );
};
