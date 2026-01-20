import React from 'react';
import { HelpCircle } from 'lucide-react';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/shared/ui/Accordion';
import type { SupportedLang } from '@/shared/config/i18n';
import { tinaField } from 'tinacms/dist/react';
import { SmartLink } from '@/shared/ui/SmartLink';

interface FAQItem {
  question?: string;
  answer?: string;
  q?: string;
  a?: string;
}

const defaultHomeFAQ: FAQItem[] = [
  {
    q: 'Was kostet eine professionelle Dachsanierung im Kreis Viersen?',
    a: 'Die Kosten variieren je nach Projekt: Eine Steildachsanierung kostet bei einem Einfamilienhaus etwa 15.000-35.000 Euro, eine Flachdachabdichtung 80-150 Euro pro m². Wir erstellen Ihnen ein kostenloses, transparentes Festpreis-Angebot nach Besichtigung vor Ort.'
  },
  {
    q: 'Wie lange dauern typische Dacharbeiten?',
    a: 'Ein Einfamilienhaus-Dach sanieren wir in ca. 2 Wochen, ein Dachfenster tauschen wir in 3-4 Stunden, eine Flachdachabdichtung dauert je nach Größe 3-7 Tage. Wir planen realistische Zeitfenster mit Wetterpuffer und halten Sie stets auf dem Laufenden.'
  },
  {
    q: 'Arbeitet Ivangs Bedachungen nur im Kreis Viersen?',
    a: 'Unser Hauptgebiet ist der Kreis Viersen, aber wir arbeiten auch in Mönchengladbach, Krefeld, Düsseldorf und dem gesamten Niederrhein. Bei größeren Projekten kommen wir auch weiter. Rufen Sie uns einfach an – wir finden eine Lösung.'
  },
  {
    q: 'Bieten Sie Notdienst bei Sturmschäden an?',
    a: 'Ja! Bei akuten Schadensfällen sind wir innerhalb von 24 Stunden vor Ort und sichern Ihr Dach provisorisch ab. Wir dokumentieren den Schaden für Ihre Versicherung und kümmern uns um die schnelle Reparatur. Notfall-Hotline: 02162 356666.'
  },
  {
    q: 'Welche Garantien geben Sie auf Ihre Arbeiten?',
    a: 'Wir geben 5 Jahre Gewährleistung auf alle Arbeiten gemäß VOB (Vergabe- und Vertragsordnung für Bauleistungen). Auf Materialien gelten die Herstellergarantien (z.B. VELUX 10 Jahre). Bei regelmäßiger Wartung verlängern viele Hersteller die Garantie.'
  },
  {
    q: 'Kann ich während der Bauarbeiten im Haus wohnen?',
    a: 'Ja, das ist kein Problem. Bei Dacharbeiten arbeiten wir von außen – Sie haben nur Geräusche, aber keine Beeinträchtigung im Wohnraum. Beim Dachfenstertausch wird kurz von innen gearbeitet. Wir decken alles staubdicht ab und hinterlassen saubere Baustellen.'
  },
  {
    q: 'Gibt es Förderungen für Dach- und Solararbeiten?',
    a: 'Ja! Für energetische Dachsanierung gibt es BAFA-Förderung (bis 20%) und KfW-Kredite mit Tilgungszuschuss. Photovoltaik wird über Einspeisevergütung gefördert und ist seit 2023 mehrwertsteuerfrei. Wir beraten Sie zu Fördermöglichkeiten und unterstützen bei Anträgen.'
  },
  {
    q: 'Was unterscheidet Ivangs von anderen Dachdeckerbetrieben?',
    a: 'Wir sind ein inhabergeführter Meisterbetrieb mit 28 Experten, eigenem Kran und 400 m² Lagerfläche. Das bedeutet: kurze Wege, schnelle Reaktion, keine Subunternehmer. Wir bilden aus (aktuell 5 Azubis) und setzen auf langfristige Kundenbeziehungen statt schnelles Geschäft.'
  },
  {
    q: 'Bieten Sie auch Wartungsverträge für Dächer an?',
    a: 'Ja, Wartungsverträge sind eine kluge Investition! Für 200-400 Euro pro Jahr kommen wir einmal jährlich vorbei, reinigen Rinnen, prüfen Dach und Abdichtung und erstellen ein Protokoll. Das verhindert teure Folgeschäden und viele Versicherungen gewähren Rabatte.'
  },
  {
    q: 'Wie bekomme ich ein Angebot von Ivangs Bedachungen?',
    a: 'Einfach anrufen (02162 356666), per E-Mail (bedachungen@ivangs.de) oder über unser Kontaktformular melden. Wir vereinbaren einen Termin zur kostenlosen Besichtigung, nehmen Maße auf und erstellen Ihnen ein detailliertes Festpreis-Angebot – transparent und verbindlich.'
  }
];

interface HomeFAQProps {
  lang: SupportedLang;
  homeData?: any;
  faqData?: any[];
  faqCTA?: any;
}

export const HomeFAQ: React.FC<HomeFAQProps> = ({ lang, homeData, faqData, faqCTA }) => {
  // Use faqData from TinaCMS if available, otherwise fall back to hardcoded defaults
  const faqList = faqData || defaultHomeFAQ;
  
  // Header data with fallbacks (using flattened fields)
  const headerTitle = homeData?.faqTitle || 'Häufig gestellte Fragen';
  const headerDescription = homeData?.faqDescription || 'Alles, was Sie über Dacharbeiten wissen müssen – ehrlich beantwortet';
  
  // CTA data with fallbacks
  const ctaTitle = faqCTA?.title || 'Ihre Frage war nicht dabei?';
  const ctaDescription = faqCTA?.description || 'Rufen Sie uns einfach an oder schreiben Sie uns – wir beraten Sie gerne persönlich.';
  const ctaPhone = faqCTA?.phone || '02162 356666';
  const ctaButtonText = faqCTA?.buttonText || 'Nachricht senden';
  const ctaButtonLink = faqCTA?.buttonLink || `/${lang}/contact`;
  
  return (
    <section className="py-20 bg-white border-t border-slate-100">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <HelpCircle className="text-primary" size={32} />
              <h2 
                className="text-3xl md:text-4xl font-bold text-slate-900"
                data-tina-field={homeData && tinaField(homeData, 'faqTitle')}
              >
                {headerTitle}
              </h2>
            </div>
            <p 
              className="text-slate-600 text-lg"
              data-tina-field={homeData && tinaField(homeData, 'faqDescription')}
            >
              {headerDescription}
            </p>
          </div>

          {/* FAQ Accordion */}
          <Accordion type="single" collapsible className="border-slate-200">
            {faqList.map((item, index) => (
              <AccordionItem key={index} value={`faq-${index}`}>
                <AccordionTrigger className="text-left hover:bg-slate-50/50">
                  <span 
                    className="text-base md:text-lg font-semibold text-slate-900 pr-4"
                    data-tina-field={faqData && tinaField(faqData[index], 'question')}
                  >
                    {item.question || item.q}
                  </span>
                </AccordionTrigger>
                <AccordionContent 
                  className="text-slate-600 leading-relaxed"
                  data-tina-field={faqData && tinaField(faqData[index], 'answer')}
                >
                  {item.answer || item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {/* CTA below FAQ */}
          <div className="mt-12 text-center p-8 bg-slate-50 rounded-sm border border-slate-100">
            <p 
              className="text-slate-700 text-lg mb-4"
              data-tina-field={faqCTA && tinaField(faqCTA, 'title')}
            >
              {ctaTitle}
            </p>
            <p 
              className="text-slate-600 mb-6"
              data-tina-field={faqCTA && tinaField(faqCTA, 'description')}
            >
              {ctaDescription}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href={`tel:+49${ctaPhone.replace(/\s/g, '').replace(/^0/, '')}`}
                className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white font-bold rounded-sm hover:bg-primary/90 transition-colors"
                data-tina-field={faqCTA && tinaField(faqCTA, 'phone')}
              >
                {ctaPhone}
              </a>
              <SmartLink 
                link={ctaButtonLink}
                className="inline-flex items-center justify-center px-6 py-3 bg-white text-primary font-bold rounded-sm border-2 border-primary hover:bg-primary/5 transition-colors"
              >
                <span data-tina-field={faqCTA && tinaField(faqCTA, 'buttonText')}>
                  {ctaButtonText}
                </span>
              </SmartLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
