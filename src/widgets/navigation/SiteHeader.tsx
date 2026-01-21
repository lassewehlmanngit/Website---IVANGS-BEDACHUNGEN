import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, Hammer, X } from 'lucide-react';
import type { SupportedLang } from '@/shared/config/i18n';
import { cn } from '@/shared/lib/cn';
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

  // Lock body scroll when menu is open
  React.useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

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
      <header className="w-full bg-white/95 backdrop-blur-md border-b border-slate-100">
        {/* Increased vertical padding (py-5 to py-6) for cleaner look */}
        <div className="container flex items-center justify-between py-5 md:py-6">
            {/* Logo Section */}
            <Link 
              to={`/${lang}`} 
              className="flex items-center gap-3 cursor-pointer group relative z-50"
              onClick={() => setMobileMenuOpen(false)}
            >
              <div className="bg-primary p-2.5 rounded-sm text-primary-foreground shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform">
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
            className="hidden items-center gap-8 md:flex"
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

          {/* Mobile menu button - Z-Index 50 to sit above full screen menu */}
          <div className="md:hidden z-50">
             <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-slate-900 hover:text-primary transition-colors"
                aria-label={t('navigation.menu')}
             >
                {/* Switch icon based on state */}
                {mobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
             </button>
          </div>

          {/* Full Page Mobile Menu Overlay */}
          <div 
            className={cn(
              "fixed inset-0 bg-white z-40 flex flex-col pt-32 px-6 pb-12 transition-all duration-300 ease-out md:hidden overflow-y-auto",
              mobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"
            )}
          >
            <nav className="flex flex-col gap-6 text-center">
              {nav.items.map((item: any, index: number) => (
                <NavLink
                  key={item.href}
                  to={`/${lang}${item.href}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) => cn(
                    "text-3xl font-bold tracking-tight transition-colors",
                    isActive ? "text-primary" : "text-slate-900"
                  )}
                  data-tina-field={data?.navigation?.items && tinaField(data.navigation.items[index], 'label')}
                >
                  {item.label}
                </NavLink>
              ))}
              
              <hr className="border-slate-100 my-4" />
              
              <div className="grid grid-cols-2 gap-3">
                 {serviceLinks.map((service) => (
                    <Link
                      key={service.id}
                      to={`/${lang}/services/${service.id}`}
                      onClick={() => setMobileMenuOpen(false)}
                      className="bg-slate-50 p-4 rounded-lg text-sm font-bold text-slate-700 hover:bg-slate-100 hover:text-primary transition-colors border border-slate-100"
                    >
                      {service.label}
                    </Link>
                 ))}
              </div>

              <div className="mt-auto pt-8">
                 <Button 
                   className="w-full py-6 text-lg font-bold shadow-xl shadow-primary/20" 
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
          </div>

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
