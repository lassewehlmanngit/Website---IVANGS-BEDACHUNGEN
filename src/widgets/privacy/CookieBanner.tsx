import React, { useEffect, useState } from 'react';
import type { SupportedLang } from '@/shared/config/i18n';
import { cn } from '@/shared/lib/cn';
import { Button } from '@/shared/ui/Button';
import { Link } from 'react-router-dom';

type CookieConsent = 'accepted' | 'rejected' | 'custom';

const STORAGE_KEY = 'cookie-consent';

export interface CookieBannerProps {
  lang: SupportedLang;
  className?: string;
}

export const CookieBanner: React.FC<CookieBannerProps> = ({ lang, className }) => {
  const [consent, setConsent] = useState<CookieConsent | null>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setConsent(stored as CookieConsent);
    } else {
      setShow(true);
    }
  }, []);

  const updateConsent = (next: CookieConsent): void => {
    setConsent(next);
    setShow(false);
    localStorage.setItem(STORAGE_KEY, next);
  };

  if (!show) return null;

  return (
    <div className={cn(
      "fixed bottom-0 left-0 w-full bg-white border-t border-slate-200 shadow-[0_-5px_20px_-5px_rgba(0,0,0,0.1)] p-4 z-[55] animate-slide-up mb-16 md:mb-0",
      className
    )}>
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-slate-600">
          {lang === 'de' 
            ? 'Wir nutzen Cookies, um Ihnen die bestmögliche Erfahrung auf unserer Website zu bieten.' 
            : 'We use cookies to ensure you get the best experience on our website.'}
        </p>
        <div className="flex gap-3">
          <Link 
            to={`/${lang}/cookies`}
            className="text-sm font-medium text-slate-500 hover:text-slate-800 px-3 py-2 flex items-center"
          >
            {lang === 'de' ? 'Einstellungen' : 'Settings'}
          </Link>
          <Button 
            variant="outline"
            onClick={() => updateConsent('rejected')}
            className="text-slate-700 bg-white border-slate-300 hover:bg-slate-50"
          >
            {lang === 'de' ? 'Ablehnen' : 'Decline'}
          </Button>
          <Button 
            onClick={() => updateConsent('accepted')}
            className="text-white"
          >
            {lang === 'de' ? 'Akzeptieren' : 'Accept'}
          </Button>
        </div>
      </div>
    </div>
  );
};
