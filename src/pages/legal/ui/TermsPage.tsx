import React from 'react';
import { Seo } from '@/shared/ui/Seo';
import { SupportedLang } from '@/shared/config/i18n';
import { Breadcrumbs } from '@/shared/ui/Breadcrumbs';

export const TermsPage: React.FC<{ lang: SupportedLang }> = ({ lang }) => {
  return (
    <>
      <Seo 
        title="AGB - Ivangs Bedachungen" 
        description="Allgemeine Geschäftsbedingungen der Ivangs Bedachungen GmbH & Co. KG für Dachdeckerarbeiten und Bedachungen."
        ogLocale="de_DE"
      />
      <div className="animate-fade-in bg-white pt-12 pb-24">
        <div className="container mx-auto px-4 max-w-3xl">
          <Breadcrumbs 
            lang={lang}
            items={[{ label: 'AGB' }]}
            className="mb-6"
          />
          <h1 className="text-4xl font-bold text-slate-900 mb-8 border-b border-slate-200 pb-4">Allgemeine Geschäftsbedingungen (AGB)</h1>
          
          <div className="prose prose-slate max-w-none text-slate-600">
            <p className="text-sm text-slate-400 mb-8">Stand: Januar 2024</p>
            
            <h2 className="text-xl font-bold text-slate-800 mt-8 mb-4">§1 Geltungsbereich</h2>
            <p>
              (1) Die nachstehenden Bedingungen gelten für alle Lieferungen und Leistungen der Firma Ivangs Bedachungen GmbH & Co. KG (nachfolgend Auftragnehmer genannt).
            </p>
            <p>
              (2) Entgegenstehende oder von unseren AGB abweichende Bedingungen des Auftraggebers erkennen wir nicht an, es sei denn, wir hätten ausdrücklich schriftlich ihrer Geltung zugestimmt.
            </p>

            <h2 className="text-xl font-bold text-slate-800 mt-8 mb-4">§2 Angebot und Vertragsabschluss</h2>
            <p>
              (1) Unsere Angebote sind freibleibend und unverbindlich. Annahmeerklärungen und sämtliche Bestellungen bedürfen zur Rechtswirksamkeit unserer schriftlichen oder fernschriftlichen Bestätigung.
            </p>
            <p>
              (2) An Abbildungen, Zeichnungen, Kalkulationen und sonstigen Unterlagen behalten wir uns Eigentums- und Urheberrechte vor.
            </p>

            <h2 className="text-xl font-bold text-slate-800 mt-8 mb-4">§3 Preise und Zahlung</h2>
            <p>
              (1) Sofern sich aus der Auftragsbestätigung nichts anderes ergibt, gelten unsere Preise "ab Werk" bzw. "ab Lager".
            </p>
            <p>
              (2) Die gesetzliche Mehrwertsteuer ist nicht in unseren Preisen eingeschlossen; sie wird in gesetzlicher Höhe am Tag der Rechnungsstellung in der Rechnung gesondert ausgewiesen.
            </p>

            <h2 className="text-xl font-bold text-slate-800 mt-8 mb-4">§4 Gewährleistung</h2>
            <p>
              (1) Die Gewährleistung richtet sich nach den gesetzlichen Vorschriften, insbesondere der VOB/B (Vergabe- und Vertragsordnung für Bauleistungen), soweit diese vereinbart wurde.
            </p>
            
            <h2 className="text-xl font-bold text-slate-800 mt-8 mb-4">§5 Gerichtsstand</h2>
            <p>
               Sofern der Auftraggeber Kaufmann ist, ist unser Geschäftssitz Gerichtsstand; wir sind jedoch berechtigt, den Auftraggeber auch an seinem Wohnsitzgericht zu verklagen.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
