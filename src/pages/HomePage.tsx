import React, { useEffect, useState } from 'react';
import type { SupportedLang } from '@/shared/config/i18n';
import { Seo } from '@/shared/ui/Seo';
import { HeroSection } from '@/widgets/home/ui/HeroSection';
import { ServiceNavigationStrip } from '@/widgets/home/ui/ServiceNavigationStrip';
import { ServicePreview } from '@/widgets/home/ui/ServicePreview';
import { TrustIndicators } from '@/widgets/home/ui/TrustIndicators';
import { CeoQuote } from '@/widgets/home/ui/CeoQuote';
import { ProjectShowcase } from '@/widgets/home/ui/ProjectShowcase';
import { HomeFAQ } from '@/widgets/home/ui/HomeFAQ';
import { Link } from 'react-router-dom';
import { Button } from '@/shared/ui/Button';
import { getSettings, type SettingsData } from '@/shared/lib/content/globals';

export interface HomePageProps {
  lang: SupportedLang;
}

export const HomePage: React.FC<HomePageProps> = ({ lang }) => {
  const [settings, setSettings] = useState<SettingsData | null>(null);

  useEffect(() => {
    getSettings(lang).then(setSettings);
  }, [lang]);

  return (
    <>
      <Seo
        title="Ivangs Bedachungen - Meisterbetrieb seit 1996"
        description="Dächer, die begeistern. Ob Sanierung, Neubau oder Reparatur: Wir schützen, was Ihnen wichtig ist. 28 Experten, eigener Kran, Festpreis."
        ogLocale="de_DE"
        ogSiteName="Ivangs Bedachungen"
        localBusiness={{
            name: "Ivangs Bedachungen GmbH & Co. KG",
            telephone: "+49 2162 356666",
            email: "bedachungen@ivangs.de",
            address: {
                streetAddress: "Schmiedestraße 37",
                addressLocality: "Viersen - Süchteln",
                postalCode: "41749",
                addressCountry: "DE"
            }
        }}
      />
      <HeroSection lang={lang} settings={settings?.hero} />
      <ServiceNavigationStrip lang={lang} />
      <ServicePreview lang={lang} />
      <TrustIndicators />
      <CeoQuote lang={lang} />
      <ProjectShowcase />
      <HomeFAQ lang={lang} />
      
      {/* Final CTA */}
      <section className="py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Planen Sie sicher. Planen Sie mit Ivangs.</h2>
          <p className="text-primary-foreground/80 text-xl max-w-2xl mx-auto mb-10">
            Bevor der erste Hammer fällt, beraten wir Sie ausführlich. Gerne auch gemeinsam mit Ihrem Architekten.
          </p>
          <div className="flex justify-center gap-4">
            <Link to={`/${lang}/contact`}>
                <Button variant="secondary" className="bg-white text-primary hover:bg-white/90 px-8 py-6 text-lg rounded-sm shadow-xl font-bold">
                  Beratungstermin vereinbaren
                </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};
