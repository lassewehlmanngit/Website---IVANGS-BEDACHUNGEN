import React, { useState, useEffect } from 'react';
import { ArrowRight, Users, Truck, Warehouse, Calendar, Mail, LucideIcon } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { Button } from '@/shared/ui/Button';
import { Link } from 'react-router-dom';
import type { HeroSettings } from '@/shared/lib/content/globals';
import { tinaField } from 'tinacms/dist/react';

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
    <section className="relative min-h-[85vh] flex flex-col justify-center bg-slate-900 overflow-hidden">
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
        
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/60 to-slate-900/40 z-10"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/grid-me.png')] opacity-10 z-10"></div>
      </div>

      <div className="relative z-20 container mx-auto px-4 py-20 lg:py-0 grid lg:grid-cols-2 gap-16 items-center flex-grow">
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
             <Link to={heroData?.primaryButtonLink || `/${lang}/contact`} className="w-full sm:w-auto">
                <Button className="w-full text-sm sm:text-base md:text-lg py-4 md:py-5 lg:py-6 px-5 md:px-6 lg:px-8 rounded-sm shadow-lg shadow-primary/30 whitespace-nowrap" data-tina-field={homeData?.hero && tinaField(homeData.hero, 'primaryButtonText')}>
                   {heroData?.primaryButtonText || 'Projekt anfragen'} <ArrowRight size={18} className="ml-2 shrink-0" />
                </Button>
             </Link>
             <Link to={heroData?.secondaryButtonLink || `/${lang}/career`} className="w-full sm:w-auto">
                <Button variant="outline" className="w-full text-sm sm:text-base md:text-lg py-4 md:py-5 lg:py-6 px-5 md:px-6 lg:px-8 rounded-sm bg-white/10 text-white border-white/20 hover:bg-white/20 whitespace-nowrap" data-tina-field={homeData?.hero && tinaField(homeData.hero, 'secondaryButtonText')}>
                   {heroData?.secondaryButtonText || 'Karriere starten'}
                </Button>
             </Link>
          </div>
        </div>

        {/* Right: Quick Inquiry Form (Conditional) */}
        {showQuickForm && (
          <div className="hidden md:block">
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-sm shadow-2xl max-w-md ml-auto relative overflow-hidden animate-fade-in">
               {/* Decorative Blur */}
               <div className="absolute top-0 right-0 w-32 h-32 bg-primary rounded-full blur-[60px] opacity-30 -mr-10 -mt-10 pointer-events-none"></div>

              <h3 className="text-h4 font-bold text-white mb-4 md:mb-6 flex items-center gap-2 relative z-10">
                <Mail size={20} className="text-primary shrink-0" /> Schnellanfrage
              </h3>
              <div className="space-y-4 relative z-10">
                <div>
                   <label htmlFor="hero-name" className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-1 block">Ihr Name</label>
                   <input id="hero-name" type="text" className="bg-slate-900/50 border border-white/10 text-white px-4 py-3 rounded-sm focus:outline-none focus:border-primary w-full text-sm transition-colors" placeholder="Max Mustermann" />
                </div>
                <div>
                   <label htmlFor="hero-contact" className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-1 block">E-Mail oder Telefon</label>
                   <input id="hero-contact" type="text" className="bg-slate-900/50 border border-white/10 text-white px-4 py-3 rounded-sm focus:outline-none focus:border-primary w-full text-sm transition-colors" placeholder="Kontaktmöglichkeit" />
                </div>
                
                <Link to={`/${lang}/contact`} className="block">
                  <button className="bg-white text-slate-900 hover:bg-slate-200 px-6 py-4 rounded-sm font-bold transition-all w-full flex items-center justify-center gap-2 shadow-lg mt-2">
                    Kostenlos anfragen <ArrowRight size={18} />
                  </button>
                </Link>
                <p className="text-[10px] text-slate-400 text-center">
                   Wir melden uns innerhalb von 24h. Unverbindlich.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Glass Bar (Desktop) */}
      <div className="relative z-20 border-t border-white/10 bg-white/5 backdrop-blur-md hidden md:block">
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
      <div className="relative z-20 md:hidden border-t border-white/10 bg-slate-900/80 backdrop-blur-md">
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
