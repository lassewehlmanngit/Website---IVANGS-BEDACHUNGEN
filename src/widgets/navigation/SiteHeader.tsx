import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, Hammer } from 'lucide-react';
import type { SupportedLang } from '@/shared/config/i18n';
import { cn } from '@/shared/lib/cn';
import { Drawer } from '@/shared/ui/Drawer';
import { Button } from '@/shared/ui/Button';
import { useNavigationData } from '@/shared/lib/tina/useNavigationData';
import { tinaField } from 'tinacms/dist/react';

export interface SiteHeaderProps {
  lang: SupportedLang;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

export const SiteHeader: React.FC<SiteHeaderProps> = ({ lang, mobileMenuOpen, setMobileMenuOpen }) => {
  const { t } = useTranslation('common');
  const { data } = useNavigationData(lang);
  const nav = data?.navigation || { items: [] };
  const navigate = useNavigate();

  // CTA button data with fallbacks
  const ctaText = nav.ctaButton?.text || 'Angebot anfragen';
  const ctaLink = nav.ctaButton?.link || `/${lang}/contact`;

  const linkClassName = ({ isActive }: { isActive: boolean }): string =>
    cn(
      'rounded-md px-3 py-2 text-sm font-medium text-slate-600 hover:text-primary transition-colors',
      isActive && 'text-primary',
    );

  const mobileLinkClassName = ({ isActive }: { isActive: boolean }): string =>
    cn(
      'block rounded-md px-3 py-3 text-base font-medium text-foreground/80 hover:text-foreground hover:bg-muted',
      isActive && 'bg-muted text-foreground',
    );

  const serviceLinks = [
    { id: 'steildach', label: 'Steildach' },
    { id: 'flachdach', label: 'Flachdach' },
    { id: 'solar', label: 'Solar & PV' },
    { id: 'fenster', label: 'Fenster' },
    { id: 'sanierung', label: 'Sanierung' },
  ];

  return (
    <div className="sticky top-0 z-40 flex flex-col shadow-sm transition-all duration-300">
      <header className="w-full bg-white supports-[backdrop-filter]:bg-white/95 backdrop-blur-md border-b border-slate-100">
        <div className="container flex h-20 items-center justify-between py-2">
            {/* Logo */}
            <Link to={`/${lang}`} className="flex items-center gap-2 cursor-pointer group">
              <div className="bg-primary p-2 rounded-sm text-primary-foreground shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform">
                <Hammer size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-bold leading-none text-foreground tracking-tight">
                  IVANGS
                </h1>
                <span className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Bedachungen</span>
              </div>
            </Link>

          {/* Desktop navigation */}
          <nav
            aria-label={t('navigation.mainNavigation')}
            className="hidden items-center gap-6 md:flex"
          >
            {nav.items.map((item: any, index: number) => (
              <NavLink 
                key={item.href} 
                to={`/${lang}${item.href}`} 
                className={linkClassName}
                data-tina-field={data?.navigation?.items && tinaField(data.navigation.items[index], 'label')}
              >
                {item.label}
              </NavLink>
            ))}
            <Button 
                onClick={() => navigate(ctaLink)}
                className="shadow-lg shadow-primary/20"
                data-tina-field={data?.navigation?.ctaButton && tinaField(data.navigation.ctaButton, 'text')}
            >
                {ctaText}
            </Button>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
             <button
                onClick={() => setMobileMenuOpen(true)}
                className="p-2 text-slate-600 hover:text-primary transition-colors"
                aria-label={t('navigation.menu')}
             >
                <Menu size={28} />
             </button>
          </div>

          {/* Mobile drawer */}
          <Drawer
            open={mobileMenuOpen}
            onClose={() => setMobileMenuOpen(false)}
            side="right"
            title={t('navigation.menu')}
            fullWidth={true}
          >
            <nav
              aria-label={t('navigation.mobileNavigation')}
              className="flex flex-col gap-4 mt-4"
            >
              {nav.items.map((item: any, index: number) => (
                <NavLink
                  key={item.href}
                  to={`/${lang}${item.href}`}
                  className={({ isActive }) => cn(
                    "block w-full text-left text-3xl font-bold py-2 border-b border-border/50",
                    isActive ? "text-primary" : "text-foreground"
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                  data-tina-field={data?.navigation?.items && tinaField(data.navigation.items[index], 'label')}
                >
                  {item.label}
                </NavLink>
              ))}
              
              <div className="mt-4">
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-2">Leistungen</span>
                <div className="grid grid-cols-1 gap-2">
                  {serviceLinks.map((service) => (
                     <NavLink
                        key={service.id}
                        to={`/${lang}/services/${service.id}`}
                        className={({ isActive }) => cn(
                          "p-3 rounded-xl border text-left text-lg font-medium transition-colors flex items-center justify-between",
                          isActive
                          ? "bg-primary/10 border-primary/20 text-primary"
                          : "bg-background border-border text-muted-foreground"
                        )}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {service.label}
                      </NavLink>
                  ))}
                </div>
              </div>

               <div className="mt-8">
                 <Button 
                   className="w-full py-6 text-lg" 
                   onClick={() => {
                     navigate(ctaLink);
                    setMobileMenuOpen(false);
                   }}
                   data-tina-field={data?.navigation?.ctaButton && tinaField(data.navigation.ctaButton, 'text')}
                 >
                   {ctaText}
                 </Button>
               </div>
            </nav>
          </Drawer>
        </div>
      </header>
      
      {/* Secondary Service Nav (Desktop Only) */}
      <div className="hidden md:block bg-slate-50 border-b border-slate-200">
           <div className="container h-12 flex items-center gap-8">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Leistungen:</span>
              {serviceLinks.map((service) => (
                <NavLink
                    key={service.id}
                    to={`/${lang}/services/${service.id}`}
                    className={({ isActive }) => cn(
                        "text-sm font-medium transition-colors hover:text-primary relative group py-3",
                        isActive ? "text-primary" : "text-muted-foreground"
                    )}
                >
                    {({ isActive }) => (
                      <>
                        <span>{service.label}</span>
                        <span 
                          className={cn(
                            "absolute bottom-0 left-0 h-0.5 bg-primary transition-all duration-300",
                            isActive ? "w-full" : "w-0 group-hover:w-full"
                          )}
                        ></span>
                      </>
                    )}
                </NavLink>
              ))}
           </div>
      </div>
    </div>
  );
};
