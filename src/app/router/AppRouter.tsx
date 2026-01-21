import React, { useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useNavigate, useParams } from 'react-router-dom';
import { ScrollHandler } from './ScrollHandler';
import { SUPPORTED_LANGS, type SupportedLang } from '@/shared/config/i18n';
import { MarketingLayout } from '@/widgets/layout/MarketingLayout';
import { HomePage } from '@/pages/HomePage';
import { AboutPage } from '@/pages/AboutPage';
import { CareerPage } from '@/pages/CareerPage';
import { ContactPage } from '@/pages/ContactPage';
import { DynamicPage } from '@/pages/DynamicPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { DesignSystemPage } from '@/pages/DesignSystemPage';
import { ServiceDetailPage } from '@/pages/service-detail/ui/ServiceDetailPage';
import { ImprintPage } from '@/pages/legal/ui/ImprintPage';
import { PrivacyPage } from '@/pages/legal/ui/PrivacyPage';
import { TermsPage } from '@/pages/legal/ui/TermsPage';
import { CookieSettingsPage } from '@/pages/legal/ui/CookieSettingsPage';

const detectBrowserLanguage = (): SupportedLang => {
  // Default to German for IVANGS (German business)
  return 'de';
};

const isSupportedLang = (lang: string): lang is SupportedLang => {
  return (SUPPORTED_LANGS as readonly string[]).includes(lang);
};

const LanguageWrapper: React.FC = () => {
  const { lang } = useParams<{ lang: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    if (!lang) return;
    if (!isSupportedLang(lang)) {
      navigate('/de', { replace: true });
      return;
    }
    document.documentElement.lang = lang;
  }, [lang, navigate]);

  const safeLang: SupportedLang = lang && isSupportedLang(lang) ? lang : 'en';

  return (
    <MarketingLayout lang={safeLang}>
      <Routes>
        {/* Home page */}
        <Route path="/" element={<HomePage lang={safeLang} />} />
        
        {/* Service detail pages */}
        <Route path="/services/:id" element={<ServiceDetailPage lang={safeLang} />} />
        
        {/* Singleton pages (about, career, contact) */}
        <Route path="/about" element={<AboutPage lang={safeLang} />} />
        <Route path="/career" element={<CareerPage lang={safeLang} />} />
        <Route path="/contact" element={<ContactPage lang={safeLang} />} />
        
        {/* Legal pages */}
        <Route path="/imprint" element={<ImprintPage lang={safeLang} />} />
        <Route path="/privacy" element={<PrivacyPage lang={safeLang} />} />
        <Route path="/terms" element={<TermsPage lang={safeLang} />} />
        <Route path="/cookies" element={<CookieSettingsPage lang={safeLang} />} />
        
        {/* 404 Page */}
        <Route path="/404" element={<NotFoundPage lang={safeLang} />} />

        {/* Dynamic catch-all for any other page slugs */}
        <Route path="*" element={<DynamicPage lang={safeLang} />} />
      </Routes>
    </MarketingLayout>
  );
};

export const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <ScrollHandler />
      <Routes>
        <Route path="/design-system" element={<MarketingLayout lang="de"><DesignSystemPage /></MarketingLayout>} />
        <Route path="/" element={<Navigate to={`/${detectBrowserLanguage()}`} replace />} />
        <Route path="/:lang/*" element={<LanguageWrapper />} />
        <Route path="*" element={<Navigate to="/de" replace />} />
      </Routes>
    </BrowserRouter>
  );
};
