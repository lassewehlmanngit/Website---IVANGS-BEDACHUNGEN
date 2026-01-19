import React, { useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useNavigate, useParams } from 'react-router-dom';
import { ScrollHandler } from './ScrollHandler';
import { SUPPORTED_LANGS, type SupportedLang } from '@/shared/config/i18n';
import { MarketingLayout } from '@/widgets/layout/MarketingLayout';
import { HomePage } from '@/pages/HomePage';
import { GenericPage } from '@/pages/GenericPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { DesignSystemPage } from '@/pages/DesignSystemPage';
import { ServicesPage } from '@/pages/services/ui/ServicesPage';
import { ServiceDetailPage } from '@/pages/service-detail/ui/ServiceDetailPage';
import { CareerPage } from '@/pages/career/ui/CareerPage';
import { ContactPage } from '@/pages/contact/ui/ContactPage';

const detectBrowserLanguage = (): SupportedLang => {
  const browserLang = navigator.language || 'en';
  if (browserLang.toLowerCase().startsWith('de')) return 'de';
  return 'en';
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
      navigate('/en', { replace: true });
      return;
    }
    document.documentElement.lang = lang;
  }, [lang, navigate]);

  const safeLang: SupportedLang = lang && isSupportedLang(lang) ? lang : 'en';

  return (
    <MarketingLayout lang={safeLang}>
      <Routes>
        <Route path="/" element={<HomePage lang={safeLang} />} />
        <Route path="/services" element={<ServicesPage lang={safeLang} />} />
        <Route path="/services/:id" element={<ServiceDetailPage lang={safeLang} />} />
        <Route path="/career" element={<CareerPage lang={safeLang} />} />
        <Route path="/contact" element={<ContactPage lang={safeLang} />} />
        <Route path="/:slug" element={<GenericPage lang={safeLang} />} />
        <Route path="*" element={<NotFoundPage lang={safeLang} />} />
      </Routes>
    </MarketingLayout>
  );
};

export const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <ScrollHandler />
      <Routes>
        <Route path="/design-system" element={<MarketingLayout lang="en"><DesignSystemPage /></MarketingLayout>} />
        <Route path="/" element={<Navigate to={`/${detectBrowserLanguage()}`} replace />} />
        <Route path="/:lang/*" element={<LanguageWrapper />} />
        <Route path="*" element={<Navigate to="/en" replace />} />
      </Routes>
    </BrowserRouter>
  );
};
