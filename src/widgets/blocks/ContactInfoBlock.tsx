import React from 'react';
import { tinaField } from 'tinacms/dist/react';
import { MapPin, Phone, Mail, Clock, Globe } from 'lucide-react';

export interface ContactInfoBlockProps {
  data: {
    title?: string;
    description?: string;
    address?: {
      company: string;
      street: string;
      city: string;
      zip: string;
    };
    phone: string;
    fax?: string;
    email: string;
    website?: string;
    officeHours?: {
      weekdays: string;
    };
    repairHours?: {
      tueThu: string;
      fri: string;
    };
  };
  parentField?: string;
}

export const ContactInfoBlock: React.FC<ContactInfoBlockProps> = ({ data, parentField }) => {
  return (
    <section className="py-16 md:py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        {(data.title || data.description) && (
          <div className="text-center mb-12">
            {data.title && (
              <h2 
                className="text-h2 font-bold text-slate-900 mb-4"
                data-tina-field={parentField && tinaField(data, 'title')}
              >
                {data.title}
              </h2>
            )}
            {data.description && (
              <p 
                className="text-lg text-slate-600 max-w-2xl mx-auto"
                data-tina-field={parentField && tinaField(data, 'description')}
              >
                {data.description}
              </p>
            )}
          </div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Address */}
          {data.address && (
            <div className="bg-white p-6 rounded-sm border border-slate-100 shadow-sm">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <MapPin size={24} className="text-primary" />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">Adresse</h3>
              <p 
                className="text-slate-600"
                data-tina-field={parentField && data.address && tinaField(data.address, 'company')}
              >
                {data.address.company}<br />
                <span data-tina-field={parentField && data.address && tinaField(data.address, 'street')}>
                  {data.address.street}
                </span><br />
                <span data-tina-field={parentField && data.address && tinaField(data.address, 'zip')}>
                  {data.address.zip}
                </span>{' '}
                <span data-tina-field={parentField && data.address && tinaField(data.address, 'city')}>
                  {data.address.city}
                </span>
              </p>
            </div>
          )}

          {/* Contact */}
          <div className="bg-white p-6 rounded-sm border border-slate-100 shadow-sm">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Phone size={24} className="text-primary" />
            </div>
            <h3 className="font-bold text-slate-900 mb-2">Kontakt</h3>
            <p className="text-slate-600">
              <a 
                href={`tel:${data.phone.replace(/\s/g, '')}`} 
                className="hover:text-primary transition-colors"
                data-tina-field={parentField && tinaField(data, 'phone')}
              >
                Tel: {data.phone}
              </a><br />
              {data.fax && (
                <>
                  <span data-tina-field={parentField && tinaField(data, 'fax')}>
                    Fax: {data.fax}
                  </span><br />
                </>
              )}
              <a 
                href={`mailto:${data.email}`} 
                className="hover:text-primary transition-colors"
                data-tina-field={parentField && tinaField(data, 'email')}
              >
                {data.email}
              </a>
            </p>
          </div>

          {/* Hours */}
          {data.officeHours && (
            <div className="bg-white p-6 rounded-sm border border-slate-100 shadow-sm">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Clock size={24} className="text-primary" />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">Öffnungszeiten</h3>
              <p className="text-slate-600">
                <strong>Büro:</strong><br />
                <span data-tina-field={parentField && data.officeHours && tinaField(data.officeHours, 'weekdays')}>
                  {data.officeHours.weekdays}
                </span>
              </p>
              {data.repairHours && (
                <p className="text-slate-600 mt-2">
                  <strong>Reparaturplanung:</strong><br />
                  <span data-tina-field={parentField && data.repairHours && tinaField(data.repairHours, 'tueThu')}>
                    {data.repairHours.tueThu}
                  </span><br />
                  <span data-tina-field={parentField && data.repairHours && tinaField(data.repairHours, 'fri')}>
                    {data.repairHours.fri}
                  </span>
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
