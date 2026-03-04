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
      <div className="min-h-screen bg-slate-50 animate-pulse">
        {/* Header Skeleton */}
        <div className="bg-slate-900 pt-32 pb-24 flex flex-col items-center">
          <Skeleton variant="rectangular" height={24} width={100} className="mb-4 opacity-20" />
          <Skeleton variant="rectangular" height={100} className="w-2/3 max-w-2xl rounded-xl opacity-20" />
        </div>

        {/* Cards Grid Skeleton */}
        <div className="container mx-auto px-4 -mt-12 mb-20">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <Skeleton variant="rectangular" height={180} className="rounded-2xl shadow-lg" />
            <Skeleton variant="rectangular" height={180} className="rounded-2xl shadow-lg" />
            <Skeleton variant="rectangular" height={180} className="rounded-2xl shadow-lg" />
            <Skeleton variant="rectangular" height={180} className="rounded-2xl shadow-lg" />
          </div>
        </div>

        {/* Form Container Skeleton */}
        <div className="container mx-auto px-4 mb-32 flex justify-center">
          <Skeleton variant="rectangular" height={500} className="w-full max-w-4xl rounded-[2.5rem] shadow-2xl" />
        </div>
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

      <div className="bg-slate-50 animate-fade-in relative overflow-hidden min-h-screen">
        {/* Modern Header / Hero Section */}
        <section className="relative bg-slate-900 pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden">
          {/* Subtle noise/texture overlay */}
          <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-10 mix-blend-overlay pointer-events-none"></div>
          {/* Subtle gradient glow */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/20 via-transparent to-transparent opacity-50 pointer-events-none" />

          <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl">
            <p className="text-primary font-bold uppercase tracking-widest text-sm mb-4">
              {contact.eyebrow || 'Kontakt'}
            </p>
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-8 text-white leading-tight"
              data-tina-field={contact && tinaField(contact, 'title')}
            >
              {contact.title || 'Lassen Sie uns über Ihr Dach sprechen.'}
            </h1>
            <p
              className="text-xl md:text-2xl text-slate-300 font-light leading-relaxed mb-0"
              data-tina-field={contact && tinaField(contact, 'description')}
            >
              {contact.description || 'Rufen Sie uns an oder schreiben Sie uns. Wir beraten Sie gerne – auch gemeinsam mit Ihrem Architekten.'}
            </p>
          </div>
        </section>

        {/* Global Support / Contact Cards Grid */}
        <section className="relative z-20 -mt-12 md:-mt-16 mb-20">
          <div className="container mx-auto px-4">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {/* Phone Card */}
              {contact.phone && (
                <a
                  href={`tel:${contact.phone.replace(/\s/g, '')}`}
                  className="group bg-white p-8 rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 flex flex-col items-center text-center"
                  data-tina-field={contact && tinaField(contact, 'phone')}
                >
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <Phone className="w-6 h-6" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">Anrufen</h3>
                  <p className="text-xl font-bold text-slate-900">{contact.phone}</p>
                </a>
              )}

              {/* Email Card */}
              {contact.email && (
                <a
                  href={`mailto:${contact.email}`}
                  className="group bg-white p-8 rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 flex flex-col items-center text-center"
                  data-tina-field={contact && tinaField(contact, 'email')}
                >
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <Mail className="w-6 h-6" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">Schreiben</h3>
                  <p className="text-xl font-bold text-slate-900">{contact.email}</p>
                </a>
              )}

              {/* Address Card */}
              {contact.address && (
                <div className="group bg-white p-8 rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 transition-all duration-300 flex flex-col items-center text-center">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">Besuchen</h3>
                  <p className="text-base font-bold text-slate-900 leading-snug">
                    <span data-tina-field={contact.address && tinaField(contact.address, 'street')}>{contact.address.street}</span><br />
                    <span data-tina-field={contact.address && tinaField(contact.address, 'zip')}>{contact.address.zip}</span>{' '}
                    <span data-tina-field={contact.address && tinaField(contact.address, 'city')}>{contact.address.city}</span>
                  </p>
                </div>
              )}

              {/* Hours Card */}
              {contact.officeHours && (
                <div className="group bg-white p-8 rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 transition-all duration-300 flex flex-col items-center text-center">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6">
                    <Clock className="w-6 h-6" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">Bürozeiten</h3>
                  <p className="text-base font-bold text-slate-900" data-tina-field={contact.officeHours && tinaField(contact.officeHours, 'weekdays')}>
                    {contact.officeHours.weekdays}
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Form Section */}
        <section className="pb-32 container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/60 overflow-hidden border border-slate-100 flex flex-col md:flex-row">
            {/* Form Decoration Side */}
            <div className="hidden lg:flex w-1/3 bg-slate-900 p-12 text-white flex-col justify-between relative overflow-hidden">
              <div className="absolute inset-0 bg-primary/10 mix-blend-overlay"></div>
              <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-primary/20 rounded-full blur-3xl"></div>

              <div className="relative z-10">
                <h2 className="text-2xl font-bold mb-4">Ihre Anfrage</h2>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Ob Projektanfrage, Service-Termin oder allgemeine Beratung – wir sind für Sie da.
                </p>
              </div>

              <div className="relative z-10 flex items-center gap-3 text-primary">
                <div className="h-px w-8 bg-primary"></div>
                <span className="text-xs font-bold uppercase tracking-widest">Meisterqualität seit 1996</span>
              </div>
            </div>

            {/* Actual Form Side */}
            <div className="flex-1 p-8 md:p-12 lg:p-16">
              <div className="mb-10 text-center lg:text-left">
                <h2 className="text-3xl font-extrabold text-slate-900 mb-2">Nachricht senden</h2>
                <div className="h-1 w-12 bg-primary mx-auto lg:mx-0 rounded-full"></div>
              </div>
              <ContactForm />
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
