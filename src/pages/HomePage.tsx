import React from 'react';
import type { SupportedLang } from '@/shared/config/i18n';
import { Seo } from '@/shared/ui/Seo';
import { HeroSection } from '@/widgets/home/ui/HeroSection';
import { MobileQuickForm } from '@/widgets/home/ui/MobileQuickForm';
import { ServiceNavigationStrip } from '@/widgets/home/ui/ServiceNavigationStrip';
import { ServicePreview } from '@/widgets/home/ui/ServicePreview';
import { TrustIndicators } from '@/widgets/home/ui/TrustIndicators';
import { CeoQuote } from '@/widgets/home/ui/CeoQuote';
import { ProjectShowcase } from '@/widgets/home/ui/ProjectShowcase';
import { HomeFAQ } from '@/widgets/home/ui/HomeFAQ';
import { Button } from '@/shared/ui/Button';
import { SmartLink } from '@/shared/ui/SmartLink';
import { Skeleton, SkeletonCard, SkeletonText } from '@/shared/ui/Skeleton';
import { tinaField } from 'tinacms/dist/react';
import { usePageContent } from '@/shared/lib/tina/usePageContent';

export interface HomePageProps {
  lang: SupportedLang;
}

export const HomePage: React.FC<HomePageProps> = ({ lang }) => {
  // Fetch home page data and global settings from TinaCMS with visual editing support
  const { page: home, global, isLoading } = usePageContent('home');
  
  // Show loading state
  if (isLoading) {
    return (
      <div className="animate-fade-in">
        <div className="container mx-auto px-4 py-16 md:py-24 space-y-16">
          <Skeleton variant="rectangular" height={400} className="rounded-lg" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
          <SkeletonText lines={5} />
        </div>
      </div>
    );
  }
  
  // Show error state or fallback
  if (!home) {
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
        <HeroSection lang={lang} />
        <ServiceNavigationStrip lang={lang} />
        <ServicePreview lang={lang} />
        <TrustIndicators />
        <CeoQuote lang={lang} />
        <ProjectShowcase />
        <HomeFAQ lang={lang} />
        
        {/* Final CTA */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-primary via-primary-600 to-primary-700 text-white relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1)_0%,transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.05)_0%,transparent_40%)]"></div>
          
          <div className="container mx-auto px-4 text-center relative z-10">
            <h2 className="text-h2 font-bold mb-4 md:mb-6 text-white">Planen Sie sicher. Planen Sie mit Ivangs.</h2>
            <p className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto mb-8 md:mb-10">
              Bevor der erste Hammer fällt, beraten wir Sie ausführlich. Gerne auch gemeinsam mit Ihrem Architekten.
            </p>
            <div className="flex justify-center gap-4">
              <SmartLink link={`/${lang}/contact`}>
                  <Button variant="secondary" size="xl" className="bg-white text-primary hover:bg-slate-50 shadow-lg">
                    Beratungstermin vereinbaren
                  </Button>
              </SmartLink>
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <Seo
        title={home.seo?.title || "Ivangs Bedachungen - Meisterbetrieb seit 1996"}
        description={home.seo?.description || "Dächer, die begeistern. Ob Sanierung, Neubau oder Reparatur: Wir schützen, was Ihnen wichtig ist. 28 Experten, eigener Kran, Festpreis."}
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
      <HeroSection lang={lang} settings={home.hero} homeData={home} />
      
      {/* Mobile Quick Form (Visible only on mobile) */}
      <MobileQuickForm lang={lang} data={home} />

      <ServiceNavigationStrip lang={lang} />
      <ServicePreview lang={lang} homeData={home} />
      <TrustIndicators trustData={home.trustIndicators} />
      <CeoQuote lang={lang} ceoData={home.ceoQuote} />
      <ProjectShowcase homeData={home} projects={home.projectsSection?.items} />
      <HomeFAQ lang={lang} homeData={home} faqData={home.faqSection?.questions} faqCTA={home.faqSection?.cta} />
      
      {/* Final CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-primary via-primary-600 to-primary-700 text-white relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1)_0%,transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.05)_0%,transparent_40%)]"></div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-h2 font-bold mb-4 md:mb-6 text-white" data-tina-field={home.finalCTA && tinaField(home.finalCTA, 'title')}>
            {home.finalCTA?.title || 'Planen Sie sicher. Planen Sie mit Ivangs.'}
          </h2>
          <p className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto mb-8 md:mb-10" data-tina-field={home.finalCTA && tinaField(home.finalCTA, 'description')}>
            {home.finalCTA?.description || 'Bevor der erste Hammer fällt, beraten wir Sie ausführlich. Gerne auch gemeinsam mit Ihrem Architekten.'}
          </p>
          <div className="flex justify-center gap-4">
            <SmartLink link={home.finalCTA?.buttonLink || `/${lang}/contact`}>
                <Button variant="secondary" size="xl" className="bg-white text-primary hover:bg-slate-50 shadow-lg" data-tina-field={home.finalCTA && tinaField(home.finalCTA, 'buttonText')}>
                  {home.finalCTA?.buttonText || 'Beratungstermin vereinbaren'}
                </Button>
            </SmartLink>
          </div>
        </div>
      </section>
    </>
  );
};
