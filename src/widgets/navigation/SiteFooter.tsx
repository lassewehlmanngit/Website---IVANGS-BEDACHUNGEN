import React from 'react';
import { Link } from 'react-router-dom';
import { Hammer, Facebook, Instagram, MapPin, Phone, Mail, ArrowRight, Twitter, Linkedin } from 'lucide-react';
import type { SupportedLang } from '@/shared/config/i18n';
import { useFooterData } from '@/shared/lib/tina/useFooterData';
import { useContactPageData } from '@/shared/lib/tina/useContactPageData';
import { tinaField } from 'tinacms/dist/react';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/shared/ui/Accordion';

export interface SiteFooterProps {
  lang: SupportedLang;
}

const SocialIcon = ({ platform }: { platform: string }) => {
  switch (platform.toLowerCase()) {
    case 'facebook': return <Facebook size={18} />;
    case 'instagram': return <Instagram size={18} />;
    case 'twitter': return <Twitter size={18} />;
    case 'linkedin': return <Linkedin size={18} />;
    default: return null;
  }
};

export const SiteFooter: React.FC<SiteFooterProps> = ({ lang }) => {
  const { data } = useFooterData(lang);
  const { data: contactData } = useContactPageData(lang);
  const footer = data?.footer || { links: [], social: [] };
  const contact = contactData?.contactPage || {};
  const year = new Date().getFullYear();

  // Brand section content (shared between mobile and desktop)
  const BrandContent = () => (
    <>
      <div className="flex items-center gap-2 mb-6 text-white">
        <div className="bg-primary p-1.5 rounded-sm text-primary-foreground">
          <Hammer size={20} />
        </div>
        <span className="text-xl font-bold">IVANGS</span>
      </div>
      <p 
        className="text-slate-300 text-sm leading-relaxed mb-6"
        data-tina-field={contactData?.contactPage?.address && tinaField(contactData.contactPage.address, 'company')}
      >
        {contact.address?.company || 'Ivangs Bedachungen GmbH & Co. KG'} – Ihr Meisterbetrieb für Bedachungen, Fassaden und Bauklempnerei im Kreis Viersen.
      </p>
      <div className="flex gap-4">
        {footer.social.map((s: any, index: number) => {
          const Icon = SocialIcon({ platform: s.platform });
          if (!Icon) return null;
          return (
            <a 
              key={s.platform}
              href={s.url} 
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-slate-800 rounded-full hover:bg-primary transition-colors text-white" 
              aria-label={s.platform}
              data-tina-field={data?.footer?.social && tinaField(data.footer.social[index], 'url')}
            >
              {Icon}
            </a>
          );
        })}
      </div>
    </>
  );

  // Contact section content
  const ContactContent = () => (
    <ul className="space-y-4 text-sm">
      <li className="flex items-start gap-3">
        <MapPin size={18} className="text-primary shrink-0 mt-0.5" />
        <span data-tina-field={contactData?.contactPage?.address && tinaField(contactData.contactPage.address, 'street')}>
          {contact.address?.street || 'Schmiedestraße 37'}<br />
          <span data-tina-field={contactData?.contactPage?.address && tinaField(contactData.contactPage.address, 'zip')}>
            {contact.address?.zip || '41749'}{' '}
          </span>
          <span data-tina-field={contactData?.contactPage?.address && tinaField(contactData.contactPage.address, 'city')}>
            {contact.address?.city || 'Viersen - Süchteln'}
          </span>
        </span>
      </li>
      <li className="flex items-center gap-3">
        <Phone size={18} className="text-primary shrink-0" />
        <a 
          href={`tel:${contact.phone?.replace(/\s/g, '') || '+4921623566666'}`}
          className="hover:text-white transition-colors"
          data-tina-field={contactData?.contactPage && tinaField(contactData.contactPage, 'phone')}
        >
          {contact.phone || '+49 (0) 21 62 – 35 66 66'}
        </a>
      </li>
      <li className="flex items-center gap-3">
        <Mail size={18} className="text-primary shrink-0" />
        <a 
          href={`mailto:${contact.email || 'bedachungen@ivangs.de'}`}
          className="hover:text-white transition-colors"
          data-tina-field={contactData?.contactPage && tinaField(contactData.contactPage, 'email')}
        >
          {contact.email || 'bedachungen@ivangs.de'}
        </a>
      </li>
    </ul>
  );

  // Office hours content
  const OfficeHoursContent = () => (
    <div className="mt-6 pt-4 border-t border-slate-700">
      <p className="text-xs text-slate-400 mb-2">Öffnungszeiten Büro:</p>
      <p 
        className="text-sm"
        data-tina-field={contactData?.contactPage?.officeHours && tinaField(contactData.contactPage.officeHours, 'weekdays')}
      >
        {contact.officeHours?.weekdays || 'Mo – Fr: 07.00 – 17.00 Uhr'}
      </p>
    </div>
  );

  // Legal links content
  const LegalContent = () => (
    <ul className="space-y-3 text-sm">
      {footer.links.length > 0 ? footer.links.map((link: any, index: number) => (
        <li key={link.href}>
          <Link 
            to={`/${lang}${link.href}`} 
            className="hover:text-white transition-colors"
            data-tina-field={data?.footer?.links && tinaField(data.footer.links[index], 'label')}
          >
            {link.label}
          </Link>
        </li>
      )) : (
        <>
          <li><Link to={`/${lang}/imprint`} className="hover:text-white transition-colors">Impressum</Link></li>
          <li><Link to={`/${lang}/privacy`} className="hover:text-white transition-colors">Datenschutz</Link></li>
          <li><Link to={`/${lang}/terms`} className="hover:text-white transition-colors">AGB</Link></li>
          <li><Link to={`/${lang}/cookies`} className="hover:text-white transition-colors">Cookie Einstellungen</Link></li>
        </>
      )}
    </ul>
  );

  // Career content
  const CareerContent = () => (
    <>
      <p className="text-sm text-slate-300 mb-4">
        Werde Teil unseres 28-köpfigen Teams. Wir bilden aus!
      </p>
      <Link 
        to={`/${lang}/career`}
        className="text-primary hover:text-white text-sm font-medium flex items-center gap-2 transition-colors"
      >
        Zu den Stellenangeboten <ArrowRight size={16} />
      </Link>
    </>
  );

  return (
    <footer className="bg-slate-900 text-slate-300 py-16 mb-16 md:mb-0">
      {/* Desktop Layout */}
      <div className="container mx-auto px-4 hidden md:grid md:grid-cols-4 gap-12">
        {/* Brand Column */}
        <div>
          <BrandContent />
        </div>

        {/* Contact Column */}
        <div>
          <h3 className="text-white font-semibold mb-6">Kontakt</h3>
          <ContactContent />
          <OfficeHoursContent />
        </div>

        {/* Legal Column */}
        <div>
          <h3 className="text-white font-semibold mb-6">Rechtliches</h3>
          <LegalContent />
        </div>

        {/* Career Column */}
        <div>
          <h3 className="text-white font-semibold mb-6">Karriere</h3>
          <CareerContent />
        </div>
      </div>

      {/* Mobile Layout with Accordions */}
      <div className="container mx-auto px-4 md:hidden">
        {/* Brand section is always visible on mobile */}
        <div className="mb-8">
          <BrandContent />
        </div>

        {/* Accordion sections for mobile */}
        <Accordion type="multiple" className="bg-slate-800 border-slate-700">
          <AccordionItem value="contact">
            <AccordionTrigger className="text-white hover:bg-slate-700">
              Kontakt
            </AccordionTrigger>
            <AccordionContent className="text-slate-300">
              <ContactContent />
              <OfficeHoursContent />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="legal">
            <AccordionTrigger className="text-white hover:bg-slate-700">
              Rechtliches
            </AccordionTrigger>
            <AccordionContent className="text-slate-300">
              <LegalContent />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="career">
            <AccordionTrigger className="text-white hover:bg-slate-700">
              Karriere
            </AccordionTrigger>
            <AccordionContent className="text-slate-300">
              <CareerContent />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <div className="container mx-auto px-4 mt-12 pt-8 border-t border-slate-800 text-center text-xs text-slate-500">
        <span data-tina-field={data?.footer && tinaField(data.footer, 'copyright')}>
          {footer.copyright || `© ${year} Ivangs Bedachungen GmbH & Co. KG. Alle Rechte vorbehalten.`}
        </span>
      </div>
    </footer>
  );
};
