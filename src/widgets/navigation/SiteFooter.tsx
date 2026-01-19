import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Hammer, Facebook, Instagram, MapPin, Phone, Mail, ArrowRight } from 'lucide-react';
import type { SupportedLang } from '@/shared/config/i18n';
import { getFooter, type FooterData } from '@/shared/lib/content/globals';

export interface SiteFooterProps {
  lang: SupportedLang;
}

export const SiteFooter: React.FC<SiteFooterProps> = ({ lang }) => {
  const [footer, setFooter] = useState<FooterData>({ links: [], social: [] });

  useEffect(() => {
    getFooter(lang).then(setFooter);
  }, [lang]);

  const year = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300 py-16 mb-16 md:mb-0">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Brand Column */}
        <div>
          <div className="flex items-center gap-2 mb-6 text-white">
            <div className="bg-primary p-1.5 rounded-sm text-primary-foreground">
              <Hammer size={20} />
            </div>
            <span className="text-xl font-bold">IVANGS</span>
          </div>
          <p className="text-slate-400 text-sm leading-relaxed mb-6">
            Ivangs Bedachungen GmbH & Co. KG – Ihr Meisterbetrieb für Bedachungen, Fassaden und Bauklempnerei im Kreis Viersen.
          </p>
          <div className="flex gap-4">
            <a href="#" className="p-2 bg-slate-800 rounded-full hover:bg-primary transition-colors text-white">
              <Facebook size={18} />
            </a>
            <a href="#" className="p-2 bg-slate-800 rounded-full hover:bg-primary transition-colors text-white">
              <Instagram size={18} />
            </a>
          </div>
        </div>

        {/* Contact Column */}
        <div>
          <h3 className="text-white font-semibold mb-6">Kontakt</h3>
          <ul className="space-y-4 text-sm">
            <li className="flex items-start gap-3">
              <MapPin size={18} className="text-primary shrink-0 mt-0.5" />
              <span>Musterstraße 12<br />52511 Geilenkirchen</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={18} className="text-primary shrink-0" />
              <span>+49 123 456 789</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={18} className="text-primary shrink-0" />
              <span>info@ivangs-bedachungen.de</span>
            </li>
          </ul>
        </div>

        {/* Legal Column */}
        <div>
          <h3 className="text-white font-semibold mb-6">Rechtliches</h3>
          <ul className="space-y-3 text-sm">
             {/* Use fetched links if available, otherwise hardcode common ones */}
             {footer.links.length > 0 ? footer.links.map(link => (
                 <li key={link.href}>
                     <Link to={`/${lang}${link.href}`} className="hover:text-white transition-colors">{link.label}</Link>
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
        </div>

        {/* Career Column */}
        <div>
          <h3 className="text-white font-semibold mb-6">Karriere</h3>
          <p className="text-sm text-slate-400 mb-4">
            Werde Teil unseres 28-köpfigen Teams. Wir bilden aus!
          </p>
          <Link 
            to={`/${lang}/career`}
            className="text-primary hover:text-white text-sm font-medium flex items-center gap-2 transition-colors"
          >
            Zu den Stellenangeboten <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-12 pt-8 border-t border-slate-800 text-center text-xs text-slate-500">
        {footer.copyright || `© ${year} Ivangs Bedachungen GmbH & Co. KG. Alle Rechte vorbehalten.`}
      </div>
    </footer>
  );
};
