import React from 'react';
import { SupportedLang } from '@/shared/config/i18n';
import { Seo } from '@/shared/ui/Seo';
import { ContactForm } from '@/features/contact/ContactForm';
import { MapPin, Phone, Mail } from 'lucide-react';
import { teamMembers } from '@/features/company/model/teamData';

export const ContactPage: React.FC<{ lang: SupportedLang }> = ({ lang }) => {
  return (
    <>
      <Seo 
        title="Kontakt - Ivangs Bedachungen" 
        description="Rufen Sie uns an oder schreiben Sie uns. Wir beraten Sie gerne – auch gemeinsam mit Ihrem Architekten."
        ogLocale="de_DE"
        ogSiteName="Ivangs Bedachungen"
        localBusiness={{
            name: "Ivangs Bedachungen GmbH & Co. KG",
            telephone: "+49 2451 12345",
            email: "info@ivangs-bedachungen.de",
            address: {
                streetAddress: "Industriestraße 42",
                addressLocality: "Geilenkirchen",
                postalCode: "52511",
                addressCountry: "DE"
            }
        }}
      />
      <div className="bg-white">
        <div className="container mx-auto px-4 py-20">
            <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900">Der erste Schritt zum dichten Dach.</h1>
            <p className="text-slate-600 max-w-2xl mx-auto">
                Rufen Sie uns an oder schreiben Sie uns. Wir beraten Sie gerne – auch gemeinsam mit Ihrem Architekten.
            </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
            {/* Contact Info */}
            <div className="space-y-12">
                <div className="bg-slate-50 p-8 rounded-sm border border-slate-100">
                <h3 className="text-xl font-bold mb-6 text-slate-900">Kontaktdaten</h3>
                <ul className="space-y-6">
                    <li className="flex items-start gap-4">
                    <div className="bg-white p-3 rounded-md shadow-sm text-primary">
                        <MapPin size={20} />
                    </div>
                    <div>
                        <span className="block font-bold text-slate-900">Anschrift</span>
                        <span className="text-slate-600">Musterstraße 12<br/>52511 Geilenkirchen</span>
                        <span className="text-xs text-slate-400 mt-2 block">Wir sind für Sie da – im Kreis Viersen und 200 km Umkreis.</span>
                    </div>
                    </li>
                    <li className="flex items-start gap-4">
                    <div className="bg-white p-3 rounded-md shadow-sm text-primary">
                        <Phone size={20} />
                    </div>
                    <div>
                        <span className="block font-bold text-slate-900">Telefon</span>
                        <a href="tel:+49123456789" className="text-slate-600 hover:text-primary transition-colors">+49 123 456 789</a>
                    </div>
                    </li>
                    <li className="flex items-start gap-4">
                    <div className="bg-white p-3 rounded-md shadow-sm text-primary">
                        <Mail size={20} />
                    </div>
                    <div>
                        <span className="block font-bold text-slate-900">E-Mail</span>
                        <a href="mailto:info@ivangs-bedachungen.de" className="text-slate-600 hover:text-primary transition-colors">info@ivangs-bedachungen.de</a>
                    </div>
                    </li>
                </ul>
                </div>

                <div className="bg-white p-6 rounded-sm border border-slate-100 shadow-sm">
                <h3 className="font-bold text-lg mb-4 text-slate-900">Ihr direkter Draht</h3>
                <div className="space-y-3 text-sm">
                    <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                        <span className="text-slate-600">Rückfragen zur Rechnung?</span>
                        <span className="font-medium text-slate-900">{teamMembers.isabel.name}</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                        <span className="text-slate-600">Technische Fragen?</span>
                        <span className="font-medium text-slate-900">{teamMembers.sascha.name}</span>
                    </div>
                </div>
                </div>
            </div>

            {/* Form */}
            <div className="bg-white p-8 md:p-10 rounded-sm shadow-xl border border-slate-100 h-fit">
                <h3 className="text-2xl font-bold mb-6 text-slate-900">Kostenloses Angebot anfordern</h3>
                <ContactForm />
            </div>
            </div>
        </div>
      </div>
    </>
  );
};
