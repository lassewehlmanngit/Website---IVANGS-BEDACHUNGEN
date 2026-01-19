import React from 'react';
import { Seo } from '@/shared/ui/Seo';
import { SupportedLang } from '@/shared/config/i18n';
import { Breadcrumbs } from '@/shared/ui/Breadcrumbs';

export const ImprintPage: React.FC<{ lang: SupportedLang }> = ({ lang }) => {
  return (
    <>
      <Seo 
        title="Impressum - Ivangs Bedachungen" 
        description="Impressum und rechtliche Angaben der Ivangs Bedachungen GmbH & Co. KG in Geilenkirchen."
        ogLocale="de_DE"
      />
      <div className="animate-fade-in bg-white pt-12 pb-24">
        <div className="container mx-auto px-4 max-w-3xl">
          <Breadcrumbs 
            lang={lang}
            items={[{ label: 'Impressum' }]}
            className="mb-6"
          />
          <h1 className="text-4xl font-bold text-slate-900 mb-8 border-b border-slate-200 pb-4">Impressum</h1>
          
          <div className="prose prose-slate max-w-none text-slate-600">
            <h2 className="text-xl font-bold text-slate-800 mt-8 mb-4">Angaben gemäß § 5 TMG</h2>
            <p>
              Ivangs Bedachungen GmbH & Co. KG<br />
              Industriestraße 42<br />
              52511 Geilenkirchen
            </p>

            <h2 className="text-xl font-bold text-slate-800 mt-8 mb-4">Vertreten durch</h2>
            <p>
              Persönlich haftende Gesellschafterin: Ivangs Verwaltungs GmbH<br />
              Geschäftsführer: Marcus Ivangs
            </p>

            <h2 className="text-xl font-bold text-slate-800 mt-8 mb-4">Kontakt</h2>
            <p>
              Telefon: +49 2451 12345<br />
              E-Mail: info@ivangs-bedachungen.de
            </p>

            <h2 className="text-xl font-bold text-slate-800 mt-8 mb-4">Registereintrag</h2>
            <p>
              Eintragung im Handelsregister.<br />
              Registergericht: Amtsgericht Aachen<br />
              Registernummer: HRA 12345
            </p>

            <h2 className="text-xl font-bold text-slate-800 mt-8 mb-4">Umsatzsteuer-ID</h2>
            <p>
              Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:<br />
              DE 123 456 789
            </p>

            <h2 className="text-xl font-bold text-slate-800 mt-8 mb-4">Aufsichtsbehörde</h2>
            <p>
              Handwerkskammer Aachen<br />
              Sandkaulbach 17-21<br />
              52062 Aachen
            </p>
            <p>
              Berufsbezeichnung: Dachdeckermeister (verliehen in der Bundesrepublik Deutschland)<br />
              Berufsrechtliche Regelungen: Handwerksordnung
            </p>

            <h2 className="text-xl font-bold text-slate-800 mt-8 mb-4">Streitschlichtung</h2>
            <p>
              Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
