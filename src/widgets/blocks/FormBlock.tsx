import React from 'react';
import { tinaField } from 'tinacms/dist/react';
import { ContactForm } from '@/features/contact/ContactForm';

export interface FormBlockProps {
  data: {
    title?: string;
    description?: string;
    formType: 'contact' | 'quick' | 'application';
    submitButtonText?: string;
    successMessage?: string;
  };
  parentField?: string;
}

export const FormBlock: React.FC<FormBlockProps> = ({ data, parentField }) => {
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          {(data.title || data.description) && (
            <div className="text-center mb-8">
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
                  className="text-lg text-slate-600"
                  data-tina-field={parentField && tinaField(data, 'description')}
                >
                  {data.description}
                </p>
              )}
            </div>
          )}

          <div className="bg-slate-50 p-8 rounded-sm border border-slate-100">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
};
