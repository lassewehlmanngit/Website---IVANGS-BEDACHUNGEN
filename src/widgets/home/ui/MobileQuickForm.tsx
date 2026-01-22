import React from 'react';
import { Mail } from 'lucide-react';
import { tinaField } from 'tinacms/dist/react';
import { QuickContactForm } from '@/features/contact/QuickContactForm';

interface MobileQuickFormProps {
  lang: string;
  data: any; // The full homePage data
}

export const MobileQuickForm: React.FC<MobileQuickFormProps> = ({ lang, data }) => {
  // Use new quickForm data or fallbacks
  const formData = data?.quickForm || {};
  
  if (data?.hero?.showQuickForm === false) return null;

  return (
    <section className="md:hidden bg-slate-900 border-b border-white/10 py-12 px-4 relative overflow-hidden">
      {/* Decorative background blur */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-primary/20 rounded-full blur-[60px] -mr-12 -mt-12 pointer-events-none"></div>

      <div className="relative z-10 max-w-md mx-auto">
        <h3 
          className="text-2xl font-bold text-white mb-6 flex items-center gap-3"
          data-tina-field={formData && tinaField(formData, 'title')}
        >
          <div className="bg-primary/20 p-2 rounded-full text-primary">
            <Mail size={20} />
          </div>
          {formData.title || 'Schnellanfrage'}
        </h3>

        <div className="bg-white/5 p-6 rounded-lg border border-white/10 backdrop-blur-sm">
          <QuickContactForm 
            source="mobile" 
            formData={formData} 
            lang={lang}
            variant="dark"
          />
        </div>
      </div>
    </section>
  );
};
