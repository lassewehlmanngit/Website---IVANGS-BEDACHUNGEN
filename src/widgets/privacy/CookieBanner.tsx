import React, { useEffect, useState } from 'react';
import type { SupportedLang } from '@/shared/config/i18n';
import { cn } from '@/shared/lib/cn';
import { Button } from '@/shared/ui/Button';
import { Link } from 'react-router-dom';

export type CookieConsentStatus = 'accepted' | 'rejected' | 'custom';

export interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
}

export interface CookieSettings {
  status: CookieConsentStatus;
  preferences: CookiePreferences;
}

export const COOKIE_STORAGE_KEY = 'cookie-consent-settings';

export interface CookieBannerProps {
  lang: SupportedLang;
  className?: string;
}

export const CookieBanner: React.FC<CookieBannerProps> = ({ lang, className }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(COOKIE_STORAGE_KEY);
    if (!stored) {
      setShow(true);
    }
  }, []);

  const handleAcceptAll = () => {
    const settings: CookieSettings = {
      status: 'accepted',
      preferences: { essential: true, analytics: true, marketing: true }
    };
    localStorage.setItem(COOKIE_STORAGE_KEY, JSON.stringify(settings));
    setShow(false);
    window.dispatchEvent(new Event('cookie-settings-changed'));
  };

  const handleRejectAll = () => {
    const settings: CookieSettings = {
      status: 'rejected',
      preferences: { essential: true, analytics: false, marketing: false }
    };
    localStorage.setItem(COOKIE_STORAGE_KEY, JSON.stringify(settings));
    setShow(false);
    window.dispatchEvent(new Event('cookie-settings-changed'));
  };

  if (!show) return null;

  return (
    <div className={cn(
      "fixed bottom-0 left-0 w-full bg-white border-t border-slate-200 shadow-[0_-5px_20px_-5px_rgba(0,0,0,0.1)] p-4 md:p-6 z-[55] animate-fade-in mb-16 md:mb-0",
      className
    )}>
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="flex-1">
            <p className="text-sm text-slate-600 mb-2">
              {lang === 'de'
                ? 'Wir nutzen Cookies, um Ihnen die bestmögliche Erfahrung auf unserer Website zu bieten. Einige sind technisch notwendig, andere helfen uns, die Website zu verbessern.' 
                : 'We use cookies to ensure you get the best experience on our website. Some are technically necessary, others help us improve the site.'}
            </p>
            <div className="flex gap-4 text-xs">
              <Link 
                to={`/${lang}/privacy`}
                className="text-slate-500 hover:text-primary underline"
              >
                {lang === 'de' ? 'Datenschutzerklärung' : 'Privacy Policy'}
              </Link>
              <Link 
                to={`/${lang}/cookies`}
                className="text-slate-500 hover:text-primary underline"
              >
                {lang === 'de' ? 'Cookie-Einstellungen' : 'Cookie Settings'}
              </Link>
            </div>
          </div>
          <div className="flex gap-3 w-full lg:w-auto">
            <Button 
              variant="outline"
              onClick={handleRejectAll}
              className="flex-1 lg:flex-none text-slate-700 bg-white border-slate-300 hover:bg-slate-50"
            >
              {lang === 'de' ? 'Nur notwendige' : 'Essential only'}
            </Button>
            <Button 
              onClick={handleAcceptAll}
              className="flex-1 lg:flex-none text-white"
            >
              {lang === 'de' ? 'Alle akzeptieren' : 'Accept all'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
