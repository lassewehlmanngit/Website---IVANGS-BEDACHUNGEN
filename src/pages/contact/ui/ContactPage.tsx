import React from 'react';
import { SupportedLang } from '@/shared/config/i18n';
import { Seo } from '@/shared/ui/Seo';
import { ContactForm } from '@/features/contact/ContactForm';
import { MapPin, Phone, Mail, Clock, Globe, Facebook } from 'lucide-react';
import { teamMembersLegacy } from '@/features/company/model/teamData';

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
      <div className="bg-white">
        <div className="container mx-auto px-4 py-16 md:py-20">
            <div className="text-center mb-12 md:mb-16">
            <h1 className="text-h1 font-bold mb-3 md:mb-4 text-slate-900">Der erste Schritt zum dichten Dach.</h1>
            <p className="text-slate-600 text-base md:text-lg max-w-2xl mx-auto">
                Rufen Sie uns an oder schreiben Sie uns. Wir beraten Sie gerne – auch gemeinsam mit Ihrem Architekten.
            </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 md:gap-16 max-w-6xl mx-auto">
            {/* Contact Info */}
            <div className="space-y-6 md:space-y-8">
                <div className="bg-slate-50 p-6 md:p-8 rounded-sm border border-slate-100">
                <h3 className="text-h3 font-bold mb-4 md:mb-6 text-slate-900">Kontaktdaten</h3>
                <ul className="space-y-4 md:space-y-6">
                    <li className="flex items-start gap-3 md:gap-4">
                    <div className="bg-white p-2 md:p-3 rounded-md shadow-sm text-primary w-10 h-10 md:w-12 md:h-12 flex items-center justify-center shrink-0">
                        <MapPin size={20} className="w-5 h-5 md:w-5 md:h-5" />
                    </div>
                    <div>
                        <span className="block font-bold text-slate-900">Anschrift</span>
                        <span className="text-slate-600">
                          IVANGS<br/>
                          Bedachungen GmbH & Co. KG<br/>
                          Schmiedestraße 37<br/>
                          41749 Viersen - Süchteln
                        </span>
                    </div>
                    </li>
                    <li className="flex items-start gap-3 md:gap-4">
                    <div className="bg-white p-2 md:p-3 rounded-md shadow-sm text-primary w-10 h-10 md:w-12 md:h-12 flex items-center justify-center shrink-0">
                        <Phone size={20} className="w-5 h-5 md:w-5 md:h-5" />
                    </div>
                    <div>
                        <span className="block font-bold text-slate-900">Telefon</span>
                        <a href="tel:+4921623566666" className="text-slate-600 hover:text-primary transition-colors">+49 (0) 21 62 – 35 66 66</a>
                        <span className="block text-sm text-slate-400 mt-1">Fax: +49 (0) 21 62 - 35 66 67</span>
                    </div>
                    </li>
                    <li className="flex items-start gap-3 md:gap-4">
                    <div className="bg-white p-2 md:p-3 rounded-md shadow-sm text-primary w-10 h-10 md:w-12 md:h-12 flex items-center justify-center shrink-0">
                        <Mail size={20} className="w-5 h-5 md:w-5 md:h-5" />
                    </div>
                    <div>
                        <span className="block font-bold text-slate-900">E-Mail</span>
                        <a href="mailto:bedachungen@ivangs.de" className="text-slate-600 hover:text-primary transition-colors">bedachungen@ivangs.de</a>
                    </div>
                    </li>
                    <li className="flex items-start gap-3 md:gap-4">
                    <div className="bg-white p-2 md:p-3 rounded-md shadow-sm text-primary w-10 h-10 md:w-12 md:h-12 flex items-center justify-center shrink-0">
                        <Globe size={20} className="w-5 h-5 md:w-5 md:h-5" />
                    </div>
                    <div>
                        <span className="block font-bold text-slate-900">Web</span>
                        <a href="https://www.ivangs.de" target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-primary transition-colors">www.ivangs.de</a>
                    </div>
                    </li>
                    <li className="flex items-start gap-3 md:gap-4">
                    <div className="bg-white p-2 md:p-3 rounded-md shadow-sm text-primary w-10 h-10 md:w-12 md:h-12 flex items-center justify-center shrink-0">
                        <Facebook size={20} className="w-5 h-5 md:w-5 md:h-5" />
                    </div>
                    <div>
                        <span className="block font-bold text-slate-900">Social Media</span>
                        <a href="https://www.facebook.com/ivangs.de" target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-primary transition-colors">facebook.com/ivangs.de</a>
                    </div>
                    </li>
                </ul>
                </div>

                {/* Opening Hours */}
                <div className="bg-slate-50 p-6 md:p-8 rounded-sm border border-slate-100">
                  <h3 className="text-h3 font-bold mb-4 md:mb-6 text-slate-900 flex items-center gap-2">
                    <Clock size={20} className="text-primary shrink-0" />
                    Öffnungszeiten
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-slate-800 mb-2">Büro</h4>
                      <p className="text-slate-600">Mo – Fr: 07.00 – 17.00 Uhr</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-800 mb-2">Reparaturplanung</h4>
                      <p className="text-slate-600">
                        Di – Do: 8.00 – 13.00 Uhr<br/>
                        Fr: 11.00 – 16.00 Uhr
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-4 md:p-6 rounded-sm border border-slate-100 shadow-sm">
                <h3 className="font-bold text-base md:text-lg mb-3 md:mb-4 text-slate-900">Ihr direkter Draht</h3>
                <div className="space-y-3 text-sm">
                    <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                        <span className="text-slate-600">Rückfragen zur Rechnung?</span>
                        <span className="font-medium text-slate-900">{teamMembersLegacy.isabel.name}</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                        <span className="text-slate-600">Technische Fragen?</span>
                        <span className="font-medium text-slate-900">{teamMembersLegacy.sascha.name}</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                        <span className="text-slate-600">Reparaturtermine?</span>
                        <span className="font-medium text-slate-900">{teamMembersLegacy.sabine.name}</span>
                    </div>
                </div>
                </div>
            </div>

            {/* Form */}
            <div className="bg-white p-6 md:p-8 lg:p-10 rounded-sm shadow-xl border border-slate-100 h-fit">
                <h3 className="text-h3 font-bold mb-4 md:mb-6 text-slate-900">Kostenloses Angebot anfordern</h3>
                <ContactForm />
            </div>
            </div>
        </div>
      </div>
    </>
  );
};
