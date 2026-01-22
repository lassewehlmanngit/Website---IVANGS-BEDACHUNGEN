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
  const contact = data?.contactPage;

  if (isLoading) {
    return (
      <div className="animate-fade-in">
        {/* Hero Skeleton */}
        <div className="bg-slate-900 py-20 md:py-32">
          <div className="container mx-auto px-4">
            <Skeleton variant="text" width="100px" className="h-4 mb-4 bg-slate-700" />
            <Skeleton variant="text" width="60%" className="h-12 mb-6 bg-slate-700" />
            <Skeleton variant="text" width="80%" className="h-6 bg-slate-700" />
          </div>
        </div>
        {/* Content Skeleton */}
        <div className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
              <div className="order-2 lg:order-1 space-y-6">
                <Skeleton variant="text" width="200px" className="h-8 mb-8" />
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <Skeleton variant="rectangular" width={48} height={48} className="flex-shrink-0" />
                    <div className="flex-1">
                      <Skeleton variant="text" width="80px" className="h-5 mb-2" />
                      <SkeletonText lines={2} />
                    </div>
                  </div>
                ))}
              </div>
              <div className="order-1 lg:order-2">
                <Skeleton variant="text" width="200px" className="h-8 mb-8" />
                <Skeleton variant="rectangular" height={400} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !contact) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-muted-foreground">Seite konnte nicht geladen werden.</p>
      </div>
    );
  }

  return (
    <>
      <Seo
        title={contact.seo?.title || 'Kontakt - Ivangs Bedachungen'}
        description={contact.seo?.description}
        ogImage={contact.seo?.ogImage}
        ogLocale="de_DE"
        ogSiteName="Ivangs Bedachungen"
      />

      <div className="animate-fade-in">
        {/* Hero Section */}
        <PageHero variant="dark">
          <PageHero.Eyebrow>Kontakt</PageHero.Eyebrow>
          <PageHero.Title data-tina-field={contact && tinaField(contact, 'title')}>
            {contact.title || 'Der erste Schritt zum dichten Dach.'}
          </PageHero.Title>
          <PageHero.Description data-tina-field={contact && tinaField(contact, 'description')}>
            {contact.description || 'Rufen Sie uns an oder schreiben Sie uns. Wir beraten Sie gerne – auch gemeinsam mit Ihrem Architekten.'}
          </PageHero.Description>
        </PageHero>

        {/* Contact Info & Form Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
              {/* Contact Information */}
              <div className="order-2 lg:order-1">
                <h2 className="text-h2 font-bold text-slate-900 mb-8">So erreichen Sie uns</h2>
                
                <div className="space-y-6">
                  {/* Address */}
                  {contact.address && (
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <MapPin className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-900 mb-1">Adresse</h3>
                        <p 
                          className="text-slate-600"
                          data-tina-field={contact.address && tinaField(contact.address, 'company')}
                        >
                          {contact.address.company}
                        </p>
                        <p 
                          className="text-slate-600"
                          data-tina-field={contact.address && tinaField(contact.address, 'street')}
                        >
                          {contact.address.street}
                        </p>
                        <p className="text-slate-600">
                          <span data-tina-field={contact.address && tinaField(contact.address, 'zip')}>{contact.address.zip}</span>{' '}
                          <span data-tina-field={contact.address && tinaField(contact.address, 'city')}>{contact.address.city}</span>
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Phone */}
                  {contact.phone && (
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Phone className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-900 mb-1">Telefon</h3>
                        <a 
                          href={`tel:${contact.phone.replace(/\s/g, '')}`}
                          className="text-slate-600 hover:text-primary transition-colors"
                          data-tina-field={contact && tinaField(contact, 'phone')}
                        >
                          {contact.phone}
                        </a>
                        {contact.fax && (
                          <p 
                            className="text-slate-500 text-sm mt-1"
                            data-tina-field={contact && tinaField(contact, 'fax')}
                          >
                            Fax: {contact.fax}
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Email */}
                  {contact.email && (
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Mail className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-900 mb-1">E-Mail</h3>
                        <a 
                          href={`mailto:${contact.email}`}
                          className="text-slate-600 hover:text-primary transition-colors"
                          data-tina-field={contact && tinaField(contact, 'email')}
                        >
                          {contact.email}
                        </a>
                      </div>
                    </div>
                  )}

                  {/* Website */}
                  {contact.website && (
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Globe className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-900 mb-1">Website</h3>
                        <a 
                          href={`https://${contact.website}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-slate-600 hover:text-primary transition-colors"
                          data-tina-field={contact && tinaField(contact, 'website')}
                        >
                          {contact.website}
                        </a>
                      </div>
                    </div>
                  )}

                  {/* Facebook */}
                  {contact.facebook && (
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Facebook className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-900 mb-1">Facebook</h3>
                        <a 
                          href={contact.facebook}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-slate-600 hover:text-primary transition-colors"
                          data-tina-field={contact && tinaField(contact, 'facebook')}
                        >
                          Folgen Sie uns
                        </a>
                      </div>
                    </div>
                  )}

                  {/* Office Hours */}
                  {contact.officeHours && (
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Clock className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-900 mb-1">Öffnungszeiten Büro</h3>
                        <p 
                          className="text-slate-600"
                          data-tina-field={contact.officeHours && tinaField(contact.officeHours, 'weekdays')}
                        >
                          {contact.officeHours.weekdays}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Repair Hours */}
                  {contact.repairHours && (
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center">
                        <Clock className="w-6 h-6 text-slate-500" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-900 mb-1">Reparaturplanung</h3>
                        <p 
                          className="text-slate-600"
                          data-tina-field={contact.repairHours && tinaField(contact.repairHours, 'tueThu')}
                        >
                          {contact.repairHours.tueThu}
                        </p>
                        <p 
                          className="text-slate-600"
                          data-tina-field={contact.repairHours && tinaField(contact.repairHours, 'fri')}
                        >
                          {contact.repairHours.fri}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Contact Form - Show first on mobile */}
              <div className="order-1 lg:order-2">
                <h2 className="text-h2 font-bold text-slate-900 mb-8">Nachricht senden</h2>
                <div className="bg-slate-50 p-6 md:p-8 rounded-sm">
                  <ContactForm />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
