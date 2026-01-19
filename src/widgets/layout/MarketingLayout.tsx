import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { SupportedLang } from '@/shared/config/i18n';
import { SiteHeader } from '@/widgets/navigation/SiteHeader';
import { SiteFooter } from '@/widgets/navigation/SiteFooter';
import { CookieBanner } from '@/widgets/privacy/CookieBanner';
import { MobileNav } from '@/widgets/navigation/MobileNav';
import { Toaster } from '@/shared/ui/Toaster';

export interface MarketingLayoutProps {
  lang: SupportedLang;
  children: React.ReactNode;
}

export const MarketingLayout: React.FC<MarketingLayoutProps> = ({ lang, children }) => {
  const { t } = useTranslation('common');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-dvh bg-background text-foreground pb-16 md:pb-0">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-primary-foreground"
      >
        {t('navigation.skipToContent')}
      </a>

      <SiteHeader lang={lang} mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />

      <main id="main-content" className="min-h-[60dvh]">
        {children}
      </main>

      <SiteFooter lang={lang} />
      <CookieBanner lang={lang} />
      <MobileNav lang={lang} onMenuClick={() => setMobileMenuOpen(true)} />
      <Toaster />
    </div>
  );
};

