import React from 'react';
import type { SupportedLang } from '@/shared/config/i18n';
import { Seo } from '@/shared/ui/Seo';
import { PageHero } from '@/shared/ui/PageHero';
import { Skeleton, SkeletonText } from '@/shared/ui/Skeleton';
import { tinaField } from 'tinacms/dist/react';
import { useContactPageData } from '@/shared/lib/tina/useContactPageData';
import { ContactForm } from '@/features/contact/ContactForm';
import { MapPin, Phone, Mail, Clock, Globe, Facebook } from 'lucide-react';

export interface ContactPageProps {
  lang: SupportedLang;
}

export const ContactPage: React.FC<ContactPageProps> = ({ lang }) => {
  const { data, isLoading, error } = useContactPageData(lang);
  const contact = (data as any)?.contactPage;

  if (isLoading) {
    return (
      <div className="absolute inset-0 bg-slate-900 animate-pulse flex items-center justify-center">
        <Skeleton variant="rectangular" width="40%" height="60%" className="rounded-xl opacity-20" />
      </div>
    );
  }

  if (error || !contact) {
    return (
      <div className="flex items-center justify-center min-h-dvh">
        <p className="text-muted-foreground">Seite konnte nicht geladen werden.</p>
      </div>
    );
  }

  return (
    <>
      <Seo
        title={contact.seo?.title || 'Kontakt - Ivangs Bedachungen'}
        description={contact.seo?.description}
        ogImage={contact.seo?.ogImage ? { url: contact.seo.ogImage, alt: contact.seo?.title || 'Kontakt - Ivangs Bedachungen' } : undefined}
        ogLocale="de_DE"
        ogSiteName="Ivangs Bedachungen"
      />

      <div className="min-h-[100dvh] flex flex-col lg:flex-row bg-slate-50 animate-fade-in relative overflow-hidden">
        {/* Decorative Background Element (Abstract building silhouette hint) */}
        <div className="absolute left-0 top-0 bottom-0 w-1/2 bg-slate-900 z-0 hidden lg:block" />

        {/* LEFT SIDE: Brand & Contact Info */}
        <div className="w-full lg:w-1/2 relative z-10 bg-slate-900 text-white min-h-[50vh] lg:min-h-screen px-6 py-20 lg:py-32 lg:px-16 xl:px-24 flex flex-col justify-center overflow-hidden">
          {/* Subtle noise/texture overlay */}
          <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-10 mix-blend-overlay pointer-events-none"></div>
          {/* Subtle gradient glow */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/20 via-transparent to-transparent opacity-50 pointer-events-none" />

          <div className="relative z-20 max-w-xl mx-auto lg:mx-0 w-full">
            <p className="text-primary font-bold uppercase tracking-widest text-sm mb-4">
              Kontakt
            </p>
            <h1
              className="text-4xl md:text-5xl lg:text-h1 font-bold mb-6 text-white"
              data-tina-field={contact && tinaField(contact, 'title')}
            >
              {contact.title || 'Lassen Sie uns über Ihr Dach sprechen.'}
            </h1>
            <p
              className="text-lg md:text-xl text-slate-300 mb-12 max-w-lg"
              data-tina-field={contact && tinaField(contact, 'description')}
            >
              {contact.description || 'Rufen Sie uns an oder schreiben Sie uns. Wir beraten Sie gerne – auch gemeinsam mit Ihrem Architekten.'}
            </p>

            {/* Glassmorphic Contact Info Cards */}
            <div className="space-y-4">
              {contact.phone && (
                <a
                  href={`tel:${contact.phone.replace(/\s/g, '')}`}
                  className="group flex items-center gap-6 p-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/10 hover:border-primary/50 transition-all duration-300 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]"
                  data-tina-field={contact && tinaField(contact, 'phone')}
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-slate-400 mb-1">Telefon</h3>
                    <p className="text-lg font-semibold text-white">{contact.phone}</p>
                  </div>
                </a>
              )}

              {contact.email && (
                <a
                  href={`mailto:${contact.email}`}
                  className="group flex items-center gap-6 p-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/10 hover:border-primary/50 transition-all duration-300 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]"
                  data-tina-field={contact && tinaField(contact, 'email')}
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-slate-400 mb-1">E-Mail</h3>
                    <p className="text-lg font-semibold text-white">{contact.email}</p>
                  </div>
                </a>
              )}

              {contact.address && (
                <div className="group flex items-center gap-6 p-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/10 transition-all duration-300 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-slate-400 mb-1">Adresse</h3>
                    <p className="text-base text-white">
                      <span data-tina-field={contact.address && tinaField(contact.address, 'street')}>{contact.address.street}</span>,{' '}
                      <span data-tina-field={contact.address && tinaField(contact.address, 'zip')}>{contact.address.zip}</span>{' '}
                      <span data-tina-field={contact.address && tinaField(contact.address, 'city')}>{contact.address.city}</span>
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Office Hours - Subdued */}
            {contact.officeHours && (
              <div className="mt-8 flex items-start gap-3 text-slate-400 text-sm">
                <Clock className="w-4 h-4 mt-0.5" />
                <div>
                  <p className="font-semibold text-slate-300 mb-1">Bürozeiten:</p>
                  <p data-tina-field={contact.officeHours && tinaField(contact.officeHours, 'weekdays')}>
                    {contact.officeHours.weekdays}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT SIDE: The Form */}
        <div className="w-full lg:w-1/2 relative z-20 px-6 py-12 lg:py-24 lg:px-16 xl:px-24 flex items-center -mt-10 lg:mt-0">
          <div className="w-full max-w-xl mx-auto bg-white rounded-2xl shadow-2xl p-8 lg:p-12 border border-slate-100 relative">
            {/* Form decorative accent */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-primary via-primary-400 to-primary rounded-t-2xl"></div>

            <h2 className="text-2xl font-bold text-slate-900 mb-2">Nachricht senden</h2>
            <p className="text-slate-500 mb-8">Füllen Sie das Formular aus und wir melden uns zeitnah bei Ihnen.</p>

            <ContactForm />
          </div>
        </div>
      </div>
    </>
  );
};
