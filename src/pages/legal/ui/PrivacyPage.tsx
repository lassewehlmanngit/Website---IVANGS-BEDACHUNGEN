import React from 'react';
import { Seo } from '@/shared/ui/Seo';
import { SupportedLang } from '@/shared/config/i18n';

export const PrivacyPage: React.FC<{ lang: SupportedLang }> = () => {
  return (
    <>
      <Seo title="Datenschutzerklärung - Ivangs Bedachungen" />
      <div className="animate-fade-in bg-white pt-12 pb-24">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="text-4xl font-bold text-slate-900 mb-8 border-b border-slate-200 pb-4">Datenschutzerklärung</h1>
          
          <div className="prose prose-slate max-w-none text-slate-600">
            <h2 className="text-xl font-bold text-slate-800 mt-8 mb-4">1. Datenschutz auf einen Blick</h2>
            <h3 className="font-bold text-slate-700 mt-4 mb-2">Allgemeine Hinweise</h3>
            <p>
              Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.
            </p>

            <h2 className="text-xl font-bold text-slate-800 mt-8 mb-4">2. Hosting</h2>
            <p>
              Wir hosten die Inhalte unserer Website bei folgendem Anbieter:
            </p>
            <p className="font-medium mt-2">Externer Hoster</p>
            <p>
              Diese Website wird extern gehostet. Die personenbezogenen Daten, die auf dieser Website erfasst werden, werden auf den Servern des Hosters gespeichert. Hierbei kann es sich v. a. um IP-Adressen, Kontaktanfragen, Meta- und Kommunikationsdaten, Vertragsdaten, Kontaktdaten, Namen, Websitezugriffe und sonstige Daten, die über eine Website generiert werden, handeln.
            </p>

            <h2 className="text-xl font-bold text-slate-800 mt-8 mb-4">3. Allgemeine Hinweise und Pflichtinformationen</h2>
            <h3 className="font-bold text-slate-700 mt-4 mb-2">Datenschutz</h3>
            <p>
              Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend den gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.
            </p>
            
            <h3 className="font-bold text-slate-700 mt-4 mb-2">Hinweis zur verantwortlichen Stelle</h3>
            <p>
              Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:<br/><br/>
              Ivangs Bedachungen GmbH & Co. KG<br/>
              Musterstraße 12<br/>
              52511 Geilenkirchen<br/><br/>
              E-Mail: info@ivangs-bedachungen.de
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
