import React, { useEffect, useState } from 'react';
import type { SupportedLang } from '@/shared/config/i18n';
import { cn } from '@/shared/lib/cn';
import { Button } from '@/shared/ui/Button';
import { Link } from 'react-router-dom';
import { useSettingsData } from '@/shared/lib/tina/useSettingsData';
import { tinaField } from 'tinacms/dist/react';

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
  const { data } = useSettingsData();
  
  const settings = data?.settings || {};
  const cookieBanner = settings.cookieBanner || {};
  
  // Default values with fallbacks
  const message = cookieBanner.message || 'Wir nutzen Cookies, um Ihnen die bestmögliche Erfahrung auf unserer Website zu bieten. Einige sind technisch notwendig, andere helfen uns, die Website zu verbessern.';
  const privacyLinkText = cookieBanner.privacyLinkText || 'Datenschutzerklärung';
  const cookieLinkText = cookieBanner.cookieLinkText || 'Cookie-Einstellungen';
  const rejectButtonText = cookieBanner.rejectButtonText || 'Nur notwendige';
  const acceptButtonText = cookieBanner.acceptButtonText || 'Alle akzeptieren';

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
            <p 
              className="text-sm text-slate-600 mb-2"
              data-tina-field={data?.settings?.cookieBanner && tinaField(data.settings.cookieBanner, 'message')}
            >
              {message}
            </p>
            <div className="flex gap-4 text-xs">
              <Link 
                to={`/${lang}/privacy`}
                className="text-slate-500 hover:text-primary underline"
                data-tina-field={data?.settings?.cookieBanner && tinaField(data.settings.cookieBanner, 'privacyLinkText')}
              >
                {privacyLinkText}
              </Link>
              <Link 
                to={`/${lang}/cookies`}
                className="text-slate-500 hover:text-primary underline"
                data-tina-field={data?.settings?.cookieBanner && tinaField(data.settings.cookieBanner, 'cookieLinkText')}
              >
                {cookieLinkText}
              </Link>
            </div>
          </div>
          <div className="flex gap-3 w-full lg:w-auto">
            <Button 
              variant="outline"
              onClick={handleRejectAll}
              className="flex-1 lg:flex-none text-slate-700 bg-white border-slate-300 hover:bg-slate-50"
              data-tina-field={data?.settings?.cookieBanner && tinaField(data.settings.cookieBanner, 'rejectButtonText')}
            >
              {rejectButtonText}
            </Button>
            <Button 
              onClick={handleAcceptAll}
              className="flex-1 lg:flex-none text-white"
              data-tina-field={data?.settings?.cookieBanner && tinaField(data.settings.cookieBanner, 'acceptButtonText')}
            >
              {acceptButtonText}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
